// client/src/components/LeetCodeSetup.jsx
// Component for OAuth users to set their LeetCode username after first login

import React, { useState } from 'react';
import { validateLeetCodeUsername } from '../services/leetcodeService.jsx';

export default function LeetCodeSetup({ user, onComplete }) {
  const [leetcodeUsername, setLeetCodeUsername] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [validation, setValidation] = useState({ isValid: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [skipValidation, setSkipValidation] = useState(false);

  const handleLeetCodeUsernameChange = (e) => {
    setLeetCodeUsername(e.target.value);
    setValidation({ isValid: null, message: '' });
  };

  const handleLeetCodeUsernameBlur = async () => {
    if (!leetcodeUsername.trim()) {
      setValidation({ isValid: false, message: 'LeetCode username is required' });
      return;
    }

    if (skipValidation) {
      setValidation({ isValid: true, message: '✅ Username entered (validation skipped)' });
      return;
    }

    setIsValidating(true);
    try {
      const result = await validateLeetCodeUsername(leetcodeUsername);
      setValidation({
        isValid: result.isValid,
        message: result.isValid ? '✅ Valid LeetCode username' : `❌ ${result.error}`
      });
    } catch (error) {
      console.error('LeetCode validation error:', error);
      setValidation({
        isValid: false,
        message: '❌ Failed to validate LeetCode username. You can skip validation or try again.'
      });
    } finally {
      setIsValidating(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!leetcodeUsername.trim()) {
      setMessage('❌ Please enter a LeetCode username');
      return;
    }

    if (!validation.isValid && !skipValidation) {
      setMessage('❌ Please enter a valid LeetCode username or skip validation');
      return;
    }

    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await fetch('/api/auth/update-leetcode-username', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          leetcodeUsername,
          skipValidation: skipValidation || !validation.isValid
        }),
        credentials: 'include'
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update LeetCode username');
      }

      setMessage('✅ LeetCode username updated successfully!');
      
      // Call the onComplete callback to refresh user data
      setTimeout(() => {
        onComplete(data.user);
      }, 1500);

    } catch (error) {
      console.error('Update LeetCode username error:', error);
      setMessage('❌ ' + (error.message || 'Failed to update LeetCode username'));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Check if user has a temporary LeetCode username (starts with 'user_')
  const hasTemporaryUsername = user?.leetcodeUsername?.startsWith('user_');

  if (!hasTemporaryUsername) {
    return null; // Don't show this component if user already has a proper LeetCode username
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-[#1a1a1a] rounded-2xl p-8 max-w-md w-full border border-[#333] shadow-2xl">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">Welcome to CodeFromScratch!</h2>
          <p className="text-white/70">
            To display your LeetCode profile, please provide your LeetCode username.
          </p>
        </div>

        {message && (
          <div className={`p-3 rounded-lg text-sm text-center mb-4 ${
            message.includes('✅') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
          }`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/80">
              LeetCode Username
            </label>
            <input
              type="text"
              value={leetcodeUsername}
              onChange={handleLeetCodeUsernameChange}
              onBlur={handleLeetCodeUsernameBlur}
              placeholder="Enter your LeetCode username"
              required
              disabled={isSubmitting}
              className={`w-full bg-white/5 border text-white px-4 py-3 rounded-lg placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 disabled:opacity-50 ${
                validation.isValid === true ? 'border-green-500/50' : 
                validation.isValid === false ? 'border-red-500/50' : 
                'border-white/10'
              }`}
            />
            {validation.message && (
              <p className={`text-xs ${
                validation.isValid ? 'text-green-400' : 'text-red-400'
              }`}>
                {isValidating ? 'Validating...' : validation.message}
              </p>
            )}
          </div>

          {/* Skip validation option */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="skipValidation"
              checked={skipValidation}
              onChange={(e) => setSkipValidation(e.target.checked)}
              className="rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500"
            />
            <label htmlFor="skipValidation" className="text-sm text-white/70">
              Skip validation (if validation fails)
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || (!validation.isValid && !skipValidation)}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/20 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Updating...' : 'Set LeetCode Username'}
          </button>
        </form>

        <p className="text-xs text-center text-white/50 mt-4">
          You can change this later in your profile settings.
        </p>
      </div>
    </div>
  );
} 