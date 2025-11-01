# CodeFromScratch - Interactive Learning Platform

![CodeFromScratch Banner](https://img.shields.io/badge/CodeFromScratch-Learning%20Platform-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)
![React](https://img.shields.io/badge/react-18.3.1-blue)

## 🎯 Overview

**CodeFromScratch** is a comprehensive, visual learning platform designed to help developers master Computer Science fundamentals, Data Structures & Algorithms, and Full-Stack Development. The platform combines interactive visualizations, LeetCode problem tracking, progress monitoring, and gamification to create an engaging learning experience.

### ✨ Key Features

- 🎨 **Visual Learning**: Interactive visualizations for algorithms and data structures
- 📊 **Progress Tracking**: Real-time monitoring of your learning journey
- 🏆 **LeetCode Integration**: Automatic problem tracking and statistics
- 🔥 **Streak Calendar**: GitHub-style activity heatmap for daily progress
- 🎯 **Structured Curriculum**: 200-day DSA roadmap with curated problems
- 👥 **Leaderboard System**: Compete with peers and track rankings
- 🔐 **Multi-Auth Support**: Email/password, Google OAuth, and GitHub OAuth
- 💻 **Code Visualizer**: Step-by-step code execution visualization
- 🛠️ **Interactive Tools**: Monaco editor, code playground, and more

## 🏗️ Project Structure

```
reactproject/
├── backend/                    # Express.js backend server
│   ├── config/                 # Configuration files
│   │   └── passport.js         # Passport.js OAuth strategies
│   ├── data/                   # Static data files
│   │   └── dsa-200-day-plan.json
│   ├── middleware/             # Custom middleware
│   │   └── authMiddleware.js   # Authentication guards
│   ├── models/                 # Mongoose schemas
│   │   ├── User.js             # User model
│   │   ├── Problem.js          # DSA problem model
│   │   ├── Topic.js            # Topic/category model
│   │   ├── UserProgress.js     # User problem progress
│   │   └── UserStreak.js       # Daily activity tracking
│   ├── routes/                 # API route handlers
│   │   ├── authRoutes.js       # Authentication endpoints
│   │   ├── userRoutes.js       # User management endpoints
│   │   ├── dsaRoutes.js        # DSA problems endpoints
│   │   ├── progressRoutes.js   # Progress tracking endpoints
│   │   └── topicRoutes.js      # Topics endpoints
│   ├── uploads/                # User uploaded files
│   ├── .env                    # Environment variables
│   ├── package.json            # Backend dependencies
│   └── server.js               # Main server entry point
│
├── client/                     # React + Vite frontend
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── components/         # Reusable React components
│   │   │   ├── auth/           # Authentication components
│   │   │   ├── features/       # Feature-specific components
│   │   │   ├── ui/             # UI components
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Navigation.jsx
│   │   │   └── ...
│   │   ├── constants/          # Static data and configurations
│   │   │   ├── algorithmData.jsx
│   │   │   ├── dataStructureData.jsx
│   │   │   └── ...
│   │   ├── pages/              # Page components
│   │   │   ├── HomePage.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── CoursePage.jsx
│   │   │   ├── LeaderboardPage.jsx
│   │   │   └── ...
│   │   ├── services/           # API service layer
│   │   │   ├── authService.js
│   │   │   └── leetcodeService.jsx
│   │   ├── utils/              # Utility functions
│   │   │   └── api.js
│   │   ├── App.jsx             # Main App component
│   │   ├── main.jsx            # React entry point
│   │   └── index.css           # Global styles
│   ├── package.json            # Frontend dependencies
│   ├── vite.config.js          # Vite configuration
│   └── tailwind.config.js      # Tailwind CSS config
│
└── package.json                # Root package.json

```

## 🚀 Quick Start

### Prerequisites

- **Node.js** >= 18.0.0
- **MongoDB** (local or Atlas)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd reactproject
```

2. **Install dependencies**
```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../client
npm install
```

3. **Configure environment variables**

Create `.env` file in the `backend/` directory:

```env
# MongoDB
MONGO_URI=mongodb://localhost:27017/codefromscratch
MONGODB_URI=mongodb://localhost:27017/codefromscratch

# Server
PORT=5000
NODE_ENV=development

# Session Secret
SESSION_SECRET=your-super-secret-session-key-change-this-in-production

# Frontend URL
FRONTEND_URL=http://localhost:5173

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# GitHub OAuth
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

Create `.env` file in the `client/` directory (optional):

```env
VITE_API_URL=http://localhost:5000/api
```

4. **Start the development servers**

```bash
# Terminal 1 - Start backend server
cd backend
npm run dev

# Terminal 2 - Start frontend server
cd client
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

## 📚 Documentation

For detailed documentation, please refer to:

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System architecture and design patterns
- **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)** - Complete API reference
- **[COMPONENTS_GUIDE.md](./COMPONENTS_GUIDE.md)** - Frontend components guide
- **[DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md)** - Database models and relationships
- **[BEGINNER_GUIDE.md](./BEGINNER_GUIDE.md)** - Complete learning guide for beginners

## 🔑 Core Functionalities

### Authentication System
- **Local Authentication**: Email/password registration and login
- **OAuth Integration**: Google and GitHub single sign-on
- **Session Management**: Express-session with MongoDB store
- **Protected Routes**: Client-side and server-side route protection

### Learning Features
- **DSA Roadmap**: 200-day structured learning plan
- **LeetCode Integration**: Automatic profile synchronization
- **Progress Tracking**: Per-problem and overall progress
- **Streak System**: Daily activity tracking with calendar visualization
- **Leaderboard**: Real-time ranking based on problems solved

### Interactive Tools
- **Code Visualizer**: Step-by-step code execution
- **Monaco Editor**: VS Code-like code editing experience
- **Algorithm Visualizer**: Interactive algorithm demonstrations
- **Learning Paths**: Topic-based structured courses

## 🛠️ Technology Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **Passport.js** - Authentication middleware
- **bcryptjs** - Password hashing
- **express-session** - Session management
- **connect-mongo** - MongoDB session store

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **Monaco Editor** - Code editor
- **Axios** - HTTP client

## 🎨 Features in Detail

### User Dashboard
- Personal statistics overview
- Recent activity timeline
- GitHub-style contribution calendar
- LeetCode profile integration
- Achievement badges and progress bars

### DSA Problem Tracker
- 200-day curated problem set
- Difficulty-based filtering
- Company tags (FAANG)
- Topic categorization
- Solution links and hints

### Leaderboard System
- Real-time ranking updates
- Filter by time period
- User search functionality
- Detailed stats for each user

### Profile Management
- Multiple profile image sources (Google, GitHub, LeetCode, Custom upload)
- LeetCode username management
- Account settings
- Privacy controls

## 🔒 Security Features

- **Password Hashing**: bcrypt with salt rounds
- **Session Security**: HTTP-only cookies, secure flag in production
- **CORS Configuration**: Controlled cross-origin requests
- **Input Validation**: Server-side validation for all inputs
- **OAuth Security**: State parameter and token validation
- **Environment Variables**: Sensitive data protection

## 📈 Performance Optimizations

- **Code Splitting**: React lazy loading for routes
- **Image Optimization**: Proper sizing and caching
- **Database Indexing**: Optimized queries with indexes
- **Session Store**: MongoDB-based session persistence
- **API Caching**: Efficient data fetching strategies

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd client
npm test
```

## 🚢 Deployment

### Backend Deployment (Render/Heroku)
1. Set environment variables in platform dashboard
2. Configure MongoDB Atlas connection
3. Update CORS settings for production domain
4. Deploy using platform CLI or Git integration

### Frontend Deployment (Vercel/Netlify)
1. Update `VITE_API_URL` to production backend URL
2. Configure build settings
3. Deploy via Git integration

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- **Your Name** - Initial work

## 🙏 Acknowledgments

- LeetCode for providing the GraphQL API
- All open-source libraries used in this project
- The developer community for inspiration and support

## 📞 Support

For support, email your-email@example.com or create an issue in the repository.

## 🔄 Changelog

See [CHANGELOG.md](./CHANGELOG.md) for a list of changes.

---

**Made with ❤️ by developers, for developers**
