import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Image from "next/image";
import Whatapp from "@/public/icons/Whatapp";
import Phone from "@/public/icons/Phone";
import Mail from "@/public/icons/Mail";
import { useTranslations } from "next-intl";

const OurTeamSection = ({ team }: { team: any }) => {
  const t = useTranslations("home.team");
  return (
    <section className="bg-[#F3F3F3] w-full min-h-[400px] sm:min-h-[500px] md:min-h-[600px] lg:h-[746px]">
      <div className="container mx-auto pt-8 sm:pt-12 md:pt-16 lg:pt-[126px] pb-8 sm:pb-12 md:pb-16 lg:pb-[92px] px-4 sm:px-8 md:px-16 lg:px-[115px]">
        <div className="flex flex-col items-center justify-center gap-8 sm:gap-12 md:gap-16 lg:gap-[75px]">
          <div className="flex flex-col items-center justify-center gap-3 sm:gap-4 md:gap-5">
            <h1 className="text-primary text-center text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-bold leading-tight sm:leading-tight md:leading-tight lg:leading-[52px] tracking-[-0.4px] px-4">
              {t("title")}
            </h1>

            <p className="max-w-[764px] text-center text-sm sm:text-base md:text-lg font-medium leading-relaxed sm:leading-relaxed md:leading-[28px] text-[#1E1E1E] px-4">
              {t("description")}
            </p>
          </div>

          <div className="w-full">
            <Carousel
              opts={{
                direction: "ltr",
                breakpoints: {
                  "(max-width: 768px)": {
                    dragFree: true,
                  },
                },
              }}
              className="py-4 sm:py-6 md:py-8 lg:py-[23px]"
            >
              <CarouselContent className="gap-2 sm:gap-3 md:gap-4 md:justify-center">
                {team.map((member: any, index: number) => (
                  <CarouselItem
                    key={index}
                    className="max-w-[200px] sm:max-w-[240px] md:max-w-[270px]"
                  >
                    <div className="w-full max-w-[200px] sm:max-w-[240px] md:max-w-[270px] h-[250px] sm:h-[280px] md:h-[300px] mx-auto">
                      <div className="w-full h-[120px] sm:h-[140px] md:h-[160px] lg:h-[184px] relative mb-2 sm:mb-2.5 md:mb-3 lg:mb-3.5">
                        <Image
                          src={`${member.profile_image.url}`}
                          alt="team-member"
                          fill
                          className="object-cover object-top"
                        />
                      </div>

                      <h3 className="text-primary text-center font-medium text-lg sm:text-xl md:text-[22px] leading-tight sm:leading-tight md:leading-[32px] mb-2 sm:mb-2.5">
                        {member.name}
                      </h3>

                      <p className="text-[#15143966] font-bold text-xs sm:text-sm leading-relaxed sm:leading-[26px] tracking-[1px] sm:tracking-[2px] uppercase mb-2 sm:mb-2.5 text-center">
                        {member.role}
                      </p>

                      <div className="flex items-center gap-2 sm:gap-3 justify-center mb-1 sm:mb-1.5">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-auto md:h-auto">
                          <Whatapp />
                        </div>
                        <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-auto md:h-auto">
                          <Phone />
                        </div>
                        <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-auto md:h-auto">
                          <Mail />
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex" />
              <CarouselNext className="hidden sm:flex" />
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurTeamSection;
