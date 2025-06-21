// client/src/pages/RoadmapsPage.jsx
// Placeholder for the Roadmaps section.

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, 
  Zap, 
  Palette,
  Rocket,
  TestTube,
  Star,
  ArrowRight,
  Database,
  Network,
  Cpu,
  GitBranch,
  Layers,
  Code,
  Server,
  Brain
} from 'lucide-react';

// Frontend Roadmap Component
const FrontendRoadmap = ({ onBack }) => {
  const [expandedSections, setExpandedSections] = useState(new Set(['fundamentals']));

  const toggleSection = (sectionId) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const RoadmapCard = ({ title, description, steps, icon: Icon, color, isExpanded, onToggle, order }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: order * 0.1 }}
      className="bg-white/5 rounded-lg border border-white/10 overflow-hidden"
    >
      <button
        onClick={onToggle}
        className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-md ${color}`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            <p className="text-white/60 text-sm">{description}</p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 90 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-white/40"
        >
          <ArrowRight className="w-4 h-4" />
        </motion.div>
      </button>
      
      <motion.div
        initial={false}
        animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="overflow-hidden"
      >
        <div className="px-4 pb-4">
          <div className="space-y-3">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white/3 rounded-md p-3 border border-white/5"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-white font-medium text-sm">{step.title}</h4>
                  <div className="flex gap-1">
                    {step.technologies.slice(0, 2).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-1.5 py-0.5 bg-blue-500/20 text-blue-300 text-xs rounded border border-blue-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                    {step.technologies.length > 2 && (
                      <span className="px-1.5 py-0.5 bg-gray-500/20 text-gray-300 text-xs rounded border border-gray-500/30">
                        +{step.technologies.length - 2}
                      </span>
                    )}
                  </div>
                </div>
                
                <p className="text-white/60 text-xs mb-2">{step.description}</p>
                
                {step.subtopics && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {step.subtopics.slice(0, 3).map((topic, topicIndex) => (
                      <span
                        key={topicIndex}
                        className="px-1.5 py-0.5 bg-green-500/15 text-green-300 text-xs rounded"
                      >
                        {topic}
                      </span>
                    ))}
                    {step.subtopics.length > 3 && (
                      <span className="px-1.5 py-0.5 bg-gray-500/15 text-gray-300 text-xs rounded">
                        +{step.subtopics.length - 3}
                      </span>
                    )}
                  </div>
                )}
                
                {step.resources && (
                  <div className="flex flex-wrap gap-1">
                    {step.resources.slice(0, 2).map((resource, resIndex) => (
                      <a
                        key={resIndex}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-1.5 py-0.5 bg-purple-500/15 text-purple-300 text-xs rounded hover:bg-purple-500/25 transition-colors"
                      >
                        {resource.name}
                      </a>
                    ))}
                    {step.resources.length > 2 && (
                      <span className="px-1.5 py-0.5 bg-gray-500/15 text-gray-300 text-xs rounded">
                        +{step.resources.length - 2}
                      </span>
                    )}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  const roadmapData = {
    fundamentals: {
      title: "Web Fundamentals",
      description: "Core web technologies and browser fundamentals",
      icon: Globe,
      color: "bg-blue-500/20",
      order: 1,
      steps: [
        {
          title: "HTML5 & Semantic Structure",
          description: "Modern HTML structure and accessibility",
          technologies: ["HTML5", "Semantic HTML"],
          subtopics: ["Document Structure", "Forms", "Accessibility"],
          resources: [
            { name: "MDN HTML", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" }
          ]
        },
        {
          title: "CSS3 & Modern Layouts",
          description: "Flexbox, CSS Grid, and responsive design",
          technologies: ["CSS3", "Flexbox", "CSS Grid"],
          subtopics: ["Box Model", "Flexbox", "CSS Grid"],
          resources: [
            { name: "CSS-Tricks", url: "https://css-tricks.com/" }
          ]
        },
        {
          title: "JavaScript Fundamentals",
          description: "Core JS concepts and ES6+ features",
          technologies: ["ES6+", "Async/Await"],
          subtopics: ["Variables", "Functions", "Async Programming"],
          resources: [
            { name: "Eloquent JavaScript", url: "https://eloquentjavascript.net/" }
          ]
        }
      ]
    },
    react: {
      title: "React Mastery",
      description: "React ecosystem and modern patterns",
      icon: Zap,
      color: "bg-purple-500/20",
      order: 2,
      steps: [
        {
          title: "React Core Concepts",
          description: "Components, hooks, and state management",
          technologies: ["React", "React Hooks"],
          subtopics: ["Components", "Hooks", "Context API"],
          resources: [
            { name: "React Docs", url: "https://react.dev/" }
          ]
        },
        {
          title: "Advanced React Patterns",
          description: "Performance optimization and patterns",
          technologies: ["React", "Performance"],
          subtopics: ["Custom Hooks", "React.memo", "useMemo"],
          resources: [
            { name: "React Performance", url: "https://react.dev/learn/render-and-commit" }
          ]
        },
        {
          title: "State Management",
          description: "Redux Toolkit and React Query",
          technologies: ["Redux Toolkit", "React Query"],
          subtopics: ["Redux Toolkit", "Server State", "Client State"],
          resources: [
            { name: "Redux Toolkit", url: "https://redux-toolkit.js.org/" }
          ]
        }
      ]
    },
    styling: {
      title: "Modern Styling",
      description: "CSS frameworks and design systems",
      icon: Palette,
      color: "bg-pink-500/20",
      order: 3,
      steps: [
        {
          title: "Tailwind CSS",
          description: "Utility-first CSS framework",
          technologies: ["Tailwind CSS"],
          subtopics: ["Utility Classes", "Responsive Design"],
          resources: [
            { name: "Tailwind CSS", url: "https://tailwindcss.com/" }
          ]
        },
        {
          title: "CSS-in-JS",
          description: "Component-based styling",
          technologies: ["Styled Components", "CSS Modules"],
          subtopics: ["Styled Components", "Theme System"],
          resources: [
            { name: "Styled Components", url: "https://styled-components.com/" }
          ]
        },
        {
          title: "Design Systems",
          description: "Build scalable component libraries",
          technologies: ["Storybook", "Design Tokens"],
          subtopics: ["Component Library", "Storybook"],
          resources: [
            { name: "Storybook", url: "https://storybook.js.org/" }
          ]
        }
      ]
    },
    performance: {
      title: "Performance",
      description: "Optimization and Core Web Vitals",
      icon: Rocket,
      color: "bg-orange-500/20",
      order: 4,
      steps: [
        {
          title: "React Optimization",
          description: "Performance optimization techniques",
          technologies: ["React.memo", "useMemo"],
          subtopics: ["React.memo", "Code Splitting"],
          resources: [
            { name: "React Performance", url: "https://react.dev/learn/render-and-commit" }
          ]
        },
        {
          title: "Core Web Vitals",
          description: "LCP, FID, and CLS optimization",
          technologies: ["LCP", "FID", "CLS"],
          subtopics: ["Largest Contentful Paint", "First Input Delay"],
          resources: [
            { name: "Web Vitals", url: "https://web.dev/vitals/" }
          ]
        },
        {
          title: "Build Optimization",
          description: "Bundle size and loading optimization",
          technologies: ["Vite", "Tree Shaking"],
          subtopics: ["Bundle Analysis", "Code Splitting"],
          resources: [
            { name: "Vite", url: "https://vitejs.dev/" }
          ]
        }
      ]
    },
    testing: {
      title: "Testing",
      description: "Quality assurance and testing strategies",
      icon: TestTube,
      color: "bg-red-500/20",
      order: 5,
      steps: [
        {
          title: "React Testing",
          description: "Component testing with RTL",
          technologies: ["Jest", "React Testing Library"],
          subtopics: ["Component Testing", "User Interactions"],
          resources: [
            { name: "React Testing Library", url: "https://testing-library.com/docs/react-testing-library/intro/" }
          ]
        },
        {
          title: "E2E Testing",
          description: "End-to-end testing workflows",
          technologies: ["Playwright", "E2E Testing"],
          subtopics: ["User Flows", "Cross-browser Testing"],
          resources: [
            { name: "Playwright", url: "https://playwright.dev/" }
          ]
        },
        {
          title: "Testing Best Practices",
          description: "Testing patterns and CI/CD",
          technologies: ["Testing Patterns", "CI/CD"],
          subtopics: ["Test Coverage", "Testing Strategy"],
          resources: [
            { name: "Testing Best Practices", url: "https://kentcdodds.com/blog/common-mistakes-with-react-testing-library" }
          ]
        }
      ]
    },
    advanced: {
      title: "Advanced Concepts",
      description: "TypeScript, PWA, and micro frontends",
      icon: Star,
      color: "bg-yellow-500/20",
      order: 6,
      steps: [
        {
          title: "TypeScript",
          description: "Type safety for JavaScript",
          technologies: ["TypeScript"],
          subtopics: ["Basic Types", "Interfaces", "Generics"],
          resources: [
            { name: "TypeScript", url: "https://www.typescriptlang.org/" }
          ]
        },
        {
          title: "Progressive Web Apps",
          description: "Native-like web applications",
          technologies: ["PWA", "Service Workers"],
          subtopics: ["Service Workers", "Offline Support"],
          resources: [
            { name: "PWA Guide", url: "https://web.dev/progressive-web-apps/" }
          ]
        },
        {
          title: "Micro Frontends",
          description: "Scalable frontend architecture",
          technologies: ["Module Federation"],
          subtopics: ["Module Federation", "Single-SPA"],
          resources: [
            { name: "Module Federation", url: "https://webpack.js.org/concepts/module-federation/" }
          ]
        }
      ]
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] text-white p-4 sm:p-6"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header with Back Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/60 hover:text-white mb-4 transition-colors"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to Roadmaps
          </button>
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Frontend Roadmap
              </span>
            </h1>
            <p className="text-white/70 max-w-2xl mx-auto">
              Structured learning path to become a senior frontend engineer
            </p>
          </div>
        </motion.div>

        {/* Progress */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6 p-4 bg-white/5 rounded-lg border border-white/10"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-white">Progress</span>
            <span className="text-blue-400 text-sm">2 of 6 completed</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-1.5">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-1.5 rounded-full" style={{ width: '33%' }}></div>
          </div>
        </motion.div>

        {/* Roadmap Cards */}
        <div className="grid gap-4">
          {Object.entries(roadmapData).map(([sectionId, sectionData]) => (
            <RoadmapCard
              key={sectionId}
              {...sectionData}
              isExpanded={expandedSections.has(sectionId)}
              onToggle={() => toggleSection(sectionId)}
            />
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-8 p-6 bg-white/5 rounded-lg border border-white/10"
        >
          <h3 className="text-xl font-bold text-white mb-2">Ready to Start?</h3>
          <p className="text-white/60 text-sm mb-4">
            Follow each section step by step. Click to expand and see details.
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg transition-all duration-300 font-medium">
            Begin Learning
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Main Roadmaps Selection Page
export default function RoadmapsPage() {
  const [selectedRoadmap, setSelectedRoadmap] = useState(null);

  const roadmaps = [
    {
      id: 'frontend',
      title: 'Frontend Development',
      description: 'Master modern web development with React, TypeScript, and modern tools',
      icon: Globe,
      color: 'bg-blue-500/20',
      gradient: 'from-blue-500 to-cyan-500',
      status: 'available'
    },
    {
      id: 'backend',
      title: 'Backend Development',
      description: 'Build scalable server-side applications and APIs',
      icon: Server,
      color: 'bg-green-500/20',
      gradient: 'from-green-500 to-emerald-500',
      status: 'coming-soon'
    },
    {
      id: 'datastructures',
      title: 'Data Structures',
      description: 'Master fundamental data structures and their implementations',
      icon: Database,
      color: 'bg-purple-500/20',
      gradient: 'from-purple-500 to-pink-500',
      status: 'coming-soon'
    },
    {
      id: 'algorithms',
      title: 'Algorithms',
      description: 'Learn problem-solving techniques and algorithm design',
      icon: Brain,
      color: 'bg-orange-500/20',
      gradient: 'from-orange-500 to-red-500',
      status: 'coming-soon'
    },
    {
      id: 'dbms',
      title: 'Database Management',
      description: 'Master SQL, NoSQL, and database design principles',
      icon: Database,
      color: 'bg-indigo-500/20',
      gradient: 'from-indigo-500 to-purple-500',
      status: 'coming-soon'
    },
    {
      id: 'os',
      title: 'Operating Systems',
      description: 'Understand OS concepts, processes, and system programming',
      icon: Cpu,
      color: 'bg-gray-500/20',
      gradient: 'from-gray-500 to-slate-500',
      status: 'coming-soon'
    },
    {
      id: 'networking',
      title: 'Computer Networking',
      description: 'Learn network protocols, architecture, and security',
      icon: Network,
      color: 'bg-teal-500/20',
      gradient: 'from-teal-500 to-cyan-500',
      status: 'coming-soon'
    },
    {
      id: 'systemdesign',
      title: 'System Design',
      description: 'Design scalable distributed systems and architectures',
      icon: Layers,
      color: 'bg-yellow-500/20',
      gradient: 'from-yellow-500 to-orange-500',
      status: 'coming-soon'
    }
  ];

  if (selectedRoadmap === 'frontend') {
    return <FrontendRoadmap onBack={() => setSelectedRoadmap(null)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] text-white p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Learning Roadmaps
            </span>
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Choose your learning path. Each roadmap is carefully designed to take you from beginner to expert.
          </p>
        </motion.div>

        {/* Roadmap Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roadmaps.map((roadmap, index) => (
            <motion.div
              key={roadmap.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative group cursor-pointer ${
                roadmap.status === 'available' 
                  ? 'hover:scale-105 transition-transform duration-300' 
                  : 'opacity-60 cursor-not-allowed'
              }`}
              onClick={() => roadmap.status === 'available' && setSelectedRoadmap(roadmap.id)}
            >
              <div className="bg-white/5 rounded-xl border border-white/10 p-6 h-full hover:bg-white/10 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg ${roadmap.color}`}>
                    <roadmap.icon className="w-6 h-6 text-white" />
                  </div>
                  {roadmap.status === 'coming-soon' && (
                    <span className="px-2 py-1 bg-yellow-500/20 text-yellow-300 text-xs rounded border border-yellow-500/30">
                      Coming Soon
                    </span>
                  )}
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3">{roadmap.title}</h3>
                <p className="text-white/60 text-sm mb-4">{roadmap.description}</p>
                
                {roadmap.status === 'available' && (
                  <div className="flex items-center justify-between">
                    <span className="text-blue-400 text-sm font-medium">Available</span>
                    <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
                  </div>
                )}
                
                {roadmap.status === 'coming-soon' && (
                  <div className="flex items-center justify-between">
                    <span className="text-yellow-400 text-sm font-medium">In Development</span>
                    <div className="w-4 h-4 border-2 border-yellow-400/30 border-t-yellow-400 rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
              
              {/* Gradient Border Effect */}
              <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${roadmap.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10`}></div>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12 p-8 bg-white/5 rounded-xl border border-white/10"
        >
          <h3 className="text-2xl font-bold text-white mb-4">Start Your Learning Journey</h3>
          <p className="text-white/70 mb-6">
            Choose a roadmap that matches your career goals. More roadmaps are coming soon!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl transition-all duration-300 font-semibold">
              Explore Frontend Roadmap
            </button>
            <button className="border border-white/20 hover:bg-white/10 text-white px-8 py-3 rounded-xl transition-colors">
              Get Notified
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
