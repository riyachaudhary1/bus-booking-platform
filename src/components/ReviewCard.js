// src/components/ReviewCard.js
// Displays a single review

import React, { useState } from 'react';
import { useReview } from '../context/ReviewContext';
import '../styles/ReviewCard.css';

const ReviewCard = ({ review, onEdit, onDelete }) => {
  const { markHelpful, reportReview, canEditReview } = useReview();
  const [isHelpful, setIsHelpful] = useState(false);

  const formatDate = (date) => {
    const now = new Date();
    const reviewDate = new Date(date);
    const diff = now - reviewDate;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return reviewDate.toLocaleDateString();
  };

  const canEdit = canEditReview(review.id);

  const handleReport = () => {
    if (window.confirm('Report this review as inappropriate?')) {
      reportReview(review.id);
      alert('Review reported. Thank you!');
    }
  };

  return (
    <div className="review-card">
      {/* Header */}
      <div className="review-header">
        <div className="review-user-info">
          <div className="review-avatar">
            {review.username.charAt(0).toUpperCase()}
          </div>
          <div className="review-user-details">
            <h4>
              {review.username}
              {review.userVerified && <span className="verified-badge">✓</span>}
              {review.isTrusted && <span className="trusted-badge">⭐</span>}
            </h4>
            <p className="review-meta">{formatDate(review.createdAt)}</p>
          </div>
        </div>
        <div className="review-actions">
          {canEdit && (
            <button
              className="review-btn edit-btn"
              onClick={() => onEdit(review)}
              title="Edit review"
            >
              ✏️
            </button>
          )}
          <button
            className="review-btn delete-btn"
            onClick={() => onDelete(review.id)}
            title="Delete review"
          >
            🗑️
          </button>
        </div>
      </div>

      {/* Rating */}
      <div className="review-rating">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={i < review.rating ? 'star filled' : 'star'}>
            ★
          </span>
        ))}
        <span className="rating-value">{review.rating}/5</span>
      </div>

      {/* Title */}
      {review.title && <h3 className="review-title">{review.title}</h3>}

      {/* Content */}
      <p className="review-content">{review.content}</p>

      {/* Footer */}
      <div className="review-footer">
        <button
          className={`helpful-btn ${isHelpful ? 'active' : ''}`}
          onClick={() => {
            markHelpful(review.id);
            setIsHelpful(true);
          }}
          disabled={isHelpful}
        >
          👍 {review.helpful} Helpful
        </button>
        <button
          className="report-btn"
          onClick={handleReport}
          title="Report inappropriate review"
        >
          🚩 Report
        </button>
      </div>

      {review.updatedAt && (
        <p className="review-edited">
          (Edited {formatDate(review.updatedAt)})
        </p>
      )}
    </div>
  );
};

export default ReviewCard;
