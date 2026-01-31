// src/components/PostCard.js
// Displays a single post with likes and comments

import React, { useState } from 'react';
import { useCommunity } from '../context/CommunityContext';
import { useLanguage } from '../context/LanguageContext';
import '../styles/PostCard.css';

const PostCard = ({ post }) => {
  const { likePost, reportPost, getPostComments, addComment } = useCommunity();
  const { t } = useLanguage();
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [isLiked, setIsLiked] = useState(false);

  const postComments = getPostComments(post.id);
  const currentUserId = 'current_user';

  const handleLike = () => {
    likePost(post.id, currentUserId);
    setIsLiked(!isLiked);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      addComment(post.id, {
        userId: currentUserId,
        username: 'You',
        content: commentText
      });
      setCommentText('');
    }
  };

  const handleReport = () => {
    if (window.confirm('Report this post?')) {
      reportPost(post.id);
      alert('Post reported and hidden');
    }
  };

  const formatDate = (date) => {
    const now = new Date();
    const diff = now - new Date(date);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="post-card">
      {/* Post Header */}
      <div className="post-header">
        <div className="post-user-info">
          <div className="post-avatar">{post.image}</div>
          <div className="post-user-details">
            <h3 className="post-username">
              {post.username}
              {post.userVerified && <span className="verified-badge">✓</span>}
            </h3>
            <p className="post-category">{post.category} • {formatDate(post.createdAt)}</p>
          </div>
        </div>
        <button className="post-menu-btn" onClick={handleReport}>⋮</button>
      </div>

      {/* Post Content */}
      <div className="post-content">
        <h2 className="post-title">{post.title}</h2>
        <p className="post-text">{post.content}</p>
      </div>

      {/* Post Actions */}
      <div className="post-actions">
        <button 
          className={`action-btn ${isLiked ? 'liked' : ''}`}
          onClick={handleLike}
        >
          👍 {post.likes} Likes
        </button>
        <button 
          className="action-btn"
          onClick={() => setShowComments(!showComments)}
        >
          💬 {post.comments} Comments
        </button>
        <button className="action-btn" onClick={handleReport}>
          🚩 Report
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="comments-section">
          <h4>Comments ({postComments.length})</h4>

          {/* Comment Input */}
          <form className="comment-form" onSubmit={handleCommentSubmit}>
            <input
              type="text"
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="comment-input"
            />
            <button type="submit" className="comment-submit-btn">Send</button>
          </form>

          {/* Display Comments */}
          <div className="comments-list">
            {postComments.length === 0 ? (
              <p className="no-comments">No comments yet. Be the first to comment!</p>
            ) : (
              postComments.map(comment => (
                <div key={comment.id} className="comment-item">
                  <div className="comment-header">
                    <strong>{comment.username}</strong>
                    <span className="comment-time">{formatDate(comment.createdAt)}</span>
                  </div>
                  <p className="comment-text">{comment.content}</p>
                  <div className="comment-actions">
                    <button className="comment-like-btn">👍 {comment.likes}</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
