import React, { useState } from "react";
import { SiLeetcode } from "react-icons/si";
import { FaCheckCircle } from "react-icons/fa";

const problemsList = [
  {
    title: "9. Palindrome Number",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/palindrome-number/description/",
  },
  {
    title: "7. Reverse Integer",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/reverse-integer/description/",
  },
  {
    title: "26. Remove Duplicates from Sorted Array",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/remove-duplicates-from-sorted-array/description/",
  },
  {
    title: "27. Remove Element",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/remove-element/description/",
  },
  {
    title: "344. Reverse String",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/reverse-string/description/",
  },
  {
    title: "121. Best Time to Buy and Sell Stock",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/description/",
  },
  {
    title: "88. Merge Sorted Array",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/merge-sorted-array/description/",
  },
  {
    title: "283. Move Zeroes",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/move-zeroes/description/",
  },
  {
    title: "485. Max Consecutive Ones",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/max-consecutive-ones/description/",
  },
  {
    title: "268. Missing Number",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/missing-number/description/",
  },
  {
    title: "136. Single Number",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/single-number/description/",
  },
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

export default function LeetcodeProblems() {
  const [solved, setSolved] = useState([]);
  const [filter, setFilter] = useState("All");

  const handleToggleSolved = (title) => {
    setSolved((prev) =>
      prev.includes(title)
        ? prev.filter((t) => t !== title)
        : [...prev, title]
    );
  };

  const filtered = problemsList.filter((p) =>
    filter === "All" ? true : p.difficulty === filter
  );

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-10
      bg-gradient-to-br from-[#0b0c1a] via-[#0f111f] to-[#101118]
      rounded-3xl border border-[#2c2c3a] shadow-[0_0_40px_#00f2ff22] 
      backdrop-blur">

      {/* Header */}
      <h2 className="text-center text-2xl font-bold text-white mb-6">
        🔗 Leetcode Practice Tracker
      </h2>

      {/* Filter */}
      <div className="flex justify-center gap-4 mb-6">
        {["All", "Easy", "Medium", "Hard"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border 
              ${filter === type
                ? "bg-cyan-500 text-white border-cyan-500"
                : "border-white/10 text-gray-300 hover:border-cyan-400 hover:text-white"}
              transition-all duration-300`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Problem List */}
      <div className="grid grid-cols-1 gap-4">
        {filtered.map((item, idx) => (
          <div
            key={idx}
            className={`group flex items-center justify-between p-4 rounded-2xl 
              border border-white/10 bg-white/5 backdrop-blur-lg
              hover:bg-gradient-to-br from-white/10 to-cyan-500/10
              hover:border-cyan-400/30 hover:shadow-[0_0_20px_#00f2ff55]
              transition-all duration-300 text-white ${
                solved.includes(item.title) ? "ring-2 ring-green-400" : ""
              }`}
          >
            <div className="flex items-center gap-4">
              <button onClick={() => handleToggleSolved(item.title)}>
                <FaCheckCircle
                  className={`text-xl ${
                    solved.includes(item.title)
                      ? "text-green-400"
                      : "text-gray-500 hover:text-green-400"
                  }`}
                />
              </button>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-sm hover:underline"
              >
                {item.title}
              </a>
            </div>

            <div className="flex items-center gap-3">
              <span
                className={`text-xs px-3 py-1 rounded-xl font-semibold ${getBadgeStyle(
                  item.difficulty
                )}`}
              >
                {item.difficulty}
              </span>
              <a
                href={item.link}
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
    </div>
  );
}
