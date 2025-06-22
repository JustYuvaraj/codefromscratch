import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Code, Target, Trophy, BookOpen, TrendingUp, Calendar, Star } from 'lucide-react';
import { FaBook, FaCode as FaCodeIcon, FaChartBar, FaDatabase, FaServer, FaNetworkWired, FaDesktop, FaPlay, FaEye } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import LeetcodeProblems from '../components/features/LeetCodeProblems';
import LearningPath from '../components/LearningPath';
import FocusRow from '../components/features/FocusRow';
import FlowCanvas from '../components/features/FlowCanvas';
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

// Authenticated HomePage Component
function AuthenticatedHomePage({ user }) {
  const [recentProblems, setRecentProblems] = useState([
    { id: 1, title: "Two Sum", difficulty: "Easy", status: "solved", category: "Array", timeAgo: "2 hours ago" },
    { id: 2, title: "Add Two Numbers", difficulty: "Medium", status: "attempted", category: "Linked List", timeAgo: "1 day ago" },
    { id: 3, title: "Longest Substring Without Repeating Characters", difficulty: "Medium", status: "todo", category: "String", timeAgo: "3 days ago" },
    { id: 4, title: "Median of Two Sorted Arrays", difficulty: "Hard", status: "todo", category: "Array", timeAgo: "1 week ago" },
  ]);

  const [userStats, setUserStats] = useState({
    problemsSolved: 45,
    streak: 7,
    rank: 1250,
    accuracy: 78.5,
    totalProblems: 2000,
    weeklyGoal: 5,
    weeklyProgress: 3
  });

  const [learningRecommendations] = useState([
    { id: 1, title: "Master Binary Trees", description: "Based on your recent array problems", difficulty: "Medium", progress: 60, category: "Data Structures" },
    { id: 2, title: "Dynamic Programming Basics", description: "Perfect next step for your skill level", difficulty: "Medium", progress: 0, category: "Algorithms" },
    { id: 3, title: "System Design Fundamentals", description: "Expand your full-stack knowledge", difficulty: "Hard", progress: 0, category: "System Design" }
  ]);

  const [dailyChallenge] = useState({
    title: "Valid Parentheses",
    difficulty: "Easy",
    category: "Stack",
    description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    points: 10,
    timeLimit: "30 minutes"
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'solved': return 'text-green-400';
      case 'attempted': return 'text-yellow-400';
      case 'todo': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400';
      case 'Medium': return 'text-yellow-400';
      case 'Hard': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'text-green-400';
    if (progress >= 50) return 'text-yellow-400';
    return 'text-blue-400';
  };

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

          {/* Weekly Progress */}
          <div className="mt-6 max-w-md mx-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/70 text-sm">Weekly Goal: {userStats.weeklyProgress}/{userStats.weeklyGoal} problems</span>
              <span className="text-white/70 text-sm">{Math.round((userStats.weeklyProgress / userStats.weeklyGoal) * 100)}%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(userStats.weeklyProgress / userStats.weeklyGoal) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Daily Challenge Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-[#0b0c1a] via-[#0f111f] to-[#101118] 
          rounded-3xl border border-[#2c2c3a] shadow-[0_0_40px_#00f2ff22] p-8"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">🎯 Daily Challenge</h2>
            <p className="text-white/60 text-sm">Complete today's challenge to earn bonus points!</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-yellow-400">{dailyChallenge.points} pts</div>
            <div className="text-white/60 text-sm">{dailyChallenge.timeLimit}</div>
          </div>
        </div>
        
        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(dailyChallenge.difficulty)} bg-white/10`}>
              {dailyChallenge.difficulty}
            </span>
            <span className="text-white/60 text-sm">{dailyChallenge.category}</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-3">{dailyChallenge.title}</h3>
          <p className="text-white/70 mb-4">{dailyChallenge.description}</p>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg transition-all duration-300 font-semibold">
            Start Challenge
          </button>
        </div>
      </motion.div>

      {/* Learning Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-[#0b0c1a] via-[#0f111f] to-[#101118] 
          rounded-3xl border border-[#2c2c3a] shadow-[0_0_40px_#00f2ff22] p-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">📚 Recommended for You</h2>
          <Link
            to="/roadmaps"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            View All →
          </Link>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {learningRecommendations.map((rec) => (
            <div key={rec.id} className="bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(rec.difficulty)} bg-white/10`}>
                  {rec.difficulty}
                </span>
                <span className="text-white/60 text-xs">{rec.category}</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{rec.title}</h3>
              <p className="text-white/70 text-sm mb-4">{rec.description}</p>
              {rec.progress > 0 && (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white/60 text-xs">Progress</span>
                    <span className={`text-xs font-medium ${getProgressColor(rec.progress)}`}>{rec.progress}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-1">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-1 rounded-full"
                      style={{ width: `${rec.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium">
                {rec.progress > 0 ? 'Continue' : 'Start Learning'}
              </button>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Recent Problems Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-br from-[#0b0c1a] via-[#0f111f] to-[#101118] 
          rounded-3xl border border-[#2c2c3a] shadow-[0_0_40px_#00f2ff22] p-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">📝 Recent Activity</h2>
          <Link
            to="/dashboard"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            View All →
          </Link>
        </div>
        
        <div className="grid gap-4">
          {recentProblems.map((problem) => (
            <div key={problem.id} className="bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-white font-semibold">{problem.title}</h3>
                    <span className="text-white/40 text-xs">{problem.timeAgo}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className={`${getDifficultyColor(problem.difficulty)}`}>
                      {problem.difficulty}
                    </span>
                    <span className="text-white/60">{problem.category}</span>
                    <span className={`${getStatusColor(problem.status)}`}>
                      {problem.status.charAt(0).toUpperCase() + problem.status.slice(1)}
                    </span>
                  </div>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                  {problem.status === 'solved' ? 'Review' : 'Practice'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid md:grid-cols-3 gap-6"
      >
        <div className="bg-gradient-to-br from-[#0b0c1a] via-[#0f111f] to-[#101118] 
          rounded-3xl border border-[#2c2c3a] shadow-[0_0_40px_#00f2ff22] p-6">
          <div className="flex items-center gap-3 mb-4">
            <FaBook className="w-6 h-6 text-blue-400" />
            <h3 className="text-xl font-bold text-white">Learning Paths</h3>
          </div>
          <p className="text-white/70 mb-4">
            Follow structured roadmaps designed by industry experts to master specific domains.
          </p>
          <Link
            to="/roadmaps"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors inline-block"
          >
            Explore Roadmaps
          </Link>
        </div>

        <div className="bg-gradient-to-br from-[#0b0c1a] via-[#0f111f] to-[#101118] 
          rounded-3xl border border-[#2c2c3a] shadow-[0_0_40px_#00f2ff22] p-6">
          <div className="flex items-center gap-3 mb-4">
            <FaCodeIcon className="w-6 h-6 text-purple-400" />
            <h3 className="text-xl font-bold text-white">Coding Tools</h3>
          </div>
          <p className="text-white/70 mb-4">
            Access powerful tools including visualizers, debuggers, and practice environments.
          </p>
          <Link
            to="/tools"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors inline-block"
          >
            Open Tools
          </Link>
        </div>

        <div className="bg-gradient-to-br from-[#0b0c1a] via-[#0f111f] to-[#101118] 
          rounded-3xl border border-[#2c2c3a] shadow-[0_0_40px_#00f2ff22] p-6">
          <div className="flex items-center gap-3 mb-4">
            <SiLeetcode className="w-6 h-6 text-orange-400" />
            <h3 className="text-xl font-bold text-white">Structured Learning</h3>
          </div>
          <p className="text-white/70 mb-4">
            Master coding problems and theoretical concepts in a structured, progressive way.
          </p>
          <Link
            to="/tools"
            className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg transition-colors inline-block"
          >
            Start Learning Path
          </Link>
        </div>
      </motion.div>

      {/* Focus Areas Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-br from-[#0b0c1a] via-[#0f111f] to-[#101118] 
          rounded-3xl border border-[#2c2c3a] shadow-[0_0_40px_#00f2ff22] p-8"
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">🎯 Choose Your Focus Area</h2>
          <p className="text-white/70">Select a topic to explore interactive learning paths and visualizations</p>
        </div>
        <FocusRow />
      </motion.div>
    </div>
  );
}

// Original HomePage for unauthenticated users
function UnauthenticatedHomePage() {
  const headline = "Unlock Your Potential. Master Code From Scratch.";
  const words = headline.split(' ');
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [activeTool, setActiveTool] = useState('learning-path');
  const focusRowRef = useRef(null);
  const canvasRef = useRef(null);

  // Handle topic selection by click
  const handleTopicSelect = (topicId) => {
    const newSelectedTopic = selectedTopic === topicId ? null : topicId;
    setSelectedTopic(newSelectedTopic);

    if (newSelectedTopic) {
      setTimeout(() => {
        if (canvasRef.current) {
          canvasRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  // Tools data
  const tools = [
    {
      id: 'learning-path',
      name: 'Structured Learning Path',
      description: 'Master coding problems and theoretical concepts in a structured way',
      icon: <FaBook className="w-6 h-6" />,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10'
    },
    {
      id: 'leetcode-problems',
      name: 'LeetCode Problems',
      description: 'Practice coding problems with progress tracking',
      icon: <SiLeetcode className="w-6 h-6" />,
      color: 'text-orange-400',
      bgColor: 'bg-orange-400/10'
    },
    {
      id: 'code-visualizer',
      name: 'Code Visualizer',
      description: 'Step-by-step visualization of code execution with variables and terminal',
      icon: <FaEye className="w-6 h-6" />,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-400/10'
    },
    {
      id: 'coming-soon-2',
      name: 'Database Designer',
      description: 'Design and visualize database schemas',
      icon: <FaDatabase className="w-6 h-6" />,
      color: 'text-green-400',
      bgColor: 'bg-green-400/10'
    },
    {
      id: 'coming-soon-3',
      name: 'API Tester',
      description: 'Test and debug REST APIs',
      icon: <FaServer className="w-6 h-6" />,
      color: 'text-red-400',
      bgColor: 'bg-red-400/10'
    },
    {
      id: 'coming-soon-4',
      name: 'Network Simulator',
      description: 'Simulate network protocols and configurations',
      icon: <FaNetworkWired className="w-6 h-6" />,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-400/10'
    }
  ];

  // Statistics data
  const stats = [
    { number: '10,000+', label: 'Active Learners', icon: '👥' },
    { number: '500+', label: 'Coding Problems', icon: '💻' },
    { number: '95%', label: 'Success Rate', icon: '📈' },
    { number: '24/7', label: 'Learning Support', icon: '🔄' }
  ];

  // Testimonials data
  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Software Engineer at Google',
      avatar: '👩‍💻',
      content: 'CodeFromScratch transformed my learning journey. The structured approach and visual tools made complex concepts click instantly.',
      rating: 5
    },
    {
      name: 'Alex Rodriguez',
      role: 'Full Stack Developer',
      avatar: '👨‍💻',
      content: 'Finally, a platform that combines theory with practice! The LeetCode integration and progress tracking kept me motivated.',
      rating: 5
    },
    {
      name: 'Priya Patel',
      role: 'Computer Science Student',
      avatar: '👩‍🎓',
      content: 'The visual learning approach is incredible. I went from struggling with algorithms to acing my interviews!',
      rating: 5
    }
  ];

  // Features comparison
  const features = [
    {
      title: 'Visual Learning',
      description: 'See algorithms and data structures come to life with interactive visualizations',
      icon: '🎨'
    },
    {
      title: 'Structured Curriculum',
      description: 'Follow a carefully designed learning path that builds skills progressively',
      icon: '📚'
    },
    {
      title: 'Real-time Progress',
      description: 'Track your learning journey with detailed analytics and insights',
      icon: '📊'
    },
    {
      title: 'Community Support',
      description: 'Connect with fellow learners and get help when you need it',
      icon: '🤝'
    },
    {
      title: 'Interview Prep',
      description: 'Prepare for technical interviews with curated problem sets',
      icon: '🎯'
    },
    {
      title: 'Industry Alignment',
      description: 'Learn skills that are directly applicable to real-world development',
      icon: '🏢'
    }
  ];

  // Tool content rendering
  const renderToolContent = () => {
    switch (activeTool) {
      case 'learning-path':
        return <LearningPath user={null} />;
      case 'leetcode-problems':
        return <LeetcodeProblems />;
      case 'code-visualizer':
        return <CodeVisualizer />;
      default:
        return (
          <div className="flex flex-col items-center justify-center text-center p-12">
            <div className={`w-20 h-20 rounded-full ${tools.find(t => t.id === activeTool)?.bgColor} flex items-center justify-center mb-6`}>
              {tools.find(t => t.id === activeTool)?.icon}
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              {tools.find(t => t.id === activeTool)?.name}
            </h2>
            <p className="text-lg text-white/70 max-w-xl mb-8">
              {tools.find(t => t.id === activeTool)?.description}
            </p>
            <div className="bg-gradient-to-br from-[#0b0c1a] via-[#0f111f] to-[#101118] 
              rounded-3xl border border-[#2c2c3a] shadow-[0_0_40px_#00f2ff22] p-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <FaPlay className="text-blue-400 text-xl" />
                <span className="text-blue-400 font-semibold text-lg">Coming Soon!</span>
              </div>
              <p className="text-white/70">
                This tool is currently under development. We're working hard to bring you the best learning experience!
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-12 py-12">
      <div className="bg-gradient-to-br from-[#0b0c1a] via-[#0f111f] to-[#101118] 
        rounded-3xl border border-[#2c2c3a] shadow-[0_0_40px_#00f2ff22] p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">🎯 Choose Your Focus Area</h2>
          <p className="text-white/70">Select a topic to explore interactive learning paths and visualizations</p>
        </div>
        <FocusRow onSelect={handleTopicSelect} selectedTopic={selectedTopic} />
      </div>

      <div ref={canvasRef}>
        <FlowCanvas selected={selectedTopic} />
      </div>

      <main className="relative w-full max-w-6xl mx-auto px-6 py-20 min-h-[80vh] flex items-center justify-center
        bg-gradient-to-br from-[#0b0c1a] via-[#0f111f] to-[#101118] 
        rounded-3xl border border-[#2c2c3a] shadow-[0_0_40px_#00f2ff22]">
        
        <div className="container px-4 text-center">
            <motion.h1
              className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight"
            >
              Unlock Your Potential. Master Code From Scratch.
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                className="mt-6 max-w-2xl mx-auto text-lg text-white/70"
            >
             The ultimate visual platform for learning Computer Science fundamentals, Data Structures, and Fullstack Development.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4"
            >
              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg px-8 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/20 w-full sm:w-auto"
              >
                Get Started for Free
              </Link>

              <Link
                to="/roadmaps"
                className="border border-white/20 hover:bg-white/10 text-white font-medium text-lg px-8 py-3 rounded-lg transition duration-300 w-full sm:w-auto"
              >
                Explore Roadmaps
              </Link>
            </motion.div>
          </div>
      </main>

      {/* Statistics Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-6xl mx-auto px-6"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="text-center"
            >
              <div className="bg-gradient-to-br from-[#0b0c1a] via-[#0f111f] to-[#101118] 
                rounded-2xl border border-[#2c2c3a] shadow-[0_0_40px_#00f2ff22] p-6">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
                <div className="text-white/70 text-sm">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="w-full max-w-6xl mx-auto px-6"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            ✨ Why Choose CodeFromScratch?
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Experience learning that's designed for the modern developer, with cutting-edge tools and proven methodologies
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="group bg-gradient-to-br from-[#0b0c1a] via-[#0f111f] to-[#101118] 
                rounded-2xl border border-[#2c2c3a] shadow-[0_0_40px_#00f2ff22] p-6
                hover:shadow-[0_0_60px_#00f2ff33] hover:border-[#2c2c3a]/80
                transition-all duration-500"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-white/70 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Development Tools Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="w-full max-w-7xl mx-auto px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            🛠️ Development Tools
          </h1>
          <p className="text-white/70 text-lg">
            Access powerful tools to enhance your coding practice and learning journey
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-[#0b0c1a] via-[#0f111f] to-[#101118] 
            rounded-3xl border border-[#2c2c3a] shadow-[0_0_40px_#00f2ff22] p-6 mb-8"
        >
          <h2 className="text-xl font-bold text-white mb-4">Available Tools</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => setActiveTool(tool.id)}
                className={`p-4 rounded-xl border transition-all duration-300 text-left ${
                  activeTool === tool.id
                    ? 'border-blue-400 bg-blue-400/10 shadow-[0_0_20px_#3b82f655]'
                    : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                }`}
              >
                <div className={`w-10 h-10 rounded-lg ${tool.bgColor} flex items-center justify-center mb-3`}>
                  <span className={tool.color}>{tool.icon}</span>
                </div>
                <h3 className="text-white font-semibold text-sm mb-1">{tool.name}</h3>
                <p className="text-white/60 text-xs">{tool.description}</p>
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          key={activeTool}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {renderToolContent()}
        </motion.div>
      </motion.div>

      {/* Testimonials Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="w-full max-w-6xl mx-auto px-6"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            💬 What Our Learners Say
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Join thousands of developers who have transformed their careers with CodeFromScratch
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + index * 0.1 }}
              className="bg-gradient-to-br from-[#0b0c1a] via-[#0f111f] to-[#101118] 
                rounded-2xl border border-[#2c2c3a] shadow-[0_0_40px_#00f2ff22] p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400">⭐</span>
                ))}
              </div>
              <p className="text-white/80 mb-6 leading-relaxed italic">"{testimonial.content}"</p>
              <div className="flex items-center gap-3">
                <div className="text-2xl">{testimonial.avatar}</div>
                <div>
                  <div className="text-white font-semibold">{testimonial.name}</div>
                  <div className="text-white/60 text-sm">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="text-center"
      >
        <div className="bg-gradient-to-br from-[#0b0c1a] via-[#0f111f] to-[#101118] 
          rounded-3xl border border-[#2c2c3a] shadow-[0_0_40px_#00f2ff22] p-12">
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Learning?
          </h3>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto text-lg">
            Join thousands of developers who are already using CodeFromScratch to master computer science fundamentals and advance their careers.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              to="/register"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 
                text-white font-semibold text-lg px-8 py-4 rounded-lg transition-all duration-300 
                shadow-lg hover:shadow-blue-500/20 transform hover:scale-105"
            >
              Start Learning for Free
            </Link>
            <Link
              to="/login"
              className="border border-white/20 hover:bg-white/10 text-white font-medium text-lg px-8 py-4 rounded-lg transition duration-300"
            >
              Sign In
            </Link>
          </div>
          <p className="text-white/50 text-sm mt-4">No credit card required • Start learning in seconds</p>
        </div>
      </motion.div>
    </div>
  );
}

// Main HomePage component that decides which version to show
export default function HomePage({ user, isAuthenticated }) {
  if (isAuthenticated && user) {
    return <AuthenticatedHomePage user={user} />;
  }
  return <UnauthenticatedHomePage />;
}

