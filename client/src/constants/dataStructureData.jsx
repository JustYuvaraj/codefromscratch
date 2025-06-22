import {
  FaSortAmountDown,
  FaSearch,
  FaCodeBranch,
  FaList,
  FaStream,
  FaTree,
  FaTable,
  FaNetworkWired,
} from "react-icons/fa";
import {
  GiStoneStack,
  GiTreeBranch,
  GiMineWagon,
} from "react-icons/gi";
import { SiGraphql } from "react-icons/si";
import { MdOutlineFunctions } from "react-icons/md";
import { BiHash } from "react-icons/bi";
import ArrayIcon from "../components/ui/ArrayIcon";
import LinkedListIcon from "../components/ui/LinkedListIcon";

export const dataStructuresList = [
  { label: "The Big O Notation", icon: <FaSortAmountDown className="text-pink-400" /> },
  { label: "Arrays", icon: <ArrayIcon className="text-yellow-400" /> },
  { label: "Linked Lists", icon: <LinkedListIcon className="text-orange-400" /> },
  { label: "Stacks", icon: <GiStoneStack className="text-red-400" /> },
  { label: "Queues", icon: <FaStream className="text-blue-400" /> },
  { label: "Hash Tables", icon: <BiHash className="text-sky-400" /> },
  { label: "Sets", icon: <FaTable className="text-rose-400" /> },
  { label: "Maps", icon: <FaNetworkWired className="text-emerald-400" /> },
  { label: "Binary Trees", icon: <GiTreeBranch className="text-green-400" /> },
  { label: "AVL Trees", icon: <FaTree className="text-lime-400" /> },
  { label: "Heaps", icon: <GiMineWagon className="text-cyan-400" /> },
  { label: "Tries", icon: <MdOutlineFunctions className="text-indigo-400" /> },
  { label: "Graphs", icon: <SiGraphql className="text-purple-400" /> },
  { label: "Undirected Graphs", icon: <FaCodeBranch className="text-fuchsia-400" /> },
]; 