import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { FiUser } from "react-icons/fi";

async function DashboardNavbar({}) {
  const session = await getServerSession(authOptions);
  return (
    <nav className="flex justify-end border-b border-primary-sea/25 pb-4 items-center">
      <div className="inline-flex items-center gap-1">
        <div className="text-primary-sea mr-2">{session?.user?.name}</div>
        <FiUser size={20} className="text-primary-sea" />
      </div>
    </nav>
  );
}

export default DashboardNavbar;
