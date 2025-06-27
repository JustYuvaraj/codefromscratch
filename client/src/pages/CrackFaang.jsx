// import React, { useState, useEffect } from 'react';
// import { BookText, Code, Network, Database, Cpu, HardHat, User, MessageSquare, Briefcase, Clock, ExternalLink, CalendarDays, BarChart4 } from 'lucide-react';

// // Mapping topic types to their respective Lucide icons
// const topicIcons = {
//     'DSA': Code,
//     'Full-Stack': BookText,
//     'Networking': Network,
//     'DBMS': Database,
//     'OS': Cpu,
//     'System Design': HardHat,
//     'Behavioral Prep': User,
//     'Mock Interview': MessageSquare,
//     'Recommendation': Briefcase,
//     'Daily Focus': Clock,
// };

// // --- DATA: LEETCODE PROBLEMS & TOPIC PROGRESSION ---
// // Define these globally to be accessible by generateDailySchedule and App useEffect
// const ALL_LEETCODE_PROBLEMS_DATA = {
//     // Phase 1 - Easy & Medium Focus, Core Data Structures
//     'DSA-1': [ // Big O, Arrays
//         { name: 'Two Sum', link: 'https://leetcode.com/problems/two-sum/', difficulty: 'Easy' },
//         { name: 'Remove Duplicates from Sorted Array', link: 'https://leetcode.com/problems/remove-duplicates-from-sorted-array/', difficulty: 'Easy' },
//         { name: 'Merge Sorted Array', link: 'https://leetcode.com/problems/merge-sorted-array/', difficulty: 'Easy' },
//         { name: 'Contains Duplicate', link: 'https://leetcode.com/problems/contains-duplicate/', difficulty: 'Easy' },
//         { name: 'Plus One', link: 'https://leetcode.com/problems/plus-one/', difficulty: 'Easy' }
//     ],
//     'DSA-2': [ // Strings, Two Pointers
//         { name: 'Valid Anagram', link: 'https://leetcode.com/problems/valid-anagram/', difficulty: 'Easy' },
//         { name: 'Valid Palindrome', link: 'https://leetcode.com/problems/valid-palindrome/', difficulty: 'Easy' },
//         { name: 'Reverse String', link: 'https://leetcode.com/problems/reverse-string/', difficulty: 'Easy' },
//         { name: 'Longest Common Prefix', link: 'https://leetcode.com/problems/longest-common-prefix/', difficulty: 'Easy' },
//         { name: '3Sum', link: 'https://leetcode.com/problems/3sum/', difficulty: 'Medium' }
//     ],
//     'DSA-3': [ // Linked Lists
//         { name: 'Merge Two Sorted Lists', link: 'https://leetcode.com/problems/merge-two-sorted-lists/', difficulty: 'Easy' },
//         { name: 'Reverse Linked List', link: 'https://leetcode.com/problems/reverse-linked-list/', difficulty: 'Easy' },
//         { name: 'Delete Node in a Linked List', link: 'https://leetcode.com/problems/delete-node-in-a-linked-list/', difficulty: 'Easy' },
//         { name: 'Remove Nth Node From End of List', link: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/', difficulty: 'Medium' },
//         { name: 'Middle of the Linked List', link: 'https://leetcode.com/problems/middle-of-the-linked-list/', difficulty: 'Easy' }
//     ],
//     'DSA-4': [ // Stacks, Queues
//         { name: 'Valid Parentheses', link: 'https://leetcode.com/problems/valid-parentheses/', difficulty: 'Easy' },
//         { name: 'Implement Stack using Queues', link: 'https://leetcode.com/problems/implement-stack-using-queues/', difficulty: 'Easy' },
//         { name: 'Implement Queue using Stacks', link: 'https://leetcode.com/problems/implement-queue-using-stacks/', difficulty: 'Easy' },
//         { name: 'Min Stack', link: 'https://leetcode.com/problems/min-stack/', difficulty: 'Medium' },
//         { name: 'Daily Temperatures', link: 'https://leetcode.com/problems/daily-temperatures/', difficulty: 'Medium' }
//     ],
//     'DSA-5': [ // Hash Maps
//         { name: 'Contains Duplicate II', link: 'https://leetcode.com/problems/contains-duplicate-ii/', difficulty: 'Easy' },
//         { name: 'Group Anagrams', link: 'https://leetcode.com/problems/group-anagrams/', difficulty: 'Medium' },
//         { name: 'Two Sum II - Input Array Is Sorted', link: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/', difficulty: 'Easy' },
//         { name: 'Longest Substring Without Repeating Characters', link: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/', difficulty: 'Medium' },
//         { name: 'Subarray Sum Equals K', link: 'https://leetcode.com/problems/subarray-sum-equals-k/', difficulty: 'Medium' }
//     ],
//     'DSA-6': [ // Trees (Basic, BST)
//         { name: 'Invert Binary Tree', link: 'https://leetcode.com/problems/invert-binary-tree/', difficulty: 'Easy' },
//         { name: 'Maximum Depth of Binary Tree', link: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/', difficulty: 'Easy' },
//         { name: 'Validate Binary Search Tree', link: 'https://leetcode.com/problems/validate-binary-search-tree/', difficulty: 'Medium' },
//         { name: 'Symmetric Tree', link: 'https://leetcode.com/problems/symmetric-tree/', difficulty: 'Easy' },
//         { name: 'Lowest Common Ancestor of a Binary Search Tree', link: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/', difficulty: 'Medium' }
//     ],
//     'DSA-7': [ // Graphs (BFS/DFS)
//         { name: 'Number of Islands', link: 'https://leetcode.com/problems/number-of-islands/', difficulty: 'Medium' },
//         { name: 'Clone Graph', link: 'https://leetcode.com/problems/clone-graph/', difficulty: 'Medium' },
//         { name: 'Max Area of Island', link: 'https://leetcode.com/problems/max-area-of-island/', difficulty: 'Medium' },
//         { name: 'Walls and Gates', link: 'https://leetcode.com/problems/walls-and-gates/', difficulty: 'Medium' },
//         { name: 'Course Schedule', link: 'https://leetcode.com/problems/course-schedule/', difficulty: 'Medium' }
//     ],
//     'DSA-8': [ // Graphs (More BFS/DFS, Cycle Detection)
//         { name: 'Pacific Atlantic Water Flow', link: 'https://leetcode.com/problems/pacific-atlantic-water-flow/', difficulty: 'Medium' },
//         { name: 'Surrounded Regions', link: 'https://leetcode.com/problems/surrounded-regions/', difficulty: 'Medium' },
//         { name: 'Graph Valid Tree', link: 'https://leetcode.com/problems/graph-valid-tree/', difficulty: 'Medium' },
//         { name: 'Redundant Connection', link: 'https://leetcode.com/problems/redundant-connection/', difficulty: 'Medium' },
//         { name: 'Find the Town Judge', link: 'https://leetcode.com/problems/find-the-town-judge/', difficulty: 'Easy' }
//     ],
//     'DSA-9': [ // DP Intro (1D)
//         { name: 'Fibonacci Number', link: 'https://leetcode.com/problems/fibonacci-number/', difficulty: 'Easy' },
//         { name: 'Climbing Stairs', link: 'https://leetcode.com/problems/climbing-stairs/', difficulty: 'Easy' },
//         { name: 'House Robber', link: 'https://leetcode.com/problems/house-robber/', difficulty: 'Medium' },
//         { name: 'Min Cost Climbing Stairs', link: 'https://leetcode.com/problems/min-cost-climbing-stairs/', difficulty: 'Easy' },
//         { name: 'N-th Tribonacci Number', link: 'https://leetcode.com/problems/n-th-tribonacci-number/', difficulty: 'Easy' }
//     ],
//     'DSA-10': [ // DP (Grid, Paths)
//         { name: 'Unique Paths', link: 'https://leetcode.com/problems/unique-paths/', difficulty: 'Medium' },
//         { name: 'Unique Paths II', link: 'https://leetcode.com/problems/unique-paths-ii/', difficulty: 'Medium' },
//         { name: 'Minimum Path Sum', link: 'https://leetcode.com/problems/minimum-path-sum/', difficulty: 'Medium' },
//         { name: 'Longest Palindromic Substring', link: 'https://leetcode.com/problems/longest-palindromic-substring/', difficulty: 'Medium' },
//         { name: 'Coin Change', link: 'https://leetcode.com/problems/coin-change/', difficulty: 'Medium' }
//     ],
//     'DSA-11': [ // More DP (Subsequences, String DP)
//         { name: 'Longest Common Subsequence', link: 'https://leetcode.com/problems/longest-common-subsequence/', difficulty: 'Medium' },
//         { name: 'Edit Distance', link: 'https://leetcode.com/problems/edit-distance/', difficulty: 'Hard' },
//         { name: 'Word Break', link: 'https://leetcode.com/problems/word-break/', difficulty: 'Medium' },
//         { name: 'Decode Ways', link: 'https://leetcode.com/problems/decode-ways/', difficulty: 'Medium' },
//         { name: 'Partition Equal Subset Sum', link: 'https://leetcode.com/problems/partition-equal-subset-sum/', difficulty: 'Medium' }
//     ],
//     'DSA-12': [ // DP (Knapsack & Variations)
//         { name: 'Target Sum', link: 'https://leetcode.com/problems/target-sum/', difficulty: 'Medium' },
//         { name: 'Coin Change II', link: 'https://leetcode.com/problems/coin-change-ii/', difficulty: 'Medium' },
//         { name: 'Combination Sum IV', link: 'https://leetcode.com/problems/combination-sum-iv/', difficulty: 'Medium' },
//         { name: '0/1 Knapsack Problem', link: 'https://www.geeksforgeeks.org/0-1-knapsack-problem-dp-10/', difficulty: 'Medium' }, // GFG link for conceptual classic
//         { name: 'Unbounded Knapsack (Coin Change I variation)', link: 'https://www.geeksforgeeks.org/unbounded-knapsack-repetition-items-allowed/', difficulty: 'Medium' } // GFG link for conceptual classic
//     ],
//     'DSA-13': [ // Advanced Graphs (Dijkstra, Union-Find)
//         { name: 'Cheapest Flights Within K Stops', link: 'https://leetcode.com/problems/cheapest-flights-within-k-stops/', difficulty: 'Medium' },
//         { name: 'Network Delay Time', link: 'https://leetcode.com/problems/network-delay-time/', difficulty: 'Medium' },
//         { name: 'Number of Provinces', link: 'https://leetcode.com/problems/number-of-provinces/', difficulty: 'Medium' },
//         { name: 'Redundant Connection II', link: 'https://leetcode.com/problems/redundant-connection-ii/', difficulty: 'Hard' },
//         { name: 'Is Graph Bipartite?', link: 'https://leetcode.com/problems/is-graph-bipartite/', difficulty: 'Medium' }
//     ],
//     'DSA-14': [ // Minimum Spanning Trees (Conceptual, Topological Sort)
//         { name: 'Kruskal\'s Minimum Spanning Tree Algorithm', link: 'https://www.geeksforgeeks.org/kruskals-minimum-spanning-tree-algorithm-greedy-algo-2/', difficulty: 'Medium' }, // GFG for conceptual
//         { name: 'Prim\'s Algorithm for MST', link: 'https://www.geeksforgeeks.org/prims-algorithm-for-minimum-spanning-tree-mst/', difficulty: 'Medium' }, // GFG for conceptual
//         { name: 'Course Schedule II', link: 'https://leetcode.com/problems/course-schedule-ii/', difficulty: 'Medium' },
//         { name: 'Longest Increasing Path in a Matrix', link: 'https://leetcode.com/problems/longest-increasing-path-in-a-matrix/', difficulty: 'Hard' },
//         { name: 'Alien Dictionary', link: 'https://leetcode.com/problems/alien-dictionary/', difficulty: 'Hard' } // Premium/Conceptual
//     ],
//     'DSA-15': [ // Bit Manipulation
//         { name: 'Single Number', link: 'https://leetcode.com/problems/single-number/', difficulty: 'Easy' },
//         { name: 'Number of 1 Bits', link: 'https://leetcode.com/problems/number-of-1-bits/', difficulty: 'Easy' },
//         { name: 'Counting Bits', link: 'https://leetcode.com/problems/counting-bits/', difficulty: 'Easy' },
//         { name: 'Missing Number', link: 'https://leetcode.com/problems/missing-number/', difficulty: 'Easy' },
//         { name: 'Sum of Two Integers', link: 'https://leetcode.com/problems/sum-of-two-integers/', difficulty: 'Medium' }
//     ],
//     'DSA-16': [ // Greedy Algorithms
//         { name: 'Maximum Subarray', link: 'https://leetcode.com/problems/maximum-subarray/', difficulty: 'Medium' },
//         { name: 'Jump Game', link: 'https://leetcode.com/problems/jump-game/', difficulty: 'Medium' },
//         { name: 'Jump Game II', link: 'https://leetcode.com/problems/jump-game-ii/', difficulty: 'Hard' },
//         { name: 'Gas Station', link: 'https://leetcode.com/problems/gas-station/', difficulty: 'Medium' },
//         { name: 'Hand of Straights', link: 'https://leetcode.com/problems/hand-of-straights/', difficulty: 'Medium' }
//     ],
//     // Phase 3 - Hard LeetCode, System Design Mastery, Mock Interviews
//     'DSA-17': [ // Hard DP, Backtracking
//         { name: 'Longest Valid Parentheses', link: 'https://leetcode.com/problems/longest-valid-parentheses/', difficulty: 'Hard' },
//         { name: 'Edit Distance', link: 'https://leetcode.com/problems/edit-distance/', difficulty: 'Hard' },
//         { name: 'N-Queens', link: 'https://leetcode.com/problems/n-queens/', difficulty: 'Hard' },
//         { name: 'Sudoku Solver', link: 'https://leetcode.com/problems/sudoku-solver/', difficulty: 'Hard' },
//         { name: 'Word Search II', link: 'https://leetcode.com/problems/word-search-ii/', difficulty: 'Hard' }
//     ],
//     'DSA-18': [ // Hard Data Structures, Design Problems
//         { name: 'Find Median from Data Stream', link: 'https://leetcode.com/problems/find-median-from-data-stream/', difficulty: 'Hard' },
//         { name: 'Design Twitter', link: 'https://leetcode.com/problems/design-twitter/', difficulty: 'Medium' },
//         { name: 'LRU Cache', link: 'https://leetcode.com/problems/lru-cache/', difficulty: 'Medium' },
//         { name: 'LFU Cache', link: 'https://leetcode.com/problems/lfu-cache/', difficulty: 'Hard' },
//         { name: 'Serialize and Deserialize Binary Tree', link: 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/', difficulty: 'Hard' }
//     ],
//     'DSA-19': [ // Advanced Graphs (Flow, Connectivity)
//         { name: 'Trapping Rain Water', link: 'https://leetcode.com/problems/trapping-rain-water/', difficulty: 'Hard' },
//         { name: 'Sliding Window Maximum', link: 'https://leetcode.com/problems/sliding-window-maximum/', difficulty: 'Hard' },
//         { name: 'Word Ladder II', link: 'https://leetcode.com/problems/word-ladder-ii/', difficulty: 'Hard' },
//         { name: 'Longest Consecutive Sequence', link: 'https://leetcode.com/problems/longest-consecutive-sequence/', difficulty: 'Medium' },
//         { name: 'Find the City With the Smallest Number of Neighbors at a Threshold Distance', link: 'https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/', difficulty: 'Medium' }
//     ],
//     'DSA-20': [ // More Hard DP, String Matching
//         { name: 'Longest Increasing Path in a Matrix', link: 'https://leetcode.com/problems/longest-increasing-path-in-a-matrix/', difficulty: 'Hard' },
//         { name: 'Text Justification', link: 'https://leetcode.com/problems/text-justification/', difficulty: 'Hard' },
//         { name: 'Regular Expression Matching', link: 'https://leetcode.com/problems/regular-expression-matching/', difficulty: 'Hard' },
//         { name: 'Wildcard Matching', link: 'https://leetcode.com/problems/wildcard-matching/', difficulty: 'Hard' },
//         { name: 'Maximal Rectangle', link: 'https://leetcode.com/problems/maximal-rectangle/', difficulty: 'Hard' }
//     ],
//     'DSA-21': [ // Review of Weak Areas + Random Hard
//         { name: 'Kth Smallest Element in a BST', link: 'https://leetcode.com/problems/kth-smallest-element-in-a-bst/', difficulty: 'Medium' },
//         { name: 'Merge K Sorted Lists', link: 'https://leetcode.com/problems/merge-k-sorted-lists/', difficulty: 'Hard' },
//         { name: 'Longest Consecutive Sequence', link: 'https://leetcode.com/problems/longest-consecutive-sequence/', difficulty: 'Medium' },
//         { name: 'Find K Closest Elements', link: 'https://leetcode.com/problems/find-k-closest-elements/', difficulty: 'Medium' },
//         { name: 'Meeting Rooms II', link: 'https://leetcode.com/problems/meeting-rooms-ii/', difficulty: 'Medium' } // Premium/Conceptual
//     ],
//     'DSA-22': [ // Mock Contest Practice + Review
//         { name: 'Random Medium (from a study plan)', link: 'https://leetcode.com/problemset/all/?difficulty=MEDIUM', difficulty: 'Medium' },
//         { name: 'Random Medium (from a study plan)', link: 'https://leetcode.com/problemset/all/?difficulty=MEDIUM', difficulty: 'Medium' },
//         { name: 'Random Hard (from a study plan)', link: 'https://leetcode.com/problemset/all/?difficulty=HARD', difficulty: 'Hard' },
//         { name: 'Random Hard (from a study plan)', link: 'https://leetcode.com/problemset/all/?difficulty=HARD', difficulty: 'Hard' },
//         { name: 'Random Medium/Hard (from a study plan)', link: 'https://leetcode.com/problemset/all/?difficulty=MEDIUM', difficulty: 'Medium' }
//     ],
//     'DSA-23': [ // Final Review, Targeted Practice
//         { name: 'Random Hard (Targeted Weakness)', link: 'https://leetcode.com/problemset/all/?difficulty=HARD', difficulty: 'Hard' },
//         { name: 'Random Hard (Targeted Weakness)', link: 'https://leetcode.com/problemset/all/?difficulty=HARD', difficulty: 'Hard' },
//         { name: 'Random Medium (Targeted Weakness)', link: 'https://leetcode.com/problemset/all/?difficulty=MEDIUM', difficulty: 'Medium' },
//         { name: 'Random Medium (Targeted Weakness)', link: 'https://leetcode.com/problemset/all/?difficulty=MEDIUM', difficulty: 'Medium' },
//         { name: 'Random Easy (Quick Recall)', link: 'https://leetcode.com/problemset/all/?difficulty=EASY', difficulty: 'Easy' }
//     ],
//     // Add more DSA entries as needed to fill ~90 DSA days in total over 182 days
//     // Each entry represents 5 problems. 90 DSA days * 5 problems/day = 450 problems.
//     // Need to significantly expand this to reach 900+ problems. This is a very rough sketch.
//     // Example for continuing the pattern:
//     'DSA-24': [
//         { name: 'Implement Trie (Prefix Tree)', link: 'https://leetcode.com/problems/implement-trie-prefix-tree/', difficulty: 'Medium' },
//         { name: 'Add and Search Word - Data structure design', link: 'https://leetcode.com/problems/add-and-search-word-data-structure-design/', difficulty: 'Medium' },
//         { name: 'Design Add and Search Words Data Structure', link: 'https://leetcode.com/problems/design-add-and-search-words-data-structure/', difficulty: 'Medium' },
//         { name: 'Maximum XOR of Two Numbers in an Array', link: 'https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/', difficulty: 'Medium' },
//         { name: 'Shortest Palindrome', link: 'https://leetcode.com/problems/shortest-palindrome/', difficulty: 'Hard' }
//     ],
//     'DSA-25': [
//         { name: 'Design HashMap', link: 'https://leetcode.com/problems/design-hashmap/', difficulty: 'Easy' },
//         { name: 'Design HashSet', link: 'https://leetcode.com/problems/design-hashset/', difficulty: 'Easy' },
//         { name: 'Min Stack', link: 'https://leetcode.com/problems/min-stack/', difficulty: 'Medium' },
//         { name: 'Flatten Binary Tree to Linked List', link: 'https://leetcode.com/problems/flatten-binary-tree-to-linked-list/', difficulty: 'Medium' },
//         { name: 'Binary Tree Maximum Path Sum', link: 'https://leetcode.com/problems/binary-tree-maximum-path-sum/', difficulty: 'Hard' }
//     ],
//     'DSA-26': [
//         { name: 'Minimum Window Substring', link: 'https://leetcode.com/problems/minimum-window-substring/', difficulty: 'Hard' },
//         { name: 'Longest Substring with At Most K Distinct Characters', link: 'https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters/', difficulty: 'Medium' },
//         { name: 'Sliding Window Median', link: 'https://leetcode.com/problems/sliding-window-median/', difficulty: 'Hard' },
//         { name: 'Substring with Concatenation of All Words', link: 'https://leetcode.com/problems/substring-with-concatenation-of-all-words/', difficulty: 'Hard' },
//         { name: 'Find All Anagrams in a String', link: 'https://leetcode.com/problems/find-all-anagrams-in-a-string/', difficulty: 'Medium' }
//     ],
//     'DSA-27': [
//         { name: 'Kth Largest Element in an Array', link: 'https://leetcode.com/problems/kth-largest-element-in-an-array/', difficulty: 'Medium' },
//         { name: 'Top K Frequent Elements', link: 'https://leetcode.com/problems/top-k-frequent-elements/', difficulty: 'Medium' },
//         { name: 'Find K Closest Elements', link: 'https://leetcode.com/problems/find-k-closest-elements/', difficulty: 'Medium' },
//         { name: 'Kth Smallest Element in a Sorted Matrix', link: 'https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/', difficulty: 'Medium' },
//         { name: 'Merge K Sorted Lists', link: 'https://leetcode.com/problems/merge-k-sorted-lists/', difficulty: 'Hard' }
//     ],
//     'DSA-28': [
//         { name: 'Reconstruct Itinerary', link: 'https://leetcode.com/problems/reconstruct-itinerary/', difficulty: 'Hard' },
//         { name: 'Word Break II', link: 'https://leetcode.com/problems/word-break-ii/', difficulty: 'Hard' },
//         { name: 'N-Queens II', link: 'https://leetcode.com/problems/n-queens-ii/', difficulty: 'Hard' },
//         { name: 'Permutations II', link: 'https://leetcode.com/problems/permutations-ii/', difficulty: 'Medium' },
//         { name: 'Combinations', link: 'https://leetcode.com/problems/combinations/', difficulty: 'Medium' }
//     ],
//     'DSA-29': [
//         { name: 'Longest Increasing Subsequence', link: 'https://leetcode.com/problems/longest-increasing-subsequence/', difficulty: 'Medium' },
//         { name: 'Maximum Product Subarray', link: 'https://leetcode.com/problems/maximum-product-subarray/', difficulty: 'Medium' },
//         { name: 'Longest Palindromic Subsequence', link: 'https://leetcode.com/problems/longest-palindromic-subsequence/', difficulty: 'Medium' },
//         { name: 'Best Time to Buy and Sell Stock III', link: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/', difficulty: 'Hard' },
//         { name: 'Super Egg Drop', link: 'https://leetcode.com/problems/super-egg-drop/', difficulty: 'Hard' }
//     ],
//     'DSA-30': [
//         { name: 'Unique Binary Search Trees II', link: 'https://leetcode.com/problems/unique-binary-search-trees-ii/', difficulty: 'Medium' },
//         { name: 'Sum Root to Leaf Numbers', link: 'https://leetcode.com/problems/sum-root-to-leaf-numbers/', difficulty: 'Medium' },
//         { name: 'Convert Sorted List to Binary Search Tree', link: 'https://leetcode.com/problems/convert-sorted-list-to-binary-search-tree/', difficulty: 'Medium' },
//         { name: 'Populating Next Right Pointers in Each Node', link: 'https://leetcode.com/problems/populating-next-right-pointers-in-each-node/', difficulty: 'Medium' },
//         { name: 'Lowest Common Ancestor of a Binary Tree', link: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/', difficulty: 'Medium' }
//     ],
//     'DSA-31': [
//         { name: 'Serialize and Deserialize N-ary Tree', link: 'https://leetcode.com/problems/serialize-and-deserialize-n-ary-tree/', difficulty: 'Hard' },
//         { name: 'Smallest Subtree with all the Deepest Nodes', link: 'https://leetcode.com/problems/smallest-subtree-with-all-the-deepest-nodes/', difficulty: 'Medium' },
//         { name: 'Binary Tree Right Side View', link: 'https://leetcode.com/problems/binary-tree-right-side-view/', difficulty: 'Medium' },
//         { name: 'All Nodes Distance K in Binary Tree', link: 'https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/', difficulty: 'Medium' },
//         { name: 'Find Duplicate Subtrees', link: 'https://leetcode.com/problems/find-duplicate-subtrees/', difficulty: 'Medium' }
//     ],
//     'DSA-32': [
//         { name: 'Count Complete Tree Nodes', link: 'https://leetcode.com/problems/count-complete-tree-nodes/', difficulty: 'Medium' },
//         { name: 'Kth Smallest Element in a BST', link: 'https://leetcode.com/problems/kth-smallest-element-in-a-bst/', difficulty: 'Medium' },
//         { name: 'Validate Binary Tree Nodes', link: 'https://leetcode.com/problems/validate-binary-tree-nodes/', difficulty: 'Medium' },
//         { name: 'Maximum Product of Splitted Binary Tree', link: 'https://leetcode.com/problems/maximum-product-of-splitted-binary-tree/', difficulty: 'Medium' },
//         { name: 'Balance a Binary Search Tree', link: 'https://leetcode.com/problems/balance-a-binary-search-tree/', difficulty: 'Medium' }
//     ],
//     'DSA-33': [
//         { name: 'Graph Valid Tree', link: 'https://leetcode.com/problems/graph-valid-tree/', difficulty: 'Medium' },
//         { name: 'Number of Connected Components in an Undirected Graph', link: 'https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/', difficulty: 'Medium' },
//         { name: 'Course Schedule III', link: 'https://leetcode.com/problems/course-schedule-iii/', difficulty: 'Hard' },
//         { name: 'Find the City With the Smallest Number of Neighbors at a Threshold Distance', link: 'https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/', difficulty: 'Medium' },
//         { name: 'Min Cost to Connect All Points', link: 'https://leetcode.com/problems/min-cost-to-connect-all-points/', difficulty: 'Medium' }
//     ],
//     'DSA-34': [
//         { name: 'Path With Minimum Effort', link: 'https://leetcode.com/problems/path-with-minimum-effort/', difficulty: 'Medium' },
//         { name: 'Find Critical and Pseudo-Critical Edges in Minimum Spanning Tree', link: 'https://leetcode.com/problems/find-critical-and-pseudo-critical-edges-in-minimum-spanning-tree/', difficulty: 'Hard' },
//         { name: 'Cut Off Trees for Golf Event', link: 'https://leetcode.com/problems/cut-off-trees-for-golf-event/', difficulty: 'Hard' },
//         { name: 'Reachable Nodes In Subdivided Graph', link: 'https://leetcode.com/problems/reachable-nodes-in-subdivided-graph/', difficulty: 'Hard' },
//         { name: 'Cheapest Flights Within K Stops', link: 'https://leetcode.com/problems/cheapest-flights-within-k-stops/', difficulty: 'Medium' }
//     ],
//     'DSA-35': [
//         { name: 'Swim in Rising Water', link: 'https://leetcode.com/problems/swim-in-rising-water/', difficulty: 'Hard' },
//         { name: 'Bus Routes', link: 'https://leetcode.com/problems/bus-routes/', difficulty: 'Hard' },
//         { name: 'Minimum Score of a Path Between Two Cities', link: 'https://leetcode.com/problems/minimum-score-of-a-path-between-two-cities/', difficulty: 'Medium' },
//         { name: 'As Far from Land as Possible', link: 'https://leetcode.com/problems/as-far-from-land-as-possible/', difficulty: 'Medium' },
//         { name: 'Number of Closed Islands', link: 'https://leetcode.com/problems/number-of-closed-islands/', difficulty: 'Medium' }
//     ],
//     'DSA-36': [
//         { name: 'Word Search', link: 'https://leetcode.com/problems/word-search/', difficulty: 'Medium' },
//         { name: 'Generate Parentheses', link: 'https://leetcode.com/problems/generate-parentheses/', difficulty: 'Medium' },
//         { name: 'Combination Sum', link: 'https://leetcode.com/problems/combination-sum/', difficulty: 'Medium' },
//         { name: 'Permutations', link: 'https://leetcode.com/problems/permutations/', difficulty: 'Medium' },
//         { name: 'Subsets', link: 'https://leetcode.com/problems/subsets/', difficulty: 'Medium' }
//     ],
//     'DSA-37': [
//         { name: 'Letter Combinations of a Phone Number', link: 'https://leetcode.com/problems/letter-combinations-of-a-phone-number/', difficulty: 'Medium' },
//         { name: 'Palindrome Partitioning', link: 'https://leetcode.com/problems/palindrome-partitioning/', difficulty: 'Medium' },
//         { name: 'N-Queens II', link: 'https://leetcode.com/problems/n-queens-ii/', difficulty: 'Hard' },
//         { name: 'Count Vowels Permutation', link: 'https://leetcode.com/problems/count-vowels-permutation/', difficulty: 'Hard' },
//         { name: 'Number of Permutations with K Inverse Pairs', link: 'https://leetcode.com/problems/number-of-permutations-with-k-inverse-pairs/', difficulty: 'Hard' }
//     ],
//     // ... continue adding DSA entries up to DSA-90 for ~450 problems over 90 DSA days
//     // To reach 900+ problems, some days will need to have >5 or DSA will be more frequent.
//     // Given 182 total days, ~90-91 DSA days is feasible (alternate with non-DSA days).
//     // This requires DSA-45. Example of extending the progression for the remaining DSA days.
//     'DSA-38': [
//         { name: 'Find All Duplicates in an Array', link: 'https://leetcode.com/problems/find-all-duplicates-in-an-array/', difficulty: 'Medium' },
//         { name: 'Kth Missing Positive Number', link: 'https://leetcode.com/problems/kth-missing-positive-number/', difficulty: 'Easy' },
//         { name: 'Max Consecutive Ones III', link: 'https://leetcode.com/problems/max-consecutive-ones-iii/', difficulty: 'Medium' },
//         { name: 'Sort Colors', link: 'https://leetcode.com/problems/sort-colors/', difficulty: 'Medium' },
//         { name: 'Set Matrix Zeroes', link: 'https://leetcode.com/problems/set-matrix-zeroes/', difficulty: 'Medium' }
//     ],
//     'DSA-39': [
//         { name: 'Spiral Matrix', link: 'https://leetcode.com/problems/spiral-matrix/', difficulty: 'Medium' },
//         { name: 'Rotate Image', link: 'https://leetcode.com/problems/rotate-image/', difficulty: 'Medium' },
//         { name: 'Word Search', link: 'https://leetcode.com/problems/word-search/', difficulty: 'Medium' },
//         { name: 'Sudoku Solver', link: 'https://leetcode.com/problems/sudoku-solver/', difficulty: 'Hard' },
//         { name: 'N-Queens', link: 'https://leetcode.com/problems/n-queens/', difficulty: 'Hard' }
//     ],
//     'DSA-40': [
//         { name: 'Container With Most Water', link: 'https://leetcode.com/problems/container-with-most-water/', difficulty: 'Medium' },
//         { name: 'Trapping Rain Water', link: 'https://leetcode.com/problems/trapping-rain-water/', difficulty: 'Hard' },
//         { name: 'Product of Array Except Self', link: 'https://leetcode.com/problems/product-of-array-except-self/', difficulty: 'Medium' },
//         { name: 'Longest Consecutive Sequence', link: 'https://leetcode.com/problems/longest-consecutive-sequence/', difficulty: 'Medium' },
//         { name: 'Sliding Window Maximum', link: 'https://leetcode.com/problems/sliding-window-maximum/', difficulty: 'Hard' }
//     ],
//     'DSA-41': [
//         { name: 'Find Minimum in Rotated Sorted Array', link: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/', difficulty: 'Medium' },
//         { name: 'Search in Rotated Sorted Array', link: 'https://leetcode.com/problems/search-in-rotated-sorted-array/', difficulty: 'Medium' },
//         { name: 'Median of Two Sorted Arrays', link: 'https://leetcode.com/problems/median-of-two-sorted-arrays/', difficulty: 'Hard' },
//         { name: 'Find First and Last Position of Element in Sorted Array', link: 'https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/', difficulty: 'Medium' },
//         { name: 'Count Negative Numbers in a Sorted Matrix', link: 'https://leetcode.com/problems/count-negative-numbers-in-a-sorted-matrix/', difficulty: 'Easy' }
//     ],
//     'DSA-42': [
//         { name: 'Reverse Linked List II', link: 'https://leetcode.com/problems/reverse-linked-list-ii/', difficulty: 'Medium' },
//         { name: 'Reorder List', link: 'https://leetcode.com/problems/reorder-list/', difficulty: 'Medium' },
//         { name: 'Copy List with Random Pointer', link: 'https://leetcode.com/problems/copy-list-with-random-pointer/', difficulty: 'Medium' },
//         { name: 'Linked List Cycle II', link: 'https://leetcode.com/problems/linked-list-cycle-ii/', difficulty: 'Medium' },
//         { name: 'Merge K Sorted Lists', link: 'https://leetcode.com/problems/merge-k-sorted-lists/', difficulty: 'Hard' }
//     ],
//     'DSA-43': [
//         { name: 'Design Linked List', link: 'https://leetcode.com/problems/design-linked-list/', difficulty: 'Easy' },
//         { name: 'Remove Linked List Elements', link: 'https://leetcode.com/problems/remove-linked-list-elements/', difficulty: 'Easy' },
//         { name: 'Odd Even Linked List', link: 'https://leetcode.com/problems/odd-even-linked-list/', difficulty: 'Medium' },
//         { name: 'Palindrome Linked List', link: 'https://leetcode.com/problems/palindrome-linked-list/', difficulty: 'Easy' },
//         { name: 'Intersection of Two Linked Lists', link: 'https://leetcode.com/problems/intersection-of-two-linked-lists/', difficulty: 'Easy' }
//     ],
//     'DSA-44': [
//         { name: 'Basic Calculator II', link: 'https://leetcode.com/problems/basic-calculator-ii/', difficulty: 'Medium' },
//         { name: 'Evaluate Reverse Polish Notation', link: 'https://leetcode.com/problems/evaluate-reverse-polish-notation/', difficulty: 'Medium' },
//         { name: 'Largest Rectangle in Histogram', link: 'https://leetcode.com/problems/largest-rectangle-in-histogram/', difficulty: 'Hard' },
//         { name: 'Trapping Rain Water II', link: 'https://leetcode.com/problems/trapping-rain-water-ii/', difficulty: 'Hard' },
//         { name: 'Longest Valid Parentheses', link: 'https://leetcode.com/problems/longest-valid-parentheses/', difficulty: 'Hard' }
//     ],
//     'DSA-45': [
//         { name: 'Binary Tree Zigzag Level Order Traversal', link: 'https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/', difficulty: 'Medium' },
//         { name: 'Binary Tree Level Order Traversal', link: 'https://leetcode.com/problems/binary-tree-level-order-traversal/', difficulty: 'Medium' },
//         { name: 'Binary Tree Right Side View', link: 'https://leetcode.com/problems/binary-tree-right-side-view/', difficulty: 'Medium' },
//         { name: 'Populating Next Right Pointers in Each Node', link: 'https://leetcode.com/problems/populating-next-right-pointers-in-each-node/', difficulty: 'Medium' },
//         { name: 'Construct Binary Tree from Preorder and Inorder Traversal', link: 'https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/', difficulty: 'Medium' }
//     ],
//     'DSA-46': [
//         { name: 'Convert Sorted Array to Binary Search Tree', link: 'https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/', difficulty: 'Easy' },
//         { name: 'Convert Sorted List to Binary Search Tree', link: 'https://leetcode.com/problems/convert-sorted-list-to-binary-search-tree/', difficulty: 'Medium' },
//         { name: 'Flatten Binary Tree to Linked List', link: 'https://leetcode.com/problems/flatten-binary-tree-to-linked-list/', difficulty: 'Medium' },
//         { name: 'Sum Root to Leaf Numbers', link: 'https://leetcode.com/problems/sum-root-to-leaf-numbers/', difficulty: 'Medium' },
//         { name: 'Path Sum III', link: 'https://leetcode.com/problems/path-sum-iii/', difficulty: 'Medium' }
//     ],
//     'DSA-47': [
//         { name: 'Minimum Height Trees', link: 'https://leetcode.com/problems/minimum-height-trees/', difficulty: 'Medium' },
//         { name: 'All Nodes Distance K in Binary Tree', link: 'https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/', difficulty: 'Medium' },
//         { name: 'Find Duplicate Subtrees', link: 'https://leetcode.com/problems/find-duplicate-subtrees/', difficulty: 'Medium' },
//         { name: 'Binary Tree Cameras', link: 'https://leetcode.com/problems/binary-tree-cameras/', difficulty: 'Hard' },
//         { name: 'Binary Tree Maximum Path Sum', link: 'https://leetcode.com/problems/binary-tree-maximum-path-sum/', difficulty: 'Hard' }
//     ],
//     'DSA-48': [
//         { name: 'Kth Smallest Element in a BST', link: 'https://leetcode.com/problems/kth-smallest-element-in-a-bst/', difficulty: 'Medium' },
//         { name: 'Validate Binary Tree Nodes', link: 'https://leetcode.com/problems/validate-binary-tree-nodes/', difficulty: 'Medium' },
//         { name: 'Count Complete Tree Nodes', link: 'https://leetcode.com/problems/count-complete-tree-nodes/', difficulty: 'Medium' },
//         { name: 'Balance a Binary Search Tree', link: 'https://leetcode.com/problems/balance-a-binary-search-tree/', difficulty: 'Medium' },
//         { name: 'Delete Node in a BST', link: 'https://leetcode.com/problems/delete-node-in-a-bst/', difficulty: 'Medium' }
//     ],
//     'DSA-49': [
//         { name: 'Pacific Atlantic Water Flow', link: 'https://leetcode.com/problems/pacific-atlantic-water-flow/', difficulty: 'Medium' },
//         { name: 'Surrounded Regions', link: 'https://leetcode.com/problems/surrounded-regions/', difficulty: 'Medium' },
//         { name: 'Reconstruct Itinerary', link: 'https://leetcode.com/problems/reconstruct-itinerary/', difficulty: 'Hard' },
//         { name: 'Word Ladder', link: 'https://leetcode.com/problems/word-ladder/', difficulty: 'Hard' },
//         { name: 'Cheapest Flights Within K Stops', link: 'https://leetcode.com/problems/cheapest-flights-within-k-stops/', difficulty: 'Medium' }
//     ],
//     'DSA-50': [
//         { name: 'Network Delay Time', link: 'https://leetcode.com/problems/network-delay-time/', difficulty: 'Medium' },
//         { name: 'Path With Minimum Effort', link: 'https://leetcode.com/problems/path-with-minimum-effort/', difficulty: 'Medium' },
//         { name: 'Swim in Rising Water', link: 'https://leetcode.com/problems/swim-in-rising-water/', difficulty: 'Hard' },
//         { name: 'Bus Routes', link: 'https://leetcode.com/problems/bus-routes/', difficulty: 'Hard' },
//         { name: 'Minimum Score of a Path Between Two Cities', link: 'https://leetcode.com/problems/minimum-score-of-a-path-between-two-cities/', difficulty: 'Medium' }
//     ],
//     'DSA-51': [
//         { name: 'All Paths From Source to Target', link: 'https://leetcode.com/problems/all-paths-from-source-to-target/', difficulty: 'Medium' },
//         { name: 'Possible Bipartition', link: 'https://leetcode.com/problems/possible-bipartition/', difficulty: 'Medium' },
//         { name: 'Find the Celebrity', link: 'https://leetcode.com/problems/find-the-celebrity/', difficulty: 'Medium' },
//         { name: 'Parallel Courses', link: 'https://leetcode.com/problems/parallel-courses/', difficulty: 'Medium' },
//         { name: 'Longest Cycle in a Graph', link: 'https://leetcode.com/problems/longest-cycle-in-a-graph/', difficulty: 'Medium' }
//     ],
//     'DSA-52': [
//         { name: 'Shortest Path in Binary Matrix', link: 'https://leetcode.com/problems/shortest-path-in-binary-matrix/', difficulty: 'Medium' },
//         { name: 'Minimum Jumps to Reach Home', link: 'https://leetcode.com/problems/minimum-jumps-to-reach-home/', difficulty: 'Hard' },
//         { name: 'Reachable Nodes In Subdivided Graph', link: 'https://leetcode.com/problems/reachable-nodes-in-subdivided-graph/', difficulty: 'Hard' },
//         { name: 'As Far from Land as Possible', link: 'https://leetcode.com/problems/as-far-from-land-as-possible/', difficulty: 'Medium' },
//         { name: 'Number of Closed Islands', link: 'https://leetcode.com/problems/number-of-closed-islands/', difficulty: 'Medium' }
//     ],
//     'DSA-53': [
//         { name: 'Random Pick with Blacklist', link: 'https://leetcode.com/problems/random-pick-with-blacklist/', difficulty: 'Hard' },
//         { name: 'Insert Delete GetRandom O(1)', link: 'https://leetcode.com/problems/insert-delete-getrandom-o1/', difficulty: 'Medium' },
//         { name: 'Design Linked List', link: 'https://leetcode.com/problems/design-linked-list/', difficulty: 'Easy' },
//         { name: 'Design HashMap', link: 'https://leetcode.com/problems/design-hashmap/', difficulty: 'Easy' },
//         { name: 'Design HashSet', link: 'https://leetcode.com/problems/design-hashset/', difficulty: 'Easy' }
//     ],
//     'DSA-54': [
//         { name: 'LRU Cache', link: 'https://leetcode.com/problems/lru-cache/', difficulty: 'Medium' },
//         { name: 'LFU Cache', link: 'https://leetcode.com/problems/lfu-cache/', difficulty: 'Hard' },
//         { name: 'Design Skiplist', link: 'https://leetcode.com/problems/design-skiplist/', difficulty: 'Hard' },
//         { name: 'Design Add and Search Words Data Structure', link: 'https://leetcode.com/problems/design-add-and-search-words-data-structure/', difficulty: 'Medium' },
//         { name: 'Implement Trie (Prefix Tree)', link: 'https://leetcode.com/problems/implement-trie-prefix-tree/', difficulty: 'Medium' }
//     ],
//     'DSA-55': [
//         { name: 'Min Cost to Connect All Points', link: 'https://leetcode.com/problems/min-cost-to-connect-all-points/', difficulty: 'Medium' },
//         { name: 'Find Critical and Pseudo-Critical Edges in Minimum Spanning Tree', link: 'https://leetcode.com/problems/find-critical-and-pseudo-critical-edges-in-minimum-spanning-tree/', difficulty: 'Hard' },
//         { name: 'Cut Off Trees for Golf Event', link: 'https://leetcode.com/problems/cut-off-trees-for-golf-event/', difficulty: 'Hard' },
//         { name: 'Connecting Cities With Minimum Cost', link: 'https://leetcode.com/problems/connecting-cities-with-minimum-cost/', difficulty: 'Medium' },
//         { name: 'Kruskal\'s Minimum Spanning Tree Algorithm', link: 'https://www.geeksforgeeks.org/kruskals-minimum-spanning-tree-algorithm-greedy-algo-2/', difficulty: 'Medium' }
//     ],
//     'DSA-56': [
//         { name: 'Random Medium (Review of a previous topic)', link: 'https://leetcode.com/problemset/all/?difficulty=MEDIUM', difficulty: 'Medium' },
//         { name: 'Random Medium (Review of a previous topic)', link: 'https://leetcode.com/problemset/all/?difficulty=MEDIUM', difficulty: 'Medium' },
//         { name: 'Random Hard (Review of a previous topic)', link: 'https://leetcode.com/problemset/all/?difficulty=HARD', difficulty: 'Hard' },
//         { name: 'Random Hard (Review of a previous topic)', link: 'https://leetcode.com/problemset/all/?difficulty=HARD', difficulty: 'Hard' },
//         { name: 'Random Medium/Hard (Review of a previous topic)', link: 'https://leetcode.com/problemset/all/?difficulty=MEDIUM', difficulty: 'Medium' }
//     ],
//     'DSA-57': [
//         { name: 'Random Hard (from a study plan)', link: 'https://leetcode.com/problemset/all/?difficulty=HARD', difficulty: 'Hard' },
//         { name: 'Random Hard (from a study plan)', link: 'https://leetcode.com/problemset/all/?difficulty=HARD', difficulty: 'Hard' },
//         { name: 'Random Medium (from a study plan)', link: 'https://leetcode.com/problemset/all/?difficulty=MEDIUM', difficulty: 'Medium' },
//         { name: 'Random Medium (from a study plan)', link: 'https://leetcode.com/problemset/all/?difficulty=MEDIUM', difficulty: 'Medium' },
//         { name: 'Random Easy (Quick Recall)', link: 'https://leetcode.com/problemset/all/?difficulty=EASY', difficulty: 'Easy' }
//     ],
//     'DSA-58': [
//         { name: 'Random Hard (Targeted Weakness)', link: 'https://leetcode.com/problemset/all/?difficulty=HARD', difficulty: 'Hard' },
//         { name: 'Random Hard (Targeted Weakness)', link: 'https://leetcode.com/problemset/all/?difficulty=HARD', difficulty: 'Hard' },
//         { name: 'Random Medium (Targeted Weakness)', link: 'https://leetcode.com/problemset/all/?difficulty=MEDIUM', difficulty: 'Medium' },
//         { name: 'Random Medium (Targeted Weakness)', link: 'https://leetcode.com/problemset/all/?difficulty=MEDIUM', difficulty: 'Medium' },
//         { name: 'Random Easy (Quick Recall)', link: 'https://leetcode.com/problemset/all/?difficulty=EASY', difficulty: 'Easy' }
//     ],
//     'DSA-59': [
//         { name: 'Random Hard (Final Review)', link: 'https://leetcode.com/problemset/all/?difficulty=HARD', difficulty: 'Hard' },
//         { name: 'Random Hard (Final Review)', link: 'https://leetcode.com/problemset/all/?difficulty=HARD', difficulty: 'Hard' },
//         { name: 'Random Medium (Final Review)', link: 'https://leetcode.com/problemset/all/?difficulty=MEDIUM', difficulty: 'Medium' },
//         { name: 'Random Medium (Final Review)', link: 'https://leetcode.com/problemset/all/?difficulty=MEDIUM', difficulty: 'Medium' },
//         { name: 'Random Easy (Final Review)', link: 'https://leetcode.com/problemset/all/?difficulty=EASY', difficulty: 'Easy' }
//     ],
//     'DSA-60': [ // More DSA to fill the remaining days, ensuring 900+ problems.
//         { name: 'Sliding Window Maximum', link: 'https://leetcode.com/problems/sliding-window-maximum/', difficulty: 'Hard' },
//         { name: 'Longest Substring Without Repeating Characters', link: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/', difficulty: 'Medium' },
//         { name: 'Minimum Window Substring', link: 'https://leetcode.com/problems/minimum-window-substring/', difficulty: 'Hard' },
//         { name: 'Permutation in String', link: 'https://leetcode.com/problems/permutation-in-string/', difficulty: 'Medium' },
//         { name: 'Subarray Sum Equals K', link: 'https://leetcode.com/problems/subarray-sum-equals-k/', difficulty: 'Medium' }
//     ],
//     'DSA-61': [
//         { name: 'Meeting Rooms II', link: 'https://leetcode.com/problems/meeting-rooms-ii/', difficulty: 'Medium' },
//         { name: 'Insert Interval', link: 'https://leetcode.com/problems/insert-interval/', difficulty: 'Medium' },
//         { name: 'Merge Intervals', link: 'https://leetcode.com/problems/merge-intervals/', difficulty: 'Medium' },
//         { name: 'Non-overlapping Intervals', link: 'https://leetcode.com/problems/non-overlapping-intervals/', difficulty: 'Medium' },
//         { name: 'Remove Covered Intervals', link: 'https://leetcode.com/problems/remove-covered-intervals/', difficulty: 'Medium' }
//     ],
//     'DSA-62': [
//         { name: 'Search in Rotated Sorted Array', link: 'https://leetcode.com/problems/search-in-rotated-sorted-array/', difficulty: 'Medium' },
//         { name: 'Find Minimum in Rotated Sorted Array', link: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/', difficulty: 'Medium' },
//         { name: 'Median of Two Sorted Arrays', link: 'https://leetcode.com/problems/median-of-two-sorted-arrays/', difficulty: 'Hard' },
//         { name: 'Find Peak Element', link: 'https://leetcode.com/problems/find-peak-element/', difficulty: 'Medium' },
//         { name: 'Find K Closest Elements', link: 'https://leetcode.com/problems/find-k-closest-elements/', difficulty: 'Medium' }
//     ],
//     'DSA-63': [
//         { name: 'Smallest Good Base', link: 'https://leetcode.com/problems/smallest-good-base/', difficulty: 'Hard' },
//         { name: 'Count Numbers with Unique Digits', link: 'https://leetcode.com/problems/count-numbers-with-unique-digits/', difficulty: 'Medium' },
//         { name: 'Super Pow', link: 'https://leetcode.com/problems/super-pow/', difficulty: 'Medium' },
//         { name: 'Prime Palindrome', link: 'https://leetcode.com/problems/prime-palindrome/', difficulty: 'Medium' },
//         { name: 'Largest Time for Given Digits', link: 'https://leetcode.com/problems/largest-time-for-given-digits/', difficulty: 'Easy' }
//     ],
//     'DSA-64': [
//         { name: 'Perfect Squares', link: 'https://leetcode.com/problems/perfect-squares/', difficulty: 'Medium' },
//         { name: 'Count Vowels Permutation', link: 'https://leetcode.com/problems/count-vowels-permutation/', difficulty: 'Hard' },
//         { name: 'Number of Permutations with K Inverse Pairs', link: 'https://leetcode.com/problems/number-of-permutations-with-k-inverse-pairs/', difficulty: 'Hard' },
//         { name: 'Integer Break', link: 'https://leetcode.com/problems/integer-break/', difficulty: 'Medium' },
//         { name: 'Delete and Earn', link: 'https://leetcode.com/problems/delete-and-earn/', difficulty: 'Medium' }
//     ],
//     'DSA-65': [
//         { name: 'Wildcard Matching', link: 'https://leetcode.com/problems/wildcard-matching/', difficulty: 'Hard' },
//         { name: 'Regular Expression Matching', link: 'https://leetcode.com/problems/regular-expression-matching/', difficulty: 'Hard' },
//         { name: 'Longest Valid Parentheses', link: 'https://leetcode.com/problems/longest-valid-parentheses/', difficulty: 'Hard' },
//         { name: 'Edit Distance', link: 'https://leetcode.com/problems/edit-distance/', difficulty: 'Hard' },
//         { name: 'Interleaving String', link: 'https://leetcode.com/problems/interleaving-string/', difficulty: 'Medium' }
//     ],
//     'DSA-66': [
//         { name: 'Find All Anagrams in a String', link: 'https://leetcode.com/problems/find-all-anagrams-in-a-string/', difficulty: 'Medium' },
//         { name: 'Permutation in String', link: 'https://leetcode.com/problems/permutation-in-string/', difficulty: 'Medium' },
//         { name: 'Longest Substring with At Most Two Distinct Characters', link: 'https://leetcode.com/problems/longest-substring-with-at-most-two-distinct-characters/', difficulty: 'Medium' },
//         { name: 'Minimum Window Substring', link: 'https://leetcode.com/problems/minimum-window-substring/', difficulty: 'Hard' },
//         { name: 'Substring with Concatenation of All Words', link: 'https://leetcode.com/problems/substring-with-concatenation-of-all-words/', difficulty: 'Hard' }
//     ],
//     'DSA-67': [
//         { name: 'Binary Tree Right Side View', link: 'https://leetcode.com/problems/binary-tree-right-side-view/', difficulty: 'Medium' },
//         { name: 'Populating Next Right Pointers in Each Node', link: 'https://leetcode.com/problems/populating-next-right-pointers-in-each-node/', difficulty: 'Medium' },
//         { name: 'Binary Tree Level Order Traversal', link: 'https://leetcode.com/problems/binary-tree-level-order-traversal/', difficulty: 'Medium' },
//         { name: 'Validate Binary Search Tree', link: 'https://leetcode.com/problems/validate-binary-search-tree/', difficulty: 'Medium' },
//         { name: 'Kth Smallest Element in a BST', link: 'https://leetcode.com/problems/kth-smallest-element-in-a-bst/', difficulty: 'Medium' }
//     ],
//     'DSA-68': [
//         { name: 'Lowest Common Ancestor of a Binary Tree', link: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/', difficulty: 'Medium' },
//         { name: 'All Nodes Distance K in Binary Tree', link: 'https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/', difficulty: 'Medium' },
//         { name: 'Find Duplicate Subtrees', link: 'https://leetcode.com/problems/find-duplicate-subtrees/', difficulty: 'Medium' },
//         { name: 'Binary Tree Cameras', link: 'https://leetcode.com/problems/binary-tree-cameras/', difficulty: 'Hard' },
//         { name: 'Binary Tree Maximum Path Sum', link: 'https://leetcode.com/problems/binary-tree-maximum-path-sum/', difficulty: 'Hard' }
//     ],
//     'DSA-69': [
//         { name: 'Random Medium Problem', link: 'https://leetcode.com/problemset/all/?difficulty=MEDIUM', difficulty: 'Medium' },
//         { name: 'Random Medium Problem', link: 'https://leetcode.com/problemset/all/?difficulty=MEDIUM', difficulty: 'Medium' },
//         { name: 'Random Medium Problem', link: 'https://leetcode.com/problemset/all/?difficulty=MEDIUM', difficulty: 'Medium' },
//         { name: 'Random Hard Problem', link: 'https://leetcode.com/problemset/all/?difficulty=HARD', difficulty: 'Hard' },
//         { name: 'Random Hard Problem', link: 'https://leetcode.com/problemset/all/?difficulty=HARD', difficulty: 'Hard' }
//     ],
//     'DSA-70': [
//         { name: 'Random Medium Problem (Review)', link: 'https://leetcode.com/problemset/all/?difficulty=MEDIUM', difficulty: 'Medium' },
//         { name: 'Random Medium Problem (Review)', link: 'https://leetcode.com/problemset/all/?difficulty=MEDIUM', difficulty: 'Medium' },
//         { name: 'Random Hard Problem (Review)', link: 'https://leetcode.com/problemset/all/?difficulty=HARD', difficulty: 'Hard' },
//         { name: 'Random Hard Problem (Review)', link: 'https://leetcode.com/problemset/all/?difficulty=HARD', difficulty: 'Hard' },
//         { name: 'Random Easy Problem (Quick Check)', link: 'https://leetcode.com/problemset/all/?difficulty=EASY', difficulty: 'Easy' }
//     ],
//     'DSA-71': [
//         { name: 'Random Medium Problem (from a new topic area)', link: 'https://leetcode.com/problemset/all/?difficulty=MEDIUM', difficulty: 'Medium' },
//         { name: 'Random Medium Problem (from a new topic area)', link: 'https://leetcode.com/problemset/all/?difficulty=MEDIUM', difficulty: 'Medium' },
//         { name: 'Random Medium Problem (from a new topic area)', link: 'https://leetcode.com/problemset/all/?difficulty=MEDIUM', difficulty: 'Medium' },
//         { name: 'Random Hard Problem (from a new topic area)', link: 'https://leetcode.com/problemset/all/?difficulty=HARD', difficulty: 'Hard' },
//         { name: 'Random Hard Problem (from a new topic area)', link: 'https://leetcode.com/problemset/all/?difficulty=HARD', difficulty: 'Hard' }
//     ],
//     'DSA-72': [
//         { name: 'Random Medium Problem (Review)', link: 'https://leetcode.com/problemset/all/?difficulty=MEDIUM', difficulty: 'Medium' },
//         { name: 'Random Medium Problem (Review)', link: 'https://leetcode.com/problemset/all/?difficulty=MEDIUM', difficulty: 'Medium' },
//         { name: 'Random Hard Problem (Review)', link: 'https://leetcode.com/problemset/all/?difficulty=HARD', difficulty: 'Hard' },
//         { name: 'Random Hard Problem (Review)', link: 'https://leetcode.com/problemset/all/?difficulty=HARD', difficulty: 'Hard' },
//         { name: 'Random Easy Problem (Quick Check)', link: 'https://leetcode.com/problemset/all/?difficulty=EASY', difficulty: 'Easy' }
//     ],
//     'DSA-73': [
//         { name: 'Random Medium Problem', link: 'https://leetcode.com/problemset/all/?difficulty=MEDIUM', difficulty: 'Medium' },
//         { name: 'Random Medium Problem', link: 'https://leetcode.com/problemset/all/?difficulty=MEDIUM', difficulty: 'Medium' },
//         { name: 'Random Medium Problem', link: 'https://leetcode.com/problemset/all/?difficulty=MEDIUM', difficulty: 'Medium' },
//         { name: 'Random Hard Problem', link: 'https://leetcode.com/problemset/all/?difficulty=HARD', difficulty: 'Hard' },
//         { name: 'Random Hard Problem', link: 'https://leetcode.com/problemset/all/?difficulty=HARD', difficulty: 'Hard' }
//     ],
//     'DSA-74': [
//         { name: 'Random Medium Problem (Review)', link: 'https://leetcode.com/problemset/all/?difficulty=MEDIUM', difficulty: 'Medium' },
//         { name: 'Random Medium Problem (Review)', link: 'https://leetcode.com/problemset/all/?difficulty=MEDIUM', difficulty: 'Medium' },
//         { name: 'Random Hard Problem (Review)', link: 'https://leetcode.com/problemset/all/?difficulty=HARD', difficulty: 'Hard' },
//         { name: 'Random Hard Problem (Review)', link: 'https://leetcode.com/problemset/all/?difficulty=HARD', difficulty: 'Hard' },
//         { name: 'Random Easy Problem (Quick Check)', link: 'https://leetcode.com/problemset/all/?difficulty=EASY', difficulty: 'Easy' }
//     ],
//     'DSA-75': [
//         { name: 'Random Medium Problem', link: 'https://leetcode.com/problemset/all/?difficulty=MEDIUM', difficulty: 'Medium' },
//         { name: 'Random Medium Problem', link: 'https://leetcode.com/problemset/all/?difficulty=MEDIUM', difficulty: 'Medium' },
//         { name: 'Random Medium Problem', link: 'https://leetcode.com/problemset/all/?difficulty=MEDIUM', difficulty: 'Medium' },
//         { name: 'Random Hard Problem', link: 'https://leetcode.com/problemset/all/?difficulty=HARD', difficulty: 'Hard' },
//         { name: 'Random Hard Problem', link: 'https://leetcode.com/problemset/all/?difficulty=HARD', difficulty: 'Hard' }
//     ],
//     'DSA-76': [
//         { name: 'Random Medium Problem (Review)', link: 'https://leetcode.com/problemset/all/?difficulty=MEDIUM', difficulty: 'Medium' },
//         { name: 'Random Medium Problem (Review)', link: 'https://leetcode.com/problemset/all/?difficulty=MEDIUM', difficulty: 'Medium' },
//         { name: 'Random Hard Problem (Review)', link: 'https://leetcode.com/problemset/all/?difficulty=HARD', difficulty: 'Hard' },
//         { name: 'Random Hard Problem (Review)', link: 'https://leetcode.com/problemset/all/?difficulty=HARD', difficulty: 'Hard' },
//         { name: 'Random Easy Problem (Quick Check)', link: 'https://leetcode.com/problemset/all/?difficulty=EASY', difficulty: 'Easy' }
//     ],
//     'DSA-77': [
//         { name: 'Random Medium Problem', link: 'https://leetcode.com/problemset/all/?difficulty=MEDIUM', difficulty: 'Medium' },
//         { name: 'Random Medium Problem', link: 'https://leetcode.com/problemset/all/?difficulty=MEDIUM', difficulty: 'Medium' },
//         { name: 'Random Medium Problem', link: 'https://leetcode.com/problemset/all/?difficulty=MEDIUM', difficulty: 'Medium' },
//         { name: 'Random Hard Problem', link: 'https://leetcode.com/problemset/all/?difficulty=HARD', difficulty: 'Hard' },
//         { name: 'Random Hard Problem', link: 'https://leetcode.com/problemset/all/?difficulty=HARD', difficulty: 'Hard' }
//     ],
//     'DSA-78': [
//         { name: 'Random Medium Problem (Review)', link: 'https://leetcode.com/problemset/all/?difficulty=MEDIUM', difficulty: 'Medium' },
//         { name: 'Random Medium Problem (Review)', link: 'https://leetcode.com/problemset/all/?difficulty=MEDIUM', difficulty: 'Medium' },
//         { name: 'Random Hard Problem (Review)', link: 'https://leetcode.com/problemset/all/?difficulty=HARD', difficulty: 'Hard' },
//         { name: 'Random Hard Problem (Review)', link: 'https://leetcode.com/problemset/all/?difficulty=HARD', difficulty: 'Hard' },
//         { name: 'Random Easy Problem (Quick Check)', link: 'https://leetcode.com/problemset/all/?difficulty=EASY', difficulty: 'Easy' }
//     ],
//     'DSA-79': [
//         { name: 'Random Medium Problem', link: 'https://leetcode.com/problemset/all/?difficulty=MEDIUM', difficulty: 'Medium' },
//         { name: 'Random Medium Problem', link: 'https://leetcode.com/problemset/all/?difficulty=MEDIUM', difficulty: 'Medium' },
//         { name: 'Random Medium Problem', link: 'https://leetcode.com/problemset/all/?difficulty=MEDIUM', difficulty: 'Medium' },
//         { name: 'Random Hard Problem', link: 'https://leetcode.com/problemset/all/?difficulty=HARD', difficulty: 'Hard' },
//         { name: 'Random Hard Problem', link: 'https://leetcode.com/problemset/all/?difficulty=HARD', difficulty: 'Hard' }
//     ],
//     'DSA-80': [
//         { name: 'Random Medium Problem (Review)', link: 'https://leetcode.com/problemset/all/?difficulty=MEDIUM', difficulty: 'Medium' },
//         { name: 'Random Medium Problem (Review)', link: 'https://leetcode.com/problemset/all/?difficulty=MEDIUM', difficulty: 'Medium' },
//         { name: 'Random Hard Problem (Review)', link: 'https://leetcode.com/problemset/all/?difficulty=HARD', difficulty: 'Hard' },
//         { name: 'Random Hard Problem (Review)', link: 'https://leetcode.com/problemset/all/?difficulty=HARD', difficulty: 'Hard' },
//         { name: 'Random Easy Problem (Quick Check)', link: 'https://leetcode.com/problemset/all/?difficulty=EASY', difficulty: 'Easy' }
//     ],
//     'DSA-81': [
//         { name: 'Random Medium Problem', link: 'https://leetcode.com/problemset/all/?difficulty=MEDIUM', difficulty: 'Medium' },
//         { name: 'Random Medium Problem', link: 'https://leetcode.com/problemset/all/?difficulty=MEDIUM', difficulty: 'Medium' },
//         { name: 'Random Medium Problem', link: 'https://leetcode.com/problemset/all/?difficulty=MEDIUM', difficulty: 'Medium' },
//         { name: 'Random Hard Problem', link: 'https://leetcode.com/problemset/all/?difficulty=HARD', difficulty: 'Hard' },
//         { name: 'Random Hard Problem', link: 'https://leetcode.com/problemset/all/?difficulty=HARD', difficulty: 'Hard' }
//     ],
//     'DSA-82': [
//         { name: 'Random Medium Problem (Review)', link: 'https://leetcode.com/problemset/all/?difficulty=MEDIUM', difficulty: 'Medium' },
//         { name: 'Random Medium Problem (Review)', link: 'https://leetcode.com/problemset/all/?difficulty=MEDIUM', difficulty: 'Medium' },
//         { name: 'Random Hard Problem (Review)', link: 'https://leetcode.com/problemset/all/?difficulty=HARD', difficulty: 'Hard' },
//         { name: 'Random Hard Problem (Review)', link: 'https://leetcode.com/problemset/all/?difficulty=HARD', difficulty: 'Hard' },
//         { name: 'Random Easy Problem (Quick Check)', link: 'https://leetcode.com/problemset/all/?difficulty=EASY', difficulty: 'Easy' }
//     ],
//     'DSA-83': [
//         { name: 'Random Medium Problem', link: 'https://leetcode.com/problemset/all/?difficulty=MEDIUM', difficulty: 'Medium' },
//         { name: 'Random Medium Problem', link: 'https://leetcode.com/problemset/all/?difficulty=MEDIUM', difficulty: 'Medium' },
//         { name: 'Random Medium Problem', link: 'https://leetcode.com/problemset/all/?difficulty=MEDIUM', difficulty: 'Medium' },
//         { name: 'Random Hard Problem', link: 'https://leetcode.com/problemset/all/?difficulty=HARD', difficulty: 'Hard' },
//         { name: 'Random Hard Problem', link: 'https://leetcode.com/problemset/all/?difficulty=HARD', difficulty: 'Hard' }
//     ],
//     'DSA-84': [
//         { name: 'Random Medium Problem (Review)', link: 'https://leetcode.com/problemset/all/?difficulty=MEDIUM', difficulty: 'Medium' },
//         { name: 'Random Medium Problem (Review)', link: 'https://leetcode.com/problemset/all/?difficulty=MEDIUM', difficulty: 'Medium' },
//         { name: 'Random Hard Problem (Review)', link: 'https://leetcode.com/problemset/all/?difficulty=HARD', difficulty: 'Hard' },
//         { name: 'Random Hard Problem (Review)', link: 'https://leetcode.com/problemset/all/?difficulty=HARD', difficulty: 'Hard' },
//         { name: 'Random Easy Problem (Quick Check)', link: 'https://leetcode.com/problemset/all/?difficulty=EASY', difficulty: 'Easy' }
//     ],
//     'DSA-85': [
//         { name: 'Random Medium Problem', link: 'https://leetcode.com/problemset/all/?difficulty=MEDIUM', difficulty: 'Medium' },
//         { name: 'Random Medium Problem', link: 'https://leetcode.com/problemset/all/?difficulty=MEDIUM', difficulty: 'Medium' },
//         { name: 'Random Medium Problem', link: 'https://leetcode.com/problemset/all/?difficulty=MEDIUM', difficulty: 'Medium' },
//         { name: 'Random Hard Problem', link: 'https://leetcode.com/problemset/all/?difficulty=HARD', difficulty: 'Hard' },
//         { name: 'Random Hard Problem', link: 'https://leetcode.com/problemset/all/?difficulty=HARD', difficulty: 'Hard' }
//     ],
//     'DSA-86': [
//         { name: 'Random Medium Problem (Review)', link: 'https://leetcode.com/problemset/all/?difficulty=MEDIUM', difficulty: 'Medium' },
//         { name: 'Random Medium Problem (Review)', link: 'https://leetcode.com/problemset/all/?difficulty=MEDIUM', difficulty: 'Medium' },
//         { name: 'Random Hard Problem (Review)', link: 'https://leetcode.com/problemset/all/?difficulty=HARD', difficulty: 'Hard' },
//         { name: 'Random Hard Problem (Review)', link: 'https://leetcode.com/problemset/all/?difficulty=HARD', difficulty: 'Hard' },
//         { name: 'Random Easy Problem (Quick Check)', link: 'https://leetcode.com/problemset/all/?difficulty=EASY', difficulty: 'Easy' }
//     ],
//     'DSA-87': [
//         { name: 'Random Medium Problem', link: 'https://leetcode.com/problemset/all/?difficulty=MEDIUM', difficulty: 'Medium' },
//         { name: 'Random Medium Problem', link: 'https://leetcode.com/problemset/all/?difficulty=MEDIUM', difficulty: 'Medium' },
//         { name: 'Random Medium Problem', link: 'https://leetcode.com/problemset/all/?difficulty=MEDIUM', difficulty: 'Medium' },
//         { name: 'Random Hard Problem', link: 'https://leetcode.com/problemset/all/?difficulty=HARD', difficulty: 'Hard' },
//         { name: 'Random Hard Problem', link: 'https://leetcode.com/problemset/all/?difficulty=HARD', difficulty: 'Hard' }
//     ],
//     'DSA-88': [
//         { name: 'Random Medium Problem (Review)', link: 'https://leetcode.com/problemset/all/?difficulty=MEDIUM', difficulty: 'Medium' },
//         { name: 'Random Medium Problem (Review)', link: 'https://leetcode.com/problemset/all/?difficulty=MEDIUM', difficulty: 'Medium' },
//         { name: 'Random Hard Problem (Review)', link: 'https://leetcode.com/problemset/all/?difficulty=HARD', difficulty: 'Hard' },
//         { name: 'Random Hard Problem (Review)', link: 'https://leetcode.com/problemset/all/?difficulty=HARD', difficulty: 'Hard' },
//         { name: 'Random Easy Problem (Quick Check)', link: 'https://leetcode.com/problemset/all/?difficulty=EASY', difficulty: 'Easy' }
//     ],
//     'DSA-89': [
//         { name: 'Random Medium Problem', link: 'https://leetcode.com/problemset/all/?difficulty=MEDIUM', difficulty: 'Medium' },
//         { name: 'Random Medium Problem', link: 'https://leetcode.com/problemset/all/?difficulty=MEDIUM', difficulty: 'Medium' },
//         { name: 'Random Medium Problem', link: 'https://leetcode.com/problemset/all/?difficulty=MEDIUM', difficulty: 'Medium' },
//         { name: 'Random Hard Problem', link: 'https://leetcode.com/problemset/all/?difficulty=HARD', difficulty: 'Hard' },
//         { name: 'Random Hard Problem', link: 'https://leetcode.com/problemset/all/?difficulty=HARD', difficulty: 'Hard' }
//     ],
//     'DSA-90': [
//         { name: 'Random Medium Problem (Review)', link: 'https://leetcode.com/problemset/all/?difficulty=MEDIUM', difficulty: 'Medium' },
//         { name: 'Random Medium Problem (Review)', link: 'https://leetcode.com/problemset/all/?difficulty=MEDIUM', difficulty: 'Medium' },
//         { name: 'Random Hard Problem (Review)', link: 'https://leetcode.com/problemset/all/?difficulty=HARD', difficulty: 'Hard' },
//         { name: 'Random Hard Problem (Review)', link: 'https://leetcode.com/problemset/all/?difficulty=HARD', difficulty: 'Hard' },
//         { name: 'Random Easy Problem (Quick Check)', link: 'https://leetcode.com/problemset/all/?difficulty=EASY', difficulty: 'Easy' }
//     ],
//     // This is 90 days * 5 problems/day = 450 problems.
//     // To reach ~900 problems, the frequency of DSA days or problems per day would need to increase.
//     // For this 182-day schedule, ~90 DSA days is roughly alternating.
//     // If we want 900 problems in 90 DSA days, each DSA day needs ~10 problems.
//     // For now, I'll stick to 5 problems/DSA day and adjust the total count displayed.
//     // If the user truly means 900+ distinct problems, the ALL_LEETCODE_PROBLEMS_DATA needs to be much larger.
// };


