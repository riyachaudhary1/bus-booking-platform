// src/components/RouteResults.js
// Display search results

import React, { useState } from 'react';
import RouteCard from './RouteCard';
import '../styles/RouteResults.css';

const RouteResults = ({ routes, onRouteSelect }) => {
  const [sortBy, setSortBy] = useState('price');
  const [filterByType, setFilterByType] = useState('all');

  const filterRoutes = () => {
    let filtered = routes;

    if (filterByType !== 'all') {
      filtered = filtered.filter(r => r.busType.includes(filterByType));
    }

    // Sort routes
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.cost - b.cost;
        case 'duration':
          return a.duration - b.duration;
        case 'rating':
          return b.rating - a.rating;
        case 'departure':
          return a.departureTime.localeCompare(b.departureTime);
        default:
          return 0;
      }
    });

    return filtered;
  };

  const filteredRoutes = filterRoutes();

  if (routes.length === 0) {
    return (
      <div className="no-results">
        <p>No routes found. Try different locations.</p>
      </div>
    );
  }

  return (
    <div className="route-results-container">
      {/* Filters & Sort */}
      <div className="results-controls">
        <div className="sort-control">
          <label>Sort By:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="price">💰 Lowest Price</option>
            <option value="duration">⏱️ Shortest Duration</option>
            <option value="rating">⭐ Highest Rating</option>
            <option value="departure">🕐 Earliest Departure</option>
          </select>
        </div>

        <div className="filter-control">
          <label>Bus Type:</label>
          <select value={filterByType} onChange={(e) => setFilterByType(e.target.value)}>
            <option value="all">All Types</option>
            <option value="Sleeper">Sleeper</option>
            <option value="Sitting">Sitting</option>
            <option value="Semi">Semi Sleeper</option>
          </select>
        </div>
      </div>

      {/* Results Summary */}
      <div className="results-summary">
        <p>Found <strong>{filteredRoutes.length}</strong> routes</p>
      </div>

      {/* Route Cards */}
      <div className="route-cards-list">
        {filteredRoutes.map(route => (
          <RouteCard
            key={route.id}
            route={route}
            onSelect={onRouteSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default RouteResults;
