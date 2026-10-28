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
        background: "#09090b",
        surface: "#121216",
        surfaceLight: "#18181b",
        accent: {
          DEFAULT: "#10b981",
          hover: "#059669",
          glow: "rgba(16, 185, 129, 0.15)",
        },
        border: "rgba(255, 255, 255, 0.08)",
        borderHover: "rgba(255, 255, 255, 0.16)",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        glow: "0 0 25px -5px rgba(16, 185, 129, 0.3)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
