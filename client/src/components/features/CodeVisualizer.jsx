import React, { useState, useEffect, useRef } from 'react';
import { FaPlay, FaStepForward, FaUndo, FaSpinner } from 'react-icons/fa';

// Dynamically load a script
const loadScript = (src) => {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Script load error for ${src}`));
    document.head.appendChild(script);
  });
};

const defaultCode = `let sum = 0;
for (let i = 0; i < 5; i++) {
  sum += i;
  console.log({ currentSum: sum, index: i });
}`;

const CodeVisualizer = ({ code = defaultCode, autoPlayIntervalMs = 500 }) => {
  const [interpreter, setInterpreter] = useState(null);
  const [output, setOutput] = useState([]);
  const [scope, setScope] = useState({});
  const [isExecuting, setIsExecuting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [highlightedLine, setHighlightedLine] = useState(null);
  const [scriptsLoaded, setScriptsLoaded] = useState(false);

  const intervalRef = useRef(null);

  useEffect(() => {
    Promise.all([
      loadScript('/js/acorn.js'),
      loadScript('/js/interpreter.js')
    ]).then(() => {
      setScriptsLoaded(true);
    }).catch(error => console.error(error));
  }, []);

  const initInterpreter = () => {
    if (!scriptsLoaded || !window.Interpreter) return;

    const initFunc = (interpreter, globalObject) => {
      const wrapper = (text) => {
        const outputText = typeof text === 'object' ? JSON.stringify(text, null, 2) : text;
        setOutput(prev => [...prev, String(outputText)]);
      };
      
      const consoleWrapper = interpreter.createObject(interpreter.OBJECT);
      interpreter.setProperty(globalObject, 'console', consoleWrapper);
      
      const logWrapper = interpreter.createNativeFunction(wrapper);
      interpreter.setProperty(consoleWrapper, 'log', logWrapper);
    };

    try {
      const newInterpreter = new window.Interpreter(code, initFunc);
      setInterpreter(newInterpreter);
      setOutput([]);
      setScope({});
      setIsExecuting(false);
      setIsFinished(false);
      setHighlightedLine(null);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    } catch (error) {
      setOutput([error.toString()]);
    }
  };

  useEffect(() => {
    initInterpreter();
  }, [code, scriptsLoaded]);

  const step = () => {
    if (!interpreter || isFinished) return;

    try {
      if (interpreter.step()) {
        const node = interpreter.stateStack[interpreter.stateStack.length - 1].node;
        setHighlightedLine(node.loc.start.line);
        
        const newScope = {};
        const scopeObj = interpreter.getScope();
        for(const prop in scopeObj.properties) {
          if(scopeObj.properties.hasOwnProperty(prop)) {
            // Exclude 'console' from the scope view
            if (prop !== 'console') {
                newScope[prop] = interpreter.pseudoToNative(scopeObj.properties[prop]);
            }
          }
        }
        setScope(newScope);

      } else {
        setIsExecuting(false);
        setIsFinished(true);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
      }
    } catch (error) {
        setOutput(prev => [...prev, error.toString()]);
        setIsExecuting(false);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }
  };

  const run = () => {
    if (isExecuting || isFinished) return;
    setIsExecuting(true);
    intervalRef.current = setInterval(() => {
        step();
    }, autoPlayIntervalMs);
  };

  const handleStep = () => {
    if (isExecuting) {
        clearInterval(intervalRef.current);
        setIsExecuting(false);
    }
    step();
  };

  const reset = () => {
    initInterpreter();
  };
  
  if (!scriptsLoaded) {
    return (
      <div className="flex items-center justify-center p-4 bg-gray-800 rounded-lg">
        <FaSpinner className="animate-spin mr-2" />
        <span>Loading execution engine...</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-sm">
      {/* Code and Controls */}
      <div className="bg-[#1e1e1e] p-4 rounded-lg shadow-lg">
        <h3 className="text-lg font-bold text-white mb-2">Code</h3>
        <div className="bg-gray-900 p-2 rounded relative">
          <pre>
            {code.split('\n').map((line, index) => (
              <div
                key={index}
                className={`transition-colors duration-300 ${
                  highlightedLine === index + 1 ? 'bg-blue-500/30' : ''
                }`}
              >
                <span className="text-gray-500 mr-4 select-none">{index + 1}</span>
                <span>{line}</span>
              </div>
            ))}
          </pre>
        </div>
        <div className="flex space-x-2 mt-4">
          <button onClick={run} disabled={isExecuting || isFinished} className="flex items-center px-3 py-1 bg-green-600 rounded hover:bg-green-700 disabled:bg-gray-500">
            <FaPlay className="mr-1" /> Run
          </button>
          <button onClick={handleStep} disabled={isFinished} className="flex items-center px-3 py-1 bg-blue-600 rounded hover:bg-blue-700 disabled:bg-gray-500">
             <FaStepForward className="mr-1" /> Step
          </button>
          <button onClick={reset} className="flex items-center px-3 py-1 bg-gray-600 rounded hover:bg-gray-700">
            <FaUndo className="mr-1" /> Reset
          </button>
        </div>
      </div>

      {/* Scope and Output */}
      <div className="space-y-4">
        <div className="bg-[#1e1e1e] p-4 rounded-lg shadow-lg">
          <h3 className="text-lg font-bold text-white mb-2">Variables (Scope)</h3>
          <div className="bg-gray-900 p-2 rounded h-40 overflow-y-auto">
            <pre>
              {Object.entries(scope).map(([name, value]) => (
                <div key={name}>
                  <span className="text-purple-400">{name}</span>: <span className="text-green-400">{JSON.stringify(value)}</span>
                </div>
              ))}
            </pre>
          </div>
        </div>
        <div className="bg-[#1e1e1e] p-4 rounded-lg shadow-lg">
          <h3 className="text-lg font-bold text-white mb-2">Console Output</h3>
          <div className="bg-gray-900 p-2 rounded h-40 overflow-y-auto">
            {output.map((line, index) => (
              <div key={index}>{`> ${line}`}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeVisualizer; 