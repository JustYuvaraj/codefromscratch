import React, { useState } from 'react';

export default function PlaygroundPage() {
  const [code, setCode] = useState(
`let sum = 0;
for (let i = 0; i < 3; i++) {
  sum += i;
  console.log(sum);
}`
  );
  return (
    <div className="flex flex-col h-screen p-4 bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-4">Code Visualizer Playground</h1>
      <textarea
        className="w-full h-40 font-mono p-2 border rounded mb-4 bg-gray-800 text-white border-gray-700"
        value={code}
        onChange={e => setCode(e.target.value)}
      />
      <div className="flex-1 overflow-auto border-t border-gray-700 pt-4">
        {/* <CodeVisualizer code={code} autoPlayIntervalMs={800} /> */}
      </div>
    </div>
  );
} 