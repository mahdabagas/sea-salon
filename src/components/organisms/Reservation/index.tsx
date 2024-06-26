import React from "react";
import { Separator } from "@/components/ui/separator";
import BookingForm from "@/components/forms/BookingForm";
import TitleSection from "@/components/atoms/TitleSection";

function Reservation() {
  return (
    <section className="w-full bg-secondary-sea px-6 md:px-12 lg:px-16 py-12">
      <div className="md:flex justify-between lg:justify-center lg:gap-10">
        <div className="flex justify-start items-center">
          <TitleSection title="Booking Now" className="mb-8 md:mb-0 w-full" />
        </div>
        <div className="bg-secondary-sea border-2 border-primary-sea p-4 lg:p-8 rounded-md mt-4 md:max-w-[30rem]">
          <h2 className="text-primary-sea text-2xl md:text-4xl lg:text-5xl font-medium">
            Hello Marion
          </h2>
          <p className="text-primary-sea text-xl lg:text-2xl">
            Lets fill Form in below
          </p>
          <Separator className="my-2" color="#028090" />
          <BookingForm />
        </div>
      </div>
    </section>
  );
}

export default Reservation;
