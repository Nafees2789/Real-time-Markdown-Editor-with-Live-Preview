import React, { useState } from 'react';

const Navbar = ({ onReset, onCopy, syncScroll, setSyncScroll }) => {
  const [copyText, setCopyText] = useState('Copy');

  const handleCopyClick = () => {
    onCopy(); // Copy the text
    setCopyText('Copied'); // Change button text to "Copied"
    setTimeout(() => setCopyText('Copy'), 1000); // Reset after 1 second
  };

  return (
    <div className="navbar">
      <div>
        <button onClick={onReset}>Reset</button>
        <button onClick={handleCopyClick}>{copyText}</button>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={syncScroll}
            onChange={(e) => setSyncScroll(e.target.checked)}
          />
          Sync Scroll
        </label>
      </div>
    </div>
  );
};

export default Navbar;
