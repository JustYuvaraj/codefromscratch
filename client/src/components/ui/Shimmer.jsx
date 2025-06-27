import React from 'react';

export default function Shimmer({ className = '', style = {}, rounded = 'rounded', children }) {
  return (
    <div
      aria-hidden="true"
      role="presentation"
      className={`animate-pulse bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 ${rounded} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
} 