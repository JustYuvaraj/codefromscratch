// client/src/components/Leaderboard.jsx
// Component to display the leaderboard of users ranked by LeetCode performance

import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Crown, TrendingUp, User, Calendar } from 'lucide-react';

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [myStats, setMyStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // all, top10, top50

  useEffect(() => {
    fetchLeaderboardData();
    fetchMyStats();
  }, []);

  const fetchLeaderboardData = async () => {
    try {
      const response = await fetch('/api/users/leaderboard');
      const data = await response.json();
      
      if (data.success) {
        setLeaderboard(data.leaderboard);
      } else {
        setError('Failed to fetch leaderboard data');
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      setError('Failed to load leaderboard');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMyStats = async () => {
    try {
      const response = await fetch('/api/users/my-stats', {
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setMyStats(data.stats);
        }
      }
    } catch (error) {
      console.error('Error fetching my stats:', error);
    }
  };

  const getPositionIcon = (position) => {
    if (position === 1) return <Crown className="w-5 h-5 text-yellow-400" />;
    if (position === 2) return <Medal className="w-5 h-5 text-gray-300" />;
    if (position === 3) return <Medal className="w-5 h-5 text-amber-600" />;
    return <span className="text-lg font-bold text-white/60">#{position}</span>;
  };

  const getPositionBadge = (position) => {
    if (position === 1) return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black';
    if (position === 2) return 'bg-gradient-to-r from-gray-300 to-gray-400 text-black';
    if (position === 3) return 'bg-gradient-to-r from-amber-600 to-amber-700 text-white';
    if (position <= 10) return 'bg-blue-600 text-white';
    if (position <= 50) return 'bg-green-600 text-white';
    return 'bg-white/10 text-white/70';
  };

  const filteredLeaderboard = () => {
    switch (filter) {
      case 'top10':
        return leaderboard.slice(0, 10);
      case 'top50':
        return leaderboard.slice(0, 50);
      default:
        return leaderboard;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#333]">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-3 text-white/70">Loading leaderboard...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#333]">
        <div className="text-center py-8">
          <p className="text-red-400 mb-4">{error}</p>
          <button 
            onClick={fetchLeaderboardData}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1a1a1a] rounded-xl border border-[#333] overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-[#333]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Trophy className="w-6 h-6 text-yellow-400" />
            <h2 className="text-xl font-bold text-white">Leaderboard</h2>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-white/5 border border-white/10 text-white px-3 py-1 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Users</option>
              <option value="top10">Top 10</option>
              <option value="top50">Top 50</option>
            </select>
          </div>
        </div>
        
        {/* My Stats Card */}
        {myStats && (
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={myStats.avatar || 'https://via.placeholder.com/40'}
                  alt="avatar"
                  className="w-10 h-10 rounded-full border-2 border-blue-400"
                />
                <div>
                  <p className="text-white font-semibold">{myStats.name}</p>
                  <p className="text-white/60 text-sm">@{myStats.leetcodeUsername}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white font-bold text-lg">{myStats.totalSolved} solved</p>
                <p className="text-white/60 text-sm">Rank #{myStats.ranking?.toLocaleString()}</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between text-sm text-white/60">
          <span>{filteredLeaderboard().length} users</span>
          <span>Updated just now</span>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-white/5">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                Rank
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                Solved
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                Easy
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                Medium
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                Hard
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                LeetCode Rank
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                Member Since
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#333]">
            {filteredLeaderboard().map((user, index) => (
              <tr 
                key={user.userId} 
                className={`hover:bg-white/5 transition-colors ${
                  myStats && user.leetcodeUsername === myStats.leetcodeUsername 
                    ? 'bg-blue-600/10 border-l-4 border-blue-400' 
                    : ''
                }`}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    {getPositionIcon(user.position)}
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPositionBadge(user.position)}`}>
                      {user.position}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <img
                      src={user.avatar || 'https://via.placeholder.com/32'}
                      alt="avatar"
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <p className="text-white font-medium">{user.name}</p>
                      <p className="text-white/60 text-sm">@{user.leetcodeUsername}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    <span className="text-white font-semibold">{user.totalSolved}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-green-400 font-medium">{user.easySolved}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-yellow-400 font-medium">{user.mediumSolved}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-red-400 font-medium">{user.hardSolved}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-white/80">#{user.ranking?.toLocaleString()}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-1 text-white/60">
                    <Calendar className="w-3 h-3" />
                    <span className="text-sm">{formatDate(user.memberSince)}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {filteredLeaderboard().length === 0 && (
        <div className="text-center py-12">
          <User className="w-12 h-12 text-white/40 mx-auto mb-4" />
          <p className="text-white/60">No users found on the leaderboard</p>
          <p className="text-white/40 text-sm mt-2">Be the first to solve some problems!</p>
        </div>
      )}
    </div>
  );
} 