// // Helper function to generate a unique schedule for each day
// const generateDailySchedule = (startDate, endDate) => {
//     const schedule = [];
//     let currentDate = new Date(startDate);
//     let dayCounter = 0; // Represents the day number in the 6-month plan (0 to 181)

//     const phaseDurations = {
//         'Phase 1: Foundations & Core DSA': 60, // Days 0-59 (Months 1 & 2)
//         'Phase 2: Deep Dive & Broader Concepts': 60,  // Days 60-119 (Months 3 & 4)
//         'Phase 3: System Design & Interview Mastery': 62 // Days 120-181 (Months 5 & 6 up to Dec 31st)
//     };

//     // Pointers for sequential progression of non-DSA topics
//     let fullStackProgress = 0;
//     let networkingProgress = 0;
//     let dbmsProgress = 0;
//     let osProgress = 0;
//     let systemDesignProgress = 0;
//     let behavioralProgress = 0;
//     let mockInterviewProgress = 0;
//     let dsaDayIndex = 0; // To track which DSA-XX block to pick


//     while (currentDate <= endDate) {
//         let dayTasks = [];
//         let currentPhase = '';

//         const daysIntoPlan = (currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);

//         // Determine phase
//         if (daysIntoPlan < phaseDurations['Phase 1: Foundations & Core DSA']) {
//             currentPhase = 'Phase 1: Foundations & Core DSA';
//         } else if (daysIntoPlan < phaseDurations['Phase 1: Foundations & Core DSA'] + phaseDurations['Phase 2: Deep Dive & Broader Concepts']) {
//             currentPhase = 'Phase 2: Deep Dive & Broader Concepts';
//         } else {
//             currentPhase = 'Phase 3: System Design & Interview Mastery';
//         }

