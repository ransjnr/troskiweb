"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaClock, FaCalendarAlt, FaCheckCircle } from "react-icons/fa";
import { Button } from "@/components/ui/button";

export const ReserveSection = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const benefits = [
    {
      icon: <FaCalendarAlt className="h-5 w-5" />,
      title: "Choose your exact pickup time",
      description: "Book up to 90 days in advance for peace of mind.",
    },
    {
      icon: <FaClock className="h-5 w-5" />,
      title: "Extra wait time included",
      description: "We'll wait a bit longer to ensure you meet your ride.",
    },
    {
      icon: <FaCheckCircle className="h-5 w-5" />,
      title: "Cancel at no charge",
      description: "Free cancellation up to 60 minutes before your pickup.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="w-full bg-gradient-to-br from-blue-50 to-indigo-100 py-24"
    >
      <div className="container mx-auto px-6 lg:px-16">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Left side - Reserve form */}
          <motion.div
            className="rounded-2xl bg-white p-8 shadow-xl"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="mb-6 text-3xl font-bold text-gray-900">
              Get your ride right with{" "}
              <span className="text-blue-600">Troski Reserve</span>
            </h2>

            <p className="mb-8 text-gray-600">
              Book a ride in advance to ensure you're always on time for
              important events, meetings, or travel.
            </p>

            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Choose date
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <FaCalendarAlt className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 p-3 pl-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  placeholder="Select a date"
                  title="Select a date for your ride"
                />
              </div>
            </div>

            <div className="mb-8">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Choose time
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <FaClock className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 p-3 pl-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  title="Select a time for your ride"
                >
                  <option value="">Select time</option>
                  <option value="morning">Morning (8AM - 12PM)</option>
                  <option value="afternoon">Afternoon (12PM - 5PM)</option>
                  <option value="evening">Evening (5PM - 10PM)</option>
                </select>
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              isFullWidth
              className="group rounded-xl transition-all duration-300 hover:-translate-y-1"
            >
              Next
            </Button>
          </motion.div>

          {/* Right side - Benefits */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="mb-8 text-2xl font-semibold text-gray-900">
              Benefits
            </h3>

            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <div className="mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    {benefit.icon}
                  </div>
                  <div>
                    <h4 className="mb-1 text-lg font-medium text-gray-900">
                      {benefit.title}
                    </h4>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-10 rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-700"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <p className="flex items-center">
                <FaCheckCircle className="mr-2 h-4 w-4" />
                <span>
                  See our{" "}
                  <a href="#" className="font-medium underline">
                    terms
                  </a>{" "}
                  for cancellation and other policies.
                </span>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
