import HeroSection from "@/components/home/HeroSection";
import OurTeamSection from "@/components/home/OurTeamSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import { getHeroData, getTeamData, getTestimonialsData } from "@/data/loaders";
import { Metadata, NextPage } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Home",
};

const Home: NextPage = async () => {
  const heroData = await getHeroData();
  const teamData = await getTeamData();
  const testimonialsData = await getTestimonialsData();

  return (
    <>
      <HeroSection
        heroBackground={heroData.data[0].hero_background}
        heroPhoto={heroData.data[0].hero_photo}
      />
      <OurTeamSection team={teamData.data} />
      <TestimonialsSection testimonials={testimonialsData.data} />
    </>
  );
};

export default Home;
