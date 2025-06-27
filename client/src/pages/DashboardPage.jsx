// client/src/pages/DashboardPage.jsx

import React, { useState, useEffect } from 'react';
import LeetCodeProfile from '../components/features/LeetCodeProfile';
import LeetCodeSetup from '../components/LeetCodeSetup';
import StreakCalendar from '../components/StreakCalendar';
import { Trophy, TrendingUp } from 'lucide-react';
import DashboardShimmer from './DashboardShimmer';

// Skeleton shimmer component
function Shimmer({ className = '', style = {} }) {
  return (
    <div
      className={`animate-pulse bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 ${className}`}
      style={style}
    />
  );
}

// Replace these with dynamic values once you fetch real data
const totalSubmissions = 10;
const activeDays = 25;
const maxStreak = 20;
const streakData = {
  "2025-06-20": 2,
  "2025-06-21": 1,
  "2025-07-02": 5,
  // add more dates...
};

export default function DashboardPage({ user: initialUser }) {
  const [user, setUser] = useState(initialUser);
  const [isLoading, setIsLoading] = useState(true);
  const [leaderboardPreview, setLeaderboardPreview] = useState([]);
  const [myRanking, setMyRanking] = useState(null);
  const [error, setError] = useState(null);
  const [progressOverview, setProgressOverview] = useState(null);
  const [streakData, setStreakData] = useState({});
  const [recentProblems, setRecentProblems] = useState([]);

  // Debug logging
  console.log('DashboardPage render:', { initialUser, user, isLoading, error });

  // Fetch current user data on component mount
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        console.log('Fetching current user...');
        const response = await fetch('/api/auth/current_user', {
          credentials: 'include'
        });
        
        if (response.ok) {
          const userData = await response.json();
          console.log('User data received:', userData);
          setUser(userData);
        } else {
          console.error('Failed to fetch user data:', response.status);
          setError('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Error fetching user data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCurrentUser();
    fetchLeaderboardPreview();
    fetchProgressOverview();
    fetchStreakCalendar();
    fetchRecentProblems();
  }, []);

  // Fetch leaderboard preview
  const fetchLeaderboardPreview = async () => {
    try {
      console.log('Fetching leaderboard preview...');
      const response = await fetch('/api/users/leaderboard');
      const data = await response.json();
      
      if (data.success) {
        setLeaderboardPreview(data.leaderboard.slice(0, 5)); // Top 5
        
        // Find user's ranking
        const userRank = data.leaderboard.find(
          entry => entry.leetcodeUsername === user?.leetcodeUsername
        );
        if (userRank) {
          setMyRanking(userRank.position);
        }
      }
    } catch (error) {
      console.error('Error fetching leaderboard preview:', error);
    }
  };

  const fetchProgressOverview = async () => {
    try {
      const response = await fetch('/api/progress/overview', { credentials: 'include' });
      const data = await response.json();
      if (data.success) setProgressOverview(data.data);
    } catch (err) {}
  };

  const fetchStreakCalendar = async () => {
    try {
      const response = await fetch('/api/progress/streak-calendar', { credentials: 'include' });
      const data = await response.json();
      if (data.success) setStreakData(data.data);
    } catch (err) {}
  };

  const fetchRecentProblems = async () => {
    try {
      const response = await fetch('/api/progress/solved?limit=5', { credentials: 'include' });
      const data = await response.json();
      if (data.success) setRecentProblems(data.data.problems || []);
    } catch (err) {}
  };

  // Handle LeetCode username update completion
  const handleLeetCodeSetupComplete = (updatedUser) => {
    console.log('LeetCode setup completed:', updatedUser);
    setUser(updatedUser);
    fetchLeaderboardPreview(); // Refresh leaderboard data
  };

  // Use the user's LeetCode username from their profile, fallback to a default
  const leetcodeUsername = user?.leetcodeUsername || 'JustYuvaraj';

  if (isLoading) {
    return <DashboardShimmer />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">Error: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* LeetCode Setup Modal for OAuth users */}
      <LeetCodeSetup user={user} onComplete={handleLeetCodeSetupComplete} />
      
      <div className="min-h-screen bg-[#0f0f0f] text-white px-4 sm:px-8 py-8 grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="col-span-1">
          <LeetCodeProfile userName={leetcodeUsername} />
        </div>

        {/* Your Profile Card (GitHub style info) */}
        {/* <div className="col-span-1 bg-[#1a1a1a] rounded-xl p-4 shadow-md border border-[#333]">
          <div className="flex flex-col items-center text-center">
            <img
              src="https://avatars.githubusercontent.com/u/1?v=4"
              alt="avatar"
              className="w-20 h-20 rounded-full mb-2"
            />
            <h2 className="text-lg font-bold">{user?.username || 'User'}</h2>
            <p className="text-sm text-white/60">Rank ~5,000,000</p>
          </div>
          <div className="mt-4 text-sm space-y-1">
            <p className="text-white/80">🌍 India</p>
            <p className="text-white/80">🎓 Easwari Engineering College</p>
            <p className="text-white/80">🔗 justyuvaraj.com</p>
            <p className="text-white/80">🐙 GitHub: JustYuvaraj</p>
            <p className="text-white/80">🕊️ Twitter: JustYuvaraj</p>
            <p className="text-white/80">💼 LinkedIn: JustYuvaraj</p>
          </div>
          <div className="mt-6">
            <h4 className="text-white font-semibold mb-2">Community Stats</h4>
            <ul className="text-sm space-y-1">
              <li>👁 Views: 0</li>
              <li>✅ Solutions: 0</li>
              <li>💬 Discuss: 0</li>
              <li>⭐ Reputation: 0</li>
            </ul>
          </div>
        </div> */}

        {/* Right Content */}
        <div className="col-span-1 lg:col-span-3 flex flex-col gap-6">
          {/* Problem Stats */}
          <div className="bg-white/5 rounded-2xl p-4 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-1">
                {progressOverview?.solvedProblems || 0} / {progressOverview?.totalProblems || 0} Solved
              </h3>
              <p className="text-xs sm:text-sm text-white/60">{progressOverview?.attemptedProblems || 0} Attempting</p>
            </div>
            <div className="flex flex-wrap gap-4 text-sm">
              <p className="text-green-400">Easy: {progressOverview?.difficultyStats?.easy?.solved || 0}</p>
              <p className="text-yellow-400">Medium: {progressOverview?.difficultyStats?.medium?.solved || 0}</p>
              <p className="text-red-400">Hard: {progressOverview?.difficultyStats?.hard?.solved || 0}</p>
            </div>
          </div>

          {/* Leaderboard Preview */}
          <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-2">
              <h3 className="text-lg sm:text-xl font-semibold flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                Leaderboard
              </h3>
              <a 
                href="/leaderboard" 
                className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
              >
                View Full →
              </a>
            </div>
            
            {myRanking && (
              <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-lg p-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-white/80 text-sm">Your Ranking</span>
                  <span className="text-white font-bold">#{myRanking}</span>
                </div>
              </div>
            )}

            <div className="space-y-2">
              {leaderboardPreview.map((entry, index) => (
                <div key={entry.userId} className="flex flex-col sm:flex-row items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors gap-2">
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      index === 0 ? 'bg-yellow-400 text-black' :
                      index === 1 ? 'bg-gray-300 text-black' :
                      index === 2 ? 'bg-amber-600 text-white' :
                      'bg-white/10 text-white/70'
                    }`}>
                      {index + 1}
                    </span>
                    <div className="flex items-center gap-2">
                      <img
                        src={entry.avatar || 'https://via.placeholder.com/24'}
                        alt="avatar"
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="text-white text-sm truncate max-w-[100px] sm:max-w-[160px]">{entry.name}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    <span className="text-white/80 text-sm">{entry.totalSolved}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Streak Calendar */}
          <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
            <div className="flex flex-col sm:flex-row justify-between items-center text-sm mb-3 h-auto sm:h-[50px] gap-2">
              <span className="text-white font-medium h-[32px] flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 hover:bg-white/20 transition">
                {progressOverview?.solvedProblems || 0} submissions in the past one year
              </span>
              <div className="text-white/70 h-[29px] flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 hover:bg-white/20 transition">
                Total active days: {Object.keys(streakData).length} • Max streak: {progressOverview?.currentStreak || 0}
              </div>
            </div>
            <div className="overflow-x-auto">
              <StreakCalendar
                streakData={streakData}
                scale={0.55}
              />
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
            <div className="text-white text-sm font-medium mb-3">
              Recent Submissions
            </div>
            <ul className="text-sm text-white/80 space-y-2">
              {recentProblems.map((p, i) => (
                <li key={i} className="flex flex-col sm:flex-row justify-between gap-2">
                  <span className="truncate max-w-[180px] sm:max-w-[320px]">{p.problemId?.name || 'Unknown'}</span>
                  <span className="text-white/40">{p.solvedAt ? new Date(p.solvedAt).toLocaleDateString() : ''}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
