"use client";

import Image from "next/image";
import React, { FC } from "react";
import { Button } from "@/components/ui/button";
import TitleSection from "@/components/atoms/TitleSection";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface HeroProps {
  executeScroll: any;
}

const Hero: FC<HeroProps> = ({ executeScroll }) => {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <section className="bg-secondary-sea">
      <div className="flex px-6 md:px-12 lg:px-20 items-center justify-center md:h-screen overflow-hidden">
        <div className="flex flex-col-reverse gap-6 md:flex-row items-center max-w-8xl">
          <div className="w-full md:w-1/2">
            <TitleSection
              className={`text-4xl md:text-[2.5rem] lg:text-[4.2rem] text-center md:text-left text-primary-sea leading-tight font-medium`}
              title="Beauty & Elegance Redifined"
            />
            <h3 className="mt-6 md:mt-8 text-sm md:text-base lg:text-lg text-center md:text-left text-primary-sea font-light tracking-wider leading-relaxed">
              Welcome to our luxurious salon, where elegance meets excellence.
              Indulge in a transformative experience with our expert stylists
              and premium services. Step into a world of beauty and relaxation,
              and leave feeling radiant and rejuvenated. Your perfect look
              awaits!
            </h3>
            <div className="mt-6 flex flex-col sm:flex-row justify-center md:justify-start">
              <Button
                className="border-2 hover:bg-secondary-sea hover:text-primary-sea
           border-primary-sea bg-primary-sea text-secondary-sea md:w-64"
                size={"lg"}
                onClick={() =>
                  session ? executeScroll() : router.push("/signin")
                }
              >
                Booking Now
              </Button>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <Image
              src="/images/bg-hero.png"
              alt="/images/bg-hero.png"
              width={480}
              height={520}
              className="max-h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
