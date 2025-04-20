"use client";

import { useState, useEffect } from "react";
import {
  FaSun,
  FaMoon,
  FaCar,
  FaHistory,
  FaWallet,
  FaStar,
} from "react-icons/fa";
import { UserRole } from "@/types";

interface WelcomeCardProps {
  userName: string;
  userRole: UserRole;
}

const getTimeBasedGreeting = (): { text: string; icon: JSX.Element } => {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return {
      text: "Good morning",
      icon: <FaSun className="h-5 w-5 text-yellow-500" />,
    };
  } else if (hour >= 12 && hour < 18) {
    return {
      text: "Good afternoon",
      icon: <FaSun className="h-5 w-5 text-orange-500" />,
    };
  } else {
    return {
      text: "Good evening",
      icon: <FaMoon className="h-5 w-5 text-indigo-400" />,
    };
  }
};

export const WelcomeCard = ({ userName, userRole }: WelcomeCardProps) => {
  const [greeting, setGreeting] = useState(getTimeBasedGreeting());
  const [date, setDate] = useState(new Date());

  // Update greeting based on time
  useEffect(() => {
    const timer = setInterval(() => {
      setGreeting(getTimeBasedGreeting());
      setDate(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const quickActions = [
    {
      label: userRole === "driver" ? "Start Driving" : "Book Ride",
      icon: <FaCar className="h-4 w-4" />,
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      label: "Past Rides",
      icon: <FaHistory className="h-4 w-4" />,
      color: "bg-purple-500 hover:bg-purple-600",
    },
    {
      label: userRole === "driver" ? "Earnings" : "Payment",
      icon: <FaWallet className="h-4 w-4" />,
      color: "bg-green-500 hover:bg-green-600",
    },
  ];

  return (
    <div className="overflow-hidden rounded-lg bg-white p-6 shadow-md border border-gray-100">
      <div className="flex items-center gap-2 mb-1">
        {greeting.icon}
        <h2 className="text-xl font-bold text-gray-800">
          {greeting.text}, {userName}!
        </h2>
      </div>

      <p className="text-gray-500 mb-4">
        {date.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
        })}
      </p>

      <div className="grid grid-cols-3 gap-3 mb-4">
        {quickActions.map((action, index) => (
          <button
            key={index}
            className={`flex items-center justify-center rounded-lg ${action.color} px-3 py-2 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:shadow-md`}
          >
            {action.icon}
            <span className="ml-2">{action.label}</span>
          </button>
        ))}
      </div>

      {userRole === "driver" ? (
        <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3 border border-gray-100">
          <div>
            <h3 className="font-medium text-gray-800">Today's Stats</h3>
            <p className="text-sm text-gray-600">
              You've completed 4 trips and earned $78.50
            </p>
          </div>
          <div className="flex items-center">
            <FaStar className="mr-1 text-yellow-400" />
            <span className="font-semibold">4.9</span>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3 border border-gray-100">
          <div>
            <h3 className="font-medium text-gray-800">Need a ride?</h3>
            <p className="text-sm text-gray-600">
              Drivers are available in your area with 4 min wait time
            </p>
          </div>
          <button className="rounded-lg bg-blue-500 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-blue-600">
            Book Now
          </button>
        </div>
      )}
    </div>
  );
};

export default WelcomeCard;
