const express = require('express');
const router = express.Router();
const UserProgress = require('../models/UserProgress');
const UserStreak = require('../models/UserStreak');
const Problem = require('../models/Problem');
const { isAuthenticated } = require('../middleware/authMiddleware');

// Get user's overall progress
router.get('/overview', isAuthenticated, async (req, res) => {
  try {
    const userId = req.user._id;
    
    // Get all progress records for the user
    const progress = await UserProgress.find({ userId })
      .populate('problemId')
      .sort({ updatedAt: -1 });

    // Calculate basic statistics
    const totalProblems = await Problem.countDocuments({ isActive: true });
    const solvedProblems = progress.filter(p => p.status === 'solved').length;
    const attemptedProblems = progress.filter(p => p.status === 'attempted').length;

    res.json({
      success: true,
      data: {
        totalProblems,
        solvedProblems,
        attemptedProblems,
        percentage: Math.round((solvedProblems / totalProblems) * 100) || 0,
        currentStreak: 0,
        recentActivity: []
      }
    });

  } catch (error) {
    console.error('Progress overview error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch progress overview'
    });
  }
});

// Get user's streak calendar data
router.get('/streak-calendar', isAuthenticated, async (req, res) => {
  try {
    const userId = req.user._id;
    
    const streaks = await UserStreak.find({ userId }).sort({ date: 1 });
    
    // Convert to the format expected by StreakCalendar component
    const streakData = {};
    streaks.forEach(streak => {
      streakData[streak.dateString] = streak.problemsSolved;
    });

    res.json({
      success: true,
      data: streakData
    });

  } catch (error) {
    console.error('Streak calendar error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch streak calendar data'
    });
  }
});

// Update problem progress
router.post('/problem/:problemId', isAuthenticated, async (req, res) => {
  try {
    const userId = req.user._id;
    const problemId = req.params.problemId;
    const { status, timeSpent, notes, rating } = req.body;

    // Validate problem exists
    const problem = await Problem.findById(problemId);
    if (!problem) {
      return res.status(404).json({
        success: false,
        message: 'Problem not found'
      });
    }

    // Find or create progress record
    let progress = await UserProgress.findOne({ userId, problemId });
    
    if (!progress) {
      progress = new UserProgress({
        userId,
        problemId,
        status: 'not_started',
        attempts: 0
      });
    }

    // Update progress
    if (status) {
      progress.status = status;
      if (status === 'solved' && !progress.solvedAt) {
        progress.solvedAt = new Date();
      }
    }
    
    if (timeSpent !== undefined) {
      progress.timeSpent += timeSpent;
    }
    
    if (notes !== undefined) {
      progress.notes = notes;
    }
    
    if (rating !== undefined) {
      progress.rating = rating;
    }

    // Increment attempts if status changed to attempted or solved
    if (status && ['attempted', 'solved'].includes(status)) {
      progress.attempts += 1;
    }

    await progress.save();

    res.json({
      success: true,
      data: progress
    });

  } catch (error) {
    console.error('Update progress error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update progress'
    });
  }
});

// Get user's progress for a specific problem
router.get('/problem/:problemId', isAuthenticated, async (req, res) => {
  try {
    const userId = req.user._id;
    const problemId = req.params.problemId;

    const progress = await UserProgress.findOne({ userId, problemId })
      .populate('problemId');

    res.json({
      success: true,
      data: progress || { status: 'not_started', attempts: 0, timeSpent: 0 }
    });

  } catch (error) {
    console.error('Get problem progress error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch problem progress'
    });
  }
});

// Get user's solved problems
router.get('/solved', isAuthenticated, async (req, res) => {
  try {
    const userId = req.user._id;
    const { page = 1, limit = 20 } = req.query;

    const progress = await UserProgress.find({ userId, status: 'solved' })
      .populate('problemId')
      .sort({ solvedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await UserProgress.countDocuments({ userId, status: 'solved' });

    res.json({
      success: true,
      data: {
        problems: progress,
        pagination: {
          current: page,
          total: Math.ceil(total / limit),
          hasNext: page * limit < total,
          hasPrev: page > 1
        }
      }
    });

  } catch (error) {
    console.error('Get solved problems error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch solved problems'
    });
  }
});

module.exports = router; 