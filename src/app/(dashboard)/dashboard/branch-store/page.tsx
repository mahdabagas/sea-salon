import StoreTable from "@/components/organisms/StoreTable";
import TitleDashboard from "@/components/organisms/TitleDashboard";
import { FC } from "react";

interface BranchStoreProps {}

const BranchStore: FC<BranchStoreProps> = () => {
  return (
    <section className="space-y-4">
      <TitleDashboard
        title="Branch Store"
        label="Add Store"
        link="/dashboard/add-store"
      />
      <StoreTable />
    </section>
  );
};

export default BranchStore;
