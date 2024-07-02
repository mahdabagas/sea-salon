import type { Metadata } from "next";
import "../globals.css";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import AuthProvider from "@/providers/AuthProviders";

export const metadata: Metadata = {
  title: "Sea Salon",
  description: "Sea Salon",
};

export default function LandingRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative">
      <AuthProvider>
        <Navbar />
        {children}
        <Footer />
      </AuthProvider>
    </main>
  );
}
