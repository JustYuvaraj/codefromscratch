import React from 'react';
import { motion } from 'framer-motion';
import FocusRow from './FocusRow';

const circleColors = [
  { color: 'bg-green-400', glow: 'shadow-[0_0_16px_4px_#22c55e88]', label: 'Learn' },
  { color: 'bg-yellow-400', glow: 'shadow-[0_0_16px_4px_#fde04788]', label: 'Code' },
  { color: 'bg-blue-400', glow: 'shadow-[0_0_16px_4px_#60a5fa88]', label: 'Visualize' },
  { color: 'bg-red-400', glow: 'shadow-[0_0_16px_4px_#f8717188]', label: 'Build' },
];

const FocusAreas = ({ onSelect, selectedTopic }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl px-8 py-8 mx-auto w-full max-w-2xl"
      style={{ boxShadow: '0 8px 40px 0 rgba(0,0,0,0.25)' }}
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-white mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.25)] tracking-tight">
          🎯 Choose Your Focus Area
        </h2>
        {/* Animated, glowing colored circles */}
        <div className="flex justify-center items-end gap-6 mb-5">
          {circleColors.map((c, i) => (
            <motion.div
              key={c.label}
              className={`flex flex-col items-center`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.15 }}
            >
              <motion.div
                className={`w-7 h-7 ${c.color} ${c.glow} rounded-full animate-pulse mb-1`}
                animate={{
                  scale: [1, 1.2, 1],
                  boxShadow: [
                    '0 0 16px 4px rgba(0,0,0,0.15)',
                    `0 0 32px 8px ${c.color.replace('bg-', '').replace('-400', '')}55`,
                    '0 0 16px 4px rgba(0,0,0,0.15)'
                  ],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5 + i * 0.2,
                  ease: 'easeInOut',
                }}
              ></motion.div>
              <span className="text-xs text-white/70 mt-1 select-none">{c.label}</span>
            </motion.div>
          ))}
        </div>
        <p className="text-white/80 text-base font-medium drop-shadow-sm">
          Select a topic to explore interactive learning paths and visualizations
        </p>
      </div>
      <FocusRow onSelect={onSelect} selectedTopic={selectedTopic} />
    </motion.div>
  );
};

export default FocusAreas;
