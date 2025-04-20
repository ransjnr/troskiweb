"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaInfoCircle,
  FaCar,
  FaUserPlus,
  FaArrowLeft,
  FaCheck,
  FaChevronRight,
} from "react-icons/fa";
import { toast } from "react-hot-toast";

// Defining the steps of the signup process
const STEPS = {
  USER_TYPE: 0,
  NAME: 1,
  EMAIL: 2,
  PHONE: 3,
  PASSWORD: 4,
  TERMS: 5,
  REVIEW: 6,
};

export default function SignUp() {
  const [currentStep, setCurrentStep] = useState(STEPS.USER_TYPE);
  const [userType, setUserType] = useState<"rider" | "driver" | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [formFocused, setFormFocused] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const { signup, driverSignup } = useAuth();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Clear field error when user types
    if (fieldErrors[name]) {
      setFieldErrors({
        ...fieldErrors,
        [name]: "",
      });
    }
  };

  const handleFocus = () => {
    setFormFocused(true);
  };

  const handleBlur = () => {
    setFormFocused(false);
  };

  const handleUserTypeSelect = (type: "rider" | "driver") => {
    setUserType(type);
    nextStep();
  };

  const validateCurrentStep = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    switch (currentStep) {
      case STEPS.USER_TYPE:
        if (!userType) {
          setError("Please select whether you're a rider or driver");
          return false;
        }
        break;
      
      case STEPS.NAME:
        if (!formData.firstName.trim()) {
          newErrors.firstName = "First name is required";
        }
        if (!formData.lastName.trim()) {
          newErrors.lastName = "Last name is required";
        }
        break;
      
      case STEPS.EMAIL:
        if (!formData.email) {
          newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = "Please enter a valid email address";
        }
        break;
      
      case STEPS.PHONE:
        if (!formData.phone) {
          newErrors.phone = "Phone number is required";
        }
        break;
      
      case STEPS.PASSWORD:
        if (!formData.password) {
          newErrors.password = "Password is required";
        } else if (formData.password.length < 8) {
          newErrors.password = "Password must be at least 8 characters";
        }
        
        if (!formData.confirmPassword) {
          newErrors.confirmPassword = "Please confirm your password";
        } else if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = "Passwords do not match";
        }
        break;
      
      case STEPS.TERMS:
        if (!formData.agreeToTerms) {
          newErrors.agreeToTerms = "You must agree to the terms and conditions";
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
    setIsSubmitting(true);

    try {
      if (!userType) {
        throw new Error("Please select whether you're a rider or driver");
      }

      if (userType === "rider") {
        const result = await signup({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password
        });
        
        if (result) {
          toast.success("Account created! Please check your email for verification code.");
          router.push(`/verification?email=${encodeURIComponent(formData.email)}`);
        }
      } else {
        const result = await driverSignup({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password
        });
        
        if (result) {
          toast.success("Driver account created! Please check your email for verification code.");
          router.push(`/verification?email=${encodeURIComponent(formData.email)}`);
        }
      }
    } catch (err: any) {
      setError(
        err.message || "An error occurred during signup. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate progress percentage
  const progressPercentage = (currentStep / (Object.keys(STEPS).length / 2 - 1)) * 100;

  const renderStepContent = () => {
    switch (currentStep) {
      case STEPS.USER_TYPE:
        return (
          <div className="p-8">
            <h2 className="mb-6 text-center text-xl font-semibold text-gray-800">
              How will you use Troski?
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <motion.button
                type="button"
                onClick={() => handleUserTypeSelect("rider")}
                className="relative overflow-hidden flex flex-col items-center justify-center rounded-xl border-2 p-6 transition-all border-gray-200 hover:border-blue-200"
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.2)",
                  backgroundColor: "rgba(239, 246, 255, 0.7)",
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <div className="mb-4 rounded-full bg-blue-100 p-4 text-blue-600">
                  <FaUserPlus className="h-7 w-7" />
                </div>
                <span className="font-medium text-gray-900">
                  I need rides
                </span>
                <span className="mt-2 text-sm text-gray-500">
                  Sign up as a rider
                </span>
              </motion.button>

              <motion.button
                type="button"
                onClick={() => handleUserTypeSelect("driver")}
                className="relative overflow-hidden flex flex-col items-center justify-center rounded-xl border-2 p-6 transition-all border-gray-200 hover:border-blue-200"
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.2)",
                  backgroundColor: "rgba(239, 246, 255, 0.7)",
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <div className="mb-4 rounded-full bg-blue-100 p-4 text-blue-600">
                  <FaCar className="h-7 w-7" />
                </div>
                <span className="font-medium text-gray-900">
                  I want to drive
                </span>
                <span className="mt-2 text-sm text-gray-500">
                  Sign up as a driver
                </span>
              </motion.button>
            </div>
          </div>
        );
        
      case STEPS.NAME:
        return (
          <div className="p-8">
            <h2 className="mb-2 text-xl font-semibold text-gray-800">
              What's your name?
            </h2>
            <p className="mb-6 text-sm text-gray-500">
              Enter your first and last name as they appear on your ID
            </p>
            
            <div className="space-y-6">
              <div className="relative">
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  autoFocus
                  className={`w-full px-4 py-2 border ${fieldErrors.firstName ? 'border-red-500' : formFocused ? 'border-blue-500' : 'border-gray-300'} rounded-lg focus:outline-none transition-colors`}
                  placeholder="First name"
                />
                {fieldErrors.firstName && (
                  <p className="mt-1 text-xs text-red-500">{fieldErrors.firstName}</p>
                )}
              </div>
              
              <div className="relative">
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-2 border ${fieldErrors.lastName ? 'border-red-500' : formFocused ? 'border-blue-500' : 'border-gray-300'} rounded-lg focus:outline-none transition-colors`}
                  placeholder="Last name"
                />
                {fieldErrors.lastName && (
                  <p className="mt-1 text-xs text-red-500">{fieldErrors.lastName}</p>
                )}
              </div>
            </div>
            
            {renderNavButtons()}
          </div>
        );
        
      case STEPS.EMAIL:
        return (
          <div className="p-8">
            <h2 className="mb-2 text-xl font-semibold text-gray-800">
              What's your email?
            </h2>
            <p className="mb-6 text-sm text-gray-500">
              We'll use this to send you ride receipts and updates
            </p>
            
            <div className="relative">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
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
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  autoFocus
                  className={`w-full pl-10 pr-4 py-2 border ${fieldErrors.email ? 'border-red-500' : formFocused ? 'border-blue-500' : 'border-gray-300'} rounded-lg focus:outline-none transition-colors`}
                  placeholder="you@example.com"
                />
              </div>
              {fieldErrors.email && (
                <p className="mt-1 text-xs text-red-500">{fieldErrors.email}</p>
              )}
            </div>
            
            {renderNavButtons()}
          </div>
        );
        
      case STEPS.PHONE:
        return (
          <div className="p-8">
            <h2 className="mb-2 text-xl font-semibold text-gray-800">
              What's your phone number?
            </h2>
            <p className="mb-6 text-sm text-gray-500">
              We'll text you ride updates and verification codes
            </p>
            
            <div className="relative">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaPhone
                    className={`${formFocused ? "text-blue-500" : "text-gray-400"} transition-colors`}
                  />
                </div>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  autoFocus
                  className={`w-full pl-10 pr-4 py-2 border ${fieldErrors.phone ? 'border-red-500' : formFocused ? 'border-blue-500' : 'border-gray-300'} rounded-lg focus:outline-none transition-colors`}
                  placeholder="+1 (555) 555-5555"
                />
              </div>
              {fieldErrors.phone && (
                <p className="mt-1 text-xs text-red-500">{fieldErrors.phone}</p>
              )}
            </div>
            
            {renderNavButtons()}
          </div>
        );
        
      case STEPS.PASSWORD:
        return (
          <div className="p-8">
            <h2 className="mb-2 text-xl font-semibold text-gray-800">
              Create a strong password
            </h2>
            <p className="mb-6 text-sm text-gray-500">
              Use at least 8 characters with a mix of letters, numbers & symbols
            </p>
            
            <div className="space-y-6">
              <div className="relative">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
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
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    autoFocus
                    className={`w-full pl-10 pr-4 py-2 border ${fieldErrors.password ? 'border-red-500' : formFocused ? 'border-blue-500' : 'border-gray-300'} rounded-lg focus:outline-none transition-colors`}
                    placeholder="••••••••"
                  />
                </div>
                {fieldErrors.password && (
                  <p className="mt-1 text-xs text-red-500">{fieldErrors.password}</p>
                )}
              </div>
              
              <div className="relative">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FaLock
                      className={`${formFocused ? "text-blue-500" : "text-gray-400"} transition-colors`}
                    />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className={`w-full pl-10 pr-4 py-2 border ${fieldErrors.confirmPassword ? 'border-red-500' : formFocused ? 'border-blue-500' : 'border-gray-300'} rounded-lg focus:outline-none transition-colors`}
                    placeholder="••••••••"
                  />
                </div>
                {fieldErrors.confirmPassword && (
                  <p className="mt-1 text-xs text-red-500">{fieldErrors.confirmPassword}</p>
                )}
              </div>
            </div>
            
            {renderNavButtons()}
          </div>
        );
        
      case STEPS.TERMS:
        return (
          <div className="p-8">
            <h2 className="mb-2 text-xl font-semibold text-gray-800">
              Terms and Privacy
            </h2>
            <p className="mb-6 text-sm text-gray-500">
              Please review and agree to our terms to continue
            </p>
            
            <div className="mt-4">
              <label className="flex items-start">
                <div className="relative flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleChange}
                      id="terms"
                      className={`h-4 w-4 rounded border ${fieldErrors.agreeToTerms ? 'border-red-500' : 'border-gray-300'} text-blue-600 focus:ring-blue-500`}
                    />
                  </div>
                </div>
                <span className="ml-3 text-sm text-gray-600">
                  I agree to Troski's{" "}
                  <Link
                    href="/terms"
                    className="font-medium text-blue-600 hover:underline"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="font-medium text-blue-600 hover:underline"
                  >
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>
              {fieldErrors.agreeToTerms && (
                <p className="mt-1 text-xs text-red-500">{fieldErrors.agreeToTerms}</p>
              )}
            </div>
            
            {renderNavButtons()}
          </div>
        );
        
      case STEPS.REVIEW:
        return (
          <div className="p-8">
            <h2 className="mb-2 text-xl font-semibold text-gray-800">
              Review your information
            </h2>
            <p className="mb-6 text-sm text-gray-500">
              Please confirm your details before creating your account
            </p>
            
            <div className="space-y-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500">Account Type</h3>
                <p className="text-gray-900 flex items-center mt-1">
                  {userType === "driver" ? (
                    <>
                      <FaCar className="mr-2 text-blue-500" /> Driver
                    </>
                  ) : (
                    <>
                      <FaUserPlus className="mr-2 text-blue-500" /> Rider
                    </>
                  )}
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500">Name</h3>
                <p className="text-gray-900 mt-1">{formData.firstName} {formData.lastName}</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500">Contact Information</h3>
                <p className="text-gray-900 flex items-center mt-1">
                  <FaEnvelope className="mr-2 text-blue-500" /> {formData.email}
                </p>
                <p className="text-gray-900 flex items-center mt-1">
                  <FaPhone className="mr-2 text-blue-500" /> {formData.phone}
                </p>
              </div>
            </div>
            
            <div className="mt-6 flex flex-col space-y-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="button"
                  onClick={handleSubmit}
                  variant="primary"
                  size="lg"
                  isLoading={isSubmitting}
                  isFullWidth
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl py-3 shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
                >
                  Create Account
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
                  leftIcon={<FaArrowLeft className="mr-1" />}
                >
                  Go Back
                </Button>
              </motion.div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };
  
  const renderNavButtons = () => {
    if (currentStep === STEPS.USER_TYPE) return null;
    
    return (
      <div className="mt-8 flex flex-col space-y-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
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
            leftIcon={<FaArrowLeft className="mr-1" />}
          >
            Back
          </Button>
        </motion.div>
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center py-16 relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-300/20 blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-300/20 blur-3xl"></div>
        <div className="absolute top-[20%] left-[10%] w-[25%] h-[25%] rounded-full bg-purple-300/20 blur-3xl"></div>
        <div className="absolute bottom-[30%] right-[10%] w-[25%] h-[25%] rounded-full bg-teal-300/20 blur-3xl"></div>
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
              Create your account
            </motion.h1>
          </div>

          {/* Progress bar */}
          {currentStep > STEPS.USER_TYPE && (
            <div className="w-full bg-gray-200 h-1 rounded-full mb-8">
              <motion.div
                className="bg-blue-600 h-1 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          )}

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
                {renderStepContent()}
              </motion.div>
            </AnimatePresence>

            <motion.div
              className="bg-gray-50/80 backdrop-blur-sm p-4 text-center border-t border-gray-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <p className="text-gray-600 text-sm">
                Already have an account?{" "}
                <Link
                  href="/signin"
                  className="font-medium text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
