"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  FaBuilding,
  FaGlobe,
  FaFileInvoiceDollar,
  FaChartLine,
} from "react-icons/fa";
import { Button } from "@/components/ui/button";

export const BusinessSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="w-full bg-gradient-to-br from-indigo-50 to-blue-100 py-24"
    >
      <div className="container mx-auto px-6 lg:px-16">
        <div className="grid gap-16 md:grid-cols-2 md:items-center">
          {/* Left content - Styled div instead of Image */}
          <motion.div
            className="relative rounded-xl bg-white p-6 shadow-xl"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative h-[400px] w-full overflow-hidden rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600">
              {/* Business illustration replacement */}
              <div className="absolute inset-0 flex items-center justify-center">
                <FaChartLine className="h-24 w-24 text-white/30" />
              </div>

              {/* Decorative elements */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-1/4 right-1/4 h-32 w-32 rounded-full bg-white"></div>
                <div className="absolute bottom-1/4 left-1/4 h-40 w-40 rounded-full bg-white"></div>
              </div>
            </div>

            {/* Overlapping features */}
            <div className="absolute -right-6 -top-6 rounded-xl bg-blue-600 p-5 text-white shadow-lg md:-right-10 md:-top-10">
              <h4 className="mb-3 text-lg font-semibold">Business Benefits</h4>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-5 w-5 text-blue-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Centralized billing
                </li>
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-5 w-5 text-blue-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Travel policy control
                </li>
                <li className="flex items-center">
                  <svg
                    className="mr-2 h-5 w-5 text-blue-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Duty of care
                </li>
              </ul>
            </div>

            {/* Bottom overlapping card */}
            <div className="absolute -bottom-6 -left-6 rounded-xl bg-white p-4 shadow-xl md:-bottom-10 md:-left-10">
              <div className="flex items-center">
                <div className="mr-4 rounded-full bg-blue-100 p-3 text-blue-600">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Businesses save an average of
                  </p>
                  <p className="text-xl font-bold text-gray-900">
                    $15,000/year
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right content - Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="mb-6 text-4xl font-bold text-gray-900">
              The Uber you know, reimagined for business
            </h2>

            <p className="mb-8 text-xl text-gray-600">
              Troski for Business is a platform for managing global rides and
              meals, and local deliveries, for companies of any size.
            </p>

            <div className="mb-10 space-y-6">
              <motion.div
                className="flex gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                  <FaBuilding size={24} />
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">
                    Corporate Accounts
                  </h3>
                  <p className="text-gray-600">
                    Set up and manage accounts for your entire company with
                    custom permissions and approval flows.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                  <FaGlobe size={24} />
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">
                    Global Coverage
                  </h3>
                  <p className="text-gray-600">
                    Provide a consistent transportation experience for your team
                    across multiple cities and countries.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                  <FaFileInvoiceDollar size={24} />
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">
                    Simplified Billing
                  </h3>
                  <p className="text-gray-600">
                    Single monthly invoice for all trips, with detailed
                    reporting and expense management tools.
                  </p>
                </div>
              </motion.div>
            </div>

            <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Link href="/business" className="inline-flex">
                <Button
                  variant="primary"
                  size="lg"
                  className="hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                >
                  Sign Up Your Business
                </Button>
              </Link>
              <Link href="/business/demo" className="inline-flex">
                <Button variant="outline" size="lg">
                  Request a Demo
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
