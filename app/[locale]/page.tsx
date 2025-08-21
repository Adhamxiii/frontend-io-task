import HeroSection from "@/components/home/HeroSection";
import OurTeamSection from "@/components/home/OurTeamSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import { Metadata, NextPage } from "next";
import { getHeroData } from "@/data/loaders";

export const metadata: Metadata = {
  title: "Home",
  description: "Home",
};

export const revalidate = 300; // 5 minutes

const Home: NextPage = async () => {
  // Fetch hero data server-side for better performance
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
