"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { FaCar, FaBox, FaCalendarAlt } from "react-icons/fa";

export const RideOptionsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const rideOptions = [
    {
      title: "Standard Ride",
      description: "Affordable, everyday rides for up to 4 people.",
      bgColor: "bg-gradient-to-r from-blue-500 to-indigo-500",
      price: "Starting at $3.00",
      features: [
        "Up to 4 passengers",
        "Standard vehicles",
        "Most affordable option",
      ],
      color: "from-blue-500/20 to-indigo-500/20",
      accent: "border-blue-500",
      icon: <FaCar className="h-8 w-8 text-blue-500" />,
    },
    {
      title: "Courier Services",
      description: "Same-day item delivery made easy for your packages.",
      bgColor: "bg-gradient-to-r from-teal-500 to-emerald-500",
      price: "Starting at $3.50",
      features: ["Package tracking", "Fast delivery", "Secure handling"],
      color: "from-teal-500/20 to-emerald-500/20",
      accent: "border-teal-500",
      icon: <FaBox className="h-8 w-8 text-teal-500" />,
    },
    {
      title: "Reserve",
      description: "Schedule rides in advance for peace of mind.",
      bgColor: "bg-gradient-to-r from-purple-500 to-pink-500",
      price: "Starting at $4.00",
      features: [
        "Book up to 90 days ahead",
        "Extra wait time",
        "No-rush pickup",
      ],
      color: "from-purple-500/20 to-pink-500/20",
      accent: "border-purple-500",
      icon: <FaCalendarAlt className="h-8 w-8 text-purple-500" />,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, type: "spring", stiffness: 100 },
    },
  };

  return (
    <section ref={sectionRef} className="w-full py-24 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-blue-50 z-[-1]"></div>
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white to-transparent z-[-1]"></div>
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent z-[-1]"></div>
      <div className="absolute top-[20%] right-[10%] w-60 h-60 rounded-full bg-blue-200 opacity-20 blur-3xl z-[-1]"></div>
      <div className="absolute bottom-[30%] left-[5%] w-80 h-80 rounded-full bg-indigo-200 opacity-20 blur-3xl z-[-1]"></div>

      <div className="container mx-auto px-6 lg:px-16">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block mb-2 px-4 py-1 rounded-full bg-blue-100 text-blue-700 font-medium text-sm">
            Our Services
          </span>
          <h2 className="mb-4 text-4xl font-bold text-gray-900 tracking-tight">
            Choose Your Perfect Ride
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            We offer multiple services tailored to your transportation needs
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {rideOptions.map((option, index) => (
            <motion.div key={index} variants={cardVariants}>
              <Card className="h-full overflow-hidden transition-all duration-500 hover:shadow-2xl border border-gray-200 bg-white/80 backdrop-blur-sm hover:-translate-y-2">
                <div className="relative h-56 w-full overflow-hidden">
                  <div
                    className={`absolute inset-0 ${option.bgColor} mix-blend-multiply z-10`}
                  ></div>

                  {/* Decorative pattern */}
                  <div className="absolute inset-0 bg-opacity-10 z-20">
                    <svg
                      className="w-full h-full"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <pattern
                          id={`grid-${index}`}
                          width="20"
                          height="20"
                          patternUnits="userSpaceOnUse"
                        >
                          <path
                            d="M 20 0 L 0 0 0 20"
                            fill="none"
                            stroke="white"
                            strokeWidth="0.5"
                            opacity="0.3"
                          />
                        </pattern>
                      </defs>
                      <rect
                        width="100%"
                        height="100%"
                        fill={`url(#grid-${index})`}
                      />
                    </svg>
                  </div>

                  {/* Price badge */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium z-20 shadow-md">
                    {option.price}
                  </div>

                  {/* Icon badge */}
                  <div className="absolute bottom-4 left-4 bg-white w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-lg z-20">
                    {option.icon}
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-xl font-bold">
                    {option.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {option.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div
                    className={`h-px w-full bg-gradient-to-r ${option.color} my-2`}
                  ></div>
                  <ul className="space-y-3 text-gray-600 mt-4">
                    {option.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center">
                        <div
                          className={`w-2 h-2 rounded-full ${option.accent} mr-3`}
                        ></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter>
                  <Link href="/" className="w-full">
                    <Button
                      variant="primary"
                      size="lg"
                      isFullWidth
                      className={`bg-gradient-to-r ${option.color.replace("/20", "")} text-white hover:shadow-lg transition-all duration-300`}
                    >
                      Select This Ride
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
