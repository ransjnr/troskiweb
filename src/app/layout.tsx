import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/ui/PageTransition";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Troski - Ride-sharing Platform",
  description:
    "Affordable, reliable, and community-focused mobility services across Canada",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        <Providers>
          {/* Background gradient overlay */}
          <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pointer-events-none z-[-1]" />

          {/* Decorative blurred circles */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
            <div className="absolute top-[-10%] right-[-5%] w-[30%] h-[30%] rounded-full bg-blue-300/10 blur-3xl" />
            <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[30%] rounded-full bg-indigo-300/10 blur-3xl" />
            <div className="absolute top-[40%] left-[10%] w-[20%] h-[20%] rounded-full bg-purple-300/10 blur-3xl" />
          </div>

          <Navbar />
          <PageTransition>
            <main className="min-h-screen">{children}</main>
          </PageTransition>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
