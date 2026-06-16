import Hero from "@/components/sections/Hero";
import TrendingPrograms from "@/components/sections/TrendingPrograms";
import Certificates from "@/components/sections/Certificates";
import ChooseOption from "@/components/sections/ChooseOption";
import GetStarted from "@/components/sections/GetStarted";
import Benefits from "@/components/sections/Benefits";
import Testimonials from "@/components/sections/Testimonials";
import Partners from "@/components/sections/Partners";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrendingPrograms />
      <Certificates />
      <ChooseOption />
      <GetStarted />
      <Benefits />
      <Testimonials />
      <Partners />
    </>
  );
}
