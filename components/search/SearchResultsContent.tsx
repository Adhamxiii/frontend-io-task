import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useSearch } from "@/hooks/useSearch";
import type { Service, TeamMember } from "@/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Button } from "../ui/button";

const SearchResultsContent = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const { results, loading, error, search } = useSearch();
  const t = useTranslations("search");
  const router = useRouter();
  const locale = useLocale();

  useEffect(() => {
    if (query.trim()) {
      search(query);
    }
  }, [query, search]);

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner
            size="xl"
            variant="primary"
            className="mx-auto mb-4"
          />
          <p className="text-gray-600">Searching for &quot;{query}&quot;...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Search Error
          </h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => search(query)}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!results) {
    return null;
  }

  return (
    <div className="flex flex-col gap-[52.52px] mt-[76.47px]">
      <Button
        variant="ghost"
        className="md:ms-[260px] w-fit flex items-center gap-2 sm:gap-3 text-[#4B2615]/70 hover:text-[#4B2615] font-bold leading-relaxed sm:leading-[26px] text-sm sm:text-base"
        onClick={() => router.back()}
      >
        {locale === "ar" ? (
          <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
        ) : (
          <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
        )}
        {t("back")}
      </Button>
      <div className="flex flex-col sm:flex-row gap-8">
        <div className="w-full sm:w-64 flex-shrink-0">
          <div className="bg-[#FAFAFA] md:p-6 rounded-lg">
            <div className="space-y-4">
              <div className="text-2xl font-bold text-[#4B2615]">Team</div>
              <div className="text-2xl font-bold text-[#4B2615]">Services</div>
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-8">
          <div className="">
            <h2 className="text-xl font-semibold text-[#4B2615] mb-4">Team</h2>
            {results.team.length === 0 ? (
              <p className="text-gray-600">{t("noTeamResults")}</p>
            ) : (
              <div className="space-y-4">
                {results.team.map((member: TeamMember) => (
                  <div
                    key={member.id}
                    className="border-b border-gray-200 pb-4"
                  >
                    <p className="text-[#4B2615] font-medium mb-2">
                      {member.name}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <hr className="border-[#97979780]" />

          <div>
            <h2 className="text-xl font-semibold text-[#4B2615] mb-4">
              Services
            </h2>
            {results.services.length === 0 ? (
              <p className="text-gray-600">{t("noServicesResults")}</p>
            ) : (
              <div className="space-y-4">
                {results.services.map((service: Service) => (
                  <div
                    key={service.id}
                    className="border-b border-gray-200 pb-4"
                  >
                    <p className="text-[#4B2615] font-medium mb-2">
                      {service.title}
                    </p>
                    <a
                      href={`/services/${service.id}`}
                      className="text-[#4B2615] underline hover:no-underline transition-all"
                    >
                      Read more
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
          <hr className="border-[#97979780]" />
        </div>
      </div>
    </div>
  );
};

export default SearchResultsContent;
