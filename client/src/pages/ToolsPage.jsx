// client/src/pages/ToolsPage.jsx
// Placeholder for the Tools section.

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SiLeetcode } from "react-icons/si";
import { FaCode, FaDatabase, FaServer, FaNetworkWired, FaDesktop, FaBook, FaChartBar, FaPlay, FaSitemap, FaEye } from "react-icons/fa";
// import LeetcodeProblems from "../LeetCodeProblems";
// import RecursionFoundation from "../components/features/RecursionFoundation";
import CodeVisualizer from "../components/features/CodeVisualizer";
import LearningPath from '../components/LearningPath';

export default function ToolsPage({ user }) {
  const [activeTool, setActiveTool] = useState('learning-path');

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
      id: 'coming-soon-1',
      name: 'Database Designer',
      description: 'Design and visualize database schemas',
      icon: <FaDatabase className="w-6 h-6" />,
      color: 'text-green-400',
      bgColor: 'bg-green-400/10'
    },
    {
      id: 'coming-soon-2',
      name: 'API Tester',
      description: 'Test and debug REST APIs',
      icon: <FaServer className="w-6 h-6" />,
      color: 'text-red-400',
      bgColor: 'bg-red-400/10'
    },
    {
      id: 'coming-soon-3',
      name: 'Network Simulator',
      description: 'Simulate network protocols and configurations',
      icon: <FaNetworkWired className="w-6 h-6" />,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-400/10'
    }
  ];

  const renderToolContent = () => {
    switch (activeTool) {
      case 'learning-path':
        return <LearningPath user={user} />;
      // case 'leetcode-problems':
      //   return <LeetcodeProblems />;
      // case 'recursion-foundation':
      //   return <RecursionFoundation />;
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
    <div className="w-full max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
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

      {/* Tools Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-[#0b0c1a] via-[#0f111f] to-[#101118] 
          rounded-3xl border border-[#2c2c3a] shadow-[0_0_40px_#00f2ff22] p-6 mb-8"
      >
        <h2 className="text-xl font-bold text-white mb-4">Available Tools</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
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

      {/* Tool Content */}
      <motion.div
        key={activeTool}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {renderToolContent()}
      </motion.div>
    </div>
  );
}