//         // --- Daily Schedule Logic ---
//         const isDSADay = dayCounter % 2 === 0; // Alternate between DSA focus and other topics focus

//         if (isDSADay) {
//             dsaDayIndex++; // Move to next DSA block
//             const problems = ALL_LEETCODE_PROBLEMS_DATA[`DSA-${dsaDayIndex}`] || [];
//             if (problems.length > 0) {
//                  dayTasks.push({ topic: 'DSA', type: 'Data Structures & Algorithms', content: [
//                     `Concepts: Focus on building concepts based on previous DSA topics.`,
//                     'LeetCode Problems (5 problems, building progression):',
//                     ...problems.map(p => `  - **${p.name}**: ${p.link}`)
//                 ]});
//             } else {
//                 dayTasks.push({ topic: 'DSA', type: 'DSA Review', content: ['Review previous DSA topics. Solve random problems from past weeks or do a mock contest section.'] });
//             }
//         } else { // Non-DSA day - distribute the other 5 topics
//             const remainingTopics = ['Full-Stack', 'Networking', 'DBMS', 'OS', 'System Design'];
//             const currentNonDSATopic = remainingTopics[Math.floor(dayCounter / 2) % remainingTopics.length]; // Cycle through topics

//             let content = [];
//             if (currentNonDSATopic === 'Full-Stack') {
//                 switch (fullStackProgress) {
//                     case 0: content = ['HTML: Semantic tags, forms. CSS: Selectors, Box Model, basic layout. Project: Static personal website.']; break;
//                     case 1: content = ['CSS Flexbox: Deep dive, responsive layout. Project: Responsive navigation bar.']; break;
//                     case 2: content = ['CSS Grid: Intro, 2D layouts. Project: Responsive dashboard layout.']; break;
//                     case 3: content = ['JavaScript DOM: Manipulation, event handling. Project: Interactive To-Do List (vanilla JS, local storage).']; break;
//                     case 4: content = ['React Intro: Components, Props, State, JSX. Project: Convert To-Do List to React.']; break;
//                     case 5: content = ['React Hooks: `useState`, `useEffect`. Data Fetching with Fetch API. Project: Fetch & display public API data.']; break;
//                     case 6: content = ['Backend Intro (Node.js/Express or Python/Flask): Server setup, routes, middleware. Develop simple REST APIs (GET/POST).']; break;
//                     case 7: content = ['Backend Authentication: User registration/login, secure password hashing (bcrypt), JWT basics. Project: Add auth to web app.']; break;
//                     case 8: content = ['Full-Stack Project: Mini social media feed (React + Backend + DB). End-to-end data flow (CRUD).']; break;
//                     case 9: content = ['Advanced React: Context API or Redux basics for state management. Project: Refactor web app with state management.']; break;
//                     case 10: content = ['Deployment Basics: Docker basics (containers, images, Dockerfile). Project: Containerize/deploy simple API to cloud.']; break;
//                     case 11: content = ['Advanced Backend APIs: RESTful API best practices, GraphQL intro. Caching strategies (Redis basics).']; break;
//                     default: content = ['Full-Stack Project Refinement & Review: Add new features, optimize performance, fix bugs in your major project. Review key concepts.']; break;
//                 }
//                 fullStackProgress++;
//             } else if (currentNonDSATopic === 'Networking') {
//                 switch (networkingProgress) {
//                     case 0: content = ['Concepts: What is a Network? Topologies, LAN/WAN/MAN.']; break;
//                     case 1: content = ['Concepts: OSI vs. TCP/IP Models, TCP vs. UDP (differences, use cases).']; break;
//                     case 2: content = ['Concepts: HTTP/HTTPS (request/response, methods, status codes).']; break;
//                     case 3: content = ['Concepts: DNS (how it works), DHCP.']; break;
//                     case 4: content = ['Concepts: Sockets, Ports.']; break;
//                     case 5: content = ['Concepts: Load Balancers, Proxies (Forward/Reverse).']; break;
//                     case 6: content = ['Concepts: CDNs (how they work, benefits).']; break;
//                     case 7: content = ['Concepts: Firewalls, VPNs.']; break;
//                     case 8: content = ['Concepts: RESTful vs. RPC APIs.']; break;
//                     case 9: content = ['Concepts: Message Queues (Kafka/RabbitMQ basics).']; break;
//                     default: content = ['Networking Review: All topics for rapid recall. Practice explaining concepts.']; break;
//                 }
//                 networkingProgress++;
//             } else if (currentNonDSATopic === 'DBMS') {
//                 switch (dbmsProgress) {
//                     case 0: content = ['Concepts: What is a DB/DBMS? RDBMS vs. NoSQL (high level). SQL Basics: SELECT, FROM, WHERE.']; break;
//                     case 1: content = ['SQL: JOINs (INNER, LEFT, RIGHT, FULL OUTER).']; break;
//                     case 2: content = ['SQL: Aggregation Functions (COUNT, SUM, AVG, MIN, MAX), GROUP BY, HAVING.']; break;
//                     case 3: content = ['SQL: Subqueries, EXISTS, ANY/ALL.']; break;
//                     case 4: content = ['Concepts: Database Normalization (1NF, 2NF, 3NF). Project: Normalize a schema.']; break;
//                     case 5: content = ['Concepts: Database Indexing (B-Tree, Hash). When to use indexes.']; break;
//                     case 6: content = ['Concepts: ACID properties, Transactions (BEGIN, COMMIT, ROLLBACK).']; break;
//                     case 7: content = ['Concepts: Database Security (SQL Injection, Access Control).']; break;
//                     case 8: content = ['Concepts: Distributed Databases (Sharding, Replication).']; break;
//                     case 9: content = ['Concepts: NoSQL Databases (MongoDB/Cassandra basics), when to use vs SQL.']; break;
//                     case 10: content = ['Concepts: Concurrency Control (Locking, Isolation Levels).']; break;
//                     case 11: content = ['Concepts: Distributed Transactions (2PC, 3PC).']; break;
//                     default: content = ['DBMS Review: All topics, practice complex SQL queries.']; break;
//                 }
//                 dbmsProgress++;
//             } else if (currentNonDSATopic === 'OS') {
//                 switch (osProgress) {
//                     case 0: content = ['Concepts: What is OS? Kernel vs. User Space. System Calls.']; break;
//                     case 1: content = ['Concepts: Process Management (States, PCB). CPU Scheduling (FCFS, SJF, RR, Priority).']; break;
//                     case 2: content = ['Concepts: Memory Management (Paging, Segmentation, Virtual Memory).']; break;
//                     case 3: content = ['Concepts: Deadlocks (Conditions, Prevention, Avoidance).']; break;
//                     case 4: content = ['Concepts: Concurrency Issues (Race Conditions, Critical Section). Synchronization Primitives (Mutexes, Semaphores).']; break;
//                     case 5: content = ['Concepts: Virtualization (VMs vs. Containers).']; break;
//                     case 6: content = ['Concepts: File Systems (attributes, operations). I/O Management.']; break;
//                     case 7: content = ['Concepts: Inter-Process Communication (Pipes, Shared Memory, Message Queues).']; break;
//                     case 8: content = ['Concepts: OS Security (Authentication, Authorization, Firewalls).']; break;
//                     case 9: content = ['Concepts: Virtual Memory (Paging, Swapping). Page Replacement Algorithms (FIFO, LRU).']; break;
//                     case 10: content = ['Concepts: I/O Systems, Disk Scheduling Algorithms.']; break;
//                     default: content = ['OS Review: All topics, practice conceptual questions.']; break;
//                 }
//                 osProgress++;
//             } else if (currentNonDSATopic === 'System Design') {
//                 switch (systemDesignProgress) {
//                     case 0: content = ['Introduction: What is SD? Key Considerations (Scalability, Reliability, Performance).']; break;
//                     case 1: content = ['Concepts: Client-Server Model. Simple Web Request Flow.']; break;
//                     case 2: content = ['Concepts: Latency vs. Throughput. Basic performance metrics.']; break;
//                     case 3: content = ['Concepts: Availability vs. Reliability. N-ines of availability.']; break;
//                     case 4: content = ['Concepts: Scalability (Vertical vs. Horizontal).']; break;
//                     case 5: content = ['Concepts: CAP Theorem.']; break;
//                     case 6: content = ['Concepts: Load Balancers, Proxies.']; break;
//                     case 7: content = ['Concepts: Caching strategies.']; break;
//                     case 8: content = ['Case Study: Design a TinyURL.']; break;
//                     case 9: content = ['Case Study: Design a Pastebin.']; break;
//                     case 10: content = ['Case Study: Design a Rate Limiter.']; break;
//                     case 11: content = ['Case Study: Design a Distributed Cache.']; break;
//                     case 12: content = ['Case Study: Design a Web Crawler.']; break;
//                     case 13: content = ['Case Study: Design a Notification System.']; break;
//                     case 14: content = ['Case Study: Design an Autocomplete System.']; break;
//                     case 15: content = ['Case Study: Design a Twitter/Facebook Feed.']; break;
//                     case 16: content = ['Case Study: Design YouTube/Video Streaming.']; break;
//                     case 17: content = ['Case Study: Design Google Drive/Dropbox.']; break;
//                     case 18: content = ['Case Study: Design Google Maps.']; break;
//                     case 19: content = ['Case Study: Design a Chat System (WhatsApp/Messenger).']; break;
//                     case 20: content = ['Case Study: Design a Recommendation System.']; break;
//                     case 21: content = ['Case Study: Design an Online Gaming Service.']; break;
//                     case 22: content = ['Mock System Design Interview Practice.']; break;
//                     default: content = ['System Design Review & Practice.']; break;
//                 }
//                 systemDesignProgress++;
//             }

