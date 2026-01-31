// src/context/NotificationContext.js
// Manages all notifications in the app

import { createContext, useState, useContext, useCallback, useEffect } from 'react';

const NotificationContext = createContext();

// Generate unique ID
const generateId = () => '_' + Math.random().toString(36).substr(2, 9);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [toasts, setToasts] = useState([]);
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: true,
    promotionalEmails: false
  });

  // Load from localStorage
  useEffect(() => {
    const savedNotifications = localStorage.getItem('notifications');
    const savedPreferences = localStorage.getItem('notificationPreferences');

    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications));
    }

    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences));
    }
  }, []);

  // Save notifications
  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Save preferences
  useEffect(() => {
    localStorage.setItem('notificationPreferences', JSON.stringify(preferences));
  }, [preferences]);

  // Show toast notification
  const showToast = useCallback((notification) => {
    const toastId = generateId();
    const toast = {
      id: toastId,
      ...notification
    };

    setToasts(prev => [...prev, toast]);

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== toastId));
    }, 5000);
  }, []);

  // Add notification
  const addNotification = useCallback((data) => {
    const notification = {
      id: generateId(),
      type: data.type || 'info',
      title: data.title,
      message: data.message,
      icon: data.icon || '📢',
      timestamp: new Date(),
      read: false,
      action: data.action || null
    };

    setNotifications(prev => [notification, ...prev]);

    if (data.showToast !== false) {
      showToast(notification);
    }

    return notification;
  }, [showToast]);

  // Mark as read
  const markAsRead = useCallback((notificationId) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  }, []);

  // Mark all as read
  const markAllAsRead = useCallback(() => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  }, []);

  // Delete notification
  const deleteNotification = useCallback((notificationId) => {
    setNotifications(prev =>
      prev.filter(notif => notif.id !== notificationId)
    );
  }, []);

  // Clear all
  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  // Update preferences
  const updatePreferences = useCallback((newPreferences) => {
    setPreferences(prev => ({
      ...prev,
      ...newPreferences
    }));
  }, []);

  // Get unread count
  const getUnreadCount = useCallback(() => {
    return notifications.filter(n => !n.read).length;
  }, [notifications]);

  // Trigger event notification
  const triggerEventNotification = useCallback((event) => {
    const eventNotifications = {
      'booking_confirmed': {
        title: '🎉 Booking Confirmed!',
        message: 'Your bus booking has been confirmed.',
        icon: '🚌',
        type: 'success'
      },
      'booking_cancelled': {
        title: '❌ Booking Cancelled',
        message: 'Your booking has been cancelled.',
        icon: '🚫',
        type: 'warning'
      },
      'new_comment': {
        title: '💬 New Comment',
        message: 'Someone commented on your post!',
        icon: '💬',
        type: 'info'
      },
      'new_like': {
        title: '👍 Someone Liked Your Post',
        message: 'Your post got a new like!',
        icon: '👍',
        type: 'info'
      },
      'schedule_change': {
        title: '⏰ Schedule Changed',
        message: 'Your bus schedule has been updated.',
        icon: '⏰',
        type: 'warning'
      },
      'promotion': {
        title: '🎁 Special Offer',
        message: 'Check out our latest discount!',
        icon: '🎁',
        type: 'info'
      },
      'journey_reminder': {
        title: '🚌 Journey Reminder',
        message: 'Your bus departs in 2 hours!',
        icon: '🚌',
        type: 'info'
      }
    };

    const notifData = eventNotifications[event];
    if (notifData) {
      addNotification(notifData);
    }
  }, [addNotification]);

  return (
    <NotificationContext.Provider value={{
      notifications,
      toasts,
      preferences,
      addNotification,
      showToast,
      markAsRead,
      markAllAsRead,
      deleteNotification,
      clearAll,
      updatePreferences,
      getUnreadCount,
      triggerEventNotification
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used inside NotificationProvider');
  }
  return context;
};
