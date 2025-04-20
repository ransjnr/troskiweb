"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaMoneyBillWave, FaHandsHelping, FaLanguage } from "react-icons/fa";

interface FeatureCardProps {
  icon: JSX.Element;
  title: string;
  description: string;
  index: number;
}

const FeatureCard = ({ icon, title, description, index }: FeatureCardProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className="flex flex-col rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all hover:shadow-xl"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      whileHover={{ scale: 1.03 }}
    >
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600">
        {icon}
      </div>
      <h3 className="mb-3 text-xl font-bold text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

export const FeatureSection = () => {
  const headingRef = useRef(null);
  const isHeadingInView = useInView(headingRef, {
    once: true,
    margin: "-100px",
  });

  const features = [
    {
      icon: <FaMoneyBillWave size={28} />,
      title: "Transparent Pricing",
      description:
        "No surge pricing. Always know what you'll pay before you ride with our upfront, fair pricing model.",
    },
    {
      icon: <FaHandsHelping size={28} />,
      title: "Driver Empowerment",
      description:
        "Fair compensation with up to 85% of fare going directly to drivers, building a sustainable community.",
    },
    {
      icon: <FaLanguage size={28} />,
      title: "Bilingual Support",
      description:
        "Full customer support in both English and French across Canada, making travel accessible for everyone.",
    },
  ];

  return (
    <section className="w-full bg-white py-24">
      <div className="container mx-auto px-6 lg:px-16">
        <motion.div
          ref={headingRef}
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={
            isHeadingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
          }
          transition={{ duration: 0.7 }}
        >
          <h2 className="mb-4 text-4xl font-bold text-gray-900">
            Why Choose Troski?
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            We're redefining ride-sharing with community values, fairness, and
            transparency at our core.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
