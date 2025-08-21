import { FC, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import LogoIcon from "@/public/icons/Logo";
import { ChevronDownIcon, X } from "lucide-react";
import { Link } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import { Button } from "../ui/button";
import { getNavLinks } from "@/data/routes";
import { useTranslations } from "next-intl";
import { getServicesData } from "@/data/loaders";
import type { Service } from "@/types";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const t = useTranslations("navbar");
  const navLinks = getNavLinks(t);
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
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

  const toggleSubmenu = (title: string) => {
    setOpenSubmenu(openSubmenu === title ? null : title);
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 lg:hidden",
        isOpen ? "block" : "hidden"
      )}
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="absolute right-0 top-0 h-full w-80 bg-primary shadow-2xl">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-white/20">
            <LogoIcon />
            <button
              onClick={onClose}
              className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto p-6">
            <ul className="space-y-2">
              {(navLinks.map((item) => {
                if (item.title === t("services")) {
                  return {
                    ...item,
                    title: `${t("services")}`,
                    items: services.map((s, idx) => ({
                      title: `${t("services")} ${idx + 1}`,
                      url: `/services/${s.slug}`,
                    })),
                  };
                }
                return item;
              })).map((item) => (
                <li key={item.title}>
                  {item.items ? (
                    <div>
                      <button
                        onClick={() => toggleSubmenu(item.title)}
                        className="w-full text-left px-4 py-3 text-white hover:bg-white/10 rounded-lg transition-colors flex items-center justify-between"
                      >
                        {item.title}
                        <span
                          className={cn(
                            "transition-transform duration-200",
                            openSubmenu === item.title ? "rotate-180" : ""
                          )}
                        >
                          <ChevronDownIcon />
                        </span>
                      </button>
                      {openSubmenu === item.title && (
                        <ul className="ml-4 mt-2 space-y-1">
                          {item.items.map((subItem) => (
                            <li key={subItem.title}>
                              <Link
                                href={subItem.url}
                                onClick={onClose}
                                className="block px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                              >
                                {subItem.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.url}
                      onClick={onClose}
                      className="block px-4 py-3 text-white hover:bg-white/10 rounded-lg transition-colors"
                    >
                      {item.title}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-6 border-t border-white/20 space-y-4">
            <LanguageSwitcher />
            <Button
              variant="outline"
              className="w-full h-12 rounded-lg border-white text-white bg-transparent hover:bg-white hover:text-primary transition-colors"
            >
              Book Appointment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
