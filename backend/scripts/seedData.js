const mongoose = require('mongoose');
const Topic = require('../models/Topic');
const Problem = require('../models/Problem');
require('dotenv').config();

// Sample topics data
const topicsData = [
  // Data Structures
  {
    name: "Arrays",
    category: "data-structures",
    icon: "ArrayIcon",
    color: "text-yellow-400",
    description: "Linear data structure for storing elements",
    difficulty: "beginner",
    order: 1
  },
  {
    name: "Linked Lists",
    category: "data-structures",
    icon: "LinkedListIcon",
    color: "text-orange-400",
    description: "Linear data structure with nodes pointing to next element",
    difficulty: "beginner",
    order: 2
  },
  {
    name: "Stacks",
    category: "data-structures",
    icon: "GiStoneStack",
    color: "text-red-400",
    description: "LIFO data structure",
    difficulty: "beginner",
    order: 3
  },
  {
    name: "Queues",
    category: "data-structures",
    icon: "FaStream",
    color: "text-blue-400",
    description: "FIFO data structure",
    difficulty: "beginner",
    order: 4
  },
  {
    name: "Hash Tables",
    category: "data-structures",
    icon: "BiHash",
    color: "text-sky-400",
    description: "Key-value pair data structure",
    difficulty: "intermediate",
    order: 5
  },
  {
    name: "Binary Trees",
    category: "data-structures",
    icon: "GiTreeBranch",
    color: "text-green-400",
    description: "Hierarchical data structure",
    difficulty: "intermediate",
    order: 6
  },
  {
    name: "Graphs",
    category: "data-structures",
    icon: "SiGraphql",
    color: "text-purple-400",
    description: "Non-linear data structure with vertices and edges",
    difficulty: "advanced",
    order: 7
  },

  // Algorithms
  {
    name: "Sorting",
    category: "algorithms",
    icon: "FaSort",
    color: "text-green-400",
    description: "Algorithms to arrange elements in order",
    difficulty: "beginner",
    order: 1
  },
  {
    name: "Searching",
    category: "algorithms",
    icon: "FaSearch",
    color: "text-blue-400",
    description: "Algorithms to find elements in data structures",
    difficulty: "beginner",
    order: 2
  },
  {
    name: "Two Pointers",
    category: "algorithms",
    icon: "BsArrowLeftRight",
    color: "text-cyan-400",
    description: "Technique using two pointers to solve problems",
    difficulty: "intermediate",
    order: 3
  },
  {
    name: "Sliding Window",
    category: "algorithms",
    icon: "TbWindow",
    color: "text-indigo-400",
    description: "Technique for solving subarray/substring problems",
    difficulty: "intermediate",
    order: 4
  },
  {
    name: "Dynamic Programming",
    category: "algorithms",
    icon: "BiBrain",
    color: "text-pink-400",
    description: "Optimization technique using memoization",
    difficulty: "advanced",
    order: 5
  },

  // Frontend
  {
    name: "HTML Fundamentals",
    category: "frontend",
    icon: "FaHtml5",
    color: "text-orange-500",
    description: "Semantic HTML and web fundamentals",
    difficulty: "beginner",
    order: 1
  },
  {
    name: "CSS & Styling",
    category: "frontend",
    icon: "FaCss3Alt",
    color: "text-blue-500",
    description: "CSS layouts, Flexbox, Grid, and styling",
    difficulty: "beginner",
    order: 2
  },
  {
    name: "JavaScript",
    category: "frontend",
    icon: "FaJs",
    color: "text-yellow-400",
    description: "JavaScript programming fundamentals",
    difficulty: "intermediate",
    order: 3
  },
  {
    name: "React",
    category: "frontend",
    icon: "FaReact",
    color: "text-cyan-400",
    description: "React framework and ecosystem",
    difficulty: "intermediate",
    order: 4
  },

  // Database
  {
    name: "SQL Fundamentals",
    category: "database",
    icon: "FaDatabase",
    color: "text-blue-400",
    description: "Relational database concepts and SQL",
    difficulty: "beginner",
    order: 1
  },
  {
    name: "Database Design",
    category: "database",
    icon: "FaProjectDiagram",
    color: "text-purple-400",
    description: "Schema design and normalization",
    difficulty: "intermediate",
    order: 2
  },
  {
    name: "Advanced Queries",
    category: "database",
    icon: "FaCode",
    color: "text-fuchsia-400",
    description: "Complex queries, joins, and optimization",
    difficulty: "advanced",
    order: 3
  },

  // Operating Systems
  {
    name: "Process Management",
    category: "operating-systems",
    icon: "FaCogs",
    color: "text-green-400",
    description: "Process creation, scheduling, and management",
    difficulty: "intermediate",
    order: 1
  },
  {
    name: "Memory Management",
    category: "operating-systems",
    icon: "FaMemory",
    color: "text-pink-400",
    description: "Memory allocation, paging, and virtual memory",
    difficulty: "advanced",
    order: 2
  },
  {
    name: "File Systems",
    category: "operating-systems",
    icon: "FaFolder",
    color: "text-yellow-400",
    description: "File system implementation and management",
    difficulty: "intermediate",
    order: 3
  }
];

