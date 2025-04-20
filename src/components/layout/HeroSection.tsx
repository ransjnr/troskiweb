"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaLocationArrow,
  FaShieldAlt,
  FaHandHoldingHeart,
  FaStar,
  FaCar,
} from "react-icons/fa";
import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");

  const features = [
    {
      icon: <FaShieldAlt className="h-5 w-5 text-green-500" />,
      text: "No surprise surge pricing",
    },
    {
      icon: <FaHandHoldingHeart className="h-5 w-5 text-blue-500" />,
      text: "85% of fare goes to drivers",
    },
    {
      icon: <FaStar className="h-5 w-5 text-amber-500" />,
      text: "Earn loyalty rewards",
    },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 pt-24">
      {/* Background Elements */}
      <div className="absolute top-20 right-10 h-64 w-64 rounded-full bg-blue-200 opacity-20 blur-3xl"></div>
      <div className="absolute bottom-40 left-10 h-80 w-80 rounded-full bg-indigo-300 opacity-20 blur-3xl"></div>

      <div className="container mx-auto flex min-h-[90vh] flex-col-reverse items-center px-6 py-12 md:flex-row md:justify-between lg:px-16">
        {/* Left Content */}
        <motion.div
          className="z-10 mt-10 w-full md:mt-0 md:w-1/2"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-4 inline-flex items-center rounded-full bg-blue-100 px-3 py-1">
            <span className="mr-1 text-sm font-medium text-blue-600">🇨🇦</span>
            <span className="text-sm font-medium text-blue-800">
              Proudly Canadian
            </span>
          </div>

          <motion.h1
            className="mb-6 text-5xl font-bold leading-tight tracking-tight text-gray-900 md:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Ride-sharing that{" "}
            <span className="text-blue-600">empowers community</span>
          </motion.h1>

          <motion.p
            className="mb-6 text-xl leading-relaxed text-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Experience affordable, reliable rides across Canada with transparent
            pricing and community-focused service.
          </motion.p>

          {/* Feature Highlights */}
          <motion.div
            className="mb-8 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center rounded-full bg-white px-4 py-2 shadow-sm"
              >
                <span className="mr-2">{feature.icon}</span>
                <span className="text-sm font-medium text-gray-800">
                  {feature.text}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Ride Form */}
          <motion.div
            className="mb-8 w-full overflow-hidden rounded-2xl bg-white p-6 shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3 className="mb-4 text-center text-lg font-semibold text-gray-800">
              Where can we take you today?
            </h3>

            <div className="mb-4">
              <label className="mb-2 flex items-center text-sm font-medium text-gray-600">
                <FaMapMarkerAlt className="mr-2 text-blue-600" />
                Pickup Location
              </label>
              <input
                type="text"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter pickup location"
              />
            </div>

            <div className="mb-6">
              <label className="mb-2 flex items-center text-sm font-medium text-gray-600">
                <FaLocationArrow className="mr-2 text-blue-600" />
                Dropoff Location
              </label>
              <input
                type="text"
                value={dropoff}
                onChange={(e) => setDropoff(e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter dropoff location"
              />
            </div>

            <Button
              variant="primary"
              size="lg"
              isFullWidth
              className="group relative overflow-hidden rounded-xl"
            >
              <span className="relative z-10">Get Fare Estimate</span>
              <span className="absolute bottom-0 left-0 h-full w-0 bg-blue-700 transition-all duration-300 ease-out group-hover:w-full"></span>
            </Button>

            <p className="mt-3 text-center text-xs text-gray-500">
              No surge pricing. What you see is what you pay.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Link href="/signup">
              <Button
                variant="primary"
                size="lg"
                className="rounded-xl shadow-md hover:shadow-lg transition-all"
              >
                Sign up to ride
              </Button>
            </Link>
            <Link href="/driver">
              <Button
                variant="outline"
                size="lg"
                className="rounded-xl hover:bg-gray-50"
              >
                Become a driver
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Content - Map/Illustration */}
        <motion.div
          className="relative h-[340px] w-full md:h-[540px] md:w-1/2"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="absolute inset-0 overflow-hidden rounded-3xl">
            <div className="relative h-full w-full rounded-3xl bg-gradient-to-br from-blue-100 to-indigo-100">
              {/* Replaced Image with a fallback gradient background */}

              {/* Fare Visualization */}
              <motion.div
                className="absolute top-12 right-12 w-64 bg-white backdrop-blur-md p-4 rounded-xl shadow-lg z-10"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <h4 className="text-sm font-semibold text-gray-700 mb-2">
                  Fare Breakdown
                </h4>
                <div className="space-y-2 mb-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Base fare</span>
                    <span className="font-medium">$3.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Distance (10 km)</span>
                    <span className="font-medium">$7.50</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Time (15 min)</span>
                    <span className="font-medium">$3.00</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between">
                    <span className="font-medium">Total</span>
                    <span className="font-bold text-blue-600">$13.50</span>
                  </div>
                </div>
                <p className="text-xs text-green-600 font-medium">
                  ✓ No surge pricing applied
                </p>
              </motion.div>

              {/* Car animation replaced with icon */}
              <motion.div
                className="absolute top-1/2 left-1/4 z-10"
                animate={{
                  x: [0, 100, 200, 300],
                  y: [0, -50, -20, -100],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                <div className="bg-blue-600 text-white rounded-full p-2">
                  <FaCar className="h-6 w-6" />
                </div>
              </motion.div>

              {/* Route line */}
              <svg className="absolute inset-0 h-full w-full">
                <motion.path
                  d="M100,250 C150,200 250,100 350,150"
                  fill="none"
                  stroke="#4f46e5"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="10,5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
              </svg>

              {/* Origin marker */}
              <motion.div
                className="absolute top-[250px] left-[100px] z-10"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="h-5 w-5 rounded-full bg-blue-600 ring-4 ring-blue-200"></div>
              </motion.div>

              {/* Destination marker */}
              <motion.div
                className="absolute top-[150px] left-[350px] z-10"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 2 }}
              >
                <div className="h-5 w-5 rounded-full bg-indigo-600 ring-4 ring-indigo-200"></div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Curved bottom edge */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg
          className="relative block w-full"
          height="60"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.72C59.71,118.55,146.53,111.44,214.34,93.26,275.57,77.19,321.39,69.01,321.39,56.44Z"
            fill="#ffffff"
          ></path>
        </svg>
      </div>
    </section>
  );
};
