import React, { useState } from "react";
import { SiLeetcode } from "react-icons/si";
import { FaCheckCircle } from "react-icons/fa";
import { BiLinkExternal } from "react-icons/bi";
import { MdCode } from "react-icons/md";
import { SiGeeksforgeeks } from "react-icons/si";
import { FaSearch, FaCodeBranch } from "react-icons/fa";
import ArrayIcon from "../ui/ArrayIcon";
import LinkedListIcon from "../ui/LinkedListIcon";

// Array Problems Section (all original LeetCode problems)
const arrayProblems = [
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

// Searching and Sorting Problems Section
const searchingSortingProblems = [
  {
    title: "704. Binary Search",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/binary-search/",
  },
  {
    title: "912. Sort an Array",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/sort-an-array/",
  },
];

// Linked List Problems Section
const linkedListProblems = [
  {
    title: "707. Design Linked List",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/design-linked-list/",
  },
  {
    title: "237. Delete Node in a Linked List",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/delete-node-in-a-linked-list/",
  },
  {
    title: "876. Middle of the Linked List",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/middle-of-the-linked-list/",
  },
  {
    title: "206. Reverse Linked List",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/reverse-linked-list/",
  },
  {
    title: "141. Linked List Cycle",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/linked-list-cycle/",
  },
  {
    title: "234. Palindrome Linked List",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/palindrome-linked-list/",
  },
  {
    title: "160. Intersection of Two Linked Lists",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/intersection-of-two-linked-lists/",
  },
  {
    title: "203. Remove Linked List Elements",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/remove-linked-list-elements/",
  },
  {
    title: "19. Remove Nth Node From End of List",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/",
  },
  {
    title: "83. Remove Duplicates from Sorted List",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/remove-duplicates-from-sorted-list/",
  },
  {
    title: "328. Odd Even Linked List",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/odd-even-linked-list/",
  },
  {
    title: "2. Add Two Numbers",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/add-two-numbers/",
  },
  {
    title: "21. Merge Two Sorted Lists",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/merge-two-sorted-lists/",
  },
  {
    title: "61. Rotate List",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/rotate-list/",
  },
  {
    title: "24. Swap Nodes in Pairs",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/swap-nodes-in-pairs/",
  },
];

// Recursion Problems Section (new section with provided problems)
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

// Individual Problem Card Component for LeetCode Problems
const LeetCodeProblemCard = ({ problem, isSolved, onToggleSolved }) => {
  return (
    <div
      className={`group flex items-center justify-between p-4 rounded-2xl 
        border border-white/10 bg-white/5 backdrop-blur-lg
        hover:bg-gradient-to-br from-white/10 to-cyan-500/10
        hover:border-cyan-400/30 hover:shadow-[0_0_20px_#00f2ff55]
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
        <a
          href={problem.link}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-sm hover:underline hover:text-cyan-300 transition-colors"
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
          className="text-yellow-400 text-xl hover:scale-110 hover:drop-shadow-[0_0_8px_#ffab00] transition-all duration-200"
        >
          <SiLeetcode />
        </a>
      </div>
    </div>
  );
};

// Individual Problem Card Component for Recursion Problems
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

// Section Component with Data Structure Icons
const ProblemSection = ({ title, problems, isRecursion = false, solved, onToggleSolved, isExpanded, onToggleSection, sectionIcon }) => {
  return (
    <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
      <button
        onClick={onToggleSection}
        className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="text-xl">
            {sectionIcon}
          </div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-400">
            {problems.filter(p => solved.includes(p.title)).length} / {problems.length} solved
          </span>
          <div className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
            ▼
          </div>
        </div>
      </button>
      
      {isExpanded && (
        <div className="px-4 pb-4">
          <div className="space-y-3">
            {problems.map((problem, idx) => (
              isRecursion ? (
                <RecursionProblemCard
                  key={idx}
                  problem={problem}
                  isSolved={solved.includes(problem.title)}
                  onToggleSolved={onToggleSolved}
                />
              ) : (
                <LeetCodeProblemCard
                  key={idx}
                  problem={problem}
                  isSolved={solved.includes(problem.title)}
                  onToggleSolved={onToggleSolved}
                />
              )
            ))}
          </div>
        </div>
      )}
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
          ? "bg-cyan-500 text-white border-cyan-500 shadow-[0_0_20px_#00f2ff] drop-shadow-[0_0_8px_#00f2ff]"
          : "border-white/10 text-gray-300 hover:border-cyan-400 hover:text-white hover:shadow-[0_0_10px_#00f2ff40]"
        }`}
    >
      {type}
      {isActive && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
      )}
    </button>
  );
};

export default function LeetcodeProblems() {
  const [solved, setSolved] = useState([]);
  const [filter, setFilter] = useState("All");
  const [expandedSections, setExpandedSections] = useState(new Set(['array', 'recursion', 'linked-list', 'searching-sorting']));

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

  const toggleSection = (sectionId) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  // Combine all problems for filtering
  const allProblems = [
    ...arrayProblems,
    ...recursionProblems,
    ...linkedListProblems,
    ...searchingSortingProblems
  ];

  const filteredProblems = allProblems.filter((p) =>
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

      {/* Problem Sections - Reordered */}
      <div className="space-y-4">
        <ProblemSection
          title="Arrays"
          problems={arrayProblems}
          solved={solved}
          onToggleSolved={handleToggleSolved}
          isExpanded={expandedSections.has('array')}
          onToggleSection={() => toggleSection('array')}
          sectionIcon={<ArrayIcon className="text-yellow-400" />}
        />
        
        <ProblemSection
          title="Recursion Foundation"
          problems={recursionProblems}
          isRecursion={true}
          solved={solved}
          onToggleSolved={handleToggleSolved}
          isExpanded={expandedSections.has('recursion')}
          onToggleSection={() => toggleSection('recursion')}
          sectionIcon={<FaCodeBranch className="text-purple-400" />}
        />
        
        <ProblemSection
          title="Linked Lists"
          problems={linkedListProblems}
          solved={solved}
          onToggleSolved={handleToggleSolved}
          isExpanded={expandedSections.has('linked-list')}
          onToggleSection={() => toggleSection('linked-list')}
          sectionIcon={<LinkedListIcon className="text-orange-400" />}
        />
        
        <ProblemSection
          title="Searching and Sorting"
          problems={searchingSortingProblems}
          solved={solved}
          onToggleSolved={handleToggleSolved}
          isExpanded={expandedSections.has('searching-sorting')}
          onToggleSection={() => toggleSection('searching-sorting')}
          sectionIcon={<FaSearch className="text-cyan-400" />}
        />
      </div>

      {/* Stats */}
      <div className="mt-6 text-center text-gray-400 text-sm">
        Solved: {solved.length} / {allProblems.length} problems
      </div>
    </div>
  );
}
