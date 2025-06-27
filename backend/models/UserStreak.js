const mongoose = require('mongoose');

const UserStreakSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  problemsSolved: {
    type: Number,
    default: 0
  },
  timeSpent: {
    type: Number, // in minutes
    default: 0
  },
  topics: [{
    type: String
  }],
  difficulties: {
    easy: { type: Number, default: 0 },
    medium: { type: Number, default: 0 },
    hard: { type: Number, default: 0 }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Compound index to ensure one streak record per user per date
UserStreakSchema.index({ userId: 1, date: 1 }, { unique: true });

// Virtual for formatted date string
UserStreakSchema.virtual('dateString').get(function() {
  return this.date.toISOString().split('T')[0];
});

// Ensure virtual fields are serialized
UserStreakSchema.set('toJSON', { virtuals: true });
UserStreakSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('UserStreak', UserStreakSchema); 