"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Languages } from "lucide-react";
import { useEffect } from "react";
import { useLanguage } from "@/lib/contexts/LanguageContext";

// Types
interface NavLink {
  href: string;
  labelKey: string;
}

// Constants
const NAV_LINKS: NavLink[] = [
  { href: "#home",         labelKey: "nav.home" },
  { href: "#tokenomics",   labelKey: "nav.tokenomics" },
  { href: "#metrics",      labelKey: "nav.metrics" },
  { href: "#transactions", labelKey: "nav.transactions" },
  { href: "#roadmap",      labelKey: "nav.roadmap" },
];

const useSmoothScroll = () => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href?.startsWith("#")) return;

      e.preventDefault();
      const id = href.slice(1);
      const element = document.getElementById(id);

      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);
};

// Sub-Components
const BrandLogo: React.FC = () => (
  <Link href="/" className="flex items-center gap-1.5">
    <img 
      src="/favicon.ico" 
      alt="Logo" 
      className="w-8 h-8" 
    />
    <span 
      className="font-semibold tracking-wide" 
      style={{ color: "var(--primary-foreground)" }}
    >
      $LUDOMAN
    </span>
  </Link>
);

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ru" : "en");
  };

  return (
    <Button
      variant="no-hover-color"
      onClick={toggleLanguage}
      className="button-outline flex items-center gap-1.5 px-3"
      aria-label="Change language"
    >
      <Languages className="h-5 w-5" />
      <span className="text-xs font-bold" style={{ color: "var(--primary)" }}>
        {language.toUpperCase()}
      </span>
    </Button>
  );
};

const DesktopNav: React.FC = () => {
  const { t } = useLanguage();
  useSmoothScroll();

  return (
    <nav className="hidden items-center gap-6 text-sm md:flex" style={{ color: "var(--secondary)" }}>
      {NAV_LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="transition-colors hover:text-primary"
        >
          {t(link.labelKey)}
        </Link>
      ))}
    </nav>
  );
};

const MobileNav: React.FC = () => {
  const { t } = useLanguage();
  useSmoothScroll();

  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="no-hover-color" size="icon" className="button-outline" aria-label="Open menu">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Open menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="liquid-glass p-0 w-64 flex flex-col" style={{ borderColor: "var(--muted-foreground)" }}>
          <div className="flex items-center gap-1.5 px-4 py-4 border-b" style={{ borderColor: "var(--muted-foreground)" }}>
            <span className="font-semibold tracking-wide text-lg" style={{ color: "var(--primary-foreground)" }}>
              $LUDOMAN
            </span>
          </div>
          <nav className="flex flex-col gap-1 mt-2" style={{ color: "var(--secondary)" }}>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 px-4 py-3 transition-colors hover:text-[var(--primary)] hover:bg-[var(--sidebar-primary)]"
              >
                <span className="text-sm">{t(link.labelKey)}</span>
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
};

// Main Component
const SiteHeader: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 p-4">
      <div className="container mx-auto max-w-5xl">
        <div className="flex h-14 items-center justify-between px-6 liquid-glass-header rounded-full">
          <BrandLogo />
          <div className="flex items-center gap-3">
            <DesktopNav />
            <LanguageSwitcher />
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;