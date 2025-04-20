"use client";

import { Transaction } from "./PaymentService";
import { Location } from "./LocationService";

// Define user types
export type UserRole = "rider" | "driver" | "admin";

// User profile interface
export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: UserRole;
  profilePicture?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Rider-specific profile
export interface RiderProfile extends UserProfile {
  role: "rider";
  homeAddress?: Location;
  workAddress?: Location;
  favoriteLocations: Location[];
  loyalty: {
    points: number;
    tier: "bronze" | "silver" | "gold" | "platinum";
  };
  preferences: UserPreferences;
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
  currentLocation?: {
    lat: number;
    lng: number;
  };
  ratings: {
    average: number;
    count: number;
  };
  earnings: {
    total: number;
    currentWeek: number;
  };
  completedTrips: number;
}

// Vehicle details
export interface VehicleDetails {
  make: string;
  model: string;
  year: number;
  color: string;
  licensePlate: string;
  vehicleType: "standard" | "premium" | "accessible";
  photoUrl?: string;
}

// Insurance details
export interface InsuranceDetails {
  provider: string;
  policyNumber: string;
  expiryDate: Date;
  verified: boolean;
}

// Bank account details
export interface BankAccountDetails {
  accountHolderName: string;
  bankName: string;
  accountNumber: string;
  routingNumber: string;
  verified: boolean;
}

// User preferences
export interface UserPreferences {
  language: "en" | "fr";
  currency: "CAD" | "USD";
  notificationSettings: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  accessibility: {
    screenReader: boolean;
    highContrast: boolean;
    largeText: boolean;
  };
}

// Past ride interface
export interface PastRide {
  id: string;
  date: Date;
  pickupLocation: Location;
  dropoffLocation: Location;
  status: "completed" | "cancelled";
  fare: number;
  currency: string;
  driverName?: string;
  driverRating?: number;
  userRating?: number;
  userFeedback?: string;
  distance: number;
  duration: number;
}

// Sample rider profile for demo
const sampleRiderProfile: RiderProfile = {
  id: "user-123",
  email: "john.doe@example.com",
  firstName: "John",
  lastName: "Doe",
  phone: "+1 (555) 123-4567",
  role: "rider",
  profilePicture: "/images/avatars/john-doe.jpg",
  createdAt: new Date("2023-01-15"),
  updatedAt: new Date("2023-06-02"),
  favoriteLocations: [],
  loyalty: {
    points: 275,
    tier: "silver",
  },
  preferences: {
    language: "en",
    currency: "CAD",
    notificationSettings: {
      email: true,
      push: true,
      sms: false,
    },
    accessibility: {
      screenReader: false,
      highContrast: false,
      largeText: false,
    },
  },
  ratings: {
    average: 4.8,
    count: 32,
  },
};

// Sample driver profile for demo
const sampleDriverProfile: DriverProfile = {
  id: "driver-456",
  email: "jane.smith@example.com",
  firstName: "Jane",
  lastName: "Smith",
  phone: "+1 (555) 987-6543",
  role: "driver",
  profilePicture: "/images/avatars/jane-smith.jpg",
  createdAt: new Date("2022-11-10"),
  updatedAt: new Date("2023-05-28"),
  licenseNumber: "DL12345678",
  licenseExpiry: new Date("2025-08-15"),
  vehicleDetails: {
    make: "Toyota",
    model: "Camry",
    year: 2021,
    color: "Silver",
    licensePlate: "XYZ 123",
    vehicleType: "standard",
    photoUrl: "/images/vehicles/toyota-camry.jpg",
  },
  insuranceDetails: {
    provider: "AllState Insurance",
    policyNumber: "POL987654321",
    expiryDate: new Date("2024-06-30"),
    verified: true,
  },
  bankAccountDetails: {
    accountHolderName: "Jane Smith",
    bankName: "Royal Bank of Canada",
    accountNumber: "******7890",
    routingNumber: "******235",
    verified: true,
  },
  availability: "available",
  currentLocation: {
    lat: 43.6532,
    lng: -79.3832,
  },
  ratings: {
    average: 4.9,
    count: 185,
  },
  earnings: {
    total: 15780.35,
    currentWeek: 495.75,
  },
  completedTrips: 412,
};

