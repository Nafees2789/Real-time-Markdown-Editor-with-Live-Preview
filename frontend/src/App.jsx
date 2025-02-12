import React, { useState, useRef } from 'react';
import Navbar from './components/Navbar';
import Editor from './components/Editor';
import Preview from './components/Preview';
import './styles.css';

const App = () => {
  const [markdown, setMarkdown] = useState('');
  const [syncScroll, setSyncScroll] = useState(false);
  const editorRef = useRef(null);
  const previewRef = useRef(null);
  const isSyncingRef = useRef(false);

  // Function to sync scrolling
  const handleScroll = (source, target) => {
    if (!syncScroll || isSyncingRef.current) return;

    isSyncingRef.current = true;
    const scrollPercentage =
      source.scrollTop / (source.scrollHeight - source.clientHeight);
    target.scrollTop =
      scrollPercentage * (target.scrollHeight - target.clientHeight);
    isSyncingRef.current = false;
  };

  return (
    <div>
      <Navbar
        onReset={() => setMarkdown('')}
        onCopy={() => navigator.clipboard.writeText(markdown)}
        syncScroll={syncScroll}
        setSyncScroll={setSyncScroll}
      />
      <div className="editor-preview-container">
        <Editor
          markdown={markdown}
          setMarkdown={setMarkdown}
          editorRef={editorRef}
          onScroll={() => handleScroll(editorRef.current, previewRef.current)}
        />
        <Preview
          markdown={markdown}
          previewRef={previewRef}
          onScroll={() => handleScroll(previewRef.current, editorRef.current)}
        />
      </div>
    </div>
  );
};

export default App;
