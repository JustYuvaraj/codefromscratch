import React, { useState } from "react";
import {
  FaServer,
  FaChartBar,
  FaList,
  FaStream,
  FaTree,
  FaSortAmountDown,
  FaSearch,
  FaCodeBranch,
} from "react-icons/fa";
import { GrReactjs } from "react-icons/gr";
import { GoDatabase } from "react-icons/go";
import { FcLinux } from "react-icons/fc";
import { GiBinaryTree, GiHeap, GiStoneStack } from "react-icons/gi";
import { SiGraphql } from "react-icons/si";
import { MdOutlineFunctions } from "react-icons/md";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMemory, faChartLine, faGlobe } from "@fortawesome/free-solid-svg-icons";

// Custom icons
import ArrayIcon from "./ArrayIcon";
import LinkedListIcon from "./LinkedListIcon";

const FocusAreas = () => {
  const [selected, setSelected] = useState(null);

  const items = [
    {
      id: "dsa",
      label: "Data Structures",
      icon: <FontAwesomeIcon icon={faMemory} />,
      color: "text-green-400",
    },
    {
      id: "algo",
      label: "Algorithms",
      icon: <FontAwesomeIcon icon={faChartLine} />,
      color: "text-yellow-400",
    },
    {
      id: "dbms",
      label: "DBMS",
      icon: <GoDatabase />,
      color: "text-blue-400",
    },
    {
      id: "os",
      label: "Operating System",
      icon: <FcLinux />,
      color: "",
    },
    {
      id: "networking",
      label: "Networking",
      icon: <FontAwesomeIcon icon={faGlobe} />,
      color: "text-teal-400",
    },
    {
      id: "frontend",
      label: "Frontend",
      icon: <GrReactjs />,
      color: "text-cyan-400",
    },
    {
      id: "backend",
      label: "Backend",
      icon: <FaServer />,
      color: "text-purple-400",
    },
    {
      id: "system-design",
      label: "System Design",
      icon: <FaChartBar />,
      color: "text-pink-400",
    },
  ];

  const dataStructuresList = [
    { label: "The Big O Notation", icon: <FaSortAmountDown /> },
    { label: "Arrays", icon: <ArrayIcon /> },
    { label: "Linked Lists", icon: <LinkedListIcon /> },
    { label: "Stacks", icon: <GiStoneStack /> },
    { label: "Queues", icon: <FaStream /> },
    { label: "Binary Trees", icon: <GiBinaryTree /> },
    { label: "AVL Trees", icon: <FaTree /> },
    { label: "Heaps", icon: <GiHeap /> },
    { label: "Tries", icon: <MdOutlineFunctions /> },
    { label: "Graphs", icon: <SiGraphql /> },
    { label: "Undirected Graphs", icon: <FaCodeBranch /> },
    { label: "Sorting Algorithms", icon: <FaSortAmountDown /> },
    { label: "Searching Algorithms", icon: <FaSearch /> },
    { label: "String Manipulation Algorithms", icon: <FaList /> },
  ];

  const renderCanvasContent = () => {
    if (!selected) return null;

    if (selected === "dsa") {
      return (
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 p-6 rounded-xl bg-[#121212] border border-gray-700 shadow-lg max-w-4xl mx-auto">
          {dataStructuresList.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 p-3 rounded-xl bg-white/5 backdrop-blur border border-white/10 shadow-md text-white"
            >
              <div className="text-xl">{item.icon}</div>
              <span className="font-medium text-sm">{item.label}</span>
            </div>
          ))}
        </div>
      );
    }

    const selectedItem = items.find((item) => item.id === selected);
    return (
      <div className="mt-10 p-6 rounded-xl bg-[#121212] border border-gray-700 shadow-lg max-w-2xl mx-auto text-center">
        <h2 className="text-2xl font-semibold text-white mb-2">
          {selectedItem.label}
        </h2>
        <p className="text-gray-400 text-sm">
          This is where you can show content related to{" "}
          <strong>{selectedItem.label}</strong>.
        </p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#111] via-[#1e1e1e] to-[#222] text-white flex flex-col items-center justify-start px-4 py-12 font-sans">
      <h1 className="text-3xl font-bold mb-8 text-white tracking-wide drop-shadow-lg">
        🚀 Core Focus Areas
      </h1>

      <div className="flex flex-wrap justify-center gap-4 max-w-3xl">
        {items.map(({ id, label, icon, color }) => (
          <div
            key={id}
            onClick={() => setSelected(id)}
            className={`
              relative group cursor-pointer
              flex items-center gap-2 px-4 py-2 rounded-lg backdrop-blur-sm
              bg-white/5 border border-white/10 hover:border-white/20
              hover:shadow-xl hover:scale-105 transition-all duration-300
              text-sm
            `}
          >
            <div className="absolute -inset-1 z-0 rounded-lg bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-10 blur-xl transition-all duration-500" />

            <span className={`text-lg ${color} group-hover:animate-pulse z-10`}>
              {icon}
            </span>
            <span className="text-white font-medium z-10">{label}</span>
          </div>
        ))}
      </div>

      {renderCanvasContent()}
    </div>
  );
};

export default FocusAreas;
