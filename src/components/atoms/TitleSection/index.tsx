"use client";

import { FC } from "react";
import { Lavishly_Yours } from "next/font/google";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useRouter } from "next/navigation";

const lavishly = Lavishly_Yours({
  subsets: ["latin"],
  weight: "400",
});

interface TitleSectionProps {
  title: string;
  className?: string;
  hasArrow?: boolean;
  link?: string;
}

const TitleSection: FC<TitleSectionProps> = ({
  title,
  className,
  hasArrow,
  link,
}) => {
  const router = useRouter();

  return (
    <div className="relative w-full">
      {hasArrow && (
        <HiOutlineArrowLeft
          onClick={() => router.push(link || "/")}
          size={46}
          className="absolute top-1/2 left-0 -translate-y-1/2 cursor-pointer text-primary-sea rounded-full p-2 hover:bg-primary-sea/20"
        />
      )}
      <h1
        className={`${lavishly.className} text-primary-sea text-5xl lg:text-6xl ${className}`}
      >
        {title}
      </h1>
    </div>
  );
};

export default TitleSection;
