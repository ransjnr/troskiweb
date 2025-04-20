"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FaGlobe } from "react-icons/fa";

// Check if we're running in the browser
const isBrowser = typeof window !== "undefined";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [language, setLanguage] = useState<"en" | "fr">("en");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!isBrowser) return;

    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  useEffect(() => {
    // Close mobile menu when navigating
    setIsMenuOpen(false);
  }, [pathname]);

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "fr" : "en");
  };

  const navLinks = [
    { name: language === "en" ? "Home" : "Accueil", href: "/" },
    {
      name: language === "en" ? "How It Works" : "Comment ça marche",
      href: "/how-it-works",
    },
    { name: language === "en" ? "Pricing" : "Tarifs", href: "/pricing" },
    {
      name: language === "en" ? "For Business" : "Pour entreprises",
      href: "/business",
    },
    {
      name: language === "en" ? "Drive With Us" : "Conduire avec nous",
      href: "/driver",
    },
  ];

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          scrolled ? "bg-white backdrop-blur-sm shadow-lg" : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto flex h-20 items-center justify-between px-6 lg:px-16">
          {/* Logo */}
          <Link href="/" className="flex items-center z-20">
            <motion.div
              className="flex items-center"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="relative h-10 w-10 mr-2 rounded-full overflow-hidden bg-blue-600 flex items-center justify-center">
                <span className="text-white font-serif text-lg font-bold">
                  T
                </span>
              </div>
              <span
                className={`text-2xl font-serif font-bold tracking-tight ${
                  scrolled ? "text-blue-600" : "text-blue-600"
                }`}
              >
                Troski
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center space-x-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`relative px-3 py-2 text-sm font-medium transition-colors rounded-full hover:bg-blue-50 ${
                  pathname === link.href
                    ? "text-blue-600"
                    : scrolled
                      ? "text-gray-700 hover:text-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                }`}
              >
                {link.name}
                {pathname === link.href && (
                  <motion.span
                    className="absolute bottom-0 left-0 h-0.5 w-full bg-blue-600"
                    layoutId="navbar-indicator"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Auth buttons & Language toggle */}
          <div className="hidden items-center space-x-4 md:flex">
            <button
              onClick={toggleLanguage}
              className="flex items-center justify-center text-gray-700 hover:text-blue-600 transition-colors"
              aria-label={
                language === "en" ? "Switch to French" : "Switch to English"
              }
            >
              <FaGlobe className="mr-1 h-4 w-4" />
              <span className="text-sm font-medium">
                {language === "en" ? "FR" : "EN"}
              </span>
            </button>

            <div className="h-6 w-px bg-gray-300"></div>

            <Link href="/signin">
              <Button variant="ghost" size="sm" className="rounded-full px-4">
                {language === "en" ? "Sign In" : "Connexion"}
              </Button>
            </Link>
            <Link href="/signup">
              <Button
                variant="primary"
                size="sm"
                className="rounded-full px-4 shadow-md hover:shadow-lg transition-all"
              >
                {language === "en" ? "Sign Up" : "S'inscrire"}
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="rounded-full p-2 text-gray-700 hover:bg-blue-50 z-20 transition-colors md:hidden"
            aria-label="Toggle mobile menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="relative w-6 h-5">
              <span
                className={`absolute block h-0.5 w-full bg-current transform transition-all duration-300 ${
                  isMenuOpen ? "rotate-45 top-2" : "top-0"
                }`}
              ></span>
              <span
                className={`absolute block h-0.5 w-full bg-current top-2 transition-opacity duration-300 ${
                  isMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              ></span>
              <span
                className={`absolute block h-0.5 w-full bg-current transform transition-all duration-300 ${
                  isMenuOpen ? "-rotate-45 top-2" : "top-4"
                }`}
              ></span>
            </div>
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <motion.div
        className={`fixed inset-0 z-40 bg-white pt-20 md:hidden transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        initial={false}
      >
        <div className="flex flex-col h-full p-6">
          <nav className="space-y-4 mb-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`block px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                  pathname === link.href
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="mt-auto space-y-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center px-4 py-3 w-full text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label={
                language === "en" ? "Switch to French" : "Switch to English"
              }
            >
              <FaGlobe className="mr-3 h-5 w-5" />
              <span>{language === "en" ? "Français" : "English"}</span>
            </button>

            <div className="border-t border-gray-200 pt-4"></div>

            <Link href="/signin" className="block w-full">
              <Button
                variant="outline"
                size="lg"
                isFullWidth
                className="justify-center rounded-xl"
              >
                {language === "en" ? "Sign In" : "Connexion"}
              </Button>
            </Link>

            <Link href="/signup" className="block w-full">
              <Button
                variant="primary"
                size="lg"
                isFullWidth
                className="justify-center rounded-xl"
              >
                {language === "en" ? "Sign Up" : "S'inscrire"}
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </>
  );
};
