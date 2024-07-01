import TitleSection from "@/components/atoms/TitleSection";
import BookingTable from "@/components/organisms/BookingTable";
import { Separator } from "@/components/ui/separator";
import { FC } from "react";

interface BookingListProps {}

const BookingList: FC<BookingListProps> = () => {
  return (
    <div className="w-full bg-secondary-sea px-6 md:px-12 lg:px-16 pb-6 pt-20 min-h-screen">
      <TitleSection title="Booking List" className="text-center" />
      <Separator className="mt-8 bg-primary-sea/20" />
      <BookingTable />
    </div>
  );
};

export default BookingList;
