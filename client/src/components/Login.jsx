// client/src/components/Login.jsx
// This component provides traditional login fields and OAuth buttons.

import React, { useState } from 'react';
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/authService';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Base URL for your backend API
  const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  // Handle traditional form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const response = await login({ email, password });
      console.log('✅ Login Success:', response);
      setMessage('✅ Login successful! Redirecting...');
      
      // Clear form
      setEmail('');
      setPassword('');
      
      // Redirect to courses after a short delay
      setTimeout(() => {
        navigate('/courses');
      }, 1500);
      
    } catch (error) {
      console.error('❌ Login Error:', error);
      setMessage('❌ ' + (error.message || 'Login failed. Please try again.'));
    } finally {
      setIsLoading(false);
    }
  };

  // Function to initiate Google OAuth login
  const handleGoogleLogin = () => {
    const isProd = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
    const backendUrl = isProd
      ? 'https://codefromscratch.onrender.com'
      : 'http://localhost:5000';
    window.location.href = `${backendUrl}/api/auth/google`;
  };

  // Function to initiate GitHub OAuth login
  const handleGitHubLogin = () => {
    const isProd = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
    const backendUrl = isProd
      ? 'https://codefromscratch.onrender.com'
      : 'http://localhost:5000';
    window.location.href = `${backendUrl}/api/auth/github`;
  };

  return (
    <div className="space-y-6">
      {message && (
        <div className={`p-3 rounded-lg text-sm text-center ${
          message.includes('✅') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
        }`}>
          {message}
        </div>
      )}

      {/* OAuth Buttons */}
      <div className="space-y-3">
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 bg-white/5 border border-white/10 text-white rounded-lg py-3 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
        >
          <FcGoogle className="text-xl" />
          Continue with Google
        </button>

        <button
          onClick={handleGitHubLogin}
          className="w-full flex items-center justify-center gap-3 bg-white/5 border border-white/10 text-white rounded-lg py-3 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
        >
          <FaGithub className="text-xl" />
          Continue with GitHub
        </button>
      </div>

      <div className="flex items-center">
        <hr className="flex-1 border-white/10" />
        <span className="mx-3 text-white/40 text-sm">OR</span>
        <hr className="flex-1 border-white/10" />
      </div>

      {/* Traditional Login Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Email Address"
          disabled={isLoading}
          className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 rounded-lg placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 disabled:opacity-50"
        />
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Password"
          disabled={isLoading}
          className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 rounded-lg placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/20 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>

      <p className="text-sm text-center text-white/60">
        Don't have an account?{" "}
        <Link to="/register" className="text-blue-400 hover:text-blue-300 transition-colors">
          Sign Up
        </Link>
      </p>
    </div>
  );
}

export default Login;
