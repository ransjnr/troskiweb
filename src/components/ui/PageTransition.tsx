"use client";

import { ReactNode, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const pageRef = useRef<HTMLDivElement>(null);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1],
          },
        }}
        exit={{
          opacity: 0,
          y: -10,
          transition: {
            duration: 0.2,
            ease: [0.22, 1, 0.36, 1],
          },
        }}
        ref={pageRef}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
