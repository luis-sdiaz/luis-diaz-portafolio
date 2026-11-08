import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ThemeFlickerGuard } from "@/components/providers/ThemeFlickerGuard";
import { routing, type Locale } from "@/i18n/routing";
import { getMessages, setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import "./../globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";
  const siteUrl = "https://www.luis-diaz.dev";
  const canonicalUrl = isEn ? `${siteUrl}/en` : siteUrl;

  const title = isEn
    ? "Luis Sebastián Díaz | Software Engineer & Full-Stack Developer"
    : "Luis Sebastián Díaz | Software Engineer & Full-Stack Developer";

  const description = isEn
    ? "Professional portfolio of Luis Sebastián Díaz. Software Engineering student focused on building scalable digital architectures, native desktop software with Tauri 2, and embedded IoT systems."
    : "Portafolio profesional de Luis Sebastián Díaz. Estudiante de Ingeniería de Software enfocado en desarrollo web full-stack, software de escritorio con Tauri 2 y prototipado IoT.";

  const ogDescription = isEn
    ? "Full-stack software development, native desktop applications with Tauri 2, and interactive IoT hardware systems."
    : "Desarrollo de software full-stack, aplicaciones desktop con Tauri 2 y sistemas de hardware interactivo IoT.";

  const keywords = isEn
    ? [
        "Luis Sebastián Díaz",
        "Software Engineering",
        "Full-Stack Developer",
        "Next.js",
        "TypeScript",
        "Tauri 2",
        "ESP32",
        "IoT",
        "Pasto",
        "Colombia",
      ]
    : [
        "Luis Sebastián Díaz",
        "Ingeniería de Software",
        "Desarrollador Full-Stack",
        "Next.js",
        "TypeScript",
        "Tauri 2",
        "ESP32",
        "IoT",
        "Pasto",
        "Colombia",
      ];

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: "%s | Luis Díaz",
    },
    description,
    keywords,
    authors: [{ name: "Luis Sebastián Díaz", url: siteUrl }],
    creator: "Luis Sebastián Díaz",
    alternates: {
      canonical: canonicalUrl,
      languages: {
        es: siteUrl,
        en: `${siteUrl}/en`,
        "x-default": siteUrl,
      },
    },
    openGraph: {
      type: "website",
      locale: isEn ? "en_US" : "es_CO",
      url: canonicalUrl,
      title,
      description: ogDescription,
      siteName: "Luis Díaz Portfolio",
    },
    twitter: {
      card: "summary_large_image",
      title: isEn
        ? "Luis Sebastián Díaz | Software Engineer"
        : "Luis Sebastián Díaz | Software Engineer",
      description: ogDescription,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocalizedRootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }
  setRequestLocale(locale);
  const messages = await getMessages();

  // Leer preferencia de tema guardada en cookies para evitar desincronización de clase en HTML durante navegación
  const cookieStore = await cookies();
  const themePref = cookieStore.get("theme-preference")?.value;
  const isDark = themePref === "dark";
  const htmlClass = `scroll-pt-20 ${isDark ? "dark" : ""}`.trim();

  return (
    <html lang={locale} className={htmlClass} suppressHydrationWarning>
      <body
        className={`${inter.variable} min-h-screen bg-background font-sans text-foreground antialiased selection:bg-foreground selection:text-background transition-colors duration-300`}
      >
        <ThemeFlickerGuard />
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            storageKey="theme-preference"
          >
            <SmoothScroll>{children}</SmoothScroll>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
