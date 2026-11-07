const config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        surface: "var(--surface)",
        surfaceMuted: "var(--surface-muted)",
        mutedForeground: "var(--muted-foreground)",
        border: "var(--border)",
        borderHover: "var(--border-hover)",
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
          hover: "var(--accent-hover)",
          muted: "var(--accent-muted)",
        },
        "accent-action": {
          DEFAULT: "var(--accent-action)",
          foreground: "var(--accent-action-foreground)",
          hover: "var(--accent-action-hover)",
        },
        focusRing: "var(--focus-ring)",
      },
      boxShadow: {
        glass: "var(--shadow-glass)",
        glow: "var(--shadow-glow)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
