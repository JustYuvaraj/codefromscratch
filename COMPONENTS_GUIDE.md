# Frontend Components Guide

Complete guide to all React components in the CodeFromScratch platform, organized by category.

## 📑 Table of Contents

- [Pages](#pages)
- [Authentication Components](#authentication-components)
- [Feature Components](#feature-components)
- [UI Components](#ui-components)
- [Layout Components](#layout-components)
- [Utility Components](#utility-components)

---

## 📄 Pages

### HomePage.jsx

**Location**: `client/src/pages/HomePage.jsx`

**Purpose**: Landing page with different views for authenticated and unauthenticated users.

**Props**:
- `user` (object): Current user data
- `isAuthenticated` (boolean): Authentication status

**Component Structure**:
```jsx
HomePage
├── AuthenticatedHomePage (logged-in users)
│   ├── User Stats Cards
│   ├── Learning Recommendations
│   ├── Daily Challenge
│   └── Recent Activity
└── UnauthenticatedHomePage (guests)
    ├── Hero Section
    ├── Focus Row
    ├── Flow Canvas
    ├── Development Tools
    ├── Statistics
    ├── Features Grid
    ├── Testimonials
    └── Call to Action
```

**Key Features**:
- Conditional rendering based on authentication
- Interactive topic selection with FocusRow
- Visual learning path with FlowCanvas
- Framer Motion animations
- Responsive design

**Usage**:
```jsx
<HomePage user={user} isAuthenticated={isAuthenticated} />
```

---

### DashboardPage.jsx

**Location**: `client/src/pages/DashboardPage.jsx`

**Purpose**: Main dashboard showing user progress, LeetCode stats, and leaderboard.

**Props**:
- `user` (object): User information

**State Management**:
```javascript
const [leaderboardPreview, setLeaderboardPreview] = useState([]);
const [progressOverview, setProgressOverview] = useState(null);
const [streakData, setStreakData] = useState({});
const [recentProblems, setRecentProblems] = useState([]);
```

**Component Layout**:
```
DashboardPage
├── LeetCodeSetup Modal (for OAuth users)
├── Left Sidebar
│   └── LeetCodeProfile
└── Main Content
    ├── Problem Stats
    ├── Leaderboard Preview
    ├── Streak Calendar
    └── Recent Activity
```

**API Calls**:
1. `GET /api/auth/current_user` - Fetch user data
2. `GET /api/users/leaderboard` - Fetch leaderboard
3. `GET /api/progress/overview` - Fetch progress stats
4. `GET /api/progress/streak-calendar` - Fetch streak data
5. `GET /api/progress/solved?limit=5` - Fetch recent problems

**Loading States**:
- Uses `DashboardShimmer` component during data fetch
- Individual shimmer components for each section

---

### CoursePage.jsx

**Location**: `client/src/pages/CoursePage.jsx`

**Purpose**: Displays learning topics organized by categories.

**Categories**:
- Data Structures
- Algorithms
- Frontend Development
- Backend Development
- Databases
- Operating Systems

**Features**:
- Interactive topic cards
- Difficulty indicators
- Progress tracking per topic
- Search and filter capabilities

**Data Source**: `client/src/constants/` (various data files)

---

### SettingsPage.jsx

**Location**: `client/src/pages/SettingsPage.jsx`

**Purpose**: User account settings and profile management.

**Props**:
- `user` (object): Current user data
- `onUserUpdate` (function): Callback for user updates

**Sections**:
1. **Profile Settings**:
   - Profile image selection
   - LeetCode username update
   - Personal information

2. **Privacy Settings**:
   - Visibility controls
   - Data preferences

3. **Account Settings**:
   - Password change
   - Account deletion

**Component**: Uses `ProfileSettings.jsx` child component

---

### LeaderboardPage.jsx

**Location**: `client/src/pages/LeaderboardPage.jsx`

**Purpose**: Full leaderboard with filtering and search.

**Features**:
- Real-time rankings
- User avatars and stats
- Search by username
- Filter by time period
- Pagination support
- Current user highlight

**Data Structure**:
```javascript
{
  position: 1,
  userId: "...",
  username: "user1",
  leetcodeUsername: "leetcode1",
  name: "User One",
  avatar: "https://...",
  totalSolved: 450,
  easySolved: 200,
  mediumSolved: 200,
  hardSolved: 50,
  ranking: 150000
}
```

---

### PlaygroundPage.jsx

**Location**: `client/src/pages/PlaygroundPage.jsx`

**Purpose**: Interactive code playground with Monaco editor.

**Features**:
- Multi-language support (JavaScript, Python, etc.)
- Code execution visualization
- Console output
- Code sharing functionality

---

### RoadmapsPage.jsx

**Location**: `client/src/pages/RoadmapsPage.jsx`

**Purpose**: Displays various learning roadmaps.

**Roadmaps**:
- Frontend Developer
- Backend Developer
- Full-Stack Developer
- DevOps Engineer
- Data Structures & Algorithms

---

## 🔐 Authentication Components

### Login.jsx

**Location**: `client/src/components/Login.jsx`

**Purpose**: User login form with OAuth options.

**Features**:
- Email/password login
- Google OAuth button
- GitHub OAuth button
- Form validation
- Error messaging
- Loading states

**State Management**:
```javascript
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [message, setMessage] = useState('');
const [isLoading, setIsLoading] = useState(false);
```

**OAuth Flow**:
```javascript
const handleGoogleLogin = () => {
  const backendUrl = isProd ? VITE_API_URL : 'http://localhost:5000';
  window.location.href = `${backendUrl}/api/auth/google`;
};
```

**Form Submission**:
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  const response = await login({ email, password });
  // Handle success/error
  window.location.href = '/courses'; // Reload to establish session
};
```

---

### Signup.jsx

**Location**: `client/src/components/Signup.jsx`

**Purpose**: User registration form.

**Features**:
- LeetCode username validation
- Real-time validation feedback
- Password strength indicators
- OAuth registration
- Auto-login after registration

**Validation Flow**:
```javascript
const handleLeetCodeUsernameBlur = async () => {
  const validation = await validateLeetCodeUsername(form.leetcodeUsername);
  setLeetcodeValidation({
    isValid: validation.isValid,
    message: validation.isValid ? "✅ Valid" : `❌ ${validation.error}`
  });
};
```

**Form Fields**:
- `leetcodeUsername` (required, validated)
- `email` (required, email format)
- `password` (required, min 6 chars)

---

### AuthPage.jsx

**Location**: `client/src/components/auth/AuthPage.jsx`

**Purpose**: Container for login/signup with tab switching.

**Props**:
- `isLogin` (boolean): Show login (true) or signup (false)

**Features**:
- Animated tab switching
- Consistent styling
- Background gradients
- Responsive layout

---

## 🎯 Feature Components

### LeetCodeProfile.jsx

**Location**: `client/src/components/features/LeetCodeProfile.jsx`

**Purpose**: Displays LeetCode user profile and statistics.

**Props**:
- `userName` (string): LeetCode username

**Data Fetched**:
- User avatar
- Global ranking
- Problems solved (Easy, Medium, Hard)
- Submission stats
- Badges and achievements

**API Integration**:
- Uses react-leetcode library
- Fetches from LeetCode GraphQL API
- Caches data for performance

---

### StreakCalendar.jsx

**Location**: `client/src/components/StreakCalendar.jsx`

**Purpose**: GitHub-style contribution calendar.

**Props**:
- `streakData` (object): Date-to-count mapping
- `scale` (number): Calendar scale factor (default: 1)

**Data Format**:
```javascript
{
  "2024-01-01": 3,  // 3 problems solved
  "2024-01-02": 5,
  "2024-01-03": 0   // No activity
}
```

**Features**:
- Color-coded by activity level
- Tooltip on hover showing count
- Month labels
- Responsive scaling

**Color Scheme**:
```javascript
0 problems:   #1a1a1a (dark)
1-2 problems: #0e4429 (light green)
3-4 problems: #006d32 (medium green)
5+ problems:  #26a641 (bright green)
```

---

### LeetCodeSetup.jsx

**Location**: `client/src/components/LeetCodeSetup.jsx`

**Purpose**: Modal for OAuth users to set up LeetCode username.

**Props**:
- `user` (object): Current user
- `onComplete` (function): Callback after setup

**Trigger Condition**:
```javascript
user.leetcodeUsername.startsWith('user_') // Temporary username
```

**Features**:
- Modal overlay
- Username validation
- Skip option
- Auto-close on success

---

### LeetCodeProblems.jsx

**Location**: `client/src/components/features/LeetCodeProblems.jsx`

**Purpose**: Display and track LeetCode problems.

**Features**:
- Problem filtering
- Status indicators (solved, attempted, todo)
- Difficulty badges
- Company tags
- Progress tracking

---

### CodeVisualizer.jsx

**Location**: `client/src/components/features/CodeVisualizer.jsx`

**Purpose**: Step-by-step code execution visualization.

**Features**:
- Line-by-line execution
- Variable state tracking
- Call stack visualization
- Output console
- Breakpoint support

**Supported Languages**:
- JavaScript
- Python (planned)

---

### FlowCanvas.jsx

**Location**: `client/src/components/features/FlowCanvas.jsx`

**Purpose**: Interactive learning path visualization.

**Props**:
- `selected` (string): Currently selected topic

**Features**:
- Node-based graph
- Topic dependencies
- Interactive nodes
- Progress indicators
- Zoom and pan

**Library**: Uses `reactflow` for graph rendering

---

### FocusRow.jsx

**Location**: `client/src/components/features/FocusRow.jsx`

**Purpose**: Horizontal topic selector.

**Props**:
- `onSelect` (function): Selection callback
- `selectedTopic` (string): Currently selected

**Topics**:
- Data Structures
- Algorithms
- Frontend
- Backend
- Databases
- Operating Systems

**Features**:
- Horizontal scroll
- Active state highlighting
- Icon support
- Responsive design

---

### MariaCodeVisualizer.jsx

**Location**: `client/src/components/features/MariaCodeVisualizer.jsx`

**Purpose**: Advanced code visualization with AI assistance.

**Features**:
- AI-powered explanations
- Algorithm animations
- Complexity analysis
- Code optimization suggestions

---

### DSAPlan.jsx

**Location**: `client/src/components/features/DSAPlan.jsx`

**Purpose**: 200-day DSA study plan display.

**Features**:
- Week-by-week breakdown
- Daily problem lists
- Progress tracking
- Topic categorization
- Difficulty distribution

---

### LearningPath.jsx

**Location**: `client/src/components/LearningPath.jsx`

**Purpose**: Structured learning curriculum display.

**Props**:
- `user` (object): User data for progress

**Features**:
- Topic-based paths
- Prerequisite tracking
- Progress indicators
- Resource links

---

## 🎨 UI Components

### Navigation.jsx

**Location**: `client/src/components/Navigation.jsx`

**Purpose**: Global navigation bar.

**Props**:
- `isAuthenticated` (boolean)
- `user` (object)
- `onLogout` (function)

**Navigation Links**:
- **Unauthenticated**: Home, Roadmaps, Login, Register
- **Authenticated**: Dashboard, Courses, Tools, Settings, Leaderboard, Logout

**Features**:
- Responsive mobile menu
- User avatar dropdown
- Active link highlighting
- Smooth animations

---

### ProfileSettings.jsx

**Location**: `client/src/components/ProfileSettings.jsx`

**Purpose**: Profile image and settings management.

**Props**:
- `user` (object): Current user data

**Features**:
- Multiple image source selection
- Custom image upload
- LeetCode username update
- Real-time preview

**Image Sources**:
1. Google profile picture
2. GitHub avatar
3. LeetCode avatar
4. Custom upload

**Upload Component**:
```jsx
<input
  type="file"
  accept="image/*"
  onChange={handleImageUpload}
  style={{ display: 'none' }}
  ref={fileInputRef}
/>
```

---

### Leaderboard.jsx

**Location**: `client/src/components/Leaderboard.jsx`

**Purpose**: Leaderboard table component (reusable).

**Props**:
- `data` (array): Leaderboard entries
- `currentUser` (object): Highlight current user

**Features**:
- Rank badges (🥇🥈🥉)
- User avatars
- Stats display
- Sorting options

---

## 🔧 Utility Components

### HomePageSkeleton.jsx

**Location**: `client/src/pages/HomePageSkeleton.jsx`

**Purpose**: Loading skeleton for HomePage.

**Features**:
- Shimmer animations
- Matches actual layout
- Smooth transitions

---

### DashboardShimmer.jsx

**Location**: `client/src/pages/DashboardShimmer.jsx`

**Purpose**: Loading skeleton for DashboardPage.

**Features**:
- Grid layout shimmer
- Card shimmer effects
- Responsive design

---

### LeaderboardSkeleton.jsx

**Location**: `client/src/pages/LeaderboardSkeleton.jsx`

**Purpose**: Loading skeleton for LeaderboardPage.

---

### NotFoundPage.jsx

**Location**: `client/src/pages/NotFoundPage.jsx`

**Purpose**: 404 error page.

**Features**:
- Animated 404 message
- Navigation links
- Fun illustrations

---

## 🔄 Component Patterns

### Protected Route Pattern

```jsx
function ProtectedRoute({ children, isAuthenticated }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

// Usage
<Route path="/dashboard" element={
  <ProtectedRoute isAuthenticated={isAuthenticated}>
    <DashboardPage />
  </ProtectedRoute>
} />
```

### Public Route Pattern

```jsx
function PublicRoute({ children, isAuthenticated }) {
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
}
```

### Loading State Pattern

```jsx
if (loading) return <Skeleton />;
if (error) return <ErrorMessage />;
return <ActualContent />;
```

### Data Fetching Pattern

```jsx
useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/endpoint', {
        credentials: 'include'
      });
      const data = await response.json();
      setData(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  fetchData();
}, [dependencies]);
```

---

## 🎭 Animation Patterns

### Framer Motion Variants

```jsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

// Usage
<motion.div variants={containerVariants} initial="hidden" animate="visible">
  {items.map(item => (
    <motion.div key={item.id} variants={childVariants}>
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

---

## 🎨 Styling Conventions

### Tailwind CSS Classes

```jsx
// Card
className="bg-white/5 rounded-2xl p-4 border border-white/10"

// Button Primary
className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"

// Input Field
className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 rounded-lg"

// Badge
className="text-xs px-2 py-1 rounded bg-cyan-700/20 text-cyan-300"
```

### Color Scheme

```javascript
Difficulty Colors:
- Easy: green-400
- Medium: yellow-400
- Hard: red-400

Status Colors:
- Solved: green-400
- Attempted: yellow-400
- Not Started: gray-400

Theme Colors:
- Primary: blue-600
- Background: #0f0f0f to #1a1a1a gradient
- Border: white/10
- Text: white
```

---

## 📱 Responsive Design

### Breakpoints

```javascript
sm: '640px'   // Small devices
md: '768px'   // Medium devices
lg: '1024px'  // Large devices
xl: '1280px'  // Extra large devices
2xl: '1536px' // 2X large devices
```

### Responsive Classes

```jsx
// Stack on mobile, grid on desktop
className="flex flex-col lg:flex-row"

// Hidden on mobile
className="hidden md:block"

// Different padding
className="px-4 md:px-8 lg:px-12"
```

---

## 🔧 Best Practices

### Component Organization
1. Imports at top
2. Type definitions (if using TypeScript)
3. Component function
4. Helper functions
5. Exports

### State Management
1. Use local state for component-specific data
2. Lift state up when shared between siblings
3. Use context for global app state (if needed)

### Performance
1. Use `React.memo` for expensive components
2. `useMemo` for expensive calculations
3. `useCallback` for function props
4. Code splitting with `React.lazy`

### Error Handling
1. Try-catch for async operations
2. Error boundaries for component errors
3. User-friendly error messages
4. Fallback UI for errors

---

**Component Count**: 40+
**Last Updated**: 2024-01-01
