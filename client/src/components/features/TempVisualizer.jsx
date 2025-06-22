import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaStepForward, FaUndo, FaCode, FaTerminal, FaBars } from 'react-icons/fa';

const CodeVisualizer = () => {
  const [code, setCode] = useState(
    '// Welcome to the Code Visualizer!\n// Type your JavaScript code here and see it execute.\n\nlet a = 1;\nlet b = 2;\nlet c = a + b;\n\nfor (let i = 0; i < 3; i++) {\n  console.log("Iteration: " + i);\n}\n\nfunction greet(name) {\n  return "Hello, " + name + "!";\n}\n\nlet message = greet("World");\nconsole.log(message);'
  );
  const [interpreter, setInterpreter] = useState(null);
  const [scope, setScope] = useState(null);
  const [output, setOutput] = useState([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [scriptsLoaded, setScriptsLoaded] = useState(false);

  const outputRef = useRef(null);

  useEffect(() => {
    const loadScripts = async () => {
      try {
        if (!window.acorn) {
          await new Promise((resolve, reject) => {
            const scriptAcorn = document.createElement('script');
            scriptAcorn.src = '/js/acorn.js';
            scriptAcorn.onload = resolve;
            scriptAcorn.onerror = reject;
            document.body.appendChild(scriptAcorn);
          });
        }
        if (!window.Interpreter) {
           await new Promise((resolve, reject) => {
            const scriptInterpreter = document.createElement('script');
            scriptInterpreter.src = '/js/interpreter.js';
            scriptInterpreter.onload = resolve;
            scriptInterpreter.onerror = reject;
            document.body.appendChild(scriptInterpreter);
          });
        }
        setScriptsLoaded(true);
      } catch (error) {
        console.error("Failed to load interpreter scripts:", error);
      }
    };

    loadScripts();
  }, []);

  const initInterpreter = (codeToRun) => {
    if (scriptsLoaded) {
      const initFunc = (interpreter, globalObject) => {
        const wrapper = function(text) {
          text = text ? text.toString() : '';
          setOutput(prev => [...prev, {type: 'log', text}]);
        };
        interpreter.setProperty(globalObject, 'console.log',
            interpreter.createNativeFunction(wrapper));
      };

      const newInterpreter = new window.Interpreter(codeToRun, initFunc);
      setInterpreter(newInterpreter);
      setIsExecuting(true);
      setScope(newInterpreter.getScope());
      setOutput([]);
    }
  };

  const handleRun = () => {
    initInterpreter(code);
  };

  const handleStep = () => {
    if (interpreter) {
      try {
        if (interpreter.step()) {
          setScope(interpreter.getScope());
          // The timeout gives the UI time to update between steps.
          setTimeout(handleStep, 50); 
        } else {
          setIsExecuting(false);
          setScope(interpreter.getScope());
        }
      } catch (e) {
        setOutput(prev => [...prev, { type: 'error', text: e.toString() }]);
        setIsExecuting(false);
      }
    }
  };
  
  const runFullSpeed = () => {
      if (interpreter) {
        try {
            if (interpreter.run()) {
                setScope(interpreter.getScope());
            } else {
                 // Should not happen.
            }
        } catch(e) {
            setOutput(prev => [...prev, { type: 'error', text: e.toString() }]);
        } finally {
            setIsExecuting(false);
            setScope(interpreter.getScope());
        }
      }
  };
  
  useEffect(() => {
    if(isExecuting && interpreter) {
      runFullSpeed();
    }
  }, [isExecuting, interpreter]);


  const handleReset = () => {
    setInterpreter(null);
    setIsExecuting(false);
    setScope(null);
    setOutput([]);
  };

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const renderScope = (scopeObj) => {
    if (!scopeObj || !scopeObj.properties) {
      return <div className="text-gray-400">No variables in current scope.</div>;
    }

    return Object.entries(scopeObj.properties).map(([key, value]) => {
      if (key === 'console') return null; // Don't show the console object
      let displayValue;
      if (value.isPrimitive) {
        displayValue = JSON.stringify(value.data);
      } else if (value.type === 'function') {
        displayValue = 'Function';
      } else {
        displayValue = value.toString();
      }
      return (
        <div key={key} className="flex justify-between items-center py-1">
          <span className="font-mono text-blue-400">{key}</span>
          <span className="font-mono text-green-400 truncate">{displayValue}</span>
        </div>
      );
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-gradient-to-br from-[#0b0c1a] via-[#0f111f] to-[#101118] 
        rounded-3xl border border-[#2c2c3a] shadow-[0_0_40px_#00f2ff22] p-6 my-8"
    >
      <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
        <FaCode />
        Interactive Code Visualizer
      </h2>
      <div className="flex flex-col md:flex-row gap-4">
        {/* Code Editor */}
        <div className="w-full md:w-1/2">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-96 p-4 bg-[#010101] border border-gray-700 rounded-lg text-white font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter JavaScript code here"
            disabled={isExecuting}
          />
        </div>

        {/* Visualizer and Output */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          {/* Controls */}
          <div className="flex items-center gap-4 bg-white/5 p-3 rounded-lg border border-white/10">
            <button
              onClick={handleRun}
              disabled={isExecuting || !scriptsLoaded}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md text-white font-semibold transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
              <FaPlay /> Run
            </button>
            <button
              onClick={handleStep}
              disabled={!isExecuting || !interpreter}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-semibold transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
              <FaStepForward /> Step
            </button>
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-white font-semibold transition-colors"
            >
              <FaUndo /> Reset
            </button>
            {!scriptsLoaded && <span className="text-yellow-400 text-sm">Loading Interpreter...</span>}
          </div>
          
          {/* Scope Display */}
          <div className="bg-[#010101] border border-gray-700 rounded-lg p-4 flex-grow h-48 overflow-y-auto">
            <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2"><FaBars /> Scope</h3>
            <div className="divide-y divide-gray-700">
              {renderScope(scope)}
            </div>
          </div>

          {/* Console Output */}
          <div className="bg-[#010101] border border-gray-700 rounded-lg p-4 flex-grow h-48 overflow-y-auto" ref={outputRef}>
            <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2"><FaTerminal /> Console</h3>
            {output.map((line, index) => (
              <div key={index} className={`font-mono text-sm ${line.type === 'error' ? 'text-red-500' : 'text-gray-300'}`}>
                {'> '} {line.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CodeVisualizer; 