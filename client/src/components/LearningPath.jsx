import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SiLeetcode } from "react-icons/si";
import { FaCheckCircle, FaBook, FaDatabase, FaServer, FaNetworkWired, FaDesktop, FaCode } from "react-icons/fa";
import { BiBrain } from "react-icons/bi";

const learningPhases = [
  {
    id: 1,
    name: "Array Fundamentals",
    description: "Master basic array operations and manipulations",
    problems: [
      { id: 1, title: "9. Palindrome Number", difficulty: "Easy", link: "https://leetcode.com/problems/palindrome-number/description/" },
      { id: 2, title: "7. Reverse Integer", difficulty: "Medium", link: "https://leetcode.com/problems/reverse-integer/description/" },
      { id: 3, title: "26. Remove Duplicates from Sorted Array", difficulty: "Easy", link: "https://leetcode.com/problems/remove-duplicates-from-sorted-array/description/" },
      { id: 4, title: "27. Remove Element", difficulty: "Easy", link: "https://leetcode.com/problems/remove-element/description/" },
      { id: 5, title: "344. Reverse String", difficulty: "Easy", link: "https://leetcode.com/problems/reverse-string/description/" }
    ],
    studyTopic: "Database Fundamentals",
    studyContent: {
      title: "Database Fundamentals",
      icon: <FaDatabase className="w-6 h-6" />,
      topics: [
        "Relational Database Concepts",
        "SQL Basics (SELECT, INSERT, UPDATE, DELETE)",
        "Database Normalization",
        "Indexing and Performance",
        "ACID Properties"
      ],
      resources: [
        "SQL Tutorial - W3Schools",
        "Database Design - Coursera",
        "MySQL Documentation"
      ]
    }
  }
];

const getBadgeStyle = (difficulty) => {
  switch (difficulty) {
    case "Easy":
      return "bg-[#00c8531a] text-[#00c853]";
    case "Medium":
      return "bg-[#ffab001a] text-[#ffab00]";
    case "Hard":
      return "bg-[#d500001a] text-[#d50000]";
    default:
      return "";
  }
};

