import type { Metadata } from "next";
import "../../globals.css";
import Sidebar from "@/components/layouts/Sidebar";
import DashboardNavbar from "@/components/layouts/DashboardNavbar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/authOptions";
import AuthProvider from "@/providers/AuthProviders";

export const metadata: Metadata = {
  title: "Dashboard - Sea Salon",
  description: "Dashboard - Sea Salon",
};

export default async function DashboardRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  if (session?.user?.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <main className="flex bg-secondary-sea text-primary-sea">
      <AuthProvider>
        <div className="w-[18%]">
          <Sidebar />
        </div>
        <div className="col-span-3 overflow-auto lg:col-span-5 lg:border-l w-[82%]">
          <div className="px-6 py-6 lg:px-8">
            <DashboardNavbar />
            <div className="pt-6">{children}</div>
          </div>
        </div>
      </AuthProvider>
    </main>
  );
}
