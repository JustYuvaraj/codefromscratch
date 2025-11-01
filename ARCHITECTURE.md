# System Architecture Documentation

## 📐 Overview

CodeFromScratch follows a **client-server architecture** with a clear separation between the frontend (React) and backend (Node.js/Express). The system uses **RESTful API** design patterns and **session-based authentication** with OAuth2.0 integration.

## 🏛️ Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         CLIENT SIDE                          │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                React Application (Vite)                 │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │ │
│  │  │    Pages     │  │  Components  │  │   Services   │ │ │
│  │  │              │  │              │  │              │ │ │
│  │  │ - HomePage   │  │ - Navigation │  │ - authService│ │ │
│  │  │ - Dashboard  │  │ - Login      │  │ - leetcode   │ │ │
│  │  │ - Courses    │  │ - Signup     │  │   Service    │ │ │
│  │  │ - Settings   │  │ - Profile    │  │              │ │ │
│  │  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘ │ │
│  │         └──────────────────┴──────────────────┘         │ │
│  └────────────────────────────┬────────────────────────────┘ │
│                               │ HTTP/HTTPS                   │
└───────────────────────────────┼──────────────────────────────┘
                                │
┌───────────────────────────────┼──────────────────────────────┐
│                               │                              │
│  ┌────────────────────────────▼────────────────────────────┐ │
│  │              Express.js Server (Port 5000)              │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │ │
│  │  │  Middleware  │  │    Routes    │  │ Controllers  │ │ │
│  │  │              │  │              │  │   (Logic)    │ │ │
│  │  │ - CORS       │  │ - /auth      │  │              │ │ │
│  │  │ - Session    │  │ - /users     │  │ - User Mgmt  │ │ │
│  │  │ - Passport   │  │ - /dsa       │  │ - Auth Logic │ │ │
│  │  │ - Auth Guard │  │ - /progress  │  │ - Progress   │ │ │
│  │  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘ │ │
│  │         └──────────────────┴──────────────────┘         │ │
│  └────────────────────────────┬────────────────────────────┘ │
│                               │                              │
│                         SERVER SIDE                          │
└───────────────────────────────┼──────────────────────────────┘
                                │
┌───────────────────────────────▼──────────────────────────────┐
│                    MongoDB Database                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │    users     │  │   problems   │  │    topics    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │userprogress  │  │  userstreaks │  │   sessions   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└──────────────────────────────────────────────────────────────┘

External Services:
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│    Google    │  │    GitHub    │  │   LeetCode   │
│    OAuth     │  │    OAuth     │  │   GraphQL    │
└──────────────┘  └──────────────┘  └──────────────┘
```

## 🔧 Technology Stack Details

### Frontend Architecture

#### **React Component Hierarchy**

```
App.jsx (Root)
├── Navigation.jsx (Global)
├── Routes
│   ├── HomePage.jsx
│   │   ├── AuthenticatedHomePage (for logged-in users)
│   │   └── UnauthenticatedHomePage (for guests)
│   │       ├── FocusRow.jsx
│   │       ├── FlowCanvas.jsx
│   │       ├── LearningPath.jsx
│   │       └── CodeVisualizer.jsx
│   ├── DashboardPage.jsx
│   │   ├── LeetCodeProfile.jsx
│   │   ├── StreakCalendar.jsx
│   │   └── Leaderboard.jsx
│   ├── CoursePage.jsx
│   │   ├── DataStructures
│   │   ├── Algorithms
│   │   ├── Frontend
│   │   └── Backend
│   ├── SettingsPage.jsx
│   │   └── ProfileSettings.jsx
│   └── AuthPage.jsx
│       ├── Login.jsx
│       └── Signup.jsx
```

#### **State Management**

- **Local Component State**: `useState` for component-level state
- **App-Level State**: User authentication state in `App.jsx`
- **Global User Updates**: `window.updateGlobalUser` function for cross-component updates
- **Session Persistence**: Authentication state persisted via backend sessions

#### **Routing Strategy**

```javascript
// Protected Routes - Require authentication
<ProtectedRoute isAuthenticated={isAuthenticated}>
  <DashboardPage />
</ProtectedRoute>

// Public Routes - Redirect if authenticated
<PublicRoute isAuthenticated={isAuthenticated}>
  <AuthPage />
</PublicRoute>
```

### Backend Architecture

#### **Layered Architecture Pattern**

```
┌─────────────────────────────────────────┐
│           Routes Layer                   │
│  (HTTP request handling, validation)     │
└───────────────┬─────────────────────────┘
                │
┌───────────────▼─────────────────────────┐
│        Controllers/Logic Layer           │
│  (Business logic, data processing)       │
└───────────────┬─────────────────────────┘
                │
