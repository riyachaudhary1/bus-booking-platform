// src/components/RouteSearch.js
// Search form for finding routes

import React, { useState } from 'react';
import { useRoute } from '../context/RouteContext';
import { useNotification } from '../context/NotificationContext';
import '../styles/RouteSearch.css';

const RouteSearch = ({ onSearchComplete }) => {
  const { searchRoutes, addSearchHistory } = useRoute();
  const { triggerEventNotification } = useNotification();

  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [isSearching, setIsSearching] = useState(false);

  const commonRoutes = [
    { from: 'Delhi', to: 'Chandigarh' },
    { from: 'Delhi', to: 'Mumbai' },
    { from: 'Bangalore', to: 'Mysore' },
    { from: 'Mumbai', to: 'Pune' }
  ];

  const handleQuickRoute = (from, to) => {
    setFromLocation(from);
    setToLocation(to);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (!fromLocation.trim() || !toLocation.trim()) {
      triggerEventNotification('booking_cancelled');
      alert('Please enter both locations');
      return;
    }

    if (fromLocation.toLowerCase() === toLocation.toLowerCase()) {
      triggerEventNotification('booking_cancelled');
      alert('Start and end locations must be different');
      return;
    }

    setIsSearching(true);

    setTimeout(() => {
      const results = searchRoutes(fromLocation, toLocation);
      addSearchHistory({ from: fromLocation, to: toLocation });
      
      triggerEventNotification('booking_confirmed');

      setIsSearching(false);

      if (onSearchComplete) {
        onSearchComplete(results);
      }
    }, 1000);
  };

  const handleSwap = () => {
    const temp = fromLocation;
    setFromLocation(toLocation);
    setToLocation(temp);
  };

  return (
    <div className="route-search-container">
      <div className="route-search-card">
        <h2>🔍 Find Your Route</h2>

        <form onSubmit={handleSearch} className="route-search-form">
          <div className="search-row">
            {/* From Location */}
            <div className="form-group">
              <label htmlFor="from">📍 From</label>
              <input
                type="text"
                id="from"
                placeholder="Enter starting city"
                value={fromLocation}
                onChange={(e) => setFromLocation(e.target.value)}
                className="form-input"
              />
            </div>

            {/* Swap Button */}
            <button
              type="button"
              className="swap-btn"
              onClick={handleSwap}
              title="Swap locations"
            >
              ⇅
            </button>

            {/* To Location */}
            <div className="form-group">
              <label htmlFor="to">📍 To</label>
              <input
                type="text"
                id="to"
                placeholder="Enter destination"
                value={toLocation}
                onChange={(e) => setToLocation(e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          <div className="search-row">
            {/* Travel Date */}
            <div className="form-group">
              <label htmlFor="date">📅 Date</label>
              <input
                type="date"
                id="date"
                value={travelDate}
                onChange={(e) => setTravelDate(e.target.value)}
                className="form-input"
              />
            </div>

            {/* Passengers */}
            <div className="form-group">
              <label htmlFor="passengers">👥 Passengers</label>
              <select
                id="passengers"
                value={passengers}
                onChange={(e) => setPassengers(parseInt(e.target.value))}
                className="form-select"
              >
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Search Button */}
          <button
            type="submit"
            disabled={isSearching}
            className="search-btn"
          >
            {isSearching ? '🔍 Searching...' : '🔍 Search Routes'}
          </button>
        </form>

        {/* Quick Routes */}
        <div className="quick-routes">
          <h4>Popular Routes</h4>
          <div className="quick-route-buttons">
            {commonRoutes.map((route, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickRoute(route.from, route.to)}
                className="quick-route-btn"
              >
                {route.from} → {route.to}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteSearch;
