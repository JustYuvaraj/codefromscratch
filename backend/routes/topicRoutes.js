const express = require('express');
const router = express.Router();
const Topic = require('../models/Topic');

// Get all topics by category
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const { difficulty } = req.query;

    let query = { category, isActive: true };
    
    if (difficulty) {
      query.difficulty = difficulty;
    }

    const topics = await Topic.find(query)
      .populate('prerequisites', 'name')
      .sort({ order: 1, name: 1 });

    res.json({
      success: true,
      data: topics
    });

  } catch (error) {
    console.error('Get topics error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch topics'
    });
  }
});

// Get all topics
router.get('/', async (req, res) => {
  try {
    const { category, difficulty, search } = req.query;

    let query = { isActive: true };
    
    if (category) {
      query.category = category;
    }
    
    if (difficulty) {
      query.difficulty = difficulty;
    }
    
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    const topics = await Topic.find(query)
      .populate('prerequisites', 'name')
      .sort({ category: 1, order: 1, name: 1 });

    // Group by category
    const groupedTopics = topics.reduce((acc, topic) => {
      if (!acc[topic.category]) {
        acc[topic.category] = [];
      }
      acc[topic.category].push(topic);
      return acc;
    }, {});

    res.json({
      success: true,
      data: {
        topics,
        groupedTopics
      }
    });

  } catch (error) {
    console.error('Get all topics error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch topics'
    });
  }
});

// Get a specific topic
router.get('/:id', async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id)
      .populate('prerequisites', 'name description');

    if (!topic) {
      return res.status(404).json({
        success: false,
        message: 'Topic not found'
      });
    }

    res.json({
      success: true,
      data: topic
    });

  } catch (error) {
    console.error('Get topic error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch topic'
    });
  }
});

// Create a new topic (admin only)
router.post('/', async (req, res) => {
  try {
    const {
      name,
      category,
      icon,
      color,
      description,
      difficulty,
      prerequisites,
      resources,
      order
    } = req.body;

    const topic = new Topic({
      name,
      category,
      icon,
      color,
      description,
      difficulty,
      prerequisites,
      resources,
      order
    });

    await topic.save();

    res.status(201).json({
      success: true,
      data: topic
    });

  } catch (error) {
    console.error('Create topic error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create topic'
    });
  }
});

// Update a topic (admin only)
router.put('/:id', async (req, res) => {
  try {
    const topic = await Topic.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!topic) {
      return res.status(404).json({
        success: false,
        message: 'Topic not found'
      });
    }

    res.json({
      success: true,
      data: topic
    });

  } catch (error) {
    console.error('Update topic error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update topic'
    });
  }
});

// Delete a topic (admin only)
router.delete('/:id', async (req, res) => {
  try {
    const topic = await Topic.findByIdAndDelete(req.params.id);

    if (!topic) {
      return res.status(404).json({
        success: false,
        message: 'Topic not found'
      });
    }

    res.json({
      success: true,
      message: 'Topic deleted successfully'
    });

  } catch (error) {
    console.error('Delete topic error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete topic'
    });
  }
});

module.exports = router; 