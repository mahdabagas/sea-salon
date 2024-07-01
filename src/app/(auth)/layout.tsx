import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import LogoTextSea from "@/components/atoms/LogoTextSea";
const poppins = Poppins({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} relative overflow-x-hidden`}>
        <main className="lg:grid lg:grid-cols-2 h-screen">
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
        </main>
      </body>
    </html>
  );
}