┌───────────────▼─────────────────────────┐
│          Models Layer                    │
│  (Data schemas, database operations)     │
└───────────────┬─────────────────────────┘
                │
┌───────────────▼─────────────────────────┐
│         Database Layer                   │
│        (MongoDB/Mongoose)                │
└─────────────────────────────────────────┘
```

#### **Middleware Pipeline**

```javascript
Request Flow:
1. CORS Middleware → Allow cross-origin requests
2. Body Parser → Parse JSON request bodies
3. Session Middleware → Establish/retrieve session
4. Passport Initialize → Setup authentication
5. Passport Session → Deserialize user
6. Route Handler → Process request
7. Auth Middleware (if protected) → Verify authentication
8. Controller Logic → Business logic
9. Response → Send JSON response
```

## 🔐 Authentication Flow

### Local Authentication (Email/Password)

```
Registration Flow:
1. User submits: email, password, leetcodeUsername
2. Backend validates LeetCode username via API
3. Password hashed with bcrypt (10 salt rounds)
4. User created in database
5. req.login() called to establish session
6. Session cookie sent to client
7. User redirected to courses page

Login Flow:
1. User submits: email, password
2. Backend finds user by email
3. Password compared using bcrypt.compare()
4. If valid, req.login() establishes session
5. Session cookie sent to client
6. User data returned to frontend
7. Frontend redirects to courses page
```

### OAuth Authentication Flow

```
Google/GitHub OAuth Flow:
1. User clicks "Continue with Google/GitHub"
2. Frontend redirects to /api/auth/google or /api/auth/github
3. Backend redirects to OAuth provider
4. User authenticates with provider
5. Provider redirects to callback URL with code
6. Backend exchanges code for access token
7. Backend fetches user profile from provider
8. User created/updated in database
9. Session established with req.login()
10. User redirected to frontend with authStatus=success
11. Frontend reloads to fetch new session
```

### Session Management

```javascript
Session Configuration:
- Store: MongoDB (connect-mongo)
- Cookie: HTTP-only, Secure (in production)
- SameSite: 'none' (for cross-origin)
- MaxAge: 7 days
- Secret: Environment variable

Session Data Structure:
{
  cookie: {
    originalMaxAge: 604800000,
    expires: Date,
    httpOnly: true,
    secure: true,
    sameSite: 'none'
  },
  passport: {
    user: userId
  }
}
```

## 💾 Data Flow Patterns

### Problem Progress Tracking

```
1. User solves problem on LeetCode
2. User marks problem as solved in app
3. Frontend: POST /api/progress/problem/:problemId
   Body: { status: 'solved', timeSpent: 30, rating: 4 }
4. Backend validates authentication
5. Backend finds/creates UserProgress document
6. Backend updates progress fields
7. Backend creates/updates UserStreak for today
8. Response sent with updated progress
9. Frontend updates UI
```

### Leaderboard Generation

```
1. Frontend requests: GET /api/users/leaderboard
2. Backend queries users with valid LeetCode usernames
3. For each user:
   a. Fetch LeetCode profile via GraphQL API
   b. Extract problems solved (Easy, Medium, Hard)
   c. Calculate total solved and ranking
4. Sort users by total solved (desc), then ranking (asc)
5. Assign positions (1st, 2nd, 3rd, etc.)
6. Return top users to frontend
7. Frontend displays with medals and badges
```

### LeetCode Integration

```
LeetCode GraphQL API Integration:

Query Structure:
{
  matchedUser(username: $username) {
    username
    profile {
      realName
      userAvatar
      ranking
    }
    submitStats {
      acSubmissionNum {
        difficulty
        count
      }
    }
  }
}

Data Extraction:
- User profile: name, avatar, ranking
- Problems solved: easy, medium, hard counts
- Total submissions
- Success rate calculation

Usage Points:
1. User registration (validate username)
2. Profile setup for OAuth users
3. Leaderboard data fetching
4. Dashboard statistics
```

## 🗄️ Database Design Patterns

### Schema Relationships

```
User (1) ──────────── (*) UserProgress
  │
  └─────────────────── (*) UserStreak

Problem (1) ────────── (*) UserProgress

Topic (1) ─────────── (*) Topics (self-reference via prerequisites)
```

### Indexing Strategy

```javascript
// Compound indexes for efficient queries
UserProgress: { userId: 1, problemId: 1 } (unique)
UserStreak: { userId: 1, date: 1 } (unique)
User: { email: 1 } (unique)
User: { leetcodeUsername: 1 } (unique)
Problem: { leetcodeNumber: 1 } (unique)
```

### Query Optimization

```javascript
// Efficient leaderboard query
User.find({ 
  leetcodeUsername: { 
    $exists: true, 
    $ne: null,
    $not: /^user_/  // Exclude temporary usernames
  }
}).select('username leetcodeUsername name email createdAt')

