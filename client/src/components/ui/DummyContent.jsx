import React from "react";

const DummyContent = ({ title }) => (
  <div className="text-white">
    <h2 className="text-2xl font-bold mb-6 capitalize text-center">{title.replace("-", " ")}</h2>
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="bg-white/5 p-4 rounded-lg animate-pulse h-12 w-full" />
      ))}
    </div>
    <p className="text-center text-gray-400 mt-8">Content coming soon...</p>
  </div>
);

export default DummyContent; 