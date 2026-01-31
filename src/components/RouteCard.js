// src/components/RouteCard.js
// Display individual route card

import React from 'react';
import { useRoute } from '../context/RouteContext';
import '../styles/RouteCard.css';

const RouteCard = ({ route, onSelect }) => {
  const { saveRoute, removeSavedRoute, savedRoutes } = useRoute();

  const isSaved = savedRoutes.some(r => r.id === route.id);

  const handleSave = (e) => {
    e.stopPropagation();
    if (isSaved) {
      removeSavedRoute(route.id);
    } else {
      saveRoute(route);
    }
  };

  const getTrafficColor = (level) => {
    switch (level) {
      case 'Low':
        return '#4caf50';
      case 'Medium':
        return '#ff9800';
      case 'High':
        return '#f44336';
      default:
        return '#2196f3';
    }
  };

  return (
    <div className="route-card" onClick={() => onSelect(route)}>
      {/* Header */}
      <div className="route-card-header">
        <div className="route-operator">
          <h3>{route.operator}</h3>
          <span className="route-type">{route.busType}</span>
        </div>
        <button
          className={`save-btn ${isSaved ? 'saved' : ''}`}
          onClick={handleSave}
          title={isSaved ? 'Remove from saved' : 'Save this route'}
        >
          {isSaved ? '❤️' : '🤍'}
        </button>
      </div>

      {/* Time Section */}
      <div className="route-time-section">
        <div className="time-slot">
          <span className="time">{route.departureTime}</span>
          <span className="location">{route.startLocation}</span>
        </div>

        <div className="duration">
          <div className="duration-line" />
          <span className="duration-text">{route.duration}h</span>
        </div>

        <div className="time-slot">
          <span className="time">{route.arrivalTime}</span>
          <span className="location">{route.endLocation}</span>
        </div>
      </div>

      {/* Info Row */}
      <div className="route-info-row">
        <div className="info-item">
          <span className="label">Distance</span>
          <span className="value">{route.distance} km</span>
        </div>

        <div className="info-item">
          <span className="label">Rating</span>
          <span className="value">⭐ {route.rating} ({route.reviews})</span>
        </div>

        <div className="info-item">
          <span className="label">Seats</span>
          <span className="value">{route.seatsAvailable} available</span>
        </div>
      </div>

      {/* Traffic & ETA */}
      <div className="route-traffic">
        <span style={{ color: getTrafficColor(route.congestionLevel) }}>
          🚗 {route.congestionLevel} traffic
        </span>
        <span className="eta-status">⏱️ {route.eta}</span>
      </div>

      {/* Price Section */}
      <div className="route-price-section">
        <span className="price">₹{route.cost}</span>
        <button className="book-btn">Book Now →</button>
      </div>

      {/* Waypoints */}
      {route.waypoints && route.waypoints.length > 0 && (
        <div className="route-waypoints">
          <small>Stops: {route.waypoints.join(', ')}</small>
        </div>
      )}
    </div>
  );
};

export default RouteCard;