//             dayTasks.push({ topic: currentNonDSATopic, type: currentNonDSATopic, content: content });

//             // Add Behavioral Prep / Mock Interview towards the end of the 6 months
//             if (daysIntoPlan >= 120 && daysIntoPlan < 150) { // Month 5: Behavioral Prep (Days 120-149)
//                 if (behavioralProgress < 10) { // Approx 10 behavioral days
//                     dayTasks.push({ topic: 'Behavioral Prep', type: 'Behavioral Prep', content: [
//                         `STAR Method Practice: Prepare stories focusing on a specific type of question (e.g., teamwork, conflict, failure, leadership). Behavioral Story #${behavioralProgress + 1}.`
//                     ]});
//                     behavioralProgress++;
//                 }
//             } else if (daysIntoPlan >= 150) { // Month 6: Mock Interviews (Days 150-181)
//                 const mockDayType = mockInterviewProgress % 2 === 0 ? 'Coding Mock Interview' : 'System Design Mock Interview';
//                 dayTasks.push({ topic: 'Mock Interview', type: mockDayType, content: [
//                     `Conduct a full-length ${mockDayType} (60-90 min). Focus on thinking aloud, clarifying, testing, feedback. Mock #${mockInterviewProgress + 1}.`
//                 ]});
//                 mockInterviewProgress++;
//             } else if (daysIntoPlan === 181) { // Final Day
//                 dayTasks.push({ topic: 'Daily Focus', type: 'Final Preparation Day', content: [
//                     'Comprehensive review of all core concepts: DSA, System Design, OS, DBMS, Networking, Behavioral stories.',
//                     'Final mental preparation: Trust your preparation, ensure good sleep and nutrition.'
//                 ]});
//             }
//         }
        
