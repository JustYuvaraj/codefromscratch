export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

export const itemVariants = {
  hidden: { y: 20, opacity: 0, scale: 0.8 },
  visible: { y: 0, opacity: 1, scale: 1 },
}; 