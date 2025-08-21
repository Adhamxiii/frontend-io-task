import ServiceContent from "@/components/service/ServiceContent";
import NotFoundPage from "@/components/ui/NotFoundPage";
import { getServiceBySlug } from "@/data/loaders";
import type { Service } from "@/types";
import { Metadata, NextPage } from "next";
import Image from "next/image";

export async function generateMetadata({ params }: { params: Promise<{ "service-id": string }> }): Promise<Metadata> {
  const { "service-id": serviceSlug } = await params;
  const res = await getServiceBySlug(serviceSlug);
  const service: Service | undefined = res.data?.[0];

  return {
    title: service?.title || "Service",
    description: service?.description || "Professional legal consultation services for individuals and companies",
  };
}

interface PageProps {
  params: Promise<{ "service-id": string }>;
}

const SingleServicePage: NextPage<PageProps> = async ({ params }) => {
  const { "service-id": serviceSlug } = await params;

  const res = await getServiceBySlug(serviceSlug);
  const service: Service | undefined = res.data?.[0];
  if (!service) {
    return <NotFoundPage />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] xl:h-[850px] overflow-hidden">
        <Image
          src="/assets/bg-hero.jpg"
          alt="Service background"
          fill
          className="object-cover"
          priority
          sizes="100vw"
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
            {service.title}
          </h1>
        </div>
      </section>

      <ServiceContent service={service} />
    </div>
  );
};

export default SingleServicePage;
