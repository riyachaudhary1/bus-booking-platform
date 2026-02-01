// src/components/RoutePlannerPage.js
// Main route planning page

import React, { useState } from 'react';
import RouteSearch from './RouteSearch';
import RouteResults from './RouteResults';
import { useRoute } from '../context/RouteContext';
import '../styles/RoutePlannerPage.css';

const RoutePlannerPage = () => {
  const { selectedRoute, selectRoute } = useRoute();
  const [hasSearched, setHasSearched] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchComplete = (results) => {
    setSearchResults(results);
    setHasSearched(true);
  };

  const handleRouteSelect = (route) => {
    selectRoute(route);
  };

  return (
    <div className="route-planner-page">
      <div className="route-planner-header">
        <h1>🗺️ Route Planner</h1>
        <p>Find the best routes for your journey</p>
      </div>

      <div className="route-planner-container">
        {/* Search Section */}
        <RouteSearch onSearchComplete={handleSearchComplete} />

        {/* Results Section */}
        {hasSearched && (
          <div className="results-section">
            <RouteResults routes={searchResults} onRouteSelect={handleRouteSelect} />
          </div>
        )}

        {/* Selected Route Details */}
        {selectedRoute && (
          <div className="selected-route-section">
            <h2>Selected Route Details</h2>
            <div className="selected-route-details">
              <div className="detail-row">
                <span className="label">Route:</span>
                <span className="value">{selectedRoute.startLocation} → {selectedRoute.endLocation}</span>
              </div>
              <div className="detail-row">
                <span className="label">Operator:</span>
                <span className="value">{selectedRoute.operator}</span>
              </div>
              <div className="detail-row">
                <span className="label">Bus Type:</span>
                <span className="value">{selectedRoute.busType}</span>
              </div>
              <div className="detail-row">
                <span className="label">Time:</span>
                <span className="value">{selectedRoute.departureTime} - {selectedRoute.arrivalTime}</span>
              </div>
              <div className="detail-row">
                <span className="label">Distance:</span>
                <span className="value">{selectedRoute.distance} km</span>
              </div>
              <div className="detail-row">
                <span className="label">Duration:</span>
                <span className="value">{selectedRoute.duration} hours</span>
              </div>
              <div className="detail-row">
                <span className="label">Price:</span>
                <span className="value price">₹{selectedRoute.cost}</span>
              </div>
              <button className="book-route-btn">🎫 Book This Route</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoutePlannerPage;
