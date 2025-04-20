import axios from "axios";
import { UserRole } from "@/types";
import { API_URL, AUTH_TOKEN_KEY, USER_DATA_KEY } from "@/config/constants";
import emailService from "./EmailService";

// Define the API base URL - would be an environment variable in production
const API_BASE_URL = API_URL;

// Check if we're running in the browser
const isBrowser = typeof window !== "undefined";

// Create an axios instance with default configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // To handle cookies for session management
});

// Add request interceptor to include auth token in all requests
if (isBrowser) {
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem(AUTH_TOKEN_KEY);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Add response interceptor to handle auth errors
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // Handle token expiration/invalid cases
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          // Try to refresh the token
          const refreshToken = localStorage.getItem("troski_refresh_token");
          if (refreshToken) {
            const response = await api.post("/auth/refresh-token", {
              refreshToken,
            });
            const { token } = response.data;

            localStorage.setItem(AUTH_TOKEN_KEY, token);

            // Retry the original request with the new token
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          }
        } catch (refreshError) {
          // If refresh fails, redirect to login
          window.location.href = "/signin";
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );
}

// Define types for API responses and requests
export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

export interface DriverSignupRequest extends SignupRequest {
  vehicleType: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: number;
  licenseNumber: string;
}

export interface VerifyAccountRequest {
  email: string;
  code: string;
}

export interface ResendVerificationRequest {
  email: string;
}

export interface PasswordResetRequest {
  email: string;
}

export interface ConfirmPasswordResetRequest {
  email: string;
  code: string;
  newPassword: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "rider" | "driver" | "admin";
  phone: string;
  isVerified: boolean;
  profilePicture?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  success?: boolean;
  message?: string;
}

