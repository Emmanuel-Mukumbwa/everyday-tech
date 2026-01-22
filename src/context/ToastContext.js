// src/context/ToastContext.jsx
import React, { createContext, useContext, useCallback, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Toast from '../components/Toast';
import '../styles/styles.css'; // ensure styles are loaded (already in project)

const ToastContext = createContext();

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(({ title = '', message = '', type = 'info', duration = 4000 } = {}) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    const toast = { id, title, message, type, duration };
    setToasts((prev) => [...prev, toast]);
    return id;
  }, []);

  // auto-remove when duration elapses
  useEffect(() => {
    if (!toasts.length) return;
    const timers = toasts.map((t) => {
      if (!t.duration || t.duration <= 0) return null;
      return setTimeout(() => removeToast(t.id), t.duration);
    });
    return () => timers.forEach((tm) => tm && clearTimeout(tm));
  }, [toasts, removeToast]);

  const contextValue = { addToast, removeToast, toasts };

  // Toast container rendered in portal
  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {typeof document !== 'undefined' &&
        ReactDOM.createPortal(
          <div className="toast-viewport" aria-live="polite" aria-atomic="true">
            {toasts.map((t) => (
              <Toast key={t.id} {...t} onClose={() => removeToast(t.id)} />
            ))}
          </div>,
          document.body
        )}
    </ToastContext.Provider>
  );
}
