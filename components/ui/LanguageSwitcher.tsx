"use client";

import React, { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { syncThemeCookie } from "@/lib/theme-cookie";

export interface LanguageSwitcherProps {
  className?: string;
  onLocaleChange?: () => void;
}

export function LanguageSwitcher({
  className = "",
  onLocaleChange,
}: LanguageSwitcherProps) {
  const t = useTranslations("LanguageSwitcher");
  const currentLocale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSwitch = (nextLocale: Locale) => {
    if (nextLocale === currentLocale || isPending) return;

    onLocaleChange?.();
    syncThemeCookie();

    const search = typeof window !== "undefined" ? window.location.search : "";
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    const target = `${pathname}${search}${hash}`;

    startTransition(() => {
      router.replace(target, { locale: nextLocale });
    });
  };

  return (
    <div
      role="group"
      aria-label={t("label")}
      className={`inline-flex h-9 items-center rounded-xl border border-border bg-surface p-1 font-mono text-xs shadow-xs shrink-0 ${className}`}
    >
      {routing.locales.map((loc) => {
        const isActive = loc === currentLocale;
        const localeName = t(loc as "es" | "en");
        const actionLabel = isActive
          ? t("current", { locale: localeName })
          : t("switchTo", { locale: localeName });

        return (
          <button
            key={loc}
            type="button"
            disabled={isPending}
            aria-pressed={isActive}
            aria-label={actionLabel}
            title={actionLabel}
            onClick={() => handleSwitch(loc)}
            className={`relative inline-flex h-7 items-center justify-center rounded-lg px-2 text-[11px] font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring ${
              isActive
                ? "bg-surface-muted text-foreground border border-border/80 shadow-xs font-bold"
                : "text-muted-foreground hover:bg-surface-muted/60 hover:text-foreground"
            }`}
          >
            <span>{loc.toUpperCase()}</span>
          </button>
        );
      })}
    </div>
  );
}

export default LanguageSwitcher;
