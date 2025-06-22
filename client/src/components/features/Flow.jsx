import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

const dsaMap = {
  "Arrays": ["Sliding Window", "Two Pointers", "Kadane’s Algorithm", "Binary Search", "Prefix Sum"],
  "Linked Lists": ["Fast & Slow Pointers", "Cycle Detection", "LRU Cache", "Reversal"],
  "Stacks": ["Balanced Parentheses", "Next Greater Element", "Infix to Postfix", "Min Stack"],
  "Queues": ["Sliding Window Maximum", "Rotting Oranges", "Queue Reversal"],
  "Hash Maps": ["Two Sum", "Longest Consecutive Sequence", "Group Anagrams"],
  "Trees": ["DFS", "BFS", "Binary Search Tree Validation", "Tree Traversals", "Lowest Common Ancestor"],
  "Heaps": ["Top-K Elements", "Kth Largest", "Median in Stream"],
  "Graphs": ["BFS", "DFS", "Cycle Detection", "Topological Sort", "Union-Find", "Dijkstra’s", "Bellman-Ford"],
  "Tries": ["Word Search", "Auto Complete", "Prefix Matching"],
  "Dynamic Programming": ["0/1 Knapsack", "Longest Common Subsequence", "Edit Distance", "Fibonacci (Memo & Tab)"],
  "Sorting Algorithms": ["Bubble Sort", "Merge Sort", "Quick Sort", "Counting Sort", "Radix Sort"]
};

export default function DSARoadmap() {
  const [selectedDS, setSelectedDS] = useState(null);

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-12 min-h-[85vh]
      bg-gradient-to-br from-[#0e0f1f] via-[#121422] to-[#0c0c14]
      rounded-3xl border border-[#2f2f3f] shadow-[0_0_40px_#00f2ff22] text-white"
    >
      <h2 className="text-center text-3xl font-bold mb-8">📚 DSA Roadmap</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
        {Object.keys(dsaMap).map((ds) => (
          <button
            key={ds}
            onClick={() => setSelectedDS(ds)}
            className={`p-4 rounded-xl text-sm font-semibold backdrop-blur 
              border border-white/10 hover:border-cyan-400/50 transition-all duration-300
              ${selectedDS === ds ? "bg-cyan-500/10 border-cyan-400/50" : "bg-white/5"}`}
          >
            {ds}
          </button>
        ))}
      </div>

      {selectedDS && (
        <div>
          <h3 className="text-xl font-semibold mb-4 text-center">
            ✨ Algorithms under <span className="text-cyan-400">{selectedDS}</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {dsaMap[selectedDS].map((algo, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur
                hover:bg-cyan-500/10 hover:border-cyan-400/50 transition-all duration-300"
              >
                <FaCheckCircle className="text-green-400" />
                <span className="text-sm">{algo}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {!selectedDS && (
        <div className="text-gray-400 text-center pt-10 italic">
          👆 Select a data structure to explore its algorithms...
        </div>
      )}
    </div>
  );
}
