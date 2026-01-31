// src/components/NotificationPreferences.js
// User preferences for notifications

import React from 'react';
import { useNotification } from '../context/NotificationContext';
import '../styles/NotificationPreferences.css';

const NotificationPreferences = ({ onClose }) => {
  const { preferences, updatePreferences } = useNotification();
  const [localPrefs, setLocalPrefs] = React.useState(preferences);

  const handleToggle = (key) => {
    const updated = {
      ...localPrefs,
      [key]: !localPrefs[key]
    };
    setLocalPrefs(updated);
  };

  const handleSave = () => {
    updatePreferences(localPrefs);
    alert('Preferences saved! ✅');
    if (onClose) onClose();
  };

  const handleReset = () => {
    setLocalPrefs(preferences);
  };

  return (
    <div className="notification-preferences">
      <div className="preferences-header">
        <h2>⚙️ Notification Preferences</h2>
        <button className="close-btn" onClick={onClose}>✕</button>
      </div>

      <div className="preferences-content">
        <div className="preference-item">
          <div className="preference-info">
            <h3>📧 Email Notifications</h3>
            <p>Receive booking confirmations and important updates via email</p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={localPrefs.emailNotifications}
              onChange={() => handleToggle('emailNotifications')}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="preference-item">
          <div className="preference-info">
            <h3>🔔 Push Notifications</h3>
            <p>Get real-time notifications on your device</p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={localPrefs.pushNotifications}
              onChange={() => handleToggle('pushNotifications')}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div className="preference-item">
          <div className="preference-info">
            <h3>🎁 Promotional Emails</h3>
            <p>Receive special offers and promotional deals</p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={localPrefs.promotionalEmails}
              onChange={() => handleToggle('promotionalEmails')}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>

      <div className="preferences-footer">
        <button className="btn-reset" onClick={handleReset}>↺ Reset</button>
        <button className="btn-save" onClick={handleSave}>✓ Save Preferences</button>
      </div>
    </div>
  );
};

export default NotificationPreferences;
