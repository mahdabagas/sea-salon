import { Lavishly_Yours } from "next/font/google";
import { FC } from "react";

const lavishly = Lavishly_Yours({ subsets: ["latin"], weight: "400" });

interface LogoTextSeaProps {
  className?: string;
  props?: any;
}

const LogoTextSea: FC<LogoTextSeaProps> = ({ className }) => {
  return (
    <h1 className={`${lavishly.className} text-primary-sea ${className}`}>
      SEA
    </h1>
  );
};

export default LogoTextSea;
