import React from "react";
import { motion } from 'framer-motion';
import { itemVariants } from "../../constants/animations";

const TopicCard = ({ item, colorTheme = "cyan" }) => {
  const getColorClasses = () => {
    switch (colorTheme) {
      case "cyan":
        return "hover:bg-gradient-to-br from-white/10 to-cyan-500/10 hover:border-cyan-400/30 hover:shadow-[0_0_20px_#00f2ff55]";
      case "blue":
        return "hover:bg-gradient-to-br from-white/10 to-blue-500/10 hover:border-blue-400/30 hover:shadow-[0_0_20px_#3b82f655]";
      default:
        return "hover:bg-gradient-to-br from-white/10 to-cyan-500/10 hover:border-cyan-400/30 hover:shadow-[0_0_20px_#00f2ff55]";
    }
  };

  return (
    <motion.div
      variants={itemVariants}
      className={`group flex items-center gap-3 p-4 rounded-2xl 
      border border-white/10 bg-white/5 backdrop-blur-lg
      ${getColorClasses()}
      hover:scale-[1.04] transition-all duration-300 text-white`}
    >
      <div className="text-xl group-hover:scale-110 transition-transform duration-300">
        {item.icon}
      </div>
      <span className="font-medium text-sm">{item.label}</span>
    </motion.div>
  );
};

export default TopicCard; 