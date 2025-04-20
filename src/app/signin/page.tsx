"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  FaEnvelope,
  FaLock,
  FaGoogle,
  FaFacebookF,
  FaInfoCircle,
  FaChevronRight,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

// Define the steps for sign in
const STEPS = {
  EMAIL: 0,
  PASSWORD: 1,
};

export default function SignIn() {
  const [currentStep, setCurrentStep] = useState(STEPS.EMAIL);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [formFocused, setFormFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const { login, isLoading } = useAuth();

  useEffect(() => {
    if (error) {
      setToastMessage(error);
      setShowToast(true);

      const timer = setTimeout(() => {
        setShowToast(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleFocus = () => {
    setFormFocused(true);
  };

  const handleBlur = () => {
    setFormFocused(false);
  };

  const validateCurrentStep = (): boolean => {
    const newErrors: Record<string, string> = {};

    switch (currentStep) {
      case STEPS.EMAIL:
        if (!email) {
          newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
          newErrors.email = "Please enter a valid email address";
        }
        break;

      case STEPS.PASSWORD:
        if (!password) {
          newErrors.password = "Password is required";
        }
        break;
    }

    setFieldErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateCurrentStep()) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      await login(email, password);
      router.push("/dashboard");
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    }
  };

  // Calculate progress percentage
  const progressPercentage =
    ((currentStep + 1) / Object.keys(STEPS).length) * 100;

  const renderStepContent = () => {
    switch (currentStep) {
      case STEPS.EMAIL:
        return (
          <div className="p-8">
            <h2 className="mb-2 text-xl font-semibold text-gray-800">
              Sign in to your account
            </h2>
            <p className="mb-6 text-sm text-gray-500">
              Enter your email to continue
            </p>

            <div className="relative">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaEnvelope
                    className={`${formFocused ? "text-blue-500" : "text-gray-400"} transition-colors`}
                  />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  autoFocus
                  className={`w-full pl-10 pr-4 py-2 border ${fieldErrors.email ? "border-red-500" : formFocused ? "border-blue-500" : "border-gray-300"} rounded-lg focus:outline-none transition-colors`}
                  placeholder="you@example.com"
                />
              </div>
              {fieldErrors.email && (
                <p className="mt-1 text-xs text-red-500">{fieldErrors.email}</p>
              )}
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-8"
            >
              <Button
                type="button"
                onClick={nextStep}
                variant="primary"
                size="lg"
                isFullWidth
                className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl py-3 shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
                rightIcon={<FaChevronRight className="ml-1" />}
              >
                Continue
              </Button>
            </motion.div>

            <div className="mt-8 flex items-center justify-center space-x-4">
              <span className="h-px flex-1 bg-gray-200"></span>
              <span className="text-sm text-gray-500">or continue with</span>
              <span className="h-px flex-1 bg-gray-200"></span>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <motion.button
                type="button"
                className="flex items-center justify-center rounded-xl border border-gray-300 bg-white backdrop-blur-sm py-2.5 text-sm font-medium text-gray-700 transition-all hover:bg-white hover:shadow-md"
                aria-label="Sign in with Google"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
              >
                <FaGoogle className="mr-2 h-5 w-5 text-red-500" />
                Google
              </motion.button>
              <motion.button
                type="button"
                className="flex items-center justify-center rounded-xl border border-gray-300 bg-white backdrop-blur-sm py-2.5 text-sm font-medium text-gray-700 transition-all hover:bg-white hover:shadow-md"
                aria-label="Sign in with Facebook"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
              >
                <FaFacebookF className="mr-2 h-5 w-5 text-blue-600" />
                Facebook
              </motion.button>
            </div>
          </div>
        );

      case STEPS.PASSWORD:
        return (
          <div className="p-8">
            <h2 className="mb-2 text-xl font-semibold text-gray-800">
              Enter your password
            </h2>
            <p className="mb-6 text-sm text-gray-500">
              <span className="font-medium text-gray-700">{email}</span>
            </p>

            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaLock
                    className={`${formFocused ? "text-blue-500" : "text-gray-400"} transition-colors`}
                  />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  autoFocus
                  className={`w-full pl-10 pr-12 py-2 border ${fieldErrors.password ? "border-red-500" : formFocused ? "border-blue-500" : "border-gray-300"} rounded-lg focus:outline-none transition-colors text-gray-900`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash className="h-5 w-5" />
                  ) : (
                    <FaEye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {fieldErrors.password && (
                <p className="mt-1 text-xs text-red-500">
                  {fieldErrors.password}
                </p>
              )}
            </div>

            <div className="mt-2 flex justify-end">
              <Link
                href="/forgot-password"
                className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <div className="mt-8 flex flex-col space-y-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="button"
                  onClick={handleSubmit}
                  variant="primary"
                  size="lg"
                  isLoading={isLoading}
                  isFullWidth
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl py-3 shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
                >
                  Sign In
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="button"
                  onClick={prevStep}
                  variant="outline"
                  size="lg"
                  isFullWidth
                  className="rounded-xl text-gray-700 border-gray-300 hover:bg-gray-50 transition-all"
                >
                  Back
                </Button>
              </motion.div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center py-16 relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-300/20 blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-300/20 blur-3xl"></div>
        <div className="absolute top-[30%] right-[10%] w-[25%] h-[25%] rounded-full bg-purple-300/20 blur-3xl"></div>
        <div className="absolute bottom-[20%] left-[10%] w-[25%] h-[25%] rounded-full bg-teal-300/20 blur-3xl"></div>
      </div>

      {/* Main content */}
      <div className="w-full max-w-md relative z-10 px-6">
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="text-center mb-6">
            <Link href="/" className="inline-block mb-6 relative">
              <motion.div
                className="bg-white backdrop-blur-md p-3 rounded-full shadow-lg"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600">
                  <span className="text-2xl font-serif font-bold text-white">
                    T
                  </span>
                </div>
              </motion.div>
            </Link>
            <motion.h1
              className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              Welcome back
            </motion.h1>
          </div>

          {/* Progress bar - centered and symmetrical */}
          <div className="flex justify-center mb-8">
            <div className="w-2/3 bg-gray-200 h-1 rounded-full">
              <motion.div
                className="bg-blue-600 h-1 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          <motion.div
            className="rounded-2xl overflow-hidden bg-white backdrop-blur-md shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <form onSubmit={(e) => e.preventDefault()}>
                  {renderStepContent()}
                </form>
              </motion.div>
            </AnimatePresence>

            <motion.div
              className="bg-gray-50/80 backdrop-blur-sm p-4 text-center border-t border-gray-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <p className="text-gray-600 text-sm">
                Don't have an account?{" "}
                <Link
                  href="/signup"
                  className="font-medium text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Sign up
                </Link>
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Toast notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white backdrop-blur-md px-6 py-3 rounded-xl shadow-xl border-l-4 border-red-500 flex items-center max-w-md z-50"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 15 }}
          >
            <FaInfoCircle className="text-red-500 mr-3 flex-shrink-0" />
            <p className="text-gray-700">{toastMessage}</p>
            <button
              onClick={() => setShowToast(false)}
              className="ml-4 text-gray-400 hover:text-gray-600"
              aria-label="Close notification"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