// Sample past rides
const samplePastRides: PastRide[] = [
  {
    id: "ride-789",
    date: new Date("2023-06-15T14:30:00"),
    pickupLocation: {
      id: "loc-1",
      name: "Home",
      address: "123 Maple Street, Toronto, ON",
      coordinates: {
        lat: 43.6532,
        lng: -79.3832,
      },
    },
    dropoffLocation: {
      id: "loc-2",
      name: "Office",
      address: "456 Bay Street, Toronto, ON",
      coordinates: {
        lat: 43.6508,
        lng: -79.3789,
      },
    },
    status: "completed",
    fare: 18.75,
    currency: "CAD",
    driverName: "Alex Johnson",
    driverRating: 5,
    userRating: 5,
    distance: 5.2,
    duration: 18,
  },
  {
    id: "ride-790",
    date: new Date("2023-06-12T09:15:00"),
    pickupLocation: {
      id: "loc-2",
      name: "Office",
      address: "456 Bay Street, Toronto, ON",
      coordinates: {
        lat: 43.6508,
        lng: -79.3789,
      },
    },
    dropoffLocation: {
      id: "loc-3",
      name: "Gym",
      address: "789 College Street, Toronto, ON",
      coordinates: {
        lat: 43.6545,
        lng: -79.4103,
      },
    },
    status: "completed",
    fare: 22.5,
    currency: "CAD",
    driverName: "Sarah Wilson",
    driverRating: 4,
    userRating: 5,
    distance: 6.8,
    duration: 25,
  },
  {
    id: "ride-791",
    date: new Date("2023-06-10T18:45:00"),
    pickupLocation: {
      id: "loc-3",
      name: "Gym",
      address: "789 College Street, Toronto, ON",
      coordinates: {
        lat: 43.6545,
        lng: -79.4103,
      },
    },
    dropoffLocation: {
      id: "loc-1",
      name: "Home",
      address: "123 Maple Street, Toronto, ON",
      coordinates: {
        lat: 43.6532,
        lng: -79.3832,
      },
    },
    status: "cancelled",
    fare: 0,
    currency: "CAD",
    distance: 7.1,
    duration: 0,
  },
];

class UserProfileService {
  private currentUser: UserProfile | null = null;
  private riderProfile: RiderProfile | null = sampleRiderProfile;
  private driverProfile: DriverProfile | null = sampleDriverProfile;
  private pastRides: PastRide[] = [...samplePastRides];

  /**
   * Initialize the service with the current user
   * This would typically be called after authentication
   */
  async initialize(userId: string): Promise<void> {
    // Simulate API call delay
    await this.delay(800);

    // In a real app, we would fetch the user profile from the backend
    if (userId === sampleRiderProfile.id) {
      this.currentUser = sampleRiderProfile;
    } else if (userId === sampleDriverProfile.id) {
      this.currentUser = sampleDriverProfile;
    } else {
      throw new Error("User not found");
    }
  }

  /**
   * Get the current user profile
   */
  async getCurrentUser(): Promise<UserProfile | null> {
    // Simulate API call delay
    await this.delay(300);
    return this.currentUser;
  }

  /**
   * Get detailed rider profile
   */
  async getRiderProfile(): Promise<RiderProfile | null> {
    // Simulate API call delay
    await this.delay(500);

    if (this.currentUser?.role !== "rider") {
      return null;
    }

    return this.riderProfile;
  }

  /**
   * Get detailed driver profile
   */
  async getDriverProfile(): Promise<DriverProfile | null> {
    // Simulate API call delay
    await this.delay(500);

    if (this.currentUser?.role !== "driver") {
      return null;
    }

    return this.driverProfile;
  }

