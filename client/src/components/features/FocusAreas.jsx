import React from 'react';
import { motion } from 'framer-motion';
import FocusRow from './FocusRow';

const FocusAreas = ({ onSelect, selectedTopic }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="bg-gradient-to-br from-[#0b0c1a] via-[#0f111f] to-[#101118] 
        rounded-3xl border border-[#2c2c3a] shadow-[0_0_40px_#00f2ff22] p-8"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">🎯 Choose Your Focus Area</h2>
        <p className="text-white/70">Select a topic to explore interactive learning paths and visualizations</p>
      </div>
      <FocusRow onSelect={onSelect} selectedTopic={selectedTopic} />
    </motion.div>
  );
};

export default FocusAreas;