// Sample problems data (first 20 problems from your JSON)
const problemsData = [
  {
    leetcodeNumber: 1,
    name: "Two Sum",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/two-sum/",
    tags: ["Array", "Hash Table"],
    companies: ["Google", "Amazon", "Meta", "Apple", "Netflix"],
    concept: "Hash Map basics",
    buildsOn: "None - Foundation problem",
    successRate: 95,
    whyImportant: "Most asked problem in FAANG interviews",
    dayNumber: 1,
    weekNumber: 1,
    topic: "Array Basics - Hash Map Foundation"
  },
  {
    leetcodeNumber: 217,
    name: "Contains Duplicate",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/contains-duplicate/",
    tags: ["Array", "Hash Table"],
    companies: ["Google", "Amazon", "Meta"],
    concept: "Hash Map usage",
    buildsOn: "Uses hash map concept from Two Sum",
    successRate: 92,
    whyImportant: "Tests basic hash map operations",
    dayNumber: 1,
    weekNumber: 1,
    topic: "Array Basics - Hash Map Foundation"
  },
  {
    leetcodeNumber: 242,
    name: "Valid Anagram",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/valid-anagram/",
    tags: ["String", "Hash Table"],
    companies: ["Google", "Amazon", "Meta"],
    concept: "Hash Map with character counting",
    buildsOn: "Uses hash map counting from Contains Duplicate",
    successRate: 90,
    whyImportant: "String manipulation with hash maps",
    dayNumber: 1,
    weekNumber: 1,
    topic: "Array Basics - Hash Map Foundation"
  },
  {
    leetcodeNumber: 387,
    name: "First Unique Character in a String",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/first-unique-character-in-a-string/",
    tags: ["String", "Hash Table"],
    companies: ["Google", "Amazon", "Meta"],
    concept: "Hash Map with character frequency",
    buildsOn: "Uses character counting from Valid Anagram",
    successRate: 88,
    whyImportant: "Character frequency analysis",
    dayNumber: 1,
    weekNumber: 1,
    topic: "Array Basics - Hash Map Foundation"
  },
  {
    leetcodeNumber: 350,
    name: "Intersection of Two Arrays II",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/intersection-of-two-arrays-ii/",
    tags: ["Array", "Hash Table"],
    companies: ["Google", "Amazon", "Meta"],
    concept: "Hash Map with array intersection",
    buildsOn: "Uses hash map operations from all previous problems",
    successRate: 85,
    whyImportant: "Array intersection with hash maps",
    dayNumber: 1,
    weekNumber: 1,
    topic: "Array Basics - Hash Map Foundation"
  },
  {
    leetcodeNumber: 167,
    name: "Two Sum II - Input Array Is Sorted",
    difficulty: "Easy",
    link: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/",
    tags: ["Array", "Two Pointers"],
    companies: ["Google", "Amazon", "Meta"],
    concept: "Two pointers with sorted array",
    buildsOn: "Builds on Two Sum but uses sorted array advantage",
    successRate: 90,
    whyImportant: "Two pointers technique foundation",
    dayNumber: 2,
    weekNumber: 1,
    topic: "Two Pointers - Building on Hash Maps"
  },
  {
    leetcodeNumber: 15,
    name: "3Sum",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/3sum/",
    tags: ["Array", "Two Pointers"],
    companies: ["Google", "Amazon", "Meta", "Apple"],
    concept: "Two pointers with additional complexity",
    buildsOn: "Uses two pointers from Two Sum II with extra loop",
    successRate: 75,
    whyImportant: "Complex two pointers application",
    dayNumber: 2,
    weekNumber: 1,
    topic: "Two Pointers - Building on Hash Maps"
  },
  {
    leetcodeNumber: 18,
    name: "4Sum",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/4sum/",
    tags: ["Array", "Two Pointers"],
    companies: ["Google", "Meta"],
    concept: "Two pointers with more optimization",
    buildsOn: "Builds on 3Sum with additional complexity",
    successRate: 70,
    whyImportant: "Advanced two pointers optimization",
    dayNumber: 2,
    weekNumber: 1,
    topic: "Two Pointers - Building on Hash Maps"
  },
  {
    leetcodeNumber: 11,
    name: "Container With Most Water",
    difficulty: "Medium",
    link: "https://leetcode.com/problems/container-with-most-water/",
    tags: ["Array", "Two Pointers"],
    companies: ["Google", "Amazon", "Meta", "Apple"],
    concept: "Two pointers for area calculation",
    buildsOn: "Uses two pointers concept from previous problems",
    successRate: 80,
    whyImportant: "Two pointers for optimization problems",
    dayNumber: 2,
    weekNumber: 1,
    topic: "Two Pointers - Building on Hash Maps"
  },
  {
    leetcodeNumber: 42,
    name: "Trapping Rain Water",
    difficulty: "Hard",
    link: "https://leetcode.com/problems/trapping-rain-water/",
    tags: ["Array", "Two Pointers"],
    companies: ["Google", "Amazon", "Meta"],
    concept: "Two pointers with water trapping",
    buildsOn: "Builds on container concept from previous problem",
    successRate: 65,
    whyImportant: "Advanced two pointers application",
    dayNumber: 2,
    weekNumber: 1,
    topic: "Two Pointers - Building on Hash Maps"
  }
];

async function seedData() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Topic.deleteMany({});
    await Problem.deleteMany({});
    console.log('🗑️ Cleared existing data');

    // Insert topics
    const topics = await Topic.insertMany(topicsData);
    console.log(`✅ Inserted ${topics.length} topics`);

    // Insert problems
    const problems = await Problem.insertMany(problemsData);
    console.log(`✅ Inserted ${problems.length} problems`);

    console.log('🎉 Database seeded successfully!');
    process.exit(0);

  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
}

// Run the seeding function
seedData(); 