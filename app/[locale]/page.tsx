import HeroSection from "@/components/home/HeroSection";
import OurTeamSection from "@/components/home/OurTeamSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import { Metadata, NextPage } from "next";
import { getHeroData } from "@/data/loaders";

export const metadata: Metadata = {
  title: "Home",
  description: "Home page",
};

export const revalidate = 300;

const Home: NextPage = async () => {
  const heroData = await getHeroData();

  return (
    <>
      <HeroSection
        heroBackground={heroData.data[0]?.hero_background || []}
        heroPhoto={heroData.data[0]?.hero_photo}
      />
      <OurTeamSection />
      <TestimonialsSection />
    </>
  );
};

export default Home;
