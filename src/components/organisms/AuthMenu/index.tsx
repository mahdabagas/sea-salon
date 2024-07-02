"use client";

import { FC, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { BiLogOut } from "react-icons/bi";

interface MenuAuthProps {}

const MenuAuth: FC<MenuAuthProps> = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        asChild
        onClick={() => setOpen(!open)}
        className="cursor-pointer"
      >
        <div className="inline-flex items-center gap-1">
          <div className="text-primary-sea mr-2">{session?.user?.name}</div>
          <FiUser size={20} className="text-primary-sea" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-secondary-sea">
        <DropdownMenuItem
          onClick={() => router.push("/booking-list")}
          className="text-primary-sea grid focus:text-primary-sea"
          style={{ gridTemplateColumns: "2rem 1fr" }}
        >
          <MdOutlineLocalGroceryStore size={20} />
          <p>Booking List</p>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => signOut()}
          className="text-red-500 grid focus:text-red-500"
          style={{ gridTemplateColumns: "2rem 1fr" }}
        >
          <BiLogOut size={20} />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MenuAuth;
