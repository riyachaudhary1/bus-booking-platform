// src/components/Navbar.js
// Navigation bar with theme toggle button

import React from 'react';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo/Title */}
        <div className="navbar-logo">
          <h1> BusBooker</h1>
        </div>

        {/* Navigation Links */}
        <div className="navbar-menu">
          <a href="#home" className="navbar-link">Home</a>
          <a href="#bookings" className="navbar-link">My Bookings</a>
          <a href="#community" className="navbar-link">Community</a>
          <a href="#routes" className="navbar-link">Routes</a>
        </div>

        {/* Right side - Dark Mode Button */}
        <div className="navbar-right">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
