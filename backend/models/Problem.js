const mongoose = require('mongoose');

const ProblemSchema = new mongoose.Schema({
  leetcodeNumber: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: true
  },
  link: {
    type: String,
    required: true
  },
  tags: [{
    type: String
  }],
  companies: [{
    type: String
  }],
  concept: {
    type: String,
    required: true
  },
  buildsOn: {
    type: String,
    default: 'None'
  },
  successRate: {
    type: Number,
    min: 0,
    max: 100
  },
  whyImportant: {
    type: String
  },
  solutionLink: {
    type: String
  },
  dayNumber: {
    type: Number
  },
  weekNumber: {
    type: Number
  },
  topic: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
ProblemSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('Problem', ProblemSchema); 