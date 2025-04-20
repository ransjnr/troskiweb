"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { PageTransition } from "@/components/ui/PageTransition";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
    >
      <PageTransition>{children}</PageTransition>
    </motion.div>
  );
}
