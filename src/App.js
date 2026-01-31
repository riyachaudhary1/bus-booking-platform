// src/App.js
// Main app with all providers and community

import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { CommunityProvider } from './context/CommunityContext';
import Navbar from './components/Navbar';
import CommunityPage from './components/CommunityPage';
import './App.css';

function AppContent() {
  return (
    <div className="App">
      <Navbar />
      <CommunityPage />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <CommunityProvider>
          <AppContent />
        </CommunityProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
