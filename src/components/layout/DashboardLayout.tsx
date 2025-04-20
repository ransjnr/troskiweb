"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCar,
  FaHome,
  FaUser,
  FaWallet,
  FaSignOutAlt,
  FaHistory,
  FaCog,
  FaChevronRight,
  FaBell,
  FaLocationArrow,
  FaHeadset,
  FaQuestion,
} from "react-icons/fa";
import { UserRole } from "@/types";
import Logo from "./Logo";

interface DashboardLayoutProps {
  children: React.ReactNode;
  userRole: UserRole;
}

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  roles: UserRole[];
}

const navigation: NavItem[] = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: <FaHome className="h-5 w-5" />,
    roles: ["rider", "driver", "admin"],
  },
  {
    href: "/rides",
    label: "My Rides",
    icon: <FaCar className="h-5 w-5" />,
    roles: ["rider", "driver"],
  },
  {
    href: "/history",
    label: "History",
    icon: <FaHistory className="h-5 w-5" />,
    roles: ["rider", "driver"],
  },
  {
    href: "/wallet",
    label: "Wallet",
    icon: <FaWallet className="h-5 w-5" />,
    roles: ["rider", "driver"],
  },
  {
    href: "/profile",
    label: "Profile",
    icon: <FaUser className="h-5 w-5" />,
    roles: ["rider", "driver", "admin"],
  },
  {
    href: "/settings",
    label: "Settings",
    icon: <FaCog className="h-5 w-5" />,
    roles: ["rider", "driver", "admin"],
  },
];

const helpLinks: NavItem[] = [
  {
    href: "/support",
    label: "Support",
    icon: <FaHeadset className="h-5 w-5" />,
    roles: ["rider", "driver", "admin"],
  },
  {
    href: "/faq",
    label: "FAQ",
    icon: <FaQuestion className="h-5 w-5" />,
    roles: ["rider", "driver", "admin"],
  },
];

export default function DashboardLayout({
  children,
  userRole,
}: DashboardLayoutProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Notification state
  const [hasNotifications] = useState(true);

  // Filter navigation items based on user role
  const filteredNavigation = navigation.filter((item) =>
    item.roles.includes(userRole)
  );

  const filteredHelpLinks = helpLinks.filter((item) =>
    item.roles.includes(userRole)
  );

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <aside className="hidden fixed top-0 left-0 z-20 h-full w-64 md:flex md:flex-col bg-white shadow-md">
        <div className="flex h-16 items-center justify-center border-b border-gray-100">
          <Logo size="medium" withText={true} />
        </div>

        <div className="flex flex-1 flex-col overflow-y-auto py-4 px-3">
          <nav className="space-y-1">
            <div className="mb-2 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Main
            </div>
            {filteredNavigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-x-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span className={`${isActive ? "text-blue-600" : "text-gray-500"}`}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </Link>
              );
            })}

            <div className="mt-6 mb-2 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Support
            </div>
            {filteredHelpLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-x-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span className={`${isActive ? "text-blue-600" : "text-gray-500"}`}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="border-t border-gray-100 p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative h-9 w-9 overflow-hidden rounded-full bg-gray-200">
              <Image
                src="/images/default-avatar.jpg"
                alt="User avatar"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">
                {userRole === "driver" ? "Driver Account" : "Rider Account"}
              </p>
              <p className="text-xs text-gray-500">Online</p>
            </div>
          </div>
          
          <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-gray-100 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors">
            <FaSignOutAlt className="h-4 w-4 text-gray-500" />
            Sign out
          </button>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="fixed top-0 left-0 right-0 z-10 md:hidden">
        <header className="flex h-14 items-center justify-between bg-white px-4 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              className="text-gray-600"
              onClick={toggleMobileMenu}
            >
              <div className="relative w-5 h-5">
                <span
                  className={`absolute block h-0.5 w-full bg-current transform transition-all duration-300 ${
                    isMobileMenuOpen ? "rotate-45 top-2" : "top-0"
                  }`}
                ></span>
                <span
                  className={`absolute block h-0.5 w-full bg-current top-2 transition-opacity duration-300 ${
                    isMobileMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                ></span>
                <span
                  className={`absolute block h-0.5 w-full bg-current transform transition-all duration-300 ${
                    isMobileMenuOpen ? "-rotate-45 top-2" : "top-4"
                  }`}
                ></span>
              </div>
            </button>

            <Logo size="small" withText={true} />
          </div>

          <div className="flex items-center gap-3">
            <button className="relative text-gray-600">
              <FaBell className="h-5 w-5" />
              {hasNotifications && (
                <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-red-500 border border-white"></span>
              )}
            </button>
            
            <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gray-200">
              <Image
                src="/images/default-avatar.jpg"
                alt="User avatar"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </header>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-white pt-14 md:hidden"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-4">
              <nav className="space-y-1">
                {filteredNavigation.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-x-3 rounded-lg px-4 py-3 text-sm font-medium ${
                        isActive
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <span className={`${isActive ? "text-blue-600" : "text-gray-500"}`}>
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </Link>
                  );
                })}

                <div className="my-3 border-t border-gray-100 pt-3"></div>

                {filteredHelpLinks.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-x-3 rounded-lg px-4 py-3 text-sm font-medium ${
                        isActive
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <span className={`${isActive ? "text-blue-600" : "text-gray-500"}`}>
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-6 border-t border-gray-100 pt-6">
                <div className="flex items-center gap-3 mb-4 px-4">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full bg-gray-200">
                    <Image
                      src="/images/default-avatar.jpg"
                      alt="User avatar"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {userRole === "driver" ? "Driver Account" : "Rider Account"}
                    </p>
                    <p className="text-xs text-gray-500">View Profile</p>
                  </div>
                </div>

                <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-gray-100 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors">
                  <FaSignOutAlt className="h-4 w-4 text-gray-500" />
                  Sign out
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main className="flex-1 md:ml-64 pt-14 md:pt-0">
        {/* Desktop Header */}
        <div className="hidden md:block h-16 bg-white border-b border-gray-100 shadow-sm">
          <div className="flex h-full items-center justify-between px-6">
            <h1 className="text-xl font-semibold text-gray-800">
              {filteredNavigation.find((item) => item.href === pathname)?.label || "Dashboard"}
            </h1>

            <div className="flex items-center gap-4">
              <button className="rounded-full p-2 text-gray-600 hover:bg-gray-100 transition-colors">
                <FaLocationArrow className="h-5 w-5" />
              </button>

              <button className="relative rounded-full p-2 text-gray-600 hover:bg-gray-100 transition-colors">
                <FaBell className="h-5 w-5" />
                {hasNotifications && (
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 border border-white"></span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Page content */}
        <div className="p-4 md:p-6">{children}</div>
      </main>
    </div>
  );
}
