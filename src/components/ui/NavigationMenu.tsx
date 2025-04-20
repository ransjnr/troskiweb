"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { FaChevronRight } from "react-icons/fa";

export interface NavigationItem {
  href: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
  badgeColor?: string;
}

export interface NavigationMenuProps {
  items: NavigationItem[];
  className?: string;
  variant?: "vertical" | "horizontal" | "pills";
  size?: "sm" | "md" | "lg";
  showIcons?: boolean;
  showActiveIndicator?: boolean;
  activeItemId?: string;
}

export const NavigationMenu = ({
  items,
  className = "",
  variant = "vertical",
  size = "md",
  showIcons = true,
  showActiveIndicator = true,
  activeItemId,
}: NavigationMenuProps) => {
  const pathname = usePathname();

  // Size classes
  const sizeClasses = {
    sm: "text-xs py-1.5 px-2",
    md: "text-sm py-2 px-3",
    lg: "text-base py-2.5 px-4",
  };

  // Variant-specific container classes
  const containerClasses = {
    vertical: "flex flex-col space-y-1",
    horizontal: "flex flex-row items-center space-x-1",
    pills: "flex flex-row items-center space-x-1",
  };

  // Determine if an item is active
  const isActive = (item: NavigationItem) => {
    if (activeItemId) {
      return item.href === activeItemId;
    }
    return pathname === item.href;
  };

  // Base item classes
  const getItemClasses = (item: NavigationItem) => {
    const active = isActive(item);

    const baseClasses = `flex items-center font-medium transition-all duration-200 rounded-lg ${sizeClasses[size]}`;

    if (variant === "pills") {
      return `${baseClasses} ${
        active ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100"
      }`;
    } else {
      return `${baseClasses} ${
        active
          ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
          : "text-gray-700 hover:bg-blue-50"
      }`;
    }
  };

  return (
    <nav className={`${containerClasses[variant]} ${className}`}>
      {items.map((item, index) => {
        const active = isActive(item);

        return (
          <motion.div
            key={item.href}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.3,
              delay: index * 0.05,
            }}
            className="relative"
          >
            <Link href={item.href} className={getItemClasses(item)}>
              {showIcons && item.icon && (
                <span
                  className={`flex-shrink-0 mr-2 ${active ? "text-current" : "text-blue-500"}`}
                >
                  {item.icon}
                </span>
              )}

              <span>{item.label}</span>

              {/* Badge */}
              {item.badge && (
                <span
                  className={`ml-auto rounded-full ${item.badgeColor || "bg-blue-100 text-blue-700"} text-xs px-2 py-0.5`}
                >
                  {item.badge}
                </span>
              )}

              {/* Active indicator */}
              {active && showActiveIndicator && variant !== "pills" && (
                <motion.span
                  className="absolute right-2 text-white"
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaChevronRight size={12} />
                </motion.span>
              )}

              {/* Hover indicator for vertical variant */}
              {variant === "vertical" && !active && showActiveIndicator && (
                <span className="absolute left-0 h-full w-0.5 bg-blue-500 rounded-full opacity-0 transform scale-y-0 group-hover:opacity-100 group-hover:scale-y-75 transition-all duration-300"></span>
              )}
            </Link>
          </motion.div>
        );
      })}
    </nav>
  );
};

export default NavigationMenu;
