// src/context/LanguageContext.js
// This manages which language is selected

import { createContext, useState, useContext, useEffect } from 'react';

// Import all translation files
import enTranslations from '../locales/en.json';
import hiTranslations from '../locales/hi.json';
import esTranslations from '../locales/es.json';

// Create context
const LanguageContext = createContext();

// All available languages
const translations = {
  en: enTranslations,
  hi: hiTranslations,
  es: esTranslations
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  // Load saved language preference when app starts
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Function to change language
  const changeLanguage = (newLanguage) => {
    if (translations[newLanguage]) {
      setLanguage(newLanguage);
      localStorage.setItem('language', newLanguage);
    }
  };

  // Function to get a translation text
  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (let k of keys) {
      value = value[k];
      if (!value) return key; // Return key if translation not found
    }
    
    return value;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use language
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used inside LanguageProvider');
  }
  return context;
};
