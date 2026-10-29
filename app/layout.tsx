import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.luis-diaz.dev"),
  title: {
    default: "Luis Sebastián Díaz | Software Engineer & Full-Stack Developer",
    template: "%s | Luis Díaz",
  },
  description:
    "Portafolio profesional de Luis Sebastián Díaz. Estudiante de Ingeniería de Software enfocado en desarrollo web full-stack, software de escritorio con Tauri 2 y prototipado IoT.",
  keywords: [
    "Luis Sebastián Díaz",
    "Ingeniería de Software",
    "Next.js",
    "TypeScript",
    "Tauri 2",
    "ESP32",
    "Pasto",
    "Colombia",
  ],
  authors: [{ name: "Luis Sebastián Díaz", url: "https://www.luis-diaz.dev" }],
  creator: "Luis Sebastián Díaz",
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "https://www.luis-diaz.dev",
    title: "Luis Sebastián Díaz | Software Engineer & Full-Stack Developer",
    description:
      "Desarrollo de software full-stack, aplicaciones desktop con Tauri 2 y sistemas de hardware interactivo IoT.",
    siteName: "Luis Díaz Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luis Sebastián Díaz | Software Engineer",
    description:
      "Desarrollo de software full-stack, aplicaciones desktop con Tauri 2 y sistemas de hardware interactivo IoT.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth scroll-pt-20" suppressHydrationWarning>
      <body
        className={`${inter.variable} min-h-screen bg-[#09090b] font-sans text-zinc-100 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
