"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaCar,
  FaMoneyBillWave,
  FaStar,
  FaRoute,
  FaClock,
  FaUserFriends,
  FaToggleOn,
  FaToggleOff,
} from "react-icons/fa";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/context/ToastContext";

export const DriverDashboard = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [isAvailable, setIsAvailable] = useState(true);
  const [todayEarnings, setTodayEarnings] = useState(78.5);
  const [weeklyEarnings, setWeeklyEarnings] = useState(642.75);
  const [rideRequests, setRideRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Sample ride requests for demo
  const sampleRideRequests = [
    {
      id: "req-1",
      passengerName: "John D.",
      pickupLocation: "Downtown Mall",
      dropoffLocation: "York University",
      estimatedFare: "$22.50",
      distance: "8.4 km",
      time: "Just now",
    },
    {
      id: "req-2",
      passengerName: "Sarah M.",
      pickupLocation: "Union Station",
      dropoffLocation: "Scarborough Town Centre",
      estimatedFare: "$35.75",
      distance: "19.2 km",
      time: "2 min ago",
    },
  ];

  // Sample earnings data
  const earningsData = [
    { day: "Mon", amount: 95.2 },
    { day: "Tue", amount: 87.5 },
    { day: "Wed", amount: 112.4 },
    { day: "Thu", amount: 78.5 },
    { day: "Fri", amount: 105.7 },
    { day: "Sat", amount: 135.25 },
    { day: "Sun", amount: 28.2 },
  ];

  const driverStats = {
    totalRides: 342,
    averageRating: 4.9,
    completionRate: 98,
    acceptanceRate: 94,
    totalDistance: 4672,
    onlineHours: 623,
  };

  useEffect(() => {
    // In a real app, we would fetch this data from an API
    setRideRequests(sampleRideRequests);
  }, []);

  const toggleAvailability = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsAvailable(!isAvailable);
      showToast(
        isAvailable
          ? "You are now offline. You won't receive ride requests."
          : "You are now online and available for rides!",
        isAvailable ? "info" : "success"
      );
      setIsLoading(false);
    }, 1000);
  };

  const acceptRideRequest = (requestId: string) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      showToast(
        "Ride request accepted! Navigate to pickup location.",
        "success"
      );
      setRideRequests(rideRequests.filter((req: any) => req.id !== requestId));
      setIsLoading(false);
    }, 1500);
  };

  const declineRideRequest = (requestId: string) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      showToast("Ride request declined", "info");
      setRideRequests(rideRequests.filter((req: any) => req.id !== requestId));
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Driver Status Card */}
      <Card
        className={`overflow-hidden ${isAvailable ? "border-green-400" : "border-gray-400"}`}
      >
        <div
          className={`h-2 ${isAvailable ? "bg-green-500" : "bg-gray-500"}`}
        ></div>
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="relative">
              <div className="h-20 w-20 overflow-hidden rounded-full border-4 border-white bg-gray-200 shadow-lg">
                {user?.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt="Driver"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-blue-100 text-blue-600">
                    <FaUserFriends className="h-8 w-8" />
                  </div>
                )}
              </div>
              <span
                className={`absolute bottom-0 right-0 h-5 w-5 rounded-full ${isAvailable ? "bg-green-500" : "bg-gray-500"} border-2 border-white`}
              ></span>
            </div>

            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900">
                {user?.firstName} {user?.lastName || "Driver"}
              </h3>
              <div className="flex items-center justify-center">
                <FaStar className="mr-1 text-yellow-500" />
                <span className="text-gray-600">
                  {driverStats.averageRating} Rating
                </span>
              </div>
            </div>

            <div className="flex w-full justify-center">
              <Button
                variant={isAvailable ? "outline" : "primary"}
                size="lg"
                isLoading={isLoading}
                onClick={toggleAvailability}
                className="flex items-center space-x-2 px-6"
              >
                {isAvailable ? (
                  <>
                    <FaToggleOn className="h-5 w-5 text-green-500" />
                    <span>Go Offline</span>
                  </>
                ) : (
                  <>
                    <FaToggleOff className="h-5 w-5" />
                    <span>Go Online</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Today's Earnings Card */}
      <Card className="overflow-hidden">
        <div className="h-2 bg-blue-500"></div>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-semibold">
            Today's Earnings
          </CardTitle>
          <FaMoneyBillWave className="h-5 w-5 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center">
            <p className="text-4xl font-bold text-gray-900">
              ${todayEarnings.toFixed(2)}
            </p>
            <p className="text-sm text-gray-500">
              {isAvailable ? "Online and earning" : "Currently offline"}
            </p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 text-center">
            <div className="rounded-lg bg-blue-50 p-3">
              <p className="text-lg font-semibold text-gray-900">4</p>
              <p className="text-xs text-gray-500">Trips Completed</p>
            </div>
            <div className="rounded-lg bg-green-50 p-3">
              <p className="text-lg font-semibold text-gray-900">42.5 km</p>
              <p className="text-xs text-gray-500">Distance Covered</p>
            </div>
            <div className="rounded-lg bg-yellow-50 p-3">
              <p className="text-lg font-semibold text-gray-900">5h 20m</p>
              <p className="text-xs text-gray-500">Online Time</p>
            </div>
            <div className="rounded-lg bg-purple-50 p-3">
              <p className="text-lg font-semibold text-gray-900">$19.63</p>
              <p className="text-xs text-gray-500">Avg. Per Trip</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Earnings Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-semibold">
            Weekly Earnings
          </CardTitle>
          <Button variant="outline" size="sm">
            Details
          </Button>
        </CardHeader>
        <CardContent>
          <div className="mb-2 flex items-center justify-between">
            <p className="text-base font-medium text-gray-600">This Week</p>
            <p className="text-2xl font-bold text-gray-900">
              ${weeklyEarnings.toFixed(2)}
            </p>
          </div>

          <div className="mt-6 flex h-16 items-end justify-between">
            {earningsData.map((day, index) => (
              <div
                key={day.day}
                className="flex flex-col items-center space-y-1"
              >
                <motion.div
                  className={`w-8 rounded-t ${index === 3 ? "bg-blue-600" : "bg-blue-400"}`}
                  style={{ height: `${(day.amount / 150) * 100}%` }}
                  initial={{ height: 0 }}
                  animate={{ height: `${(day.amount / 150) * 100}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                ></motion.div>
                <span className="text-xs text-gray-500">{day.day}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-gray-100 pt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Goal: $800</span>
              <span className="font-medium text-gray-700">
                {Math.round((weeklyEarnings / 800) * 100)}% Completed
              </span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-100">
              <motion.div
                className="h-full rounded-full bg-blue-600"
                style={{ width: `${(weeklyEarnings / 800) * 100}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${(weeklyEarnings / 800) * 100}%` }}
                transition={{ duration: 1.5 }}
              ></motion.div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ride Requests */}
      <div className="md:col-span-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl font-semibold">
              {isAvailable
                ? "Incoming Ride Requests"
                : "Go Online to Receive Requests"}
            </CardTitle>
            {isAvailable && (
              <div className="flex h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
            )}
          </CardHeader>
          <CardContent>
            {isAvailable ? (
              <div className="space-y-4">
                {rideRequests.length > 0 ? (
                  rideRequests.map((request: any) => (
                    <motion.div
                      key={request.id}
                      className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="mb-3 flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                            <FaCar className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">
                              {request.passengerName}
                            </h3>
                            <p className="text-xs text-gray-500">
                              {request.time}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">
                            {request.estimatedFare}
                          </p>
                          <p className="text-xs text-gray-500">
                            {request.distance}
                          </p>
                        </div>
                      </div>

                      <div className="mb-3 space-y-1 text-sm">
                        <div className="flex items-start">
                          <div className="mr-2 mt-0.5 h-4 w-4 rounded-full border-2 border-blue-500 bg-white"></div>
                          <p className="text-gray-700">
                            {request.pickupLocation}
                          </p>
                        </div>
                        <div className="flex items-start">
                          <div className="mr-2 mt-0.5 h-4 w-4 rounded-full border-2 border-red-500 bg-white"></div>
                          <p className="text-gray-700">
                            {request.dropoffLocation}
                          </p>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button
                          variant="primary"
                          size="sm"
                          isLoading={isLoading}
                          onClick={() => acceptRideRequest(request.id)}
                          className="flex-1"
                        >
                          Accept
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          isLoading={isLoading}
                          onClick={() => declineRideRequest(request.id)}
                          className="flex-1"
                        >
                          Decline
                        </Button>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-8">
                    <div className="mb-4 rounded-full bg-gray-100 p-3">
                      <FaCar className="h-6 w-6 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-700">
                      No ride requests
                    </h3>
                    <p className="text-center text-gray-500">
                      Stay online to receive ride requests
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="mb-4 rounded-full bg-gray-100 p-4">
                  <FaClock className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-700">
                  You're currently offline
                </h3>
                <p className="mb-6 text-center text-gray-500">
                  Go online to start receiving ride requests
                </p>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={toggleAvailability}
                  className="px-6"
                >
                  Go Online Now
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Driver Stats Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Driver Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-3 rounded-full bg-blue-100 p-2 text-blue-600">
                  <FaCar className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium text-gray-600">
                  Total Rides
                </span>
              </div>
              <span className="text-lg font-semibold">
                {driverStats.totalRides}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-3 rounded-full bg-yellow-100 p-2 text-yellow-600">
                  <FaStar className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium text-gray-600">
                  Rating
                </span>
              </div>
              <span className="text-lg font-semibold">
                {driverStats.averageRating}/5
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-3 rounded-full bg-green-100 p-2 text-green-600">
                  <FaRoute className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium text-gray-600">
                  Total Distance
                </span>
              </div>
              <span className="text-lg font-semibold">
                {driverStats.totalDistance} km
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-3 rounded-full bg-purple-100 p-2 text-purple-600">
                  <FaClock className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium text-gray-600">
                  Online Hours
                </span>
              </div>
              <span className="text-lg font-semibold">
                {driverStats.onlineHours} hrs
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DriverDashboard;
