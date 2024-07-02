"use client";

import LandingClientComponent from "@/components/layouts/LandingClientComponent";
import Review from "@/components/organisms/Review";
import Services from "@/components/organisms/Services";

export default function Home() {
  return (
    <main>
      <LandingClientComponent>
        <Services />
        <Review />
      </LandingClientComponent>
    </main>
  );
}
