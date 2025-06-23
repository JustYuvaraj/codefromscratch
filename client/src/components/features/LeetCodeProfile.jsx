import React, { useEffect, useState } from 'react';
import { Globe, User, CheckCircle2, Star, Trophy, LineChart } from 'lucide-react'; // Lucide icons

export default function LeetCodeProfile({ userName, endpoint = '/leetcode' }) {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchLeetCodeData() {
      if (!userName) {
        console.log('No username provided to LeetCodeProfile');
        setError(true);
        setIsLoading(false);
        return;
      }

      try {
        console.log('Fetching LeetCode data for:', userName);
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: `
              query getUserProfile($username: String!) {
                allQuestionsCount { difficulty count }
                matchedUser(username: $username) {
                  username
                  profile {
                    realName
                    userAvatar
                    ranking
                    countryName
                  }
                  submitStats {
                    acSubmissionNum { difficulty count }
                  }
                }
              }
            `,
            variables: { username: userName },
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('LeetCode data received:', result);
        
        if (result.data?.matchedUser) {
          setUserData(result.data);
        } else {
          console.warn('No matched user found for:', userName);
          setError(true);
        }
      } catch (err) {
        console.error('LeetCode fetch error:', err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchLeetCodeData();
  }, [userName, endpoint]);

  if (isLoading) {
    return (
      <div className="bg-[#1a1a1a] rounded-xl p-4 text-white/70 border border-[#333]">
        <div className="animate-pulse">
          <div className="w-20 h-20 rounded-full bg-white/10 mx-auto mb-2"></div>
          <div className="h-4 bg-white/10 rounded mb-2"></div>
          <div className="h-3 bg-white/10 rounded"></div>
        </div>
      </div>
    );
  }

  if (error || !userData?.matchedUser) {
    return (
      <div className="bg-[#1a1a1a] rounded-xl p-4 border border-[#333]">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg mx-auto mb-2">
            {userName ? userName.charAt(0).toUpperCase() : 'U'}
          </div>
          <h2 className="text-lg font-bold text-white">{userName || 'User'}</h2>
          <p className="text-sm text-white/60 mb-4">LeetCode Profile</p>
          <div className="text-red-400 text-sm">
            ⚠️ Failed to load LeetCode data
          </div>
          <div className="mt-4 text-sm space-y-1 text-white/80">
            <p>Username: {userName || 'Not set'}</p>
            <p>Status: Profile not found or API error</p>
          </div>
        </div>
      </div>
    );
  }

  const user = userData.matchedUser;
  const solved = user.submitStats.acSubmissionNum;
  const totalSolved = solved.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="bg-[#1a1a1a] rounded-xl p-4 shadow-md border border-[#333] text-white">
      <div className="flex flex-col items-center text-center">
        <img
          src={user.profile.userAvatar}
          alt="avatar"
          className="w-20 h-20 rounded-full mb-2 border border-gray-700"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'block';
          }}
        />
        <div 
          className="w-20 h-20 rounded-full mb-2 border border-gray-700 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg"
          style={{ display: 'none' }}
        >
          {user.username.charAt(0).toUpperCase()}
        </div>
        <h2 className="text-lg font-bold">{user.username}</h2>
        <p className="text-sm text-white/60 flex items-center gap-1">
          <LineChart className="w-4 h-4" /> Rank #{user.profile.ranking}
        </p>
      </div>

      <div className="mt-4 text-sm space-y-1 text-white/80">
        {user.profile.realName && (
          <p className="flex items-center gap-2">
            <User className="w-4 h-4" /> {user.profile.realName}
          </p>
        )}
        {user.profile.countryName && (
          <p className="flex items-center gap-2">
            <Globe className="w-4 h-4" /> {user.profile.countryName}
          </p>
        )}
        <p className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-green-400" /> Total Solved: {totalSolved}
        </p>
        <p className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-green-500" /> Easy: {solved[0]?.count || 0}
        </p>
        <p className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-yellow-400" /> Medium: {solved[1]?.count || 0}
        </p>
        <p className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-red-500" /> Hard: {solved[2]?.count || 0}
        </p>
      </div>

      <div className="mt-6">
        <h4 className="text-white font-semibold mb-2">LeetCode Stats</h4>
        <ul className="text-sm space-y-1 text-white/80">
          <li className="flex items-center gap-2">
            <Star className="w-4 h-4" /> Reputation: N/A
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> Discuss: N/A
          </li>
        </ul>
      </div>
    </div>
  );
}
