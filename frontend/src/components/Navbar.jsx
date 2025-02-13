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
      {/* Left Side - Title */}
      <h1 className="navbar-title">Markdown Editor</h1>

      {/* Right Side - Buttons & Sync Scroll */}
      <div className="navbar-right">
        {/*Sync Scroll moved after buttons */}
        <div className="sync-scroll-container">
          <input
            type="checkbox"
            id="syncScrollCheckbox"
            checked={syncScroll}
            onChange={(e) => setSyncScroll(e.target.checked)}
          />
          <label htmlFor="syncScrollCheckbox">Sync Scroll</label>
        </div>
        <div className="navbar-buttons">
          <button onClick={onReset}>Reset</button>
          <button onClick={handleCopyClick}>{copyText}</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
