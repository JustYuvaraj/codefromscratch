import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SiLeetcode } from 'react-icons/si';
import { FaCheckCircle, FaPlay, FaPause, FaForward, FaBackward, FaBullseye } from 'react-icons/fa';
import { MdTrendingUp, MdCalendarToday } from 'react-icons/md';

const DSAPlan = () => {
  const [planData, setPlanData] = useState(null);
  const [currentDay, setCurrentDay] = useState(1);
  const [solvedProblems, setSolvedProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // all, easy, medium, hard
  const [companyFilter, setCompanyFilter] = useState('all');

  useEffect(() => {
    fetchPlanData();
    loadProgress();
  }, []);

  const fetchPlanData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/dsa/plan');
      const data = await response.json();
      
      if (data.success) {
        setPlanData(data.data);
      } else {
        setError('Failed to load DSA plan');
      }
    } catch (err) {
      setError('Error loading DSA plan');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadProgress = () => {
    const saved = localStorage.getItem('dsaProgress');
    if (saved) {
      setSolvedProblems(JSON.parse(saved));
    }
  };

  const saveProgress = (newSolvedProblems) => {
    localStorage.setItem('dsaProgress', JSON.stringify(newSolvedProblems));
    setSolvedProblems(newSolvedProblems);
  };

  const toggleProblemSolved = (problemId) => {
    const newSolved = solvedProblems.includes(problemId)
      ? solvedProblems.filter(id => id !== problemId)
      : [...solvedProblems, problemId];
    saveProgress(newSolved);
  };

  const getCurrentDayData = () => {
    if (!planData) return null;
    return planData.plan.days.find(day => day.day === currentDay);
  };

  const getProgressStats = () => {
    if (!planData) return { total: 0, solved: 0, percentage: 0 };
    
    const total = planData.plan.totalProblems;
    const solved = solvedProblems.length;
    const percentage = Math.round((solved / total) * 100);
    
    return { total, solved, percentage };
  };

  const getDifficultyStats = () => {
    if (!planData) return { easy: 0, medium: 0, hard: 0 };
    
    const stats = { easy: 0, medium: 0, hard: 0 };
    planData.plan.days.forEach(day => {
      day.problems.forEach(problem => {
        if (solvedProblems.includes(problem.id)) {
          stats[problem.difficulty.toLowerCase()]++;
        }
      });
    });
    
    return stats;
  };

  const getCompanyStats = () => {
    if (!planData) return {};
    
    const stats = {};
    planData.plan.days.forEach(day => {
      day.problems.forEach(problem => {
        if (solvedProblems.includes(problem.id)) {
          problem.faangCompanies.forEach(company => {
            stats[company] = (stats[company] || 0) + 1;
          });
        }
      });
    });
    
    return stats;
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'text-green-400 bg-green-400/10';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10';
      case 'hard': return 'text-red-400 bg-red-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getCompanyColor = (company) => {
    const colors = {
      'Google': 'text-blue-400 bg-blue-400/10',
      'Amazon': 'text-orange-400 bg-orange-400/10',
      'Meta': 'text-purple-400 bg-purple-400/10',
      'Apple': 'text-gray-400 bg-gray-400/10',
      'Netflix': 'text-red-400 bg-red-400/10'
    };
    return colors[company] || 'text-gray-400 bg-gray-400/10';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cyan-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-400 p-8">
        <h2 className="text-xl font-bold mb-4">Error Loading DSA Plan</h2>
        <p>{error}</p>
      </div>
    );
  }

  const currentDayData = getCurrentDayData();
  const progressStats = getProgressStats();
  const difficultyStats = getDifficultyStats();
  const companyStats = getCompanyStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b0c1a] via-[#0f111f] to-[#101118] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            200-Day FAANG DSA Mastery Plan
          </h1>
          <p className="text-gray-300 text-lg">
            Master 1000 problems to crack FAANG coding interviews
          </p>
        </motion.div>

        {/* Progress Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <MdTrendingUp className="text-cyan-400 text-xl" />
              <h3 className="text-white font-semibold">Overall Progress</h3>
            </div>
            <div className="text-3xl font-bold text-cyan-400 mb-2">
              {progressStats.percentage}%
            </div>
            <div className="text-gray-400 text-sm">
              {progressStats.solved} / {progressStats.total} problems
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-3">
              <div 
                className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressStats.percentage}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <FaBullseye className="text-green-400 text-xl" />
              <h3 className="text-white font-semibold">Easy</h3>
            </div>
            <div className="text-3xl font-bold text-green-400">
              {difficultyStats.easy}
            </div>
            <div className="text-gray-400 text-sm">solved</div>
          </div>

          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <FaBullseye className="text-yellow-400 text-xl" />
              <h3 className="text-white font-semibold">Medium</h3>
            </div>
            <div className="text-3xl font-bold text-yellow-400">
              {difficultyStats.medium}
            </div>
            <div className="text-gray-400 text-sm">solved</div>
          </div>

          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <FaBullseye className="text-red-400 text-xl" />
              <h3 className="text-white font-semibold">Hard</h3>
            </div>
            <div className="text-3xl font-bold text-red-400">
              {difficultyStats.hard}
            </div>
            <div className="text-gray-400 text-sm">solved</div>
          </div>
        </motion.div>

        {/* Day Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-between mb-8 bg-white/5 rounded-xl p-6 border border-white/10"
        >
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentDay(Math.max(1, currentDay - 1))}
              disabled={currentDay === 1}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <FaBackward className="text-white" />
            </button>
            
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white">Day {currentDay}</h2>
              <p className="text-gray-400">Week {Math.ceil(currentDay / 7)}</p>
            </div>
            
            <button
              onClick={() => setCurrentDay(Math.min(200, currentDay + 1))}
              disabled={currentDay === 200}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <FaForward className="text-white" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <MdCalendarToday className="text-cyan-400" />
            <span className="text-gray-300">
              {Math.ceil(currentDay / 7)} / 28 weeks
            </span>
          </div>
        </motion.div>

        {/* Current Day Problems */}
        {currentDayData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/5 rounded-xl p-6 border border-white/10 mb-8"
          >
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white mb-2">
                {currentDayData.topic}
              </h3>
              <p className="text-gray-300">{currentDayData.learningObjective}</p>
            </div>

            <div className="grid gap-4">
              {currentDayData.problems.map((problem) => (
                <motion.div
                  key={problem.id}
                  whileHover={{ scale: 1.02 }}
                  className={`p-4 rounded-lg border transition-all duration-300 ${
                    solvedProblems.includes(problem.id)
                      ? 'bg-green-400/10 border-green-400/30'
                      : 'bg-white/5 border-white/10 hover:border-cyan-400/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => toggleProblemSolved(problem.id)}
                        className="hover:scale-110 transition-transform"
                      >
                        <FaCheckCircle
                          className={`text-xl ${
                            solvedProblems.includes(problem.id)
                              ? 'text-green-400'
                              : 'text-gray-500 hover:text-green-400'
                          }`}
                        />
                      </button>
                      
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <a
                            href={problem.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-white hover:text-cyan-400 transition-colors"
                          >
                            {problem.leetcodeNumber}. {problem.name}
                          </a>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(problem.difficulty)}`}>
                            {problem.difficulty}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm text-gray-400">
                            Success Rate: {problem.successRate}%
                          </span>
                        </div>
                        
                        <p className="text-sm text-gray-300 mb-2">
                          {problem.concept}
                        </p>
                        
                        <p className="text-xs text-gray-400 mb-2">
                          <strong>Builds on:</strong> {problem.buildsOn}
                        </p>
                        
                        <div className="flex items-center gap-2">
                          {problem.faangCompanies.map((company) => (
                            <span
                              key={company}
                              className={`px-2 py-1 rounded text-xs font-medium ${getCompanyColor(company)}`}
                            >
                              {company}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <a
                      href={problem.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-yellow-400 hover:text-yellow-300 transition-colors"
                    >
                      <SiLeetcode className="text-xl" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Company Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/5 rounded-xl p-6 border border-white/10"
        >
          <h3 className="text-xl font-bold text-white mb-4">FAANG Company Progress</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Object.entries(companyStats).map(([company, count]) => (
              <div key={company} className="text-center">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-2 ${getCompanyColor(company).replace('text-', 'bg-').replace('bg-', 'bg-').replace('/10', '/20')}`}>
                  <span className="text-white font-bold">{count}</span>
                </div>
                <div className="text-sm text-gray-300">{company}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DSAPlan; 