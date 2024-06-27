import TitleSection from "@/components/atoms/TitleSection";
import React, { FC } from "react";

const SERVICES = [
  {
    title: "Haircuts and Styling",
    desc: "Our salon offers modern haircuts and styling services for a fresh and trendy look",
  },
  {
    title: "Manicure and Pedicure",
    desc: "Our salon provides professional manicure and pedicure services for perfectly groomed nails",
  },
  {
    title: "Facial Treatments",
    desc: "Our salon offers rejuvenating facial treatments for a radiant and refreshed complexion.",
  },
];

interface ServicesProps {}

const Services: FC<ServicesProps> = () => {
  return (
    <section className="w-full bg-secondary-sea px-6 md:px-12 lg:px-20 pt-12">
      <TitleSection title="Our Services" className="mb-8" />
      <div className="space-y-4 w-full mt-4 text-primary-sea md:flex md:justify-center md:items-start gap-4 lg:gap-16 md:space-y-0">
        {SERVICES.map((service, i) => (
          <div key={i} className="lg:w-72">
            <h1 className="font-medium mb-1 text-lg lg:text-xl">
              {service.title}
            </h1>
            <p className="lg:tracking-wider line-clamp-4">{service.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
