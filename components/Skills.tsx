"use client";

import React from "react";
import { Layout, Cpu, Database, ShieldCheck, Sparkles } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { useTranslations } from "next-intl";

type CategoryKey = "frontend" | "desktop" | "backend" | "quality";

/* =========================================================================
   MINI-ILUSTRACIONES TÉCNICAS: ENGINEERING BLUEPRINT
   Ilustraciones minimalistas SVG vectoriales dedicadas para cada módulo
   ========================================================================= */

/** 1. Frontend & UI: Ventana esquemática de navegador con wireframe UI */
function FrontendIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Marco de ventana de navegador esquemática */}
      <rect
        x="2"
        y="3"
        width="116"
        height="66"
        rx="5"
        className="stroke-border dark:stroke-border-hover/80 fill-background/70 dark:fill-surface-muted/40 transition-colors"
        strokeWidth="1.2"
      />
      {/* Barra superior de la ventana */}
      <line
        x1="2"
        y1="16"
        x2="118"
        y2="16"
        className="stroke-border dark:stroke-border-hover/60"
        strokeWidth="1.2"
      />
      {/* Controles de ventana (3 puntos) */}
      <circle cx="9" cy="9.5" r="1.8" className="fill-accent transition-colors" />
      <circle cx="15" cy="9.5" r="1.5" className="fill-border-hover dark:fill-border" />
      <circle cx="20" cy="9.5" r="1.5" className="fill-border-hover dark:fill-border" />

      {/* Barra de URL esquemática */}
      <rect
        x="30"
        y="6.5"
        width="58"
        height="6"
        rx="2"
        className="fill-surface-muted/80 dark:fill-surface stroke-border/60"
        strokeWidth="0.8"
      />
      <line
        x1="34"
        y1="9.5"
        x2="48"
        y2="9.5"
        className="stroke-accent/70"
        strokeWidth="1"
        strokeLinecap="round"
      />

      {/* Sidebar esquemático */}
      <rect
        x="7"
        y="21"
        width="22"
        height="43"
        rx="3"
        className="fill-surface-muted/50 dark:fill-surface/60 stroke-border/50"
        strokeWidth="0.8"
        strokeDasharray="2 2"
      />
      <line
        x1="11"
        y1="27"
        x2="23"
        y2="27"
        className="stroke-muted-foreground/40"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <line
        x1="11"
        y1="33"
        x2="21"
        y2="33"
        className="stroke-muted-foreground/30"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <line
        x1="11"
        y1="39"
        x2="24"
        y2="39"
        className="stroke-muted-foreground/30"
        strokeWidth="1"
        strokeLinecap="round"
      />

      {/* Bloque Hero superior */}
      <rect
        x="34"
        y="21"
        width="79"
        height="20"
        rx="3"
        className="fill-accent/[0.08] dark:fill-accent/[0.12] stroke-accent/30 transition-colors group-hover:stroke-accent/60"
        strokeWidth="1"
      />
      <rect x="39" y="26" width="34" height="3" rx="1.5" className="fill-accent/90" />
      <rect
        x="39"
        y="32"
        width="46"
        height="2"
        rx="1"
        className="fill-muted-foreground/40 dark:fill-zinc-600"
      />
      {/* Botón / Pill de acción */}
      <rect
        x="94"
        y="26"
        width="14"
        height="9"
        rx="2"
        className="fill-accent/20 stroke-accent/50"
        strokeWidth="0.8"
      />

      {/* Tarjeta de contenido inferior izquierda */}
      <rect
        x="34"
        y="45"
        width="37"
        height="19"
        rx="3"
        className="fill-background/80 dark:fill-surface-muted/50 stroke-border/80"
        strokeWidth="0.9"
      />
      <circle cx="41" cy="51" r="2.5" className="stroke-accent/60 fill-accent/20" strokeWidth="0.8" />
      <line
        x1="47"
        y1="51"
        x2="65"
        y2="51"
        className="stroke-muted-foreground/40"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <line
        x1="39"
        y1="58"
        x2="62"
        y2="58"
        className="stroke-muted-foreground/30"
        strokeWidth="1"
        strokeLinecap="round"
      />

      {/* Tarjeta de contenido inferior derecha */}
      <rect
        x="76"
        y="45"
        width="37"
        height="19"
        rx="3"
        className="fill-background/80 dark:fill-surface-muted/50 stroke-border/80"
        strokeWidth="0.9"
      />
      <rect
        x="81"
        y="49"
        width="18"
        height="2.5"
        rx="1"
        className="fill-muted-foreground/40"
      />
      <rect
        x="81"
        y="55"
        width="27"
        height="4"
        rx="1.5"
        className="fill-accent/40 group-hover:fill-accent/80 transition-colors"
      />
    </svg>
  );
}

