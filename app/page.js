import Image from "next/image";
import HeroSection from "@/components/HeroSection";
import FeatureSection from "@/components/FeatureSection";
import Feature_t from "@/components/FeatureSection/Feature_t";
import Pricing from "@/components/Pricing";
import Testemonials from "@/components/Testemonials";
import ContactSection from "@/components/ContactSection";
import FAQS from "@/components/FAQS";
import Stats from "@/components/Stats";
import Newsletter from "@/components/Newsletter";
import LogoGrid from "@/components/LogoGrid";
import CTASECTION from "@/components/CTASECTION";
export default function Home() {
  
  return (
    
    <>

      <HeroSection />
      <FeatureSection />
      <Feature_t />
      <Pricing />

      <Testemonials />
      <ContactSection/>
      <FAQS />
      <Stats />
      <CTASECTION />
      <Newsletter/>
      <LogoGrid />
    
    </>
  );
}
