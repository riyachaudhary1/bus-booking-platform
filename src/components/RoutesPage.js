// src/components/RoutesPage.js
// Routes/Reviews page

import React, { useState } from 'react';
import { useReview } from '../context/ReviewContext';
import RatingOverview from './RatingOverview';
import ReviewForm from './ReviewForm';
import ReviewCard from './ReviewCard';
import '../styles/RoutesPage.css';

const RoutesPage = () => {
  const { getRouteReviews, deleteReview } = useReview();
  const [selectedRoute, setSelectedRoute] = useState('delhi-chandigarh');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [editingReview, setEditingReview] = useState(null);

  const routes = [
    { id: 'delhi-chandigarh', name: 'Delhi to Chandigarh' },
    { id: 'delhi-mumbai', name: 'Delhi to Mumbai' },
    { id: 'bangalore-mysore', name: 'Bangalore to Mysore' }
  ];

  const currentRoute = routes.find(r => r.id === selectedRoute);
  const routeReviews = getRouteReviews(selectedRoute);

  const handleEdit = (review) => {
    setEditingReview(review);
    setShowReviewForm(true);
  };

  const handleDelete = (reviewId) => {
    if (window.confirm('Delete this review?')) {
      deleteReview(reviewId);
      alert('Review deleted');
    }
  };

  return (
    <div className="routes-page">
      <div className="routes-header">
        <h1>🛣️ Routes & Reviews</h1>
        <p>Read reviews and share your journey experience</p>
      </div>

      <div className="routes-container">
        {/* Route Selector */}
        <div className="route-selector">
          <h3>Select a Route</h3>
          <div className="route-buttons">
            {routes.map(route => (
              <button
                key={route.id}
                className={`route-btn ${selectedRoute === route.id ? 'active' : ''}`}
                onClick={() => {
                  setSelectedRoute(route.id);
                  setEditingReview(null);
                }}
              >
                {route.name}
              </button>
            ))}
          </div>
        </div>

        {/* Rating Overview */}
        <RatingOverview routeId={selectedRoute} />

        {/* Review Form */}
        <div className="review-form-section">
          <button
            className="write-review-btn"
            onClick={() => {
              setEditingReview(null);
              setShowReviewForm(!showReviewForm);
            }}
          >
            {showReviewForm ? 'Cancel' : '✍️ Write a Review'}
          </button>

          {showReviewForm && (
            <ReviewForm
              routeId={selectedRoute}
              routeName={currentRoute?.name}
              editingReview={editingReview}
              onReviewCreated={() => {
                setShowReviewForm(false);
                setEditingReview(null);
              }}
            />
          )}
        </div>

        {/* Reviews List */}
        <div className="reviews-section">
          <h2>📝 Reviews ({routeReviews.length})</h2>

          {routeReviews.length === 0 ? (
            <div className="no-reviews">
              <p>No reviews yet. Be the first!</p>
            </div>
          ) : (
            <div className="reviews-list">
              {routeReviews.map(review => (
                <ReviewCard
                  key={review.id}
                  review={review}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoutesPage;
