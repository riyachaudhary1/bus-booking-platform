// src/components/ReviewForm.js
// Form to create and edit reviews

import React, { useState, useEffect } from 'react';
import { useReview } from '../context/ReviewContext';
import { useNotification } from '../context/NotificationContext';
import '../styles/ReviewForm.css';

const ReviewForm = ({ routeId, routeName, onReviewCreated, editingReview = null }) => {
  const { createReview, editReview, canEditReview } = useReview();
  const { triggerEventNotification } = useNotification();

  const [rating, setRating] = useState(editingReview?.rating || 0);
  const [title, setTitle] = useState(editingReview?.title || '');
  const [content, setContent] = useState(editingReview?.content || '');
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const MIN_CHARS = 20;
  const MAX_CHARS = 500;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (rating === 0) {
      triggerEventNotification('booking_cancelled');
      alert('Please select a rating!');
      return;
    }

    if (content.length < MIN_CHARS) {
      triggerEventNotification('booking_cancelled');
      alert(`Review must be at least ${MIN_CHARS} characters`);
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      if (editingReview) {
        if (!canEditReview(editingReview.id)) {
          alert('Can only edit reviews within 24 hours of creation');
          setIsSubmitting(false);
          return;
        }

        editReview(editingReview.id, {
          rating,
          title,
          content
        });

        triggerEventNotification('booking_confirmed');
        alert('Review updated successfully!');
      } else {
        createReview({
          routeId,
          routeName,
          userId: 'current_user',
          username: 'You',
          userVerified: true,
          rating,
          title,
          content
        });

        triggerEventNotification('booking_confirmed');
        alert('Review posted successfully!');

        // Reset form
        setRating(0);
        setTitle('');
        setContent('');
      }

      setIsSubmitting(false);

      if (onReviewCreated) {
        onReviewCreated();
      }
    }, 500);
  };

  return (
    <div className="review-form-container">
      <div className="review-form-card">
        <h2>{editingReview ? ' Edit Your Review' : ' Share Your Review'}</h2>
        <p className="review-form-subtitle">
          {editingReview ? 'Update your experience' : `Help others by sharing your experience on ${routeName}`}
        </p>

        <form onSubmit={handleSubmit} className="review-form">
          {/* Star Rating */}
          <div className="form-group">
            <label>Rate your experience</label>
            <div className="star-rating-input">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  type="button"
                  className={`star-btn ${star <= (hoveredRating || rating) ? 'filled' : ''}`}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                >
                  ★
                </button>
              ))}
            </div>
            <p className="rating-text">{rating}/5 stars</p>
          </div>

          {/* Title */}
          <div className="form-group">
            <label htmlFor="title">Review Title (Optional)</label>
            <input
              type="text"
              id="title"
              placeholder="Summarize your experience"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength="100"
              className="form-input"
            />
            <small>{title.length}/100 characters</small>
          </div>

          {/* Content */}
          <div className="form-group">
            <label htmlFor="content">
              Your Review ({content.length}/{MAX_CHARS} characters)
            </label>
            <textarea
              id="content"
              placeholder={`Share your honest experience... (minimum ${MIN_CHARS} characters)`}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              minLength={MIN_CHARS}
              maxLength={MAX_CHARS}
              rows="5"
              className="form-textarea"
            />
            <small>
              {content.length < MIN_CHARS
                ? `${MIN_CHARS - content.length} more characters needed`
                : 'Ready to submit!'}
            </small>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || rating === 0 || content.length < MIN_CHARS}
            className="submit-btn"
          >
            {isSubmitting ? 'Submitting...' : editingReview ? '✏️ Update Review' : ' Submit Review'}
          </button>
        </form>

        {editingReview && (
          <p className="edit-note">
             Note: You can only edit this review within 24 hours of creation
          </p>
        )}
      </div>
    </div>
  );
};

export default ReviewForm;
