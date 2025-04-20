import { AppThunk } from "../store";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  signupStart,
  signupSuccess,
  signupFailure,
  logout as logoutAction,
  verificationSuccess,
  updateUser,
} from "../reducers/authReducer";
import AuthService from "../services/AuthService";
import { toast } from "react-hot-toast";

// Login action
export const login =
  (email: string, password: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(loginStart());
      const response = await AuthService.login({ email, password });
      dispatch(loginSuccess({ token: response.token, user: response.user }));
      toast.success("Login successful!");
      return true;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Login failed. Please try again.";
      dispatch(loginFailure(errorMessage));
      toast.error(errorMessage);
      return false;
    }
  };

// Signup action for riders
export const signup =
  (
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    password: string
  ): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(signupStart());
      await AuthService.signup({
        firstName,
        lastName,
        email,
        phone,
        password,
      });
      dispatch(signupSuccess());
      toast.success(
        "Account created successfully! Please check your email for verification."
      );
      return true;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Signup failed. Please try again.";
      dispatch(signupFailure(errorMessage));
      toast.error(errorMessage);
      return false;
    }
  };

// Signup action for drivers
export const driverSignup =
  (
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    password: string,
    licenseNumber: string,
    vehicleType: string,
    vehicleModel: string,
    vehicleColor: string,
    vehicleYear: string,
    vehiclePlateNumber: string
  ): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(signupStart());
      await AuthService.driverSignup({
        firstName,
        lastName,
        email,
        phone,
        password,
        licenseNumber,
        vehicleType,
        vehicleModel,
        vehicleColor,
        vehicleYear,
        vehiclePlateNumber,
      });
      dispatch(signupSuccess());
      toast.success(
        "Driver account created successfully! Please check your email for verification."
      );
      return true;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "Driver signup failed. Please try again.";
      dispatch(signupFailure(errorMessage));
      toast.error(errorMessage);
      return false;
    }
  };

// Logout action
export const logout = (): AppThunk => async (dispatch) => {
  try {
    await AuthService.logout();
    dispatch(logoutAction());
    toast.success("Logged out successfully");
  } catch (error) {
    console.error("Logout error:", error);
    // Still dispatch logout action to clear local state
    dispatch(logoutAction());
  }
};

// Verify account action
export const verifyAccount =
  (email: string, code: string): AppThunk =>
  async (dispatch) => {
    try {
      await AuthService.verifyAccount({ email, code });
      dispatch(verificationSuccess());
      toast.success("Account verified successfully!");
      return true;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "Verification failed. Please try again.";
      toast.error(errorMessage);
      return false;
    }
  };

// Resend verification code action
export const resendVerificationCode =
  (email: string): AppThunk =>
  async () => {
    try {
      await AuthService.resendVerificationCode({ email });
      toast.success("Verification code resent! Please check your email.");
      return true;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to resend verification code. Please try again.";
      toast.error(errorMessage);
      return false;
    }
  };

// Request password reset action
export const requestPasswordReset =
  (email: string): AppThunk =>
  async () => {
    try {
      await AuthService.requestPasswordReset({ email });
      toast.success("Password reset link sent to your email!");
      return true;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to send password reset email. Please try again.";
      toast.error(errorMessage);
      return false;
    }
  };

// Confirm password reset action
export const confirmPasswordReset =
  (email: string, code: string, newPassword: string): AppThunk =>
  async () => {
    try {
      await AuthService.confirmPasswordReset({ email, code, newPassword });
      toast.success(
        "Password reset successfully! You can now login with your new password."
      );
      return true;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "Password reset failed. Please try again.";
      toast.error(errorMessage);
      return false;
    }
  };

// Update user profile action
export const updateUserProfile =
  (userData: Partial<any>): AppThunk =>
  async (dispatch) => {
    try {
      // This would need to be implemented in AuthService
      // await AuthService.updateProfile(userData);
      dispatch(updateUser(userData));
      toast.success("Profile updated successfully!");
      return true;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to update profile. Please try again.";
      toast.error(errorMessage);
      return false;
    }
  };
