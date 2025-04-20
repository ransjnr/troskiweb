"use client";

import { ReactNode } from "react";
import { PageTransition } from "@/components/ui/PageTransition";

export default function SettingsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <PageTransition>{children}</PageTransition>
    </>
  );
}
