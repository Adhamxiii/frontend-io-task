"use client";

import { ChevronDownIcon } from "lucide-react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const locales = [
  { code: "en", label: "English" },
  { code: "ar", label: "العربية" },
];

const LanguageSwitcher = () => {
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: string) => {
    const pathWithoutLocale = pathname.replace(`/${currentLocale}`, "");

    const newPath = `/${newLocale}${pathWithoutLocale}`;

    router.push(newPath);
  };

  const currentLanguage = locales.find(
    (locale) => locale.code === currentLocale
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="shadow-none uppercase text-white hover:bg-transparent hover:text-white cursor-pointer focus:ring-0 focus:outline-none ring-0 focus:ring-offset-0 w-12"
          aria-label="Switch language"
        >
          {currentLanguage?.code}
          <ChevronDownIcon
            className="-me-1 opacity-60 "
            size={16}
            aria-hidden="true"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="min-w-(--radix-dropdown-menu-trigger-width) bg-primary text-white gap-2 flex flex-col"
      >
        {locales.map((locale) => (
          <DropdownMenuItem
            key={locale.code}
            onClick={() => handleLanguageChange(locale.code)}
            className={`cursor-pointer ${
              currentLocale === locale.code ? "bg-white text-primary" : ""
            }`}
          >
            <span>{locale.label}</span>
            {currentLocale === locale.code && (
              <span className="ml-auto text-xs text-muted-foreground">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
