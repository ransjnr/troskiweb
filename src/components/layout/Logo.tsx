"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface LogoProps {
  size?: "small" | "medium" | "large";
  withText?: boolean;
  href?: string;
  className?: string;
}

export const Logo = ({
  size = "medium",
  withText = true,
  href = "/",
  className = "",
}: LogoProps) => {
  // Size mappings
  const sizes = {
    small: {
      container: "h-8 w-8",
      text: "text-lg",
      spacing: "ml-2",
    },
    medium: {
      container: "h-10 w-10",
      text: "text-xl",
      spacing: "ml-2",
    },
    large: {
      container: "h-14 w-14",
      text: "text-2xl",
      spacing: "ml-3",
    },
  };

  const currentSize = sizes[size];

  // Logo component
  const LogoContent = () => (
    <div className={`flex items-center ${className}`}>
      {/* Logo mark */}
      <div
        className={`relative ${currentSize.container} rounded-full overflow-hidden`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600"></div>

        {/* Creative logo design - stylized "T" with road/path element */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Road/path element */}
            <div className="absolute w-full h-1.5 bg-white rounded-full opacity-70"></div>

            {/* Vertical part of T */}
            <div className="absolute h-full w-1.5 bg-white rounded-full top-0 left-1/2 transform -translate-x-1/2"></div>

            {/* Car/vehicle element */}
            <div className="absolute bottom-1.5 left-1/2 transform -translate-x-1/2 w-2.5 h-2.5 bg-yellow-300 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Logo text */}
      {withText && (
        <span
          className={`font-bold ${currentSize.text} ${currentSize.spacing} text-gray-800`}
        >
          Troski
        </span>
      )}
    </div>
  );

  // If link is provided, wrap in Link component
  if (href) {
    return (
      <Link href={href}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <LogoContent />
        </motion.div>
      </Link>
    );
  }

  // Otherwise return just the logo
  return <LogoContent />;
};

export default Logo;