/** 2. Desktop & IoT: Microcontrolador / MCU con bus de datos y antena de telemetría */
function DesktopIotIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Microcontrolador / Chip ESP32 a la izquierda */}
      <rect
        x="8"
        y="14"
        width="38"
        height="44"
        rx="4"
        className="fill-background/80 dark:fill-surface-muted/60 stroke-border dark:stroke-border-hover/80"
        strokeWidth="1.2"
      />
      {/* Pines de conexión superiores */}
      <line x1="14" y1="10" x2="14" y2="14" className="stroke-muted-foreground/50" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="21" y1="10" x2="21" y2="14" className="stroke-muted-foreground/50" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="28" y1="10" x2="28" y2="14" className="stroke-accent" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="35" y1="10" x2="35" y2="14" className="stroke-muted-foreground/50" strokeWidth="1.5" strokeLinecap="round" />

      {/* Pines de conexión inferiores */}
      <line x1="14" y1="58" x2="14" y2="62" className="stroke-muted-foreground/50" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="21" y1="58" x2="21" y2="62" className="stroke-muted-foreground/50" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="28" y1="58" x2="28" y2="62" className="stroke-muted-foreground/50" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="35" y1="58" x2="35" y2="62" className="stroke-accent" strokeWidth="1.5" strokeLinecap="round" />

      {/* Núcleo interno del MCU */}
      <rect
        x="15"
        y="22"
        width="24"
        height="28"
        rx="2"
        className="fill-accent/[0.08] dark:fill-accent/[0.15] stroke-accent/40"
        strokeWidth="1"
      />
      <circle cx="20" cy="27" r="1.5" className="fill-accent" />
      <rect x="24" y="26" width="11" height="2" rx="1" className="fill-accent/80" />
      <line x1="20" y1="33" x2="34" y2="33" className="stroke-muted-foreground/40" strokeWidth="1" />
      <line x1="20" y1="38" x2="31" y2="38" className="stroke-muted-foreground/40" strokeWidth="1" />
      <line x1="20" y1="43" x2="28" y2="43" className="stroke-accent/70" strokeWidth="1" />

      {/* Trazas de bus de circuito impreso (PCB) */}
      <path
        d="M46 25 H64 L72 18 H86"
        className="stroke-border dark:stroke-border-hover/80"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <circle cx="64" cy="25" r="1.5" className="fill-border-hover dark:fill-border" />

      <path
        d="M46 36 H86"
        className="stroke-accent/80 group-hover:stroke-accent transition-colors"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle
        cx="62"
        cy="36"
        r="2"
        className="fill-accent group-hover:scale-125 transition-transform origin-center"
      />

      <path
        d="M46 47 H64 L72 54 H86"
        className="stroke-border dark:stroke-border-hover/80"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <circle cx="64" cy="47" r="1.5" className="fill-border-hover dark:fill-border" />

      {/* Dispositivo receptor / Módulo de telemetría a la derecha */}
      <rect
        x="86"
        y="18"
        width="26"
        height="36"
        rx="4"
        className="fill-background/80 dark:fill-surface-muted/60 stroke-border dark:stroke-border-hover/80"
        strokeWidth="1.2"
      />
      <circle cx="95" cy="28" r="3" className="stroke-accent/60 fill-accent/20" strokeWidth="1" />
      <line
        x1="91"
        y1="37"
        x2="107"
        y2="37"
        className="stroke-muted-foreground/40"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <line
        x1="91"
        y1="44"
        x2="103"
        y2="44"
        className="stroke-muted-foreground/30"
        strokeWidth="1"
        strokeLinecap="round"
      />

      {/* Ondas esquemáticas de señal / conectividad */}
      <path
        d="M104 24 C107 26.5 107 31.5 104 34"
        className="stroke-accent/60"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M108 21 C112 25 112 33 108 37"
        className="stroke-accent group-hover:stroke-accent-hover transition-colors"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** 3. Backend & Datos: Servidor / Microservicio conectado a base de datos cilíndrica */
function BackendIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Servidor / Microservicio a la izquierda */}
      <rect
        x="8"
        y="14"
        width="34"
        height="44"
        rx="4"
        className="fill-background/80 dark:fill-surface-muted/60 stroke-border dark:stroke-border-hover/80"
        strokeWidth="1.2"
      />
      {/* Bahías de rack */}
      <rect
        x="13"
        y="19"
        width="24"
        height="9"
        rx="2"
        className="fill-surface-muted/60 dark:fill-surface stroke-border/70"
        strokeWidth="0.8"
      />
      <circle cx="17" cy="23.5" r="1.5" className="fill-accent" />
      <line
        x1="22"
        y1="23.5"
        x2="32"
        y2="23.5"
        className="stroke-muted-foreground/40"
        strokeWidth="1"
        strokeLinecap="round"
      />

      <rect
        x="13"
        y="31"
        width="24"
        height="9"
        rx="2"
        className="fill-surface-muted/60 dark:fill-surface stroke-border/70"
        strokeWidth="0.8"
      />
      <circle cx="17" cy="35.5" r="1.5" className="fill-emerald-500 dark:fill-emerald-400" />
      <line
        x1="22"
        y1="35.5"
        x2="30"
        y2="35.5"
        className="stroke-muted-foreground/40"
        strokeWidth="1"
        strokeLinecap="round"
      />

      <rect
        x="13"
        y="43"
        width="24"
        height="9"
        rx="2"
        className="fill-surface-muted/60 dark:fill-surface stroke-border/70"
        strokeWidth="0.8"
      />
      <circle cx="17" cy="47.5" r="1.5" className="fill-accent/70" />
      <line
        x1="22"
        y1="47.5"
        x2="28"
        y2="47.5"
        className="stroke-muted-foreground/40"
        strokeWidth="1"
        strokeLinecap="round"
      />

      {/* Flujo de datos y nodo API Gateway central */}
      <path
        d="M42 28 H62 L66 32"
        className="stroke-border dark:stroke-border-hover/80"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <circle
        cx="53"
        cy="28"
        r="1.8"
        className="fill-accent group-hover:scale-125 transition-transform origin-center"
      />

      <rect
        x="52"
        y="32"
        width="18"
        height="8"
        rx="4"
        className="fill-accent/[0.12] dark:fill-accent/[0.2] stroke-accent/50"
        strokeWidth="0.8"
      />
      <circle cx="57" cy="36" r="1.2" className="fill-accent" />
      <circle cx="61" cy="36" r="1.2" className="fill-accent" />
      <circle cx="65" cy="36" r="1.2" className="fill-accent" />

      <path
        d="M66 40 L62 44 H42"
        className="stroke-border dark:stroke-border-hover/80"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <circle cx="49" cy="44" r="1.5" className="fill-emerald-500/80" />

      {/* Base de Datos Cilíndrica (Storage Platters) a la derecha */}
      <ellipse
        cx="98"
        y="21"
        rx="15"
        ry="5.5"
        className="fill-accent/[0.08] dark:fill-accent/[0.15] stroke-accent/60"
        strokeWidth="1.2"
      />
      <path
        d="M83 21 V51 C83 56 113 56 113 51 V21"
        className="stroke-border dark:stroke-border-hover/80 fill-background/60 dark:fill-surface-muted/40"
        strokeWidth="1.2"
      />
      <path
        d="M83 31 C83 36 113 36 113 31"
        className="stroke-border dark:stroke-border-hover/70"
        strokeWidth="1"
      />
      <path
        d="M83 41 C83 46 113 46 113 41"
        className="stroke-accent/70 group-hover:stroke-accent transition-colors"
        strokeWidth="1.2"
      />
      <circle cx="98" cy="43.5" r="1.6" className="fill-accent" />
    </svg>
  );
}

