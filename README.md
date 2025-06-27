# CodeFromScratch - Full Stack Learning Platform

A comprehensive learning platform with DSA study plans, interactive tools, and progress tracking.

## 🚀 Live Demo
- **Frontend**: [Your Vercel URL]
- **Backend**: [Your Render URL]
- **DSA Plan**: `/dsa-plan` route

## 🛠️ Tech Stack
- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Express, MongoDB
- **Authentication**: Passport.js, JWT
- **Deployment**: Vercel (Frontend), Render (Backend), MongoDB Atlas (Database)

## 📋 Features
- ✅ 200-Day DSA Study Plan with 1000 problems
- ✅ Progressive learning structure
- ✅ FAANG company focus
- ✅ Interactive problem tracking
- ✅ User authentication & profiles
- ✅ Code visualization tools
- ✅ Progress analytics

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas account
- GitHub account

### Local Development

1. **Clone the repository**
```bash
git clone https://github.com/JustYuvaraj/codefromscratch.git
cd codefromscratch
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

3. **Set up environment variables**

Create `.env` file in `backend/`:
```env
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
FRONTEND_URL=http://localhost:5173
PORT=5000
```

4. **Start development servers**
```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend
cd client
npm run dev
```

5. **Access the application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- DSA Plan: http://localhost:5173/dsa-plan

## 🌐 Free Deployment Guide

### Step 1: MongoDB Atlas (Database)
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create free account
3. Create new cluster (M0 Free tier)
4. Get connection string
5. Add to environment variables

### Step 2: Render (Backend)
1. Go to [Render](https://render.com)
2. Connect GitHub repository
3. Create new Web Service
4. Select backend folder
5. Add environment variables:
   - `MONGO_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Your secret key
   - `FRONTEND_URL`: Your Vercel frontend URL

### Step 3: Vercel (Frontend)
1. Go to [Vercel](https://vercel.com)
2. Import GitHub repository
3. Set root directory to `client`
4. Add environment variable:
   - `VITE_API_URL`: Your Render backend URL

## 📁 Project Structure
```
codefromscratch/
├── backend/
│   ├── data/
│   │   └── dsa-200-day-plan.json    # DSA study plan data
│   ├── routes/
│   │   └── dsaRoutes.js             # DSA API endpoints
│   └── server.js                    # Express server
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   └── features/
│   │   │       └── DSAPlan.jsx      # DSA plan component
│   │   └── App.jsx                  # Main app with routes
│   └── vite.config.js               # Vite configuration
└── README.md
```

## 🔧 API Endpoints

### DSA Plan Routes
- `GET /api/dsa/plan` - Get complete 200-day plan
- `GET /api/dsa/day/:dayNumber` - Get specific day
- `GET /api/dsa/week/:weekNumber` - Get specific week
- `GET /api/dsa/difficulty/:difficulty` - Filter by difficulty
- `GET /api/dsa/company/:company` - Filter by FAANG company

## 🎯 DSA Plan Features
- **200 Days** of structured learning
- **1000 Problems** with progressive difficulty
- **FAANG Focus** with company-specific problems
- **Progress Tracking** with localStorage
- **Interactive UI** with animations
- **Direct LeetCode Links** for each problem

## 🤝 Contributing
1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 License
MIT License - see LICENSE file for details

## 🆘 Support
- Create an issue for bugs
- Fork for feature requests
- Star the repository if helpful!

---
**Built with ❤️ for the coding community** 