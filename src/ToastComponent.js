import React, { createContext, useContext, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';

const Toast = React.memo(({ title, message, type, onClose }) => {
  const colors = ['#808080', '#28a745', '#dc3545', '#ff9933'];
  const backgroundColor = colors[type] || colors[0];

  return ReactDOM.createPortal(
    <div
      style={{
        position: 'fixed',
        left: '50%',
        bottom: '7vh',
        transform: 'translateX(-50%)',
        padding: '10px 20px',
        backgroundColor,
        color: '#fff',
        borderRadius: '5px',
        zIndex: 9999,
        minWidth: '250px',
      }}
      onAnimationEnd={onClose}
    >
      <strong>{title}</strong>
      <p>{message}</p>
    </div>,
    document.body
  );
});

export const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toastConfig, setToastConfig] = useState(null);
  const [isToastActive, setIsToastActive] = useState(false);

  const showToast = useCallback((title, message, type) => {
    if (isToastActive) return;

    setToastConfig({ title, message, type });
    setIsToastActive(true);

    setTimeout(() => {
      setToastConfig(null);
      setIsToastActive(false);
    }, 5000);
  }, [isToastActive]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toastConfig && (
        <Toast
          title={toastConfig.title}
          message={toastConfig.message}
          type={toastConfig.type}
          onClose={() => {
            setToastConfig(null);
            setIsToastActive(false);
          }}
        />
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
