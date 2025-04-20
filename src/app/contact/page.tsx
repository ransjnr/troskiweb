"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaLocationArrow,
  FaPhoneAlt,
  FaEnvelope,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { toast } from "react-hot-toast";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    userType: "rider", // default value
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    try {
      // In a real application, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("Your message has been sent successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        userType: "rider",
      });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
      console.error("Error sending contact form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions about Troski? We're here to help and would love to
            hear from you!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-8 lg:col-span-1"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Get in Touch
            </h2>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <FaLocationArrow className="text-blue-600" size={20} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Office Address</h3>
                  <p className="text-gray-600 mt-1">
                    123 Maple Avenue, Toronto, ON M5V 2T6, Canada
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <FaPhoneAlt className="text-blue-600" size={20} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Phone Number</h3>
                  <p className="text-gray-600 mt-1">+1 (416) 555-1234</p>
                  <p className="text-gray-500 text-sm mt-1">
                    Monday-Friday: 8am-7pm EST
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <FaEnvelope className="text-blue-600" size={20} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Email Address</h3>
                  <p className="text-gray-600 mt-1">contact@troski.ca</p>
                  <p className="text-gray-500 text-sm mt-1">
                    We'll respond within 24 hours
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="font-medium text-gray-900 mb-4">
                Connect With Us
              </h3>
              <div className="flex space-x-3">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    aria-label={link.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-blue-600 hover:text-white"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Office Hours */}
            <div className="mt-10">
              <h3 className="font-medium text-gray-900 mb-4">Office Hours</h3>
              <div className="space-y-2 text-gray-600">
                <p className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span>9:00 AM - 6:00 PM</span>
                </p>
                <p className="flex justify-between">
                  <span>Saturday:</span>
                  <span>10:00 AM - 4:00 PM</span>
                </p>
                <p className="flex justify-between">
                  <span>Sunday:</span>
                  <span>Closed</span>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-8 lg:col-span-2"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Send Us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="(123) 456-7890"
                  />
                </div>

                <div>
                  <label
                    htmlFor="userType"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    I am a
                  </label>
                  <select
                    id="userType"
                    name="userType"
                    value={formData.userType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  >
                    <option value="rider">Rider</option>
                    <option value="driver">Driver</option>
                    <option value="business">Business</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="How can we help you?"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Please describe your inquiry in detail..."
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium transition-colors ${
                    isSubmitting
                      ? "bg-blue-400 cursor-not-allowed"
                      : "hover:bg-blue-700"
                  }`}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg p-6 overflow-hidden"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Our Location
          </h2>

          <div className="w-full h-[400px] bg-gray-200 rounded-xl overflow-hidden relative">
            {/* In a real app, this would be a Google Maps or Mapbox integration */}
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-gray-500">
                Map integration would appear here.
                <br />
                123 Maple Avenue, Toronto, ON M5V 2T6, Canada
              </p>
            </div>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                How do I become a Troski driver?
              </h3>
              <p className="text-gray-600">
                To become a Troski driver, you need to sign up on our platform,
                submit required documentation including a valid driver's
                license, proof of insurance, and vehicle registration. After a
                background check, you'll receive training materials before you
                can start accepting rides.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                How is Troski different from other ride-sharing services?
              </h3>
              <p className="text-gray-600">
                Troski offers transparent pricing with no surge charges,
                provides drivers with up to 85% of the fare, and builds
                community through its loyalty program. We're proudly Canadian
                and focus on driver empowerment and rider satisfaction.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                How do I report an issue with my ride?
              </h3>
              <p className="text-gray-600">
                You can report issues through the app's "Help" section, by
                emailing support@troski.ca, or by contacting our customer
                service team at +1 (416) 555-1234. We aim to resolve all issues
                within 24 hours.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Is Troski available in my city?
              </h3>
              <p className="text-gray-600">
                Troski is currently available in major Canadian cities including
                Toronto, Montreal, Vancouver, Calgary, Ottawa, Edmonton,
                Winnipeg, and Halifax, with plans to expand to more locations
                soon.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
