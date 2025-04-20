"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import authService, {
  LoginRequest,
  SignupRequest,
  DriverSignupRequest,
  VerifyAccountRequest,
  ResendVerificationRequest,
  PasswordResetRequest,
  ConfirmPasswordResetRequest,
  User,
} from "@/services/AuthService";
import { UserRole } from "@/types";
import {
  USER_DATA_KEY,
  AUTH_TOKEN_KEY,
  SESSION_TIMEOUT,
} from "../config/constants";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  isDriver: boolean;
  login: (data: LoginRequest) => Promise<boolean>;
  signup: (data: SignupRequest) => Promise<boolean>;
  driverSignup: (data: DriverSignupRequest) => Promise<boolean>;
  logout: () => void;
  verifyAccount: (data: VerifyAccountRequest) => Promise<boolean>;
  resendVerificationCode: (data: ResendVerificationRequest) => Promise<boolean>;
  requestPasswordReset: (data: PasswordResetRequest) => Promise<boolean>;
  confirmPasswordReset: (data: ConfirmPasswordResetRequest) => Promise<boolean>;
  checkAuth: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  error: null,
  isAuthenticated: false,
  isDriver: false,
  login: async () => false,
  signup: async () => false,
  driverSignup: async () => false,
  logout: () => {},
  verifyAccount: async () => false,
  resendVerificationCode: async () => false,
  requestPasswordReset: async () => false,
  confirmPasswordReset: async () => false,
  checkAuth: async () => false,
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Initial auth check when component mounts
  useEffect(() => {
    const initAuth = async () => {
      await checkAuth();
      setLoading(false);
    };

    initAuth();
  }, []);

  // Function to check authentication status
  const checkAuth = async (): Promise<boolean> => {
    try {
      const response = await authService.checkAuth();

      if (response.user) {
        setUser(response.user);
        return true;
      } else {
        setUser(null);
        return false;
      }
    } catch (err) {
      setUser(null);
      return false;
    }
  };

  // Login function
  const login = async (data: LoginRequest): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const response = await authService.login(data);

      if (response.user) {
        setUser(response.user);
        // Redirect based on user role after successful login
        if (response.user.role === "driver") {
          router.push("/dashboard");
        } else {
          router.push("/dashboard");
        }
        return true;
      } else {
        setError("Login failed. Please try again.");
        return false;
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during login");
      toast.error(err.message || "Login failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Signup function for riders
  const signup = async (data: SignupRequest): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const response = await authService.signup(data);

      if (response.success) {
        // Redirect to verification page
        router.push("/verification?email=" + encodeURIComponent(data.email));
        toast.success("Signup successful! Please verify your account.");
        return true;
      } else {
        setError("Signup failed. Please try again.");
        return false;
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during signup");
      toast.error(err.message || "Signup failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Specialized signup function for drivers
  const driverSignup = async (data: DriverSignupRequest): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const response = await authService.driverSignup(data);

      if (response.success) {
        // Redirect to verification page
        router.push("/verification?email=" + encodeURIComponent(data.email));
        toast.success("Driver signup successful! Please verify your account.");
        return true;
      } else {
        setError("Driver signup failed. Please try again.");
        return false;
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during driver signup");
      toast.error(err.message || "Driver signup failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Account verification function
  const verifyAccount = async (
    data: VerifyAccountRequest
  ): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const response = await authService.verifyAccount(data);

      if (response.success) {
        // If verification includes auto-login
        if (response.user) {
          setUser(response.user);
          router.push("/dashboard");
        } else {
          router.push("/signin?verified=true");
        }
        toast.success("Account verified successfully!");
        return true;
      } else {
        setError("Verification failed. Please try again.");
        return false;
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during verification");
      toast.error(err.message || "Verification failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Resend verification code
  const resendVerificationCode = async (
    data: ResendVerificationRequest
  ): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const response = await authService.resendVerificationCode(data);

      if (response.success) {
        toast.success("Verification code sent successfully!");
        return true;
      } else {
        setError("Failed to send verification code. Please try again.");
        return false;
      }
    } catch (err: any) {
      setError(
        err.message || "An error occurred while sending verification code"
      );
      toast.error(err.message || "Failed to send verification code");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Password reset request
  const requestPasswordReset = async (
    data: PasswordResetRequest
  ): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const response = await authService.requestPasswordReset(data);

      if (response.success) {
        toast.success("Password reset instructions sent to your email!");
        return true;
      } else {
        setError("Failed to request password reset. Please try again.");
        return false;
      }
    } catch (err: any) {
      setError(
        err.message || "An error occurred while requesting password reset"
      );
      toast.error(err.message || "Failed to request password reset");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Confirm password reset
  const confirmPasswordReset = async (
    data: ConfirmPasswordResetRequest
  ): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const response = await authService.confirmPasswordReset(data);

      if (response.success) {
        toast.success("Password reset successful!");
        router.push("/signin?resetSuccess=true");
        return true;
      } else {
        setError("Failed to reset password. Please try again.");
        return false;
      }
    } catch (err: any) {
      setError(err.message || "An error occurred while resetting password");
      toast.error(err.message || "Failed to reset password");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    authService.logout();
    setUser(null);
    router.push("/");
    toast.success("Logged out successfully!");
  };

  // Calculate if user is authenticated
  const isAuthenticated = !!user;

  // Check if user is a driver
  const isDriver = user?.role === "driver";

  // Context value
  const value = {
    user,
    loading,
    error,
    isAuthenticated,
    isDriver,
    login,
    signup,
    driverSignup,
    logout,
    verifyAccount,
    resendVerificationCode,
    requestPasswordReset,
    confirmPasswordReset,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);

export default AuthContext;
