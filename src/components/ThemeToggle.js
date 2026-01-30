// src/components/ThemeToggle.js
// This is the button that switches between light and dark mode

import React from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  // Get isDarkMode and toggleTheme from context
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button 
      onClick={toggleTheme}
      className="theme-toggle-btn"
      title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {isDarkMode ? ' Light' : ' Dark'}
    </button>
  );
};

export default ThemeToggle;
