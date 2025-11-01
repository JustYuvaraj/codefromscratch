# API Documentation

Complete reference for all backend API endpoints in the CodeFromScratch platform.

**Base URL**: `http://localhost:5000/api` (development) or `https://your-domain.com/api` (production)

**Authentication**: Session-based using HTTP-only cookies

---

## 📑 Table of Contents

- [Authentication Routes](#authentication-routes)
- [User Routes](#user-routes)
- [DSA Routes](#dsa-routes)
- [Progress Routes](#progress-routes)
- [Topic Routes](#topic-routes)

---

## 🔐 Authentication Routes

Base path: `/api/auth`

### Register User (Local)

Creates a new user account with email/password authentication.

**Endpoint**: `POST /api/auth/register`

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "SecurePass123",
  "leetcodeUsername": "validLeetCodeUser"
}
```

**Success Response** (201):
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "validLeetCodeUser",
    "email": "user@example.com",
    "leetcodeUsername": "validLeetCodeUser",
    "name": "John Doe",
    "profileImage": null,
    "profileImageSource": null
  }
}
```

**Error Responses**:
- `400`: User already exists or invalid LeetCode username
- `500`: Server error

**Notes**:
- Automatically validates LeetCode username via LeetCode API
- Password is hashed using bcrypt before storage
- User is automatically logged in after registration
- Session cookie is set in response

---

### Login User (Local)

Authenticates user with email and password.

**Endpoint**: `POST /api/auth/login`

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "SecurePass123"
}
```

**Success Response** (200):
```json
{
  "message": "Login successful",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "validLeetCodeUser",
    "email": "user@example.com",
    "leetcodeUsername": "validLeetCodeUser",
    "name": "John Doe",
    "profileImage": "https://...",
    "profileImageSource": "google",
    "googleProfile": {...},
    "githubProfile": {...}
  }
}
```

**Error Responses**:
- `400`: Invalid credentials or OAuth-only account
- `500`: Server error

---

### Validate LeetCode Username

Validates a LeetCode username without creating an account.

**Endpoint**: `POST /api/auth/validate-leetcode`

**Request Body**:
```json
{
  "username": "leetcodeUser"
}
```

**Success Response** (200):
```json
{
  "isValid": true,
  "user": {
    "username": "leetcodeUser",
    "profile": {
      "realName": "John Doe",
      "userAvatar": "https://...",
      "ranking": 150000
    }
  }
}
```

**Error Response**:
```json
{
  "isValid": false,
  "error": "LeetCode username not found"
}
```

---

### Google OAuth Login

Initiates Google OAuth authentication flow.

**Endpoint**: `GET /api/auth/google`

**Response**: Redirects to Google OAuth consent screen

**Callback**: `GET /api/auth/google/callback`

**Success**: Redirects to `{FRONTEND_URL}/?authStatus=success`

**Failure**: Redirects to `{FRONTEND_URL}/login?authStatus=failure`

---

### GitHub OAuth Login

Initiates GitHub OAuth authentication flow.

**Endpoint**: `GET /api/auth/github`

**Response**: Redirects to GitHub OAuth consent screen

**Callback**: `GET /api/auth/github/callback`

**Success**: Redirects to `{FRONTEND_URL}/?authStatus=success`

**Failure**: Redirects to `{FRONTEND_URL}/login?authStatus=failure`

---

### Get Current User

Returns the currently authenticated user's information.

**Endpoint**: `GET /api/auth/current_user`

**Authentication**: Required

**Success Response** (200):
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "username": "user123",
  "email": "user@example.com",
  "leetcodeUsername": "leetcodeUser",
  "name": "John Doe",
  "profileImage": "https://...",
  "profileImageSource": "google",
  "googleProfile": {
    "picture": "https://...",
    "given_name": "John",
    "family_name": "Doe"
  },
  "githubProfile": null,
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

**Error Response** (401):
```json
{
  "message": "Not authenticated"
}
```

---

### Update LeetCode Username

Updates the user's LeetCode username (for OAuth users or changes).

**Endpoint**: `PUT /api/auth/update-leetcode-username`

**Authentication**: Required

**Request Body**:
```json
{
  "leetcodeUsername": "newLeetCodeUser",
  "skipValidation": false
}
```

**Success Response** (200):
```json
{
  "message": "LeetCode username updated successfully",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "user123",
    "email": "user@example.com",
    "leetcodeUsername": "newLeetCodeUser",
    "name": "John Doe",
    "profileImage": "https://...",
    "profileImageSource": "leetcode"
  }
}
```

**Error Responses**:
- `400`: Username already taken or invalid
- `401`: Not authenticated
- `500`: Server error

---

### Update Profile Image

Updates the user's profile image source.

**Endpoint**: `PUT /api/auth/update-profile-image`

**Authentication**: Required

**Request Body**:
```json
{
  "imageUrl": "https://...",
  "imageSource": "google"
}
```

**Valid Sources**: `google`, `github`, `leetcode`, `custom`, `upload`

**Success Response** (200):
```json
{
  "message": "Profile image updated successfully",
  "user": {...}
}
```

---

### Upload Profile Image

Uploads a custom profile image file.

**Endpoint**: `POST /api/auth/upload-profile-image`

**Authentication**: Required

**Request**: `multipart/form-data`

**Form Field**: `profileImage` (file)

**File Constraints**:
- Max size: 100KB
- Allowed types: image/*

**Success Response** (200):
```json
{
  "message": "Profile image uploaded successfully",
  "user": {...},
  "fileUrl": "/uploads/profile-images/profile-1234567890.jpg"
}
```

---

### Get Available Profile Images

Returns all available profile image sources for the current user.

**Endpoint**: `GET /api/auth/profile-images`

**Authentication**: Required

**Success Response** (200):
```json
{
  "success": true,
  "availableImages": [
    {
      "url": "https://...",
      "source": "google",
      "label": "Google Profile",
      "isCurrent": false
    },
    {
      "url": "https://...",
      "source": "github",
      "label": "GitHub Profile",
      "isCurrent": false
    },
    {
      "url": "https://...",
      "source": "leetcode",
      "label": "LeetCode Profile",
      "isCurrent": true
    }
  ],
  "currentImage": "https://...",
  "currentSource": "leetcode"
}
```

---

### Logout

Logs out the current user and destroys the session.

**Endpoint**: `POST /api/auth/logout`

**Authentication**: Required

**Success Response** (200):
```json
{
  "message": "Logged out successfully"
}
```

**Alternative**: `GET /api/auth/logout` (redirects to login page)

---

## 👥 User Routes

Base path: `/api/users`

### Get All Users

Returns a list of all registered users.

**Endpoint**: `GET /api/users`

**Success Response** (200):
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "username": "user1",
    "email": "user1@example.com",
    "leetcodeUsername": "leetcode1",
    "name": "User One",
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  ...
]
```

---

### Get Leaderboard

Returns the global leaderboard with LeetCode statistics.

**Endpoint**: `GET /api/users/leaderboard`

**Success Response** (200):
```json
{
  "success": true,
  "leaderboard": [
    {
      "userId": "507f1f77bcf86cd799439011",
      "username": "user1",
      "leetcodeUsername": "leetcode1",
      "name": "User One",
      "email": "user1@example.com",
      "avatar": "https://...",
      "ranking": 150000,
      "totalSolved": 450,
      "easySolved": 200,
      "mediumSolved": 200,
      "hardSolved": 50,
      "memberSince": "2024-01-01T00:00:00.000Z",
      "position": 1
    },
    ...
  ],
  "totalUsers": 25
}
```

**Notes**:
- Sorted by totalSolved (desc), then ranking (asc)
- Excludes users with temporary LeetCode usernames
- Fetches real-time data from LeetCode API

---

### Get My Stats

Returns the authenticated user's LeetCode statistics.

**Endpoint**: `GET /api/users/my-stats`

**Authentication**: Required

**Success Response** (200):
```json
{
  "success": true,
  "stats": {
    "username": "user1",
    "leetcodeUsername": "leetcode1",
    "name": "User One",
    "avatar": "https://...",
    "ranking": 150000,
    "totalSolved": 450,
    "easySolved": 200,
    "mediumSolved": 200,
    "hardSolved": 50,
    "memberSince": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error Responses**:
- `401`: Not authenticated
- `404`: User not found or no LeetCode username set

---

## 📚 DSA Routes

Base path: `/api/dsa`

### Get Complete DSA Plan

Returns the entire 200-day DSA study plan.

**Endpoint**: `GET /api/dsa/plan`

**Success Response** (200):
```json
{
  "success": true,
  "data": {
    "metadata": {
      "totalDays": 200,
      "totalWeeks": 29,
      "totalProblems": 600,
      "difficulty": {
        "easy": 200,
        "medium": 300,
        "hard": 100
      }
    },
    "plan": {
      "days": [
        {
          "day": 1,
          "week": 1,
          "topic": "Arrays",
          "problems": [...]
        },
        ...
      ]
    }
  }
}
```

---

### Get Day Problems

Returns problems for a specific day.

**Endpoint**: `GET /api/dsa/day/:dayNumber`

**Parameters**:
- `dayNumber` (1-200)

**Success Response** (200):
```json
{
  "success": true,
  "data": {
    "day": 1,
    "week": 1,
    "topic": "Arrays",
    "problems": [
      {
        "name": "Two Sum",
        "difficulty": "Easy",
        "link": "https://leetcode.com/problems/two-sum/",
        "concept": "Hash Table",
        "faangCompanies": ["Google", "Amazon", "Microsoft"],
        "buildingBlock": "Array basics"
      },
      ...
    ]
  }
}
```

**Error Response** (404):
```json
{
  "success": false,
  "message": "Day 201 not found"
}
```

---

### Get Week Problems

Returns all problems for a specific week.

**Endpoint**: `GET /api/dsa/week/:weekNumber`

**Parameters**:
- `weekNumber` (1-29)

**Success Response** (200):
```json
{
  "success": true,
  "data": [
    {
      "day": 1,
      "week": 1,
      "topic": "Arrays",
      "problems": [...]
    },
    ...
  ]
}
```

---

### Get Problems by Difficulty

Returns all problems of a specific difficulty level.

**Endpoint**: `GET /api/dsa/difficulty/:difficulty`

**Parameters**:
- `difficulty`: `easy`, `medium`, or `hard`

**Success Response** (200):
```json
{
  "success": true,
  "data": [
    {
      "name": "Two Sum",
      "difficulty": "Easy",
      "link": "https://...",
      "day": 1,
      "week": 1,
      "topic": "Arrays"
    },
    ...
  ]
}
```

---

### Get Problems by Company

Returns all problems tagged with a specific FAANG company.

**Endpoint**: `GET /api/dsa/company/:company`

**Parameters**:
- `company`: `google`, `amazon`, `facebook`, `apple`, `netflix`, `microsoft`

**Success Response** (200):
```json
{
  "success": true,
  "data": [
    {
      "name": "Two Sum",
      "difficulty": "Easy",
      "faangCompanies": ["Google", "Amazon"],
      "day": 1,
      "week": 1,
      "topic": "Arrays"
    },
    ...
  ]
}
```

---

### Get DSA Metadata

Returns metadata about the study plan.

**Endpoint**: `GET /api/dsa/metadata`

**Success Response** (200):
```json
{
  "success": true,
  "data": {
    "totalDays": 200,
    "totalWeeks": 29,
    "totalProblems": 600,
    "difficulty": {
      "easy": 200,
      "medium": 300,
      "hard": 100
    },
    "topics": [
      "Arrays",
      "Linked Lists",
      "Trees",
      ...
    ]
  }
}
```

---

### Get All Problems (Filtered)

Returns problems with optional filtering and pagination.

**Endpoint**: `GET /api/dsa/problems`

**Query Parameters**:
- `day`: Filter by day number
- `week`: Filter by week number
- `topic`: Filter by topic
- `difficulty`: Filter by difficulty
- `company`: Filter by company
- `search`: Search by problem name
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 50)

**Example**: `GET /api/dsa/problems?difficulty=Medium&company=Google&page=1&limit=20`

**Success Response** (200):
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "leetcodeNumber": 1,
      "name": "Two Sum",
      "difficulty": "Easy",
      "link": "https://...",
      "tags": ["Array", "Hash Table"],
      "companies": ["Google", "Amazon"],
      "concept": "Hash Table",
      "buildsOn": "None",
      "successRate": 48.5,
      "whyImportant": "Fundamental pattern for arrays",
      "solutionLink": "https://...",
      "dayNumber": 1,
      "weekNumber": 1,
      "topic": "Arrays"
    },
    ...
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "hasNext": true
  }
}
```

---

## 📊 Progress Routes

Base path: `/api/progress`

All progress routes require authentication.

### Get Progress Overview

Returns user's overall progress statistics.

**Endpoint**: `GET /api/progress/overview`

**Authentication**: Required

**Success Response** (200):
```json
{
  "success": true,
  "data": {
    "totalProblems": 600,
    "solvedProblems": 45,
    "attemptedProblems": 12,
    "percentage": 8,
    "currentStreak": 7,
    "recentActivity": []
  }
}
```

---

### Get Streak Calendar

Returns user's streak calendar data.

**Endpoint**: `GET /api/progress/streak-calendar`

**Authentication**: Required

**Success Response** (200):
```json
{
  "success": true,
  "data": {
    "2024-01-01": 3,
    "2024-01-02": 5,
    "2024-01-03": 2,
    ...
  }
}
```

**Notes**: Keys are date strings (YYYY-MM-DD), values are problems solved that day.

---

### Update Problem Progress

Updates progress for a specific problem.

**Endpoint**: `POST /api/progress/problem/:problemId`

**Authentication**: Required

**Request Body**:
```json
{
  "status": "solved",
  "timeSpent": 30,
  "notes": "Used hash table approach",
  "rating": 4
}
```

**Fields**:
- `status`: `not_started`, `attempted`, `solved`, `reviewed`
- `timeSpent`: Minutes spent (number)
- `notes`: Optional notes (string)
- `rating`: 1-5 stars (number)

**Success Response** (200):
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "userId": "507f1f77bcf86cd799439012",
    "problemId": "507f1f77bcf86cd799439013",
    "status": "solved",
    "solvedAt": "2024-01-01T12:00:00.000Z",
    "attempts": 2,
    "timeSpent": 45,
    "notes": "Used hash table approach",
    "rating": 4,
    "createdAt": "2024-01-01T10:00:00.000Z",
    "updatedAt": "2024-01-01T12:00:00.000Z"
  }
}
```

---

### Get Problem Progress

Returns user's progress for a specific problem.

**Endpoint**: `GET /api/progress/problem/:problemId`

**Authentication**: Required

**Success Response** (200):
```json
{
  "success": true,
  "data": {
    "status": "solved",
    "attempts": 2,
    "timeSpent": 45,
    "rating": 4,
    "notes": "Used hash table approach"
  }
}
```

---

### Get Solved Problems

Returns user's solved problems with pagination.

**Endpoint**: `GET /api/progress/solved`

**Authentication**: Required

**Query Parameters**:
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20)

**Success Response** (200):
```json
{
  "success": true,
  "data": {
    "problems": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "problemId": {
          "name": "Two Sum",
          "difficulty": "Easy",
          "link": "https://..."
        },
        "status": "solved",
        "solvedAt": "2024-01-01T12:00:00.000Z",
        "timeSpent": 30
      },
      ...
    ],
    "pagination": {
      "current": 1,
      "total": 3,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

---

### Update Progress by Link

Updates progress using problem link instead of ID.

**Endpoint**: `POST /api/progress/problem/by-link`

**Authentication**: Required

**Request Body**:
```json
{
  "link": "https://leetcode.com/problems/two-sum/",
  "status": "solved",
  "timeSpent": 30,
  "rating": 5
}
```

**Success Response**: Same as Update Problem Progress

---

## 🏷️ Topic Routes

Base path: `/api/topics`

### Get Topics by Category

Returns all topics for a specific category.

**Endpoint**: `GET /api/topics/category/:category`

**Parameters**:
- `category`: `data-structures`, `algorithms`, `frontend`, `backend`, `database`, `operating-systems`, `system-design`

**Query Parameters**:
- `difficulty`: Filter by difficulty (`beginner`, `intermediate`, `advanced`)

**Success Response** (200):
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Arrays",
      "category": "data-structures",
      "icon": "FaList",
      "color": "#3b82f6",
      "description": "Linear data structure for storing elements",
      "difficulty": "beginner",
      "prerequisites": [],
      "resources": [
        {
          "title": "Array Basics",
          "url": "https://...",
          "type": "video"
        }
      ],
      "order": 1,
      "isActive": true
    },
    ...
  ]
}
```

---

### Get All Topics

Returns all topics with optional filtering and grouping.

**Endpoint**: `GET /api/topics`

**Query Parameters**:
- `category`: Filter by category
- `difficulty`: Filter by difficulty
- `search`: Search by name

**Success Response** (200):
```json
{
  "success": true,
  "data": {
    "topics": [...],
    "groupedTopics": {
      "data-structures": [...],
      "algorithms": [...],
      ...
    }
  }
}
```

---

### Get Single Topic

Returns details of a specific topic.

**Endpoint**: `GET /api/topics/:id`

**Success Response** (200):
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Arrays",
    "category": "data-structures",
    "icon": "FaList",
    "color": "#3b82f6",
    "description": "Linear data structure for storing elements",
    "difficulty": "beginner",
    "prerequisites": [
      {
        "_id": "507f1f77bcf86cd799439012",
        "name": "Programming Basics",
        "description": "Basic programming concepts"
      }
    ],
    "resources": [...],
    "order": 1
  }
}
```

---

## 🌐 Health Check

### Server Health

Check if the server is running.

**Endpoint**: `GET /api/health`

**Success Response** (200):
```json
{
  "status": "OK",
  "message": "Server is running",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

---

## 🔒 Authentication Headers

For authenticated requests, include credentials:

```javascript
// Using fetch
fetch('/api/progress/overview', {
  credentials: 'include'
})

// Using axios
axios.get('/api/progress/overview', {
  withCredentials: true
})
```

---

## ❌ Common Error Responses

### 400 Bad Request
```json
{
  "message": "Invalid request data"
}
```

### 401 Unauthorized
```json
{
  "error": "Not authenticated"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error",
  "message": "Something went wrong"
}
```

---

**Last Updated**: 2024-01-01  
**API Version**: 1.0.0
