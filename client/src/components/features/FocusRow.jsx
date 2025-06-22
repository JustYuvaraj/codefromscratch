import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaDatabase, FaServer, FaBrain, FaStar } from 'react-icons/fa';

const topics = [
    { id: 'data-structures', name: 'Data Structures', icon: <FaCode />, color: 'from-blue-500 to-cyan-500' },
    { id: 'algorithms', name: 'Algorithms', icon: <FaBrain />, color: 'from-purple-500 to-pink-500' },
    { id: 'frontend', name: 'Frontend', icon: <FaServer />, color: 'from-green-500 to-teal-500' },
    { id: 'backend', name: 'Backend', icon: <FaDatabase />, color: 'from-yellow-500 to-orange-500' },
    { id: 'full-stack', name: 'Full Stack', icon: <FaStar />, color: 'from-red-500 to-rose-500' },
];

const FocusRow = ({ onSelect = () => {}, selectedTopic = null }) => {
    return (
        <div className="flex justify-center items-center gap-4 flex-wrap">
            {topics.map((topic, index) => (
                <motion.button
                    key={topic.id}
                    onClick={() => onSelect(topic.id)}
                    className={`relative rounded-full px-6 py-3 text-lg font-semibold text-white transition-all duration-300 overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white
                        ${selectedTopic === topic.id ? 'shadow-lg' : 'shadow-md'}
                    `}
                    style={{
                        background: selectedTopic === topic.id ? `linear-gradient(45deg, var(--color-from), var(--color-to))` : '#1a1a2e',
                        '--color-from': `var(--color-${topic.color.split(' ')[0].replace('from-', '')})`,
                        '--color-to': `var(--color-${topic.color.split(' ')[1].replace('to-', '')})`,
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                >
                    <div className="flex items-center gap-3">
                        {topic.icon}
                        <span>{topic.name}</span>
                    </div>
                    {selectedTopic === topic.id && (
                        <motion.div
                            layoutId="underline"
                            className="absolute bottom-0 left-0 right-0 h-1 bg-white"
                        />
                    )}
                </motion.button>
            ))}
        </div>
    );
};

export default FocusRow;
