// client/src/AuthPage.jsx
// This component displays either the Login or Signup form, based on a prop.

import React, { useState, useEffect } from 'react';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';

export default function AuthPage({ isLogin: initialIsLogin = true }) {
  const [isLogin, setIsLogin] = useState(initialIsLogin);

  // Update state if initialIsLogin prop changes (e.g., navigating directly to /register)
  useEffect(() => {
    setIsLogin(initialIsLogin);
  }, [initialIsLogin]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
            CodeFromScratch
          </h1>
          <p className="text-white/70">
            {isLogin ? 'Welcome back!' : 'Join our community'}
          </p>
        </div>

        {/* Auth Container */}
        <div className="relative w-full rounded-3xl bg-gradient-to-br from-[#0b0c1a] via-[#0f111f] to-[#101118] 
          border border-[#2c2c3a] shadow-[0_0_40px_#00f2ff22] p-8">
          
          {/* Tab Switcher */}
          <div className="flex bg-white/5 rounded-xl p-1 mb-8">
            <button
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-300 ${
                isLogin
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-white/70 hover:text-white'
              }`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-300 ${
                !isLogin
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-white/70 hover:text-white'
              }`}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
          </div>

          {/* Form Content */}
          {isLogin ? <Login /> : <Signup />}
        </div>
      </div>
    </div>
  );
}
