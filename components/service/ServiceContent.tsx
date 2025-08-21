"use client";

import React from "react";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import type { Service } from "@/types";

interface Props {
  service?: Service;
}

const ServiceContent: React.FC<Props> = ({ service }) => {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("service");

  return (
    <section className="container mx-auto py-8 sm:py-12 md:py-16 lg:py-[76px] px-4 sm:px-8 md:px-16 lg:px-[143px] bg-[url('/assets/bg-services.png')] bg-cover bg-center">
      <div className="flex flex-col gap-8 sm:gap-12 md:gap-16 lg:gap-[57.5px]">
        <Button
          variant="ghost"
          className="w-fit flex items-center gap-2 sm:gap-3 text-[#4B2615]/70 hover:text-[#4B2615] font-bold leading-relaxed sm:leading-[26px] text-sm sm:text-base"
          onClick={() => router.back()}
        >
          {locale === "ar" ? (
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
          ) : (
            <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
          )}
          {t("back")}
        </Button>
        <div className="space-y-6 sm:space-y-8 md:space-y-12 lg:space-y-[35px]">
          <div className="space-y-8 sm:space-y-12 md:space-y-16 lg:space-y-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-medium text-[#4B2615] leading-tight sm:leading-tight md:leading-tight lg:leading-[32px]">
              {service?.title ?? t("title")}
            </h2>

            <p className="text-sm sm:text-base text-[#1E1E1E] leading-relaxed sm:leading-[26px] text-justify">
              {service?.description ?? t("description")}
            </p>
          </div>

          <div className="space-y-8 sm:space-y-10 md:space-y-11">
            {service?.content?.map((block, idx) => (
              <div
                className="flex items-start gap-3 sm:gap-4 md:gap-5"
                key={idx}
              >
                <div className="flex-1 space-y-3 sm:space-y-4 md:space-y-5">
                  <h3 className="text-sm sm:text-base font-bold text-[#4B2615] leading-relaxed sm:leading-[26px]">
                    {block.title}
                  </h3>
                  <div className="relative">
                    <div className="text-sm sm:text-base text-[#1E1E1E]/70 leading-relaxed sm:leading-[26px] font-bold ms-8 sm:ms-12 md:ms-16 lg:ms-[63.56px]">
                      {block.description}
                    </div>
                    {block.list && block.list.length > 0 && (
                      <p
                        dangerouslySetInnerHTML={{ __html: block.list }}
                        className="space-y-0 ms-8 sm:ms-12 md:ms-16 lg:ms-[63.56px] text-[#1E1E1E]/70 text-sm sm:text-base font-normal leading-relaxed sm:leading-[26px] whitespace-pre-line"
                      />
                    )}
                    <div
                      className={cn(
                        "w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-[10.3px] md:h-[11px] bg-[#4B2615] rounded-[2px] flex-shrink-0 absolute top-1.5",
                        locale === "ar"
                          ? "right-4 sm:right-8 md:right-12 lg:right-[43px]"
                          : "left-4 sm:left-8 md:left-4"
                      )}
                    />
                    <div
                      className={cn(
                        "absolute top-0 bottom-0 w-1 sm:w-1.5 md:w-[3px] h-full bg-[#D9D9D99C] rounded-[9px]",
                        locale === "ar" ? "right-0" : "left-0"
                      )}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 sm:mt-12 md:mt-16 lg:mt-[70px]">
            <p className="text-sm sm:text-base text-[#1E1E1E]/70 leading-relaxed sm:leading-[26px] font-normal">
              {service?.conclusion ?? t("conclusion")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceContent;
