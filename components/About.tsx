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

interface QuickFact {
  id: string;
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: string;
}

const QUICK_FACTS: readonly QuickFact[] = [
  {
    id: "location",
    label: "Ubicación",
    value: "Pasto, Nariño, Colombia",
    icon: MapPin,
    accent: "from-emerald-500/20 to-emerald-500/5 text-emerald-400 border-emerald-500/30",
  },
  {
    id: "education",
    label: "Formación",
    value: "5° Semestre — Ing. de Software",
    icon: GraduationCap,
    accent: "from-cyan-500/20 to-cyan-500/5 text-cyan-400 border-cyan-500/30",
  },
  {
    id: "focus",
    label: "Enfoque Técnico",
    value: "Web Escalable & Hardware IoT",
    icon: Cpu,
    accent: "from-indigo-500/20 to-indigo-500/5 text-indigo-400 border-indigo-500/30",
  },
  {
    id: "status",
    label: "Disponibilidad",
    value: "Desarrollo de Soluciones de Impacto",
    icon: Terminal,
    accent: "from-teal-500/20 to-teal-500/5 text-teal-400 border-teal-500/30",
  },
];

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
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="sobre-mi"
      aria-labelledby="about-title"
      className="relative mx-auto max-w-7xl overflow-hidden px-4 py-24 sm:px-6 sm:py-32 lg:px-8"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-96 w-full max-w-4xl -translate-x-1/2 bg-gradient-to-tr from-emerald-500/10 via-cyan-500/10 to-transparent blur-3xl"
      />

      <motion.div
        variants={containerVariants}
        initial={shouldReduceMotion ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="space-y-16"
      >
        {/* Encabezado */}
        <motion.div variants={itemVariants} className="space-y-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-400">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Perfil Profesional</span>
          </div>

          <h2
            id="about-title"
            className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl"
          >
            Trayectoria, vocación y{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              pensamiento ingenieril
            </span>
          </h2>

          <p className="mx-auto max-w-2xl text-base text-zinc-400 sm:text-lg">
            Conectando el software de alto rendimiento con sistemas físicos y necesidades reales.
          </p>
        </motion.div>

        {/* Contenido Bento Grid */}
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Columna Izquierda: Consola de Telemetría Interactiva */}
          <div className="flex justify-center lg:col-span-5">
            <InteractiveTerminal />
          </div>

          {/* Columna Derecha: Resumen y Quick Facts con SpotlightCard */}
          <motion.div
            variants={itemVariants}
            className="space-y-6 lg:col-span-7"
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-bold tracking-tight text-zinc-100 sm:text-3xl">
                Soluciones digitales fundamentadas en rigor, arquitectura y propósito.
              </h3>
              <p className="text-base leading-relaxed text-zinc-300 sm:text-lg">
                Soy Luis Sebastián Díaz, estudiante de 5° semestre de Ingeniería de Software en Pasto, Colombia.
                Me especializo en diseñar arquitecturas web modulares y en integrar microcontroladores IoT mediante
                sistemas embebidos como el ESP32. Aplico estándares estrictos de calidad, interfaces intuitivas con
                acabados glassmorphism y código tipado de extremo a extremo para resolver problemas reales con impacto comunitario.
              </p>
            </div>

            {/* Quick Facts con SpotlightCard y Entrada Escalonada */}
            <div className="grid grid-cols-1 gap-3.5 pt-2 sm:grid-cols-2">
              {QUICK_FACTS.map((fact, idx) => {
                const Icon = fact.icon;
                return (
                  <SpotlightCard
                    key={fact.id}
                    delay={idx * 0.08}
                    whileHover={
                      shouldReduceMotion ? undefined : { y: -4, scale: 1.01 }
                    }
                    className="p-4"
                  >
                    <div className="flex items-start gap-3.5">
                      <div
                        className={`rounded-lg border p-2.5 shadow-sm transition-transform duration-300 group-hover:scale-110 ${fact.accent}`}
                      >
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </div>

                      <div className="space-y-0.5">
                        <span className="block text-xs font-medium text-zinc-400">
                          {fact.label}
                        </span>
                        <span className="block text-sm font-semibold text-zinc-200 transition-colors group-hover:text-white">
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
        <motion.div variants={itemVariants} className="pt-6 border-t border-zinc-800/80">
          <div className="text-center mb-6">
            <span className="font-mono text-xs uppercase tracking-wider text-emerald-400 font-semibold">
              Ecosistema Tecnológico de Producción
            </span>
            <p className="mt-1 text-sm text-zinc-400">
              Despliegue continuo de librerías, protocolos embebidos y frameworks modernos
            </p>
          </div>

          <InfiniteMarquee />
        </motion.div>
      </motion.div>
    </section>
  );
}
