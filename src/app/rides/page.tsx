"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  FaCar,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaStar,
  FaTimes,
  FaCheck,
  FaSearch,
} from "react-icons/fa";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/context/ToastContext";

export default function Rides() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { showToast } = useToast();
  const router = useRouter();
  const [userRole, setUserRole] = useState<"rider" | "driver" | "admin">(
    "rider"
  );
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [searchTerm, setSearchTerm] = useState("");

  // Sample rides for demo
  const sampleUpcomingRides = [
    {
      id: "trip-1",
      status: "scheduled",
      pickupAddress: "123 Main St, Toronto",
      dropoffAddress: "Union Station, Toronto",
      date: "Tomorrow",
      time: "8:30 AM",
      fare: "$18.50",
      driver: {
        name: "Michael J.",
        rating: 4.8,
        car: "Toyota Camry",
        licensePlate: "TR5-2023",
      },
    },
  ];

  const samplePastRides = [
    {
      id: "trip-2",
      status: "completed",
      pickupAddress: "Home",
      dropoffAddress: "Toronto Pearson Airport",
      date: "Mar 20, 2023",
      time: "10:15 AM",
      fare: "$42.75",
      rating: 5,
    },
    {
      id: "trip-3",
      status: "completed",
      pickupAddress: "Work",
      dropoffAddress: "Downtown Mall",
      date: "Mar 15, 2023",
      time: "6:30 PM",
      fare: "$15.20",
      rating: 4,
    },
    {
      id: "trip-4",
      status: "canceled",
      pickupAddress: "Restaurant",
      dropoffAddress: "Home",
      date: "Mar 10, 2023",
      time: "9:45 PM",
      fare: "$0.00",
    },
    {
      id: "trip-5",
      status: "completed",
      pickupAddress: "Gym",
      dropoffAddress: "Home",
      date: "Mar 5, 2023",
      time: "7:15 PM",
      fare: "$12.90",
      rating: 5,
    },
  ];

  // State for ride data
  const [upcomingRides, setUpcomingRides] = useState(sampleUpcomingRides);
  const [pastRides, setPastRides] = useState(samplePastRides);

  useEffect(() => {
    // Check if user is authenticated
    if (!isLoading && !isAuthenticated) {
      showToast("Please sign in to view your rides", "warning");
      router.push("/signin");
    }

    // Set user role from auth context
    if (user?.role) {
      setUserRole(user.role as "rider" | "driver" | "admin");
    }
  }, [isAuthenticated, isLoading, router, showToast, user]);

  // Filter rides based on search term
  const filteredUpcomingRides = upcomingRides.filter(
    (ride) =>
      ride.pickupAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ride.dropoffAddress.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPastRides = pastRides.filter(
    (ride) =>
      ride.pickupAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ride.dropoffAddress.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const cancelRide = (rideId: string) => {
    showToast("Cancelling your ride...", "info");

    // Simulate API call
    setTimeout(() => {
      setUpcomingRides(upcomingRides.filter((ride) => ride.id !== rideId));
      showToast("Your ride has been cancelled", "success");
    }, 1500);
  };

  const rateRide = (rideId: string, rating: number) => {
    showToast(`Rating submitted: ${rating} stars`, "success");

    // Update the rating in the state
    setPastRides(
      pastRides.map((ride) => (ride.id === rideId ? { ...ride, rating } : ride))
    );
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="text-center">
          <div className="mb-4 flex justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-500"></div>
          </div>
          <h2 className="text-xl font-semibold text-gray-700">
            Loading your rides...
          </h2>
          <p className="mt-2 text-gray-500">Please wait a moment</p>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout userRole={userRole}>
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">My Rides</h1>
            <p className="mt-1 text-gray-600">
              {userRole === "rider"
                ? "View your upcoming and past rides"
                : "Manage your ride schedule and history"}
            </p>
          </div>

          <div className="mb-8 flex flex-col sm:flex-row justify-between gap-4">
            {/* Tabs */}
            <div className="flex rounded-lg border border-gray-200 bg-white">
              <button
                className={`px-6 py-2.5 text-sm font-medium ${
                  activeTab === "upcoming"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                } rounded-l-lg transition-colors`}
                onClick={() => setActiveTab("upcoming")}
              >
                Upcoming
              </button>
              <button
                className={`px-6 py-2.5 text-sm font-medium ${
                  activeTab === "past"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                } rounded-r-lg transition-colors`}
                onClick={() => setActiveTab("past")}
              >
                Past
              </button>
            </div>

            {/* Search */}
            <div className="relative max-w-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <FaSearch className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Search rides..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Rides List */}
          <div className="space-y-4">
            {activeTab === "upcoming" ? (
              <>
                {filteredUpcomingRides.length > 0 ? (
                  filteredUpcomingRides.map((ride) => (
                    <motion.div
                      key={ride.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"
                    >
                      <div className="border-l-4 border-blue-500 px-6 py-4">
                        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                          <div>
                            <div className="mb-1 flex items-center">
                              <span className="mr-2 inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                                Scheduled
                              </span>
                              <p className="text-sm text-gray-500">
                                {ride.date} at {ride.time}
                              </p>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">
                              {ride.pickupAddress} to {ride.dropoffAddress}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {ride.driver.car} · {ride.driver.licensePlate}
                            </p>
                          </div>
                          <div className="flex flex-col items-end">
                            <p className="text-lg font-bold text-gray-900">
                              {ride.fare}
                            </p>
                            <div className="mt-4 flex space-x-2">
                              <Button variant="outline" size="sm">
                                Details
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-600 hover:bg-red-50 hover:border-red-200"
                                onClick={() => cancelRide(ride.id)}
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-6 py-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="mr-3 h-10 w-10 overflow-hidden rounded-full bg-gray-200">
                              <div className="flex h-full w-full items-center justify-center bg-blue-100 text-blue-500">
                                <FaCar className="h-5 w-5" />
                              </div>
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">
                                {ride.driver.name}
                              </p>
                              <div className="flex items-center">
                                <FaStar className="mr-1 h-3 w-3 text-yellow-500" />
                                <span className="text-xs text-gray-500">
                                  {ride.driver.rating}
                                </span>
                              </div>
                            </div>
                          </div>
                          <Button variant="primary" size="sm">
                            Contact Driver
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white py-12">
                    <div className="mb-4 rounded-full bg-blue-100 p-3 text-blue-500">
                      <FaCalendarAlt className="h-6 w-6" />
                    </div>
                    <h3 className="mb-1 text-lg font-medium text-gray-900">
                      No upcoming rides
                    </h3>
                    <p className="mb-6 text-gray-500">
                      You don't have any rides scheduled.
                    </p>
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={() => router.push("/dashboard")}
                    >
                      Book a Ride
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <>
                {filteredPastRides.length > 0 ? (
                  filteredPastRides.map((ride) => (
                    <motion.div
                      key={ride.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"
                    >
                      <div
                        className={`border-l-4 px-6 py-4 ${
                          ride.status === "completed"
                            ? "border-green-500"
                            : "border-orange-500"
                        }`}
                      >
                        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                          <div>
                            <div className="mb-1 flex items-center">
                              <span
                                className={`mr-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                  ride.status === "completed"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-orange-100 text-orange-800"
                                }`}
                              >
                                {ride.status === "completed"
                                  ? "Completed"
                                  : "Canceled"}
                              </span>
                              <p className="text-sm text-gray-500">
                                {ride.date} at {ride.time}
                              </p>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">
                              {ride.pickupAddress} to {ride.dropoffAddress}
                            </h3>
                          </div>
                          <div className="flex flex-col items-end">
                            <p className="text-lg font-bold text-gray-900">
                              {ride.fare}
                            </p>
                            <Button
                              variant="outline"
                              size="sm"
                              className="mt-4"
                            >
                              {ride.status === "completed"
                                ? "Receipt"
                                : "Details"}
                            </Button>
                          </div>
                        </div>
                      </div>

                      {ride.status === "completed" && (
                        <div className="bg-gray-50 px-6 py-3">
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-600">
                              Your rating:
                            </div>
                            <div className="flex space-x-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  key={star}
                                  className="focus:outline-none"
                                  onClick={() => rateRide(ride.id, star)}
                                  aria-label={`Rate ${star} stars`}
                                  title={`Rate ${star} stars`}
                                >
                                  <FaStar
                                    className={`h-5 w-5 ${
                                      star <= (ride.rating || 0)
                                        ? "text-yellow-500"
                                        : "text-gray-300"
                                    }`}
                                  />
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white py-12">
                    <div className="mb-4 rounded-full bg-gray-100 p-3 text-gray-500">
                      <FaClock className="h-6 w-6" />
                    </div>
                    <h3 className="mb-1 text-lg font-medium text-gray-900">
                      No past rides
                    </h3>
                    <p className="mb-6 text-gray-500">
                      You haven't taken any rides yet.
                    </p>
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={() => router.push("/dashboard")}
                    >
                      Book Your First Ride
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
