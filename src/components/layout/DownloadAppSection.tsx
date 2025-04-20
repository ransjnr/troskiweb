"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  FaApple,
  FaGooglePlay,
  FaQrcode,
  FaMobile,
  FaCar,
} from "react-icons/fa";

export const DownloadAppSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="w-full bg-gray-100 py-24">
      <div className="container mx-auto px-6 lg:px-16">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="mb-4 text-4xl font-bold text-gray-900">
            It's easier in the apps
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            Download our mobile apps for the best experience on-the-go
          </p>
        </motion.div>

        <div className="flex flex-col items-center justify-between gap-16 md:flex-row">
          {/* Rider App */}
          <motion.div
            className="flex w-full max-w-md flex-col items-center rounded-2xl bg-white p-8 shadow-xl transition-all duration-300 hover:shadow-2xl md:w-1/2"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative mb-6 h-64 w-64 flex items-center justify-center bg-gray-100 rounded-lg">
              <div className="p-4 bg-white rounded-lg shadow-lg">
                <FaQrcode className="h-12 w-12 text-blue-600" />
                <div className="mt-2 text-center text-xs text-gray-500">
                  QR code for rider app
                </div>
              </div>
            </div>
            <h3 className="mb-2 text-2xl font-bold text-gray-900">
              Download the Troski app
            </h3>
            <p className="mb-6 text-center text-gray-600">
              Scan to download our rider app for iOS and Android
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="flex items-center justify-center rounded-lg bg-black px-4 py-3 text-white transition-colors hover:bg-gray-800"
              >
                <FaApple className="mr-2 h-6 w-6" />
                <div>
                  <div className="text-xs">Download on the</div>
                  <div className="text-sm font-semibold">App Store</div>
                </div>
              </a>
              <a
                href="#"
                className="flex items-center justify-center rounded-lg bg-black px-4 py-3 text-white transition-colors hover:bg-gray-800"
              >
                <FaGooglePlay className="mr-2 h-6 w-6" />
                <div>
                  <div className="text-xs">Get it on</div>
                  <div className="text-sm font-semibold">Google Play</div>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Driver App */}
          <motion.div
            className="flex w-full max-w-md flex-col items-center rounded-2xl bg-white p-8 shadow-xl transition-all duration-300 hover:shadow-2xl md:w-1/2"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative mb-6 h-64 w-64 flex items-center justify-center bg-gray-100 rounded-lg">
              <div className="p-4 bg-white rounded-lg shadow-lg">
                <FaQrcode className="h-12 w-12 text-blue-600" />
                <div className="mt-2 text-center text-xs text-gray-500">
                  QR code for driver app
                </div>
              </div>
            </div>
            <h3 className="mb-2 text-2xl font-bold text-gray-900">
              Download the Driver app
            </h3>
            <p className="mb-6 text-center text-gray-600">
              Scan to download our driver app for iOS and Android
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="flex items-center justify-center rounded-lg bg-blue-600 px-4 py-3 text-white transition-colors hover:bg-blue-700"
              >
                <FaApple className="mr-2 h-6 w-6" />
                <div>
                  <div className="text-xs">Download on the</div>
                  <div className="text-sm font-semibold">App Store</div>
                </div>
              </a>
              <a
                href="#"
                className="flex items-center justify-center rounded-lg bg-blue-600 px-4 py-3 text-white transition-colors hover:bg-blue-700"
              >
                <FaGooglePlay className="mr-2 h-6 w-6" />
                <div>
                  <div className="text-xs">Get it on</div>
                  <div className="text-sm font-semibold">Google Play</div>
                </div>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Phone Mockups */}
        <motion.div
          className="mt-20 flex justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <div className="relative h-[500px] w-full max-w-4xl">
            {/* Left Phone */}
            <motion.div
              className="absolute left-0 top-0 z-10 h-[500px] w-[250px] md:left-[20%]"
              initial={{ rotate: -10, x: -50 }}
              animate={
                isInView ? { rotate: -10, x: 0 } : { rotate: -10, x: -50 }
              }
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              <div className="relative h-full w-full overflow-hidden rounded-3xl bg-gradient-to-br from-blue-400 to-indigo-600 shadow-2xl p-4">
                <div className="absolute inset-x-0 top-0 h-6 bg-black rounded-t-3xl"></div>
                <div className="absolute left-1/2 top-3 h-2 w-16 -translate-x-1/2 rounded-full bg-gray-800"></div>
                <div className="mt-8 h-full rounded-3xl bg-white/10 p-4 backdrop-blur-sm">
                  <div className="mb-4 h-12 w-12 rounded-full bg-white/20"></div>
                  <div className="mb-2 h-8 w-3/4 rounded-full bg-white/20"></div>
                  <div className="mb-6 h-4 w-1/2 rounded-full bg-white/20"></div>

                  <div className="mb-4 h-32 w-full rounded-xl bg-white/30"></div>

                  <div className="mb-3 h-6 w-full rounded-full bg-white/20"></div>
                  <div className="mb-3 h-6 w-full rounded-full bg-white/20"></div>
                  <div className="mb-6 h-6 w-3/4 rounded-full bg-white/20"></div>

                  <div className="absolute bottom-8 left-0 right-0 flex justify-center">
                    <FaMobile className="h-8 w-8 text-white/40" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Phone */}
            <motion.div
              className="absolute right-0 top-0 h-[500px] w-[250px] md:right-[20%]"
              initial={{ rotate: 10, x: 50 }}
              animate={isInView ? { rotate: 10, x: 0 } : { rotate: 10, x: 50 }}
              transition={{ duration: 0.7, delay: 0.8 }}
            >
              <div className="relative h-full w-full overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 to-blue-800 shadow-2xl p-4">
                <div className="absolute inset-x-0 top-0 h-6 bg-black rounded-t-3xl"></div>
                <div className="absolute left-1/2 top-3 h-2 w-16 -translate-x-1/2 rounded-full bg-gray-800"></div>
                <div className="mt-8 h-full rounded-3xl bg-white/10 p-4 backdrop-blur-sm">
                  <div className="mb-4 h-12 w-12 rounded-full bg-white/20"></div>
                  <div className="mb-2 h-8 w-3/4 rounded-full bg-white/20"></div>
                  <div className="mb-6 h-4 w-1/2 rounded-full bg-white/20"></div>

                  <div className="mb-4 h-32 w-full rounded-xl bg-white/30"></div>

                  <div className="mb-3 h-6 w-full rounded-full bg-white/20"></div>
                  <div className="mb-3 h-6 w-full rounded-full bg-white/20"></div>
                  <div className="mb-6 h-6 w-3/4 rounded-full bg-white/20"></div>

                  <div className="absolute bottom-8 left-0 right-0 flex justify-center">
                    <FaCar className="h-8 w-8 text-white/40" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