// Mock user data for development
const MOCK_TOKEN = "mock-jwt-token-for-development";
const generateMockUser = (
  data: any,
  role: "rider" | "driver" = "rider",
  isVerified: boolean = false
): User => ({
  id: `user_${Math.random().toString(36).substr(2, 9)}`,
  email: data.email,
  firstName: data.firstName,
  lastName: data.lastName,
  role: role,
  phone: data.phone || "123-456-7890",
  isVerified: isVerified,
  profilePicture: undefined,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

// Auth Service class
class AuthService {
  private token: string | null = null;

  constructor() {
    // Initialize token from localStorage if available
    if (isBrowser) {
      this.token = localStorage.getItem(AUTH_TOKEN_KEY);
      if (this.token) {
        this.setAuthHeader(this.token);
      }
    }
  }

  private setAuthHeader(token: string) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  private saveToken(token: string) {
    this.token = token;
    if (isBrowser) {
      localStorage.setItem(AUTH_TOKEN_KEY, token);
    }
    this.setAuthHeader(token);
  }

  private clearToken() {
    this.token = null;
    if (isBrowser) {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(USER_DATA_KEY);
    }
    delete api.defaults.headers.common["Authorization"];
  }

  // Login method
  async login(data: LoginRequest): Promise<AuthResponse> {
    try {
      // In development, use mock response instead of actual API call
      if (process.env.NODE_ENV === "development") {
        // Simple validation
        if (data.email && data.password) {
          const mockUser = generateMockUser(
            {
              email: data.email,
              firstName: "Test",
              lastName: "User",
            },
            "rider",
            true
          );

          const response: AuthResponse = {
            user: mockUser,
            token: MOCK_TOKEN,
            success: true,
            message: "Login successful",
          };

          this.saveToken(response.token);

          if (isBrowser) {
            localStorage.setItem(USER_DATA_KEY, JSON.stringify(response.user));
          }

          // Simulate network delay
          await new Promise((resolve) => setTimeout(resolve, 500));

          return response;
        } else {
          throw new Error("Invalid login credentials");
        }
      }

      // Real API call for production
      const response = await api.post<AuthResponse>("/auth/login", data);
      this.saveToken(response.data.token);

      // Store user data in localStorage for quicker access
      if (response.data.user && isBrowser) {
        localStorage.setItem(USER_DATA_KEY, JSON.stringify(response.data.user));
      }

      return response.data;
    } catch (error) {
      this.handleError("Login failed", error);
      throw error;
    }
  }

  // Signup method for riders
  async signup(data: SignupRequest): Promise<AuthResponse> {
    try {
      // In development, use mock response instead of actual API call
      if (process.env.NODE_ENV === "development") {
        // Generate a random 6-digit verification code
        const verificationCode = Math.floor(
          100000 + Math.random() * 900000
        ).toString();

        // Create mock user
        const mockUser = generateMockUser(data, "rider", false);

        const response: AuthResponse = {
          user: mockUser,
          token: MOCK_TOKEN,
          success: true,
          message:
            "Signup successful. Verification code has been sent to your email.",
        };

        // Simulate email sending
        console.log(
          `[MOCK] Verification email sent to ${data.email} with code: ${verificationCode}`
        );

        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        return response;
      }

      // Real implementation for production
      // Generate a random 6-digit verification code
      const verificationCode = Math.floor(
        100000 + Math.random() * 900000
      ).toString();

      // Add verification code to the signup data
      const signupData = {
        ...data,
        verificationCode,
      };

      const response = await api.post<AuthResponse>("/auth/signup", signupData);

      // Send verification email
      await emailService.sendVerificationCode(
        data.email,
        verificationCode,
        data.firstName
      );

      return {
        ...response.data,
        success: true,
        message:
          "Signup successful. Verification code has been sent to your email.",
      };
    } catch (error) {
      this.handleError("Signup failed", error);
      throw error;
    }
  }

  // Signup method specifically for drivers (includes vehicle info)
  async driverSignup(data: DriverSignupRequest): Promise<AuthResponse> {
    try {
      // In development, use mock response instead of actual API call
      if (process.env.NODE_ENV === "development") {
        // Generate a random 6-digit verification code
        const verificationCode = Math.floor(
          100000 + Math.random() * 900000
        ).toString();

        // Create mock user with driver role
        const mockUser = generateMockUser(data, "driver", false);

        const response: AuthResponse = {
          user: mockUser,
          token: MOCK_TOKEN,
          success: true,
          message:
            "Driver signup successful. Verification code has been sent to your email.",
        };

        // Simulate email sending
        console.log(
          `[MOCK] Driver verification email sent to ${data.email} with code: ${verificationCode}`
        );

        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        return response;
      }

      // Real implementation for production
      // Generate a random 6-digit verification code
      const verificationCode = Math.floor(
        100000 + Math.random() * 900000
      ).toString();

      // Add verification code to the signup data
      const signupData = {
        ...data,
        verificationCode,
      };

      const response = await api.post<AuthResponse>(
        "/auth/driver/signup",
        signupData
      );

      // Send verification email
      await emailService.sendVerificationCode(
        data.email,
        verificationCode,
        data.firstName
      );

      return {
        ...response.data,
        success: true,
        message:
          "Driver signup successful. Verification code has been sent to your email.",
      };
    } catch (error) {
      this.handleError("Driver signup failed", error);
      throw error;
    }
  }

  // Verify account using code sent by email
  async verifyAccount(data: VerifyAccountRequest): Promise<AuthResponse> {
    try {
      // In development, use mock response instead of actual API call
      if (process.env.NODE_ENV === "development") {
        // Mock verification - in real app we would check the code
        // For demo purposes, we accept any code
        if (data.code && data.code.length === 6) {
          const mockUser = generateMockUser(
            {
              email: data.email,
              firstName: "Test",
              lastName: "User",
            },
            "rider",
            true
          );

          const response: AuthResponse = {
            user: mockUser,
            token: MOCK_TOKEN,
            success: true,
            message: "Account verified successfully.",
          };

          this.saveToken(response.token);

          if (isBrowser) {
            localStorage.setItem(USER_DATA_KEY, JSON.stringify(response.user));
          }

          // Simulate network delay
          await new Promise((resolve) => setTimeout(resolve, 500));

          return response;
        } else {
          throw new Error("Invalid verification code");
        }
      }

      // Real implementation for production
      const response = await api.post<AuthResponse>("/auth/verify", data);
      this.saveToken(response.data.token);

      // Store user data in localStorage for quicker access
      if (response.data.user && isBrowser) {
        localStorage.setItem(USER_DATA_KEY, JSON.stringify(response.data.user));

        // Send welcome email after successful verification
        await emailService.sendWelcomeEmail(
          response.data.user.email,
          response.data.user.firstName
        );
      }

      return {
        ...response.data,
        success: true,
        message: "Account verified successfully.",
      };
    } catch (error) {
      this.handleError("Verification failed", error);
      throw error;
    }
  }

  // Resend verification code
  async resendVerificationCode(
    data: ResendVerificationRequest
  ): Promise<{ success: boolean; message: string }> {
    try {
      // In development, use mock response instead of actual API call
      if (process.env.NODE_ENV === "development") {
        // Generate a new verification code
        const verificationCode = Math.floor(
          100000 + Math.random() * 900000
        ).toString();

        // Simulate email sending
        console.log(
          `[MOCK] Resent verification email to ${data.email} with code: ${verificationCode}`
        );

        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        return {
          success: true,
          message: "Verification code sent successfully to your email.",
        };
      }

      // Real implementation for production
      // Fetch user data to get the first name
      const userResponse = await api.post<{ user: User }>(
        "/auth/user-by-email",
        {
          email: data.email,
        }
      );

      if (!userResponse.data.user) {
        return {
          success: false,
          message: "User not found with this email address.",
        };
      }

      // Generate a new 6-digit verification code
      const verificationCode = Math.floor(
        100000 + Math.random() * 900000
      ).toString();

      // Update the verification code in the database
      const response = await api.post<{ success: boolean; message: string }>(
        "/auth/resend-verification",
        {
          ...data,
          verificationCode,
        }
      );

      // Send the new verification code via email
      await emailService.sendVerificationCode(
        data.email,
        verificationCode,
        userResponse.data.user.firstName
      );

      return {
        success: true,
        message: "Verification code sent successfully to your email.",
      };
    } catch (error) {
      this.handleError("Failed to resend verification code", error);
      throw error;
    }
  }

  // Logout method
  async logout(): Promise<void> {
    try {
      // In development, just clear local storage
      if (process.env.NODE_ENV === "development") {
        this.clearToken();
        return;
      }

      // Real implementation for production
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      this.clearToken();
    }
  }

  // Request password reset
  async requestPasswordReset(
    data: PasswordResetRequest
  ): Promise<{ success: boolean; message: string }> {
    try {
      // In development, use mock response instead of actual API call
      if (process.env.NODE_ENV === "development") {
        // Generate a reset code
        const resetCode = Math.floor(
          100000 + Math.random() * 900000
        ).toString();

        // Simulate email sending
        console.log(
          `[MOCK] Password reset email sent to ${data.email} with code: ${resetCode}`
        );

        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        return {
          success: true,
          message: "Password reset instructions sent to your email.",
        };
      }

      // Real implementation for production
      // Fetch user data to get the first name
      const userResponse = await api.post<{ user: User }>(
        "/auth/user-by-email",
        {
          email: data.email,
        }
      );

      if (!userResponse.data.user) {
        return {
          success: false,
          message: "User not found with this email address.",
        };
      }

      // Generate a new 6-digit reset code
      const resetCode = Math.floor(100000 + Math.random() * 900000).toString();

      // Send request to the API with the reset code
      const response = await api.post<{ success: boolean; message: string }>(
        "/auth/password-reset/request",
        {
          ...data,
          resetCode,
        }
      );

      // Send the reset code via email
      await emailService.sendPasswordResetEmail(
        data.email,
        resetCode,
        userResponse.data.user.firstName
      );

      return {
        success: true,
        message: "Password reset instructions sent to your email.",
      };
    } catch (error) {
      this.handleError("Password reset request failed", error);
      throw error;
    }
  }

  // Confirm password reset with code and new password
  async confirmPasswordReset(
    data: ConfirmPasswordResetRequest
  ): Promise<{ success: boolean; message: string }> {
    try {
      // In development, use mock response instead of actual API call
      if (process.env.NODE_ENV === "development") {
        // Check if code is valid (for demo, any 6-digit code is valid)
        if (data.code && data.code.length === 6 && data.newPassword) {
          // Simulate network delay
          await new Promise((resolve) => setTimeout(resolve, 500));

          return {
            success: true,
            message: "Password has been reset successfully.",
          };
        } else {
          throw new Error("Invalid reset code or password");
        }
      }

      // Real implementation for production
      const response = await api.post<{ success: boolean; message: string }>(
        "/auth/password-reset/confirm",
        data
      );
      return response.data;
    } catch (error) {
      this.handleError("Password reset confirmation failed", error);
      throw error;
    }
  }

  // Get current user data
  async getCurrentUser(): Promise<User | null> {
    try {
      if (!isBrowser) {
        return null;
      }

      // Try to get user from localStorage first for better performance
      const cachedUser = localStorage.getItem(USER_DATA_KEY);
      if (cachedUser) {
        return JSON.parse(cachedUser);
      }

      // In development, return null if no cached user
      if (process.env.NODE_ENV === "development") {
        return null;
      }

      // If no cached user, fetch from API
      const response = await api.get<{ user: User }>("/auth/me");

      // Cache the user data
      if (response.data.user) {
        localStorage.setItem(USER_DATA_KEY, JSON.stringify(response.data.user));
      }

      return response.data.user;
    } catch (error) {
      console.error("Failed to get current user", error);
      return null;
    }
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    if (!isBrowser) {
      return false;
    }
    return !!localStorage.getItem(AUTH_TOKEN_KEY);
  }

  // Check authentication and return user if authenticated
  async checkAuth(): Promise<AuthResponse> {
    try {
      if (!this.isAuthenticated()) {
        return { user: null, token: null, success: false };
      }

      const user = await this.getCurrentUser();
      if (!user) {
        return { user: null, token: null, success: false };
      }

      return {
        user,
        token: this.token,
        success: true,
      };
    } catch (error) {
      console.error("Auth check failed:", error);
      return { user: null, token: null, success: false };
    }
  }

  // Helper to handle errors
  private handleError(message: string, error: any): void {
    const errorMsg =
      error.response?.data?.message || error.message || "Unknown error";
    console.error(`${message}: ${errorMsg}`);
  }
}

// Create a singleton instance
const authService = new AuthService();

export default authService;
