import ServiceContent from "@/components/service/ServiceContent";
import { Metadata, NextPage } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Legal Consultation Services",
  description:
    "Professional legal consultation services for individuals and companies",
};

interface PageProps {
  params: Promise<{ "service-id": string }>;
}

const SingleServicePage: NextPage<PageProps> = async ({ params }) => {
  const { "service-id": serviceId } = await params;

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] xl:h-[850px] overflow-hidden">
        <Image
          src="/assets/bg-hero.jpg"
          alt="Service background"
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
            Service {serviceId}
          </h1>
        </div>
      </section>

      <ServiceContent />
    </div>
  );
};

export default SingleServicePage;
