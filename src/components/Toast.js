// src/components/Toast.jsx
import React from 'react';
import { FiCheckCircle, FiInfo, FiAlertCircle, FiX } from 'react-icons/fi';

const ICONS = {
  success: <FiCheckCircle />,
  info: <FiInfo />,
  error: <FiAlertCircle />,
};

export default function Toast({ id, title, message, type = 'info', onClose }) {
  return (
    <div className={`toast-card toast-${type}`} role="status" aria-live="polite" aria-atomic="true">
      <div className="toast-left">{ICONS[type] || ICONS.info}</div>
      <div className="toast-body">
        {title && <div className="toast-title">{title}</div>}
        {message && <div className="toast-message">{message}</div>}
      </div>
      <button className="toast-close btn-ghost" onClick={() => onClose?.()} aria-label="Dismiss notification">
        <FiX />
      </button>
    </div>
  );
}
