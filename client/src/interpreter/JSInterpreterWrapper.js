import Interpreter from 'js-interpreter';

export class JSInterpreterWrapper {
  constructor(code, setVariables, editor) {
    this.code = code;
    this.setVariables = setVariables;
    this.editor = editor;
    this.interpreter = null;
    this.highlightDecoration = [];
    this.init();
  }

  init() {
    this.interpreter = new Interpreter(this.code, (interpreter, globalObject) => {
      interpreter.setProperty(globalObject, 'console', interpreter.nativeToPseudo({
        log: (...args) => {
          // Optionally handle console.log output
        },
      }));
    });
  }

  run() {
    this.step();
  }

  step() {
    if (this.interpreter && this.interpreter.step()) {
      this.updateVariables();
      this.highlightCurrentNode();
    } else {
      this.clearHighlight();
    }
  }

  updateVariables() {
    // This is a simple example; you may want to extract more variables
    const scope = this.interpreter ? this.interpreter.getScope() : {};
    this.setVariables(scope);
  }

  highlightCurrentNode() {
    if (!this.editor) return;
    const node = this.interpreter.stateStack && this.interpreter.stateStack.length > 0
      ? this.interpreter.stateStack[this.interpreter.stateStack.length - 1].node
      : null;
    if (node && node.start !== undefined && node.end !== undefined) {
      const model = this.editor.getModel();
      const start = model.getPositionAt(node.start);
      const end = model.getPositionAt(node.end);
      this.clearHighlight();
      this.highlightDecoration = this.editor.deltaDecorations([], [
        {
          range: new monaco.Range(start.lineNumber, start.column, end.lineNumber, end.column),
          options: { inlineClassName: 'highlight-token' },
        },
      ]);
    }
  }

  clearHighlight() {
    if (this.editor && this.highlightDecoration.length > 0) {
      this.editor.deltaDecorations(this.highlightDecoration, []);
      this.highlightDecoration = [];
    }
  }
} 