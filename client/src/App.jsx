import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import AuthPage from './components/auth/AuthPage';
import RoadmapsPage from './pages/RoadmapsPage';
import ToolsPage from './pages/ToolsPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import SettingsPage from './pages/SettingsPage';
import LeaderboardPage from './pages/LeaderboardPage';
import CoursePage from './pages/CoursePage';
import PlaygroundPage from './pages/PlaygroundPage';
import MariaCodeVisualizer from './components/features/MariaCodeVisualizer';
import DSAPlan from './components/features/DSAPlan';
import './index.css';

// Protected Route component
function ProtectedRoute({ children, isAuthenticated }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

// Public Route component - redirects authenticated users away from auth pages
function PublicRoute({ children, isAuthenticated }) {
  if (isAuthenticated) {
    // Show a brief success message before redirecting
    const message = document.createElement('div');
    message.className = 'fixed top-20 right-4 bg-[#1a1a1a] border border-white/10 text-white px-6 py-3 rounded-xl shadow-2xl backdrop-blur-md z-50 flex items-center gap-3';
    message.innerHTML = `
      <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
      <span class="text-sm font-medium">Already logged in! Redirecting to home...</span>
    `;
    document.body.appendChild(message);
    
    // Remove the message after 3 seconds
    setTimeout(() => {
      if (message.parentNode) {
        message.parentNode.removeChild(message);
      }
    }, 3000);
    
    return <Navigate to="/" replace />;
  }
  return children;
}

// Separate component to use useNavigate hook
function AppContent() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Check authentication status on app load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/current_user', {
          credentials: 'include'
        });
        
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Force reload after OAuth login to get new session
  useEffect(() => {
    if (window.location.search.includes('authStatus=success')) {
      // Remove the query param without reloading
      window.history.replaceState({}, document.title, window.location.pathname);
      // Optionally, you can force a re-check of auth here if needed
      // For example, setIsLoading(true); checkAuth();
    }
  }, []);

  // Global user update function
  const handleUserUpdate = (updatedUser) => {
    console.log('Global user update:', updatedUser);
    setUser(updatedUser);
  };

  // Make the update function available globally
  useEffect(() => {
    window.updateGlobalUser = handleUserUpdate;
    return () => {
      delete window.updateGlobalUser;
    };
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      // Redirect to homepage after logout
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] text-white flex flex-col">
      {isLoading ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white/70">Loading...</p>
          </div>
        </div>
      ) : (
        <>
          <Navigation isAuthenticated={isAuthenticated} user={user} onLogout={handleLogout} />
          <main className="flex-grow pt-24">
            <Routes>
              <Route path="/" element={<HomePage user={user} isAuthenticated={isAuthenticated} />} />
              <Route path="/login" element={
                <PublicRoute isAuthenticated={isAuthenticated}>
                  <AuthPage isLogin={true} />
                </PublicRoute>
              } />
              <Route path="/register" element={
                <PublicRoute isAuthenticated={isAuthenticated}>
                  <AuthPage isLogin={false} />
                </PublicRoute>
              } />
              <Route path="/dashboard" element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <DashboardPage user={user} />
                </ProtectedRoute>
              } />
              <Route path="/settings" element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <SettingsPage user={user} onUserUpdate={handleUserUpdate} />
                </ProtectedRoute>
              } />
              <Route path="/roadmaps" element={<RoadmapsPage />} />
              <Route path="/tools" element={<ToolsPage user={user} />} />
              <Route path="/leaderboard" element={<LeaderboardPage />} />
              <Route path="/courses" element={<CoursePage />} />
              <Route path="/playground" element={<PlaygroundPage />} />
              <Route path="/maria-visualizer" element={<MariaCodeVisualizer />} />
              <Route path="/dsa-plan" element={<DSAPlan />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
        </>
      )}
    </div>
  );
}

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AppContent />
    </Router>
  );
}

export default App;
