"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowUp,
  Mail,
  Heart,
  Sparkles,
  MapPin,
  type LucideIcon,
} from "lucide-react";

interface FooterLink {
  label: string;
  href: string;
}

interface SocialChannel {
  name: string;
  href: string;
  icon: LucideIcon | React.ComponentType<{ className?: string }>;
  isExternal?: boolean;
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
  { label: "Inicio", href: "#inicio" },
  { label: "Sobre mí", href: "#sobre-mi" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Testimonios", href: "#testimonios" },
  { label: "Experiencia", href: "#experiencia" },
  { label: "Contacto", href: "#contacto" },
];

const socialChannels: readonly SocialChannel[] = [
  {
    name: "GitHub",
    href: "https://github.com/luis-sdiaz",
    icon: GithubIcon,
    isExternal: true,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/luis-sdiaz",
    icon: LinkedinIcon,
    isExternal: true,
  },
  {
    name: "Correo Electrónico",
    href: "mailto:contacto@luis-diaz.dev",
    icon: Mail,
    isExternal: false,
  },
];

export default function Footer() {
  const [year, setYear] = useState<number>(2026);

  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      setYear(new Date().getFullYear());
    });
    return () => cancelAnimationFrame(frameId);
  }, []);

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
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          {/* Columna 1: Identidad y Ubicación */}
          <div className="space-y-4 md:col-span-5">
            <div className="flex items-center gap-3">
              <a
                href="#inicio"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface-muted font-mono text-base font-bold text-foreground transition-colors hover:border-border-hover hover:bg-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
                aria-label="Ir a la sección de inicio"
              >
                LD
              </a>
              <div>
                <span className="block text-base font-semibold tracking-tight text-foreground">
                  Luis Sebastián Díaz
                </span>
                <span className="block text-xs font-mono tracking-wider text-muted-foreground">
                  SOFTWARE ENGINEER
                </span>
              </div>
            </div>

            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Estudiante de Ingeniería de Software enfocado en soluciones Full-Stack,
              escritorio nativo e IoT.
            </p>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 text-foreground" aria-hidden="true" />
              <span>Pasto, Nariño, Colombia</span>
            </div>
          </div>

          {/* Columna 2: Enlaces Rápidos */}
          <div className="md:col-span-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Enlaces rápidos
            </h3>
            <ul className="mt-4 grid grid-cols-2 gap-2.5 text-sm" aria-label="Navegación del pie de página">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 3 }}
                    className="inline-block py-1 text-muted-foreground transition-colors hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring rounded"
                  >
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Conéctate y Volver Arriba */}
          <div className="space-y-4 md:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Conéctate
            </h3>
            <div className="flex items-center gap-3" aria-label="Canales sociales y de contacto">
              {socialChannels.map((channel) => {
                const IconComponent = channel.icon;
                return (
                  <motion.a
                    key={channel.name}
                    href={channel.href}
                    target={channel.isExternal ? "_blank" : undefined}
                    rel={channel.isExternal ? "noopener noreferrer" : undefined}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface-muted text-foreground transition-colors hover:border-border-hover hover:bg-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
                    aria-label={`${channel.name}${channel.isExternal ? " (se abre en una nueva pestaña)" : ""}`}
                  >
                    <IconComponent className="h-4 w-4" />
                  </motion.a>
                );
              })}
            </div>

            <div className="pt-2">
              <motion.button
                type="button"
                onClick={scrollToTop}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface-muted px-4 py-2.5 text-xs font-medium text-foreground transition-colors hover:border-border-hover hover:bg-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring cursor-pointer"
                aria-label="Volver al inicio de la página"
              >
                <ArrowUp className="h-4 w-4 text-foreground" aria-hidden="true" />
                <span>Volver arriba</span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Barra inferior de créditos */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {year} Luis Sebastián Díaz. Todos los derechos reservados.</p>
          <div className="flex items-center gap-2 text-muted-foreground">
            <span>Hecho con Next.js + Tailwind CSS</span>
            <Heart className="h-3.5 w-3.5 text-muted-foreground fill-muted-foreground/20" aria-hidden="true" />
            <Sparkles className="h-3.5 w-3.5 text-foreground" aria-hidden="true" />
          </div>
        </div>
      </div>
    </footer>
  );
}
