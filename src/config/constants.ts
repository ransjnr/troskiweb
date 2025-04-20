// API Configuration
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.troskiweb.com/api/v1";

// App Information
export const APP_NAME = "Troski";
export const APP_DESCRIPTION = "Reliable ride-sharing service in Ghana";
export const APP_VERSION = "1.0.0";

// Map Configuration
export const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
export const DEFAULT_MAP_CENTER = { lat: 5.6037, lng: -0.187 }; // Accra, Ghana
export const DEFAULT_MAP_ZOOM = 13;

// Authentication Constants
export const AUTH_TOKEN_KEY = "troski_auth_token";
export const USER_DATA_KEY = "troski_user";
export const REFRESH_TOKEN_KEY = "troski_refresh_token";
export const SESSION_TIMEOUT = 3600 * 1000; // 1 hour in milliseconds

// UI Constants
export const TOAST_DURATION = 5000; // milliseconds
export const ANIMATION_DURATION = 0.3; // seconds
export const DEBOUNCE_DELAY = 300; // milliseconds

// Ride Constants
export const BASE_FARE = 5.0; // GHS
export const FARE_PER_KM = 2.5; // GHS
export const MINIMUM_FARE = 10.0; // GHS
export const CANCELLATION_FEE = 5.0; // GHS
export const MAX_WAIT_TIME = 5 * 60 * 1000; // 5 minutes in milliseconds

// Contact Information
export const CONTACT_EMAIL = "support@troskiweb.com";
export const CONTACT_PHONE = "+233 50 123 4567";
export const SOCIAL_MEDIA = {
  facebook: "https://facebook.com/troskiapp",
  twitter: "https://twitter.com/troskiapp",
  instagram: "https://instagram.com/troskiapp",
};

// Vehicle Types
export const VEHICLE_TYPES = [
  {
    id: "economy",
    name: "Economy",
    description: "Affordable rides for everyday use",
  },
  {
    id: "comfort",
    name: "Comfort",
    description: "Spacious vehicles with extra legroom",
  },
  {
    id: "premium",
    name: "Premium",
    description: "Luxury vehicles for a premium experience",
  },
];

// Payment Methods
export const PAYMENT_METHODS = [
  { id: "cash", name: "Cash", icon: "money-bill" },
  { id: "mobile_money", name: "Mobile Money", icon: "mobile-alt" },
  { id: "card", name: "Credit/Debit Card", icon: "credit-card" },
];

// Cities Served
export const CITIES_SERVED = [
  { id: "accra", name: "Accra" },
  { id: "kumasi", name: "Kumasi" },
  { id: "takoradi", name: "Takoradi" },
  { id: "tamale", name: "Tamale" },
  { id: "cape_coast", name: "Cape Coast" },
];

// Feature Flags (for progressive rollout of features)
export const FEATURES = {
  SCHEDULED_RIDES: true,
  SHARED_RIDES: false,
  IN_APP_CHAT: true,
  SAVED_LOCATIONS: true,
  RIDE_PASS: false,
};
