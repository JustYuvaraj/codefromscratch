import React from 'react';
import Shimmer from '../components/ui/Shimmer';

export default function DashboardShimmer() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white px-4 sm:px-8 py-8 grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Profile Card */}
      <div className="col-span-1">
        <div className="bg-white/5 rounded-2xl p-6 border border-white/10 flex flex-col items-center">
          <Shimmer className="w-20 h-20 rounded-full mb-4" />
          <Shimmer className="w-32 h-5 rounded mb-2" />
          <Shimmer className="w-20 h-4 rounded mb-2" />
        </div>
      </div>
      {/* Main Content */}
      <div className="col-span-1 lg:col-span-3 flex flex-col gap-6">
        {/* Stats Card */}
        <div className="bg-white/5 rounded-2xl p-4 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <Shimmer className="w-32 h-6 rounded mb-2" />
            <Shimmer className="w-20 h-4 rounded" />
          </div>
          <div className="flex flex-wrap gap-4 text-sm">
            <Shimmer className="w-16 h-4 rounded" />
            <Shimmer className="w-16 h-4 rounded" />
            <Shimmer className="w-16 h-4 rounded" />
          </div>
        </div>
        {/* Leaderboard Card */}
        <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-2">
            <Shimmer className="w-32 h-6 rounded" />
            <Shimmer className="w-16 h-4 rounded" />
          </div>
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex flex-col sm:flex-row items-center justify-between p-2 rounded-lg gap-2">
                <div className="flex items-center gap-3">
                  <Shimmer className="w-6 h-6 rounded-full" />
                  <Shimmer className="w-24 h-4 rounded" />
                </div>
                <div className="flex items-center gap-2">
                  <Shimmer className="w-4 h-4 rounded" />
                  <Shimmer className="w-10 h-4 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Streak Calendar Card */}
        <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm mb-3 h-auto sm:h-[50px] gap-2">
            <Shimmer className="w-40 h-6 rounded mb-2 sm:mb-0" />
            <Shimmer className="w-32 h-6 rounded" />
          </div>
          <div className="overflow-x-auto">
            <div className="flex gap-1">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="flex flex-col gap-1">
                  {[...Array(7)].map((_, j) => (
                    <Shimmer key={j} className="w-4 h-4 rounded-sm" />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Recent Activity Card */}
        <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
          <Shimmer className="w-32 h-5 rounded mb-3" />
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex flex-col sm:flex-row justify-between gap-2">
                <Shimmer className="w-40 h-4 rounded" />
                <Shimmer className="w-20 h-4 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 