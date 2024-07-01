"use client";
import React, { FC } from "react";
import { Button } from "@/components/ui/button";
import LogoTextSea from "@/components/atoms/LogoTextSea";
import { useSession } from "next-auth/react";
import MenuAuth from "@/components/organisms/AuthMenu";
import { useRouter } from "next/navigation";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = () => {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <header className="bg-secondary-sea/75 backdrop-blur-sm py-4 px-6 md:px-12 lg:px-20 flex justify-between items-center fixed top-0 left-0 right-0 z-50">
      <div onClick={() => router.push("/")}>
        <LogoTextSea className="text-3xl lg:text-4xl cursor-pointer" />
      </div>
      {session ? (
        <MenuAuth />
      ) : (
        <div className="flex items-center justify-between gap-2">
          <Button
            size="sm"
            className="bg-primary-sea hover:bg-primary-sea/80"
            onClick={() => router.push("signin")}
          >
            Login
          </Button>

          <Button
            size="sm"
            variant={"outline"}
            className="text-primary-sea border-primary-sea hover:text-primary-sea bg-secondary-sea border-2 hidden md:block"
            onClick={() => router.push("signup")}
          >
            Sign Up
          </Button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
