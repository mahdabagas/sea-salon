"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface TitleDashboardProps {
  title: string;
  label?: string;
  link?: string;
}

const TitleDashboard: FC<TitleDashboardProps> = ({ title, label, link }) => {
  const router = useRouter();
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-semibold">{title}</h1>
      {label && (
        <Button
          className="bg-primary-sea text-secondary-sea hover:bg-primary-sea/80"
          onClick={() => router.push(link || "")}
        >
          {label}
        </Button>
      )}
    </div>
  );
};

export default TitleDashboard;
