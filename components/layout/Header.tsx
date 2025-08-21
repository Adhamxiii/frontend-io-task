"use client";
import { getServicesData } from "@/data/loaders";
import { getNavLinks } from "@/data/routes";
import { Link, useRouter } from "@/i18n/navigation";
import LogoIcon from "@/public/icons/Logo";
import { useAppDispatch } from "@/store/hooks";
import { setQuery as setSearchQuery } from "@/store/slices/searchSlice";
import type { Service } from "@/types";
import { Menu } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import LanguageSwitcher from "./LanguageSwitcher";
import MobileMenu from "./MobileMenu";
import ExtendableSearch from "./SearchBar";

const SubMenuLink = ({ item }: { item: any }) => {
  return (
    <a
      className="flex select-none flex-row gap-4 rounded-md p-3 no-underline outline-none transition-colors text-white text-base font-normal leading-[26px]"
      href={item.url}
    >
      <span className="text-base font-normal leading-[26px]">{item.title}</span>
    </a>
  );
};

const renderMenuItem = (item: any) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger className="bg-transparent hover:bg-transparent hover:text-white group-hover:text-white/50 text-white text-base font-normal leading-[26px] [&[data-state=open]]:text-white [&[data-state=open]]:!bg-transparent">
          <NavigationMenuLink
            href={item.url}
            className="bg-transparent hover:bg-transparent hover:text-white group-hover:text-white/50 text-white text-base font-normal leading-[26px] [&[data-state=open]]:text-white [&[data-state=open]]:!bg-transparent focus:bg-transparent focus:text-white"
          >
            {item.title}
          </NavigationMenuLink>
        </NavigationMenuTrigger>
        <NavigationMenuContent className="bg-primary text-white p-4 rounded-lg shadow-lg !w-[900px] grid grid-cols-4 gap-x-10 gap-y-4">
          {item.items.map((subItem: any) => (
            <NavigationMenuLink asChild key={subItem.title} className="w-full">
              <SubMenuLink item={subItem} />
            </NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        href={item.url}
        className="bg-transparent hover:bg-transparent hover:text-white group-hover:text-white/50 group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 transition-colors text-white text-base font-normal leading-[26px] focus:bg-transparent focus:text-white"
      >
        {item.title}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = useTranslations("navbar");
  const [services, setServices] = useState<Service[]>([]);
  const navLinks = getNavLinks(t);
  const locale = useLocale();
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsMobileMenuOpen(false);
    (async () => {
      try {
        const res = await getServicesData({ revalidate: 300 });
        const list = res?.data ?? [];
        setServices(list);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  const handleSearchSubmit = (query: string) => {
    dispatch(setSearchQuery(query));
    const target = `/search?q=${encodeURIComponent(query)}`;
    router.push(target);
  };

  return (
    <>
      <header className="bg-transparent absolute top-5 left-0 right-0 z-50">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/">
                <LogoIcon />
              </Link>
            </div>

            <nav className="hidden lg:block">
              <div className="flex items-center gap-[27px]">
                <NavigationMenu dir={locale === "ar" ? "rtl" : "ltr"}>
                  <NavigationMenuList>
                    {navLinks.map((item) => {
                      if (item.title === t("services")) {
                        const dynamic = {
                          ...item,
                          title: `${t("services")}`,
                          items: services.map((s, idx) => ({
                            title: `${t("services")} ${idx + 1}`,
                            url: `/services/${s.slug}`,
                          })),
                        };
                        return renderMenuItem(dynamic);
                      }
                      return renderMenuItem(item);
                    })}
                  </NavigationMenuList>
                </NavigationMenu>
              </div>
            </nav>

            <div className="flex items-center gap-5">
              <ExtendableSearch
                onSearch={handleSearchSubmit}
                placeholder={t("search")}
                className="relative"
              />

              <div className="hidden lg:block">
                <LanguageSwitcher />
              </div>

              <Button
                variant="outline"
                className="hidden md:flex w-[130px] h-10 rounded-[8px] border border-white text-white bg-transparent text-xs font-medium leading-[17.33px] hover:bg-white hover:text-primary text-center cursor-pointer"
              >
                {t("bookAppointment")}
              </Button>

              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden w-[57px] h-[41px] rounded-[8px] bg-transparent text-white text-base font-normal leading-[26px] flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <Menu />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
};

export default Header;
