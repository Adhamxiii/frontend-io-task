"use client";

import ErrorBoundary from "@/components/ui/ErrorBoundary";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const SearchResultsContent = dynamic(() => import("./SearchResultsContent"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center py-10">
      <LoadingSpinner size="lg" variant="gray" />
    </div>
  ),
});

const SearchResults = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  if (!query.trim()) {
    return (
      <div className="min-h-screen bg-gray-50">
        <section className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
          <Image
            src="/assets/bg-hero.jpg"
            alt="Search background"
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
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center">
              Search
            </h1>
          </div>
        </section>

        <section className="container mx-auto py-12 px-4">
          <div className="text-center">
            <p className="text-gray-600 text-lg">
              Please enter a search query to see results.
            </p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
        <Image
          src="/assets/bg-hero.jpg"
          alt="Search background"
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
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center">
            Search: {query}
          </h1>
        </div>
      </section>

      <section className="container mx-auto py-12 px-4">
        <ErrorBoundary>
          <SearchResultsContent />
        </ErrorBoundary>
      </section>
    </div>
  );
};

export default SearchResults;
