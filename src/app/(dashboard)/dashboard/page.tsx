import { redirect } from "next/navigation";
import { FC } from "react";

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = () => {
  redirect("/dashboard/branch-store");
};

export default Dashboard;
