import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Code, Target, Trophy, BookOpen, TrendingUp, Calendar, Star } from 'lucide-react';
import FocusRow from '../components/features/FocusRow';
import FlowCanvas from '../components/features/FlowCanvas';
import { FaBook, FaCode, FaChartBar, FaDatabase, FaServer, FaNetworkWired, FaDesktop, FaPlay, FaEye } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import CodeVisualizer from '../components/features/CodeVisualizer';

const Feature = ({ icon, title, text }) => (
  <div className="flex items-start space-x-4">
    <div className="flex-shrink-0 mt-1 bg-primary/10 text-primary rounded-lg w-10 h-10 flex items-center justify-center">
        {icon}
    </div>
    <div>
      <h3 className="font-semibold text-lg text-white">{title}</h3>
      <p className="text-white/70">{text}</p>
    </div>
  </div>
);

// Animation variants for the container of the staggered text
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// Animation variants for each word
const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function InteractiveCodeVisualizer() {
  const [code, setCode] = useState(
`let sum = 0;
for (let i = 0; i < 4; i++) {
  sum += i;
  console.log({i, sum});
}`);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
      <div className="lg:col-span-2">
        <h3 className="text-2xl font-bold text-white mb-4">
          Visualize Code Execution
        </h3>
        <p className="text-white/70 mb-4">
          Type any JavaScript code below and see how it executes step-by-step. Understand scopes, variables, and the call stack like never before.
        </p>
        <textarea
          className="w-full h-64 font-mono p-4 border rounded-lg bg-[#1e1e1e] text-white border-gray-700 focus:ring-2 focus:ring-blue-500 transition"
          value={code}
          onChange={e => setCode(e.target.value)}
        />
      </div>
      <div className="lg:col-span-3">
        <CodeVisualizer code={code} />
      </div>
    </div>
  );
}

// Authenticated Homepage Component
function AuthenticatedHomePage({ user }) {
  const [userStats, setUserStats] = useState({
    problemsSolved: 45,
    streak: 7,
    rank: 1250,
    accuracy: 78.5,
    totalProblems: 2000,
    weeklyGoal: 5,
    weeklyProgress: 3
  });

  return (
    <div className="space-y-8 py-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-[#0b0c1a] via-[#0f111f] to-[#101118]
          rounded-3xl border border-[#2c2c3a] shadow-[0_0_40px_#00f2ff22] p-8"
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Welcome back, <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              {user?.name || user?.username || 'Coder'}!
            </span>
          </h1>
          <p className="text-white/70 text-lg mb-6">
            Ready to crush today's coding challenges? Let's keep that momentum going! 🚀
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <span className="text-white/70 text-sm">Solved</span>
              </div>
              <p className="text-2xl font-bold text-white">{userStats.problemsSolved}</p>
              <p className="text-xs text-white/50">of {userStats.totalProblems}</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <span className="text-white/70 text-sm">Streak</span>
              </div>
              <p className="text-2xl font-bold text-white">{userStats.streak} days</p>
              <p className="text-xs text-white/50">🔥 Keep it up!</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-5 h-5 text-blue-400" />
                <span className="text-white/70 text-sm">Rank</span>
              </div>
              <p className="text-2xl font-bold text-white">#{userStats.rank}</p>
              <p className="text-xs text-white/50">Top 6.25%</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-5 h-5 text-purple-400" />
                <span className="text-white/70 text-sm">Accuracy</span>
              </div>
              <p className="text-2xl font-bold text-white">{userStats.accuracy}%</p>
              <p className="text-xs text-white/50">Excellent!</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Unauthenticated Homepage Component
function UnauthenticatedHomePage() {
    const headline = "Unlock Your Potential. Master Code From Scratch.";
    const words = headline.split(' ');
    
    return (
      <div className="space-y-16 py-8">
        {/* Hero Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
          >
            {words.map((word, index) => (
              <motion.span
                key={index}
                variants={childVariants}
                className="inline-block mr-3"
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 1.5 } }}
            className="text-white/70 text-lg max-w-2xl mx-auto mb-8"
          >
            Your all-in-one platform for mastering data structures, algorithms, and system design.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 1.8 } }}
            className="flex justify-center items-center space-x-4"
          >
            <Link
              to="/register"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/20"
            >
              Get Started
            </Link>
            <Link
              to="/tools"
              className="bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-3 rounded-lg transition-colors"
            >
              Explore Tools
            </Link>
          </motion.div>
        </motion.div>

        {/* Interactive Visualizer Section */}
        <div className="bg-gradient-to-br from-[#0b0c1a] via-[#0f111f] to-[#101118] 
          rounded-3xl border border-[#2c2c3a] shadow-[0_0_40px_#00f2ff22] p-8 md:p-12">
          <InteractiveCodeVisualizer />
        </div>
      </div>
    );
}


export default function HomePage({ user, isAuthenticated }) {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-10 z-0"></div>
      <main className="container mx-auto px-6 py-12 relative z-10">
        {isAuthenticated ? <AuthenticatedHomePage user={user} /> : <UnauthenticatedHomePage />}
      </main>
    </div>
  );
}
