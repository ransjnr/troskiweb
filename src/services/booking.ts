// Booking service for Troski rides
import { ToastType } from "@/components/ui/Toast";

// Simulated API response types
interface BookingResponse {
  success: boolean;
  message: string;
  data?: {
    bookingId: string;
    pickupLocation: string;
    dropoffLocation: string;
    estimatedTime: number; // in minutes
    estimatedFare: number;
    driverName?: string;
    driverRating?: number;
    vehicleInfo?: string;
  };
  error?: string;
}

interface Location {
  address: string;
  lat: number;
  lng: number;
}

/**
 * BookingService class provides methods for ride booking operations
 * Each method returns an object containing success status, message, and toast type
 */
export class BookingService {
  /**
   * Estimates ride fare between two locations
   */
  static async estimateRide(
    pickup: Location,
    dropoff: Location
  ): Promise<{
    success: boolean;
    message: string;
    toastType: ToastType;
    data?: any;
  }> {
    // Simulate API request
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Simulate random success/failure
    const success = Math.random() > 0.2; // 80% success rate

    if (success) {
      const estimatedFare = (Math.random() * 20 + 10).toFixed(2);
      const estimatedTime = Math.floor(Math.random() * 25 + 5);

      return {
        success: true,
        message: `Estimated fare: $${estimatedFare}, arrival in ${estimatedTime} mins`,
        toastType: "info",
        data: {
          estimatedFare,
          estimatedTime,
          distance: (Math.random() * 10 + 1).toFixed(1),
        },
      };
    } else {
      return {
        success: false,
        message: "Unable to estimate fare. Please try again.",
        toastType: "error",
      };
    }
  }

  /**
   * Books a ride with the specified details
   */
  static async bookRide(
    pickup: Location,
    dropoff: Location,
    paymentMethod: string
  ): Promise<{
    success: boolean;
    message: string;
    toastType: ToastType;
    data?: any;
  }> {
    // Simulate API request
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Simulate random success/failure
    const success = Math.random() > 0.15; // 85% success rate

    if (success) {
      const driverNames = ["Michael", "Sarah", "David", "Emma", "John"];
      const vehicleModels = [
        "Toyota Corolla",
        "Honda Civic",
        "Ford Focus",
        "Hyundai Elantra",
        "Kia Rio",
      ];

      const bookingId = `TRK-${Math.floor(Math.random() * 900000) + 100000}`;
      const driverName =
        driverNames[Math.floor(Math.random() * driverNames.length)];
      const vehicleInfo =
        vehicleModels[Math.floor(Math.random() * vehicleModels.length)];
      const driverRating = (Math.random() * 2 + 3).toFixed(1); // 3.0-5.0 rating

      return {
        success: true,
        message: `Ride booked! ${driverName} is on the way in a ${vehicleInfo}.`,
        toastType: "success",
        data: {
          bookingId,
          driverName,
          driverRating,
          vehicleInfo,
          estimatedTime: Math.floor(Math.random() * 10 + 3), // 3-13 minutes
        },
      };
    } else {
      const errorMessages = [
        "No drivers available at the moment. Please try again.",
        "Booking failed. Please check your payment method.",
        "Service temporarily unavailable in your area.",
        "Network connection issue. Please try again.",
      ];

      const errorMessage =
        errorMessages[Math.floor(Math.random() * errorMessages.length)];

      return {
        success: false,
        message: errorMessage,
        toastType: "error",
      };
    }
  }

  /**
   * Cancels a ride booking
   */
  static async cancelRide(bookingId: string): Promise<{
    success: boolean;
    message: string;
    toastType: ToastType;
  }> {
    // Simulate API request
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simulate random success/failure
    const success = Math.random() > 0.1; // 90% success rate

    if (success) {
      return {
        success: true,
        message: "Your ride has been cancelled. No charges applied.",
        toastType: "info",
      };
    } else {
      return {
        success: false,
        message: "Unable to cancel ride. Please contact support.",
        toastType: "error",
      };
    }
  }

  /**
   * Submits driver rating and feedback
   */
  static async rateDriver(
    bookingId: string,
    rating: number,
    feedback?: string
  ): Promise<{
    success: boolean;
    message: string;
    toastType: ToastType;
  }> {
    // Simulate API request
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Simulate random success/failure
    const success = Math.random() > 0.05; // 95% success rate

    if (success) {
      let message = "Thank you for your feedback!";
      if (rating >= 4) {
        message = "Thanks for the positive rating! We'll let your driver know.";
      }

      return {
        success: true,
        message,
        toastType: "success",
      };
    } else {
      return {
        success: false,
        message: "Unable to submit rating. Please try again later.",
        toastType: "error",
      };
    }
  }

  /**
   * Fetch ride history
   */
  static async getRideHistory(): Promise<{
    success: boolean;
    message: string;
    toastType: ToastType;
    data?: any[];
  }> {
    // Simulate API request
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Simulate random success/failure
    const success = Math.random() > 0.1; // 90% success rate

    if (success) {
      // Generate mock ride history
      const rideHistory = Array.from(
        { length: Math.floor(Math.random() * 5) + 3 },
        (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - i);

          return {
            id: `TRK-${Math.floor(Math.random() * 900000) + 100000}`,
            date: date.toISOString(),
            pickup: "123 Main St",
            dropoff: "456 Oak Ave",
            fare: (Math.random() * 25 + 8).toFixed(2),
            driverName: ["Michael", "Sarah", "David", "Emma", "John"][
              Math.floor(Math.random() * 5)
            ],
          };
        }
      );

      return {
        success: true,
        message: "Ride history loaded successfully",
        toastType: "success",
        data: rideHistory,
      };
    } else {
      return {
        success: false,
        message: "Unable to load ride history. Please refresh the page.",
        toastType: "error",
      };
    }
  }
}
