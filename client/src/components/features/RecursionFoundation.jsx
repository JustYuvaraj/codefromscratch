import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { SiGeeksforgeeks } from "react-icons/si";
import { BiLinkExternal } from "react-icons/bi";
import { MdCode } from "react-icons/md";
import { SiLeetcode } from "react-icons/si";

const recursionProblems = [
  {
    title: "1. Print Numbers from N to 1 using Recursion",
    difficulty: "Easy",
    source: "GeeksforGeeks",
    link: "https://www.geeksforgeeks.org/print-numbers-from-n-to-1-without-using-semicolon/",
    icon: SiGeeksforgeeks,
    color: "text-orange-500"
  },
  {
    title: "2. Sum of First N Natural Numbers using Recursion",
    difficulty: "Easy",
    source: "GeeksforGeeks",
    link: "https://www.geeksforgeeks.org/sum-of-natural-numbers-using-recursion/",
    icon: SiGeeksforgeeks,
    color: "text-orange-500"
  },
  {
    title: "3. Sum of All Elements in an Array using Recursion",
    difficulty: "Easy",
    source: "GeeksforGeeks",
    link: "https://www.geeksforgeeks.org/sum-of-array-elements-using-recursion/",
    icon: SiGeeksforgeeks,
    color: "text-orange-500"
  },
  {
    title: "4. Sum of Odd Numbers in Array using Recursion",
    difficulty: "Easy",
    source: "CSInfo360",
    link: "https://csinfo360.com/2021/01/sum-of-odd-numbers-in-array-using-recursion.html",
    icon: BiLinkExternal,
    color: "text-blue-500"
  },
  {
    title: "5. Factorial of a Number using Recursion",
    difficulty: "Easy",
    source: "GeeksforGeeks",
    link: "https://www.geeksforgeeks.org/factorial-of-a-number-using-recursion/",
    icon: SiGeeksforgeeks,
    color: "text-orange-500"
  },
  {
    title: "6. Check if a Number is a Power of 2 using Recursion",
    difficulty: "Medium",
    source: "LeetCode",
    link: "https://leetcode.com/problems/power-of-two/description/",
    icon: SiLeetcode,
    color: "text-yellow-500"
  },
  {
    title: "7. Fibonacci Number using Recursion",
    difficulty: "Easy",
    source: "LeetCode",
    link: "https://leetcode.com/problems/fibonacci-number/description/",
    icon: SiLeetcode,
    color: "text-yellow-500"
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

// Individual Problem Card Component
const RecursionProblemCard = ({ problem, isSolved, onToggleSolved }) => {
  const IconComponent = problem.icon;
  
  return (
    <div
      className={`group flex items-center justify-between p-4 rounded-2xl 
        border border-white/10 bg-white/5 backdrop-blur-lg
        hover:bg-gradient-to-br from-white/10 to-purple-500/10
        hover:border-purple-400/30 hover:shadow-[0_0_20px_#a855f755]
        transition-all duration-300 text-white ${
          isSolved ? "ring-2 ring-green-400 shadow-[0_0_15px_#00c85355]" : ""
        }`}
    >
      <div className="flex items-center gap-4">
        <button 
          onClick={() => onToggleSolved(problem.title)}
          className="hover:scale-110 transition-transform duration-200"
        >
          <FaCheckCircle
            className={`text-xl ${
              isSolved
                ? "text-green-400 drop-shadow-[0_0_8px_#00c853]"
                : "text-gray-500 hover:text-green-400"
            }`}
          />
        </button>
        <div className="flex flex-col">
          <a
            href={problem.link}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-sm hover:underline hover:text-purple-300 transition-colors"
          >
            {problem.title}
          </a>
          <span className="text-xs text-gray-400">📎 {problem.source}</span>
        </div>
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
          className={`text-xl hover:scale-110 hover:drop-shadow-[0_0_8px_${problem.color.replace('text-', '')}] transition-all duration-200 ${problem.color}`}
        >
          <IconComponent />
        </a>
      </div>
    </div>
  );
};

// Filter Button Component with Glow Effect
const FilterButton = ({ type, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 rounded-full text-sm font-medium border 
        transition-all duration-300 relative overflow-hidden
        ${isActive
          ? "bg-purple-500 text-white border-purple-500 shadow-[0_0_20px_#a855f7] drop-shadow-[0_0_8px_#a855f7]"
          : "border-white/10 text-gray-300 hover:border-purple-400 hover:text-white hover:shadow-[0_0_10px_#a855f740]"
        }`}
    >
      {type}
      {isActive && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
      )}
    </button>
  );
};

export default function RecursionFoundation() {
  const [solved, setSolved] = useState([]);
  const [filter, setFilter] = useState("All");

  const handleToggleSolved = (title) => {
    setSolved((prev) =>
      prev.includes(title)
        ? prev.filter((t) => t !== title)
        : [...prev, title]
    );
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const filtered = recursionProblems.filter((p) =>
    filter === "All" ? true : p.difficulty === filter
  );

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-10
      bg-gradient-to-br from-[#0b0c1a] via-[#0f111f] to-[#101118]
      rounded-3xl border border-[#2c2c3a] shadow-[0_0_40px_#a855f722] 
      backdrop-blur">

      {/* Header */}
      <h2 className="text-center text-2xl font-bold text-white mb-6">
        🔄 Recursion Foundation
      </h2>
      
      <p className="text-center text-gray-400 mb-6 text-sm">
        Master the fundamentals of recursion with these essential problems
      </p>

      {/* Filter Buttons with Glow Effect */}
      <div className="flex justify-center gap-4 mb-6">
        {["All", "Easy", "Medium", "Hard"].map((type) => (
          <FilterButton
            key={type}
            type={type}
            isActive={filter === type}
            onClick={() => handleFilterChange(type)}
          />
        ))}
      </div>

      {/* Problem List */}
      <div className="grid grid-cols-1 gap-4">
        {filtered.map((problem, idx) => (
          <RecursionProblemCard
            key={idx}
            problem={problem}
            isSolved={solved.includes(problem.title)}
            onToggleSolved={handleToggleSolved}
          />
        ))}
      </div>

      {/* Stats */}
      <div className="mt-6 text-center text-gray-400 text-sm">
        Solved: {solved.length} / {recursionProblems.length} problems
      </div>
    </div>
  );
} 