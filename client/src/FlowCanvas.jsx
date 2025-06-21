import React from "react";
import { motion } from 'framer-motion';
import {
  FaList,
  FaStream,
  FaTree,
  FaSortAmountDown,
  FaSearch,
  FaCodeBranch,
  FaSort,
  FaRoute,
  FaProjectDiagram,
  FaSitemap,
  FaKey,
  FaCalculator,
  FaDatabase,
  FaTable,
  FaEye,
  FaShieldAlt,
  FaCogs,
  FaLink,
  FaChartBar,
  FaFilter,
  FaEdit,
  FaPlus,
  FaTrash,
  FaSave,
  FaLock,
} from "react-icons/fa";
import {
  GiStoneStack,
  GiTreeBranch,
  GiMineWagon,
  GiTreasureMap,
  GiTwoCoins,
  GiPathDistance,
  GiNetworkBars,
  GiHamburgerMenu,
  GiCrystalBall,
} from "react-icons/gi";
import { SiGraphql } from "react-icons/si";
import { MdOutlineFunctions, MdOutlineLoop, MdOutlineMemory } from "react-icons/md";
import { TbBinaryTree, TbLayoutList, TbWindow, TbArrowsRightLeft, TbRoute } from "react-icons/tb";
import { CgArrowLongRightR, CgArrowsBreakeV } from "react-icons/cg";
import { BsSortAlphaDown, BsSearch, BsBack, BsArrowLeftRight } from "react-icons/bs";
import { BiBrain, BiNetworkChart } from "react-icons/bi";
import { IoGitNetworkOutline } from "react-icons/io5";
import ArrayIcon from "./ArrayIcon";
import LinkedListIcon from "./LinkedListIcon";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0, scale: 0.8 },
  visible: { y: 0, opacity: 1, scale: 1 },
};

const DummyContent = ({ title }) => (
  <div className="text-white">
    <h2 className="text-2xl font-bold mb-6 capitalize text-center">{title.replace("-", " ")}</h2>
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="bg-white/5 p-4 rounded-lg animate-pulse h-12 w-full" />
      ))}
    </div>
     <p className="text-center text-gray-400 mt-8">Content coming soon...</p>
  </div>
);

const dataStructuresList = [
  { label: "The Big O Notation", icon: <FaSortAmountDown className="text-pink-400" /> },
  { label: "Arrays", icon: <ArrayIcon className="text-yellow-400" /> },
  { label: "Linked Lists", icon: <LinkedListIcon className="text-orange-400" /> },
  { label: "Stacks", icon: <GiStoneStack className="text-red-400" /> },
  { label: "Queues", icon: <FaStream className="text-blue-400" /> },
  { label: "Binary Trees", icon: <GiTreeBranch className="text-green-400" /> },
  { label: "AVL Trees", icon: <FaTree className="text-lime-400" /> },
  { label: "Heaps", icon: <GiMineWagon className="text-cyan-400" /> },
  { label: "Tries", icon: <MdOutlineFunctions className="text-indigo-400" /> },
  { label: "Graphs", icon: <SiGraphql className="text-purple-400" /> },
  { label: "Undirected Graphs", icon: <FaCodeBranch className="text-fuchsia-400" /> },
  { label: "Searching Algorithms", icon: <FaSearch className="text-sky-400" /> },
  { label: "String Manipulation Algorithms", icon: <FaList className="text-rose-400" /> },
];

const algorithmsList = [
  { label: "Sorting", icon: <FaSort className="text-green-400" /> },
  { label: "Searching", icon: <FaSearch className="text-blue-400" /> },
  { label: "Two Pointers", icon: <BsArrowLeftRight className="text-cyan-400" /> },
  { label: "Sliding Window", icon: <TbWindow className="text-indigo-400" /> },
  { label: "Recursion", icon: <MdOutlineLoop className="text-orange-400" /> },
  { label: "Backtracking", icon: <BsBack className="text-lime-400" /> },
  { label: "Greedy", icon: <GiTreasureMap className="text-yellow-400" /> },
  { label: "Dynamic Programming", icon: <BiBrain className="text-pink-400" /> },
  { label: "Memoization", icon: <MdOutlineMemory className="text-purple-400" /> },
  { label: "Graph Traversal", icon: <BiNetworkChart className="text-teal-400" /> },
  { label: "Shortest Path", icon: <GiPathDistance className="text-fuchsia-400" /> },
  { label: "Tree Traversal", icon: <TbBinaryTree className="text-emerald-400" /> },
  { label: "Hashing", icon: <FaKey className="text-rose-400" /> },
  { label: "Bit Manipulation", icon: <FaCodeBranch className="text-sky-400" /> },
  { label: "Mathematical", icon: <FaCalculator className="text-violet-400" /> },
];

