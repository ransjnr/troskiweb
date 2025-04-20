"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  FaBell,
  FaGlobe,
  FaLock,
  FaCreditCard,
  FaShieldAlt,
  FaToggleOn,
  FaToggleOff,
} from "react-icons/fa";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/context/ToastContext";

export default function Settings() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { showToast } = useToast();
  const router = useRouter();
  const [userRole, setUserRole] = useState<"rider" | "driver" | "admin">(
    "rider"
  );

  // Settings state
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    sms: true,
    push: true,
  });

  const [displaySettings, setDisplaySettings] = useState({
    language: "en",
    darkMode: false,
    highContrast: false,
    largeText: false,
  });

  const [privacySettings, setPrivacySettings] = useState({
    shareLocation: true,
    shareRideHistory: false,
    allowMarketingEmails: true,
  });

  useEffect(() => {
    // Check if user is authenticated
    if (!isLoading && !isAuthenticated) {
      showToast("Please sign in to access settings", "warning");
      router.push("/signin");
      return;
    }

    // Set user role from auth context
    if (user?.role) {
      setUserRole(user.role as "rider" | "driver" | "admin");
    }

    // Here you would typically fetch the user's actual settings from an API
  }, [isAuthenticated, isLoading, router, showToast, user]);

  // Handle notification toggle changes
  const handleNotificationToggle = (key: keyof typeof notificationSettings) => {
    setNotificationSettings({
      ...notificationSettings,
      [key]: !notificationSettings[key],
    });
    showToast(
      `${key} notifications ${notificationSettings[key] ? "disabled" : "enabled"}`,
      "info"
    );
  };

  // Handle display setting changes
  const handleDisplayToggle = (key: keyof typeof displaySettings) => {
    if (key === "language") {
      // Handle language toggle separately
      const newLanguage = displaySettings.language === "en" ? "fr" : "en";
      setDisplaySettings({
        ...displaySettings,
        language: newLanguage,
      });
      showToast(
        `Language changed to ${newLanguage === "en" ? "English" : "French"}`,
        "info"
      );
    } else {
      setDisplaySettings({
        ...displaySettings,
        [key]: !displaySettings[key],
      });
      showToast(
        `${key} ${displaySettings[key as keyof typeof displaySettings] ? "disabled" : "enabled"}`,
        "info"
      );
    }
  };

  // Handle privacy setting changes
  const handlePrivacyToggle = (key: keyof typeof privacySettings) => {
    setPrivacySettings({
      ...privacySettings,
      [key]: !privacySettings[key],
    });
    showToast(
      `${key} ${privacySettings[key] ? "disabled" : "enabled"}`,
      "info"
    );
  };

  // Toggle component for settings
  const ToggleOption = ({
    title,
    description,
    enabled,
    onToggle,
  }: {
    title: string;
    description: string;
    enabled: boolean;
    onToggle: () => void;
  }) => (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-none">
      <div>
        <h3 className="font-medium text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <motion.button
        onClick={onToggle}
        whileTap={{ scale: 0.95 }}
        className="text-blue-600"
      >
        {enabled ? (
          <FaToggleOn className="h-6 w-6" />
        ) : (
          <FaToggleOff className="h-6 w-6 text-gray-400" />
        )}
      </motion.button>
    </div>
  );

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="text-center">
          <div className="mb-4 flex justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-500"></div>
          </div>
          <h2 className="text-xl font-semibold text-gray-700">
            Loading your settings...
          </h2>
          <p className="mt-2 text-gray-500">Please wait a moment</p>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout userRole={userRole}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="mt-1 text-gray-600">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Notification Settings */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-semibold">
                <div className="flex items-center">
                  <FaBell className="mr-2 h-5 w-5 text-blue-500" />
                  Notifications
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <ToggleOption
                  title="Email Notifications"
                  description="Receive ride updates and promotions via email"
                  enabled={notificationSettings.email}
                  onToggle={() => handleNotificationToggle("email")}
                />
                <ToggleOption
                  title="SMS Notifications"
                  description="Get text messages for important updates"
                  enabled={notificationSettings.sms}
                  onToggle={() => handleNotificationToggle("sms")}
                />
                <ToggleOption
                  title="Push Notifications"
                  description="Receive alerts on your device"
                  enabled={notificationSettings.push}
                  onToggle={() => handleNotificationToggle("push")}
                />
              </div>
            </CardContent>
          </Card>

          {/* Display Settings */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-semibold">
                <div className="flex items-center">
                  <FaGlobe className="mr-2 h-5 w-5 text-blue-500" />
                  Display & Accessibility
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div>
                    <h3 className="font-medium text-gray-900">Language</h3>
                    <p className="text-sm text-gray-500">
                      Choose your preferred language
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDisplayToggle("language")}
                    className="min-w-[80px]"
                  >
                    {displaySettings.language === "en" ? "English" : "Français"}
                  </Button>
                </div>
                <ToggleOption
                  title="Dark Mode"
                  description="Use dark theme throughout the app"
                  enabled={displaySettings.darkMode}
                  onToggle={() => handleDisplayToggle("darkMode")}
                />
                <ToggleOption
                  title="High Contrast"
                  description="Increase visual contrast for better readability"
                  enabled={displaySettings.highContrast}
                  onToggle={() => handleDisplayToggle("highContrast")}
                />
                <ToggleOption
                  title="Large Text"
                  description="Use larger text size throughout the app"
                  enabled={displaySettings.largeText}
                  onToggle={() => handleDisplayToggle("largeText")}
                />
              </div>
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-semibold">
                <div className="flex items-center">
                  <FaShieldAlt className="mr-2 h-5 w-5 text-blue-500" />
                  Privacy
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <ToggleOption
                  title="Share Location"
                  description="Allow access to your location when using the app"
                  enabled={privacySettings.shareLocation}
                  onToggle={() => handlePrivacyToggle("shareLocation")}
                />
                <ToggleOption
                  title="Share Ride History"
                  description="Share your ride history with trusted contacts"
                  enabled={privacySettings.shareRideHistory}
                  onToggle={() => handlePrivacyToggle("shareRideHistory")}
                />
                <ToggleOption
                  title="Marketing Emails"
                  description="Receive promotional emails and offers"
                  enabled={privacySettings.allowMarketingEmails}
                  onToggle={() => handlePrivacyToggle("allowMarketingEmails")}
                />
              </div>
            </CardContent>
          </Card>

          {/* Account Security */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-semibold">
                <div className="flex items-center">
                  <FaLock className="mr-2 h-5 w-5 text-blue-500" />
                  Security
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border border-gray-200 p-4">
                  <h3 className="font-medium text-gray-900 mb-1">Password</h3>
                  <p className="text-sm text-gray-500 mb-3">
                    Last changed 45 days ago
                  </p>
                  <Button variant="outline" size="sm">
                    Change Password
                  </Button>
                </div>

                <div className="rounded-lg border border-gray-200 p-4">
                  <h3 className="font-medium text-gray-900 mb-1">
                    Two-Factor Authentication
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">
                    Add an extra layer of security
                  </p>
                  <Button variant="outline" size="sm">
                    Set Up 2FA
                  </Button>
                </div>

                <div className="rounded-lg border border-gray-200 p-4">
                  <h3 className="font-medium text-gray-900 mb-1">
                    Login Activity
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">
                    View your recent login history
                  </p>
                  <Button variant="outline" size="sm">
                    View Activity
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment Methods Section (Driver-specific) */}
        {userRole === "driver" && (
          <Card className="mt-6">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-semibold">
                <div className="flex items-center">
                  <FaCreditCard className="mr-2 h-5 w-5 text-blue-500" />
                  Payment Details
                </div>
              </CardTitle>
              <Button variant="outline" size="sm">
                Add Method
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex items-center justify-center bg-blue-100 rounded-full mr-3">
                      <FaCreditCard className="text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        VISA ****4242
                      </h3>
                      <p className="text-sm text-gray-500">Expires 12/25</p>
                    </div>
                  </div>
                  <div>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex items-center justify-center bg-blue-100 rounded-full mr-3">
                      <FaCreditCard className="text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        MasterCard ****8371
                      </h3>
                      <p className="text-sm text-gray-500">Expires 05/26</p>
                    </div>
                  </div>
                  <div>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex justify-center mt-8">
          <Button variant="primary" size="lg" className="px-8">
            Save Changes
          </Button>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
