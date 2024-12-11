import React, { createContext, useContext, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';

const Toast = React.memo(({ title, message, type, onClose }) => {

  const opacity = 0.8;

  const colors = [
    `rgba(128, 128, 128, ${opacity})`,
    `rgba(40, 167, 69, ${opacity})`,
    `rgba(220, 53, 69, ${opacity})`,  
    `rgba(255, 153, 51, ${opacity})`  
  ];

  const backgroundColor = colors[type] || colors[0];
  const textColor = `rgba(255, 255, 255, 1)`;

  return ReactDOM.createPortal(
    <div
      style={{
        position: 'fixed',
        right: '0%',
        bottom: '7vh',
        transform: 'translateX(-10%)',
        padding: '10px 20px',
        backgroundColor,
        color: textColor,
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
    }, 3000);
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
