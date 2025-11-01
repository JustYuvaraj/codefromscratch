const express = require("express");
const router = express.Router();
const User = require("../models/User");

// GET all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

// POST create user
router.post("/", async (req, res) => {
  const { name, email } = req.body;
  try {
    const newUser = await User.create({ name, email });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Function to fetch LeetCode data for a user
async function fetchLeetCodeData(username) {
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
              submitStats {
                acSubmissionNum { difficulty count }
              }
            }
          }
        `,
        variables: { username },
      }),
    });

    const result = await response.json();
    return result.data?.matchedUser;
  } catch (error) {
    console.error('LeetCode fetch error:', error);
    return null;
  }
}

// Get leaderboard data
router.get("/leaderboard", async (req, res) => {
  try {
    // Get all users with LeetCode usernames
    const users = await User.find({ 
      leetcodeUsername: { 
        $exists: true, 
        $ne: null,
        $not: /^user_/ // Exclude temporary usernames
      }
    }).select('username leetcodeUsername name email createdAt');

    // Fetch LeetCode data for each user
    const leaderboardData = [];
    
    for (const user of users) {
      try {
        const leetcodeData = await fetchLeetCodeData(user.leetcodeUsername);
        
        if (leetcodeData) {
          const solved = leetcodeData.submitStats.acSubmissionNum;
          const totalSolved = solved.reduce((sum, item) => sum + item.count, 0);
          
          leaderboardData.push({
            userId: user._id,
            username: user.username,
            leetcodeUsername: user.leetcodeUsername,
            name: user.name || leetcodeData.profile.realName || user.leetcodeUsername,
            email: user.email,
            avatar: leetcodeData.profile.userAvatar,
            ranking: leetcodeData.profile.ranking || 999999,
            totalSolved,
            easySolved: solved[0]?.count || 0,
            mediumSolved: solved[1]?.count || 0,
            hardSolved: solved[2]?.count || 0,
            memberSince: user.createdAt
          });
        }
      } catch (error) {
        console.error(`Error fetching data for ${user.leetcodeUsername}:`, error);
        // Still include user but with default values
        leaderboardData.push({
          userId: user._id,
          username: user.username,
          leetcodeUsername: user.leetcodeUsername,
          name: user.name || user.leetcodeUsername,
          email: user.email,
          avatar: null,
          ranking: 999999,
          totalSolved: 0,
          easySolved: 0,
          mediumSolved: 0,
          hardSolved: 0,
          memberSince: user.createdAt
        });
      }
    }

    // Sort by total problems solved (descending), then by ranking (ascending)
    leaderboardData.sort((a, b) => {
      if (b.totalSolved !== a.totalSolved) {
        return b.totalSolved - a.totalSolved;
      }
      return a.ranking - b.ranking;
    });

    // Add position/rank to each user
    leaderboardData.forEach((user, index) => {
      user.position = index + 1;
    });

    res.json({
      success: true,
      leaderboard: leaderboardData,
      totalUsers: leaderboardData.length
    });

  } catch (error) {
    console.error('Leaderboard error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch leaderboard data' 
    });
  }
});

// Get user's own stats for comparison
router.get("/my-stats", async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const user = await User.findById(req.user._id);
    if (!user || !user.leetcodeUsername || user.leetcodeUsername.startsWith('user_')) {
      return res.status(404).json({ message: "User not found or no LeetCode username set" });
    }

    const leetcodeData = await fetchLeetCodeData(user.leetcodeUsername);
    
    if (!leetcodeData) {
      return res.status(404).json({ message: "LeetCode data not found" });
    }

    const solved = leetcodeData.submitStats.acSubmissionNum;
    const totalSolved = solved.reduce((sum, item) => sum + item.count, 0);

    res.json({
      success: true,
      stats: {
        username: user.username,
        leetcodeUsername: user.leetcodeUsername,
        name: user.name || leetcodeData.profile.realName || user.leetcodeUsername,
        avatar: leetcodeData.profile.userAvatar,
        ranking: leetcodeData.profile.ranking || 999999,
        totalSolved,
        easySolved: solved[0]?.count || 0,
        mediumSolved: solved[1]?.count || 0,
        hardSolved: solved[2]?.count || 0,
        memberSince: user.createdAt
      }
    });

  } catch (error) {
    console.error('My stats error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch user stats' 
    });
  }
});

module.exports = router;
