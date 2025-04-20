"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCar,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaHistory,
  FaStar,
  FaClock,
  FaRoute,
  FaArrowRight,
  FaRegClock,
} from "react-icons/fa";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import BookingService, { Location } from "@/services/BookingService";
import { useToast } from "@/context/ToastContext";
import { useAuth } from "@/contexts/AuthContext";

export const DashboardOverview = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [recentTrips, setRecentTrips] = useState([]);
  const [pickup, setPickup] = useState<Location | null>(null);
  const [dropoff, setDropoff] = useState<Location | null>(null);
  const [fareEstimate, setFareEstimate] = useState<{
    estimatedFare: number;
    distance: number;
    duration: number;
    currency: string;
  } | null>(null);
  const [showEstimate, setShowEstimate] = useState(false);

  // Sample locations for demo purposes
  const popularLocations = [
    {
      id: "loc-1",
      name: "Home",
      address: "123 Main Street, Toronto",
      coordinates: { lat: 43.653225, lng: -79.383186 },
    },
    {
      id: "loc-2",
      name: "Work",
      address: "200 Bay Street, Toronto",
      coordinates: { lat: 43.6476, lng: -79.3795 },
    },
    {
      id: "loc-3",
      name: "Downtown Mall",
      address: "220 Yonge Street, Toronto",
      coordinates: { lat: 43.6544, lng: -79.3807 },
    },
    {
      id: "loc-4",
      name: "Airport",
      address: "Toronto Pearson International Airport",
      coordinates: { lat: 43.6777, lng: -79.6248 },
    },
  ];

  // Sample past rides for demo
  const samplePastRides = [
    {
      id: "ride-1",
      date: "Today, 10:15 AM",
      from: "Home",
      to: "Work",
      amount: "$12.50",
      status: "completed",
    },
    {
      id: "ride-2",
      date: "Yesterday, 6:30 PM",
      from: "Work",
      to: "Gym",
      amount: "$8.75",
      status: "completed",
    },
    {
      id: "ride-3",
      date: "Mar 15, 5:45 PM",
      from: "Mall",
      to: "Home",
      amount: "$15.20",
      status: "completed",
    },
  ];

  useEffect(() => {
    // In a real app, we would fetch recent trips from an API
    setRecentTrips(samplePastRides);
  }, []);

  const handleLocationSelect = (
    location: Location,
    type: "pickup" | "dropoff"
  ) => {
    if (type === "pickup") {
      setPickup(location);
    } else {
      setDropoff(location);
    }

    // If both pickup and dropoff are selected, get fare estimate
    if ((type === "pickup" && dropoff) || (type === "dropoff" && pickup)) {
      estimateFare(
        type === "pickup" ? location : pickup!,
        type === "dropoff" ? location : dropoff!
      );
    }
  };

  const estimateFare = async (pickup: Location, dropoff: Location) => {
    setIsLoading(true);
    setShowEstimate(false);
    try {
      const estimate = await BookingService.estimateFare(pickup, dropoff);
      setFareEstimate(estimate);
      setTimeout(() => setShowEstimate(true), 300);
    } catch (error) {
      console.error("Error estimating fare:", error);
      showToast("Unable to estimate fare at this time", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookRide = async () => {
    if (!pickup || !dropoff) {
      showToast("Please select pickup and dropoff locations", "warning");
      return;
    }

    setIsLoading(true);
    try {
      // In a real app, you would also select a payment method
      const paymentMethod = {
        id: "pm-1",
        type: "credit_card",
        label: "Visa ending in 4242",
      };

      const booking = await BookingService.bookRide(
        pickup,
        dropoff,
        paymentMethod
      );

      showToast(
        `Your ride has been booked! Driver ${booking.driverName} is on the way.`,
        "success"
      );

      // Reset form after successful booking
      setPickup(null);
      setDropoff(null);
      setFareEstimate(null);
      setShowEstimate(false);

      // In a real app, you would redirect to a ride tracking page
      // router.push(`/rides/${booking.bookingId}`);
    } catch (error) {
      console.error("Error booking ride:", error);
      showToast("Unable to book ride at this time", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Quick Booking Card */}
      <div className="md:col-span-2 lg:col-span-2">
        <Card className="overflow-hidden border border-gray-200 bg-white/90 backdrop-blur-sm shadow-lg">
          <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
          <CardHeader className="flex flex-row items-center justify-between border-b border-gray-100 pb-2">
            <CardTitle className="text-xl font-bold text-gray-900">
              Book a Ride
            </CardTitle>
            <FaCar className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* Ride locations form */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* Pickup location */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Pickup Location
                  </label>
                  <div className="relative rounded-lg overflow-hidden transition-all duration-200 focus-within:ring-2 focus-within:ring-blue-500 bg-gray-50 hover:bg-gray-100">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <FaMapMarkerAlt className="h-5 w-5 text-blue-500" />
                    </div>
                    <select
                      className="block w-full appearance-none rounded-lg border-0 bg-transparent py-3 pl-10 pr-10 text-gray-900 focus:outline-none focus:ring-0"
                      value={pickup?.id || ""}
                      onChange={(e) => {
                        const selected = popularLocations.find(
                          (loc) => loc.id === e.target.value
                        );
                        if (selected) handleLocationSelect(selected, "pickup");
                      }}
                      aria-label="Select pickup location"
                    >
                      <option value="">Where are you?</option>
                      {popularLocations.map((location) => (
                        <option key={location.id} value={location.id}>
                          {location.name} - {location.address}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <FaArrowRight className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Dropoff location */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Dropoff Location
                  </label>
                  <div className="relative rounded-lg overflow-hidden transition-all duration-200 focus-within:ring-2 focus-within:ring-blue-500 bg-gray-50 hover:bg-gray-100">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <FaMapMarkerAlt className="h-5 w-5 text-red-500" />
                    </div>
                    <select
                      className="block w-full appearance-none rounded-lg border-0 bg-transparent py-3 pl-10 pr-10 text-gray-900 focus:outline-none focus:ring-0"
                      value={dropoff?.id || ""}
                      onChange={(e) => {
                        const selected = popularLocations.find(
                          (loc) => loc.id === e.target.value
                        );
                        if (selected) handleLocationSelect(selected, "dropoff");
                      }}
                      aria-label="Select dropoff location"
                    >
                      <option value="">Where to?</option>
                      {popularLocations.map((location) => (
                        <option key={location.id} value={location.id}>
                          {location.name} - {location.address}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <FaArrowRight className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Route visualization (simplified) */}
              {pickup && dropoff && (
                <div className="relative h-20 overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center">
                  <div className="flex items-center w-full px-8 justify-between">
                    <div className="flex flex-col items-center">
                      <div className="h-4 w-4 rounded-full bg-blue-500"></div>
                      <div className="mt-1 text-xs font-medium text-gray-700">
                        {pickup.name}
                      </div>
                    </div>

                    <div className="h-0.5 flex-1 bg-gradient-to-r from-blue-500 to-red-500 mx-4 relative">
                      <motion.div
                        className="absolute -top-2 left-1/2 transform -translate-x-1/2 h-5 w-5"
                        animate={{
                          x: ["-50%", "50%", "-50%"],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <FaCar className="h-5 w-5 text-gray-700" />
                      </motion.div>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="h-4 w-4 rounded-full bg-red-500"></div>
                      <div className="mt-1 text-xs font-medium text-gray-700">
                        {dropoff.name}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Fare estimate */}
              <AnimatePresence>
                {fareEstimate && showEstimate && (
                  <motion.div
                    className="mt-4 rounded-lg p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100"
                    initial={{ opacity: 0, y: 10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div className="mb-4 sm:mb-0">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Fare Estimate
                        </h3>
                        <div className="mt-1 flex items-center space-x-4">
                          <div className="flex items-center text-sm text-gray-600">
                            <FaRoute className="mr-1 h-4 w-4 text-blue-500" />
                            <span>{fareEstimate.distance.toFixed(1)} km</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <FaRegClock className="mr-1 h-4 w-4 text-blue-500" />
                            <span>{fareEstimate.duration} min</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-gray-900">
                          {fareEstimate.currency}{" "}
                          {fareEstimate.estimatedFare.toFixed(2)}
                        </div>
                        <div className="text-xs text-gray-500">
                          Fixed price - No surge
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs border-t border-blue-100 pt-3">
                      <div>
                        <div className="font-medium text-gray-700">
                          Base Fare
                        </div>
                        <div>
                          ${(fareEstimate.estimatedFare * 0.3).toFixed(2)}
                        </div>
                      </div>
                      <div>
                        <div className="font-medium text-gray-700">
                          Distance
                        </div>
                        <div>
                          ${(fareEstimate.estimatedFare * 0.5).toFixed(2)}
                        </div>
                      </div>
                      <div>
                        <div className="font-medium text-gray-700">Time</div>
                        <div>
                          ${(fareEstimate.estimatedFare * 0.2).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-2 flex justify-end">
                <Button
                  variant="primary"
                  size="lg"
                  isLoading={isLoading}
                  onClick={handleBookRide}
                  className="px-8 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                  disabled={!pickup || !dropoff}
                  leftIcon={<FaCar className="mr-2" />}
                >
                  Book Now
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Stats Card */}
      <Card className="bg-white/90 backdrop-blur-sm border border-gray-200 shadow-lg">
        <CardHeader className="border-b border-gray-100 pb-2">
          <CardTitle className="text-xl font-bold text-gray-900">
            My Stats
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-3 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 p-2.5 text-blue-600 shadow-sm">
                  <FaHistory className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium text-gray-600">
                  Total Rides
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-lg font-bold text-gray-900">24</span>
                <motion.div
                  className="ml-2 text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  +3
                </motion.div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-3 rounded-full bg-gradient-to-br from-green-100 to-green-200 p-2.5 text-green-600 shadow-sm">
                  <FaMoneyBillWave className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium text-gray-600">
                  Total Spent
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-lg font-bold text-gray-900">$348.25</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-3 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 p-2.5 text-purple-600 shadow-sm">
                  <FaStar className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium text-gray-600">
                  Avg. Rating
                </span>
              </div>
              <div className="flex items-center">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={`h-3.5 w-3.5 ${
                        star <= 4.8 ? "text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-lg font-bold text-gray-900">
                  4.8
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-3 rounded-full bg-gradient-to-br from-yellow-100 to-yellow-200 p-2.5 text-yellow-600 shadow-sm">
                  <FaCalendarAlt className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium text-gray-600">
                  Member Since
                </span>
              </div>
              <span className="text-lg font-bold text-gray-900">Jan 2023</span>
            </div>

            {/* Loyalty progress */}
            <div className="pt-4 border-t border-gray-100">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-medium text-gray-500">
                  Silver Member
                </span>
                <span className="text-xs font-medium text-blue-600">
                  120/200 points to Gold
                </span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-500"
                  initial={{ width: 0 }}
                  animate={{ width: "60%" }}
                  transition={{ duration: 1, delay: 0.5 }}
                ></motion.div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Trips */}
      <div className="md:col-span-2 lg:col-span-2">
        <Card className="bg-white/90 backdrop-blur-sm border border-gray-200 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between border-b border-gray-100 pb-2">
            <CardTitle className="text-xl font-bold text-gray-900">
              Recent Trips
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              className="text-blue-600 border-blue-200 hover:bg-blue-50"
            >
              View All
            </Button>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {recentTrips.length > 0 ? (
                recentTrips.map((trip: any) => (
                  <motion.div
                    key={trip.id}
                    className="flex items-center justify-between rounded-lg border border-gray-100 bg-white p-4 shadow-sm hover:shadow-md transition-all duration-300"
                    whileHover={{ scale: 1.01, x: 3 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="flex items-center">
                      <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600">
                        <FaCar className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {trip.from} to {trip.to}
                        </h3>
                        <div className="flex items-center text-sm text-gray-500">
                          <FaClock className="mr-1 h-3 w-3" />
                          <p>{trip.date}</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        {trip.amount}
                      </p>
                      <p
                        className={`mt-1 inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                          trip.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-orange-100 text-orange-800"
                        }`}
                      >
                        {trip.status === "completed"
                          ? "Completed"
                          : "Cancelled"}
                      </p>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="mb-4 rounded-full bg-gray-100 p-4">
                    <FaHistory className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-700">
                    No trips yet
                  </h3>
                  <p className="text-center text-gray-500 max-w-xs mx-auto mt-2">
                    Once you take your first trip with Troski, it will appear
                    here
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4 border-blue-200 text-blue-600 hover:bg-blue-50"
                  >
                    Book Your First Ride
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Promo Card */}
      <Card className="overflow-hidden border-0 shadow-lg">
        <div className="relative h-full bg-gradient-to-r from-blue-600 to-indigo-600">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg
              className="h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <path
                d="M0,0 L100,0 L100,100 L0,100 Z"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              ></path>
              <path
                d="M0,0 L100,100 M100,0 L0,100"
                stroke="white"
                strokeWidth="0.5"
              ></path>
              <circle
                cx="50"
                cy="50"
                r="30"
                stroke="white"
                strokeWidth="0.5"
                fill="none"
              ></circle>
            </svg>
          </div>

          <CardContent className="relative p-6 text-white">
            <div className="flex flex-col items-start space-y-4">
              <div className="rounded-full bg-white/20 backdrop-blur-sm p-3">
                <FaMoneyBillWave className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold">Save 15% Today!</h3>
              <p className="text-blue-100">
                Use promo code{" "}
                <span className="font-bold bg-white/20 px-2 py-0.5 rounded">
                  TROSKI15
                </span>{" "}
                for 15% off your next ride.
              </p>
              <div className="relative mt-2 w-full">
                <Button
                  variant="outline"
                  size="lg"
                  className="mt-2 bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20 w-full"
                >
                  Apply Code
                </Button>
              </div>

              {/* Decorative element */}
              <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-white/10 backdrop-blur-sm"></div>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default DashboardOverview;
