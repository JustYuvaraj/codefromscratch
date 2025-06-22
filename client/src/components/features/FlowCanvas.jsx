import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FlowCanvas = ({ selected }) => {
  const canvasRef = useRef(null);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [lines, setLines] = useState([]);
  const [animations, setAnimations] = useState([]);

  const data = {
    'data-structures': {
      nodes: [
        { id: 1, x: 100, y: 200, label: 'Arrays' },
        { id: 2, x: 300, y: 100, label: 'Linked Lists' },
        { id: 3, x: 300, y: 300, label: 'Hash Tables' },
        { id: 4, x: 500, y: 100, label: 'Stacks' },
        { id: 5, x: 500, y: 200, label: 'Queues' },
        { id: 6, x: 500, y: 300, label: 'Trees' },
        { id: 7, x: 700, y: 300, label: 'Graphs' },
      ],
      edges: [
        { from: 1, to: 2 },
        { from: 1, to: 3 },
        { from: 2, to: 4 },
        { from: 2, to: 5 },
        { from: 3, to: 6 },
        { from: 6, to: 7 },
      ],
    },
    'algorithms': {
        nodes: [
            { id: 1, x: 100, y: 200, label: 'Sorting' },
            { id: 2, x: 300, y: 100, label: 'Searching' },
            { id: 3, x: 300, y: 300, label: 'Graph Algos' },
            { id: 4, x: 500, y: 100, label: 'Recursion' },
            { id: 5, x: 500, y: 300, label: 'Dynamic Prog.' },
            { id: 6, x: 700, y: 200, label: 'Greedy Algos' },
          ],
          edges: [
            { from: 1, to: 2 },
            { from: 2, to: 4 },
            { from: 1, to: 3 },
            { from: 3, to: 5 },
            { from: 4, to: 5 },
            { from: 5, to: 6 },
          ],
    },
    'frontend': {
        nodes: [
            { id: 1, x: 100, y: 200, label: 'HTML/CSS' },
            { id: 2, x: 300, y: 100, label: 'JavaScript' },
            { id: 3, x: 300, y: 300, label: 'React' },
            { id: 4, x: 500, y: 200, label: 'Vue.js' },
            { id: 5, x: 500, y: 400, label: 'Angular' },
            { id: 6, x: 700, y: 300, label: 'Next.js' },
          ],
          edges: [
            { from: 1, to: 2 },
            { from: 2, to: 3 },
            { from: 2, to: 4 },
            { from: 2, to: 5 },
            { from: 3, to: 6 },
          ],
    },
    'backend': {
        nodes: [
            { id: 1, x: 100, y: 200, label: 'Node.js' },
            { id: 2, x: 300, y: 100, label: 'Python' },
            { id: 3, x: 300, y: 300, label: 'Databases' },
            { id: 4, x: 500, y: 100, label: 'APIs' },
            { id: 5, x: 500, y: 300, label: 'Authentication' },
            { id: 6, x: 700, y: 200, label: 'DevOps' },
          ],
          edges: [
            { from: 1, to: 4 },
            { from: 2, to: 4 },
            { from: 3, to: 1 },
            { from: 3, to: 2 },
            { from: 4, to: 5 },
            { from: 5, to: 6 },
          ],
    },
    'full-stack': {
        nodes: [
            { id: 1, x: 100, y: 200, label: 'Frontend' },
            { id: 2, x: 300, y: 200, label: 'Backend' },
            { id: 3, x: 500, y: 100, label: 'Databases' },
            { id: 4, x: 500, y: 300, label: 'Deployment' },
            { id: 5, x: 700, y: 200, label: 'APIs' },
          ],
          edges: [
            { from: 1, to: 2 },
            { from: 2, to: 3 },
            { from: 2, to: 4 },
            { from: 2, to: 5 },
          ],
    },
  };

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw edges
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 1;
    edges.forEach(edge => {
      const fromNode = nodes.find(n => n.id === edge.from);
      const toNode = nodes.find(n => n.id === edge.to);
      if (fromNode && toNode) {
        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);
        ctx.stroke();
      }
    });

    // Draw animated lines
    animations.forEach(anim => {
        ctx.strokeStyle = `rgba(0, 242, 255, ${anim.opacity})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(anim.startX, anim.startY);
        ctx.lineTo(anim.endX, anim.endY);
        ctx.stroke();
    });

  }, [nodes, edges, animations]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const resizeObserver = new ResizeObserver(() => draw());
    if(canvas) {
      resizeObserver.observe(canvas);
    }
    return () => {
      if(canvas) {
        resizeObserver.unobserve(canvas);
      }
    }
  }, [draw]);

  useEffect(() => {
    if (selected && data[selected]) {
        setNodes(data[selected].nodes);
        setEdges(data[selected].edges);
    } else {
        setNodes([]);
        setEdges([]);
    }
  }, [selected]);
  
  useEffect(() => {
    draw();
  }, [nodes, edges, lines, draw]);

  useEffect(() => {
    const newLines = [];
    const fromNodes = nodes.filter(n => n.x < 300);
    const toNodes = nodes.filter(n => n.x > 300);
  
    fromNodes.forEach(from => {
      toNodes.forEach(to => {
        newLines.push({ startX: from.x, startY: from.y, endX: to.x, endY: to.y });
      });
    });
  
    setLines(newLines);
  }, [nodes]);

  useEffect(() => {
    const interval = setInterval(() => {
        setAnimations(prev => {
            const updated = prev.map(a => ({...a, opacity: a.opacity - 0.05})).filter(a => a.opacity > 0);
            if (lines.length > 0 && Math.random() < 0.2) {
                const line = lines[Math.floor(Math.random() * lines.length)];
                updated.push({...line, opacity: 1});
            }
            return updated;
        });
    }, 100);

    return () => clearInterval(interval);
  }, [lines]);

  return (
    <AnimatePresence>
      {selected && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 500 }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="w-full bg-gradient-to-br from-[#0b0c1a] via-[#0f111f] to-[#101118] 
            rounded-3xl border border-[#2c2c3a] shadow-[0_0_40px_#00f2ff22] relative overflow-hidden"
        >
          <canvas ref={canvasRef} className="w-full h-full"></canvas>
          <AnimatePresence>
          {nodes.map(node => (
            <motion.div
              key={node.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20, delay: Math.random() * 0.5 }}
              className="absolute px-4 py-2 rounded-lg bg-white/10 border border-white/20 shadow-lg text-white font-semibold"
              style={{
                left: node.x,
                top: node.y,
                transform: 'translate(-50%, -50%)'
              }}
            >
              {node.label}
            </motion.div>
          ))}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FlowCanvas;
