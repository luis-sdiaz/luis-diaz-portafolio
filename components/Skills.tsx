"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Layout, Cpu, Database, ShieldCheck, Sparkles } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { useTranslations } from "next-intl";

export default function Skills() {
  const t = useTranslations("Skills");
  const shouldReduceMotion = useReducedMotion();

  const skillCategories = [
    {
      titleKey: "categories.frontend",
      icon: Layout,
      skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    },
    {
      titleKey: "categories.desktop",
      icon: Cpu,
      skills: ["Tauri 2", "ESP32", "Arduino Uno", "C++ / Firmware"],
    },
    {
      titleKey: "categories.backend",
      icon: Database,
      skills: ["Node.js", "PostgreSQL", "Supabase", "REST APIs"],
    },
    {
      titleKey: "categories.quality",
      icon: ShieldCheck,
      skills: ["Vitest", "Testing Library", "Git", "PowerShell", "ESLint"],
    },
  ];

  return (
    <section id="skills" className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-18 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-3xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold uppercase tracking-widest text-foreground shadow-sm">
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          <span>{t("sectionLabel")}</span>
        </div>
        <h2 className="mt-3.5 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground">
          {t("title")}{" "}
          <span className="bg-gradient-to-r from-foreground via-zinc-600 to-muted-foreground dark:from-foreground dark:via-zinc-300 dark:to-zinc-500 bg-clip-text text-transparent">
            {t("titleHighlight")}
          </span>
        </h2>
        <p className="mt-2.5 text-sm sm:text-base text-muted-foreground">
          {t("subtitle")}
        </p>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {skillCategories.map((category, idx) => {
          const Icon = category.icon;
          return (
            <SpotlightCard
              key={category.titleKey}
              delay={idx * 0.1}
              className="p-5 sm:p-5.5"
            >
              {/* Barra superior de acento monocromático sutil */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-accent via-accent/40 to-transparent opacity-70"
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-surface-muted text-foreground shadow-sm transition-transform duration-300 group-hover:scale-105">
                    <Icon className="h-4.5 w-4.5 transition-colors group-hover:text-accent" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-foreground transition-colors">
                      {t(category.titleKey as Parameters<typeof t>[0])}
                    </h3>
                    <span className="font-mono text-[10px] text-muted-foreground">
                      {category.skills.length} {t("activeTechnologies")}
                    </span>
                  </div>
                </div>

                <span className="rounded-full border border-border bg-surface-muted px-2.5 py-0.5 font-mono text-[10px] text-muted-foreground font-medium">
                  {`0${idx + 1}`}
                </span>
              </div>

              {/* Chips interactivos de habilidades */}
              <div className="mt-5 flex flex-wrap gap-1.5 sm:gap-2">
                {category.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    whileHover={
                      shouldReduceMotion ? undefined : { y: -2, scale: 1.05 }
                    }
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="cursor-default rounded-lg border border-border bg-surface-muted px-2.5 py-1 font-mono text-xs text-foreground shadow-sm transition-all duration-200 hover:border-accent/50 hover:bg-accent-muted hover:text-accent"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </SpotlightCard>
          );
        })}
      </div>
    </section>
  );
}
