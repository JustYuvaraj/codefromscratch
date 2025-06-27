import React, { useEffect, useRef, useState } from 'react';
import * as monaco from 'monaco-editor';
import * as Babel from '@babel/standalone';
import { JSInterpreterWrapper } from '../../interpreter/JSInterpreterWrapper';

const defaultCode = `for (let i = 0; i < 3; i++) {\n  console.log(i);\n}`;

const VisualDebugger = () => {
  const monacoRef = useRef(null);
  const editorRef = useRef(null);
  const [variables, setVariables] = useState({});
  const [interpreter, setInterpreter] = useState(null);
  const [code, setCode] = useState(defaultCode);

  useEffect(() => {
    if (!editorRef.current) {
      editorRef.current = monaco.editor.create(document.getElementById('editor'), {
        value: defaultCode,
        language: 'javascript',
        theme: 'vs-dark',
        automaticLayout: true,
      });
      editorRef.current.onDidChangeModelContent(() => {
        setCode(editorRef.current.getValue());
      });
    }
    return () => {
      if (editorRef.current) {
        editorRef.current.dispose();
        editorRef.current = null;
      }
    };
  }, []);

  const handleStart = () => {
    const transpiled = Babel.transform(code, { presets: ['env'] }).code;
    const wrapper = new JSInterpreterWrapper(transpiled, setVariables, editorRef.current);
    setInterpreter(wrapper);
    wrapper.run();
  };

  const handleStep = () => {
    if (interpreter) {
      interpreter.step();
    }
  };

  return (
    <div className="flex h-screen flex-col">
      <div className="flex-1" id="editor"></div>
      <div className="p-4 bg-gray-900 text-white">
        <button onClick={handleStart} className="btn">Start</button>
        <button onClick={handleStep} className="btn">Step</button>
        <div>
          <strong>Variables:</strong>
          <pre>{JSON.stringify(variables, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
};

export default VisualDebugger; 