/** 4. Calidad & Entorno: Panel de ejecución de pruebas y escudo de verificación */
function QualityIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Terminal / Panel de código de pruebas a la izquierda */}
      <rect
        x="6"
        y="12"
        width="60"
        height="48"
        rx="5"
        className="fill-background/80 dark:fill-surface-muted/60 stroke-border dark:stroke-border-hover/80"
        strokeWidth="1.2"
      />
      {/* Barra de título del panel */}
      <line
        x1="6"
        y1="22"
        x2="66"
        y2="22"
        className="stroke-border dark:stroke-border-hover/60"
        strokeWidth="1"
      />
      {/* Prompt de terminal '>' */}
      <path
        d="M12 17 L15 18.5 L12 20"
        className="stroke-accent"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="18"
        y1="18.5"
        x2="26"
        y2="18.5"
        className="stroke-muted-foreground/40"
        strokeWidth="1"
        strokeLinecap="round"
      />

      {/* Test 1: PASS */}
      <circle cx="14" cy="29" r="2.5" className="fill-emerald-500/20 stroke-emerald-500" strokeWidth="0.8" />
      <path
        d="M12.8 29 L13.6 29.8 L15.2 28.2"
        className="stroke-emerald-600 dark:stroke-emerald-400"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="20" y="27.5" width="26" height="3" rx="1.5" className="fill-muted-foreground/35 dark:fill-zinc-600" />

      {/* Test 2: PASS */}
      <circle cx="14" cy="38" r="2.5" className="fill-emerald-500/20 stroke-emerald-500" strokeWidth="0.8" />
      <path
        d="M12.8 38 L13.6 38.8 L15.2 37.2"
        className="stroke-emerald-600 dark:stroke-emerald-400"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="20" y="36.5" width="34" height="3" rx="1.5" className="fill-muted-foreground/35 dark:fill-zinc-600" />

      {/* Test 3: ASSERTION PASS */}
      <circle cx="14" cy="47" r="2.5" className="fill-accent/20 stroke-accent" strokeWidth="0.8" />
      <path
        d="M12.8 47 L13.6 47.8 L15.2 46.2"
        className="stroke-accent"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="20" y="45.5" width="22" height="3" rx="1.5" className="fill-accent/60" />

      {/* Conector técnico punteado hacia el escudo */}
      <path
        d="M66 36 H78"
        className="stroke-border dark:stroke-border-hover/80"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeDasharray="2 2"
      />
      <circle
        cx="78"
        cy="36"
        r="2"
        className="fill-accent group-hover:scale-125 transition-transform origin-center"
      />

      {/* Escudo de Calidad / Verificación a la derecha */}
      <path
        d="M96 16 L112 22 V36 C112 47 96 55 96 55 C96 55 80 47 80 36 V22 Z"
        className="fill-accent/[0.08] dark:fill-accent/[0.15] stroke-accent/50 group-hover:stroke-accent transition-colors"
        strokeWidth="1.4"
      />
      <path
        d="M89 35.5 L94 40.5 L103 30.5"
        className="stroke-accent group-hover:stroke-accent-hover transition-colors"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* =========================================================================
   DEFINICIÓN DE CATEGORÍAS
   ========================================================================= */

interface SkillCategory {
  key: CategoryKey;
  icon: typeof Layout;
  skills: readonly string[];
  illustration: React.ComponentType<{ className?: string }>;
}

const skillCategories: readonly SkillCategory[] = [
  {
    key: "frontend",
    icon: Layout,
    skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    illustration: FrontendIllustration,
  },
  {
    key: "desktop",
    icon: Cpu,
    skills: ["Tauri 2", "ESP32", "Arduino Uno", "C++ / Firmware"],
    illustration: DesktopIotIllustration,
  },
  {
    key: "backend",
    icon: Database,
    skills: ["Node.js", "PostgreSQL", "Supabase", "REST APIs"],
    illustration: BackendIllustration,
  },
  {
    key: "quality",
    icon: ShieldCheck,
    skills: ["Vitest", "Testing Library", "Git", "PowerShell", "ESLint"],
    illustration: QualityIllustration,
  },
] as const;