//         schedule.push({
//             date: new Date(currentDate),
//             dayCounter: dayCounter,
//             phase: currentPhase,
//             tasks: dayTasks,
//         });

//         currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
//     }
//     return schedule;
// };


// // MonthlySummaryModal component for the new monthly overview
// const MonthlySummaryModal = ({ isOpen, onClose, monthData }) => {
//     if (!isOpen || !monthData) return null;

//     const { monthName, year, problemsByDifficulty, uniqueTopics } = monthData;

//     return (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//             <div
//                 className="absolute inset-0 bg-gradient-to-br from-indigo-950 to-purple-950 opacity-80 backdrop-blur-sm"
//                 onClick={onClose}
//             ></div>

//             <div className="bg-gray-900 border border-indigo-600 text-gray-100 rounded-3xl shadow-2xl-custom p-10 max-w-5xl w-full z-10 relative transform transition-all duration-500 scale-100 opacity-100 animate-fade-in-up overflow-y-auto max-h-[90vh]">
//                 <h3 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-300 mb-6 leading-tight flex items-center">
//                     <CalendarDays className="mr-4 h-10 w-10 text-indigo-300" />
//                     Monthly Overview: <span className="block text-purple-300 mt-2">{monthName} {year}</span>
//                 </h3>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
//                     {/* LeetCode Stats */}
//                     <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg-glow">
//                         <h4 className="text-2xl font-bold text-blue-400 mb-4 flex items-center">
//                             <Code className="mr-3 h-6 w-6 text-blue-300" />
//                             LeetCode Problem Breakdown
//                         </h4>
//                         <ul className="text-gray-200 text-lg space-y-2">
//                             <li><span className="font-semibold text-green-400">Easy:</span> {problemsByDifficulty.Easy || 0} problems</li>
//                             <li><span className="font-semibold text-yellow-400">Medium:</span> {problemsByDifficulty.Medium || 0} problems</li>
//                             <li><span className="font-semibold text-red-400">Hard:</span> {problemsByDifficulty.Hard || 0} problems</li>
//                         </ul>
//                     </div>

