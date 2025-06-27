import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaJs, FaJava, FaPython, FaBookOpen, FaLayerGroup, FaList, FaChartBar, FaSitemap, FaSearch, FaTree, FaProjectDiagram, FaCubes, FaPuzzlePiece, FaRocket
} from 'react-icons/fa';

// Node data for the roadmap (simplified for clarity, can be expanded for full detail)
const nodes = [
  // Languages
  { id: 'js', label: 'JavaScript', icon: <FaJs className="text-yellow-400" />, x: 100, y: 60, color: 'text-yellow-400' },
  { id: 'java', label: 'Java', icon: <FaJava className="text-blue-400" />, x: 100, y: 160, color: 'text-blue-400' },
  { id: 'python', label: 'Python', icon: <FaPython className="text-green-400" />, x: 100, y: 260, color: 'text-green-400' },
  // Programming Fundamentals
  { id: 'fundamentals', label: 'Programming Fundamentals', icon: <FaBookOpen className="text-purple-400" />, x: 300, y: 160, color: 'text-purple-400' },
  // Data Structures Intro
  { id: 'ds_intro', label: 'What are Data Structures?', icon: <FaLayerGroup className="text-blue-400" />, x: 500, y: 60, color: 'text-blue-400' },
  { id: 'ds_types', label: 'Why Data Structures?', icon: <FaLayerGroup className="text-blue-400" />, x: 500, y: 160, color: 'text-blue-400' },
  { id: 'ds_basics', label: 'Basic Data Structures', icon: <FaList className="text-blue-400" />, x: 500, y: 260, color: 'text-blue-400' },
  // Complexity
  { id: 'complexity', label: 'Algorithm Complexity', icon: <FaChartBar className="text-pink-400" />, x: 700, y: 160, color: 'text-pink-400' },
  // Sorting/Searching
  { id: 'sorting', label: 'Sorting Algorithms', icon: <FaSitemap className="text-orange-400" />, x: 900, y: 60, color: 'text-orange-400' },
  { id: 'searching', label: 'Search Algorithms', icon: <FaSearch className="text-green-400" />, x: 900, y: 160, color: 'text-green-400' },
  // Trees/Graphs
  { id: 'trees', label: 'Tree Data Structures', icon: <FaTree className="text-green-400" />, x: 1100, y: 60, color: 'text-green-400' },
  { id: 'graphs', label: 'Graph Data Structures', icon: <FaProjectDiagram className="text-teal-400" />, x: 1100, y: 160, color: 'text-teal-400' },
  // Advanced
  { id: 'advanced', label: 'Advanced Data Structures', icon: <FaCubes className="text-red-400" />, x: 1300, y: 110, color: 'text-red-400' },
  // Problem Solving
  { id: 'problem_solving', label: 'Problem Solving Techniques', icon: <FaPuzzlePiece className="text-yellow-400" />, x: 1500, y: 110, color: 'text-yellow-400' },
  // Platforms
  { id: 'platforms', label: 'Platforms & Practice', icon: <FaRocket className="text-blue-400" />, x: 1700, y: 110, color: 'text-blue-400' },
];

// Edges (connections between nodes)
const edges = [
  // Languages to Fundamentals
  { from: 'js', to: 'fundamentals' },
  { from: 'java', to: 'fundamentals' },
  { from: 'python', to: 'fundamentals' },
  // Fundamentals to DS
  { from: 'fundamentals', to: 'ds_intro' },
  { from: 'fundamentals', to: 'ds_types' },
  { from: 'fundamentals', to: 'ds_basics' },
  // DS to Complexity
  { from: 'ds_intro', to: 'complexity' },
  { from: 'ds_types', to: 'complexity' },
  { from: 'ds_basics', to: 'complexity' },
  // Complexity to Sorting/Searching
  { from: 'complexity', to: 'sorting' },
  { from: 'complexity', to: 'searching' },
  // Sorting/Searching to Trees/Graphs
  { from: 'sorting', to: 'trees' },
  { from: 'searching', to: 'graphs' },
  // Trees/Graphs to Advanced
  { from: 'trees', to: 'advanced' },
  { from: 'graphs', to: 'advanced' },
  // Advanced to Problem Solving
  { from: 'advanced', to: 'problem_solving' },
  // Problem Solving to Platforms
  { from: 'problem_solving', to: 'platforms' },
];

const nodeStyle =
  'rounded-full border px-5 py-2 text-base font-semibold transition-all duration-300 border-white/10 bg-white/5 text-white/80 hover:border-white/20 hover:bg-white/10 hover:text-white flex items-center gap-2 shadow-lg backdrop-blur-sm';

const bgStyle = {
  backgroundColor: '#101118',
  backgroundImage:
    'radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), radial-gradient(rgba(255,255,255,0.08) 1px, #101118 1px)',
  backgroundSize: '20px 20px',
  backgroundPosition: '0 0,10px 10px',
};

function drawDashedLine(ctx, x1, y1, x2, y2, dash = 12, gap = 12, offset = 0, color = '#00f2ff', glow = true) {
  if (!ctx || typeof x1 !== 'number' || typeof y1 !== 'number' || typeof x2 !== 'number' || typeof y2 !== 'number') {
    return;
  }
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.setLineDash([dash, gap]);
  ctx.lineDashOffset = -offset;
  if (glow) {
    ctx.shadowColor = color;
    ctx.shadowBlur = 12;
  }
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.restore();
}

const FlowCanvas = () => {
  const canvasRef = useRef(null);
  const [dashOffset, setDashOffset] = useState(0);

  // Animate dashed line offset for continuous flow
  useEffect(() => {
    const interval = setInterval(() => {
      setDashOffset((prev) => (prev + 3) % 48);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  // Draw edges
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    edges.forEach((edge) => {
      const from = nodes.find((n) => n.id === edge.from);
      const to = nodes.find((n) => n.id === edge.to);
      if (from && to) {
        drawDashedLine(ctx, from.x, from.y, to.x, to.y, 16, 16, dashOffset, '#00f2ff', true);
      }
    });
  }, [dashOffset]);

  return (
    <div
      className="relative w-full max-w-4xl mx-auto h-[400px] rounded-3xl overflow-x-auto overflow-y-hidden border border-white/10"
      style={bgStyle}
    >
      <div className="w-[1800px] h-full relative">
        <canvas
          ref={canvasRef}
          width={1800}
          height={400}
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
        />
        <AnimatePresence>
          {nodes.map((node, i) => (
            <motion.div
              key={node.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20, delay: i * 0.05 }}
              className={
                nodeStyle +
                ' absolute shadow-[0_0_20px_#3b82f655] cursor-pointer select-none'
              }
              style={{
                left: node.x,
                top: node.y,
                transform: 'translate(-50%, -50%)',
                zIndex: 2,
              }}
            >
              <span className={node.color + ' text-xl'}>{node.icon}</span>
              <span>{node.label}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FlowCanvas;
