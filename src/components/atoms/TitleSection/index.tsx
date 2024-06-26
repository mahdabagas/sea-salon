import { FC } from "react";
import { Lavishly_Yours } from "next/font/google";

const lavishly = Lavishly_Yours({
  subsets: ["latin"],
  weight: "400",
});

interface TitleSectionProps {
  title: string;
  className?: string;
}

const TitleSection: FC<TitleSectionProps> = ({ title, className }) => {
  return (
    <h1
      className={`${lavishly.className} text-primary-sea text-5xl lg:text-6xl font-bold ${className}`}
    >
      {title}
    </h1>
  );
};

export default TitleSection;
