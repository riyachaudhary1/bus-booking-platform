// src/App.js
// Main app with all providers

import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { CommunityProvider } from './context/CommunityContext';
import { NotificationProvider } from './context/NotificationContext';
import { ReviewProvider } from './context/ReviewContext';
import Navbar from './components/Navbar';
import ToastContainer from './components/ToastContainer';
import RoutesPage from './components/RoutesPage';
import './App.css';

function AppContent() {
  return (
    <div className="App">
      <Navbar />
      <ToastContainer />
      <RoutesPage />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <NotificationProvider>
          <CommunityProvider>
            <ReviewProvider>
              <AppContent />
            </ReviewProvider>
          </CommunityProvider>
        </NotificationProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
