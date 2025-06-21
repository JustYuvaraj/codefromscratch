import React from 'react';
import Leaderboard from '../components/Leaderboard';

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Leaderboard</h1>
          <p className="text-white/70 text-lg">
            See how you rank among other CodeFromScratch users based on LeetCode performance
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#1a1a1a] rounded-xl p-4 border border-[#333]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Total Users</p>
                <p className="text-2xl font-bold text-white">-</p>
              </div>
              <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                <span className="text-blue-400 text-lg">👥</span>
              </div>
            </div>
          </div>
          
          <div className="bg-[#1a1a1a] rounded-xl p-4 border border-[#333]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Top Performer</p>
                <p className="text-2xl font-bold text-white">-</p>
              </div>
              <div className="w-10 h-10 bg-yellow-600/20 rounded-lg flex items-center justify-center">
                <span className="text-yellow-400 text-lg">👑</span>
              </div>
            </div>
          </div>
          
          <div className="bg-[#1a1a1a] rounded-xl p-4 border border-[#333]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Avg Problems</p>
                <p className="text-2xl font-bold text-white">-</p>
              </div>
              <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
                <span className="text-green-400 text-lg">📊</span>
              </div>
            </div>
          </div>
          
          <div className="bg-[#1a1a1a] rounded-xl p-4 border border-[#333]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Active Today</p>
                <p className="text-2xl font-bold text-white">-</p>
              </div>
              <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center">
                <span className="text-purple-400 text-lg">⚡</span>
              </div>
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <Leaderboard />

        {/* Additional Info */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#333]">
            <h3 className="text-lg font-bold text-white mb-4">How Rankings Work</h3>
            <div className="space-y-3 text-white/70">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-black text-xs font-bold">1</div>
                <span>Total problems solved (highest first)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-black text-xs font-bold">2</div>
                <span>LeetCode ranking (lowest first)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-amber-600 rounded-full flex items-center justify-center text-white text-xs font-bold">3</div>
                <span>Account creation date (earliest first)</span>
              </div>
            </div>
          </div>

          <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#333]">
            <h3 className="text-lg font-bold text-white mb-4">Tips to Climb</h3>
            <div className="space-y-3 text-white/70">
              <div className="flex items-start gap-3">
                <span className="text-green-400 mt-1">•</span>
                <span>Solve problems consistently every day</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-400 mt-1">•</span>
                <span>Focus on medium difficulty problems</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-400 mt-1">•</span>
                <span>Participate in contests to improve ranking</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-400 mt-1">•</span>
                <span>Review and learn from your solutions</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 