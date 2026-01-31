// src/App.js
// Main app component with all providers

import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import { useLanguage } from './context/LanguageContext';
import './App.css';

// Inner component that uses language (must be inside LanguageProvider)
function AppContent() {
  const { t } = useLanguage();

  return (
    <div className="App">
      <Navbar />
      
      <main className="main-content">
        <section className="hero">
          <h2>{t('hero.title')}</h2>
          <p>{t('hero.subtitle')}</p>
        </section>

        <section className="features">
          <div className="feature-card">
            <h3>{t('features.bookBuses.title')}</h3>
            <p>{t('features.bookBuses.description')}</p>
          </div>
          <div className="feature-card">
            <h3>{t('features.community.title')}</h3>
            <p>{t('features.community.description')}</p>
          </div>
          <div className="feature-card">
            <h3>{t('features.reviews.title')}</h3>
            <p>{t('features.reviews.description')}</p>
          </div>
        </section>
      </main>
    </div>
  );
}

// Wrap everything in providers
function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
