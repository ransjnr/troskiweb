# Troski Services Layer

This directory contains the service layer for the Troski ride-sharing application. These services provide the core business logic for the application while abstracting away the details of API calls, data manipulation, and state management.

## Services Overview

### 1. BookingService

Manages ride bookings, fare estimations, cancellations, and driver ratings.

```typescript
import { BookingService } from '@/services';

// Estimate a fare
const fareEstimate = await BookingService.estimateFare(pickupLocation, dropoffLocation);

// Book a ride
const booking = await BookingService.bookRide(pickupLocation, dropoffLocation, paymentMethod);

// Cancel a booking
const result = await BookingService.cancelBooking(bookingId);

// Rate a driver
const ratingResult = await BookingService.rateDriver(driverId, bookingId, 5, "Great driver!");
```

### 2. LocationService

Handles location-related functionality such as searching for locations, autocomplete suggestions, and geolocation.

```typescript
import { LocationService } from '@/services';

// Search for locations
const searchResults = await LocationService.searchLocations("Airport");

// Get autocomplete suggestions as user types
const suggestions = await LocationService.getAutocompleteSuggestions("Mall");

// Get user's current location
const currentLocation = await LocationService.getCurrentLocation();

// Find nearby locations
const nearbyLocations = await LocationService.getNearbyLocations(
  { lat: 43.6532, lng: -79.3832 },
  5 // radius in km
);
```

### 3. PaymentService

Handles payment method management, payment processing, and transaction history.

```typescript
import { PaymentService } from '@/services';

// Get saved payment methods
const paymentMethods = await PaymentService.getPaymentMethods();

// Add a new payment method
const newMethod = await PaymentService.addPaymentMethod({
  type: "credit_card",
  details: {
    cardNumber: "************4242",
    cardholderName: "John Doe",
    expiryDate: "12/25",
    last4: "4242",
  },
  isDefault: true
});

// Process a payment
const paymentResult = await PaymentService.processPayment(
  25.50,
  "CAD",
  "pm-1",
  "booking-123",
  "Ride from Downtown to Airport"
);

// Get transaction history
const transactions = await PaymentService.getTransactionHistory(10, 0);
```

### 4. UserProfileService

Manages user profile information, including personal details, preferences, and past rides.

```typescript
import { UserProfileService } from '@/services';

// Initialize with the current user
await UserProfileService.initialize(userId);

// Get user profile info
const currentUser = await UserProfileService.getCurrentUser();

// Get rider-specific profile
const riderProfile = await UserProfileService.getRiderProfile();

// Update user information
const updatedUser = await UserProfileService.updateUserInfo({
  firstName: "New",
  lastName: "Name"
});

// Get user's past rides
const pastRides = await UserProfileService.getPastRides(10, 0);

// Get loyalty information
const loyaltyInfo = await UserProfileService.getLoyaltyInfo();
```

### 5. NotificationService

Handles in-app notifications, push notifications, and notification preferences.

```typescript
import { NotificationService } from '@/services';

// Initialize with user role
NotificationService.initialize("rider");

// Get all notifications
const notifications = await NotificationService.getNotifications();

// Get unread count
const unreadCount = await NotificationService.getUnreadCount();

// Mark a notification as read
await NotificationService.markAsRead("notif-123");

// Add a new notification
const newNotification = await NotificationService.addNotification({
  type: "promotion",
  title: "Weekend Special",
  message: "Get 20% off rides this weekend!",
  priority: "medium"
});

// Subscribe to new notifications
const unsubscribe = NotificationService.subscribeToNotifications((notification) => {
  console.log("New notification:", notification);
});
```

### 6. SupportService

Handles customer support tickets, FAQs, and help center functionality.

```typescript
import { SupportService } from '@/services';

// Initialize with user role
SupportService.initialize("rider");

// Get all support tickets
const tickets = await SupportService.getTickets();

// Create a new support ticket
const newTicket = await SupportService.createTicket({
  title: "Payment issue",
  description: "My payment was declined but money was deducted from my account",
  type: "payment_problem",
  priority: "high"
});

// Add a message to a ticket
const newMessage = await SupportService.addTicketMessage(
  "ticket-123",
  "Any updates on this issue?"
);

// Search FAQs
const searchResults = await SupportService.searchFaqs("payment");

// Get help articles
const articles = await SupportService.getHelpArticles("safety");
```

## Architecture

The services layer implements a client-side data management approach with the following features:

1. **Singleton Pattern**: Each service is exported as a singleton instance.
2. **Promise-Based API**: All methods return promises for consistent async handling.
3. **Type Safety**: Full TypeScript interfaces for all data structures.
4. **Mock Data**: Services include realistic sample data for development/demo.
5. **Simulated API Delays**: Realistic timing of network operations for testing UI states.
6. **Error Handling**: Consistent error patterns with helpful messages.
7. **Events & Subscriptions**: Observable pattern for real-time updates (e.g., notifications).

## Development Notes

- Services are designed to work in a client-side environment with the 'use client' directive.
- In a production app, these services would connect to actual API endpoints instead of using mock data.
- All methods include simulated delays to mimic real-world API latency.
- Error handling is consistent across all services.

## Demo Page

A demonstration page is available at `/services-demo` to showcase the functionality of all services with interactive examples. 