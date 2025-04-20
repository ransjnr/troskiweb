"use client";

import { ConvexProvider } from "convex/react";
import { ConvexReactClient } from "convex/react";
import { ReactNode } from "react";
import { ToastProvider } from "@/context/ToastContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "react-hot-toast";

// Create a Convex client using the URL from environment variables
const convex = new ConvexReactClient(
  process.env.NEXT_PUBLIC_CONVEX_URL || "https://acoustic-vole-745.convex.cloud"
);

// Create a Providers component to properly handle all providers
export function Providers({ children }: { children: ReactNode }) {
  return (
    <ConvexProvider client={convex}>
      <ToastProvider>
        <AuthProvider>
          {children}
          <Toaster position="top-center" />
        </AuthProvider>
      </ToastProvider>
    </ConvexProvider>
  );
}