export default function Skills() {
  const t = useTranslations("Skills");

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12"
    >
      {/* Resplandor ambiental superior coherente con la sección Sobre mí */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-6 -z-10 h-48 w-80 -translate-x-1/2 rounded-full bg-accent/5 blur-3xl dark:bg-accent/10"
      />

      {/* Encabezado compacto de la sección */}
      <div className="mx-auto max-w-3xl text-center">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground shadow-2xs">
          <Sparkles className="h-3 w-3 text-accent" aria-hidden="true" />
          <span>{t("sectionLabel")}</span>
        </div>

        <h2
          id="skills-heading"
          className="mt-2 text-xl font-extrabold tracking-[-0.03em] text-foreground sm:text-2xl lg:text-3xl"
        >
          {t("title")}{" "}
          <span className="text-accent">{t("titleHighlight")}</span>
        </h2>

        <p className="mx-auto mt-1.5 max-w-2xl text-xs leading-normal text-muted-foreground sm:text-sm">
          {t("subtitle")}
        </p>
      </div>

      {/* Grid 2x2 de Módulos Tecnológicos Compactos */}
      <div className="mt-6 grid gap-3.5 sm:grid-cols-2 lg:gap-4">
        {skillCategories.map((category, idx) => {
          const Icon = category.icon;
          const Illustration = category.illustration;

          return (
            <SpotlightCard
              key={category.key}
              delay={idx * 0.06}
              className="group flex h-full flex-col justify-between rounded-xl border border-accent/35 bg-surface shadow-[0_2px_14px_-3px_rgba(24,24,27,0.05)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-accent/70 hover:shadow-[0_8px_24px_-6px_rgba(234,88,12,0.12)] dark:border-accent/30 dark:bg-surface dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.5)] dark:hover:border-accent/65 dark:hover:shadow-[0_8px_24px_-6px_rgba(0,0,0,0.8)] motion-reduce:transform-none"
            >
              <div className="flex h-full flex-col justify-between">
                {/* ZONA SUPERIOR COMPACTA: Icono, Título, Descripción, Índice y Mini-Ilustración Blueprint */}
                <div className="relative overflow-hidden bg-gradient-to-b from-surface-warm/85 via-surface to-surface p-3.5 pb-2.5 sm:p-4 sm:pb-3 dark:from-accent/[0.07] dark:via-surface dark:to-surface">
                  {/* Resplandor ambiental interno suave tras el icono */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -left-6 -top-6 h-24 w-24 rounded-full bg-accent/[0.07] blur-xl transition-opacity duration-300 group-hover:opacity-100 dark:bg-accent/[0.1]"
                  />

                  <div className="relative z-10 flex items-start justify-between gap-2.5 sm:gap-3">
                    {/* Columna Izquierda: Icono + Título + Descripción */}
                    <div className="flex flex-1 items-start gap-2.5 sm:gap-3 min-w-0">
                      {/* Contenedor del Icono Proporcional */}
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-accent/25 bg-accent/10 text-accent shadow-2xs transition-all duration-300 group-hover:scale-105 group-hover:border-accent/50 group-hover:bg-accent/[0.16] dark:border-accent/30 dark:bg-accent/15 dark:group-hover:bg-accent/20 motion-reduce:transform-none">
                        <Icon className="h-4.5 w-4.5 text-accent transition-colors" aria-hidden="true" />
                      </div>

                      {/* Título y Descripción con límite de líneas seguro y tipografía concisa */}
                      <div className="space-y-0.5 min-w-0">
                        <h3 className="text-[14px] sm:text-[15px] font-bold tracking-tight text-foreground transition-colors duration-200 group-hover:text-accent truncate sm:whitespace-normal">
                          {t(`categories.${category.key}.title`)}
                        </h3>
                        <p className="text-[11px] sm:text-xs leading-snug text-muted-foreground line-clamp-2">
                          {t(`categories.${category.key}.description`)}
                        </p>
                      </div>
                    </div>

                    {/* Columna Derecha: Índice Numérico + Mini-Ilustración Blueprint Proporcionada */}
                    <div className="flex shrink-0 flex-col items-end gap-1">
                      <span className="rounded border border-border/80 bg-background/90 px-1.5 py-0.5 font-mono text-[9px] font-semibold text-muted-foreground/90 backdrop-blur-xs shadow-2xs transition-colors duration-200 group-hover:border-accent/40 group-hover:text-accent">
                        {`0${idx + 1}`}
                      </span>

                      {/* Contenedor compacto con relación de aspecto exacta para blueprint SVG */}
                      <div className="w-[74px] h-[44px] sm:w-[86px] sm:h-[52px] transition-transform duration-300 group-hover:scale-[1.03] motion-reduce:transform-none">
                        <Illustration className="h-full w-full" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* DIVISOR SUTIL ENTRE ZONAS */}
                <div
                  className="relative h-px w-full bg-gradient-to-r from-border/80 via-border/50 to-transparent dark:from-border/50 dark:via-border/25 dark:to-transparent"
                  aria-hidden="true"
                >
                  <div className="absolute left-4 top-0 h-px w-10 bg-gradient-to-r from-accent/70 to-transparent" />
                </div>

                {/* ZONA INFERIOR COMPACTA: Etiquetas de Tecnologías */}
                <div className="flex flex-1 flex-col justify-between bg-surface/95 p-3.5 pt-2.5 sm:p-4 sm:pt-3 dark:bg-surface/50">
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="cursor-default rounded-md border border-border/80 bg-surface-muted/90 px-2 py-0.5 sm:px-2.5 sm:py-0.5 font-mono text-[11px] sm:text-xs font-medium text-foreground/90 shadow-2xs transition-colors duration-200 hover:border-accent/50 hover:bg-surface-warm/80 hover:text-accent dark:bg-surface-muted/60 dark:border-border/60 dark:hover:bg-accent/10 dark:hover:text-accent motion-reduce:transition-none"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </SpotlightCard>
          );
        })}
      </div>
    </section>
  );
}
