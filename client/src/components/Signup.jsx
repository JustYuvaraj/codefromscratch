// client/src/components/Signup.jsx
// This component handles user registration (local and OAuth).

import React, { useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from 'react-router-dom';
import { register } from "../services/authService";
import { validateLeetCodeUsername } from "../services/leetcodeService";

export default function Signup() {
  const [form, setForm] = useState({ leetcodeUsername: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isValidatingLeetCode, setIsValidatingLeetCode] = useState(false);
  const [leetcodeValidation, setLeetcodeValidation] = useState({ isValid: null, message: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Clear validation when user starts typing
    if (name === 'leetcodeUsername') {
      setLeetcodeValidation({ isValid: null, message: "" });
    }
  };

  // Validate LeetCode username when user stops typing
  const handleLeetCodeUsernameBlur = async () => {
    if (!form.leetcodeUsername.trim()) {
      setLeetcodeValidation({ isValid: false, message: "LeetCode username is required" });
      return;
    }

    setIsValidatingLeetCode(true);
    try {
      const validation = await validateLeetCodeUsername(form.leetcodeUsername);
      setLeetcodeValidation({
        isValid: validation.isValid,
        message: validation.isValid ? "✅ Valid LeetCode username" : `❌ ${validation.error}`
      });
    } catch (error) {
      setLeetcodeValidation({
        isValid: false,
        message: "❌ Failed to validate LeetCode username"
      });
    } finally {
      setIsValidatingLeetCode(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if LeetCode username is valid before submitting
    if (!leetcodeValidation.isValid) {
      setMessage("❌ Please enter a valid LeetCode username");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const response = await register(form);
      console.log("✅ Signup Success:", response);
      setMessage("✅ Account created successfully! Redirecting to courses...");
      setForm({ leetcodeUsername: "", email: "", password: "" }); // Clear form on success
      
      // Redirect to courses after a short delay
      setTimeout(() => {
        navigate('/courses');
      }, 1500);
      
    } catch (error) {
      console.error("❌ Signup Error:", error);
      setMessage("❌ " + (error.message || "Signup failed. Please try again."));
    } finally {
      setIsLoading(false);
    }
  };

  // Base URL for your backend API
  const BACKEND_URL = 'http://localhost:5000';

  // Function to initiate Google OAuth login
  const handleGoogleLogin = () => {
    window.location.href = `${BACKEND_URL}/api/auth/google`;
  };

  // Function to initiate GitHub OAuth login
  const handleGithubLogin = () => {
    window.location.href = `${BACKEND_URL}/api/auth/github`;
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
          onClick={handleGithubLogin}
          className="w-full flex items-center justify-center gap-3 bg-white/5 border border-white/10 text-white rounded-lg py-3 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
        >
          <FaGithub className="text-xl" />
          Continue with GitHub
        </button>
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 bg-white/5 border border-white/10 text-white rounded-lg py-3 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
        >
          <FcGoogle className="text-xl" />
          Continue with Google
        </button>
        <button
          className="w-full flex items-center justify-center gap-3 bg-white/5 border border-white/10 text-white rounded-lg py-3 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
        >
          <FaLinkedin className="text-[#0A66C2]" />
          Continue with LinkedIn
        </button>
      </div>

      <div className="flex items-center">
        <hr className="flex-1 border-white/10" />
        <span className="mx-3 text-white/40 text-sm">OR</span>
        <hr className="flex-1 border-white/10" />
      </div>

      {/* Traditional Signup Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <input
            type="text"
            name="leetcodeUsername"
            placeholder="LeetCode Username"
            value={form.leetcodeUsername}
            onChange={handleChange}
            onBlur={handleLeetCodeUsernameBlur}
            required
            disabled={isLoading}
            className={`w-full bg-white/5 border text-white px-4 py-3 rounded-lg placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 disabled:opacity-50 ${
              leetcodeValidation.isValid === true ? 'border-green-500/50' : 
              leetcodeValidation.isValid === false ? 'border-red-500/50' : 
              'border-white/10'
            }`}
          />
          {leetcodeValidation.message && (
            <p className={`text-xs ${
              leetcodeValidation.isValid ? 'text-green-400' : 'text-red-400'
            }`}>
              {isValidatingLeetCode ? 'Validating...' : leetcodeValidation.message}
            </p>
          )}
        </div>
        
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
          disabled={isLoading}
          className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 rounded-lg placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 disabled:opacity-50"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          disabled={isLoading}
          className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 rounded-lg placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isLoading || !leetcodeValidation.isValid}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/20 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>

      <p className="text-sm text-center text-white/60">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-400 hover:text-blue-300 transition-colors">
          Login
        </Link>
      </p>
    </div>
  );
}
