import { Hero } from "@/components/sections/Hero";
import { IndustryMarquee } from "@/components/sections/IndustryMarquee";
import { Statement } from "@/components/sections/Statement";
import { Products } from "@/components/sections/Products";
import { RestoTour } from "@/components/sections/RestoTour";
import { Industries } from "@/components/sections/Industries";
import { Numbers } from "@/components/sections/Numbers";
import { Capabilities } from "@/components/sections/Capabilities";
import { Approach } from "@/components/sections/Approach";
import { Company } from "@/components/sections/Company";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <IndustryMarquee />
      <Statement />
      <Products />
      <RestoTour />
      <Industries />
      <Numbers />
      <Capabilities />
      <Approach />
      <Company />
      <Contact />
    </>
  );
}
