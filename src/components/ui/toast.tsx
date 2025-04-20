"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaCheckCircle,
  FaExclamationCircle, 
  FaInfoCircle, 
  FaExclamationTriangle,
  FaTimes,
  FaTimesCircle
} from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastProps {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
  onClose: (id: string) => void;
}

const toastTypeConfig = {
  success: {
    icon: <FaCheckCircle className="h-5 w-5 text-green-500" />,
    bgColor: 'bg-green-50',
    borderColor: 'border-green-500',
    textColor: 'text-green-800',
  },
  error: {
    icon: <FaTimesCircle className="h-5 w-5 text-red-500" />,
    bgColor: 'bg-red-50',
    borderColor: 'border-red-500',
    textColor: 'text-red-800',
  },
  warning: {
    icon: <FaExclamationCircle className="h-5 w-5 text-yellow-500" />,
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-500',
    textColor: 'text-yellow-800',
  },
  info: {
    icon: <FaInfoCircle className="h-5 w-5 text-blue-500" />,
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-500',
    textColor: 'text-blue-800',
  },
};

export const Toast = ({ id, message, type, duration = 5000, onClose }: ToastProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const { icon, bgColor, borderColor, textColor } = toastTypeConfig[type];

  // Auto-dismiss the toast after duration
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    // Clean up the timer on unmount
    return () => clearTimeout(timer);
  }, [duration]);

  // Call the onClose prop when visibility changes to false
  useEffect(() => {
    if (!isVisible) {
      // Slight delay to allow exit animation to complete
      const closeTimer = setTimeout(() => {
        onClose(id);
      }, 300);
      return () => clearTimeout(closeTimer);
    }
  }, [isVisible, onClose, id]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className={`mb-3 rounded-lg border-l-4 p-4 shadow-md ${bgColor} ${borderColor} flex items-start`}
          role="alert"
        >
          <div className="mr-3 flex-shrink-0 pt-0.5">{icon}</div>
          <div className={`flex-grow ${textColor}`}>{message}</div>
            <button
            onClick={() => setIsVisible(false)}
            className="flex-shrink-0 ml-2 text-gray-400 hover:text-gray-600 focus:outline-none"
            aria-label="Close"
          >
            <IoMdClose className="h-5 w-5" />
            </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export interface ToastListProps {
  toasts: ToastProps[];
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
}

const positionClasses = {
  'top-right': 'top-0 right-0',
  'top-left': 'top-0 left-0',
  'bottom-right': 'bottom-0 right-0',
  'bottom-left': 'bottom-0 left-0',
  'top-center': 'top-0 left-1/2 transform -translate-x-1/2',
  'bottom-center': 'bottom-0 left-1/2 transform -translate-x-1/2',
};

export const ToastList: React.FC<ToastListProps> = ({ 
  toasts, 
  position = 'top-right' 
}) => {
  return (
    <div 
      className={`fixed ${positionClasses[position]} p-4 z-50 max-h-screen overflow-hidden pointer-events-none`}
      aria-live="polite"
      aria-atomic="true"
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <Toast {...toast} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
};

// Toast Container to manage multiple toasts
interface ToastContainerProps {
  children: React.ReactNode;
}

export function ToastContainer({ children }: ToastContainerProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex flex-col items-center p-4 space-y-2">
      {children}
    </div>
  );
}

// Hook for Toast management
export function useToast() {
  const [toasts, setToasts] = useState<
    {
      id: string;
      type: ToastType;
      title?: string;
      message: string;
      duration?: number;
      icon?: React.ReactNode;
    }[]
  >([]);

  const show = (props: {
    type?: ToastType;
    title?: string;
    message: string;
    duration?: number;
    icon?: React.ReactNode;
  }) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prevToasts) => [...prevToasts, { id, ...props }]);
    return id;
  };

  const hide = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  const success = (message: string, title?: string, duration?: number) => {
    return show({ type: "success", title, message, duration });
  };

  const error = (message: string, title?: string, duration?: number) => {
    return show({ type: "error", title, message, duration });
  };

  const warning = (message: string, title?: string, duration?: number) => {
    return show({ type: "warning", title, message, duration });
  };

  const info = (message: string, title?: string, duration?: number) => {
    return show({ type: "info", title, message, duration });
  };

  const ToastList = () => (
    <AnimatePresence>
      {toasts.map((toast, index) => (
        <Toast
          key={toast.id}
          type={toast.type}
          title={toast.title}
          message={toast.message}
          duration={toast.duration}
          isVisible={true}
          icon={toast.icon}
          onClose={() => hide(toast.id)}
        />
      ))}
    </AnimatePresence>
  );

  return {
    toasts,
    show,
    hide,
    success,
    error,
    warning,
    info,
    ToastList,
  };
}
