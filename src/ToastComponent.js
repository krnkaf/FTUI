import React, { createContext, useContext, useState, useCallback } from 'react';
import { CToast, CToastBody, CToastHeader } from '@coreui/react';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((title, message, type) => {
    const id = Date.now();
    const newToast = { id, title, message, type };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  }, []);

  const getToastColor = (type) => {
    switch (type) {
      case 1:
        return 'success';
      case 2:
        return 'danger';
      case 3:
        return 'warning';
      default:
        return 'secondary';
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="position-fixed bottom-0 end-0 m-3">
        {toasts.map((toast) => (
          <CToast
            key={toast.id}
            visible
            autohide
            color={getToastColor(toast.type)}
          >
            <CToastHeader>
              <strong className="me-auto">{toast.title}</strong>
            </CToastHeader>
            <CToastBody>{toast.message}</CToastBody>
          </CToast>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
