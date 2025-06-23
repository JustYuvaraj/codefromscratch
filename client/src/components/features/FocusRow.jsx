import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaDatabase, FaServer, FaBrain, FaStar } from 'react-icons/fa';

const topics = [
    { id: 'data-structures', name: 'Data Structures', icon: <FaCode />, color: 'text-blue-400' },
    { id: 'algorithms', name: 'Algorithms', icon: <FaBrain />, color: 'text-purple-400' },
    { id: 'frontend', name: 'Frontend', icon: <FaServer />, color: 'text-green-400' },
    { id: 'backend', name: 'Backend', icon: <FaDatabase />, color: 'text-yellow-400' },
    { id: 'full-stack', name: 'Full Stack', icon: <FaStar />, color: 'text-red-400' },
];

const FocusRow = ({ onSelect = () => {}, selectedTopic = null }) => {
    return (
        <div className="flex justify-center items-center gap-4 flex-wrap">
            {topics.map((topic, index) => (
                <motion.button
                    key={topic.id}
                    onClick={() => onSelect(topic.id)}
                    className={`rounded-full border px-5 py-2 text-base font-semibold transition-all duration-300 ${
                        selectedTopic === topic.id
                            ? 'border-blue-400 bg-blue-400/10 text-white shadow-[0_0_20px_#3b82f655]'
                            : 'border-white/10 bg-white/5 text-white/80 hover:border-white/20 hover:bg-white/10 hover:text-white'
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                >
                    <div className="flex items-center gap-2">
                        <span className={topic.color}>{topic.icon}</span>
                        <span>{topic.name}</span>
                    </div>
                </motion.button>
            ))}
        </div>
    );
};

export default FocusRow;
