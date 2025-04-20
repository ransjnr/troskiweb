"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/context/ToastContext";
import { ToastType } from "@/components/ui/Toast";

export default function ToastDemo() {
  const { showToast } = useToast();
  const [message, setMessage] = useState("This is a toast notification");
  const [duration, setDuration] = useState(5000);

  // Function to display different types of toasts
  const displayToast = (type: ToastType) => {
    showToast(message, type, duration);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Toast Notification Demo
          </h1>

          <div className="space-y-6">
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Toast Message
              </label>
              <input
                type="text"
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label
                htmlFor="duration"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Duration (milliseconds)
              </label>
              <input
                type="number"
                id="duration"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                min="1000"
                step="1000"
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <button
                onClick={() => displayToast("success")}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
              >
                Success Toast
              </button>

              <button
                onClick={() => displayToast("error")}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
              >
                Error Toast
              </button>

              <button
                onClick={() => displayToast("warning")}
                className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition-colors"
              >
                Warning Toast
              </button>

              <button
                onClick={() => displayToast("info")}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Info Toast
              </button>
            </div>

            <div className="mt-8 p-4 bg-gray-50 rounded-md border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                How to use toasts in your components:
              </h3>
              <pre className="bg-gray-800 text-gray-100 p-4 rounded-md overflow-x-auto">
                {`// 1. Import the useToast hook
import { useToast } from '@/context/ToastContext';

// 2. Use the hook in your component
function YourComponent() {
  const { showToast } = useToast();
  
  // 3. Show different types of toasts
  const handleSuccess = () => {
    showToast("Operation successful!", "success");
  };
  
  const handleError = () => {
    showToast("An error occurred", "error");
  };
  
  const handleWarning = () => {
    showToast("Warning: this action cannot be undone", "warning");
  };
  
  const handleInfo = () => {
    showToast("Your ride will arrive in 5 minutes", "info");
  };
  
  // ...rest of your component
}`}
              </pre>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