  /**
   * Update user basic information
   */
  async updateUserInfo(updates: Partial<UserProfile>): Promise<UserProfile> {
    // Simulate API call delay
    await this.delay(1000);

    if (!this.currentUser) {
      throw new Error("No user logged in");
    }

    // Update user info
    const updatedUser = {
      ...this.currentUser,
      ...updates,
      updatedAt: new Date(),
    };

    this.currentUser = updatedUser;

    // Update the specific profile based on role
    if (updatedUser.role === "rider" && this.riderProfile) {
      this.riderProfile = { ...this.riderProfile, ...updatedUser };
    } else if (updatedUser.role === "driver" && this.driverProfile) {
      this.driverProfile = { ...this.driverProfile, ...updatedUser };
    }

    return updatedUser;
  }

  /**
   * Update user preferences
   */
  async updatePreferences(
    preferences: Partial<UserPreferences>
  ): Promise<UserPreferences> {
    // Simulate API call delay
    await this.delay(800);

    if (!this.currentUser) {
      throw new Error("No user logged in");
    }

    if (this.currentUser.role === "rider" && this.riderProfile) {
      const updatedPreferences = {
        ...this.riderProfile.preferences,
        ...preferences,
      };

      this.riderProfile.preferences = updatedPreferences;
      this.riderProfile.updatedAt = new Date();

      return updatedPreferences;
    } else if (this.currentUser.role === "driver" && this.driverProfile) {
      // For demo purposes, assuming drivers have preferences too
      throw new Error("Driver preferences not implemented");
    }

    throw new Error("Invalid user role or profile");
  }

  /**
   * Add a favorite location
   */
  async addFavoriteLocation(location: Location): Promise<Location[]> {
    // Simulate API call delay
    await this.delay(700);

    if (
      !this.currentUser ||
      this.currentUser.role !== "rider" ||
      !this.riderProfile
    ) {
      throw new Error("Operation not allowed or no rider profile found");
    }

    // Check if location already exists
    const exists = this.riderProfile.favoriteLocations.some(
      (loc) => loc.id === location.id
    );

    if (!exists) {
      this.riderProfile.favoriteLocations.push(location);
      this.riderProfile.updatedAt = new Date();
    }

    return [...this.riderProfile.favoriteLocations];
  }

  /**
   * Remove a favorite location
   */
  async removeFavoriteLocation(locationId: string): Promise<Location[]> {
    // Simulate API call delay
    await this.delay(700);

    if (
      !this.currentUser ||
      this.currentUser.role !== "rider" ||
      !this.riderProfile
    ) {
      throw new Error("Operation not allowed or no rider profile found");
    }

    this.riderProfile.favoriteLocations =
      this.riderProfile.favoriteLocations.filter(
        (loc) => loc.id !== locationId
      );

    this.riderProfile.updatedAt = new Date();

    return [...this.riderProfile.favoriteLocations];
  }

  /**
   * Set home address
   */
  async setHomeAddress(location: Location): Promise<void> {
    // Simulate API call delay
    await this.delay(600);

    if (
      !this.currentUser ||
      this.currentUser.role !== "rider" ||
      !this.riderProfile
    ) {
      throw new Error("Operation not allowed or no rider profile found");
    }

    this.riderProfile.homeAddress = location;
    this.riderProfile.updatedAt = new Date();
  }

  /**
   * Set work address
   */
  async setWorkAddress(location: Location): Promise<void> {
    // Simulate API call delay
    await this.delay(600);

    if (
      !this.currentUser ||
      this.currentUser.role !== "rider" ||
      !this.riderProfile
    ) {
      throw new Error("Operation not allowed or no rider profile found");
    }

    this.riderProfile.workAddress = location;
    this.riderProfile.updatedAt = new Date();
  }

  /**
   * Update driver availability
   */
  async updateDriverAvailability(
    status: "available" | "busy" | "offline"
  ): Promise<void> {
    // Simulate API call delay
    await this.delay(500);

    if (
      !this.currentUser ||
      this.currentUser.role !== "driver" ||
      !this.driverProfile
    ) {
      throw new Error("Operation not allowed or no driver profile found");
    }

    this.driverProfile.availability = status;
    this.driverProfile.updatedAt = new Date();
  }