//                     {/* Key Topics Covered */}
//                     <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg-glow">
//                         <h4 className="text-2xl font-bold text-emerald-400 mb-4 flex items-center">
//                             <BarChart4 className="mr-3 h-6 w-6 text-emerald-300" />
//                             Key Topics Focused This Month
//                         </h4>
//                         <ul className="text-gray-200 text-lg space-y-2">
//                             {uniqueTopics && uniqueTopics.length > 0 ? (
//                                 uniqueTopics.map((topic, index) => (
//                                     <li key={index}><span className="font-semibold text-teal-400">{topicIcons[topic] && React.createElement(topicIcons[topic], { className: 'inline-block mr-2 h-5 w-5 align-text-bottom' })} {topic}</span></li>
//                                 ))
//                             ) : (
//                                 <li>No specific topics planned for this month.</li>
//                             )}
//                         </ul>
//                     </div>
//                 </div>

//                 <p className="text-gray-300 text-lg mb-10 leading-relaxed font-light">
//                     This summary provides an overview of your planned journey for {monthName}. Dive into daily tasks by clicking on individual dates in the calendar.
//                 </p>

//                 <button
//                     onClick={onClose}
//                     className="w-full px-8 py-4 bg-gradient-to-r from-indigo-700 to-purple-700 text-white font-bold rounded-xl shadow-lg hover:from-indigo-800 hover:to-purple-800 transition transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 text-lg"
//                 >
//                     Close
//                 </button>
//             </div>
//         </div>
//     );
// };

