import { FC } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
// import { BiLogOut, BiSolidDownArrow } from "react-icons/bi";

interface MenuAuthProps {}

const MenuAuth: FC<MenuAuthProps> = () => {
  const { data: session } = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="inline-flex items-center gap-1 cursor-pointer">
          <div className="text-primary-sea mr-2">
            Hai, {session?.user?.name}
          </div>
          {/* <BiSolidDownArrow className="text-sm"/> */}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => signOut()} className="text-red-500">
          {/* <BiLogOut className="mr-2"/>  */}
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MenuAuth;
