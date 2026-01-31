// src/components/CommunityPage.js
// Main community page with posts and create post form

import React, { useState } from 'react';
import { useCommunity } from '../context/CommunityContext';
import { useLanguage } from '../context/LanguageContext';
import { useNotification } from '../context/NotificationContext';
import CreatePost from './CreatePost';
import PostCard from './PostCard';
import '../styles/CommunityPage.css';

const CommunityPage = () => {
  const { posts } = useCommunity();
  const { t } = useLanguage();
  const { triggerEventNotification } = useNotification();
  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleTestNotification = () => {
    triggerEventNotification('new_comment');
  };

  return (
    <div className="community-page">
      <div className="community-header">
        <h1>💬 Community Hub</h1>
        <p>Share your travel stories, tips, and experiences with fellow travelers</p>
      </div>

      <div className="community-container">
        {/* Create Post Button */}
        <div className="create-post-section">
          <button
            className="create-post-button"
            onClick={() => setShowCreateForm(!showCreateForm)}
          >
            {showCreateForm ? 'Close' : '✍️ Share Your Story'}
          </button>
          <button
            className="test-notification-button"
            onClick={handleTestNotification}
            title="Test a notification"
          >
            📢 Test Notification
          </button>
        </div>

        {/* Create Post Form */}
        {showCreateForm && (
          <CreatePost onPostCreated={() => setShowCreateForm(false)} />
        )}

        {/* Posts Feed */}
        <div className="posts-feed">
          <h2>📰 Latest Posts ({posts.length})</h2>

          {posts.length === 0 ? (
            <div className="no-posts">
              <p>No posts yet. Be the first to share your story! 🚀</p>
            </div>
          ) : (
            posts.map(post => (
              <PostCard key={post.id} post={post} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
