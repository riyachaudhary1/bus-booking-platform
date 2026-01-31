// src/App.js
// Main app with all providers and components

import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { CommunityProvider } from './context/CommunityContext';
import { NotificationProvider } from './context/NotificationContext';
import Navbar from './components/Navbar';
import ToastContainer from './components/ToastContainer';
import CommunityPage from './components/CommunityPage';
import './App.css';

function AppContent() {
  return (
    <div className="App">
      <Navbar />
      <ToastContainer />
      <CommunityPage />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <NotificationProvider>
          <CommunityProvider>
            <AppContent />
          </CommunityProvider>
        </NotificationProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
