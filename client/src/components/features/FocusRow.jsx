import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaDatabase, FaServer, FaBrain, FaStar } from 'react-icons/fa';

const topics = [
    { id: 'data-structures', name: 'Data Structures', icon: <FaCode />, color: 'text-blue-400', glow: 'shadow-[0_0_16px_4px_#60a5fa88]' },
    { id: 'algorithms', name: 'Algorithms', icon: <FaBrain />, color: 'text-purple-400', glow: 'shadow-[0_0_16px_4px_#a78bfa88]' },
    { id: 'frontend', name: 'Frontend', icon: <FaServer />, color: 'text-green-400', glow: 'shadow-[0_0_16px_4px_#34d39988]' },
    { id: 'backend', name: 'Backend', icon: <FaDatabase />, color: 'text-yellow-400', glow: 'shadow-[0_0_16px_4px_#fde04788]' },
    { id: 'full-stack', name: 'Full Stack', icon: <FaStar />, color: 'text-red-400', glow: 'shadow-[0_0_16px_4px_#f8717188]' },
];

const FocusRow = ({ onSelect = () => {}, selectedTopic = null }) => {
    return (
        <div className="flex justify-center items-center gap-5 flex-wrap">
            {topics.map((topic, index) => (
                <motion.button
                    key={topic.id}
                    onClick={() => onSelect(topic.id)}
                    className={`rounded-2xl border px-6 py-3 text-base font-semibold transition-all duration-300 backdrop-blur-lg relative overflow-hidden
                        ${selectedTopic === topic.id
                            ? `border-blue-400 bg-blue-400/20 text-white ${topic.glow} shadow-lg`
                            : 'border-white/10 bg-white/10 text-white/80 hover:border-white/20 hover:bg-white/20 hover:text-white hover:shadow-lg'}
                    `}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.07 }}
                    whileTap={{ scale: 0.97 }}
                >
                    <div className="flex items-center gap-2">
                        <span className={`${topic.color} text-xl transition-all duration-300`}>{topic.icon}</span>
                        <span className="transition-all duration-300 font-bold tracking-tight">{topic.name}</span>
                    </div>
                    {selectedTopic === topic.id && (
                        <motion.div
                            layoutId="focus-glow"
                            className={`absolute inset-0 rounded-2xl pointer-events-none ${topic.glow}`}
                            style={{ zIndex: 0, opacity: 0.5 }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        />
                    )}
                </motion.button>
            ))}
        </div>
    );
};

export default FocusRow;
