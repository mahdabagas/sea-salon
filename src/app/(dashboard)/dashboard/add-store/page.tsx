import StoreForm from "@/components/forms/StoreForm";
import { Separator } from "@/components/ui/separator";
import { FC } from "react";

interface AddStoreProps {}

const AddStore: FC<AddStoreProps> = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Store Additon Form</h1>
      <h2>Add a New Salon Store</h2>

      <Separator className="my-4" />

      <StoreForm />
    </div>
  );
};

export default AddStore;
