"use client";

import { Location } from "./BookingService";

// Check if we're running in the browser
const isBrowser = typeof window !== "undefined";

// Define search result interface
export interface LocationSearchResult {
  locations: Location[];
  status: "success" | "error";
  message?: string;
}

// Define autocomplete suggestion interface
export interface AutocompleteSuggestion {
  id: string;
  name: string;
  address: string;
  distance?: number; // distance from current location if available
}

// Sample location data for demo purposes
const sampleLocations = [
  {
    id: "loc-1",
    name: "Accra Mall",
    address: "Tetteh Quarshie Interchange, Accra, Ghana",
    coordinates: {
      lat: 5.6356,
      lng: -0.175,
    },
  },
  {
    id: "loc-2",
    name: "Kotoka International Airport",
    address: "Airport Road, Accra, Ghana",
    coordinates: {
      lat: 5.6052,
      lng: -0.1682,
    },
  },
  {
    id: "loc-3",
    name: "University of Ghana",
    address: "Legon, Accra, Ghana",
    coordinates: {
      lat: 5.6499,
      lng: -0.1869,
    },
  },
  {
    id: "loc-4",
    name: "West Hills Mall",
    address: "Weija, Accra, Ghana",
    coordinates: {
      lat: 5.568,
      lng: -0.3355,
    },
  },
  {
    id: "loc-5",
    name: "Labadi Beach Hotel",
    address: "La Beach Road, Accra, Ghana",
    coordinates: {
      lat: 5.5662,
      lng: -0.151,
    },
  },
  {
    id: "loc-6",
    name: "Makola Market",
    address: "Central Accra, Ghana",
    coordinates: {
      lat: 5.5479,
      lng: -0.2055,
    },
  },
  {
    id: "loc-7",
    name: "Junction Mall",
    address: "Nungua, Accra, Ghana",
    coordinates: {
      lat: 5.6021,
      lng: -0.0655,
    },
  },
  {
    id: "loc-8",
    name: "A&C Mall",
    address: "East Legon, Accra, Ghana",
    coordinates: {
      lat: 5.6361,
      lng: -0.1509,
    },
  },
];

class LocationService {
  /**
   * Search for locations based on query string
   * @param query The search query
   */
  async searchLocations(query: string): Promise<LocationSearchResult> {
    // Simulate API call delay
    await this.delay(800);

    if (!query || query.trim().length < 2) {
      return {
        locations: [],
        status: "error",
        message: "Please enter at least 2 characters to search",
      };
    }

    // Filter locations based on name or address match
    const lowerCaseQuery = query.toLowerCase();
    const filteredLocations = sampleLocations.filter(
      (location) =>
        location.name.toLowerCase().includes(lowerCaseQuery) ||
        location.address.toLowerCase().includes(lowerCaseQuery)
    );

    return {
      locations: filteredLocations,
      status: "success",
    };
  }

  /**
   * Get autocomplete suggestions as user types
   * @param input Partial input from user
   * @param currentLocation Optional current user location
   */
  async getAutocompleteSuggestions(
    input: string,
    currentLocation?: { lat: number; lng: number }
  ): Promise<AutocompleteSuggestion[]> {
    // Simulate API call delay
    await this.delay(300);

    if (!input || input.trim().length < 2) {
      return [];
    }

    // Filter locations based on name or address match
    const lowerCaseInput = input.toLowerCase();
    const filteredLocations = sampleLocations
      .filter(
        (location) =>
          location.name.toLowerCase().includes(lowerCaseInput) ||
          location.address.toLowerCase().includes(lowerCaseInput)
      )
      .map((location) => {
        const suggestion: AutocompleteSuggestion = {
          id: location.id,
          name: location.name,
          address: location.address,
        };

        // Calculate distance if current location is available
        if (currentLocation) {
          suggestion.distance = this.calculateDistance(
            currentLocation.lat,
            currentLocation.lng,
            location.coordinates.lat,
            location.coordinates.lng
          );
        }

        return suggestion;
      });

    // Sort by relevance - name matches first, then address matches
    filteredLocations.sort((a, b) => {
      const aNameMatch = a.name.toLowerCase().includes(lowerCaseInput) ? 1 : 0;
      const bNameMatch = b.name.toLowerCase().includes(lowerCaseInput) ? 1 : 0;
      if (aNameMatch !== bNameMatch) return bNameMatch - aNameMatch;

      // If distances are available, sort by proximity
      if (a.distance !== undefined && b.distance !== undefined) {
        return a.distance - b.distance;
      }

      return 0;
    });

    return filteredLocations.slice(0, 5); // Limit to 5 suggestions
  }

  /**
   * Get location details by ID
   * @param locationId The location ID
   */
  async getLocationById(locationId: string): Promise<Location | null> {
    // Simulate API call delay
    await this.delay(500);

    const location = sampleLocations.find((loc) => loc.id === locationId);
    return location || null;
  }

  /**
   * Get user's current location using browser geolocation API
   */
  async getCurrentLocation(): Promise<{
    coordinates: { lat: number; lng: number };
  } | null> {
    // Check if running in browser environment
    if (!isBrowser) {
      console.warn("Geolocation is only available in browser environments");
      return null;
    }

    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        console.error("Geolocation is not supported by this browser");
        resolve(null);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            coordinates: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        },
        (error) => {
          console.error("Error getting current location:", error);
          resolve(null);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    });
  }

  /**
   * Get nearby popular locations
   * @param currentLocation Current user location
   * @param radius Search radius in kilometers
   */
  async getNearbyLocations(
    currentLocation: { lat: number; lng: number },
    radius: number = 5
  ): Promise<Location[]> {
    // Simulate API call delay
    await this.delay(800);

    // Filter locations within the radius
    const locationsWithinRadius = sampleLocations.filter((location) => {
      const distance = this.calculateDistance(
        currentLocation.lat,
        currentLocation.lng,
        location.coordinates.lat,
        location.coordinates.lng
      );
      return distance <= radius;
    });

    // Sort by distance
    locationsWithinRadius.sort((a, b) => {
      const distanceA = this.calculateDistance(
        currentLocation.lat,
        currentLocation.lng,
        a.coordinates.lat,
        a.coordinates.lng
      );
      const distanceB = this.calculateDistance(
        currentLocation.lat,
        currentLocation.lng,
        b.coordinates.lat,
        b.coordinates.lng
      );
      return distanceA - distanceB;
    });

    return locationsWithinRadius;
  }

  /**
   * Helper method to calculate distance using Haversine formula
   * Returns distance in kilometers
   */
  private calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const R = 6371; // Radius of the earth in km
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }

  /**
   * Helper method to simulate delay
   */
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// Export as singleton
export default new LocationService();