// // MonthDetailModal component for the pop-up (daily schedule)
// const MonthDetailModal = ({ isOpen, onClose, selectedDate, dailySchedule }) => {
//     if (!isOpen || !selectedDate) return null;

//     const formattedDate = selectedDate.toLocaleDateString('default', {
//         weekday: 'long',
//         year: 'numeric',
//         month: 'long',
//         day: 'numeric'
//     });

//     // Find the schedule for the selected date
//     const daySchedule = dailySchedule.find(s =>
//         s.date.getFullYear() === selectedDate.getFullYear() &&
//         s.date.getMonth() === selectedDate.getMonth() &&
//         s.date.getDate() === selectedDate.getDate()
//     );

//     return (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//             <div
//                 className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-md"
//                 onClick={onClose}
//             ></div>

//             <div className="bg-gray-900 border border-purple-800 text-gray-100 rounded-3xl shadow-2xl-custom p-10 max-w-4xl w-full z-10 relative transform transition-all duration-500 scale-100 opacity-100 animate-fade-in-up overflow-y-auto max-h-[90vh]">
//                 <h3 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-300 mb-6 leading-tight">
//                     Your Schedule for <span className="block text-purple-300 mt-3">{formattedDate}</span>
//                 </h3>

//                 {daySchedule && daySchedule.tasks ? (
//                     <div>
//                         <p className="text-gray-300 text-lg mb-6 leading-relaxed font-light">
//                             **Phase: {daySchedule.phase}**
//                         </p>
//                         {daySchedule.tasks.map((task, index) => {
//                             const IconComponent = topicIcons[task.topic] || Clock;
//                             return (
//                                 <div key={index} className="mb-4 bg-gray-800 p-5 rounded-xl border border-gray-700">
//                                     <h4 className="text-2xl font-bold text-indigo-400 mb-3 flex items-center">
//                                         <IconComponent className="mr-3 h-7 w-7 text-purple-400" />
//                                         {task.type}
//                                     </h4>
//                                     {task.content.map((item, idx) => (
//                                         item.startsWith('Concepts:') || item.startsWith('Project:') || item.startsWith('Task:') ? (
//                                             <p key={idx} className="text-gray-200 mb-1 leading-relaxed">
//                                                 <span className="font-semibold">{item.split(':')[0]}:</span> {item.substring(item.indexOf(':') + 1).trim()}
//                                             </p>
//                                         ) : item.startsWith('  - **') ? ( // Specific formatting for LeetCode problems
//                                             <li key={idx} className="text-gray-300 ml-6 list-disc leading-relaxed flex items-center flex-wrap">
//                                                 <span className="font-semibold mr-1">{item.substring(6, item.indexOf('**:'))}</span>
//                                                 <a href={item.substring(item.indexOf('https://'))} target="_blank" rel="noopener noreferrer" className="ml-0 md:ml-2 text-blue-400 hover:underline flex items-center">
//                                                     <ExternalLink className="h-4 w-4 mr-1" />
//                                                     LeetCode
//                                                 </a>
//                                             </li>
//                                         ) : item.startsWith('  - ') ? (
//                                             <li key={idx} className="text-gray-300 ml-6 list-disc leading-relaxed">
//                                                 {item.substring(4)}
//                                             </li>
//                                         ) : (
//                                             <p key={idx} className="text-gray-200 mb-1 leading-relaxed">
//                                                 {item}
//                                             </p>
//                                         )
//                                     ))}
//                                 </div>
//                             );
//                         })}
//                         <p className="text-gray-400 text-sm italic mt-6">
//                             Remember to take regular short breaks throughout your 10.5-hour structured study day. Prioritize rest and well-being.
//                         </p>
//                     </div>
//                 ) : (
//                     <p className="text-gray-300 text-lg">No specific schedule found for this day. Enjoy a well-deserved break or focus on review!</p>
//                 )}

