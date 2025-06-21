import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Clock, Circle, TrendingUp } from 'lucide-react';

const LeetCodeProblemCard = ({ problem, showActions = true }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'solved':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'attempted':
        return <Clock className="w-4 h-4 text-yellow-400" />;
      case 'todo':
        return <Circle className="w-4 h-4 text-gray-400" />;
      default:
        return <Circle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'solved': return 'text-green-400';
      case 'attempted': return 'text-yellow-400';
      case 'todo': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400';
      case 'Medium': return 'text-yellow-400';
      case 'Hard': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getDifficultyBg = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500/10 border-green-500/20';
      case 'Medium': return 'bg-yellow-500/10 border-yellow-500/20';
      case 'Hard': return 'bg-red-500/10 border-red-500/20';
      default: return 'bg-gray-500/10 border-gray-500/20';
    }
  };

  return (
    <div className="bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {getStatusIcon(problem.status)}
            <h3 className="text-white font-semibold group-hover:text-blue-300 transition-colors">
              {problem.title}
            </h3>
          </div>
          
          <div className="flex items-center gap-4 text-sm mb-3">
            <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getDifficultyBg(problem.difficulty)} ${getDifficultyColor(problem.difficulty)}`}>
              {problem.difficulty}
            </span>
            <span className="text-white/60">{problem.category}</span>
            <span className={`${getStatusColor(problem.status)} flex items-center gap-1`}>
              {problem.status.charAt(0).toUpperCase() + problem.status.slice(1)}
            </span>
          </div>

          {problem.description && (
            <p className="text-white/70 text-sm line-clamp-2 mb-3">
              {problem.description}
            </p>
          )}

          {problem.stats && (
            <div className="flex items-center gap-4 text-xs text-white/50">
              {problem.stats.acceptanceRate && (
                <span className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {problem.stats.acceptanceRate}% acceptance
                </span>
              )}
              {problem.stats.submissions && (
                <span>{problem.stats.submissions} submissions</span>
              )}
            </div>
          )}
        </div>

        {showActions && (
          <div className="flex flex-col gap-2 ml-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium">
              Practice
            </button>
            {problem.status === 'solved' && (
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium">
                Review
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LeetCodeProblemCard; 