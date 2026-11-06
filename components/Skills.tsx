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
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-400">
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Capacidades Técnicas</span>
        </div>
        <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-zinc-100 sm:text-4xl">
          Stack de{" "}
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            Ingeniería
          </span>
        </h2>
        <p className="mt-3 text-sm text-zinc-400 sm:text-base">
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
              {/* Barra superior luminosa en degradado esmeralda/cian */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 opacity-80"
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 shadow-sm transition-transform duration-300 group-hover:scale-105">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-zinc-100 transition-colors group-hover:text-white">
                      {category.title}
                    </h3>
                    <span className="font-mono text-[10px] text-zinc-500">
                      {category.skills.length} Tecnologías activas
                    </span>
                  </div>
                </div>

                <span className="rounded-full border border-zinc-800 bg-zinc-950/80 px-2.5 py-0.5 font-mono text-[10px] text-emerald-400/90 font-medium">
                  {`0${idx + 1}`}
                </span>
              </div>

              {/* Chips interactivos que al hacer hover se iluminan con borde neón esmeralda */}
              <div className="mt-6 flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    whileHover={
                      shouldReduceMotion ? undefined : { y: -2, scale: 1.05 }
                    }
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="cursor-default rounded-lg border border-zinc-800 bg-zinc-950/70 px-3 py-1.5 font-mono text-xs text-zinc-300 shadow-sm transition-all duration-200 hover:border-emerald-500/60 hover:bg-emerald-500/10 hover:text-emerald-300 hover:shadow-[0_0_15px_rgba(16,185,129,0.25)]"
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
