"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/context/ToastContext";
import { BookingService } from "@/services/booking";
import {
  FaMapMarkerAlt,
  FaMapPin,
  FaCreditCard,
  FaTaxi,
  FaTimes,
  FaStar,
} from "react-icons/fa";

// Example locations
const sampleLocations = [
  { address: "123 Main St, Accra", lat: 5.6037, lng: -0.187 },
  { address: "456 Market Ave, Accra", lat: 5.6142, lng: -0.2055 },
  { address: "789 Cantonments Rd, Accra", lat: 5.5913, lng: -0.1738 },
  { address: "101 Airport Rd, Accra", lat: 5.6055, lng: -0.1681 },
  { address: "220 Independence Ave, Accra", lat: 5.56, lng: -0.2057 },
];

// Payment methods
const paymentMethods = [
  "Credit Card",
  "Mobile Money",
  "Cash",
  "Corporate Account",
];

export default function BookingDemo() {
  const { showToast } = useToast();

  // Form states
  const [pickup, setPickup] = useState(sampleLocations[0]);
  const [dropoff, setDropoff] = useState(sampleLocations[1]);
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [estimateResult, setEstimateResult] = useState<any>(null);
  const [bookingResult, setBookingResult] = useState<any>(null);
  const [rating, setRating] = useState(0);

  // Handle location selection
  const handlePickupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const index = parseInt(e.target.value);
    setPickup(sampleLocations[index]);
  };

  const handleDropoffChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const index = parseInt(e.target.value);
    setDropoff(sampleLocations[index]);
  };

  // Handle payment method selection
  const handlePaymentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPaymentMethod(e.target.value);
  };

  // Estimate fare
  const handleEstimateFare = async () => {
    setIsLoading(true);
    setEstimateResult(null);

    try {
      const result = await BookingService.estimateRide(pickup, dropoff);

      // Show toast with the result
      showToast(result.message, result.toastType);

      if (result.success) {
        setEstimateResult(result.data);
      }
    } catch (error) {
      showToast("An unexpected error occurred", "error");
    } finally {
      setIsLoading(false);
    }
  };

  // Book ride
  const handleBookRide = async () => {
    if (!estimateResult) {
      showToast("Please estimate fare first", "warning");
      return;
    }

    setIsLoading(true);
    setBookingResult(null);

    try {
      const result = await BookingService.bookRide(
        pickup,
        dropoff,
        paymentMethod
      );

      // Show toast with the result
      showToast(result.message, result.toastType);

      if (result.success) {
        setBookingResult(result.data);
      }
    } catch (error) {
      showToast("An unexpected error occurred", "error");
    } finally {
      setIsLoading(false);
    }
  };

  // Cancel ride
  const handleCancelRide = async () => {
    if (!bookingResult) {
      return;
    }

    setIsLoading(true);

    try {
      const result = await BookingService.cancelRide(bookingResult.bookingId);

      // Show toast with the result
      showToast(result.message, result.toastType);

      if (result.success) {
        setBookingResult(null);
        setEstimateResult(null);
      }
    } catch (error) {
      showToast("An unexpected error occurred", "error");
    } finally {
      setIsLoading(false);
    }
  };

  // Submit rating
  const handleRateDriver = async () => {
    if (!bookingResult || rating === 0) {
      showToast("Please select a rating first", "warning");
      return;
    }

    setIsLoading(true);

    try {
      const result = await BookingService.rateDriver(
        bookingResult.bookingId,
        rating
      );

      // Show toast with the result
      showToast(result.message, result.toastType);

      if (result.success) {
        // Reset everything after successful rating
        setBookingResult(null);
        setEstimateResult(null);
        setRating(0);
      }
    } catch (error) {
      showToast("An unexpected error occurred", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-center mb-8 text-primary">
          Troski Booking Demo with Toast Notifications
        </h1>

        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Book a Ride</h2>

          <div className="space-y-4 mb-6">
            {/* Pickup Location */}
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-green-100 rounded-full">
                <FaMapMarkerAlt className="text-green-600" />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="pickup"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Pickup Location
                </label>
                <select
                  id="pickup"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  onChange={handlePickupChange}
                  disabled={isLoading || bookingResult !== null}
                >
                  {sampleLocations.map((location, index) => (
                    <option key={`pickup-${index}`} value={index}>
                      {location.address}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Dropoff Location */}
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-red-100 rounded-full">
                <FaMapPin className="text-red-600" />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="dropoff"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Dropoff Location
                </label>
                <select
                  id="dropoff"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  onChange={handleDropoffChange}
                  disabled={isLoading || bookingResult !== null}
                >
                  {sampleLocations.map((location, index) => (
                    <option key={`dropoff-${index}`} value={index}>
                      {location.address}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Payment Method - shown only after estimate */}
            {estimateResult && !bookingResult && (
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-blue-100 rounded-full">
                  <FaCreditCard className="text-blue-600" />
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="payment"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Payment Method
                  </label>
                  <select
                    id="payment"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    onChange={handlePaymentChange}
                    disabled={isLoading}
                  >
                    {paymentMethods.map((method, index) => (
                      <option key={`payment-${index}`} value={method}>
                        {method}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Estimate Results */}
          {estimateResult && !bookingResult && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mb-6 p-4 bg-gray-50 rounded-md border border-gray-200"
            >
              <h3 className="text-lg font-medium mb-2">Ride Estimate</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Estimated Fare</p>
                  <p className="text-lg font-semibold">
                    ${estimateResult.estimatedFare}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Estimated Time</p>
                  <p className="text-lg font-semibold">
                    {estimateResult.estimatedTime} mins
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Distance</p>
                  <p className="text-lg font-semibold">
                    {estimateResult.distance} km
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Booking Results */}
          {bookingResult && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mb-6 p-4 bg-green-50 rounded-md border border-green-200"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-medium">Your Ride is Confirmed!</h3>
                <button
                  onClick={handleCancelRide}
                  className="text-red-500 hover:text-red-700 flex items-center text-sm"
                  disabled={isLoading}
                >
                  <FaTimes className="mr-1" /> Cancel Ride
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Booking ID</p>
                  <p className="text-md font-semibold">
                    {bookingResult.bookingId}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Driver</p>
                  <p className="text-md font-semibold">
                    {bookingResult.driverName} ({bookingResult.driverRating}★)
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Vehicle</p>
                  <p className="text-md font-semibold">
                    {bookingResult.vehicleInfo}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">ETA</p>
                  <p className="text-md font-semibold">
                    {bookingResult.estimatedTime} mins
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <p className="text-sm text-gray-600 mb-2">Rate your driver:</p>
                <div className="flex space-x-2 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className={`text-2xl ${rating >= star ? "text-yellow-400" : "text-gray-300"}`}
                      aria-label={`${star} stars`}
                    >
                      <FaStar />
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleRateDriver}
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition w-full"
                  disabled={isLoading || rating === 0}
                >
                  {isLoading ? "Submitting..." : "Submit Rating"}
                </button>
              </div>
            </motion.div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            {!estimateResult && (
              <button
                onClick={handleEstimateFare}
                className="flex-1 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition flex items-center justify-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  "Estimating..."
                ) : (
                  <>
                    <FaTaxi className="mr-2" /> Get Fare Estimate
                  </>
                )}
              </button>
            )}

            {estimateResult && !bookingResult && (
              <button
                onClick={handleBookRide}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition flex items-center justify-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  "Booking..."
                ) : (
                  <>
                    <FaTaxi className="mr-2" /> Book This Ride
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">
            How Toast Notifications Work
          </h2>
          <p className="mb-4">
            This demo shows how to integrate toast notifications with a
            real-world booking flow. The toast notifications appear in response
            to user actions and API results.
          </p>

          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <h3 className="text-md font-medium mb-2">
              Toast Usage in Components:
            </h3>
            <pre className="bg-gray-800 text-gray-100 p-4 rounded-md overflow-x-auto text-sm">
              {`// 1. Import the useToast hook
import { useToast } from '@/context/ToastContext';

// 2. Inside your component:
const { showToast } = useToast();

// 3. Show toast notifications as needed
showToast("Success message", "success");
showToast("Error message", "error");
showToast("Warning message", "warning");
showToast("Information message", "info");`}
            </pre>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
