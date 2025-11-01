// Validate LeetCode username using backend API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const validateLeetCodeUsername = async (username) => {
  console.log(`Validating LeetCode username: ${username}`);
  
  try {
    if (!username || !username.trim()) {
      return { isValid: false, error: 'Username cannot be empty.' };
    }

    const response = await fetch(`${API_BASE_URL}/auth/validate-leetcode`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username.trim() }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error validating LeetCode username:', error);
    return { 
      isValid: false, 
      error: 'Failed to validate LeetCode username. Please try again.' 
    };
  }
};