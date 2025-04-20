"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/context/ToastContext";
import {
  BookingService,
  LocationService,
  PaymentService,
  UserProfileService,
  NotificationService,
  SupportService,
  FareEstimateResult,
  Transaction,
  Notification,
  SupportTicket,
  Faq,
} from "@/services";

const tabs = [
  "Booking",
  "Location",
  "Payment",
  "Profile",
  "Notifications",
  "Support",
];

export default function ServicesDemo() {
  const [activeTab, setActiveTab] = useState("Booking");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const { showToast } = useToast();

  // Initialize services with mock user role
  useEffect(() => {
    NotificationService.initialize("rider");
    SupportService.initialize("rider");
  }, []);

  // Handle demo examples for each service
  const handleDemoAction = async (action: string) => {
    setLoading(true);
    setResults(null);

    try {
      let result;

      switch (action) {
        // BookingService examples
        case "estimate_fare":
          const pickup = {
            id: "loc-1",
            name: "Accra Mall",
            address: "Tetteh Quarshie Interchange, Accra, Ghana",
            coordinates: {
              lat: 5.6356,
              lng: -0.175,
            },
          };

          const dropoff = {
            id: "loc-2",
            name: "Kotoka International Airport",
            address: "Airport Road, Accra, Ghana",
            coordinates: {
              lat: 5.6052,
              lng: -0.1682,
            },
          };

          result = await BookingService.estimateFare(pickup, dropoff);
          break;

        case "book_ride":
          const paymentMethod = {
            id: "pm-1",
            type: "credit_card",
            label: "Visa •••• 4242",
          };

          result = await BookingService.bookRide(
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
            paymentMethod
          );
          break;

        // LocationService examples
        case "search_locations":
          result = await LocationService.searchLocations("Accra");
          break;

        case "get_suggestions":
          result = await LocationService.getAutocompleteSuggestions("mall");
          break;

        case "get_nearby":
          result = await LocationService.getNearbyLocations(
            { lat: 5.6052, lng: -0.1682 },
            5
          );
          break;

        // PaymentService examples
        case "get_payment_methods":
          result = await PaymentService.getPaymentMethods();
          break;

        case "get_transactions":
          result = await PaymentService.getTransactionHistory();
          break;

        case "process_payment":
          result = await PaymentService.processPayment(
            25.5,
            "GHS",
            undefined,
            "booking-test",
            "Test ride payment"
          );
          if (result.success) {
            showToast("Payment processed successfully", "success");
          } else {
            showToast("Payment failed: " + result.error, "error");
          }
          break;

        // UserProfileService examples
        case "get_loyalty":
          await UserProfileService.initialize("user-123");
          result = await UserProfileService.getLoyaltyInfo();
          break;

        case "get_past_rides":
          await UserProfileService.initialize("user-123");
          result = await UserProfileService.getPastRides();
          break;

        // NotificationService examples
        case "get_notifications":
          result = await NotificationService.getNotifications();
          break;

        case "add_notification":
          result = await NotificationService.addNotification({
            type: "promotion",
            title: "Special Demo Offer",
            message:
              "This is a demo notification created from the services demo page.",
            priority: "medium",
            data: {
              demoCreated: true,
              timestamp: new Date().toISOString(),
            },
            actions: [
              {
                label: "View Details",
                action: "view_details",
                url: "#details",
              },
            ],
          });
          showToast("New notification created", "success");
          break;

        // SupportService examples
        case "get_tickets":
          result = await SupportService.getTickets();
          break;

        case "search_faqs":
          result = await SupportService.searchFaqs("password");
          break;

        case "get_help_articles":
          result = await SupportService.getHelpArticles();
          break;
      }

      setResults(result);
    } catch (error) {
      console.error("Error in demo action:", error);
      showToast(`Error: ${(error as Error).message}`, "error");
    } finally {
      setLoading(false);
    }
  };

  // Format results for display
  const formatResults = (data: any) => {
    return JSON.stringify(
      data,
      (key, value) => {
        // Handle dates
        if (value instanceof Date) {
          return value.toISOString();
        }
        return value;
      },
      2
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Troski Services Demo
            </h1>
            <p className="text-gray-600 mb-8">
              This page demonstrates the functionality of the service layer for
              the Troski ride-sharing application. Select a service and try
              different examples.
            </p>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-8">
              <nav className="flex space-x-8">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 px-1 font-medium text-sm ${
                      activeTab === tab
                        ? "border-b-2 border-blue-500 text-blue-600"
                        : "border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-semibold mb-4">Examples</h2>

                {/* BookingService examples */}
                {activeTab === "Booking" && (
                  <div className="space-y-4">
                    <button
                      onClick={() => handleDemoAction("estimate_fare")}
                      className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                      disabled={loading}
                    >
                      {loading ? "Loading..." : "Estimate Fare"}
                    </button>

                    <button
                      onClick={() => handleDemoAction("book_ride")}
                      className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                      disabled={loading}
                    >
                      {loading ? "Loading..." : "Book a Ride"}
                    </button>
                  </div>
                )}

                {/* LocationService examples */}
                {activeTab === "Location" && (
                  <div className="space-y-4">
                    <button
                      onClick={() => handleDemoAction("search_locations")}
                      className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                      disabled={loading}
                    >
                      {loading ? "Loading..." : "Search Locations"}
                    </button>

                    <button
                      onClick={() => handleDemoAction("get_suggestions")}
                      className="w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors"
                      disabled={loading}
                    >
                      {loading ? "Loading..." : "Get Autocomplete Suggestions"}
                    </button>

                    <button
                      onClick={() => handleDemoAction("get_nearby")}
                      className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
                      disabled={loading}
                    >
                      {loading ? "Loading..." : "Get Nearby Locations"}
                    </button>
                  </div>
                )}

                {/* PaymentService examples */}
                {activeTab === "Payment" && (
                  <div className="space-y-4">
                    <button
                      onClick={() => handleDemoAction("get_payment_methods")}
                      className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                      disabled={loading}
                    >
                      {loading ? "Loading..." : "Get Payment Methods"}
                    </button>

                    <button
                      onClick={() => handleDemoAction("get_transactions")}
                      className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
                      disabled={loading}
                    >
                      {loading ? "Loading..." : "Get Transaction History"}
                    </button>

                    <button
                      onClick={() => handleDemoAction("process_payment")}
                      className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                      disabled={loading}
                    >
                      {loading ? "Loading..." : "Process a Payment"}
                    </button>
                  </div>
                )}

                {/* UserProfileService examples */}
                {activeTab === "Profile" && (
                  <div className="space-y-4">
                    <button
                      onClick={() => handleDemoAction("get_loyalty")}
                      className="w-full px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors"
                      disabled={loading}
                    >
                      {loading ? "Loading..." : "Get Loyalty Information"}
                    </button>

                    <button
                      onClick={() => handleDemoAction("get_past_rides")}
                      className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                      disabled={loading}
                    >
                      {loading ? "Loading..." : "Get Past Rides"}
                    </button>
                  </div>
                )}

                {/* NotificationService examples */}
                {activeTab === "Notifications" && (
                  <div className="space-y-4">
                    <button
                      onClick={() => handleDemoAction("get_notifications")}
                      className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                      disabled={loading}
                    >
                      {loading ? "Loading..." : "Get Notifications"}
                    </button>

                    <button
                      onClick={() => handleDemoAction("add_notification")}
                      className="w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors"
                      disabled={loading}
                    >
                      {loading ? "Loading..." : "Create New Notification"}
                    </button>
                  </div>
                )}

                {/* SupportService examples */}
                {activeTab === "Support" && (
                  <div className="space-y-4">
                    <button
                      onClick={() => handleDemoAction("get_tickets")}
                      className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                      disabled={loading}
                    >
                      {loading ? "Loading..." : "Get Support Tickets"}
                    </button>

                    <button
                      onClick={() => handleDemoAction("search_faqs")}
                      className="w-full px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-colors"
                      disabled={loading}
                    >
                      {loading ? "Loading..." : "Search FAQs (password)"}
                    </button>

                    <button
                      onClick={() => handleDemoAction("get_help_articles")}
                      className="w-full px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-colors"
                      disabled={loading}
                    >
                      {loading ? "Loading..." : "Get Help Articles"}
                    </button>
                  </div>
                )}

                <div className="mt-6 text-sm text-gray-500">
                  <p>
                    Click any of the buttons above to test the service
                    functionality. The results will be displayed in the panel to
                    the right.
                  </p>
                </div>
              </div>

              {/* Results panel */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Results</h2>
                <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-white overflow-auto h-[500px]">
                  {loading ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="animate-spin h-6 w-6 border-t-2 border-b-2 border-white rounded-full mr-2"></div>
                      <span>Loading...</span>
                    </div>
                  ) : results ? (
                    <pre>{formatResults(results)}</pre>
                  ) : (
                    <div className="text-gray-400 flex items-center justify-center h-full">
                      <p>Click a button to see results</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
