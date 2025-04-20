import apiService, { ApiResponse } from "./ApiService";
import { User } from "./AuthService";

// Interfaces
export interface UserProfile extends User {
  address?: string;
  city?: string;
  country?: string;
  postalCode?: string;
  dateOfBirth?: string;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  profileCompleteness?: number;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  postalCode?: string;
  dateOfBirth?: string;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
}

export interface UpdatePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface NotificationSettings {
  email: {
    marketing: boolean;
    rideUpdates: boolean;
    accountActivity: boolean;
  };
  push: {
    rideUpdates: boolean;
    promotions: boolean;
    driverArrival: boolean;
    paymentReceipts: boolean;
  };
  sms: {
    rideUpdates: boolean;
    accountActivity: boolean;
  };
}

class UserService {
  private readonly baseUrl = "/users";

  /**
   * Get the current user's profile
   */
  public async getProfile(): Promise<UserProfile> {
    const response = await apiService.get<UserProfile>(
      `${this.baseUrl}/profile`
    );
    return response.data as UserProfile;
  }

  /**
   * Update user profile
   * @param data Profile data to update
   */
  public async updateProfile(data: UpdateProfileRequest): Promise<UserProfile> {
    const response = await apiService.put<UserProfile>(
      `${this.baseUrl}/profile`,
      data
    );
    return response.data as UserProfile;
  }

  /**
   * Update user password
   * @param data Password update data
   */
  public async updatePassword(
    data: UpdatePasswordRequest
  ): Promise<ApiResponse> {
    return await apiService.put(`${this.baseUrl}/password`, data);
  }

  /**
   * Upload profile picture
   * @param file The image file to upload
   * @param onProgress Optional callback for upload progress
   */
  public async uploadProfilePicture(
    file: File,
    onProgress?: (percentage: number) => void
  ): Promise<UserProfile> {
    const response = await apiService.uploadFile<UserProfile>(
      `${this.baseUrl}/profile-picture`,
      file,
      {},
      onProgress
    );
    return response.data as UserProfile;
  }

  /**
   * Delete user account
   * @param password Current password for verification
   */
  public async deleteAccount(password: string): Promise<ApiResponse> {
    return await apiService.delete(`${this.baseUrl}/account`, {
      data: { password },
    });
  }

  /**
   * Get user's notification settings
   */
  public async getNotificationSettings(): Promise<NotificationSettings> {
    const response = await apiService.get<NotificationSettings>(
      `${this.baseUrl}/notifications/settings`
    );
    return response.data as NotificationSettings;
  }

  /**
   * Update notification settings
   * @param settings New notification settings
   */
  public async updateNotificationSettings(
    settings: NotificationSettings
  ): Promise<NotificationSettings> {
    const response = await apiService.put<NotificationSettings>(
      `${this.baseUrl}/notifications/settings`,
      settings
    );
    return response.data as NotificationSettings;
  }

  /**
   * Get saved locations
   */
  public async getSavedLocations(): Promise<Location[]> {
    const response = await apiService.get<Location[]>(
      `${this.baseUrl}/locations`
    );
    return response.data as Location[];
  }

  /**
   * Save a new location
   * @param location Location data to save
   */
  public async saveLocation(location: Partial<Location>): Promise<Location> {
    const response = await apiService.post<Location>(
      `${this.baseUrl}/locations`,
      location
    );
    return response.data as Location;
  }

  /**
   * Update a saved location
   * @param locationId ID of the location to update
   * @param location Updated location data
   */
  public async updateLocation(
    locationId: string,
    location: Partial<Location>
  ): Promise<Location> {
    const response = await apiService.put<Location>(
      `${this.baseUrl}/locations/${locationId}`,
      location
    );
    return response.data as Location;
  }

  /**
   * Delete a saved location
   * @param locationId ID of the location to delete
   */
  public async deleteLocation(locationId: string): Promise<ApiResponse> {
    return await apiService.delete(`${this.baseUrl}/locations/${locationId}`);
  }

  /**
   * Get payment methods
   */
  public async getPaymentMethods(): Promise<PaymentMethod[]> {
    const response = await apiService.get<PaymentMethod[]>(
      `${this.baseUrl}/payment-methods`
    );
    return response.data as PaymentMethod[];
  }

  /**
   * Add a new payment method
   * @param paymentMethod Payment method data
   */
  public async addPaymentMethod(
    paymentMethod: Partial<PaymentMethod>
  ): Promise<PaymentMethod> {
    const response = await apiService.post<PaymentMethod>(
      `${this.baseUrl}/payment-methods`,
      paymentMethod
    );
    return response.data as PaymentMethod;
  }

  /**
   * Delete a payment method
   * @param paymentMethodId ID of the payment method to delete
   */
  public async deletePaymentMethod(
    paymentMethodId: string
  ): Promise<ApiResponse> {
    return await apiService.delete(
      `${this.baseUrl}/payment-methods/${paymentMethodId}`
    );
  }

  /**
   * Set default payment method
   * @param paymentMethodId ID of the payment method to set as default
   */
  public async setDefaultPaymentMethod(
    paymentMethodId: string
  ): Promise<ApiResponse> {
    return await apiService.put(
      `${this.baseUrl}/payment-methods/${paymentMethodId}/default`
    );
  }
}

// Create a singleton instance
const userService = new UserService();
export default userService;
