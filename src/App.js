// src/App.js
// Main app component wrapped in ThemeProvider

import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <Navbar />
        
        <main className="main-content">
          <section className="hero">
            <h2>Welcome to BusBooker</h2>
            <p>Book buses, share experiences, explore routes</p>
          </section>

          <section className="features">
            <div className="feature-card">
              <h3> Book Buses</h3>
              <p>Find and book buses to your destination</p>
            </div>
            <div className="feature-card">
              <h3> Community</h3>
              <p>Share your travel stories and tips</p>
            </div>
            <div className="feature-card">
              <h3> Reviews</h3>
              <p>Rate routes and read reviews</p>
            </div>
          </section>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;