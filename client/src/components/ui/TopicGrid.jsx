import React from "react";
import { motion } from 'framer-motion';
import { containerVariants } from "../../constants/animations";
import TopicCard from "./TopicCard";

const TopicGrid = ({ items, colorTheme = "cyan" }) => {
  return (
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {items.map((item, idx) => (
        <TopicCard key={idx} item={item} colorTheme={colorTheme} />
      ))}
    </motion.div>
  );
};

export default TopicGrid; 