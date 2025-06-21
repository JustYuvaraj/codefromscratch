import React, { useState } from "react";
import {
  FaServer,
  FaChartBar,
  FaCode,
  FaBrain,
  FaDatabase,
  FaNetworkWired,
  FaDesktop,
  FaCogs
} from "react-icons/fa";
import { GrReactjs } from "react-icons/gr";
import { GoDatabase } from "react-icons/go";
import { FcLinux } from "react-icons/fc";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMemory, faChartLine, faGlobe } from "@fortawesome/free-solid-svg-icons";

const topics = [
  { 
    id: "dsa", 
    label: "Data Structures", 
    icon: <FontAwesomeIcon icon={faMemory} />, 
    color: "text-green-400",
    description: "Master fundamental data structures",
    skills: ["Arrays & Strings", "Linked Lists", "Trees & Graphs", "Stacks & Queues", "Hash Tables"],
    outcomes: ["Solve complex problems efficiently", "Optimize memory usage", "Build scalable applications"],
    difficulty: "Beginner to Advanced",
    duration: "4-6 weeks"
  },
  { 
    id: "algo", 
    label: "Algorithms", 
    icon: <FontAwesomeIcon icon={faChartLine} />, 
    color: "text-yellow-400",
    description: "Learn problem-solving strategies",
    skills: ["Sorting & Searching", "Dynamic Programming", "Greedy Algorithms", "Graph Algorithms", "Divide & Conquer"],
    outcomes: ["Think algorithmically", "Optimize code performance", "Ace technical interviews"],
    difficulty: "Intermediate to Advanced",
    duration: "6-8 weeks"
  },
  { 
    id: "dbms", 
    label: "Database Systems", 
    icon: <GoDatabase />, 
    color: "text-blue-400",
    description: "Design and manage databases",
    skills: ["SQL & NoSQL", "Database Design", "ACID Properties", "Indexing", "Query Optimization"],
    outcomes: ["Build robust data models", "Optimize database performance", "Handle large-scale data"],
    difficulty: "Intermediate",
    duration: "4-5 weeks"
  },
  { 
    id: "os", 
    label: "Operating Systems", 
    icon: <FcLinux />, 
    color: "text-orange-400",
    description: "Understand system internals",
    skills: ["Process Management", "Memory Management", "File Systems", "Scheduling", "Inter-process Communication"],
    outcomes: ["Debug system-level issues", "Optimize resource usage", "Build system software"],
    difficulty: "Advanced",
    duration: "5-7 weeks"
  },
  { 
    id: "networking", 
    label: "Computer Networks", 
    icon: <FontAwesomeIcon icon={faGlobe} />, 
    color: "text-teal-400",
    description: "Master network protocols",
    skills: ["TCP/IP Stack", "HTTP/HTTPS", "DNS & Routing", "Network Security", "WebSockets"],
    outcomes: ["Build distributed systems", "Optimize network performance", "Implement secure protocols"],
    difficulty: "Intermediate to Advanced",
    duration: "4-6 weeks"
  },
  { 
    id: "frontend", 
    label: "Frontend Development", 
    icon: <GrReactjs />, 
    color: "text-cyan-400",
    description: "Create stunning user interfaces",
    skills: ["React.js", "JavaScript ES6+", "CSS3 & Responsive Design", "State Management", "Performance Optimization"],
    outcomes: ["Build modern web apps", "Create responsive UIs", "Optimize user experience"],
    difficulty: "Beginner to Intermediate",
    duration: "6-8 weeks"
  },
  { 
    id: "backend", 
    label: "Backend Development", 
    icon: <FaServer />, 
    color: "text-purple-400",
    description: "Build robust server applications",
    skills: ["Node.js/Express", "RESTful APIs", "Authentication", "Database Integration", "Deployment"],
    outcomes: ["Create scalable APIs", "Handle user authentication", "Deploy production apps"],
    difficulty: "Intermediate",
    duration: "5-7 weeks"
  },
  { 
    id: "system-design", 
    label: "System Design", 
    icon: <FaChartBar />, 
    color: "text-pink-400",
    description: "Design scalable architectures",
    skills: ["Microservices", "Load Balancing", "Caching Strategies", "Database Sharding", "Message Queues"],
    outcomes: ["Design large-scale systems", "Handle millions of users", "Optimize system performance"],
    difficulty: "Advanced",
    duration: "6-8 weeks"
  }
];

export default function FocusRow({ onSelect, selectedTopic }) {
  const row1 = topics.slice(0, 5);
  const row2 = topics.slice(5);

  const Pill = ({ id, label, icon, color }) => {
    const isSelected = id === selectedTopic;

    return (
      <div
        onClick={() => onSelect(id)}
        className={`
          flex items-center justify-center gap-2
          px-4 py-2 rounded-xl border
          cursor-pointer transition-all duration-300
          text-sm min-w-[140px]
          ${
            isSelected
              ? 'border-blue-400 bg-blue-400/10 shadow-[0_0_20px_#3b82f655]'
              : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
          }
        `}
      >
        <span className={`${color} z-10 text-lg`}>{icon}</span>
        <span className="text-white font-medium z-10">{label}</span>
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col items-center gap-6">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-white mb-3 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Choose Your Learning Focus
        </h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
          Select a focus area to start your personalized learning journey. Each path is carefully designed to take you from beginner to expert.
        </p>
        <div className="flex justify-center items-center gap-4 mt-4 text-sm text-gray-400">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Beginner Friendly
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
            Intermediate
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></span>
            Advanced
          </span>
        </div>
      </div>
      
      <div className="flex flex-wrap justify-center gap-4">
        {topics.map(topic => <Pill key={topic.id} {...topic} />)}
      </div>
    </div>
  );
} 