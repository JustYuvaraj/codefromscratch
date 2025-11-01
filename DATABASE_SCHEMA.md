# Database Schema Documentation

Complete guide to MongoDB database schemas, relationships, and data models.

## 📊 Database Overview

**Database Type**: MongoDB (NoSQL Document Database)  
**ODM**: Mongoose  
**Database Name**: `codefromscratch`

### Collections

1. **users** - User accounts and profiles
2. **problems** - DSA problems database
3. **userprogresses** - User progress on problems
4. **userstreaks** - Daily activity tracking
5. **topics** - Learning topics and categories
6. **sessions** - Express session store

---

## 👤 User Model

**File**: `backend/models/User.js`  
**Collection**: `users`

### Schema Definition

```javascript
{
  googleId: String (unique, sparse),
  githubId: String (unique, sparse),
  username: String (required, unique),
  email: String (required, unique, validated),
  password: String (hashed, optional for OAuth),
  name: String,
  leetcodeUsername: String (required, unique),
  profileImage: String (URL),
  profileImageSource: String (enum),
  googleProfile: {
    picture: String,
    given_name: String,
    family_name: String
  },
  githubProfile: {
    avatar_url: String,
    login: String,
    name: String
  },
  createdAt: Date (auto)
}
```

### Field Details

#### googleId
- **Type**: String
- **Unique**: Yes (sparse index - allows nulls)
- **Purpose**: Google OAuth identifier
- **Example**: "106123456789012345678"

#### githubId
- **Type**: String
- **Unique**: Yes (sparse index)
- **Purpose**: GitHub OAuth identifier
- **Example**: "12345678"

#### username
- **Type**: String
- **Required**: Yes
- **Unique**: Yes
- **Purpose**: Display name for the platform
- **Generation**: From LeetCode username or email + timestamp
- **Example**: "user123", "leetcodeUser"

#### email
- **Type**: String
- **Required**: Yes
- **Unique**: Yes
- **Validation**: Email format regex `/.+@.+\..+/`
- **Example**: "user@example.com"

