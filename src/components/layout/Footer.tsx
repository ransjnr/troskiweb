"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaLocationArrow,
  FaPhoneAlt,
  FaEnvelope,
  FaApple,
  FaGooglePlay,
  FaShieldAlt,
  FaMoneyBillWave,
  FaRegClock,
  FaMapMarkedAlt,
  FaLanguage,
} from "react-icons/fa";

export const Footer = () => {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, margin: "-100px" });

  const canadianCities = [
    { label: "Toronto", href: "/cities/toronto" },
    { label: "Montreal", href: "/cities/montreal" },
    { label: "Vancouver", href: "/cities/vancouver" },
    { label: "Calgary", href: "/cities/calgary" },
    { label: "Ottawa", href: "/cities/ottawa" },
    { label: "Edmonton", href: "/cities/edmonton" },
    { label: "Winnipeg", href: "/cities/winnipeg" },
    { label: "Halifax", href: "/cities/halifax" },
  ];

  const companyLinks = [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Community Impact", href: "/community" },
    { label: "Press", href: "/press" },
    { label: "Blog", href: "/blog" },
  ];

  const riderLinks = [
    { label: "How it Works", href: "/how-it-works" },
    { label: "Fare Estimator", href: "/estimator" },
    { label: "Loyalty Program", href: "/loyalty" },
    { label: "Group Rides", href: "/group-rides" },
    { label: "Safety Features", href: "/safety/rider" },
  ];

  const driverLinks = [
    { label: "Become a Driver", href: "/driver" },
    { label: "Driver Requirements", href: "/driver/requirements" },
    { label: "Earnings Calculator", href: "/driver/earnings" },
    { label: "Driver Safety", href: "/safety/driver" },
    { label: "Flexible Schedule", href: "/driver/flexibility" },
  ];

  const resourceLinks = [
    { label: "Help Center", href: "/help" },
    { label: "Support", href: "/support" },
    { label: "Accessibility", href: "/accessibility" },
    { label: "COVID-19 Safety", href: "/covid-safety" },
    { label: "Contact Us", href: "/contact" },
  ];

  const socialLinks = [
    {
      icon: <FaFacebookF size={18} />,
      href: "https://facebook.com",
      label: "Facebook",
    },
    {
      icon: <FaTwitter size={18} />,
      href: "https://twitter.com",
      label: "Twitter",
    },
    {
      icon: <FaInstagram size={18} />,
      href: "https://instagram.com",
      label: "Instagram",
    },
    {
      icon: <FaLinkedinIn size={18} />,
      href: "https://linkedin.com",
      label: "LinkedIn",
    },
    {
      icon: <FaYoutube size={18} />,
      href: "https://youtube.com",
      label: "YouTube",
    },
  ];

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const driverBenefits = [
    {
      icon: <FaMoneyBillWave className="text-green-400" />,
      text: "Keep up to 85% of fare",
    },
    { icon: <FaRegClock className="text-blue-400" />, text: "Flexible hours" },
    {
      icon: <FaShieldAlt className="text-indigo-400" />,
      text: "Safety features",
    },
  ];

  return (
    <footer ref={footerRef} className="w-full bg-gray-900 pt-16 text-gray-300">
      {/* Main Upper Content */}
      <div className="container mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-7">
          {/* Logo & About */}
          <motion.div
            className="lg:col-span-2"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInUpVariants}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6 flex items-center">
              <div className="mr-4 h-10 w-10 overflow-hidden rounded-full bg-blue-600 flex items-center justify-center">
                <span className="font-serif text-xl font-bold text-white">
                  T
                </span>
              </div>
              <h2 className="font-serif text-2xl font-bold text-white">
                Troski
              </h2>
            </div>

            <p className="mb-6 text-gray-400 leading-relaxed">
              Troski is a proudly Canadian ride-sharing platform inspired by the
              Ghanaian term for shared transportation. Our mission is to empower
              drivers, provide transparent pricing, and build community-focused
              mobility services across Canada.
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-start">
                <FaLocationArrow className="mr-3 mt-1 text-blue-500" />
                <p>123 Maple Avenue, Toronto, ON M5V 2T6, Canada</p>
              </div>
              <div className="flex items-center">
                <FaPhoneAlt className="mr-3 text-blue-500" />
                <p>+1 (416) 555-1234</p>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="mr-3 text-blue-500" />
                <p>contact@troski.ca</p>
              </div>
            </div>

            {/* Download app buttons */}
            <div className="mt-6 space-y-3">
              <p className="font-medium text-white mb-2">Download our app</p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="#"
                  className="flex items-center rounded-lg bg-gray-800 px-4 py-2 transition-colors hover:bg-gray-700"
                  aria-label="Download on the App Store"
                >
                  <FaApple className="mr-2 h-5 w-5" />
                  <div>
                    <div className="text-xs">Download on the</div>
                    <div className="text-sm font-medium">App Store</div>
                  </div>
                </a>
                <a
                  href="#"
                  className="flex items-center rounded-lg bg-gray-800 px-4 py-2 transition-colors hover:bg-gray-700"
                  aria-label="Get it on Google Play"
                >
                  <FaGooglePlay className="mr-2 h-5 w-5" />
                  <div>
                    <div className="text-xs">Get it on</div>
                    <div className="text-sm font-medium">Google Play</div>
                  </div>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Canadian Cities */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInUpVariants}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <h3 className="mb-6 text-lg font-semibold text-white">
              Canadian Cities
            </h3>
            <ul className="space-y-2">
              {canadianCities.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-blue-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/cities"
                  className="mt-2 inline-block text-blue-400 hover:underline"
                >
                  See all cities →
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInUpVariants}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <h3 className="mb-6 text-lg font-semibold text-white">Company</h3>
            <ul className="space-y-2">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-blue-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Rider Links */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInUpVariants}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-1"
          >
            <h3 className="mb-6 text-lg font-semibold text-white">
              For Riders
            </h3>
            <ul className="space-y-2">
              {riderLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-blue-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Driver Links */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInUpVariants}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-1"
          >
            <h3 className="mb-6 text-lg font-semibold text-white">
              For Drivers
            </h3>
            <ul className="space-y-2">
              {driverLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-blue-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInUpVariants}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="lg:col-span-1"
          >
            <h3 className="mb-6 text-lg font-semibold text-white">Resources</h3>
            <ul className="space-y-2">
              {resourceLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-blue-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Driver Benefits Highlight */}
        <motion.div
          className="mt-16 rounded-2xl bg-gray-800/50 p-6 backdrop-blur-sm"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUpVariants}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-white mb-2">
              Why Drive with Troski?
            </h3>
            <p className="text-gray-400">
              Join thousands of drivers across Canada earning on their own terms
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {driverBenefits.map((benefit, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-4 rounded-xl bg-gray-800/60"
              >
                <div className="mb-3 text-2xl">{benefit.icon}</div>
                <p className="font-medium text-white">{benefit.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Link href="/driver">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                Become a Driver
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Company Features and Languages */}
        <motion.div
          className="mt-12 rounded-2xl bg-gray-800/30 p-6"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUpVariants}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            <div className="flex items-center">
              <FaShieldAlt className="mr-3 text-2xl text-green-400" />
              <div>
                <h4 className="font-medium text-white">No Surge Pricing</h4>
                <p className="text-sm text-gray-400">
                  Transparent fares always
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <FaMapMarkedAlt className="mr-3 text-2xl text-blue-400" />
              <div>
                <h4 className="font-medium text-white">Nationwide Service</h4>
                <p className="text-sm text-gray-400">Available across Canada</p>
              </div>
            </div>

            <div className="flex items-center">
              <FaLanguage className="mr-3 text-2xl text-indigo-400" />
              <div>
                <h4 className="font-medium text-white">Bilingual Support</h4>
                <p className="text-sm text-gray-400">
                  English & French service
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <FaMoneyBillWave className="mr-3 text-2xl text-amber-400" />
              <div>
                <h4 className="font-medium text-white">Driver Empowerment</h4>
                <p className="text-sm text-gray-400">Up to 85% commission</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Social Media and App Download */}
        <motion.div
          className="mt-12 border-t border-gray-800 py-8"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUpVariants}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  aria-label={link.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-gray-400 transition-colors hover:bg-blue-600 hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.icon}
                </a>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="#"
                className="flex items-center rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 transition-colors hover:border-gray-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                </svg>
                <span>Get Notified</span>
              </a>

              <a
                href="#"
                className="flex items-center rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 transition-colors hover:border-gray-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Print Your Receipt</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Copyright and Language Selector */}
        <motion.div
          className="border-t border-gray-800 py-8"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUpVariants}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div className="flex flex-wrap gap-4">
              <p>© 2023 Troski Inc. All rights reserved.</p>
              <Link
                href="/privacy"
                className="transition-colors hover:text-blue-400"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="transition-colors hover:text-blue-400"
              >
                Terms of Service
              </Link>
              <Link
                href="/accessibility"
                className="transition-colors hover:text-blue-400"
              >
                Accessibility
              </Link>
            </div>

            <div className="flex items-center space-x-3">
              <select
                className="rounded-md bg-gray-800 px-3 py-1.5 text-sm text-gray-300 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                defaultValue="en"
                aria-label="Select language"
                id="language-selector"
              >
                <option value="en">English (CA)</option>
                <option value="fr">Français (CA)</option>
              </select>

              <div className="flex items-center rounded-md bg-gray-800 px-3 py-1.5 text-sm">
                <span className="mr-2">CAD</span>
                <span>$</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
