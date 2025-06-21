// client/src/pages/NotFoundPage.jsx
// Component for handling 404 - Page Not Found errors.

import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 min-h-[calc(100vh-80px)]"> {/* Adjusted min-height */}
      <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
      <p className="text-2xl text-white/80 mb-6">Page Not Found</p>
      <p className="text-lg text-white/60 max-w-md mb-8">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link
        to="/"
        className="px-6 py-3 text-lg font-semibold text-white rounded-lg bg-blue-600 hover:bg-blue-700 shadow-lg transition-all duration-300 transform hover:scale-105"
      >
        Go to Home
      </Link>
    </div>
  );
}
