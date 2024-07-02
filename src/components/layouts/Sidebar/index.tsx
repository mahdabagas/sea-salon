"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { HiOutlineBuildingStorefront } from "react-icons/hi2";
import { MdOutlineRateReview } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";

interface SidebarProps {}

const Sidebar: FC<SidebarProps> = ({}) => {
  const router = useRouter();
  return (
    <div className="pb-12 min-h-screen border-r border-primary-sea/25">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold">Dashboard</h2>
          <div className="space-y-3">
            <Button
              variant={"ghost"}
              className="w-full justify-start rounded-none hover:text-primary-sea hover:bg-primary-sea/25"
              onClick={() => router.push("/dashboard/branch-store")}
            >
              <HiOutlineBuildingStorefront className="mr-2" size={20} />
              Branch Store
            </Button>
            <Button
              variant={"ghost"}
              className="w-full justify-start rounded-none hover:text-primary-sea hover:bg-primary-sea/25"
              onClick={() => router.push("/dashboard/reviews")}
            >
              <MdOutlineRateReview size={20} className="mr-2" />
              Reviews
            </Button>
          </div>
        </div>
      </div>
      <div className=" space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold">Settings</h2>
          <Button
            onClick={() => signOut()}
            variant={"ghost"}
            className="w-full text-red-500 justify-start rounded-none hover:bg-red-200 hover:text-red-500"
          >
            <BiLogOut size={20} className="mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
