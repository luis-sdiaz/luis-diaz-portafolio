"use client";

import React, { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export interface ThemeToggleProps {
  className?: string;
}

const emptySubscribe = () => () => {};

function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const mounted = useMounted();

  const currentTheme = mounted ? (resolvedTheme || theme) : "light";
  const isDark = currentTheme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  const label = !mounted
    ? "Alternar tema visual"
    : isDark
    ? "Cambiar a modo claro"
    : "Cambiar a modo oscuro";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className={`relative inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-surface text-foreground transition-all duration-200 hover:border-border-hover hover:bg-surface-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring cursor-pointer shrink-0 ${className}`}
    >
      <span className="sr-only">{label}</span>
      {/* Icono de Sol (Modo Claro) */}
      <Sun
        className={`h-4 w-4 transition-transform duration-300 ${
          mounted && isDark
            ? "rotate-90 scale-0 opacity-0 absolute"
            : "rotate-0 scale-100 opacity-100"
        }`}
        aria-hidden="true"
      />
      {/* Icono de Luna (Modo Oscuro) */}
      <Moon
        className={`h-4 w-4 transition-transform duration-300 ${
          mounted && isDark
            ? "rotate-0 scale-100 opacity-100"
            : "-rotate-90 scale-0 opacity-0 absolute"
        }`}
        aria-hidden="true"
      />
    </button>
  );
}

export default ThemeToggle;
