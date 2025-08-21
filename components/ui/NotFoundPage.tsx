import { Link } from "@/i18n/navigation";

export default function NotFoundPage() {
  return (
    <div className="relative min-h-screen bg-[#0B0B0C] overflow-hidden">
      <div
        className="pointer-events-none absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-primary/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full bg-white/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 container mx-auto px-4 flex items-center justify-center min-h-screen">
        <div className="text-center max-w-2xl">
          <p className="inline-flex items-center justify-center rounded-full bg-white/5 px-3 py-1 text-xs font-medium tracking-wider text-white/60 ring-1 ring-white/10">
            Oops! This page has wandered off
          </p>
          <h1 className="mt-6 text-7xl sm:text-8xl md:text-9xl font-extrabold tracking-tight text-white/90">
            404
          </h1>

          <h2 className="mt-4 text-2xl sm:text-3xl font-semibold text-white">
            Page not found
          </h2>

          <p className="mt-3 text-base sm:text-lg text-white/70">
            Sorry, we couldn’t find the page you’re looking for. It might have
            been moved, renamed, or no longer exists.
          </p>

          <div className="mt-8 flex items-center justify-center gap-3">
            <Link
              href="/"
              className="px-5 py-3 rounded-lg bg-white text-primary font-medium hover:bg-white/90 transition-colors"
            >
              Go home
            </Link>

            <Link
              href="/contact"
              className="px-5 py-3 rounded-lg border border-white/20 text-white hover:bg-white/10 transition-colors"
            >
              Contact support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
