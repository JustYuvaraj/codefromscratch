import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Code, 
  Database, 
  Network, 
  Server, 
  Globe, 
  Zap, 
  Target,
  Clock,
  Users,
  Star,
  ArrowRight,
  Play,
  CheckCircle
} from 'lucide-react';

const courses = [
  {
    id: 'data-structures',
    title: 'Data Structures',
    subtitle: 'Master the fundamentals',
    description: 'Learn arrays, linked lists, stacks, queues, trees, graphs, and hash tables. Essential for coding interviews and efficient programming.',
    icon: <Code className="w-8 h-8" />,
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
    duration: '4-6 weeks',
    difficulty: 'Beginner',
    topics: ['Arrays & Strings', 'Linked Lists', 'Stacks & Queues', 'Trees & Graphs', 'Hash Tables', 'Heaps'],
    problems: 150,
    completed: 0,
    isPopular: true
  },
  {
    id: 'algorithms',
    title: 'Algorithms',
    subtitle: 'Problem-solving mastery',
    description: 'Master sorting, searching, dynamic programming, greedy algorithms, and advanced techniques for optimal solutions.',
    icon: <Zap className="w-8 h-8" />,
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/20',
    duration: '6-8 weeks',
    difficulty: 'Intermediate',
    topics: ['Sorting & Searching', 'Dynamic Programming', 'Greedy Algorithms', 'Backtracking', 'Two Pointers', 'Sliding Window'],
    problems: 200,
    completed: 0,
    isPopular: true
  },
  {
    id: 'database',
    title: 'Database Design',
    subtitle: 'Data management expertise',
    description: 'Learn SQL, database design principles, normalization, indexing, and both relational and NoSQL databases.',
    icon: <Database className="w-8 h-8" />,
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/20',
    duration: '4-5 weeks',
    difficulty: 'Intermediate',
    topics: ['SQL Fundamentals', 'Database Design', 'Normalization', 'Indexing', 'Transactions', 'NoSQL'],
    problems: 80,
    completed: 0,
    isPopular: false
  },
  {
    id: 'system-design',
    title: 'System Design',
    subtitle: 'Architecture at scale',
    description: 'Design scalable systems, understand distributed systems, microservices, caching, load balancing, and cloud architecture.',
    icon: <Network className="w-8 h-8" />,
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/20',
    duration: '8-10 weeks',
    difficulty: 'Advanced',
    topics: ['Scalability', 'Distributed Systems', 'Microservices', 'Caching', 'Load Balancing', 'Cloud Architecture'],
    problems: 50,
    completed: 0,
    isPopular: true
  },
  {
    id: 'backend',
    title: 'Backend Development',
    subtitle: 'Server-side mastery',
    description: 'Build robust APIs, handle authentication, work with databases, implement caching, and deploy applications.',
    icon: <Server className="w-8 h-8" />,
    color: 'from-indigo-500 to-blue-500',
    bgColor: 'bg-indigo-500/10',
    borderColor: 'border-indigo-500/20',
    duration: '6-8 weeks',
    difficulty: 'Intermediate',
    topics: ['API Design', 'Authentication', 'Database Integration', 'Caching', 'Testing', 'Deployment'],
    problems: 100,
    completed: 0,
    isPopular: false
  },
  {
    id: 'frontend',
    title: 'Frontend Development',
    subtitle: 'User interface excellence',
    description: 'Master React, state management, responsive design, performance optimization, and modern web development.',
    icon: <Globe className="w-8 h-8" />,
    color: 'from-teal-500 to-cyan-500',
    bgColor: 'bg-teal-500/10',
    borderColor: 'border-teal-500/20',
    duration: '5-7 weeks',
    difficulty: 'Intermediate',
    topics: ['React Fundamentals', 'State Management', 'Responsive Design', 'Performance', 'Testing', 'Build Tools'],
    problems: 120,
    completed: 0,
    isPopular: false
  }
];

export default function CoursePage() {
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = courses.filter(course => {
    const matchesDifficulty = selectedDifficulty === 'all' || course.difficulty.toLowerCase() === selectedDifficulty;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDifficulty && matchesSearch;
  });

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'text-green-400 bg-green-400/10';
      case 'intermediate': return 'text-yellow-400 bg-yellow-400/10';
      case 'advanced': return 'text-red-400 bg-red-400/10';
      default: return 'text-white/60 bg-white/10';
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white pt-24">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-16">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Choose Your Learning Path
            </h1>
            <p className="text-xl text-white/70 mb-8 max-w-3xl mx-auto">
              Master the skills you need to become a full-stack developer. From data structures to system design, 
              we've got you covered with comprehensive courses and hands-on practice.
            </p>
            
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-80 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className={`relative group cursor-pointer transition-all duration-300 hover:scale-105 ${course.bgColor} ${course.borderColor} border rounded-2xl p-6 hover:shadow-2xl`}
            >
              {/* Popular Badge */}
              {course.isPopular && (
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  Popular
                </div>
              )}

              {/* Course Header */}
              <div className="mb-4">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${course.color} flex items-center justify-center mb-4`}>
                  {course.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3>
                <p className="text-white/60 text-sm mb-3">{course.subtitle}</p>
                <p className="text-white/70 text-sm leading-relaxed">{course.description}</p>
              </div>

              {/* Course Stats */}
              <div className="flex items-center justify-between mb-4 text-sm">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1 text-white/60">
                    <Clock className="w-4 h-4" />
                    {course.duration}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(course.difficulty)}`}>
                    {course.difficulty}
                  </span>
                </div>
                <span className="flex items-center gap-1 text-white/60">
                  <Target className="w-4 h-4" />
                  {course.problems} problems
                </span>
              </div>

              {/* Topics */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-white mb-2">Key Topics:</h4>
                <div className="flex flex-wrap gap-1">
                  {course.topics.slice(0, 3).map((topic, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-white/5 rounded text-xs text-white/70"
                    >
                      {topic}
                    </span>
                  ))}
                  {course.topics.length > 3 && (
                    <span className="px-2 py-1 bg-white/5 rounded text-xs text-white/50">
                      +{course.topics.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-white/60">Progress</span>
                  <span className="text-white">{course.completed}/{course.problems}</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(course.completed / course.problems) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Action Button */}
              <Link
                to={`/course/${course.id}`}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-lg"
              >
                {course.completed > 0 ? (
                  <>
                    <Play className="w-4 h-4" />
                    Continue Learning
                  </>
                ) : (
                  <>
                    <BookOpen className="w-4 h-4" />
                    Start Course
                  </>
                )}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 text-white/40 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No courses found</h3>
            <p className="text-white/60">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Journey?</h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto">
            Join thousands of developers who are already mastering these skills. 
            Choose your path and start building your future today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/dashboard"
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300"
            >
              Go to Dashboard
            </Link>
            <Link
              to="/leaderboard"
              className="px-8 py-3 border border-white/20 hover:border-white/40 hover:bg-white/10 text-white font-semibold rounded-lg transition-all duration-300"
            >
              View Leaderboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 