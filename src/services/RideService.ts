import apiService, { ApiResponse } from "./ApiService";
import {
  BookingResult,
  FareEstimateResult,
  Location,
  PaymentMethod,
} from "./BookingService";

// Interfaces
export enum RideStatus {
  REQUESTED = "requested",
  PENDING = "pending",
  ACCEPTED = "accepted",
  ARRIVED = "arrived",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

export interface RideRequest {
  pickupLocation: Location;
  dropoffLocation: Location;
  paymentMethod: PaymentMethod;
  vehicleType?: string;
  scheduledTime?: Date;
  notes?: string;
}

export interface DriverLocation {
  driverId: string;
  latitude: number;
  longitude: number;
  heading: number;
  lastUpdated: Date;
}

export interface Driver {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  profilePicture?: string;
  rating: number;
  totalRides: number;
  vehicleDetails: {
    make: string;
    model: string;
    year: string;
    color: string;
    licensePlate: string;
  };
}

export interface Ride {
  id: string;
  userId: string;
  driverId: string;
  driver: Driver;
  status: RideStatus;
  pickupLocation: Location;
  dropoffLocation: Location;
  fare: number;
  distance: number;
  duration: number;
  paymentMethod: PaymentMethod;
  paymentStatus: "pending" | "completed" | "failed";
  rating?: number;
  feedback?: string;
  createdAt: Date;
  updatedAt: Date;
  startTime?: Date;
  endTime?: Date;
  scheduledTime?: Date;
  estimatedArrivalTime?: Date;
  cancelledBy?: "user" | "driver" | "system";
  cancellationReason?: string;
  notes?: string;
}

export interface RideFilter {
  status?: RideStatus | RideStatus[];
  startDate?: Date;
  endDate?: Date;
  limit?: number;
  offset?: number;
}

class RideService {
  private readonly baseUrl = "/rides";

  /**
   * Estimate the fare for a ride
   * @param pickup Pickup location
   * @param dropoff Dropoff location
   * @param vehicleType Optional vehicle type
   */
  public async estimateFare(
    pickup: Location,
    dropoff: Location,
    vehicleType?: string
  ): Promise<FareEstimateResult> {
    const response = await apiService.post<FareEstimateResult>(
      `${this.baseUrl}/estimate`,
      {
        pickup,
        dropoff,
        vehicleType,
      }
    );
    return response.data as FareEstimateResult;
  }

  /**
   * Book a new ride
   * @param rideRequest Ride request details
   */
  public async bookRide(rideRequest: RideRequest): Promise<BookingResult> {
    const response = await apiService.post<BookingResult>(
      `${this.baseUrl}/book`,
      rideRequest
    );
    return response.data as BookingResult;
  }

  /**
   * Get a specific ride by ID
   * @param rideId ID of the ride to retrieve
   */
  public async getRide(rideId: string): Promise<Ride> {
    const response = await apiService.get<Ride>(`${this.baseUrl}/${rideId}`);
    return response.data as Ride;
  }

  /**
   * Get all rides for the current user
   * @param filter Optional filter for rides
   */
  public async getRides(filter?: RideFilter): Promise<Ride[]> {
    const response = await apiService.get<Ride[]>(this.baseUrl, {
      params: filter,
    });
    return response.data as Ride[];
  }

  /**
   * Cancel a ride
   * @param rideId ID of the ride to cancel
   * @param reason Reason for cancellation
   */
  public async cancelRide(
    rideId: string,
    reason?: string
  ): Promise<ApiResponse> {
    return await apiService.post(`${this.baseUrl}/${rideId}/cancel`, {
      reason,
    });
  }

  /**
   * Rate a completed ride
   * @param rideId ID of the ride to rate
   * @param rating Rating (1-5)
   * @param feedback Optional feedback
   */
  public async rateRide(
    rideId: string,
    rating: number,
    feedback?: string
  ): Promise<ApiResponse> {
    return await apiService.post(`${this.baseUrl}/${rideId}/rate`, {
      rating,
      feedback,
    });
  }

  /**
   * Get the current location of the driver for a ride
   * @param rideId ID of the ride
   */
  public async getDriverLocation(rideId: string): Promise<DriverLocation> {
    const response = await apiService.get<DriverLocation>(
      `${this.baseUrl}/${rideId}/driver-location`
    );
    return response.data as DriverLocation;
  }

  /**
   * Schedule a ride for a future time
   * @param rideRequest Ride request details with scheduledTime
   */
  public async scheduleRide(rideRequest: RideRequest): Promise<BookingResult> {
    if (!rideRequest.scheduledTime) {
      throw new Error("Scheduled time is required");
    }
    const response = await apiService.post<BookingResult>(
      `${this.baseUrl}/schedule`,
      rideRequest
    );
    return response.data as BookingResult;
  }

  /**
   * Get upcoming scheduled rides
   */
  public async getScheduledRides(): Promise<Ride[]> {
    const response = await apiService.get<Ride[]>(`${this.baseUrl}/scheduled`);
    return response.data as Ride[];
  }

  /**
   * Change the payment method for a ride
   * @param rideId ID of the ride
   * @param paymentMethodId ID of the new payment method
   */
  public async changePaymentMethod(
    rideId: string,
    paymentMethodId: string
  ): Promise<ApiResponse> {
    return await apiService.put(`${this.baseUrl}/${rideId}/payment-method`, {
      paymentMethodId,
    });
  }

  /**
   * Get receipt for a completed ride
   * @param rideId ID of the ride
   */
  public async getReceipt(rideId: string): Promise<Blob> {
    const response = await apiService.get(`${this.baseUrl}/${rideId}/receipt`, {
      responseType: "blob",
    });
    return response.data as Blob;
  }

  /**
   * Report an issue with a ride
   * @param rideId ID of the ride
   * @param issueType Type of issue
   * @param description Description of the issue
   */
  public async reportIssue(
    rideId: string,
    issueType: string,
    description: string
  ): Promise<ApiResponse> {
    return await apiService.post(`${this.baseUrl}/${rideId}/report`, {
      issueType,
      description,
    });
  }

  /**
   * Get nearby drivers
   * @param latitude Current latitude
   * @param longitude Current longitude
   * @param radius Search radius in kilometers
   */
  public async getNearbyDrivers(
    latitude: number,
    longitude: number,
    radius: number = 5
  ): Promise<DriverLocation[]> {
    const response = await apiService.get<DriverLocation[]>(
      `${this.baseUrl}/nearby-drivers`,
      {
        params: { latitude, longitude, radius },
      }
    );
    return response.data as DriverLocation[];
  }
}

// Create a singleton instance
const rideService = new RideService();
export default rideService;
