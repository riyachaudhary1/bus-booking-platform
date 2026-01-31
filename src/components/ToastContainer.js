// src/components/ToastContainer.js
// Container for displaying all toasts

import React from 'react';
import { useNotification } from '../context/NotificationContext';
import Toast from './Toast';
import '../styles/Toast.css';

const ToastContainer = () => {
  const { toasts } = useNotification();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          notification={toast}
          onClose={() => {}}
        />
      ))}
    </div>
  );
};

export default ToastContainer;