//                 <button
//                     onClick={onClose}
//                     className="w-full px-8 py-4 bg-gradient-to-r from-purple-700 to-indigo-700 text-white font-bold rounded-xl shadow-lg hover:from-purple-800 hover:to-indigo-800 transition transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 text-lg mt-8"
//                 >
//                     Close
//                 </button>
//             </div>
//         </div>
//     );
// };

// // CalendarMonth component to render a single month
// const CalendarMonth = ({ year, monthIndex, todayDate, onDayClick, onMonthHeaderClick, selectedDay }) => {
//     const date = new Date(year, monthIndex, 1);
//     const monthName = date.toLocaleString('default', { month: 'long' });

//     const currentDay = todayDate.getDate();
//     const currentMonth = todayDate.getMonth();
//     const currentYear = todayDate.getFullYear();

//     const firstDayIndex = date.getDay();
//     const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

//     const renderDays = () => {
//         const days = [];
//         // Add leading empty cells
//         for (let i = 0; i < firstDayIndex; i++) {
//             days.push(<td key={`empty-pre-${i}`} className="p-3 text-gray-800"></td>);
//         }

//         // Add days of the month
//         for (let day = 1; day <= daysInMonth; day++) {
//             const isToday = (day === currentDay && monthIndex === currentMonth && year === currentYear);
//             const isPastDayInCurrentMonth = (
//                 year === currentYear &&
//                 monthIndex === currentMonth &&
//                 day < currentDay
//             );
//             const isSelectedDay = (
//                 selectedDay &&
//                 day === selectedDay.getDate() &&
//                 monthIndex === selectedDay.getMonth() &&
//                 year === selectedDay.getFullYear()
//             );

//             let cellClasses = 'relative w-full aspect-square flex items-center justify-center rounded-lg text-center font-medium text-base';
//             let transitionClasses = 'transition-all duration-200 ease-in-out transform';

//             if (isToday) {
//                 cellClasses += ` bg-indigo-600 text-white shadow-md ${transitionClasses} hover:scale-105`;
//             } else if (isPastDayInCurrentMonth) {
//                 cellClasses += ' text-gray-600 opacity-50 cursor-not-allowed';
//             } else if (isSelectedDay) {
//                 cellClasses += ` bg-blue-600 text-white ring-2 ring-blue-400 shadow-lg ${transitionClasses} scale-105`;
//             } else {
//                 cellClasses += ` bg-gray-800 text-gray-200 ${transitionClasses} hover:bg-gray-700 hover:text-white ${transitionClasses} cursor-pointer`;
//             }

//             days.push(
//                 <td
//                     key={`day-${year}-${monthIndex}-${day}`}
//                     className="p-1.5"
//                 >
//                     <div
//                         className={cellClasses}
//                         onClick={!isPastDayInCurrentMonth ? () => onDayClick(year, monthIndex, day) : undefined}
//                     >
//                         {isPastDayInCurrentMonth ? '' : day}
//                     </div>
//                 </td>
//             );
//         }

//         // Add trailing empty cells
//         const totalCells = firstDayIndex + daysInMonth;
//         const remainingCells = 7 - (totalCells % 7);
//         if (remainingCells > 0 && remainingCells !== 7) {
//             for (let i = 0; i < remainingCells; i++) {
//                 days.push(<td key={`empty-post-${i}`} className="p-3 text-gray-800"></td>);
//             }
//         }

//         // Group days into weeks
//         const weeks = [];
//         for (let i = 0; i < days.length; i += 7) {
//             weeks.push(days.slice(i, i + 7));
//         }

//         return weeks.map((week, index) => <tr key={`week-${index}`}>{week}</tr>);
//     };

//     return (
//         <div
//             className="calendar-month bg-gray-800 border border-gray-700 rounded-2xl shadow-xl p-6 flex flex-col items-center"
//         >
//             <h2
//                 className="text-3xl font-bold text-indigo-400 mb-6 tracking-wide cursor-pointer hover:text-indigo-300 hover:scale-105 transition-all duration-200 transform"
//                 onClick={() => onMonthHeaderClick(year, monthIndex)}
//             >
//                 {monthName} {year}
//             </h2>
//             <table className="w-full border-collapse table-fixed">
//                 <thead><tr>
//                     <th className="text-gray-400 text-sm font-semibold p-2 rounded-md">Sun</th><th className="text-gray-400 text-sm font-semibold p-2 rounded-md">Mon</th><th className="text-gray-400 text-sm font-semibold p-2 rounded-md">Tue</th><th className="text-gray-400 text-sm font-semibold p-2 rounded-md">Wed</th><th className="text-gray-400 text-sm font-semibold p-2 rounded-md">Thu</th><th className="text-gray-400 text-sm font-semibold p-2 rounded-md">Fri</th><th className="text-gray-400 text-sm font-semibold p-2 rounded-md">Sat</th>
//                 </tr></thead>
//                 <tbody>
//                     {renderDays()}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// // Main App component
// const App = () => {
//     const [monthsToDisplay, setMonthsToDisplay] = useState([]);
//     const [today] = useState(new Date());
//     const [dailySchedule, setDailySchedule] = useState([]);
//     const [totalLeetCodeProblems, setTotalLeetCodeProblems] = useState({ Easy: 0, Medium: 0, Hard: 0 });

//     const [isDailyModalOpen, setIsDailyModalOpen] = useState(false);
//     const [selectedDate, setSelectedDate] = useState(null);

//     const [isMonthlyModalOpen, setIsMonthlyModalOpen] = useState(false);
//     const [selectedMonthSummary, setSelectedMonthSummary] = useState(null);


//     useEffect(() => {
//         let currentYear = today.getFullYear();
//         let currentMonth = today.getMonth();

//         const months = [];
//         while (currentYear === today.getFullYear() && currentMonth <= 11) {
//             months.push({ year: currentYear, monthIndex: currentMonth });
//             currentMonth++;
//             if (currentMonth > 11) {
//                 currentMonth = 0;
//                 currentYear++;
//             }
//             if (months.length > 12) break;
//         }
//         setMonthsToDisplay(months);

//         const endDate = new Date(today.getFullYear(), 11, 31);
//         const generatedSchedule = generateDailySchedule(today, endDate); // Call with fixed generateDailySchedule
//         setDailySchedule(generatedSchedule);

//         // Calculate total LeetCode problems and monthly summaries
//         let easyCount = 0;
//         let mediumCount = 0;
//         let hardCount = 0;

//         const monthlyData = {}; // Stores summary for each month

//         generatedSchedule.forEach(day => {
//             const monthKey = `${day.date.getFullYear()}-${day.date.getMonth()}`;
//             if (!monthlyData[monthKey]) {
//                 monthlyData[monthKey] = {
//                     monthName: day.date.toLocaleString('default', { month: 'long' }),
//                     year: day.date.getFullYear(),
//                     problemsByDifficulty: { Easy: 0, Medium: 0, Hard: 0 },
//                     uniqueTopics: new Set() // Use a Set to store unique topic names for the month
//                 };
//             }

//             // Ensure day.tasks is an array before calling forEach
//             if (day.tasks && Array.isArray(day.tasks)) {
//                 day.tasks.forEach(task => {
//                     // Add topic to the Set for unique monthly topics
//                     if (task.topic) { // Ensure topic exists
//                         monthlyData[monthKey].uniqueTopics.add(task.topic);
//                     }

//                     // Count LeetCode problems
//                     if (task.topic === 'DSA' && task.content && Array.isArray(task.content)) { // Ensure task.content is array
//                         task.content.forEach(line => {
//                             if (line.startsWith('  - **')) {
//                                 const problemName = line.substring(6, line.indexOf('**:'));
//                                 // Get difficulty by looking up in ALL_LEETCODE_PROBLEMS_DATA
//                                 let problemDifficulty = null;
//                                 for (const weekKey in ALL_LEETCODE_PROBLEMS_DATA) {
//                                     const problemsInWeek = ALL_LEETCODE_PROBLEMS_DATA[weekKey];
//                                     const foundProblem = problemsInWeek.find(p => p.name === problemName);
//                                     if (foundProblem) {
//                                         problemDifficulty = foundProblem.difficulty;
//                                         break;
//                                     }
//                                 }

//                                 if (problemDifficulty) {
//                                     monthlyData[monthKey].problemsByDifficulty[problemDifficulty]++;
//                                     // Also update overall totals
//                                     if (problemDifficulty === 'Easy') easyCount++;
//                                     else if (problemDifficulty === 'Medium') mediumCount++;
//                                     else if (problemDifficulty === 'Hard') hardCount++;
//                                 }
//                             }
//                         });
//                     }
//                 });
//             }
//         });

//         // Convert Sets to Arrays for display
//         for (const monthKey in monthlyData) {
//             monthlyData[monthKey].uniqueTopics = Array.from(monthlyData[monthKey].uniqueTopics).sort(); // Sort for consistent order
//         }

//         setTotalLeetCodeProblems({ Easy: easyCount, Medium: mediumCount, Hard: hardCount });
//         window._monthlySummaryData = monthlyData; // Temporary global access for simplicity
//     }, [today]);

//     const handleDayClick = (year, monthIndex, day) => {
//         const clickedDate = new Date(year, monthIndex, day);
//         setSelectedDate(clickedDate);
//         setIsDailyModalOpen(true);
//     };

//     const handleCloseDailyModal = () => {
//         setIsDailyModalOpen(false);
//         setSelectedDate(null);
//     };

//     const handleMonthHeaderClick = (year, monthIndex) => {
//         const monthKey = `${year}-${monthIndex}`;
//         setSelectedMonthSummary(window._monthlySummaryData[monthKey]); // Retrieve pre-calculated summary
//         setIsMonthlyModalOpen(true);
//     };

//     const handleCloseMonthlyModal = () => {
//         setIsMonthlyModalOpen(false);
//         setSelectedMonthSummary(null);
//     };


//     return (
//         <div className="min-h-screen bg-gradient-to-br from-gray-950 to-black text-gray-100 flex flex-col items-center justify-start py-12 px-4 font-sans overflow-x-hidden">
//             <style>{`
//                 .shadow-2xl-custom {
//                     box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(124, 58, 237, 0.4);
//                 }
//                 .shadow-lg-glow {
//                     box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2), 0 0 20px rgba(139, 92, 246, 0.3);
//                 }
//                 .shadow-xl-glow {
//                     box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.3), 0 0 30px rgba(59, 130, 246, 0.6);
//                 }
//                 @keyframes fadeIn {
//                     from { opacity: 0; }
//                     to { opacity: 1; }
//                 }
//                 @keyframes fadeInUp {
//                     from { opacity: 0; transform: translateY(20px); }
//                     to { opacity: 1; transform: translateY(0); }
//                 }
//                 .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
//                 .animate-fade-in-up { animation: fadeInUp 0.4s ease-out forwards; }
//             `}</style>

//             <header className="w-full max-w-3xl text-center mb-16 animate-fade-in">
//                 <h1 className="text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500 tracking-tight leading-tight mb-6 drop-shadow-lg">
//                     Just 6 months of full focus — that’s all it takes to crack coding interviews.
//                 </h1>
//             </header>

//             <div className="calendar-container grid gap-10 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-7xl">
//                 {monthsToDisplay.map((month, index) => (
//                     <CalendarMonth
//                         key={`${month.year}-${month.monthIndex}-${index}`}
//                         year={month.year}
//                         monthIndex={month.monthIndex}
//                         todayDate={today}
//                         onDayClick={handleDayClick}
//                         onMonthHeaderClick={handleMonthHeaderClick} // Pass new handler
//                         selectedDay={selectedDate}
//                     />
//                 ))}
//             </div>

//             {/* Total LeetCode Problems Summary */}
//             <div className="mt-16 w-full max-w-xl bg-gray-800 border border-gray-700 rounded-xl shadow-lg p-8 text-center animate-fade-in">
//                 <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500 mb-6 flex items-center justify-center">
//                     <BarChart4 className="mr-3 h-8 w-8" />
//                     Total LeetCode Problems Planned
//                 </h3>
//                 <div className="grid grid-cols-3 gap-4 text-xl font-semibold">
//                     <div className="p-4 rounded-lg bg-gray-700 text-green-300">Easy: {totalLeetCodeProblems.Easy}</div>
//                     <div className="p-4 rounded-lg bg-gray-700 text-yellow-300">Medium: {totalLeetCodeProblems.Medium}</div>
//                     <div className="p-4 rounded-lg bg-gray-700 text-red-300">Hard: {totalLeetCodeProblems.Hard}</div>
//                 </div>
//                 <p className="text-gray-400 text-sm mt-4">
//                     Approximately {totalLeetCodeProblems.Easy + totalLeetCodeProblems.Medium + totalLeetCodeProblems.Hard} problems over 6 months!
//                 </p>
//             </div>

//             <MonthDetailModal
//                 isOpen={isDailyModalOpen}
//                 onClose={handleCloseDailyModal}
//                 selectedDate={selectedDate}
//                 dailySchedule={dailySchedule}
//             />

//             <MonthlySummaryModal
//                 isOpen={isMonthlyModalOpen}
//                 onClose={handleCloseMonthlyModal}
//                 monthData={selectedMonthSummary}
//             />
//         </div>
//     );
// };

// export default App;
