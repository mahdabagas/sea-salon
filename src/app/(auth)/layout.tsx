import type { Metadata } from "next";
import "../globals.css";
import LogoTextSea from "@/components/atoms/LogoTextSea";

export const metadata: Metadata = {
  title: "Login - Sea Salon",
  description: "Login - Sea Salon",
};

export default function AuthRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative overflow-x-hidden">
      <div className="lg:grid lg:grid-cols-2 h-screen">
        <div className="hidden lg:block relative bg-primary-sea">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <LogoTextSea className="text-secondary-sea text-[9rem]" />
              <h2 className="absolute right-0 bottom-4 text-secondary-sea text-2xl">
                Salon
              </h2>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center h-full w-full bg-secondary-sea">
          {children}
        </div>
      </div>
    </main>
  );
}
