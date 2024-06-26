import React, { FC } from "react";
import { Lavishly_Yours } from "next/font/google";
import { Button } from "@/components/ui/button";

const lavishly = Lavishly_Yours({
  subsets: ["latin"],
  weight: "400",
});

interface NavbarProps {}

const Navbar: FC<NavbarProps> = () => {
  return (
    <header className="bg-secondary-sea/75 backdrop-blur-sm py-4 px-6 md:px-12 lg:px-16 flex justify-between items-center fixed top-0 left-0 right-0 z-50">
      <div className={lavishly.className}>
        <h1 className="text-3xl text-primary-sea">Sea</h1>
      </div>
      <Button size="sm" className="bg-primary-sea">
        Login
      </Button>
    </header>
  );
};

export default Navbar;
