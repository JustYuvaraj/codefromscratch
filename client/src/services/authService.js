// client/src/services/authService.js
// This is a placeholder for your authentication service functions.
// You'll need to implement the actual logic for local signup/login here
// if you plan to use email/password authentication alongside OAuth.

const API_BASE_URL = '/api'; // Your backend API base URL

// Function for local user registration
export const register = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      // If the response is not OK (e.g., 400, 401, 500), throw an error
      throw new Error(data.message || 'Registration failed');
    }

    return data; // Return success message or user data
  } catch (error) {
    console.error('Error in authService.register:', error);
    throw error; // Re-throw to be caught by the component
  }
};

// Function for local user login (example)
export const login = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    return data; // Return success message or user data/token
  } catch (error) {
    console.error('Error in authService.login:', error);
    throw error;
  }
};

// You can add more functions here, e.g., for password reset, email verification etc.
