import React from "react";
import { motion } from 'framer-motion';
import AlgorithmsSection from "./AlgorithmsSection";
import DatabaseSection from "./DatabaseSection";
import DataStructuresSection from "./DataStructuresSection";
import OperatingSystemsSection from "./OperatingSystemsSection";
import FrontendSection from "./FrontendSection";
import DummyContent from "../ui/DummyContent";

export default function FlowCanvas({ selected }) {
  const renderContent = () => {
    switch (selected) {
      case "dsa":
        return <DataStructuresSection />;
      case "algo":
        return <AlgorithmsSection />;
      case "database":
      case "dbms":
        return <DatabaseSection />;
      case "os":
        return <OperatingSystemsSection />;
      case "frontend":
        return <FrontendSection />;
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
