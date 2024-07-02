import TitleSection from "@/components/atoms/TitleSection";
import BookingTable from "@/components/organisms/BookingTable";
import { Separator } from "@/components/ui/separator";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function BookingList() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }
  return (
    <div className="w-full bg-secondary-sea px-6 md:px-12 lg:px-16 pb-6 pt-20 min-h-screen relative">
      <TitleSection
        title="Booking List"
        className="text-center"
        hasArrow
        link="/"
      />
      <BookingTable />
    </div>
  );
}

export default BookingList;