const databaseList = [
  { label: "Relational Databases", icon: <FaDatabase className="text-blue-400" /> },
  { label: "Data Types", icon: <FaTable className="text-green-400" /> },
  { label: "Schema Design", icon: <FaProjectDiagram className="text-purple-400" /> },
  { label: "SELECT Queries", icon: <FaSearch className="text-cyan-400" /> },
  { label: "Retrieving Data", icon: <FaEye className="text-indigo-400" /> },
  { label: "Filtering Data", icon: <FaFilter className="text-orange-400" /> },
  { label: "CRUD Operations", icon: <FaEdit className="text-pink-400" /> },
  { label: "Joins & Subqueries", icon: <FaLink className="text-teal-400" /> },
  { label: "Aggregation & Sorting", icon: <FaChartBar className="text-yellow-400" /> },
  { label: "Built-in Functions", icon: <FaCogs className="text-lime-400" /> },
  { label: "Views", icon: <FaEye className="text-emerald-400" /> },
  { label: "Complex Queries", icon: <FaCodeBranch className="text-fuchsia-400" /> },
  { label: "Stored Procedures", icon: <FaSave className="text-rose-400" /> },
  { label: "Triggers & Events", icon: <FaCogs className="text-sky-400" /> },
  { label: "Transactions", icon: <FaDatabase className="text-violet-400" /> },
  { label: "Indexing", icon: <FaKey className="text-red-400" /> },
  { label: "Security", icon: <FaShieldAlt className="text-gray-400" /> },
];

export default function FlowCanvas({ selected }) {
  const renderContent = () => {
    switch (selected) {
      case "dsa":
        return (
          <>
            <h2 className="text-center text-2xl font-bold text-white mb-8">
              🧠 Data Structures Explorer
            </h2>
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {dataStructuresList.map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="group flex items-center gap-3 p-4 rounded-2xl 
                  border border-white/10 bg-white/5 backdrop-blur-lg
                  hover:bg-gradient-to-br from-white/10 to-cyan-500/10
                  hover:border-cyan-400/30 hover:shadow-[0_0_20px_#00f2ff55]
                  hover:scale-[1.04] transition-all duration-300 text-white"
                >
                  <div className="text-xl group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <span className="font-medium text-sm">{item.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </>
        );
      case "algo":
        return (
          <>
            <h2 className="text-center text-2xl font-bold text-white mb-8">
              ⚡ Essential Algorithms
            </h2>
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {algorithmsList.map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="group flex items-center gap-3 p-4 rounded-2xl 
                  border border-white/10 bg-white/5 backdrop-blur-lg
                  hover:bg-gradient-to-br from-white/10 to-cyan-500/10
                  hover:border-cyan-400/30 hover:shadow-[0_0_20px_#00f2ff55]
                  hover:scale-[1.04] transition-all duration-300 text-white"
                >
                  <div className="text-xl group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <span className="font-medium text-sm">{item.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </>
        );
      case "database":
        return (
          <>
            <h2 className="text-center text-2xl font-bold text-white mb-8">
              🗄️ Database Management Systems
            </h2>
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {databaseList.map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="group flex items-center gap-3 p-4 rounded-2xl 
                  border border-white/10 bg-white/5 backdrop-blur-lg
                  hover:bg-gradient-to-br from-white/10 to-blue-500/10
                  hover:border-blue-400/30 hover:shadow-[0_0_20px_#3b82f655]
                  hover:scale-[1.04] transition-all duration-300 text-white"
                >
                  <div className="text-xl group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <span className="font-medium text-sm">{item.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </>
        );
      default:
        return <DummyContent title={selected} />;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative w-full max-w-6xl mx-auto px-6 py-12 min-h-[80vh] 
      bg-gradient-to-br from-[#0b0c1a] via-[#0f111f] to-[#101118] 
      rounded-3xl border border-[#2c2c3a] shadow-[0_0_40px_#00f2ff22] 
      overflow-y-auto">

      {renderContent()}
    </motion.div>
  );
}
