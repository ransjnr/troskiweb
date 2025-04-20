"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { toast, ToastOptions } from "react-hot-toast";

type ToastType = "success" | "error" | "info" | "warning";

interface ToastContextType {
  showToast: (message: string, type: ToastType) => void;
}

const ToastContext = createContext<ToastContextType>({
  showToast: () => {}, // Default empty function
});

export function ToastProvider({ children }: { children: ReactNode }) {
  // Function to show different types of toasts
  const showToast = (message: string, type: ToastType) => {
    const options: ToastOptions = {
      duration: 4000,
      position: "top-center",
      // Add custom styling based on toast type
      style: {
        background: getToastBackground(type),
        color: getToastTextColor(type),
        padding: "16px",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
      },
      // Add custom icon based on toast type
      icon: getToastIcon(type),
    };

    toast(message, options);
  };

  // Helper functions for toast styling
  const getToastBackground = (type: ToastType): string => {
    switch (type) {
      case "success":
        return "#10B981";
      case "error":
        return "#EF4444";
      case "warning":
        return "#F59E0B";
      case "info":
      default:
        return "#3B82F6";
    }
  };

  const getToastTextColor = (type: ToastType): string => {
    // White text for all toast types
    return "#FFFFFF";
  };

  const getToastIcon = (type: ToastType) => {
    switch (type) {
      case "success":
        return "✓";
      case "error":
        return "✕";
      case "warning":
        return "⚠";
      case "info":
      default:
        return "ℹ";
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
    </ToastContext.Provider>
  );
}

// Custom hook to use toast
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
