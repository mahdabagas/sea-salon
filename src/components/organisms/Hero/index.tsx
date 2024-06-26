import Image from "next/image";
import React, { FC } from "react";
import { Lavishly_Yours } from "next/font/google";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const lavishly = Lavishly_Yours({
  subsets: ["latin"],
  weight: "400",
});

interface HeroProps {}

const Hero: FC<HeroProps> = () => {
  return (
    <section className="bg-secondary-sea">
      <div className="flex md:pt-12 px-6 md:px-20 items-center justify-center md:h-screen overflow-hidden">
        <div className="flex flex-col-reverse gap-6 md:flex-row items-center max-w-8xl">
          <div className="w-full md:w-1/2">
            <h2
              className={`${lavishly.className} text-4xl md:text-[2.5rem] lg:text-[3.5rem] text-center md:text-left text-primary-sea leading-tight font-medium`}
            >
              Beauty & Elegance Redifined
            </h2>
            <h3 className="mt-6 md:mt-8 text-sm lg:text-base text-center md:text-left text-primary-sea font-light tracking-wider leading-relaxed">
              Welcome to our luxurious salon, where elegance meets excellence.
              Indulge in a transformative experience with our expert stylists
              and premium services. Step into a world of beauty and relaxation,
              and leave feeling radiant and rejuvenated. Your perfect look
              awaits!
            </h3>
            <div className="mt-6 flex flex-col sm:flex-row justify-center md:justify-start">
              <Button className="bg-primary-sea">Booking Now</Button>
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
