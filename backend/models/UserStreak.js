const mongoose = require('mongoose');

const userStreakSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  dateString: {
    type: String,
    required: true
  },
  problemsSolved: {
    type: Number,
    default: 0
  },
  timeSpent: {
    type: Number,
    default: 0
  },
  topics: [{
    type: String
  }],
  difficulties: {
    easy: { type: Number, default: 0 },
    medium: { type: Number, default: 0 },
    hard: { type: Number, default: 0 }
  }
}, {
  timestamps: true
});

// Create a compound index for userId and date
userStreakSchema.index({ userId: 1, date: 1 }, { unique: true });

// Pre-save middleware to set dateString
userStreakSchema.pre('save', function(next) {
  if (this.date) {
    this.dateString = this.date.toISOString().split('T')[0];
  }
  next();
});

module.exports = mongoose.model('UserStreak', userStreakSchema); 