  /**
   * Update driver location
   */
  async updateDriverLocation(location: {
    lat: number;
    lng: number;
  }): Promise<void> {
    // Simulate API call delay
    await this.delay(300);

    if (
      !this.currentUser ||
      this.currentUser.role !== "driver" ||
      !this.driverProfile
    ) {
      throw new Error("Operation not allowed or no driver profile found");
    }

    this.driverProfile.currentLocation = location;
    this.driverProfile.updatedAt = new Date();
  }

  /**
   * Get past rides for the current user
   */
  async getPastRides(
    limit: number = 10,
    offset: number = 0
  ): Promise<PastRide[]> {
    // Simulate API call delay
    await this.delay(800);

    if (!this.currentUser) {
      throw new Error("No user logged in");
    }

    // Sort rides by date (newest first) and apply pagination
    return [...this.pastRides]
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(offset, offset + limit);
  }

  /**
   * Get ride details by ID
   */
  async getRideById(rideId: string): Promise<PastRide | null> {
    // Simulate API call delay
    await this.delay(500);

    if (!this.currentUser) {
      throw new Error("No user logged in");
    }

    return this.pastRides.find((ride) => ride.id === rideId) || null;
  }

  /**
   * Update vehicle details (for drivers)
   */
  async updateVehicleDetails(
    updates: Partial<VehicleDetails>
  ): Promise<VehicleDetails> {
    // Simulate API call delay
    await this.delay(1000);

    if (
      !this.currentUser ||
      this.currentUser.role !== "driver" ||
      !this.driverProfile
    ) {
      throw new Error("Operation not allowed or no driver profile found");
    }

    this.driverProfile.vehicleDetails = {
      ...this.driverProfile.vehicleDetails,
      ...updates,
    };

    this.driverProfile.updatedAt = new Date();

    return { ...this.driverProfile.vehicleDetails };
  }

  /**
   * Get loyalty information for rider
   */
  async getLoyaltyInfo(): Promise<{
    points: number;
    tier: string;
    nextTier?: { name: string; pointsNeeded: number };
  }> {
    // Simulate API call delay
    await this.delay(600);

    if (
      !this.currentUser ||
      this.currentUser.role !== "rider" ||
      !this.riderProfile
    ) {
      throw new Error("Operation not allowed or no rider profile found");
    }

    const { points, tier } = this.riderProfile.loyalty;

    // Tier thresholds
    const tiers = {
      bronze: 0,
      silver: 200,
      gold: 500,
      platinum: 1000,
    };

    // Determine next tier info
    let nextTier = undefined;

    if (tier === "bronze") {
      nextTier = { name: "silver", pointsNeeded: tiers.silver - points };
    } else if (tier === "silver") {
      nextTier = { name: "gold", pointsNeeded: tiers.gold - points };
    } else if (tier === "gold") {
      nextTier = { name: "platinum", pointsNeeded: tiers.platinum - points };
    }

    return {
      points,
      tier,
      nextTier,
    };
  }

  /**
   * Get driver earning stats
   */
  async getDriverEarningStats(): Promise<{
    total: number;
    currentWeek: number;
    lastWeek: number;
    currentMonth: number;
    avgPerTrip: number;
  }> {
    // Simulate API call delay
    await this.delay(900);

    if (
      !this.currentUser ||
      this.currentUser.role !== "driver" ||
      !this.driverProfile
    ) {
      throw new Error("Operation not allowed or no driver profile found");
    }

    // For demo purposes, we're generating some realistic numbers
    const { total, currentWeek } = this.driverProfile.earnings;
    const lastWeek = currentWeek * 0.9;
    const currentMonth = currentWeek * 4.2;
    const avgPerTrip = total / this.driverProfile.completedTrips;

    return {
      total,
      currentWeek,
      lastWeek,
      currentMonth,
      avgPerTrip,
    };
  }

  /**
   * Helper method to simulate delay
   */
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// Export as singleton
export default new UserProfileService();
