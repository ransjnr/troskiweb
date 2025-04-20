import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Authentication
  auth: defineTable({
    userId: v.id("users"),
    email: v.string(),
    passwordHash: v.string(),
    verificationCode: v.optional(v.string()),
    resetCode: v.optional(v.string()),
    resetCodeExpiry: v.optional(v.number()),
    isVerified: v.boolean(),
    lastLogin: v.optional(v.number()),
  })
    .index("by_user_id", ["userId"])
    .index("by_email", ["email"]),

  // User profiles
  users: defineTable({
    email: v.string(),
    firstName: v.string(),
    lastName: v.string(),
    phone: v.string(),
    profilePicture: v.optional(v.string()),
    role: v.union(v.literal("rider"), v.literal("driver"), v.literal("admin")),
    createdAt: v.number(), // timestamp
    updatedAt: v.number(), // timestamp
  }).index("by_email", ["email"]),

  // Rider-specific profiles
  riders: defineTable({
    userId: v.id("users"),
    homeAddress: v.optional(v.string()),
    workAddress: v.optional(v.string()),
    loyaltyPoints: v.number(),
    loyaltyTier: v.union(
      v.literal("bronze"),
      v.literal("silver"),
      v.literal("gold"),
      v.literal("platinum")
    ),
    averageRating: v.number(),
    ratingCount: v.number(),
  }).index("by_user_id", ["userId"]),

  // Driver-specific profiles
  drivers: defineTable({
    userId: v.id("users"),
    licenseNumber: v.string(),
    licenseExpiry: v.number(), // timestamp
    availability: v.union(
      v.literal("available"),
      v.literal("busy"),
      v.literal("offline")
    ),
    averageRating: v.number(),
    ratingCount: v.number(),
    totalEarnings: v.number(),
    currentWeekEarnings: v.number(),
    lastLocationLat: v.optional(v.number()),
    lastLocationLng: v.optional(v.number()),
    lastLocationTimestamp: v.optional(v.number()),
    approvalStatus: v.union(
      v.literal("pending"),
      v.literal("approved"),
      v.literal("rejected")
    ),
  }).index("by_user_id", ["userId"]),

  // Vehicle details
  vehicles: defineTable({
    driverId: v.id("drivers"),
    make: v.string(),
    model: v.string(),
    year: v.number(),
    color: v.string(),
    licensePlate: v.string(),
    vehicleType: v.union(
      v.literal("standard"),
      v.literal("premium"),
      v.literal("accessible")
    ),
    photoUrl: v.optional(v.string()),
  }).index("by_driver_id", ["driverId"]),

  // Insurance details
  insurances: defineTable({
    driverId: v.id("drivers"),
    provider: v.string(),
    policyNumber: v.string(),
    expiryDate: v.number(), // timestamp
    documentUrl: v.optional(v.string()),
  }).index("by_driver_id", ["driverId"]),

  // Bank account details
  bankAccounts: defineTable({
    userId: v.id("users"),
    accountHolderName: v.string(),
    routingNumber: v.string(),
    accountNumber: v.string(),
    bankName: v.string(),
  }).index("by_user_id", ["userId"]),

  // Payment methods
  paymentMethods: defineTable({
    userId: v.id("users"),
    type: v.union(
      v.literal("credit_card"),
      v.literal("debit_card"),
      v.literal("paypal")
    ),
    lastFour: v.optional(v.string()),
    expiryMonth: v.optional(v.number()),
    expiryYear: v.optional(v.number()),
    brand: v.optional(v.string()),
    token: v.string(), // Payment provider token
    isDefault: v.boolean(),
  }).index("by_user_id", ["userId"]),

  // Subscriptions
  subscriptions: defineTable({
    riderId: v.id("riders"),
    type: v.union(
      v.literal("basic"),
      v.literal("premium"),
      v.literal("unlimited")
    ),
    startDate: v.number(), // timestamp
    endDate: v.number(), // timestamp
    status: v.union(
      v.literal("active"),
      v.literal("canceled"),
      v.literal("expired")
    ),
    price: v.number(),
    features: v.array(v.string()),
    stripeSubscriptionId: v.optional(v.string()),
  }).index("by_rider_id", ["riderId"]),

  // Saved locations
  locations: defineTable({
    userId: v.id("users"),
    name: v.string(),
    address: v.string(),
    latitude: v.number(),
    longitude: v.number(),
    type: v.optional(
      v.union(
        v.literal("home"),
        v.literal("work"),
        v.literal("favorite"),
        v.literal("other")
      )
    ),
  }).index("by_user_id", ["userId"]),

  // Trips
  trips: defineTable({
    riderId: v.id("riders"),
    driverId: v.optional(v.id("drivers")),
    status: v.union(
      v.literal("requested"),
      v.literal("accepted"),
      v.literal("arriving"),
      v.literal("arrived"),
      v.literal("in_progress"),
      v.literal("completed"),
      v.literal("canceled")
    ),
    pickupAddress: v.string(),
    pickupLat: v.number(),
    pickupLng: v.number(),
    dropoffAddress: v.string(),
    dropoffLat: v.number(),
    dropoffLng: v.number(),
    estimatedDistance: v.number(), // in kilometers
    estimatedDuration: v.number(), // in minutes
    estimatedFare: v.number(),
    actualFare: v.optional(v.number()),
    requestTime: v.number(), // timestamp
    pickupTime: v.optional(v.number()), // timestamp
    dropoffTime: v.optional(v.number()), // timestamp
    riderRating: v.optional(v.number()),
    driverRating: v.optional(v.number()),
    riderFeedback: v.optional(v.string()),
    driverFeedback: v.optional(v.string()),
    paymentMethodId: v.id("paymentMethods"),
    paymentStatus: v.union(
      v.literal("pending"),
      v.literal("completed"),
      v.literal("failed"),
      v.literal("refunded")
    ),
    tripCode: v.optional(v.string()), // For rider to verify correct driver
    cancellationReason: v.optional(v.string()),
    canceledBy: v.optional(
      v.union(v.literal("rider"), v.literal("driver"), v.literal("system"))
    ),
  })
    .index("by_rider_id", ["riderId"])
    .index("by_driver_id", ["driverId"])
    .index("by_status", ["status"]),

  // Trip tracking points (for location history)
  tripTrackingPoints: defineTable({
    tripId: v.id("trips"),
    driverId: v.id("drivers"),
    latitude: v.number(),
    longitude: v.number(),
    timestamp: v.number(),
  }).index("by_trip_id", ["tripId"]),

  // Ratings
  ratings: defineTable({
    fromUserId: v.id("users"),
    toUserId: v.id("users"),
    tripId: v.id("trips"),
    rating: v.number(), // 1-5
    comment: v.optional(v.string()),
    createdAt: v.number(), // timestamp
  })
    .index("by_from_user", ["fromUserId"])
    .index("by_to_user", ["toUserId"])
    .index("by_trip_id", ["tripId"]),

  // Support tickets
  supportTickets: defineTable({
    userId: v.id("users"),
    tripId: v.optional(v.id("trips")),
    subject: v.string(),
    description: v.string(),
    status: v.union(
      v.literal("open"),
      v.literal("in_progress"),
      v.literal("resolved"),
      v.literal("closed")
    ),
    priority: v.union(v.literal("low"), v.literal("medium"), v.literal("high")),
    createdAt: v.number(), // timestamp
    updatedAt: v.number(), // timestamp
  })
    .index("by_user_id", ["userId"])
    .index("by_status", ["status"]),

  // Support messages
  supportMessages: defineTable({
    ticketId: v.id("supportTickets"),
    senderId: v.string(), // Can be user ID or support agent ID
    senderRole: v.union(
      v.literal("rider"),
      v.literal("driver"),
      v.literal("admin"),
      v.literal("support")
    ),
    message: v.string(),
    attachments: v.optional(v.array(v.string())),
    createdAt: v.number(), // timestamp
  }).index("by_ticket_id", ["ticketId"]),

  // Notifications
  notifications: defineTable({
    userId: v.id("users"),
    type: v.string(), // e.g., "trip_request", "driver_arrived", etc.
    title: v.string(),
    message: v.string(),
    relatedResourceId: v.optional(v.string()), // Could be tripId, ticketId, etc.
    relatedResourceType: v.optional(v.string()), // e.g., "trip", "supportTicket", etc.
    isRead: v.boolean(),
    createdAt: v.number(), // timestamp
  })
    .index("by_user_id", ["userId"])
    .index("by_user_read", ["userId", "isRead"]),

  // Payments
  payments: defineTable({
    tripId: v.id("trips"),
    riderId: v.id("riders"),
    driverId: v.id("drivers"),
    amount: v.number(),
    status: v.union(
      v.literal("pending"),
      v.literal("completed"),
      v.literal("failed"),
      v.literal("refunded")
    ),
    stripePaymentIntentId: v.optional(v.string()),
    stripeTransferId: v.optional(v.string()),
    paymentMethodId: v.id("paymentMethods"),
    processingFee: v.number(),
    driverAmount: v.number(),
    platformFee: v.number(),
    timestamp: v.number(), // timestamp
  })
    .index("by_trip_id", ["tripId"])
    .index("by_rider_id", ["riderId"])
    .index("by_driver_id", ["driverId"]),
});
