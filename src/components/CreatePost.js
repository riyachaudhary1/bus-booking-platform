// src/components/CreatePost.js (Updated)
// Form to create new posts with notifications

import React, { useState } from 'react';
import { useCommunity } from '../context/CommunityContext';
import { useLanguage } from '../context/LanguageContext';
import { useNotification } from '../context/NotificationContext';
import '../styles/CreatePost.css';

const CreatePost = ({ onPostCreated }) => {
  const { createPost } = useCommunity();
  const { t } = useLanguage();
  const { triggerEventNotification } = useNotification();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'tips'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { value: 'tips', label: '💡 Travel Tips' },
    { value: 'route', label: '🚌 Route Experience' },
    { value: 'general', label: '📝 General' },
    { value: 'destination', label: '📍 Destination' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.content.trim()) {
      triggerEventNotification('error', {
        title: '❌ Empty Fields',
        message: 'Please fill in all fields'
      });
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      createPost({
        userId: 'current_user',
        username: 'You',
        userVerified: true,
        title: formData.title,
        content: formData.content,
        category: formData.category,
        image: '📝'
      });

      setFormData({
        title: '',
        content: '',
        category: 'tips'
      });

      setIsSubmitting(false);

      // Show notification
      triggerEventNotification('booking_confirmed');

      if (onPostCreated) {
        onPostCreated();
      }
    }, 500);
  };

  return (
    <div className="create-post-container">
      <div className="create-post-card">
        <h2>✍️ Share Your Story</h2>
        <p className="create-post-subtitle">Share your travel experience with the community</p>

        <form onSubmit={handleSubmit} className="create-post-form">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="What's your experience?"
              value={formData.title}
              onChange={handleChange}
              maxLength="100"
              className="form-input"
            />
            <small>{formData.title.length}/100 characters</small>
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="form-select"
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="content">Description</label>
            <textarea
              id="content"
              name="content"
              placeholder="Tell us about your experience... (minimum 10 characters)"
              value={formData.content}
              onChange={handleChange}
              minLength="10"
              maxLength="500"
              rows="5"
              className="form-textarea"
            />
            <small>{formData.content.length}/500 characters</small>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="submit-btn"
          >
            {isSubmitting ? 'Posting...' : 'Post to Community 🚀'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
