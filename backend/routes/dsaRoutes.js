const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

// Get the complete 200-day DSA study plan
router.get('/plan', async (req, res) => {
    try {
        const planPath = path.join(__dirname, '../data/dsa-200-day-plan.json');
        const planData = await fs.readFile(planPath, 'utf8');
        const plan = JSON.parse(planData);
        
        res.json({
            success: true,
            data: plan
        });
    } catch (error) {
        console.error('Error reading DSA plan:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to load DSA study plan'
        });
    }
});

// Get a specific day's problems
router.get('/day/:dayNumber', async (req, res) => {
    try {
        const dayNumber = parseInt(req.params.dayNumber);
        const planPath = path.join(__dirname, '../data/dsa-200-day-plan.json');
        const planData = await fs.readFile(planPath, 'utf8');
        const plan = JSON.parse(planData);
        
        const dayData = plan.plan.days.find(day => day.day === dayNumber);
        
        if (!dayData) {
            return res.status(404).json({
                success: false,
                message: `Day ${dayNumber} not found`
            });
        }
        
        res.json({
            success: true,
            data: dayData
        });
    } catch (error) {
        console.error('Error reading day data:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to load day data'
        });
    }
});

// Get problems by week
router.get('/week/:weekNumber', async (req, res) => {
    try {
        const weekNumber = parseInt(req.params.weekNumber);
        const planPath = path.join(__dirname, '../data/dsa-200-day-plan.json');
        const planData = await fs.readFile(planPath, 'utf8');
        const plan = JSON.parse(planData);
        
        const weekData = plan.plan.days.filter(day => day.week === weekNumber);
        
        if (weekData.length === 0) {
            return res.status(404).json({
                success: false,
                message: `Week ${weekNumber} not found`
            });
        }
        
        res.json({
            success: true,
            data: weekData
        });
    } catch (error) {
        console.error('Error reading week data:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to load week data'
        });
    }
});

// Get problems by difficulty
router.get('/difficulty/:difficulty', async (req, res) => {
    try {
        const difficulty = req.params.difficulty.toLowerCase();
        const planPath = path.join(__dirname, '../data/dsa-200-day-plan.json');
        const planData = await fs.readFile(planPath, 'utf8');
        const plan = JSON.parse(planData);
        
        const problems = [];
        plan.plan.days.forEach(day => {
            day.problems.forEach(problem => {
                if (problem.difficulty.toLowerCase() === difficulty) {
                    problems.push({
                        ...problem,
                        day: day.day,
                        week: day.week,
                        topic: day.topic
                    });
                }
            });
        });
        
        res.json({
            success: true,
            data: problems
        });
    } catch (error) {
        console.error('Error reading difficulty data:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to load difficulty data'
        });
    }
});

// Get problems by FAANG company
router.get('/company/:company', async (req, res) => {
    try {
        const company = req.params.company.toLowerCase();
        const planPath = path.join(__dirname, '../data/dsa-200-day-plan.json');
        const planData = await fs.readFile(planPath, 'utf8');
        const plan = JSON.parse(planData);
        
        const problems = [];
        plan.plan.days.forEach(day => {
            day.problems.forEach(problem => {
                if (problem.faangCompanies.some(c => c.toLowerCase() === company)) {
                    problems.push({
                        ...problem,
                        day: day.day,
                        week: day.week,
                        topic: day.topic
                    });
                }
            });
        });
        
        res.json({
            success: true,
            data: problems
        });
    } catch (error) {
        console.error('Error reading company data:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to load company data'
        });
    }
});

// Get plan metadata
router.get('/metadata', async (req, res) => {
    try {
        const planPath = path.join(__dirname, '../data/dsa-200-day-plan.json');
        const planData = await fs.readFile(planPath, 'utf8');
        const plan = JSON.parse(planData);
        
        res.json({
            success: true,
            data: plan.metadata
        });
    } catch (error) {
        console.error('Error reading metadata:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to load metadata'
        });
    }
});

module.exports = router; 