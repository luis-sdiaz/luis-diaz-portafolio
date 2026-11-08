export function syncThemeCookie(theme?: string) {
  if (typeof document === "undefined") return;
  try {
    const currentTheme =
      theme ||
      localStorage.getItem("theme-preference") ||
      (document.documentElement.classList.contains("dark") ? "dark" : "light");

    document.cookie = `theme-preference=${currentTheme}; path=/; max-age=31536000; SameSite=Lax`;
  } catch {}
}
