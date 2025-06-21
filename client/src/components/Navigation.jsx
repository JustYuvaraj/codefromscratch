// client/src/components/Navigation.jsx
// Your existing Navigation component, now adapted for isAuthenticated and onLogout props.

import React, { useState, useRef, useEffect } from "react";
import { FaBookOpen, FaHome, FaTools, FaCog, FaTrophy, FaUser, FaSignOutAlt, FaTachometerAlt, FaGithub, FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";

const navItems = [
  { label: "Home", icon: <FaHome />, href: "/" },
  { label: "Leaderboard", icon: <FaTrophy />, href: "/leaderboard" },
  { label: "Roadmaps", icon: <FaBookOpen />, href: "/roadmaps" },
  { label: "Tools", icon: <FaTools />, href: "/tools" },
];

export default function Navigation({ isAuthenticated, user, onLogout }) {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Debug logging
  console.log('Navigation render:', { isAuthenticated, user, isProfileDropdownOpen });

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Get user avatar (you can extend this to use actual profile pictures)
  const getUserAvatar = () => {
    try {
      // If user has a profile image, use it
      if (user?.profileImage) {
        // Fix the image URL to use the full backend URL for uploaded images
        let imageUrl = user.profileImage;
        if (imageUrl.startsWith('/uploads/')) {
          imageUrl = `http://localhost:5000${imageUrl}`;
        }
        
        return (
          <img 
            src={imageUrl} 
            alt="Profile" 
            className="w-full h-full rounded-full object-cover"
            onError={(e) => {
              // If image fails to load, fall back to icon
              e.target.style.display = 'none';
              if (e.target.nextSibling) {
                e.target.nextSibling.style.display = 'flex';
              }
            }}
          />
        );
      }

      // Fallback to icons based on OAuth provider
      if (user?.googleId) {
        return <FaGoogle className="w-4 h-4" />;
      } else if (user?.githubId) {
        return <FaGithub className="w-4 h-4" />;
      }
      return <FaUser className="w-4 h-4" />;
    } catch (error) {
      console.error('Error in getUserAvatar:', error);
      return <FaUser className="w-4 h-4" />;
    }
  };

  // Get initials for fallback avatar
  const getInitials = () => {
    const name = user?.name || user?.username || 'User';
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
  };

  const handleLogout = () => {
    console.log('Logout clicked');
    setIsProfileDropdownOpen(false);
    
    // Show a brief confirmation message with modern styling
    const message = document.createElement('div');
    message.className = 'fixed top-20 right-4 bg-[#1a1a1a] border border-white/10 text-white px-6 py-3 rounded-xl shadow-2xl backdrop-blur-md z-50 flex items-center gap-3';
    message.innerHTML = `
      <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
      <span class="text-sm font-medium">Successfully logged out</span>
    `;
    document.body.appendChild(message);
    
    // Remove the message after 3 seconds
    setTimeout(() => {
      if (message.parentNode) {
        message.parentNode.removeChild(message);
      }
    }, 3000);
    
    onLogout();
  };

  const handleProfileClick = () => {
    console.log('Profile clicked, current state:', isProfileDropdownOpen);
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  // Safety check for user data
  if (!user && isAuthenticated) {
    console.warn('User is authenticated but user data is missing');
  }

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/5 backdrop-blur-md border-b border-white/10 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* LEFT: Brand + Nav Items */}
        <div className="flex items-center gap-8">
          {/* Brand */}
          <Link to="/" className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent font-mono">
            CodeFromScratch
          </Link>

          {/* Nav Items */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-white/70 hover:text-white transition-colors">Home</Link>
            <Link to="/courses" className="text-white/70 hover:text-white transition-colors">Courses</Link>
            <Link to="/leaderboard" className="text-white/70 hover:text-white transition-colors">Leaderboard</Link>
            <Link to="/roadmaps" className="text-white/70 hover:text-white transition-colors">Roadmaps</Link>
            <Link to="/tools" className="text-white/70 hover:text-white transition-colors">Tools</Link>
          </div>
        </div>

        {/* RIGHT: Auth Buttons / User Profile */}
        <div className="flex gap-3 items-center">
          {isAuthenticated ? (
            <div className="relative" ref={dropdownRef}>
              {/* Profile Button */}
              <button
                onClick={handleProfileClick}
                className="flex items-center gap-3 p-2 rounded-full hover:bg-white/10 transition-all duration-300 group"
              >
                {/* Profile Picture */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm shadow-lg group-hover:shadow-xl transition-all duration-300 overflow-hidden">
                  {getUserAvatar()}
                  {/* Fallback initials/icon */}
                  <div className="w-full h-full flex items-center justify-center text-xs font-semibold" style={{ display: 'none' }}>
                    {getInitials()}
                  </div>
                </div>
                
                {/* User Info */}
                <div className="hidden sm:block text-left">
                  <p className="text-white font-medium text-sm">{user?.name || user?.username || 'User'}</p>
                  <p className="text-white/60 text-xs">{user?.email}</p>
                </div>
              </button>

              {/* Profile Dropdown */}
              {isProfileDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-2xl backdrop-blur-md overflow-hidden">
                  {/* User Header */}
                  <div className="p-6 border-b border-white/10">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg shadow-lg overflow-hidden">
                        {getUserAvatar()}
                        {/* Fallback initials/icon */}
                        <div className="w-full h-full flex items-center justify-center text-lg font-semibold" style={{ display: 'none' }}>
                          {getInitials()}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-semibold text-lg">{user?.name || user?.username || 'User'}</h3>
                        <p className="text-white/60 text-sm">{user?.email}</p>
                        {user?.leetcodeUsername && (
                          <p className="text-blue-400 text-sm mt-1">
                            LeetCode: {user.leetcodeUsername}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Navigation Links */}
                  <div className="p-2">
                    <Link
                      to="/dashboard"
                      onClick={() => setIsProfileDropdownOpen(false)}
                      className="flex items-center gap-3 w-full p-3 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300"
                    >
                      <FaTachometerAlt className="w-4 h-4" />
                      <span>Dashboard</span>
                    </Link>
                    
                    <Link
                      to="/settings"
                      onClick={() => setIsProfileDropdownOpen(false)}
                      className="flex items-center gap-3 w-full p-3 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300"
                    >
                      <FaCog className="w-4 h-4" />
                      <span>Settings</span>
                    </Link>
                  </div>

                  {/* Logout Section */}
                  <div className="p-2 border-t border-white/10">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full p-3 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-300"
                    >
                      <FaSignOutAlt className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-1.5 text-sm text-white rounded-md border border-white/20 hover:border-white/40 hover:bg-white/10 transition duration-300"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-1.5 text-sm text-white rounded-md bg-gradient-to-br from-purple-500/60 to-blue-500/60 hover:from-purple-400/80 hover:to-blue-400/80 shadow-md hover:shadow-lg transition duration-300"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