#### password
- **Type**: String
- **Required**: No (OAuth users don't have passwords)
- **Storage**: bcrypt hashed with 10 salt rounds
- **Example (hashed)**: "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy"

#### leetcodeUsername
- **Type**: String
- **Required**: Yes
- **Unique**: Yes
- **Purpose**: Links user to LeetCode profile
- **Temporary Format**: `user_1234567890` (for OAuth users before setup)
- **Example**: "tourist", "JustYuvaraj"

#### profileImage
- **Type**: String
- **Default**: null
- **Purpose**: URL to user's profile image
- **Sources**: Google, GitHub, LeetCode, uploaded file
- **Example**: "https://lh3.googleusercontent.com/..." or "/uploads/profile-images/profile-123.jpg"

#### profileImageSource
- **Type**: String
- **Enum**: `['google', 'github', 'leetcode', 'custom', 'upload']`
- **Default**: null
- **Purpose**: Track where profile image came from
- **Example**: "google"

#### googleProfile
- **Type**: Object
- **Purpose**: Store Google OAuth profile data
- **Fields**:
  - `picture`: Profile picture URL
  - `given_name`: First name
  - `family_name`: Last name

#### githubProfile
- **Type**: Object
- **Purpose**: Store GitHub OAuth profile data
- **Fields**:
  - `avatar_url`: Avatar URL
  - `login`: GitHub username
  - `name`: Display name

### Virtual Fields

#### userId
- **Type**: Virtual
- **Getter**: Returns `leetcodeUsername`
- **Purpose**: Alias for backward compatibility
- **Serialized**: Yes (included in JSON/Object)

### Indexes

```javascript
{ email: 1 } // Unique index for fast email lookup
{ username: 1 } // Unique index
{ leetcodeUsername: 1 } // Unique index
{ googleId: 1 } // Sparse unique index
{ githubId: 1 } // Sparse unique index
```

### Example Document

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "googleId": "106123456789012345678",
  "username": "john_doe",
  "email": "john@example.com",
  "password": "$2a$10$...",
  "name": "John Doe",
  "leetcodeUsername": "johndoe_leetcode",
  "profileImage": "https://lh3.googleusercontent.com/...",
  "profileImageSource": "google",
  "googleProfile": {
    "picture": "https://lh3.googleusercontent.com/...",
    "given_name": "John",
    "family_name": "Doe"
  },
  "githubProfile": null,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "userId": "johndoe_leetcode"
}
```

---

## 📝 Problem Model

**File**: `backend/models/Problem.js`  
**Collection**: `problems`

### Schema Definition

```javascript
{
  leetcodeNumber: Number (required, unique),
  name: String (required),
  difficulty: String (enum, required),
  link: String (required),
  tags: [String],
  companies: [String],
  concept: String (required),
  buildsOn: String (default: 'None'),
  successRate: Number (0-100),
  whyImportant: String,
  solutionLink: String,
  dayNumber: Number,
  weekNumber: Number,
  topic: String,
  isActive: Boolean (default: true),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

### Field Details

#### leetcodeNumber
- **Type**: Number
- **Required**: Yes
- **Unique**: Yes
- **Purpose**: Official LeetCode problem number
- **Example**: 1, 2, 15, 206

#### difficulty
- **Type**: String
- **Enum**: `['Easy', 'Medium', 'Hard']`
- **Required**: Yes
- **Example**: "Medium"

#### tags
- **Type**: Array of Strings
- **Purpose**: Problem topics/patterns
- **Example**: `["Array", "Hash Table", "Two Pointers"]`

#### companies
- **Type**: Array of Strings
- **Purpose**: Companies that ask this problem
- **Example**: `["Google", "Amazon", "Microsoft", "Facebook"]`

#### concept
- **Type**: String
- **Required**: Yes
- **Purpose**: Main concept being tested
- **Example**: "Hash Table", "Binary Search", "Dynamic Programming"

#### successRate
- **Type**: Number
- **Min**: 0
- **Max**: 100
- **Purpose**: Percentage of users who solve correctly
- **Example**: 48.5

### Indexes

```javascript
{ leetcodeNumber: 1 } // Unique index
{ difficulty: 1 } // For filtering
{ dayNumber: 1, weekNumber: 1 } // Compound index for plan queries
```

### Example Document

```json
{
  "_id": "507f1f77bcf86cd799439012",
  "leetcodeNumber": 1,
  "name": "Two Sum",
  "difficulty": "Easy",
  "link": "https://leetcode.com/problems/two-sum/",
  "tags": ["Array", "Hash Table"],
  "companies": ["Google", "Amazon", "Microsoft", "Apple"],
  "concept": "Hash Table",
  "buildsOn": "Array Basics",
  "successRate": 48.5,
  "whyImportant": "Fundamental pattern for array problems",
  "solutionLink": "https://leetcode.com/problems/two-sum/solution/",
  "dayNumber": 1,
  "weekNumber": 1,
  "topic": "Arrays",
  "isActive": true,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

---

## 📈 UserProgress Model

**File**: `backend/models/UserProgress.js`  
**Collection**: `userprogresses`

### Schema Definition

```javascript
{
  userId: ObjectId (ref: 'User', required),
  problemId: ObjectId (ref: 'Problem', required),
  status: String (enum, default: 'not_started'),
  solvedAt: Date,
  attempts: Number (default: 0),
  timeSpent: Number (minutes, default: 0),
  notes: String,
  rating: Number (1-5),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

### Field Details

#### userId
- **Type**: ObjectId
- **Ref**: User
- **Required**: Yes
- **Purpose**: Reference to user who owns this progress
- **Example**: "507f1f77bcf86cd799439011"

#### problemId
- **Type**: ObjectId
- **Ref**: Problem
- **Required**: Yes
- **Purpose**: Reference to the problem
- **Example**: "507f1f77bcf86cd799439012"

#### status
- **Type**: String
- **Enum**: `['not_started', 'attempted', 'solved', 'reviewed']`
- **Default**: 'not_started'
- **Purpose**: Track problem completion status

#### attempts
- **Type**: Number
- **Default**: 0
- **Purpose**: Count how many times user tried
- **Increments**: When status changes to 'attempted' or 'solved'

#### timeSpent
- **Type**: Number
- **Default**: 0
- **Unit**: Minutes
- **Purpose**: Total time spent on problem
- **Accumulates**: Each session adds to total

#### rating
- **Type**: Number
- **Min**: 1
- **Max**: 5
- **Purpose**: User's difficulty rating
- **Example**: 4 (out of 5 stars)

### Indexes

```javascript
{ userId: 1, problemId: 1 } // Compound unique index
{ status: 1 } // For filtering by status
{ solvedAt: -1 } // For recent solved problems
```

### Middleware

```javascript
pre('save'): Updates updatedAt field before saving
```

### Example Document

```json
{
  "_id": "507f1f77bcf86cd799439013",
  "userId": "507f1f77bcf86cd799439011",
  "problemId": "507f1f77bcf86cd799439012",
  "status": "solved",
  "solvedAt": "2024-01-05T14:30:00.000Z",
  "attempts": 3,
  "timeSpent": 45,
  "notes": "Used hash table approach. Time: O(n), Space: O(n)",
  "rating": 4,
  "createdAt": "2024-01-05T12:00:00.000Z",
  "updatedAt": "2024-01-05T14:30:00.000Z"
}
```

---

## 🔥 UserStreak Model

**File**: `backend/models/UserStreak.js`  
**Collection**: `userstreaks`

### Schema Definition

```javascript
{
  userId: ObjectId (ref: 'User', required),
  date: Date (required),
  dateString: String (required, YYYY-MM-DD),
  problemsSolved: Number (default: 0),
  timeSpent: Number (default: 0),
  topics: [String],
  difficulties: {
    easy: Number (default: 0),
    medium: Number (default: 0),
    hard: Number (default: 0)
  },
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

### Field Details

#### date
- **Type**: Date
- **Required**: Yes
- **Purpose**: Date of activity
- **Example**: "2024-01-05T00:00:00.000Z"

#### dateString
- **Type**: String
- **Required**: Yes
- **Format**: YYYY-MM-DD
- **Purpose**: String format for easy frontend consumption
- **Auto-generated**: Yes (pre-save hook)
- **Example**: "2024-01-05"

#### problemsSolved
- **Type**: Number
- **Default**: 0
- **Purpose**: Count of problems solved that day
- **Example**: 5

#### difficulties
- **Type**: Object
- **Fields**:
  - `easy`: Number (default: 0)
  - `medium`: Number (default: 0)
  - `hard`: Number (default: 0)
- **Purpose**: Breakdown by difficulty
- **Example**: `{ easy: 2, medium: 2, hard: 1 }`

### Indexes

```javascript
{ userId: 1, date: 1 } // Compound unique index
{ dateString: 1 } // For date range queries
```

### Middleware

```javascript
pre('save'): Sets dateString from date field
```

### Example Document

```json
{
  "_id": "507f1f77bcf86cd799439014",
  "userId": "507f1f77bcf86cd799439011",
  "date": "2024-01-05T00:00:00.000Z",
  "dateString": "2024-01-05",
  "problemsSolved": 5,
  "timeSpent": 120,
  "topics": ["Arrays", "Hash Tables", "Binary Search"],
  "difficulties": {
    "easy": 2,
    "medium": 2,
    "hard": 1
  },
  "createdAt": "2024-01-05T10:00:00.000Z",
  "updatedAt": "2024-01-05T23:59:00.000Z"
}
```

---

## 🏷️ Topic Model

**File**: `backend/models/Topic.js`  
**Collection**: `topics`

### Schema Definition

```javascript
{
  name: String (required, unique),
  category: String (enum, required),
  icon: String (required),
  color: String (required),
  description: String,
  difficulty: String (enum, default: 'beginner'),
  prerequisites: [ObjectId] (ref: 'Topic'),
  resources: [{
    title: String,
    url: String,
    type: String (enum)
  }],
  isActive: Boolean (default: true),
  order: Number (default: 0),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

### Field Details

#### category
- **Type**: String
- **Enum**: `['data-structures', 'algorithms', 'frontend', 'backend', 'database', 'operating-systems', 'system-design']`
- **Required**: Yes
- **Example**: "data-structures"

#### icon
- **Type**: String
- **Purpose**: Icon component name (React Icons or Lucide)
- **Example**: "FaList", "Database", "Code"

#### color
- **Type**: String
- **Purpose**: Hex color for UI theming
- **Example**: "#3b82f6", "#10b981"

#### difficulty
- **Type**: String
- **Enum**: `['beginner', 'intermediate', 'advanced']`
- **Default**: 'beginner'

#### prerequisites
- **Type**: Array of ObjectIds
- **Ref**: Topic (self-reference)
- **Purpose**: Topics that should be learned first
- **Example**: `["507f1f77bcf86cd799439015"]` (Arrays before Hash Tables)

#### resources
- **Type**: Array of Objects
- **Structure**:
  ```javascript
  {
    title: String,
    url: String,
    type: 'video' | 'article' | 'practice' | 'documentation'
  }
  ```

### Indexes

```javascript
{ name: 1 } // Unique index
{ category: 1, order: 1 } // For ordered category queries
```

### Example Document

```json
{
  "_id": "507f1f77bcf86cd799439015",
  "name": "Hash Tables",
  "category": "data-structures",
  "icon": "FaHashtag",
  "color": "#8b5cf6",
  "description": "Key-value data structure for O(1) lookups",
  "difficulty": "intermediate",
  "prerequisites": ["507f1f77bcf86cd799439016"],
  "resources": [
    {
      "title": "Hash Table Basics",
      "url": "https://example.com/hash-tables",
      "type": "video"
    },
    {
      "title": "Hash Functions Explained",
      "url": "https://example.com/hash-functions",
      "type": "article"
    }
  ],
  "isActive": true,
  "order": 5,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

---

## 🔐 Sessions Collection

**Collection**: `sessions`  
**Managed By**: connect-mongo

### Purpose
Stores Express session data for authentication.

### Schema (Auto-generated)

```javascript
{
  _id: String (session ID),
  expires: Date,
  session: {
    cookie: {
      originalMaxAge: Number,
      expires: Date,
      httpOnly: Boolean,
      secure: Boolean,
      sameSite: String
    },
    passport: {
      user: String (user ID)
    }
  }
}
```

### Example Document

```json
{
  "_id": "sess:abc123def456",
  "expires": "2024-01-08T00:00:00.000Z",
  "session": {
    "cookie": {
      "originalMaxAge": 604800000,
      "expires": "2024-01-08T00:00:00.000Z",
      "httpOnly": true,
      "secure": true,
      "sameSite": "none"
    },
    "passport": {
      "user": "507f1f77bcf86cd799439011"
    }
  }
}
```

---

## 🔗 Relationships Diagram

```
User (1) ─────────────────── (*) UserProgress
  │                              │
  │                              │
  └─────────────────── (*) UserStreak
                                 
                                 
Problem (1) ─────────────── (*) UserProgress


Topic (1) ──────────────── (*) Topics (prerequisites)
```

### Relationship Details

#### User ↔ UserProgress (One-to-Many)
- One user has many progress records
- Each progress record belongs to one user
- **Foreign Key**: `UserProgress.userId` → `User._id`
- **Cascade**: Delete user progress when user is deleted

#### User ↔ UserStreak (One-to-Many)
- One user has many streak records
- Each streak record belongs to one user
- **Foreign Key**: `UserStreak.userId` → `User._id`
- **Unique Constraint**: One streak per user per date

#### Problem ↔ UserProgress (One-to-Many)
- One problem has many user progress records
- Each progress record refers to one problem
- **Foreign Key**: `UserProgress.problemId` → `Problem._id`

#### Topic ↔ Topic (Self-Reference, Many-to-Many)
- Topics can have prerequisite topics
- Enables learning path dependencies
- **Foreign Key**: `Topic.prerequisites[]` → `Topic._id`

---

## 📊 Query Patterns

### Find User by Email
```javascript
User.findOne({ email: 'user@example.com' });
```

### Find User's Solved Problems
```javascript
UserProgress.find({ 
  userId: userId,
  status: 'solved'
})
.populate('problemId')
.sort({ solvedAt: -1 });
```

### Get Leaderboard
```javascript
User.find({ 
  leetcodeUsername: { 
    $exists: true, 
    $ne: null,
    $not: /^user_/
  }
}).select('username leetcodeUsername name email');
```

### Get User Streak Data
```javascript
UserStreak.find({ 
  userId: userId,
  dateString: { 
    $gte: '2024-01-01',
    $lte: '2024-12-31'
  }
}).sort({ date: 1 });
```

### Get Topics by Category
```javascript
Topic.find({ 
  category: 'data-structures',
  isActive: true
})
.populate('prerequisites', 'name')
.sort({ order: 1 });
```

---

## 🚀 Performance Optimization

### Indexes Strategy
1. **Unique constraints**: Prevent duplicates and enable fast lookups
2. **Compound indexes**: Optimize multi-field queries
3. **Sparse indexes**: Allow null values while maintaining uniqueness
4. **Sorted queries**: Index on commonly sorted fields

### Query Optimization
1. **Select only needed fields**: Use `.select()` to reduce data transfer
2. **Populate wisely**: Only populate when necessary
3. **Pagination**: Always use `.limit()` and `.skip()`
4. **Lean queries**: Use `.lean()` for read-only data

---

## 🔒 Data Validation

### Schema-Level Validation
```javascript
// Email validation
email: {
  type: String,
  match: [/.+@.+\..+/, 'Please enter a valid email']
}

// Enum validation
difficulty: {
  type: String,
  enum: ['Easy', 'Medium', 'Hard']
}

// Range validation
rating: {
  type: Number,
  min: 1,
  max: 5
}
```

### Application-Level Validation
- Password strength checks
- LeetCode username existence
- File size/type for uploads
- Data format validation

---

## 💾 Data Migration

### Adding New Fields
```javascript
// Add default values for new fields
db.users.updateMany(
  { profileImageSource: { $exists: false } },
  { $set: { profileImageSource: null } }
);
```

### Updating Existing Data
```javascript
// Migrate temporary LeetCode usernames
db.users.find({ 
  leetcodeUsername: /^user_/ 
}).forEach(user => {
  // Update logic
});
```

---

**Total Collections**: 6  
**Total Indexes**: 15+  
**Storage Engine**: WiredTiger  
**Last Updated**: 2024-01-01
