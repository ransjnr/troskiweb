"use client";

import { HeroSection } from "@/components/layout/HeroSection";
import { FeatureSection } from "@/components/layout/FeatureSection";
import { RideOptionsSection } from "@/components/layout/RideOptionsSection";
import { ReserveSection } from "@/components/layout/ReserveSection";
import { DriverSection } from "@/components/layout/DriverSection";
import { BusinessSection } from "@/components/layout/BusinessSection";
import { DownloadAppSection } from "@/components/layout/DownloadAppSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeatureSection />

      {/* Ride Options Section */}
      <RideOptionsSection />

      {/* Reserve Section */}
      <ReserveSection />

      {/* Driver Section */}
      <DriverSection />

      {/* Business Section */}
      <BusinessSection />

      {/* Download App Section */}
      <DownloadAppSection />
    </main>
  );
}
