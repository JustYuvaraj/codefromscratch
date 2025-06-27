import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaForward, FaBackward, FaBullseye } from 'react-icons/fa';
import { MdTrendingUp } from 'react-icons/md';
import DSAPlanSkeleton from './DSAPlanSkeleton';

const DSAPlan = () => {
  const [problems, setProblems] = useState([]);
  const [currentDay, setCurrentDay] = useState(1);
  const [solvedProblems, setSolvedProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchProblems(currentDay);
    loadProgress();
    // eslint-disable-next-line
  }, [currentDay]);

  const fetchProblems = async (day) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/dsa/problems?day=${day}`);
      const data = await response.json();
      if (data.success) {
        setProblems(data.data);
      } else {
        setError('Failed to load problems');
      }
    } catch (err) {
      setError('Error loading problems');
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

  const getProgressStats = () => {
    const total = problems.length;
    const solved = problems.filter(p => solvedProblems.includes(p._id || p.leetcodeNumber)).length;
    const percentage = total ? Math.round((solved / total) * 100) : 0;
    return { total, solved, percentage };
  };

  const getDifficultyStats = () => {
    const stats = { easy: 0, medium: 0, hard: 0 };
    problems.forEach(problem => {
      if (solvedProblems.includes(problem._id || problem.leetcodeNumber)) {
        stats[problem.difficulty.toLowerCase()]++;
      }
    });
    return stats;
  };

  const getCompanyStats = () => {
    const stats = {};
    problems.forEach(problem => {
      if (solvedProblems.includes(problem._id || problem.leetcodeNumber)) {
        (problem.companies || []).forEach(company => {
          stats[company] = (stats[company] || 0) + 1;
        });
      }
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

  const topic = problems[0]?.topic || `Day ${currentDay}`;
  const learningObjective = problems[0]?.concept ? `Focus: ${problems[0].concept}` : '';

  const progressStats = getProgressStats();
  const difficultyStats = getDifficultyStats();
  const companyStats = getCompanyStats();

  if (loading) return <DSAPlanSkeleton />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b0c1a] via-[#0f111f] to-[#101118] px-4 sm:px-6 py-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            200-Day FAANG DSA Mastery Plan
          </h1>
          <p className="text-gray-300 text-base sm:text-lg">
            Master 1000 problems to crack FAANG coding interviews
          </p>
        </motion.div>

        {/* Progress Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8"
        >
          <div className="bg-white/5 rounded-2xl p-6 border border-white/10 flex flex-col items-center">
            <div className="flex items-center gap-3 mb-2">
              <MdTrendingUp className="text-cyan-400 text-xl" />
              <h3 className="text-white font-semibold text-base sm:text-lg">Day Progress</h3>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-2">
              {progressStats.percentage}%
            </div>
            <div className="text-gray-400 text-xs sm:text-sm">
              {progressStats.solved} / {progressStats.total} problems
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-3">
              <div 
                className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressStats.percentage}%` }}
              ></div>
            </div>
          </div>
          <div className="bg-white/5 rounded-2xl p-6 border border-white/10 flex flex-col items-center">
            <div className="flex items-center gap-3 mb-2">
              <FaBullseye className="text-green-400 text-xl" />
              <h3 className="text-white font-semibold text-base sm:text-lg">Easy</h3>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-green-400">
              {difficultyStats.easy}
            </div>
          </div>
          <div className="bg-white/5 rounded-2xl p-6 border border-white/10 flex flex-col items-center">
            <div className="flex items-center gap-3 mb-2">
              <FaBullseye className="text-yellow-400 text-xl" />
              <h3 className="text-white font-semibold text-base sm:text-lg">Medium</h3>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-yellow-400">
              {difficultyStats.medium}
            </div>
          </div>
          <div className="bg-white/5 rounded-2xl p-6 border border-white/10 flex flex-col items-center">
            <div className="flex items-center gap-3 mb-2">
              <FaBullseye className="text-red-400 text-xl" />
              <h3 className="text-white font-semibold text-base sm:text-lg">Hard</h3>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-red-400">
              {difficultyStats.hard}
            </div>
          </div>
        </motion.div>

        {/* Day Navigation */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <button
            className="px-4 py-2 bg-cyan-700 text-white rounded-lg disabled:opacity-50 w-full sm:w-auto"
            onClick={() => setCurrentDay((d) => Math.max(1, d - 1))}
            disabled={currentDay === 1}
          >
            <FaBackward className="inline mr-2" /> Prev Day
          </button>
          <div className="text-lg font-semibold text-white">
            Day {currentDay}
          </div>
          <button
            className="px-4 py-2 bg-cyan-700 text-white rounded-lg w-full sm:w-auto"
            onClick={() => setCurrentDay((d) => d + 1)}
          >
            Next Day <FaForward className="inline ml-2" />
          </button>
        </div>

        {/* Current Day Problems */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-8"
        >
          <div className="mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              {topic}
            </h3>
            <p className="text-gray-300 text-sm sm:text-base">{learningObjective}</p>
          </div>

          {error ? (
            <div className="text-center text-red-400">{error}</div>
          ) : (
            <div className="grid gap-4 sm:gap-6">
              {problems.map((problem) => (
                <motion.div
                  key={problem._id || problem.leetcodeNumber}
                  whileHover={{ scale: 1.02 }}
                  className={`p-4 rounded-xl border transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 ${
                    solvedProblems.includes(problem._id || problem.leetcodeNumber)
                      ? 'bg-green-400/10 border-green-400/30'
                      : 'bg-white/5 border-white/10 hover:border-cyan-400/30'
                  }`}
                >
                  <button
                    onClick={() => toggleProblemSolved(problem._id || problem.leetcodeNumber)}
                    className="hover:scale-110 transition-transform mr-2"
                  >
                    <FaCheckCircle
                      className={`text-xl ${
                        solvedProblems.includes(problem._id || problem.leetcodeNumber)
                          ? 'text-green-400'
                          : 'text-gray-500 hover:text-green-400'
                      }`}
                    />
                  </button>
                  <div className="flex-1 flex flex-col gap-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <a
                        href={problem.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-white hover:text-cyan-400 transition-colors text-base sm:text-lg"
                      >
                        {problem.leetcodeNumber}. {problem.name}
                      </a>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(problem.difficulty)}`}>
                        {problem.difficulty}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-xs sm:text-sm text-gray-400">
                        Success Rate: {problem.successRate}%
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-300 mb-1">
                      {problem.concept}
                    </p>
                    <p className="text-xs text-gray-400 mb-1">
                      <strong>Builds on:</strong> {problem.buildsOn}
                    </p>
                    <div className="flex flex-wrap items-center gap-2">
                      {(problem.companies || []).map((company) => (
                        <span
                          key={company}
                          className={`px-2 py-1 rounded text-xs font-medium ${getCompanyColor(company)}`}
                        >
                          {company}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default DSAPlan; 