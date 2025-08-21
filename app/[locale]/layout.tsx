import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import ErrorBoundary from "@/components/ui/ErrorBoundary";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { DM_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Providers from "./providers";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "IO-TECH Task",
    template: "%s | IO-TECH Task",
  },
  description: "IO-TECH Task - Professional services and solutions",
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body className={dmSans.className}>
        <NextIntlClientProvider>
          <Providers>
            <ErrorBoundary>
              <Header />
            </ErrorBoundary>
            <main className="min-h-screen relative bg-[#FAFAFA]">
              <ErrorBoundary>{children}</ErrorBoundary>
            </main>
            <ErrorBoundary>
              <Footer />
            </ErrorBoundary>
          </Providers>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "#363636",
                color: "#fff",
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: "#4ade80",
                  secondary: "#fff",
                },
              },
              error: {
                duration: 4000,
                iconTheme: {
                  primary: "#ef4444",
                  secondary: "#fff",
                },
              },
            }}
          />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
