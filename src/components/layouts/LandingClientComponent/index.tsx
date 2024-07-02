"use client";

import Hero from "@/components/organisms/Hero";
import Reservation from "@/components/organisms/Reservation";
import { useRef } from "react";

export default function LandingClientComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const executeScroll = () => {
    return inputRef.current?.scrollIntoView();
  };

  return (
    <>
      <Hero executeScroll={executeScroll} />
      {children}
      <Reservation ref={inputRef} />
    </>
  );
}
