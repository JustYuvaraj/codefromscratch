const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const User = require("../models/User");
require("dotenv").config();

// GOOGLE STRATEGY
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.NODE_ENV === 'production' 
        ? "https://codefromscratch.onrender.com/api/auth/google/callback"
        : "http://localhost:5000/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({ email: profile.emails[0].value });
        if (existingUser) {
          // Update existing user's Google profile data
          existingUser.googleProfile = {
            picture: profile.photos[0]?.value,
            given_name: profile.name?.givenName,
            family_name: profile.name?.familyName
          };
          existingUser.profileImage = profile.photos[0]?.value;
          existingUser.profileImageSource = 'google';
          await existingUser.save();
          return done(null, existingUser);
        }

        // For OAuth users, we'll set a temporary LeetCode username that they can update later
        const tempLeetCodeUsername = `user_${Date.now()}`;
        
        const newUser = await User.create({
          googleId: profile.id,
          username: `${profile.emails[0].value.split('@')[0]}${Date.now()}`,
          name: profile.displayName,
          email: profile.emails[0].value,
          leetcodeUsername: tempLeetCodeUsername, // Temporary, user should update this
          profileImage: profile.photos[0]?.value,
          profileImageSource: 'google',
          googleProfile: {
            picture: profile.photos[0]?.value,
            given_name: profile.name?.givenName,
            family_name: profile.name?.familyName
          }
        });

        done(null, newUser);
      } catch (err) {
        done(err);
      }
    }
  )
);

// GITHUB STRATEGY
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.NODE_ENV === 'production'
        ? "https://codefromscratch.onrender.com/api/auth/github/callback"
        : "http://localhost:5000/api/auth/github/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value || `${profile.username}@no-reply.github.com`;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          // Update existing user's GitHub profile data
          existingUser.githubProfile = {
            avatar_url: profile.photos[0]?.value,
            login: profile.username,
            name: profile.displayName
          };
          existingUser.profileImage = profile.photos[0]?.value;
          existingUser.profileImageSource = 'github';
          await existingUser.save();
          return done(null, existingUser);
        }

        // For OAuth users, we'll set a temporary LeetCode username that they can update later
        const tempLeetCodeUsername = `user_${Date.now()}`;

        const newUser = await User.create({
          githubId: profile.id,
          username: `${profile.username || profile.displayName}${Date.now()}`,
          name: profile.displayName || profile.username,
          email,
          leetcodeUsername: tempLeetCodeUsername, // Temporary, user should update this
          profileImage: profile.photos[0]?.value,
          profileImageSource: 'github',
          githubProfile: {
            avatar_url: profile.photos[0]?.value,
            login: profile.username,
            name: profile.displayName
          }
        });

        done(null, newUser);
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
