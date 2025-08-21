export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] xl:h-[850px] overflow-hidden">
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      </section>

      <section className="container mx-auto py-8 sm:py-12 md:py-16 lg:py-[76px] px-4 sm:px-8 md:px-16 lg:px-[143px]">
        <div className="space-y-6">
          <div className="h-8 w-2/3 bg-gray-200 rounded animate-pulse" />
          <div className="space-y-3">
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-11/12 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-10/12 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </section>
    </div>
  );
}
