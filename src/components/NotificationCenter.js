// src/components/NotificationCenter.js
// Main notification center showing all notifications

import React, { useState } from 'react';
import { useNotification } from '../context/NotificationContext';
import '../styles/NotificationCenter.css';

const NotificationCenter = () => {
  const {
    notifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAll,
    getUnreadCount
  } = useNotification();

  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = getUnreadCount();

  const formatTime = (timestamp) => {
    const now = new Date();
    const diff = now - new Date(timestamp);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return new Date(timestamp).toLocaleDateString();
  };

  const typeColors = {
    success: '#4caf50',
    error: '#f44336',
    warning: '#ff9800',
    info: '#2196f3'
  };

  return (
    <div className="notification-center">
      {/* Bell Icon with Badge */}
      <button
        className="notification-bell"
        onClick={() => setIsOpen(!isOpen)}
        title="View notifications"
      >
        🔔
        {unreadCount > 0 && (
          <span className="notification-badge">{unreadCount > 9 ? '9+' : unreadCount}</span>
        )}
      </button>

      {/* Notification Panel */}
      {isOpen && (
        <div className="notification-panel">
          <div className="notification-panel-header">
            <h3>🔔 Notifications</h3>
            <div className="notification-header-actions">
              {unreadCount > 0 && (
                <button
                  className="mark-all-btn"
                  onClick={markAllAsRead}
                  title="Mark all as read"
                >
                  ✓ Mark all
                </button>
              )}
              {notifications.length > 0 && (
                <button
                  className="clear-all-btn"
                  onClick={clearAll}
                  title="Clear all notifications"
                >
                  🗑️
                </button>
              )}
            </div>
          </div>

          <div className="notification-list">
            {notifications.length === 0 ? (
              <div className="no-notifications">
                <p>📭 No notifications yet</p>
              </div>
            ) : (
              notifications.map(notif => (
                <div
                  key={notif.id}
                  className={`notification-item ${notif.read ? 'read' : 'unread'}`}
                  onClick={() => markAsRead(notif.id)}
                >
                  <div className="notification-item-content">
                    <div className="notification-item-left">
                      <span
                        className="notification-item-icon"
                        style={{ backgroundColor: typeColors[notif.type] }}
                      >
                        {notif.icon}
                      </span>
                    </div>

                    <div className="notification-item-middle">
                      <h4 className="notification-item-title">{notif.title}</h4>
                      <p className="notification-item-message">{notif.message}</p>
                      <small className="notification-item-time">
                        {formatTime(notif.timestamp)}
                      </small>
                    </div>
                  </div>

                  <button
                    className="notification-item-delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNotification(notif.id);
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;
