"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaEdit,
  FaSave,
  FaTimes,
  FaSignOutAlt,
} from "react-icons/fa";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/context/ToastContext";

export default function Profile() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const { showToast } = useToast();
  const router = useRouter();
  const [userRole, setUserRole] = useState<"rider" | "driver" | "admin">(
    "rider"
  );

  // Form state
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    // Check if user is authenticated
    if (!isLoading && !isAuthenticated) {
      showToast("Please sign in to access your profile", "warning");
      router.push("/signin");
    }

    // Set user role and form data from auth context
    if (user) {
      setUserRole(user.role as "rider" | "driver" | "admin");
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [isAuthenticated, isLoading, router, showToast, user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    // Reset form data to original user data
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
    setIsEditing(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically call an API to update the user profile
    // For this demo, we'll just simulate an API call with a timeout

    showToast("Updating your profile...", "info");

    setTimeout(() => {
      setIsEditing(false);
      showToast("Profile updated successfully!", "success");
    }, 1500);
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
      showToast("You have been logged out", "info");
    } catch (error) {
      showToast("Error logging out", "error");
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="text-center">
          <div className="mb-4 flex justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-500"></div>
          </div>
          <h2 className="text-xl font-semibold text-gray-700">
            Loading your profile...
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
            <h1 className="text-3xl font-bold text-gray-900">Your Profile</h1>
            <p className="mt-1 text-gray-600">
              View and manage your personal information
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Profile Card */}
            <Card className="md:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-semibold">
                  Personal Information
                </CardTitle>
                {!isEditing ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleEdit}
                    className="flex items-center gap-2"
                  >
                    <FaEdit className="h-4 w-4" />
                    Edit Profile
                  </Button>
                ) : (
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCancel}
                      className="flex items-center gap-2"
                    >
                      <FaTimes className="h-4 w-4" />
                      Cancel
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={handleSubmit}
                      className="flex items-center gap-2"
                    >
                      <FaSave className="h-4 w-4" />
                      Save
                    </Button>
                  </div>
                )}
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Input
                      label="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      fullWidth
                    />
                    <Input
                      label="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      fullWidth
                    />
                  </div>
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    fullWidth
                  />
                  <Input
                    label="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    fullWidth
                  />
                </form>
              </CardContent>
            </Card>

            {/* User Card */}
            <div className="space-y-6">
              <Card>
                <CardContent className="flex flex-col items-center p-6">
                  <div className="mb-4 h-24 w-24 overflow-hidden rounded-full bg-blue-100 flex items-center justify-center">
                    {user?.profilePicture ? (
                      <img
                        src={user.profilePicture}
                        alt={`${user.firstName} ${user.lastName}`}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <FaUser className="h-12 w-12 text-blue-500" />
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {user?.firstName} {user?.lastName}
                  </h3>
                  <p className="text-gray-500 capitalize">{userRole}</p>
                  <div className="mt-4 flex items-center justify-center">
                    <div className="flex items-center space-x-1">
                      <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
                      <span className="text-sm text-gray-600">
                        Active Account
                      </span>
                    </div>
                  </div>
                  <div className="mt-6 grid w-full grid-cols-1 gap-2">
                    <Button
                      variant="primary"
                      size="sm"
                      className="w-full"
                      onClick={() => router.push("/dashboard")}
                    >
                      Dashboard
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full flex items-center justify-center gap-2 text-red-600 hover:bg-red-50 hover:border-red-200"
                      onClick={handleLogout}
                    >
                      <FaSignOutAlt className="h-4 w-4" />
                      Sign Out
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {userRole === "rider" && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">
                      Account Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Member Since</span>
                      <span className="font-medium">Jan 2023</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Total Rides</span>
                      <span className="font-medium">24</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Loyalty Points</span>
                      <span className="font-medium">350 pts</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Saved Locations</span>
                      <span className="font-medium">3</span>
                    </div>
                  </CardContent>
                </Card>
              )}

              {userRole === "driver" && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">
                      Driver Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Driving Since</span>
                      <span className="font-medium">Mar 2022</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Completed Trips</span>
                      <span className="font-medium">342</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Rating</span>
                      <span className="font-medium">4.9/5</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Acceptance Rate</span>
                      <span className="font-medium">94%</span>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
