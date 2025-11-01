const express = require("express");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/profile-images';
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Generate unique filename with timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'profile-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 100 * 1024 // 100KB limit
  },
  fileFilter: function (req, file, cb) {
    // Check file type
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Function to validate LeetCode username
async function validateLeetCodeUsername(username) {
  try {
    const response = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          query getUserProfile($username: String!) {
            matchedUser(username: $username) {
              username
              profile {
                realName
                userAvatar
                ranking
              }
            }
          }
        `,
        variables: { username },
      }),
    });

    const result = await response.json();
    
    // If matchedUser is null, the username doesn't exist
    if (!result.data?.matchedUser) {
      return { isValid: false, error: 'LeetCode username not found' };
    }
    
    return { isValid: true, user: result.data.matchedUser };
  } catch (error) {
    console.error('LeetCode validation error:', error);
    return { isValid: false, error: 'Failed to validate LeetCode username' };
  }
}

// --- Local Authentication Routes ---

// Register new user
router.post("/register", async (req, res) => {
  try {
    const { leetcodeUsername, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { leetcodeUsername }] 
    });
    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(400).json({ message: "User with this email already exists" });
      }
      if (existingUser.leetcodeUsername === leetcodeUsername) {
        return res.status(400).json({ message: "User with this LeetCode username already exists" });
      }
    }

    // Validate LeetCode username
    const leetcodeValidation = await validateLeetCodeUsername(leetcodeUsername);
    if (!leetcodeValidation.isValid) {
      return res.status(400).json({ message: leetcodeValidation.error });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create username from LeetCode username
    let username = leetcodeUsername;
    let counter = 1;

    // Ensure unique username
    while (await User.findOne({ username })) {
      username = `${leetcodeUsername}${counter}`;
      counter++;
    }

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      leetcodeUsername,
      name: leetcodeValidation.user.profile.realName || leetcodeUsername
    });

    await newUser.save();

    // Automatically log in the user after registration
    req.login(newUser, (err) => {
      if (err) {
        console.error("Auto-login error after registration:", err);
        return res.status(500).json({ message: "Registration successful but login failed. Please log in manually." });
      }
      
      res.status(201).json({ 
        message: "User registered successfully",
        user: {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email,
          leetcodeUsername: newUser.leetcodeUsername,
          name: newUser.name,
          profileImage: newUser.profileImage,
          profileImageSource: newUser.profileImageSource
        }
      });
    });

  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
});

// Login user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Check if user has password (OAuth users might not have passwords)
    if (!user.password) {
      return res.status(400).json({ message: "Please use OAuth to login with this account" });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Log in the user using passport
    req.login(user, (err) => {
      if (err) {
        console.error("Login error:", err);
        return res.status(500).json({ message: "Server error during login" });
      }
      
      res.json({ 
        message: "Login successful",
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          leetcodeUsername: user.leetcodeUsername,
          name: user.name,
          profileImage: user.profileImage,
          profileImageSource: user.profileImageSource,
          googleProfile: user.googleProfile,
          githubProfile: user.githubProfile
        }
      });
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
});

// Validate LeetCode username endpoint
router.post("/validate-leetcode", async (req, res) => {
  try {
    const { username } = req.body;
    
    if (!username) {
      return res.status(400).json({ 
        isValid: false, 
        error: 'Username is required' 
      });
    }

    const validation = await validateLeetCodeUsername(username);
    res.json(validation);
  } catch (error) {
    console.error('LeetCode validation error:', error);
    res.status(500).json({ 
      isValid: false, 
      error: 'Failed to validate LeetCode username' 
    });
  }
});

// Update LeetCode username (for OAuth users or users who want to change it)
router.put("/update-leetcode-username", async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const { leetcodeUsername, skipValidation = false } = req.body;
    const userId = req.user._id;

    // Check if the new LeetCode username is already taken
    const existingUser = await User.findOne({ leetcodeUsername });
    if (existingUser && existingUser._id.toString() !== userId.toString()) {
      return res.status(400).json({ message: "This LeetCode username is already taken" });
    }

    let userData = { leetcodeUsername };
    let realName = leetcodeUsername;
    let leetcodeProfileImage = null;

    // Validate LeetCode username only if not skipped
    if (!skipValidation) {
      try {
        const leetcodeValidation = await validateLeetCodeUsername(leetcodeUsername);
        if (!leetcodeValidation.isValid) {
          return res.status(400).json({ message: leetcodeValidation.error });
        }
        realName = leetcodeValidation.user.profile.realName || leetcodeUsername;
        leetcodeProfileImage = leetcodeValidation.user.profile.userAvatar;
      } catch (validationError) {
        console.error('LeetCode validation error:', validationError);
        // If validation fails, we can still proceed with just the username
        // This prevents the page from going blank
      }
    }

    // Update the user's LeetCode username and profile image
    const updateData = { 
      leetcodeUsername,
      name: realName
    };

    // Only update profile image if we got one from LeetCode and user doesn't have a custom one
    if (leetcodeProfileImage && (!req.user.profileImageSource || req.user.profileImageSource === 'leetcode')) {
      updateData.profileImage = leetcodeProfileImage;
      updateData.profileImageSource = 'leetcode';
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true }
    );

    res.json({ 
      message: "LeetCode username updated successfully",
      user: {
        id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        leetcodeUsername: updatedUser.leetcodeUsername,
        name: updatedUser.name,
        profileImage: updatedUser.profileImage,
        profileImageSource: updatedUser.profileImageSource
      }
    });

  } catch (error) {
    console.error("Update LeetCode username error:", error);
    res.status(500).json({ message: "Server error during update" });
  }
});

// Update profile image
router.put("/update-profile-image", async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const { imageUrl, imageSource } = req.body;
    const userId = req.user._id;

    if (!imageUrl || !imageSource) {
      return res.status(400).json({ message: "Image URL and source are required" });
    }

    if (!['google', 'github', 'leetcode', 'custom'].includes(imageSource)) {
      return res.status(400).json({ message: "Invalid image source" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { 
        profileImage: imageUrl,
        profileImageSource: imageSource
      },
      { new: true }
    );

    res.json({ 
      message: "Profile image updated successfully",
      user: {
        id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        leetcodeUsername: updatedUser.leetcodeUsername,
        name: updatedUser.name,
        profileImage: updatedUser.profileImage,
        profileImageSource: updatedUser.profileImageSource
      }
    });

  } catch (error) {
    console.error("Update profile image error:", error);
    res.status(500).json({ message: "Server error during update" });
  }
});

// Upload profile image file
router.post("/upload-profile-image", upload.single('profileImage'), async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const userId = req.user._id;
    console.log('Upload request for user:', userId);
    console.log('Uploaded file:', req.file);
    
    // Get current user to check if they have an existing profile image
    const currentUser = await User.findById(userId);
    console.log('Current user profile image:', currentUser.profileImage);
    
    // Delete old profile image file if it exists and is an uploaded file
    if (currentUser.profileImage && currentUser.profileImageSource === 'upload') {
      try {
        const oldImagePath = currentUser.profileImage.replace('/uploads/', '');
        const fullOldPath = path.join(__dirname, '..', oldImagePath);
        console.log('Attempting to delete old image:', fullOldPath);
        if (fs.existsSync(fullOldPath)) {
          fs.unlinkSync(fullOldPath);
          console.log('Deleted old profile image:', fullOldPath);
        } else {
          console.log('Old image file not found:', fullOldPath);
        }
      } catch (error) {
        console.error('Error deleting old profile image:', error);
        // Don't fail the upload if deletion fails
      }
    }
    
    // Create the file URL
    const fileUrl = `/uploads/profile-images/${req.file.filename}`;
    console.log('New file URL:', fileUrl);

    // Update the user's profile image
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { 
        profileImage: fileUrl,
        profileImageSource: 'upload'
      },
      { new: true }
    );

    console.log('Updated user in database:', updatedUser);

    res.json({ 
      message: "Profile image uploaded successfully",
      user: {
        id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        leetcodeUsername: updatedUser.leetcodeUsername,
        name: updatedUser.name,
        profileImage: updatedUser.profileImage,
        profileImageSource: updatedUser.profileImageSource
      },
      fileUrl: fileUrl
    });

  } catch (error) {
    console.error("Upload profile image error:", error);
    res.status(500).json({ message: "Server error during upload" });
  }
});

// Get available profile images for user
router.get("/profile-images", async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const user = req.user;
    const availableImages = [];

    // Add Google profile image if available
    if (user.googleProfile?.picture) {
      availableImages.push({
        url: user.googleProfile.picture,
        source: 'google',
        label: 'Google Profile'
      });
    }

    // Add GitHub profile image if available
    if (user.githubProfile?.avatar_url) {
      availableImages.push({
        url: user.githubProfile.avatar_url,
        source: 'github',
        label: 'GitHub Profile'
      });
    }

    // Add LeetCode profile image if available (we'll fetch it)
    if (user.leetcodeUsername && !user.leetcodeUsername.startsWith('user_')) {
      try {
        const leetcodeValidation = await validateLeetCodeUsername(user.leetcodeUsername);
        if (leetcodeValidation.isValid && leetcodeValidation.user.profile.userAvatar) {
          availableImages.push({
            url: leetcodeValidation.user.profile.userAvatar,
            source: 'leetcode',
            label: 'LeetCode Profile'
          });
        }
      } catch (error) {
        console.error('Error fetching LeetCode profile image:', error);
      }
    }

    // Add current profile image if it exists
    if (user.profileImage) {
      availableImages.push({
        url: user.profileImage,
        source: user.profileImageSource,
        label: 'Current Profile',
        isCurrent: true
      });
    }

    res.json({
      success: true,
      availableImages,
      currentImage: user.profileImage,
      currentSource: user.profileImageSource
    });

  } catch (error) {
    console.error("Get profile images error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// --- Google OAuth ---
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${FRONTEND_URL}/login?authStatus=failure`,
  }),
  (req, res) => {
    res.redirect(`${FRONTEND_URL}/?authStatus=success`);
  }
);

// --- GitHub OAuth ---
router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));

router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: `${FRONTEND_URL}/login?authStatus=failure`,
  }),
  (req, res) => {
    res.redirect(`${FRONTEND_URL}/?authStatus=success`);
  }
);

// --- Check if user is authenticated ---
router.get("/current_user", (req, res) => {
  if (req.isAuthenticated()) {
    const user = req.user.toObject();
    // Include profile image data
    return res.json({
      ...user,
      profileImage: user.profileImage,
      profileImageSource: user.profileImageSource,
      googleProfile: user.googleProfile,
      githubProfile: user.githubProfile
    });
  }
  res.status(401).json({ message: "Not authenticated" });
});

// --- Logout ---
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect(`${FRONTEND_URL}/login?logout=success`);
  });
});

router.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.json({ message: "Logged out successfully" });
  });
});

module.exports = router;
