"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowUp,
  Mail,
  Heart,
  Sparkles,
  MapPin,
  Check,
  type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { CONTACT_DATA } from "@/data/contact";

interface FooterLink {
  labelKey: string;
  href: string;
}

interface SocialChannel {
  name: string;
  href: string;
  icon: LucideIcon | React.ComponentType<{ className?: string }>;
}

function GithubIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const quickLinks: readonly FooterLink[] = [
  { labelKey: "links.home", href: "#inicio" },
  { labelKey: "links.about", href: "#sobre-mi" },
  { labelKey: "links.projects", href: "#proyectos" },
  { labelKey: "links.testimonials", href: "#testimonios" },
  { labelKey: "links.experience", href: "#experiencia" },
  { labelKey: "links.contact", href: "#contacto" },
];

const socialLinks: readonly SocialChannel[] = [
  {
    name: "GitHub",
    href: CONTACT_DATA.github.url,
    icon: GithubIcon,
  },
  {
    name: "LinkedIn",
    href: CONTACT_DATA.linkedin.url,
    icon: LinkedinIcon,
  },
];

export default function Footer() {
  const t = useTranslations("Footer");
  const [year, setYear] = useState<number>(2026);
  const [hasCopiedEmail, setHasCopiedEmail] = useState(false);

  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      setYear(new Date().getFullYear());
    });
    return () => cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    if (!hasCopiedEmail) return;
    const timer = setTimeout(() => {
      setHasCopiedEmail(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [hasCopiedEmail]);

  const copyEmailToClipboard = async () => {
    const email = CONTACT_DATA.email.address;
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = email;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        const successful = document.execCommand("copy");
        document.body.removeChild(textArea);
        if (!successful) throw new Error("Copy failed");
      }
      setHasCopiedEmail(true);
      toast.success(t("emailCopied"), {
        description: email,
      });
    } catch {
      toast.error(t("emailCopyError"), {
        description: email,
      });
    }
  };

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer
      className="relative border-t border-border bg-surface text-foreground backdrop-blur-md overflow-hidden transition-colors duration-250"
      role="contentinfo"
    >
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          {/* Columna 1: Identidad y Ubicación */}
          <div className="space-y-3.5 md:col-span-5">
            <div className="flex items-center gap-3">
              <a
                href="#inicio"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-surface-muted font-mono text-sm font-bold text-foreground transition-colors hover:border-border-hover hover:bg-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
                aria-label={t("homeAriaLabel")}
              >
                LD
              </a>
              <div>
                <span className="block text-sm sm:text-base font-semibold tracking-tight text-foreground">
                  Luis Sebastián Díaz
                </span>
                <span className="mt-0.5 block text-xs font-medium text-muted-foreground">
                  {t("role")}
                </span>
              </div>
            </div>

            <p className="max-w-sm text-xs sm:text-sm leading-relaxed text-muted-foreground">
              {t("bio")}
            </p>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 text-foreground" aria-hidden="true" />
              <span>{t("location")}</span>
            </div>
          </div>

          {/* Columna 2: Enlaces Rápidos */}
          <div className="md:col-span-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {t("quickLinksTitle")}
            </h3>
            <ul className="mt-3.5 grid grid-cols-2 gap-2 text-xs sm:text-sm" aria-label={t("quickLinksAriaLabel")}>
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 3 }}
                    className="inline-block py-0.5 text-muted-foreground transition-colors hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring rounded"
                  >
                    {t(link.labelKey as Parameters<typeof t>[0])}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Conéctate y Volver Arriba */}
          <div className="space-y-3.5 md:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {t("connectTitle")}
            </h3>
            <div className="flex items-center gap-2.5" aria-label={t("socialAriaLabel")}>
              {socialLinks.map((channel) => {
                const IconComponent = channel.icon;
                return (
                  <motion.a
                    key={channel.name}
                    href={channel.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-surface-muted text-foreground transition-all hover:border-accent/40 hover:bg-accent-subtle hover:text-accent-hover dark:hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
                    aria-label={`${channel.name} ${t("externalTab")}`}
                    title={channel.name}
                  >
                    <IconComponent className="h-4 w-4" />
                  </motion.a>
                );
              })}

              <motion.button
                type="button"
                onClick={copyEmailToClipboard}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring cursor-pointer ${
                  hasCopiedEmail
                    ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 dark:border-emerald-500/40"
                    : "border-border bg-surface-muted text-foreground hover:border-accent/40 hover:bg-accent-subtle hover:text-accent-hover dark:hover:text-accent"
                }`}
                aria-label={hasCopiedEmail ? t("copied") : t("copyEmailAria")}
                title={hasCopiedEmail ? t("copied") : `${t("copyEmail")} (${CONTACT_DATA.email.address})`}
              >
                {hasCopiedEmail ? (
                  <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                ) : (
                  <Mail className="h-4 w-4" aria-hidden="true" />
                )}
              </motion.button>
            </div>

            <div className="pt-1.5">
              <motion.button
                type="button"
                onClick={scrollToTop}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface-muted px-3.5 py-2 text-xs font-medium text-foreground transition-all hover:border-accent/40 hover:bg-surface hover:text-accent-hover dark:hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring cursor-pointer"
                aria-label={t("scrollTopAriaLabel")}
              >
                <ArrowUp className="h-4 w-4 text-foreground" aria-hidden="true" />
                <span>{t("scrollTopButton")}</span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Barra inferior de créditos */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-border pt-5 text-xs text-muted-foreground sm:flex-row">
          <p>{t("copyright", { year })}</p>
          <div className="flex items-center gap-2 text-muted-foreground">
            <span>{t("builtWith")}</span>
            <Heart className="h-3.5 w-3.5 text-muted-foreground fill-muted-foreground/20" aria-hidden="true" />
            <Sparkles className="h-3.5 w-3.5 text-foreground" aria-hidden="true" />
          </div>
        </div>
      </div>
    </footer>
  );
}