// Populate relationships efficiently
UserProgress.find({ userId })
  .populate('problemId')
  .sort({ updatedAt: -1 })
  .limit(20)
```

## 🔄 API Design Patterns

### RESTful Conventions

```
Resource-based URLs:
GET    /api/users              - List all users
GET    /api/users/:id          - Get specific user
POST   /api/users              - Create user
PUT    /api/users/:id          - Update user
DELETE /api/users/:id          - Delete user

Nested Resources:
GET    /api/progress/problem/:problemId
POST   /api/progress/problem/:problemId

Query Parameters:
GET    /api/dsa/problems?difficulty=Easy&page=1&limit=20
GET    /api/users/leaderboard?period=week
```

### Response Format

```javascript
Success Response:
{
  success: true,
  data: {...},
  message: "Optional success message"
}

Error Response:
{
  success: false,
  error: "Error message",
  message: "User-friendly message"
}

Paginated Response:
{
  success: true,
  data: [...],
  pagination: {
    page: 1,
    limit: 20,
    total: 150,
    hasNext: true,
    hasPrev: false
  }
}
```

## 🛡️ Security Architecture

### Authentication Security

```
Password Security:
- bcrypt hashing with 10 salt rounds
- Passwords never stored in plain text
- Password validation on server side

Session Security:
- HTTP-only cookies (prevent XSS)
- Secure flag in production (HTTPS only)
- SameSite attribute (CSRF protection)
- Session stored in MongoDB (not in memory)

OAuth Security:
- State parameter for CSRF protection
- Secure callback URLs
- Token validation
- Profile data verification
```

### Authorization Patterns

```javascript
// Middleware-based protection
router.get('/protected', isAuthenticated, (req, res) => {
  // Only authenticated users reach here
});

// User-specific data access
router.get('/my-data', isAuthenticated, async (req, res) => {
  const userId = req.user._id;
  const data = await Model.find({ userId });
  // Users can only access their own data
});
```

## 🎨 Frontend Design Patterns

### Component Patterns

```javascript
// Container/Presenter Pattern
// Container: Handles logic and state
function DashboardPageContainer() {
  const [data, setData] = useState(null);
  useEffect(() => fetchData(), []);
  return <DashboardPagePresenter data={data} />;
}

// Presenter: Pure rendering
function DashboardPagePresenter({ data }) {
  return <div>{data.map(...)}</div>;
}

// Compound Component Pattern
<Card>
  <Card.Header>Title</Card.Header>
  <Card.Body>Content</Card.Body>
  <Card.Footer>Actions</Card.Footer>
</Card>
```

### Custom Hooks Pattern

```javascript
// Reusable authentication hook
function useAuth() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    checkAuthStatus();
  }, []);
  
  return { user, isAuthenticated };
}
```

## 📊 Performance Considerations

### Frontend Optimization

```
1. Code Splitting: React.lazy() for route-based splitting
2. Memoization: useMemo, useCallback for expensive operations
3. Debouncing: Input validation with debounce
4. Lazy Loading: Images and components load on demand
5. Skeleton Screens: Better perceived performance
```

### Backend Optimization

```
1. Database Indexing: Strategic indexes on frequently queried fields
2. Connection Pooling: MongoDB connection pool
3. Caching: Session data cached in MongoDB
4. Query Optimization: Select only needed fields
5. Batch Operations: Bulk inserts/updates where applicable
```

## 🔌 External Service Integration

### LeetCode GraphQL API

```javascript
Endpoint: https://leetcode.com/graphql
Method: POST
Headers: { 'Content-Type': 'application/json' }

Rate Limiting Considerations:
- Cache user data for 24 hours
- Batch requests when possible
- Error handling for API failures
```

### OAuth Providers

```javascript
Google OAuth 2.0:
- Scopes: profile, email
- Callback: /api/auth/google/callback

GitHub OAuth:
- Scopes: user:email
- Callback: /api/auth/github/callback
```

## 🚀 Deployment Architecture

### Production Setup

```
Frontend (Vercel/Netlify):
- Environment: VITE_API_URL=https://api.yourdomain.com/api
- Build: npm run build
- Deploy: Automatic from Git

Backend (Render/Heroku):
- Environment: All production env variables
- MongoDB: Atlas cluster
- Session Store: MongoDB Atlas
- CORS: Production frontend URL
```

---

This architecture provides a **scalable**, **maintainable**, and **secure** foundation for the CodeFromScratch platform. The separation of concerns, clear data flow, and modular design make it easy to extend and maintain.
