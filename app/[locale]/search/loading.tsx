export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      </section>
      <section className="container mx-auto py-12 px-4">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-gray-600" />
        </div>
      </section>
    </div>
  );
}
