import React, { useState } from 'react';
import ProfileSettings from '../components/ProfileSettings';
import { FaUser, FaCog, FaTrash } from 'react-icons/fa';

export default function SettingsPage({ user, onUserUpdate }) {
  const [showProfileSettings, setShowProfileSettings] = useState(false);

  // Handle user data update
  const handleUserUpdate = (updatedUser) => {
    console.log('SettingsPage updating user state:', updatedUser);
    
    // Update local state if needed
    if (onUserUpdate) {
      onUserUpdate(updatedUser);
    }
    
    // Also update the global user state
    if (window.updateGlobalUser) {
      window.updateGlobalUser(updatedUser);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/70">Please log in to access settings.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white p-4 sm:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
          <p className="text-white/70">Manage your account and preferences</p>
        </div>

        <div className="space-y-6">
          {/* Profile Settings Card */}
          <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#333]">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <FaUser className="text-blue-400 text-xl" />
                <h2 className="text-xl font-bold text-white">Profile Settings</h2>
              </div>
              <button
                onClick={() => setShowProfileSettings(true)}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-semibold"
              >
                Edit Profile
              </button>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg shadow-lg overflow-hidden">
                {user.profileImage ? (
                  <img 
                    src={user.profileImage.startsWith('/uploads/') ? `http://localhost:5000${user.profileImage}` : user.profileImage} 
                    alt="Profile" 
                    className="w-full h-full rounded-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      if (e.target.nextSibling) {
                        e.target.nextSibling.style.display = 'flex';
                      }
                    }}
                  />
                ) : (
                  <span>{user.name?.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2)}</span>
                )}
              </div>
              <div>
                <p className="text-white font-medium text-lg">{user.name || user.username}</p>
                <p className="text-white/60 text-sm">{user.email}</p>
                {user.leetcodeUsername && (
                  <p className="text-blue-400 text-sm">LeetCode: {user.leetcodeUsername}</p>
                )}
              </div>
            </div>
          </div>

          {/* Account Settings */}
          <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#333]">
            <div className="flex items-center gap-3 mb-6">
              <FaCog className="text-purple-400 text-xl" />
              <h2 className="text-xl font-bold text-white">Account</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Account Type</p>
                  <p className="text-sm text-white/60">
                    {user.googleId ? 'Google OAuth' : user.githubId ? 'GitHub OAuth' : 'Email/Password'}
                  </p>
                </div>
                <span className="text-xs text-white/40 px-2 py-1 bg-white/5 rounded">
                  {user.googleId ? 'Google' : user.githubId ? 'GitHub' : 'Local'}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Member Since</p>
                  <p className="text-sm text-white/60">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-[#1a1a1a] rounded-xl p-6 border border-red-500/20">
            <div className="flex items-center gap-3 mb-6">
              <FaTrash className="text-red-400 text-xl" />
              <h2 className="text-xl font-bold text-red-400">Danger Zone</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Delete Account</p>
                  <p className="text-sm text-white/60">
                    Permanently delete your account and all associated data
                  </p>
                </div>
                <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Settings Modal */}
      {showProfileSettings && (
        <ProfileSettings
          user={user}
          onUpdate={handleUserUpdate}
          onClose={() => setShowProfileSettings(false)}
        />
      )}
    </div>
  );
} 