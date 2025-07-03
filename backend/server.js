const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const MongoStore = require('connect-mongo');
require("dotenv").config();
require("./config/passport"); // Load strategies first

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: 'https://codefromscratch.vercel.app',
    credentials: true
  })
);
app.use(express.json());

app.set('trust proxy', 1);

// Session configuration
const sessionOptions = {
  secret: process.env.SESSION_SECRET || 'your_secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    sameSite: 'none',
    secure: true,
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
};

if (process.env.MONGODB_URI) {
  sessionOptions.store = MongoStore.create({ mongoUrl: process.env.MONGODB_URI });
}

app.use(session(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());

// Serve static files from uploads directory
app.use('/uploads', express.static('uploads'));

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Add a root route for friendly message
app.get('/', (req, res) => {
  res.send('Backend is running! 🚀');
});

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/dsa", require("./routes/dsaRoutes"));
app.use("/api/progress", require("./routes/progressRoutes"));
app.use("/api/topics", require("./routes/topicRoutes"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// MongoDB + Start Server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
