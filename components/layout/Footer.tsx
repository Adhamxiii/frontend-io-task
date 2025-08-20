"use client";

import { getFooterLinks } from "@/data/routes";
import { Link } from "@/i18n/navigation";
import FacebookIcon from "@/public/icons/Facebook";
import GooglePlusIcon from "@/public/icons/GooglePlus";
import TwitterIcon from "@/public/icons/Twitter";
import { useTranslations } from "next-intl";
import React from "react";
import SubscriptionForm from "./SubscriptionForm";

const Footer = () => {
  const t = useTranslations("footer");

  return (
    <footer className="bg-[#4B2615] min-h-[200px] sm:min-h-[220px] md:min-h-[240px] lg:h-[256px]">
      <div className="container mx-auto pt-8 sm:pt-12 md:pt-16 lg:pt-[56px] pb-6 sm:pb-8 md:pb-10 lg:pb-11 px-4 sm:px-8 md:px-16 lg:px-[115px]">
        <div className="flex flex-col gap-6 sm:gap-8 md:gap-10">
          <div className="flex items-center justify-center lg:justify-end gap-6 sm:gap-8 md:gap-10 lg:gap-[43px] flex-col lg:flex-row">
            <div className="w-full lg:w-auto">
              <SubscriptionForm />
            </div>
            <div className="flex items-center justify-center gap-6 sm:gap-7 md:gap-8 flex-col lg:flex-row">
              <Link
                href="#"
                className="text-white text-sm sm:text-base font-normal leading-relaxed sm:leading-[26px] text-center lg:text-left"
              >
                {t("contact")}
              </Link>
              <div className="flex items-center justify-center gap-6 sm:gap-7 md:gap-8 lg:gap-[29px]">
                <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-auto md:h-auto">
                  <TwitterIcon />
                </div>
                <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-auto md:h-auto">
                  <FacebookIcon />
                </div>
                <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-auto md:h-auto">
                  <GooglePlusIcon />
                </div>
              </div>
            </div>
          </div>
          <hr className="border-2 border-white/30" />
          <div className="flex items-center justify-center lg:justify-between flex-col lg:flex-row gap-4 sm:gap-6 md:gap-8 lg:gap-0">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8 flex-wrap">
              {getFooterLinks(t).map((link) => (
                <Link
                  href={link.link}
                  key={link.title}
                  className="text-white text-sm sm:text-base font-normal leading-relaxed sm:leading-[26px] text-center"
                >
                  {link.title}
                </Link>
              ))}
            </div>
            <p className="text-white text-sm sm:text-base font-normal leading-relaxed sm:leading-[26px] text-center lg:text-left">
              {t("copyright")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
