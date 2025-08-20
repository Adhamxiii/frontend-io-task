"use client";

import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";

const TestimonialsSection = ({ testimonials }: { testimonials: any }) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const t = useTranslations("home.testimonials");
  const locale = useLocale();

  useEffect(() => {
    if (!carouselApi) {
      return;
    }
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
    };
    updateSelection();
    carouselApi.on("select", updateSelection);
    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);

  return (
    <section className="bg-primary w-full min-h-[500px] sm:min-h-[600px] md:min-h-[700px] lg:h-[853px] mb-4 sm:mb-6 md:mb-8 lg:mb-[25px]">
      <div className="container mx-auto py-8 sm:py-12 md:py-16 lg:py-[100px] px-4 sm:px-8 md:px-16 lg:pl-[121.55px] lg:pr-[83px]">
        <div className="flex flex-col gap-8 sm:gap-12 md:gap-16 lg:gap-[64.73px]">
          <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 lg:gap-[26.27px]">
            <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold leading-tight sm:leading-tight md:leading-tight lg:leading-[52px] text-center lg:text-left">
              {t("title")}
            </h1>

            <p className="max-w-[579px] opacity-70 text-white text-sm sm:text-base md:text-lg font-normal text-center lg:text-left mx-auto lg:mx-0">
              {t("description")}
            </p>
          </div>

          <div className="w-full">
            <Carousel
              setApi={setCarouselApi}
              opts={{
                direction: locale === "ar" ? "rtl" : "ltr",
                breakpoints: {
                  "(max-width: 768px)": {
                    dragFree: true,
                  },
                },
              }}
            >
              <CarouselContent className="gap-4 sm:gap-6 md:gap-8 lg:gap-0">
                {testimonials.map((testimonial: any, index: number) => (
                  <CarouselItem key={index} className="">
                    <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-10 lg:gap-[49px]">
                      <div className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[350px] lg:w-[370px] h-[280px] sm:h-[320px] md:h-[350px] lg:h-[370px] relative shrink-0 mx-auto lg:mx-0">
                        <Image
                          src={`${testimonial.image.url}`}
                          alt="testimonial"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-col justify-between gap-6 sm:gap-8 md:gap-10 lg:gap-[101px]">
                        <p className="text-white text-base sm:text-lg md:text-xl lg:text-2xl font-normal leading-relaxed sm:leading-relaxed md:leading-relaxed lg:leading-[40px] opacity-70 text-center lg:text-left">
                          {testimonial.message}
                        </p>
                        <div className="space-y-3 sm:space-y-4 md:space-y-5 text-center lg:text-left">
                          <p className="text-white text-lg sm:text-xl md:text-2xl font-semibold leading-tight sm:leading-tight md:leading-tight lg:leading-[45px]">
                            {testimonial.name}
                          </p>
                          <p className="text-white text-sm sm:text-base font-normal">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            <div className="mt-2 sm:-mt-3 md:-mt-4 lg:-mt-5 flex shrink-0 items-center justify-center lg:justify-end gap-4 sm:gap-6 md:gap-8 lg:gap-[35px] z-10 relative">
              <Button
                size="icon"
                onClick={() => {
                  carouselApi?.scrollPrev();
                }}
                disabled={!canScrollPrev}
                className="size-12 sm:size-14 md:size-16 lg:size-[67px] p-3 sm:p-4 md:p-5 bg-white text-primary disabled:pointer-events-auto rounded-full disabled:bg-white/10 disabled:text-white hover:bg-white/30 hover:text-white"
              >
                {locale === "ar" ? (
                  <ArrowRight className="size-4 sm:size-5 md:size-6" />
                ) : (
                  <ArrowLeft className="size-4 sm:size-5 md:size-6" />
                )}
              </Button>
              <Button
                size="icon"
                onClick={() => {
                  carouselApi?.scrollNext();
                }}
                disabled={!canScrollNext}
                className="size-12 sm:size-14 md:size-16 lg:size-[67px] p-3 sm:p-4 md:p-5 bg-white text-primary disabled:pointer-events-auto rounded-full disabled:bg-white/10 disabled:text-white hover:bg-white/30 hover:text-white"
              >
                {locale === "ar" ? (
                  <ArrowLeft className="size-4 sm:size-5 md:size-6" />
                ) : (
                  <ArrowRight className="size-4 sm:size-5 md:size-6" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
