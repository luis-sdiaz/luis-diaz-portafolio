"use client";

import { useState, useEffect, useRef, type MouseEvent } from "react";
import { FileDown, Menu, X } from "lucide-react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { useTranslations } from "next-intl";

interface NavItem {
  label: string;
  href: string;
}

export default function Navbar() {
  const t = useTranslations("Navbar");
  const navigationItems: NavItem[] = [
    { label: t("home"), href: "#inicio" },
    { label: t("about"), href: "#sobre-mi" },
    { label: t("projects"), href: "#proyectos" },
    { label: t("testimonials"), href: "#testimonios" },
    { label: t("experience"), href: "#experiencia" },
    { label: t("contact"), href: "#contacto" },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("#inicio");
  const navbarRef = useRef<HTMLElement | null>(null);
  const pendingNavigationRef = useRef<string | null>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const sectionIds = ["inicio", "sobre-mi", "proyectos", "testimonios", "experiencia", "contacto"];
    let animationFrameId: number | null = null;

    const updateActiveSection = () => {
      const navbarHeight = navbarRef.current?.getBoundingClientRect().height ?? 0;
      const scrollPaddingTop = Number.parseFloat(
        window.getComputedStyle(document.documentElement).scrollPaddingTop
      ) || 0;
      const activationLine = Math.max(navbarHeight, scrollPaddingTop);
      let currentSection = sectionIds[0];

      for (const sectionId of sectionIds) {
        const section = document.getElementById(sectionId);
        if (
          section &&
          Math.round(section.getBoundingClientRect().top) <= Math.round(activationLine)
        ) {
          currentSection = sectionId;
        } else {
          break;
        }
      }

      setActiveSection(pendingNavigationRef.current ?? `#${currentSection}`);
      animationFrameId = null;
    };

    const scheduleActiveSectionUpdate = () => {
      if (animationFrameId === null) {
        animationFrameId = window.requestAnimationFrame(updateActiveSection);
      }
    };

    const handleScrollEnd = () => {
      pendingNavigationRef.current = null;
      scheduleActiveSectionUpdate();
    };

    if (sectionIds.some((sectionId) => window.location.hash === `#${sectionId}`)) {
      setActiveSection(window.location.hash);
    }

    window.addEventListener("scroll", scheduleActiveSectionUpdate, { passive: true });
    window.addEventListener("scrollend", handleScrollEnd);
    window.addEventListener("resize", scheduleActiveSectionUpdate);
    window.addEventListener("hashchange", scheduleActiveSectionUpdate);
    scheduleActiveSectionUpdate();

    return () => {
      window.removeEventListener("scroll", scheduleActiveSectionUpdate);
      window.removeEventListener("scrollend", handleScrollEnd);
      window.removeEventListener("resize", scheduleActiveSectionUpdate);
      window.removeEventListener("hashchange", scheduleActiveSectionUpdate);
      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  const closeMenu = () => setIsOpen(false);

  const scrollToPendingSection = () => {
    const href = pendingNavigationRef.current;
    if (!href) return;

    document.getElementById(href.slice(1))?.scrollIntoView({ block: "start" });
  };

  const handleNavigationClick = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    event.preventDefault();
    pendingNavigationRef.current = href;
    setActiveSection(href);

    if (window.location.hash !== href) {
      window.history.pushState(null, "", href);
    }

    if (isOpen) {
      window.requestAnimationFrame(closeMenu);
    } else {
      window.requestAnimationFrame(scrollToPendingSection);
    }
  };

  return (
    <header
      ref={navbarRef}
      className="sticky top-0 z-50 border-b border-border bg-surface/85 backdrop-blur-md transition-colors duration-250"
    >
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
        <a
          href="#inicio"
          className="text-lg font-bold tracking-tight text-foreground transition-colors hover:text-accent-hover dark:hover:text-accent"
          aria-label={t("goHome")}
        >
          LD
        </a>

        <ul className="hidden items-center gap-3 text-xs font-medium md:flex lg:gap-5 lg:text-sm xl:gap-6">
          {navigationItems.map((item) => {
            const isActive = activeSection === item.href;
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={isActive ? "location" : undefined}
                  onClick={(event) => handleNavigationClick(event, item.href)}
                  className={`relative py-1 transition-colors ${
                    isActive
                      ? "text-accent-hover dark:text-accent font-semibold"
                      : "text-muted-foreground hover:text-accent-hover dark:hover:text-accent"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-accent"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-2.5">
          <LanguageSwitcher onLocaleChange={closeMenu} />
          <ThemeToggle />

          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-xl border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-foreground transition-all hover:border-accent/40 hover:bg-surface-muted hover:text-accent-hover dark:hover:text-accent shadow-sm md:inline-flex lg:px-3.5 lg:py-2"
          >
            <FileDown className="h-4 w-4" />
            <span>{t("viewCv")}</span>
          </a>

          <button
            type="button"
            className="rounded-xl p-2 text-muted-foreground transition-colors hover:bg-surface-muted hover:text-foreground md:hidden"
            aria-expanded={isOpen}
            aria-label={isOpen ? t("closeMenu") : t("openMenu")}
            aria-controls="mobile-navigation"
            onClick={() => setIsOpen((open) => !open)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence onExitComplete={scrollToPendingSection}>
        {isOpen && (
          <motion.div
            id="mobile-navigation"
            className="border-t border-border bg-surface/95 px-4 pb-4 backdrop-blur-md md:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ul className="mx-auto flex max-w-6xl flex-col gap-1 pt-3 text-sm font-medium text-foreground">
              {navigationItems.map((item) => {
                const isActive = activeSection === item.href;
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      aria-current={isActive ? "location" : undefined}
                      className={`block rounded-lg px-3 py-2 transition-colors ${
                        isActive
                          ? "bg-accent-subtle text-accent-hover dark:text-accent font-semibold"
                          : "text-muted-foreground hover:bg-surface-muted hover:text-foreground"
                      }`}
                      onClick={(event) => handleNavigationClick(event, item.href)}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
              <li className="pt-2 flex items-center justify-between gap-2 border-t border-border mt-1">
                <a
                  href="/cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-border bg-surface px-3 py-2.5 text-xs font-semibold text-foreground transition-colors hover:border-accent/40 hover:bg-surface-muted hover:text-accent-hover dark:hover:text-accent shadow-sm"
                  onClick={closeMenu}
                >
                  <FileDown className="h-4 w-4" />
                  <span>{t("viewCv")}</span>
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-accent"
        style={{ scaleX }}
        aria-hidden="true"
      />
    </header>
  );
}
