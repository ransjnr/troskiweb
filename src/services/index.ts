// Export all services from this index file for easier importing

// Auth-related services
export { useAuth } from "@/contexts/AuthContext";

// Booking and ride-related services
export { default as BookingService } from "./BookingService";
export { default as LocationService } from "./LocationService";

// User and profile-related services
export { default as UserProfileService } from "./UserProfileService";
export { default as NotificationService } from "./NotificationService";

// Payment-related services
export { default as PaymentService } from "./PaymentService";

// Support and help-related services
export { default as SupportService } from "./SupportService";

// Types can be re-exported for convenience
export type {
  // BookingService types
  Location,
  PaymentMethod as BookingPaymentMethod,
  FareEstimateResult,
  BookingResult,
} from "./BookingService";

export type {
  // LocationService types
  LocationSearchResult,
  AutocompleteSuggestion,
} from "./LocationService";

export type {
  // PaymentService types
  PaymentMethod,
  Transaction,
  PaymentResult,
} from "./PaymentService";

export type {
  // UserProfileService types
  UserRole,
  UserProfile,
  RiderProfile,
  DriverProfile,
  VehicleDetails,
  InsuranceDetails,
  BankAccountDetails,
  UserPreferences,
  PastRide,
} from "./UserProfileService";

export type {
  // NotificationService types
  NotificationType,
  NotificationPriority,
  Notification,
  NotificationAction,
} from "./NotificationService";

export type {
  // SupportService types
  TicketStatus,
  TicketPriority,
  TicketType,
  SupportTicket,
  TicketMessage,
  FaqCategory,
  Faq,
} from "./SupportService";
