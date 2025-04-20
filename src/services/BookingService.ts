"use client";

import apiService, { ApiResponse } from "./ApiService";
import { VEHICLE_TYPES } from "../config/constants";

// Define location interface
export interface Location {
  id?: string;
  name: string;
  address?: string;
  latitude: number;
  longitude: number;
  type?: "pickup" | "dropoff" | "saved";
  isFavorite?: boolean;
}

// Define payment method interface
export interface PaymentMethod {
  id: string;
  type: "card" | "mobile_money" | "cash";
  provider?: string; // For mobile money: MTN, Vodafone, AirtelTigo
  details: {
    cardNumber?: string;
    cardholderName?: string;
    expiryDate?: string;
    phoneNumber?: string;
    last4?: string;
  };
  isDefault: boolean;
}

// Define fare estimation result
export interface FareEstimateResult {
  fare: number;
  currency: string;
  distance: number;
  duration: number;
  vehicleType: string;
  pickupLocation: Location;
  dropoffLocation: Location;
  estimatedArrivalTime: Date;
}

// Define booking result
export interface BookingResult {
  bookingId: string;
  rideId: string;
  fare: number;
  currency: string;
  distance: number;
  duration: number;
  driver?: {
    id: string;
    name: string;
    phone: string;
    rating: number;
    vehicleDetails: {
      make: string;
      model: string;
      color: string;
      licensePlate: string;
      year: string;
    };
    location: {
      latitude: number;
      longitude: number;
    };
    estimatedArrivalTime: Date;
  };
  status: string;
  paymentMethod: PaymentMethod;
  pickupLocation: Location;
  dropoffLocation: Location;
  createdAt: Date;
}

class BookingService {
  private readonly baseUrl = "/bookings";

  /**
   * Estimate the fare for a ride
   * @param pickup Pickup location
   * @param dropoff Dropoff location
   * @param vehicleType Optional vehicle type
   */
  public async estimateFare(
    pickup: Location,
    dropoff: Location,
    vehicleType: string = VEHICLE_TYPES[0].id
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
   * Book a ride
   * @param pickup Pickup location
   * @param dropoff Dropoff location
   * @param paymentMethod Payment method to use
   * @param vehicleType Optional vehicle type
   * @param scheduledTime Optional scheduled time for the ride
   */
  public async bookRide(
    pickup: Location,
    dropoff: Location,
    paymentMethod: PaymentMethod,
    vehicleType: string = VEHICLE_TYPES[0].id,
    scheduledTime?: Date
  ): Promise<BookingResult> {
    const response = await apiService.post<BookingResult>(
      `${this.baseUrl}/book`,
      {
        pickup,
        dropoff,
        paymentMethodId: paymentMethod.id,
        vehicleType,
        scheduledTime,
      }
    );
    return response.data as BookingResult;
  }

  /**
   * Cancel a booking
   * @param bookingId ID of the booking to cancel
   * @param reason Optional reason for cancellation
   */
  public async cancelBooking(
    bookingId: string,
    reason?: string
  ): Promise<ApiResponse> {
    return await apiService.post(`${this.baseUrl}/${bookingId}/cancel`, {
      reason,
    });
  }

  /**
   * Get booking details
   * @param bookingId ID of the booking to retrieve
   */
  public async getBooking(bookingId: string): Promise<BookingResult> {
    const response = await apiService.get<BookingResult>(
      `${this.baseUrl}/${bookingId}`
    );
    return response.data as BookingResult;
  }

  /**
   * Rate a driver after a ride
   * @param bookingId ID of the booking
   * @param rating Rating (1-5)
   * @param feedback Optional feedback
   */
  public async rateDriver(
    bookingId: string,
    rating: number,
    feedback?: string
  ): Promise<ApiResponse> {
    return await apiService.post(`${this.baseUrl}/${bookingId}/rate`, {
      rating,
      feedback,
    });
  }

  /**
   * Get driver's current location for a booking
   * @param bookingId ID of the booking
   */
  public async getDriverLocation(
    bookingId: string
  ): Promise<{ latitude: number; longitude: number }> {
    const response = await apiService.get<{
      latitude: number;
      longitude: number;
    }>(`${this.baseUrl}/${bookingId}/driver-location`);
    return response.data;
  }

  /**
   * Send a message to the driver
   * @param bookingId ID of the booking
   * @param message Message to send
   */
  public async sendMessageToDriver(
    bookingId: string,
    message: string
  ): Promise<ApiResponse> {
    return await apiService.post(`${this.baseUrl}/${bookingId}/message`, {
      message,
    });
  }

  /**
   * Schedule a ride for later
   * @param pickup Pickup location
   * @param dropoff Dropoff location
   * @param paymentMethod Payment method to use
   * @param scheduledTime Time to schedule the ride
   * @param vehicleType Optional vehicle type
   */
  public async scheduleRide(
    pickup: Location,
    dropoff: Location,
    paymentMethod: PaymentMethod,
    scheduledTime: Date,
    vehicleType: string = VEHICLE_TYPES[0].id
  ): Promise<BookingResult> {
    const response = await apiService.post<BookingResult>(
      `${this.baseUrl}/schedule`,
      {
        pickup,
        dropoff,
        paymentMethodId: paymentMethod.id,
        scheduledTime,
        vehicleType,
      }
    );
    return response.data as BookingResult;
  }

  /**
   * Get user's upcoming bookings
   */
  public async getUpcomingBookings(): Promise<BookingResult[]> {
    const response = await apiService.get<BookingResult[]>(
      `${this.baseUrl}/upcoming`
    );
    return response.data as BookingResult[];
  }

  /**
   * Get user's booking history
   * @param limit Maximum number of bookings to retrieve
   * @param offset Number of bookings to skip (for pagination)
   */
  public async getBookingHistory(
    limit: number = 10,
    offset: number = 0
  ): Promise<BookingResult[]> {
    const response = await apiService.get<BookingResult[]>(
      `${this.baseUrl}/history`,
      {
        params: { limit, offset },
      }
    );
    return response.data as BookingResult[];
  }

  /**
   * Update a scheduled booking
   * @param bookingId ID of the booking to update
   * @param updates Updates to apply
   */
  public async updateBooking(
    bookingId: string,
    updates: {
      pickup?: Location;
      dropoff?: Location;
      scheduledTime?: Date;
      paymentMethodId?: string;
      vehicleType?: string;
    }
  ): Promise<BookingResult> {
    const response = await apiService.put<BookingResult>(
      `${this.baseUrl}/${bookingId}`,
      updates
    );
    return response.data as BookingResult;
  }
}

// Export as singleton
const bookingService = new BookingService();
export default bookingService;
