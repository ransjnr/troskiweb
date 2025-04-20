/**
 * Core type definitions for Troski ride-sharing application
 */

// User Roles
export type UserRole = "rider" | "driver" | "admin";

// Basic User Profile
export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  profilePicture?: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

// Rider-specific profile
export interface RiderProfile extends UserProfile {
  role: "rider";
  homeAddress?: string;
  workAddress?: string;
  paymentMethods?: PaymentMethod[];
  favoriteLocations?: Location[];
  loyalty: {
    points: number;
    tier: "bronze" | "silver" | "gold" | "platinum";
  };
  subscription?: Subscription;
  ratings: {
    average: number;
    count: number;
  };
}

// Driver-specific profile
export interface DriverProfile extends UserProfile {
  role: "driver";
  licenseNumber: string;
  licenseExpiry: Date;
  vehicleDetails: VehicleDetails;
  insuranceDetails: InsuranceDetails;
  bankAccountDetails: BankAccountDetails;
  availability: "available" | "busy" | "offline";
  ratings: {
    average: number;
    count: number;
  };
  earnings: {
    total: number;
    currentWeek: number;
  };
}

// Vehicle Details
export interface VehicleDetails {
  id: string;
  make: string;
  model: string;
  year: number;
  color: string;
  licensePlate: string;
  vehicleType: "standard" | "premium" | "accessible";
  photoUrl?: string;
}

// Insurance Details
export interface InsuranceDetails {
  provider: string;
  policyNumber: string;
  expiryDate: Date;
  documentUrl?: string;
}

// Bank Account Details
export interface BankAccountDetails {
  accountHolderName: string;
  routingNumber: string;
  accountNumber: string;
  bankName: string;
}

// Payment Method
export interface PaymentMethod {
  id: string;
  type: "credit_card" | "debit_card" | "paypal";
  cardDetails?: {
    lastFour: string;
    expiryMonth: number;
    expiryYear: number;
    brand: string;
  };
  isDefault: boolean;
}

// Subscription
export interface Subscription {
  id: string;
  type: "basic" | "premium" | "unlimited";
  startDate: Date;
  endDate: Date;
  status: "active" | "canceled" | "expired";
  price: number;
  features: string[];
}

// Location
export interface Location {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  type?: "home" | "work" | "favorite" | "other";
}

// Trip Status
export type TripStatus =
  | "requested"
  | "accepted"
  | "arriving"
  | "arrived"
  | "in_progress"
  | "completed"
  | "canceled";

// Trip
export interface Trip {
  id: string;
  riderId: string;
  driverId?: string;
  status: TripStatus;
  pickupLocation: Location;
  dropoffLocation: Location;
  estimatedDistance: number; // in kilometers
  estimatedDuration: number; // in minutes
  estimatedFare: number;
  actualFare?: number;
  requestTime: Date;
  pickupTime?: Date;
  dropoffTime?: Date;
  riderRating?: number;
  driverRating?: number;
  riderFeedback?: string;
  driverFeedback?: string;
  paymentMethod: string;
  paymentStatus: "pending" | "completed" | "failed" | "refunded";
  tripCode?: string; // For rider to verify correct driver
}

// Rating
export interface Rating {
  id: string;
  fromId: string;
  toId: string;
  tripId: string;
  rating: number; // 1-5
  comment?: string;
  createdAt: Date;
}

// Support Ticket
export interface SupportTicket {
  id: string;
  userId: string;
  userRole: UserRole;
  tripId?: string;
  subject: string;
  description: string;
  status: "open" | "in_progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high";
  createdAt: Date;
  updatedAt: Date;
  messages: SupportMessage[];
}

// Support Message
export interface SupportMessage {
  id: string;
  ticketId: string;
  senderId: string;
  senderRole: UserRole | "support";
  message: string;
  attachments?: string[];
  createdAt: Date;
}
