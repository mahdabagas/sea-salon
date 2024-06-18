import Hero from "@/components/organisms/Hero";
import Reservation from "@/components/organisms/Reservation";
import Review from "@/components/organisms/Review";
import Services from "@/components/organisms/Services";

export default function Home() {
  return (
    <main>
      <Hero/>
      <Services/>
      <Review/>
      <Reservation/>
    </main>
  );
}
