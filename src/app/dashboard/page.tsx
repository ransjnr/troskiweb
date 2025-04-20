"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { DriverDashboard } from "@/components/dashboard/DriverDashboard";
import WelcomeCard from "@/components/dashboard/WelcomeCard";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/context/ToastContext";
import { FaExclamationTriangle } from "react-icons/fa";

export default function Dashboard() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { showToast } = useToast();
  const router = useRouter();
  const [userRole, setUserRole] = useState<"rider" | "driver" | "admin">(
    "rider"
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is authenticated
    if (!isLoading && !isAuthenticated) {
      showToast("Please sign in to access the dashboard", "warning");
      router.push("/signin");
      return;
    }

    // Set user role from auth context
    if (user?.role) {
      setUserRole(user.role as "rider" | "driver" | "admin");
    } else if (!isLoading && isAuthenticated) {
      // If authenticated but no role, something is wrong with user data
      setError("Unable to determine user role. Please contact support.");
      showToast("User profile issue detected", "error");
    }
  }, [isAuthenticated, isLoading, router, showToast, user]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mb-4 flex justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-blue-500"></div>
          </div>
          <h2 className="text-xl font-semibold text-gray-700">
            Loading your dashboard...
          </h2>
          <p className="mt-2 text-gray-500">Please wait a moment</p>
        </div>
      </div>
    );
  }

  // If there's an error, show error state
  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
        <div className="max-w-md text-center p-6 bg-white rounded-lg shadow-md">
          <div className="mb-4 flex justify-center">
            <FaExclamationTriangle className="h-10 w-10 text-amber-500" />
          </div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Dashboard Error
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  // If not loading and authenticated, show dashboard
  return (
    <DashboardLayout userRole={userRole}>
      <div className="space-y-6">
        {/* Welcome Card */}
        <WelcomeCard userName={user?.firstName || "User"} userRole={userRole} />

        {/* Dashboard Content */}
        <div className="transition-all duration-300">
          {/* Show appropriate dashboard based on user role */}
          {userRole === "driver" ? <DriverDashboard /> : <DashboardOverview />}
        </div>
      </div>
    </DashboardLayout>
  );
}
