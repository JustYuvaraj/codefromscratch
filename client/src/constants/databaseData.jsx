import {
  FaDatabase,
  FaTable,
  FaProjectDiagram,
  FaSearch,
  FaEye,
  FaShieldAlt,
  FaCogs,
  FaLink,
  FaChartBar,
  FaFilter,
  FaEdit,
  FaCodeBranch,
  FaSave,
  FaKey,
  FaList,
  FaCode,
  FaClock,
  FaLock,
} from "react-icons/fa";
import { MdOutlineFunctions, MdOutlineStorage, MdOutlineSecurity } from "react-icons/md";
import { BiData } from "react-icons/bi";

export const databaseList = [
  { label: "Relational Databases", icon: <FaDatabase className="text-blue-400" /> },
  { label: "Data Types", icon: <BiData className="text-green-400" /> },
  { label: "Schema Design", icon: <FaProjectDiagram className="text-purple-400" /> },
  { label: "SELECT Queries", icon: <FaSearch className="text-cyan-400" /> },
  { label: "Retrieving Data", icon: <FaEye className="text-indigo-400" /> },
  { label: "Filtering Data", icon: <FaFilter className="text-orange-400" /> },
  { label: "CRUD Operations", icon: <FaEdit className="text-pink-400" /> },
  { label: "Joins & Subqueries", icon: <FaLink className="text-teal-400" /> },
  { label: "Aggregation & Sorting", icon: <FaChartBar className="text-yellow-400" /> },
  { label: "Built-in Functions", icon: <MdOutlineFunctions className="text-lime-400" /> },
  { label: "Views", icon: <FaEye className="text-emerald-400" /> },
  { label: "Complex Queries", icon: <FaCode className="text-fuchsia-400" /> },
  { label: "Stored Procedures", icon: <FaSave className="text-rose-400" /> },
  { label: "Triggers & Events", icon: <FaClock className="text-sky-400" /> },
  { label: "Transactions", icon: <FaDatabase className="text-violet-400" /> },
  { label: "Indexing", icon: <FaKey className="text-red-400" /> },
  { label: "Security", icon: <FaLock className="text-gray-400" /> },
]; 