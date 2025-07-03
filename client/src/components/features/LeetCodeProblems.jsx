import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function LeetCodeProblems({ user, isAuthenticated }) {
  const [categories, setCategories] = useState([]);
  const [solvedProblems, setSolvedProblems] = useState(new Set());
  const [expanded, setExpanded] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch DSA plan and user's solved problems
  useEffect(() => {
    if (!isAuthenticated) return;
    setLoading(true);
    setError(null);
    Promise.all([
      fetch(`${API_BASE_URL}/api/dsa/plan`).then(res => res.json()),
      fetch(`${API_BASE_URL}/api/progress/solved`, { credentials: 'include' }).then(res => res.json())
    ])
      .then(([planRes, solvedRes]) => {
        if (planRes.success && planRes.data.categories) {
          setCategories(planRes.data.categories);
        } else {
          throw new Error('Failed to load DSA plan');
        }
        if (solvedRes.success) {
          // solvedRes.data.problems is an array of UserProgress with .problemId
          setSolvedProblems(new Set(solvedRes.data.problems.map(p => p.problemId?.link || p.problemId)));
        } else {
          throw new Error('Failed to load solved problems');
        }
      })
      .catch(err => {
        setError(err.message || 'Error loading data');
      })
      .finally(() => setLoading(false));
  }, [isAuthenticated]);

  // Toggle category expand/collapse
  const toggleCategory = (idx) => {
    setExpanded(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  // Mark/unmark problem as solved
  const handleToggleSolved = async (problemLink) => {
    // Find the Problem _id from the backend (not available in plan JSON), so fallback to link as unique key
    // In production, you should map plan problems to DB _ids
    const isSolved = solvedProblems.has(problemLink);
    setLoading(true);
    try {
      // Find Problem by link (ideally, you should have _id in plan JSON)
      // Here, we assume backend can handle link as unique identifier (else, needs adjustment)
      const res = await fetch(`${API_BASE_URL}/api/progress/problem/by-link`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ link: problemLink, status: isSolved ? 'not_started' : 'solved' })
      });
      const data = await res.json();
      if (data.success) {
        setSolvedProblems(prev => {
          const next = new Set(prev);
          if (isSolved) next.delete(problemLink);
          else next.add(problemLink);
          return next;
        });
      } else {
        throw new Error(data.message || 'Failed to update progress');
      }
    } catch (err) {
      setError(err.message || 'Failed to update progress');
    } finally {
      setLoading(false);
    }
  };

  // Helper to extract problem name and source from link
  const getProblemInfo = (link) => {
    let name = link;
    let source = '';
    if (link.includes('leetcode.com')) {
      source = 'LeetCode';
      name = link.replace('https://leetcode.com/problems/', '').replace(/\/$/, '').replace(/-/g, ' ');
      // Optionally, capitalize each word
      name = name.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    } else if (link.includes('geeksforgeeks.org')) {
      source = 'GFG';
      // Try to extract the problem slug
      const match = link.match(/problems\/([^\/]+)/);
      name = match ? match[1].replace(/-/g, ' ') : link;
      name = name.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    } else {
      source = 'Other';
      name = link;
    }
    return { name, source };
  };

  if (!isAuthenticated) {
  return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-bold mb-2">Sign in to track your DSA progress</h2>
        <p className="text-gray-400 mb-4">Log in to unlock personalized problem tracking and progress analytics.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-bold mb-2 text-red-400">{error}</h2>
    </div>
  );
  }

  // Count total and solved
  const allProblems = categories.flatMap(cat => cat.problems);
  const total = allProblems.length;
  const solved = allProblems.filter(p => solvedProblems.has(p)).length;
  
  return (
    <div className="w-full max-w-2xl mx-auto px-2 py-6 sm:px-4">
      <div className="mb-6 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-white">DSA 200-Day LeetCode Tracker</h1>
        <p className="text-gray-400 mb-2">Track your progress across all major DSA categories. Problems are grouped for focused learning.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-sm">
          <span className="text-cyan-400 font-semibold">{solved} / {total} solved</span>
          <span className="w-full sm:w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
            <span className="block h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-300" style={{ width: `${(solved/total)*100}%` }}></span>
          </span>
        </div>
        <div className="mt-2 text-xs text-gray-400">Level: {solved + 1} / {total}</div>
      </div>
      <div className="space-y-4">
        {categories.map((cat, idx) => (
          <div key={cat.name} className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
            <button
              className="w-full flex items-center justify-between px-4 py-4 sm:py-5 hover:bg-white/10 transition-colors"
              onClick={() => toggleCategory(idx)}
            >
              <span className="text-base sm:text-lg font-semibold text-white text-left">{cat.name}</span>
              <span className="ml-2 text-cyan-400">{expanded[idx] ? <FaChevronUp /> : <FaChevronDown />}</span>
            </button>
            {expanded[idx] && (
              <div className="divide-y divide-white/10">
                {cat.problems.map((problemLink, pidx) => {
                  const { name, source } = getProblemInfo(problemLink);
                  return (
                    <div key={problemLink} className="flex items-center justify-between px-4 py-3 text-sm sm:text-base bg-white/2 hover:bg-cyan-500/10 transition-all">
                      <a
                        href={problemLink}
          target="_blank"
          rel="noopener noreferrer"
                        className="flex items-center gap-2 text-white hover:text-cyan-400 font-medium truncate"
                      >
                        <SiLeetcode className={`text-lg ${source === 'LeetCode' ? 'text-yellow-400' : source === 'GFG' ? 'text-green-400' : 'text-gray-400'}`} />
                        <span className="truncate max-w-[60vw] sm:max-w-xs">{name}</span>
                        <span className="ml-2 px-2 py-0.5 rounded bg-gray-700 text-xs font-semibold text-gray-300">{source}</span>
                      </a>
      <button
                        className={`ml-2 flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold transition-all duration-200 ${solvedProblems.has(problemLink) ? 'bg-green-500/20 text-green-400' : 'bg-gray-700 text-gray-300 hover:bg-cyan-500/20 hover:text-cyan-400'}`}
                        onClick={() => handleToggleSolved(problemLink)}
                      >
                        <FaCheckCircle className={solvedProblems.has(problemLink) ? 'text-green-400' : 'text-gray-400'} />
                        {solvedProblems.has(problemLink) ? 'Solved' : 'Mark Solved'}
      </button>
          </div>
                  );
                })}
        </div>
      )}
    </div>
        ))}
      </div>
    </div>
  );
}
