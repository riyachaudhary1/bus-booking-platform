// src/components/RatingOverview.js
// Shows overall rating statistics for a route

import React from 'react';
import { useReview } from '../context/ReviewContext';
import '../styles/RatingOverview.css';

const RatingOverview = ({ routeId }) => {
  const { getRouteRating } = useReview();
  const ratingData = getRouteRating(routeId);

  if (!ratingData || ratingData.totalReviews === 0) {
    return (
      <div className="rating-overview no-ratings">
        <p>No reviews yet. Be the first to review! 🌟</p>
      </div>
    );
  }

  return (
    <div className="rating-overview">
      <div className="rating-summary">
        <div className="average-rating">
          <h3>{ratingData.averageRating}</h3>
          <p>out of 5</p>
        </div>

        <div className="rating-stars">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={i < Math.round(ratingData.averageRating) ? 'star filled' : 'star'}>
              ★
            </span>
          ))}
        </div>

        <p className="total-reviews">
          Based on {ratingData.totalReviews} review{ratingData.totalReviews !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="rating-distribution">
        {[5, 4, 3, 2, 1].map(rating => (
          <div key={rating} className="distribution-row">
            <span className="rating-label">{rating} ★</span>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${(ratingData.distribution[rating] / ratingData.totalReviews) * 100}%`
                }}
              />
            </div>
            <span className="distribution-count">
              {ratingData.distribution[rating]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingOverview;