export default function LearningPath({ user }) {
  const [currentPhase, setCurrentPhase] = useState(1);
  const [solvedProblems, setSolvedProblems] = useState([]);
  const [showStudySection, setShowStudySection] = useState(false);
  const [studyProgress, setStudyProgress] = useState({});

  useEffect(() => {
    const savedProgress = localStorage.getItem('learningPathProgress');
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setSolvedProblems(progress.solvedProblems || []);
      setCurrentPhase(progress.currentPhase || 1);
      setStudyProgress(progress.studyProgress || {});
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('learningPathProgress', JSON.stringify({
      solvedProblems,
      currentPhase,
      studyProgress
    }));
  }, [solvedProblems, currentPhase, studyProgress]);

  const handleToggleSolved = (problemId) => {
    setSolvedProblems(prev => 
      prev.includes(problemId)
        ? prev.filter(id => id !== problemId)
        : [...prev, problemId]
    );
  };

  const getCurrentPhaseData = () => learningPhases.find(phase => phase.id === currentPhase);
  const currentPhaseData = getCurrentPhaseData();

  const solvedInCurrentPhase = currentPhaseData.problems.filter(p => 
    solvedProblems.includes(p.id)
  ).length;

  const isPhaseComplete = solvedInCurrentPhase === currentPhaseData.problems.length;

  const markStudyTopicComplete = (topic) => {
    setStudyProgress(prev => ({
      ...prev,
      [currentPhase]: {
        ...prev[currentPhase],
        [topic]: true
      }
    }));
  };

  const getStudyProgress = () => {
    const phaseProgress = studyProgress[currentPhase] || {};
    return Object.keys(phaseProgress).filter(topic => phaseProgress[topic]).length;
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold text-white mb-4">
          🎯 Structured Learning Path
        </h1>
        <p className="text-white/70 text-lg">
          Master coding problems and theoretical concepts in a structured way
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-[#0b0c1a] via-[#0f111f] to-[#101118] 
          rounded-3xl border border-[#2c2c3a] shadow-[0_0_40px_#00f2ff22] p-6 mb-8"
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">
            Phase {currentPhase}: {currentPhaseData.name}
          </h2>
          <p className="text-white/70">{currentPhaseData.description}</p>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/70 text-sm">
              Problems: {solvedInCurrentPhase}/{currentPhaseData.problems.length}
            </span>
            <span className="text-white/70 text-sm">
              {Math.round((solvedInCurrentPhase / currentPhaseData.problems.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${(solvedInCurrentPhase / currentPhaseData.problems.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {isPhaseComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <FaCheckCircle className="text-green-400 text-xl" />
              <span className="text-green-400 font-semibold">Phase Complete!</span>
            </div>
            <p className="text-white/70 text-sm">
              All problems solved! Ready to study {currentPhaseData.studyTopic}
            </p>
            <button
              onClick={() => setShowStudySection(!showStudySection)}
              className="mt-3 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              {showStudySection ? 'Hide Study Materials' : 'Start Studying'}
            </button>
          </motion.div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-[#0b0c1a] via-[#0f111f] to-[#101118] 
          rounded-3xl border border-[#2c2c3a] shadow-[0_0_40px_#00f2ff22] p-8 mb-8"
      >
        <div className="flex items-center gap-3 mb-6">
          <SiLeetcode className="text-2xl text-orange-400" />
          <h2 className="text-2xl font-bold text-white">Coding Problems</h2>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {currentPhaseData.problems.map((problem) => (
            <div
              key={problem.id}
              className={`group flex items-center justify-between p-4 rounded-2xl 
                border border-white/10 bg-white/5 backdrop-blur-lg
                hover:bg-gradient-to-br from-white/10 to-cyan-500/10
                hover:border-cyan-400/30 hover:shadow-[0_0_20px_#00f2ff55]
                transition-all duration-300 text-white ${
                  solvedProblems.includes(problem.id) ? "ring-2 ring-green-400" : ""
                }`}
            >
              <div className="flex items-center gap-4">
                <button onClick={() => handleToggleSolved(problem.id)}>
                  <FaCheckCircle
                    className={`text-xl ${
                      solvedProblems.includes(problem.id)
                        ? "text-green-400"
                        : "text-gray-500 hover:text-green-400"
                    }`}
                  />
                </button>
                <a
                  href={problem.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-sm hover:underline"
                >
                  {problem.title}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`text-xs px-3 py-1 rounded-xl font-semibold ${getBadgeStyle(
                    problem.difficulty
                  )}`}
                >
                  {problem.difficulty}
                </span>
                <a
                  href={problem.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-400 text-xl hover:scale-110 transition"
                >
                  <SiLeetcode />
                </a>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {showStudySection && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-[#0b0c1a] via-[#0f111f] to-[#101118] 
            rounded-3xl border border-[#2c2c3a] shadow-[0_0_40px_#00f2ff22] p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            {currentPhaseData.studyContent.icon}
            <h2 className="text-2xl font-bold text-white">{currentPhaseData.studyContent.title}</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <BiBrain className="text-blue-400" />
                Key Topics
              </h3>
              <div className="space-y-3">
                {currentPhaseData.studyContent.topics.map((topic, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10"
                  >
                    <button
                      onClick={() => markStudyTopicComplete(topic)}
                      className="flex-shrink-0"
                    >
                      <FaCheckCircle
                        className={`text-lg ${
                          studyProgress[currentPhase]?.[topic]
                            ? "text-green-400"
                            : "text-gray-500 hover:text-green-400"
                        }`}
                      />
                    </button>
                    <span className="text-white/90">{topic}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <FaBook className="text-purple-400" />
                Learning Resources
              </h3>
              <div className="space-y-3">
                {currentPhaseData.studyContent.topics.map((topic, index) => (
                  <div
                    key={index}
                    className="p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    <span className="text-white/90">{topic}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/70 text-sm">
                Study Progress: {getStudyProgress()}/{currentPhaseData.studyContent.topics.length} topics
              </span>
              <span className="text-white/70 text-sm">
                {Math.round((getStudyProgress() / currentPhaseData.studyContent.topics.length) * 100)}%
              </span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(getStudyProgress() / currentPhaseData.studyContent.topics.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
