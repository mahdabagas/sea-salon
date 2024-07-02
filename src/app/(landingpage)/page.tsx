"use client";

import Hero from "@/components/organisms/Hero";
import Reservation from "@/components/organisms/Reservation";
import Review from "@/components/organisms/Review";
import Services from "@/components/organisms/Services";
import { useRef } from "react";

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);

  const executeScroll = () => {
    return inputRef.current?.scrollIntoView();
  };

  return (
    <main>
      <Hero executeScroll={executeScroll} />
      <Services />
      <Review />
      <Reservation ref={inputRef} />
    </main>
  );
}
