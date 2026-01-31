// src/components/Toast.js
// Temporary notification that appears and auto-disappears

import React from 'react';
import '../styles/Toast.css';

const Toast = ({ notification, onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const typeClass = `toast-${notification.type}`;

  return (
    <div className={`toast ${typeClass}`}>
      <div className="toast-content">
        <span className="toast-icon">{notification.icon}</span>
        <div className="toast-text">
          <h4 className="toast-title">{notification.title}</h4>
          <p className="toast-message">{notification.message}</p>
        </div>
      </div>
      <button className="toast-close" onClick={onClose}>✕</button>
    </div>
  );
};

export default Toast;
