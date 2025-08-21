import { Metadata, NextPage } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact us",
};

export const revalidate = 60;

const ContactPage: NextPage = async () => {
  const t = await getTranslations("contact");

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] xl:h-[850px] overflow-hidden">
        <Image
          src="/assets/bg-hero.jpg"
          alt="Contact background"
          fill
          className="object-cover"
          priority
        />
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            background:
              "linear-gradient(271.47deg, rgba(75, 38, 21, 0.28) 1.2%, rgba(75, 38, 21, 0.68) 86.38%)",
          }}
        />

        <div className="absolute inset-0 flex items-center justify-center px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white text-center">
            {t("titlePage")}
          </h1>
        </div>
      </section>

      <section className="container mx-auto py-12 px-4">
        <p className="text-gray-800">{t("content")}</p>
      </section>
    </div>
  );
};

export default ContactPage;
