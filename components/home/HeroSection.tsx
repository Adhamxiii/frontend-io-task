"use client";

import { cn } from "@/lib/utils";
import type { HeroSectionProps, MediaItem } from "@/types";
import { useLocale, useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";
import ErrorBoundary from "../ui/ErrorBoundary";
const ReactPlayer = dynamic(() => import("react-player"), {
  ssr: false,
  loading: () => null,
});

const isVideoItem = (item?: MediaItem) => {
  if (!item) return false;
  const ext = item.ext?.toLowerCase();
  if (ext) return ext === ".mp4";
  const url = item.url?.toLowerCase();
  return typeof url === "string" && url.endsWith(".mp4");
};

function HeroContent({ heroBackground, heroPhoto }: HeroSectionProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const t = useTranslations("home.hero");
  const locale = useLocale();

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  useEffect(() => {
    if (!api || current === 0) return;
    if (!heroBackground || heroBackground.length === 0) return;

    const currentItem = heroBackground[current - 1];
    const isVideo = isVideoItem(currentItem);
    if (isVideo) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [api, current, heroBackground]);

  const scrollTo = (index: number) => {
    api?.scrollTo(index);
  };

  if (!heroBackground || heroBackground.length === 0 || !heroPhoto) {
    return (
      <section className="w-full h-[550px] sm:h-[600px] md:h-[700px] lg:h-[800px] xl:h-[850px] bg-primary relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-white">No hero content available</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full h-[550px] sm:h-[600px] md:h-[700px] lg:h-[800px] xl:h-[850px] bg-primary relative overflow-hidden">
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
        orientation="vertical"
        className="w-full h-full relative"
      >
        <CarouselContent className="w-full h-[600px] md:h-[700px] lg:h-[800px] xl:h-[850px] -mt-0">
          {heroBackground.map((image: MediaItem, index: number) => (
            <CarouselItem key={index} className="w-full h-full pt-0 pl-0">
              <div className="relative w-full h-full">
                {isVideoItem(image) ? (
                  <div className="absolute inset-0 w-full h-full">
                    <ReactPlayer
                      src={`${image.url}`}
                      playing={current === index + 1}
                      muted
                      controls={false}
                      onEnded={() => api?.scrollNext()}
                      playsInline={true}
                      width="100%"
                      height="100%"
                      className="!absolute !inset-0 !w-full !h-full object-cover"
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </div>
                ) : (
                  <Image
                    src={`${image.url}`}
                    alt={`hero-bg-${index + 1}`}
                    fill
                    className="object-cover"
                    priority={index === 0}
                    sizes="100vw"
                  />
                )}
                <div
                  className="absolute inset-0 w-full h-full"
                  style={{
                    background:
                      "linear-gradient(271.47deg, rgba(75, 38, 21, 0.28) 1.2%, rgba(75, 38, 21, 0.68) 86.38%)",
                  }}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div
        className={cn(
          "absolute top-1/2 md:top-2/3 transform -translate-y-1/2 flex flex-col gap-3 z-10",
          locale === "ar"
            ? "right-4 sm:right-8 md:right-16 lg:right-[66px]"
            : "left-4 sm:left-8 md:left-16 lg:left-[66px]"
        )}
      >
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              current === index + 1
                ? "bg-white scale-125"
                : "bg-transparent border border-white hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="container mx-auto absolute left-0 right-0 bottom-8 sm:bottom-16 md:bottom-24 lg:bottom-[150px] flex items-center justify-end px-4 sm:px-8 md:px-16 lg:pr-20">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 sm:gap-12 md:gap-16 lg:gap-[76px]">
          <div className="flex flex-col gap-8 sm:gap-12 md:gap-16 lg:gap-[66px] order-2 lg:order-1">
            <div className="flex flex-col gap-4 sm:gap-6 md:gap-8">
              <h1
                className={cn(
                  "text-white text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold leading-tight sm:leading-tight md:leading-tight lg:leading-[48px] text-center",
                  locale === "ar" ? "lg:text-right" : "lg:text-left"
                )}
              >
                {t("title")}
              </h1>
              <p
                className={cn(
                  "max-w-[700px] text-white text-sm sm:text-base md:text-lg font-medium leading-relaxed sm:leading-relaxed md:leading-[28px] text-center",
                  locale === "ar" ? "lg:text-right" : "lg:text-left"
                )}
              >
                {t("description")}
              </p>
            </div>

            <Button className="bg-white text-primary w-full sm:w-auto sm:max-w-[161px] h-12 sm:h-14 md:h-16 lg:h-[60px] rounded-lg sm:rounded-xl lg:rounded-[12px] text-base sm:text-lg font-medium leading-relaxed sm:leading-[26px] hover:bg-white/80 transition-colors mx-auto lg:mx-0">
              {t("readMore")}
            </Button>
          </div>

          <div className="w-full max-w-[180px] sm:max-w-[320px] md:max-w-[350px] lg:w-[374px] h-[180px] sm:h-[320px] md:h-[350px] lg:h-[374px] relative order-1 lg:order-2">
            <Image
              src={`${heroPhoto.url}`}
              alt="hero-image"
              fill
              className="object-cover rounded-lg grayscale-75"
              sizes="(min-width: 1024px) 374px, (min-width: 768px) 350px, (min-width: 640px) 320px, 180px"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}

const HeroSection = ({ heroBackground, heroPhoto }: HeroSectionProps) => {
  return (
    <ErrorBoundary>
      <HeroContent heroBackground={heroBackground} heroPhoto={heroPhoto} />
    </ErrorBoundary>
  );
};

export default HeroSection;
