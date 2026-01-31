// src/components/Navbar.js
// Navigation bar with theme toggle, language selector, and notifications

import React from 'react';
import ThemeToggle from './ThemeToggle';
import LanguageSelector from './LanguageSelector';
import NotificationCenter from './NotificationCenter';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
  const { t } = useLanguage();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo/Title */}
        <div className="navbar-logo">
          <h1>{t('navbar.logo')}</h1>
        </div>

        {/* Navigation Links */}
        <div className="navbar-menu">
          <a href="#home" className="navbar-link">{t('navbar.home')}</a>
          <a href="#bookings" className="navbar-link">{t('navbar.bookings')}</a>
          <a href="#community" className="navbar-link">{t('navbar.community')}</a>
          <a href="#routes" className="navbar-link">{t('navbar.routes')}</a>
        </div>

        {/* Right side - Notifications, Language, and Theme */}
        <div className="navbar-right">
          <NotificationCenter />
          <LanguageSelector />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
