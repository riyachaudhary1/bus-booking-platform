// src/context/ThemeContext.js
// This is the "brain" that remembers if dark mode is on or off

import { createContext, useState, useContext, useEffect } from 'react';

// Step 1: Create a context (like a channel)
const ThemeContext = createContext();

// Step 2: Create the provider (broadcasts theme to all components)
export const ThemeProvider = ({ children }) => {
  // State: isDarkMode is false by default (light mode)
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Step 3: When app loads, check if user saved a preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      // Tell CSS to use dark colors
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []); // Run only once when app loads

  // Step 4: Function to toggle between light and dark
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      
      // Save the choice to browser memory
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      
      // Tell CSS to apply the right colors
      if (newMode) {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
      }
      
      return newMode;
    });
  };

  // Step 5: Send isDarkMode and toggleTheme to all child components
  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Step 6: Custom hook to easily use this in other components
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used inside ThemeProvider');
  }
  return context;
};
