"use client";

import React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  MapPin,
  GraduationCap,
  Cpu,
  Terminal,
  Sparkles,
} from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { InteractiveTerminal } from "@/components/ui/interactive-terminal";
import { InfiniteMarquee } from "@/components/ui/infinite-marquee";
import { useTranslations } from "next-intl";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function About() {
  const t = useTranslations("About");
  const shouldReduceMotion = useReducedMotion();

  const quickFacts = [
    {
      id: "location",
      label: t("facts.locationLabel"),
      value: t("facts.locationValue"),
      icon: MapPin,
    },
    {
      id: "education",
      label: t("facts.educationLabel"),
      value: t("facts.educationValue"),
      icon: GraduationCap,
    },
    {
      id: "focus",
      label: t("facts.focusLabel"),
      value: t("facts.focusValue"),
      icon: Cpu,
    },
    {
      id: "status",
      label: t("facts.statusLabel"),
      value: t("facts.statusValue"),
      icon: Terminal,
    },
  ];

  return (
    <section
      id="sobre-mi"
      aria-labelledby="about-title"
      className="relative mx-auto max-w-6xl overflow-hidden px-4 py-14 sm:px-6 sm:py-18 lg:px-8 lg:py-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-96 w-full max-w-4xl -translate-x-1/2 bg-accent/5 blur-3xl"
      />

      <motion.div
        variants={containerVariants}
        initial={shouldReduceMotion ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="space-y-12 sm:space-y-14"
      >
        {/* Encabezado */}
        <motion.div variants={itemVariants} className="space-y-3.5 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold uppercase tracking-wide text-foreground shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
            <span>{t("sectionLabel")}</span>
          </div>

          <h2
            id="about-title"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground"
          >
            {t("title")}{" "}
            <span className="bg-gradient-to-r from-foreground via-zinc-600 to-muted-foreground dark:from-foreground dark:via-zinc-300 dark:to-zinc-500 bg-clip-text text-transparent">
              {t("titleHighlight")}
            </span>
          </h2>

          <p className="mx-auto max-w-2xl text-sm sm:text-base text-muted-foreground">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Contenido Bento Grid */}
        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-10">
          {/* Columna Izquierda: Consola de Telemetría Interactiva */}
          <div className="flex justify-center lg:col-span-5">
            <InteractiveTerminal />
          </div>

          {/* Columna Derecha: Resumen y Quick Facts con SpotlightCard */}
          <motion.div
            variants={itemVariants}
            className="space-y-5 lg:col-span-7"
          >
            <div className="space-y-3">
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                {t("bioTitle")}
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                {t("bio")}
              </p>
            </div>

            {/* Quick Facts con SpotlightCard y Entrada Escalonada */}
            <div className="grid grid-cols-1 gap-3 pt-1 sm:grid-cols-2">
              {quickFacts.map((fact, idx) => {
                const Icon = fact.icon;
                return (
                  <SpotlightCard
                    key={fact.id}
                    delay={idx * 0.08}
                    whileHover={
                      shouldReduceMotion ? undefined : { y: -3, scale: 1.01 }
                    }
                    className="p-3.5"
                  >
                    <div className="flex items-start gap-3">
                      <div className="rounded-lg border border-border bg-surface-muted p-2 text-foreground shadow-sm transition-transform duration-300 group-hover:scale-105">
                        <Icon className="h-4 w-4 transition-colors group-hover:text-accent" aria-hidden="true" />
                      </div>

                      <div className="space-y-0.5">
                        <span className="block text-[11px] font-medium text-muted-foreground">
                          {fact.label}
                        </span>
                        <span className="block text-xs sm:text-sm font-semibold text-foreground transition-colors">
                          {fact.value}
                        </span>
                      </div>
                    </div>
                  </SpotlightCard>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Cinta Infinita de Tecnologías (Continuous Marquee) */}
        <motion.div variants={itemVariants} className="pt-4 border-t border-border">
          <div className="text-center mb-4">
            <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground font-semibold">
              {t("ecosystemTitle")}
            </span>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
              {t("ecosystemSubtitle")}
            </p>
          </div>

          <InfiniteMarquee />
        </motion.div>
      </motion.div>
    </section>
  );
}
