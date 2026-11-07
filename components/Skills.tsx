"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Layout, Cpu, Database, ShieldCheck, Sparkles } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";

interface SkillCategory {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend & UI",
    icon: Layout,
    skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    title: "Desktop & IoT",
    icon: Cpu,
    skills: ["Tauri 2", "ESP32", "Arduino Uno", "C++ / Firmware"],
  },
  {
    title: "Backend & Datos",
    icon: Database,
    skills: ["Node.js", "PostgreSQL", "Supabase", "REST APIs"],
  },
  {
    title: "Calidad & Entorno",
    icon: ShieldCheck,
    skills: ["Vitest", "Testing Library", "Git", "PowerShell", "ESLint"],
  },
];

export default function Skills() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="skills" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-foreground shadow-sm">
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Capacidades Técnicas</span>
        </div>
        <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Stack de{" "}
          <span className="bg-gradient-to-r from-foreground via-zinc-600 to-muted-foreground dark:from-foreground dark:via-zinc-300 dark:to-zinc-500 bg-clip-text text-transparent">
            Ingeniería
          </span>
        </h2>
        <p className="mt-3 text-sm text-muted-foreground sm:text-base">
          Ecosistema tecnológico modular enfocado en rendimiento, robustez de tipos y conectividad hardware.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {skillCategories.map((category, idx) => {
          const Icon = category.icon;
          return (
            <SpotlightCard
              key={category.title}
              delay={idx * 0.1}
              className="p-6"
            >
              {/* Barra superior de acento monocromático sutil */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-accent via-accent/40 to-transparent opacity-70"
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface-muted text-foreground shadow-sm transition-transform duration-300 group-hover:scale-105">
                    <Icon className="h-5 w-5 transition-colors group-hover:text-accent" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-foreground transition-colors">
                      {category.title}
                    </h3>
                    <span className="font-mono text-[10px] text-muted-foreground">
                      {category.skills.length} Tecnologías activas
                    </span>
                  </div>
                </div>

                <span className="rounded-full border border-border bg-surface-muted px-2.5 py-0.5 font-mono text-[10px] text-muted-foreground font-medium">
                  {`0${idx + 1}`}
                </span>
              </div>

              {/* Chips interactivos de habilidades */}
              <div className="mt-6 flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    whileHover={
                      shouldReduceMotion ? undefined : { y: -2, scale: 1.05 }
                    }
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="cursor-default rounded-lg border border-border bg-surface-muted px-3 py-1.5 font-mono text-xs text-foreground shadow-sm transition-all duration-200 hover:border-accent/50 hover:bg-accent-muted hover:text-accent"
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
