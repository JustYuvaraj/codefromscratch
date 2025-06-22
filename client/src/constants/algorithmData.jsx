import {
  FaSort,
  FaSearch,
  FaKey,
  FaCalculator,
  FaList,
} from "react-icons/fa";
import {
  GiTreasureMap,
  GiPathDistance,
} from "react-icons/gi";
import { MdOutlineLoop, MdOutlineMemory } from "react-icons/md";
import { TbBinaryTree, TbWindow } from "react-icons/tb";
import { CgArrowLongRightR, CgArrowsBreakeV } from "react-icons/cg";
import { BsArrowLeftRight, BsBack } from "react-icons/bs";
import { BiBrain, BiNetworkChart } from "react-icons/bi";
import { FaCodeBranch } from "react-icons/fa";

export const algorithmsList = [
  { label: "Sorting", icon: <FaSort className="text-green-400" /> },
  { label: "Searching", icon: <FaSearch className="text-blue-400" /> },
  { label: "String Manipulation", icon: <FaList className="text-orange-400" /> },
  { label: "Two Pointers", icon: <BsArrowLeftRight className="text-cyan-400" /> },
  { label: "Sliding Window", icon: <TbWindow className="text-indigo-400" /> },
  { label: "Recursion", icon: <MdOutlineLoop className="text-orange-400" /> },
  { label: "Backtracking", icon: <BsBack className="text-lime-400" /> },
  { label: "Hashing", icon: <FaKey className="text-rose-400" /> },
  { label: "Bit Manipulation", icon: <FaCodeBranch className="text-sky-400" /> },
  { label: "Mathematical", icon: <FaCalculator className="text-violet-400" /> },
  { label: "Tree Traversal", icon: <TbBinaryTree className="text-emerald-400" /> },
  { label: "Graph Traversal", icon: <BiNetworkChart className="text-teal-400" /> },
  { label: "Shortest Path", icon: <GiPathDistance className="text-fuchsia-400" /> },
  { label: "Greedy", icon: <GiTreasureMap className="text-yellow-400" /> },
  { label: "Dynamic Programming", icon: <BiBrain className="text-pink-400" /> },
  { label: "Memoization", icon: <MdOutlineMemory className="text-purple-400" /> },
]; 