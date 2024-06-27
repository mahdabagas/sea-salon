import React, { FC } from "react";
import { Button } from "@/components/ui/button";
import LogoTextSea from "@/components/atoms/LogoTextSea";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = () => {
  return (
    <header className="bg-secondary-sea/75 backdrop-blur-sm py-4 px-6 md:px-12 lg:px-20 flex justify-between items-center fixed top-0 left-0 right-0 z-50">
      <LogoTextSea className="text-3xl lg:text-5xl" />
      <Button size="sm" className="bg-primary-sea">
        Login
      </Button>
    </header>
  );
};

export default Navbar;
