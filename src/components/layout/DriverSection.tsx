"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  FaCar,
  FaMoneyBillWave,
  FaRegClock,
  FaStar,
  FaUser,
} from "react-icons/fa";
import { Button } from "@/components/ui/button";

export const DriverSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-gray-900 py-24"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute left-0 top-0 h-full w-1/3 bg-blue-500/30"></div>
        <div className="absolute right-0 top-1/4 h-64 w-64 rounded-full bg-indigo-500/30"></div>
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-purple-500/20"></div>
      </div>

      <div className="container relative mx-auto px-6 lg:px-16">
        <div className="grid items-center gap-16 md:grid-cols-2">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="mb-6 text-4xl font-bold text-white">
              Drive when you want, make what you need
            </h2>

            <p className="mb-8 text-xl text-gray-300">
              Make money on your schedule with deliveries or rides—or both. You
              can use your own car or choose a rental through Troski.
            </p>

            <div className="mb-10 space-y-6">
              <motion.div
                className="flex items-start gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-blue-400">
                  <FaMoneyBillWave size={22} />
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-semibold text-white">
                    Fair Compensation
                  </h3>
                  <p className="text-gray-400">
                    Keep up to 85% of the fare with our driver-focused payment
                    model.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-blue-400">
                  <FaRegClock size={22} />
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-semibold text-white">
                    Flexible Hours
                  </h3>
                  <p className="text-gray-400">
                    Work when you want, as much as you want, with no minimum
                    hours.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-blue-400">
                  <FaCar size={22} />
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-semibold text-white">
                    Vehicle Options
                  </h3>
                  <p className="text-gray-400">
                    Drive your own car or access our rental program for
                    additional earnings.
                  </p>
                </div>
              </motion.div>
            </div>

            <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Link href="/driver/signup">
                <Button
                  variant="primary"
                  size="lg"
                  className="hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
                >
                  Get Started
                </Button>
              </Link>
              <Link href="/driver/requirements">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-white border-white hover:bg-blue-100"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Right content - Gradient background instead of Image */}
          <motion.div
            className="relative mx-auto h-[500px] w-full max-w-md overflow-hidden rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* Decorative pattern */}
            <div className="absolute inset-0 opacity-20">
              <svg width="100%" height="100%">
                <pattern
                  id="grid"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 20 0 L 0 0 0 20"
                    fill="none"
                    stroke="white"
                    strokeWidth="0.5"
                  />
                </pattern>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            {/* Floating earnings card */}
            <motion.div
              className="absolute right-4 top-10 rounded-xl bg-white p-4 shadow-xl"
              initial={{ opacity: 0, y: -20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <p className="font-medium text-gray-900">
                Average Weekly Earnings
              </p>
              <p className="text-2xl font-bold text-blue-600">$850 - $1,200</p>
              <p className="text-sm text-gray-500">Based on 30-40 hours/week</p>
            </motion.div>

            {/* Floating rating card */}
            <motion.div
              className="absolute bottom-10 left-4 rounded-xl bg-white p-4 shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <div className="flex items-center">
                <div className="mr-3 h-12 w-12 overflow-hidden rounded-full bg-gray-200 flex items-center justify-center">
                  <FaUser className="h-6 w-6 text-gray-500" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    Driver Satisfaction
                  </p>
                  <div className="flex items-center">
                    <div className="flex text-amber-400">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                    </div>
                    <span className="ml-1 text-gray-600">4.9/5</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
