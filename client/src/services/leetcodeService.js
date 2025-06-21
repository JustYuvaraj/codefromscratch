// client/src/services/leetcodeService.js
// Service for LeetCode-related operations

// Function to validate if a LeetCode username exists
export const validateLeetCodeUsername = async (username) => {
  try {
    const response = await fetch('/leetcode', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          query getUserProfile($username: String!) {
            matchedUser(username: $username) {
              username
              profile {
                realName
                userAvatar
                ranking
              }
            }
          }
        `,
        variables: { username },
      }),
    });

    const result = await response.json();
    
    // If matchedUser is null, the username doesn't exist
    if (!result.data?.matchedUser) {
      throw new Error('LeetCode username not found');
    }
    
    return {
      isValid: true,
      user: result.data.matchedUser
    };
  } catch (error) {
    console.error('LeetCode validation error:', error);
    return {
      isValid: false,
      error: error.message || 'Failed to validate LeetCode username'
    };
  }
};

// Function to get LeetCode user data
export const getLeetCodeUserData = async (username) => {
  try {
    const response = await fetch('/leetcode', {
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
        variables: { username },
      }),
    });

    const result = await response.json();
    
    if (!result.data?.matchedUser) {
      throw new Error('LeetCode user not found');
    }
    
    return result.data;
  } catch (error) {
    console.error('LeetCode fetch error:', error);
    throw error;
  }
}; 