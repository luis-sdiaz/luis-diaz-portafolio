"use client";

import { useEffect } from "react";

export function ThemeFlickerGuard() {
  useEffect(() => {
    if (typeof window === "undefined" || typeof MutationObserver === "undefined") {
      return;
    }

    const html = document.documentElement;

    const enforceTheme = () => {
      try {
        const storedTheme = localStorage.getItem("theme-preference");
        if (storedTheme === "dark" && !html.classList.contains("dark")) {
          html.classList.add("dark");
          html.classList.remove("light");
        } else if (storedTheme === "light" && html.classList.contains("dark")) {
          html.classList.remove("dark");
        }
      } catch {}
    };

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "attributes" && mutation.attributeName === "class") {
          enforceTheme();
        }
      }
    });

    observer.observe(html, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
}

export default ThemeFlickerGuard;
