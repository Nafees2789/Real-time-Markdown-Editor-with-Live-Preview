import React, { useRef, useState, useEffect } from 'react';

const Editor = ({ markdown, setMarkdown, editorRef, onScroll }) => {
  const [lines, setLines] = useState(['1']);
  const lineNumbersRef = useRef(null);

  // Update line numbers when content changes
  useEffect(() => {
    setLines(
      Array.from({ length: markdown.split('\n').length }, (_, i) => i + 1)
    );
  }, [markdown]);

  // Sync line numbers scroll with editor
  const handleScroll = (e) => {
    onScroll(e);
    lineNumbersRef.current.scrollTop = e.target.scrollTop;
  };

  return (
    <div className="editor-container">
      {/* Line Numbers */}
      <div className="line-numbers" ref={lineNumbersRef}>
        {lines.map((num) => (
          <div key={num}>{num}</div>
        ))}
      </div>

      {/* Markdown Editor */}
      <textarea
        ref={editorRef}
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
        onScroll={handleScroll}
        placeholder="Type Markdown here..."
      />
    </div>
  );
};

export default Editor;
