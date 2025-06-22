import {
  FaDesktop,
  FaCogs,
  FaUsers,
  FaClock,
  FaLock,
  FaExclamationTriangle,
  FaMemory,
  FaHdd,
  FaFolder,
  FaDatabase,
  FaServer,
} from "react-icons/fa";
import { MdOutlineArchitecture, MdOutlineStorage } from "react-icons/md";
import { BiNetworkChart } from "react-icons/bi";

export const osList = [
  { label: "OS Architecture", icon: <MdOutlineArchitecture className="text-blue-400" /> },
  { label: "Process Management", icon: <FaCogs className="text-green-400" /> },
  { label: "Threading & Concurrency", icon: <FaUsers className="text-purple-400" /> },
  { label: "CPU Scheduling", icon: <FaClock className="text-cyan-400" /> },
  { label: "Process Synchronization", icon: <FaLock className="text-indigo-400" /> },
  { label: "Deadlock Handling", icon: <FaExclamationTriangle className="text-orange-400" /> },
  { label: "Memory Management", icon: <FaMemory className="text-pink-400" /> },
  { label: "Virtual Memory", icon: <BiNetworkChart className="text-teal-400" /> },
  { label: "File Systems", icon: <FaFolder className="text-yellow-400" /> },
  { label: "FS Implementation", icon: <FaDatabase className="text-lime-400" /> },
  { label: "Storage Management", icon: <FaServer className="text-fuchsia-400" /> },
]; 