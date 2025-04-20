"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  FaShieldAlt,
  FaInfoCircle,
  FaSyncAlt,
  FaArrowLeft,
} from "react-icons/fa";
import { toast } from "react-hot-toast";

export default function Verification() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const router = useRouter();
  const { verifyAccount, resendVerificationCode } = useAuth();

  // Check for email parameter
  useEffect(() => {
    if (!email) {
      // If no email is provided, redirect to signup
      router.push("/signup");
    }
  }, [email, router]);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Handle countdown timer for resending code
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  // Focus first input field on component mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.charAt(0);
    }

    if (value.match(/^[0-9]$/)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Auto focus next input
      if (index < 5 && value !== "") {
        inputRefs.current[index + 1]?.focus();
      }
    } else if (value === "") {
      // Allow empty for backspace
      const newCode = [...code];
      newCode[index] = "";
      setCode(newCode);
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && code[index] === "" && index > 0) {
      // Move to previous input on backspace if current is empty
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();

    if (/^\d{6}$/.test(pastedData)) {
      // If the pasted content is exactly 6 digits
      const newCode = pastedData.split("");
      setCode(newCode);

      // Focus the last input
      inputRefs.current[5]?.focus();
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const verificationCode = code.join("");

    if (verificationCode.length !== 6) {
      setError("Please enter all 6 digits of the verification code");
      toast.error("Please enter all 6 digits of the verification code");
      return;
    }

    if (!email) {
      setError("Email address is required for verification");
      toast.error("Email address is required for verification");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      const result = await verifyAccount({
        email,
        code: verificationCode,
      });

      if (result) {
        toast.success("Account verified successfully!");
        router.push("/dashboard");
      } else {
        setError("Verification failed. Please try again.");
        toast.error("Verification failed. Please try again.");
      }
    } catch (err: any) {
      setError(err.message || "Verification failed. Please try again.");
      toast.error(err.message || "Verification failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendCode = async () => {
    if (!email) {
      setError("Email address is required to resend verification code");
      toast.error("Email address is required to resend verification code");
      return;
    }

    try {
      const result = await resendVerificationCode({ email });
      if (result) {
        toast.success("Verification code has been resent to your email!");
        setTimeLeft(60);
      } else {
        toast.error("Failed to resend verification code. Please try again.");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to resend verification code");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center py-16 relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-300/20 blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-300/20 blur-3xl"></div>
        <div className="absolute top-[30%] right-[10%] w-[25%] h-[25%] rounded-full bg-purple-300/20 blur-3xl"></div>
        <div className="absolute bottom-[30%] left-[10%] w-[25%] h-[25%] rounded-full bg-teal-300/20 blur-3xl"></div>
      </div>

      {/* Floating elements */}
      <motion.div
        className="absolute top-[15%] left-[15%] w-8 h-8 rounded-full bg-blue-400/30 backdrop-blur-sm hidden lg:block"
        animate={{
          y: [0, -20, 0],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          repeat: Infinity,
          duration: 4,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-[20%] right-[12%] w-10 h-10 rounded-full bg-purple-400/30 backdrop-blur-sm hidden lg:block"
        animate={{
          y: [0, 25, 0],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          repeat: Infinity,
          duration: 5,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <motion.div
        className="absolute top-[50%] right-[20%] w-6 h-6 rounded-full bg-teal-400/30 backdrop-blur-sm hidden lg:block"
        animate={{
          y: [0, -15, 0],
          x: [0, -15, 0],
          opacity: [0.6, 0.9, 0.6],
        }}
        transition={{
          repeat: Infinity,
          duration: 6,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Main content */}
      <div className="w-full max-w-md relative z-10 px-6">
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="text-center mb-8">
            <Link href="/" className="inline-block mb-6 relative">
              <motion.div
                className="bg-white backdrop-blur-md p-3 rounded-full shadow-lg"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600">
                  <span className="text-4xl font-serif font-bold text-white">
                    T
                  </span>
                </div>
              </motion.div>
            </Link>
            <motion.h1
              className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              Verify your account
            </motion.h1>
            <motion.p
              className="text-gray-600"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {email ? (
                <>
                  Enter the 6-digit code we sent to{" "}
                  <span className="font-medium">{email}</span>
                </>
              ) : (
                <>Enter the 6-digit code we sent to your email</>
              )}
            </motion.p>
          </div>

          <motion.div
            className="rounded-2xl overflow-hidden bg-white backdrop-blur-md shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="p-8">
              <div className="mb-6 flex justify-center">
                <div className="rounded-full bg-blue-100 p-4">
                  <FaShieldAlt className="h-8 w-8 text-blue-600" />
                </div>
              </div>

              <form onSubmit={handleVerify} className="space-y-8">
                <div>
                  <label className="mb-3 block text-sm font-medium text-gray-700">
                    Verification Code
                  </label>
                  <div
                    className="flex justify-between space-x-2"
                    onPaste={handlePaste}
                  >
                    {code.map((digit, index) => (
                      <motion.div
                        key={index}
                        whileFocus={{ scale: 1.05 }}
                        className="relative"
                      >
                        <input
                          ref={(el) => (inputRefs.current[index] = el)}
                          id={`code-${index}`}
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          maxLength={1}
                          value={digit}
                          onChange={(e) =>
                            handleInputChange(index, e.target.value)
                          }
                          onKeyDown={(e) => handleKeyDown(index, e)}
                          className="w-12 h-14 rounded-lg border-2 border-gray-300 p-3 text-center text-lg font-medium text-gray-900 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                          required
                          aria-label={`Verification code digit ${index + 1}`}
                        />
                        <AnimatePresence>
                          {digit && (
                            <motion.div
                              className="absolute -bottom-1 left-1/2 h-1 w-1 rounded-full bg-blue-500"
                              initial={{ opacity: 0, x: "-50%", scale: 0 }}
                              animate={{ opacity: 1, x: "-50%", scale: 1 }}
                              exit={{ opacity: 0, scale: 0 }}
                            />
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </div>
                  {error && (
                    <p className="mt-2 text-xs text-red-500 text-center">
                      {error}
                    </p>
                  )}
                  <p className="mt-2 text-xs text-gray-500 text-center">
                    Didn't receive the code? Check your spam folder.
                  </p>
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    isLoading={isSubmitting}
                    isFullWidth
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl py-3 shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
                  >
                    Verify Account
                  </Button>
                </motion.div>

                <div className="flex justify-center">
                  {timeLeft > 0 ? (
                    <p className="text-sm text-gray-600 flex items-center">
                      <FaSyncAlt className="animate-spin mr-2 text-blue-500 h-3 w-3" />
                      Resend code in{" "}
                      <span className="font-medium ml-1">{timeLeft}s</span>
                    </p>
                  ) : (
                    <motion.button
                      type="button"
                      onClick={handleResendCode}
                      className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors flex items-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaSyncAlt className="mr-2 h-3 w-3" />
                      Resend code
                    </motion.button>
                  )}
                </div>
              </form>
            </div>

            <motion.div
              className="bg-gray-50/80 backdrop-blur-sm p-6 text-center border-t border-gray-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <Link
                href="/signin"
                className="font-medium text-blue-600 hover:text-blue-700 transition-colors flex items-center justify-center"
              >
                <FaArrowLeft className="mr-2 h-3 w-3" />
                Back to sign in
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
