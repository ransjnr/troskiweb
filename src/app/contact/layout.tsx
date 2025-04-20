import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Troski",
  description:
    "Get in touch with Troski. We're here to help with all your ridesharing needs and inquiries.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
