import { useEffect, useRef, useState } from "react";
import * as Babel from "@babel/standalone";
import * as monaco from "monaco-editor";
import Interpreter from "js-interpreter";

export default function JSInterpreter() {
  const monacoRef = useRef(null);
  const [interpreter, setInterpreter] = useState(null);
  const [variables, setVariables] = useState({});
  const [highlightRange, setHighlightRange] = useState(null);

  useEffect(() => {
    monacoRef.current = monaco.editor.create(document.getElementById("editor"), {
      value: `for (let i = 0; i < 3; i++) {\n  console.log(i);\n}`,
      language: "javascript",
      theme: "vs-dark",
      automaticLayout: true,
    });
  }, []);

  const transpile = (code) => {
    return Babel.transform(code, { presets: ["es2015"] }).code;
  };

  const handleStart = () => {
    const rawCode = monacoRef.current.getValue();
    const es5Code = transpile(rawCode);
    const interpreterInstance = new Interpreter(es5Code, initGlobal);
    setInterpreter(interpreterInstance);
  };

  const initGlobal = (interpreter, globalObject) => {
    const wrapper = function () {
      const args = Array.from(arguments).map((arg) => interpreter.pseudoToNative(arg));
      console.log(...args);
    };
    interpreter.setProperty(
      globalObject,
      "console",
      interpreter.createObject(interpreter.OBJECT)
    );
    interpreter.setProperty(
      globalObject.properties["console"],
      "log",
      interpreter.createNativeFunction(wrapper)
    );
  };

  const handleStep = () => {
    if (!interpreter) return;

    const ok = interpreter.step();
    if (interpreter.stateStack.length > 0) {
      const node = interpreter.stateStack[0].node;
      if (node && node.loc) {
        setHighlightRange({
          startLine: node.loc.start.line,
          startCol: node.loc.start.column + 1,
          endLine: node.loc.end.line,
          endCol: node.loc.end.column + 1,
        });
      }
    }

    const globalScope = interpreter.globalScope;
    const vars = {};
    for (let name in globalScope.properties) {
      const val = globalScope.properties[name];
      try {
        vars[name] = interpreter.pseudoToNative(val);
      } catch {
        vars[name] = "Unresolvable";
      }
    }
    setVariables(vars);

    return ok;
  };

  useEffect(() => {
    if (!highlightRange) return;
    monacoRef.current.deltaDecorations([], [
      {
        range: new monaco.Range(
          highlightRange.startLine,
          highlightRange.startCol,
          highlightRange.endLine,
          highlightRange.endCol
        ),
        options: { inlineClassName: "bg-yellow-300/50 rounded-sm" },
      },
    ]);
  }, [highlightRange]);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1" id="editor"></div>
      <div className="p-4 flex justify-between bg-gray-900 text-white text-sm">
        <div className="space-x-2">
          <button onClick={handleStart} className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700">Start</button>
          <button onClick={handleStep} className="px-4 py-2 bg-green-600 rounded hover:bg-green-700">Step</button>
        </div>
        <div className="text-left">
          <div className="font-semibold text-white">Variables:</div>
          <pre className="text-xs text-gray-300 mt-1">{JSON.stringify(variables, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
} 