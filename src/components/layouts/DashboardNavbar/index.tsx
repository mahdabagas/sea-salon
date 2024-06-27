import { FC } from "react";

interface DashboardNavbarProps {}

const DashboardNavbar: FC<DashboardNavbarProps> = ({}) => {
  return (
    <nav className="flex justify-end border-b border-primary-sea/25 pb-4 items-center">
      <p>User</p>
    </nav>
  );
};

export default DashboardNavbar;
