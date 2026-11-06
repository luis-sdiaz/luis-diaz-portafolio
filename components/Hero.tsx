"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { toast } from "sonner";
import {
  Download,
  ArrowRight,
  Terminal,
  Cpu,
  Layers,
  Sparkles,
  Code2,
} from "lucide-react";
import { BackgroundLines } from "@/components/ui/background-lines";
import { ScrambleText } from "@/components/ui/scramble-text";
import { ParticleNetwork } from "@/components/ui/particle-network";

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
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const badgesContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.25,
    },
  },
};

const badgeItemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const opacityParallax = useTransform(scrollYProgress, [0, 0.85], [1, 0.2]);

  const handleDownloadCv = () => {
    toast.success("cv.pdf descargado", {
      description: "Hoja de vida descargada correctamente.",
      duration: 4000,
    });
  };

  return (
    <section
      ref={sectionRef}
      id="inicio"
      aria-label="Sección de bienvenida y presentación profesional"
      className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden"
    >
      <BackgroundLines
        svgOptions={{ duration: 12 }}
        className="w-full min-h-[calc(100vh-4rem)] py-16 md:py-24"
      >
        {/* Luces de fondo y atmósfera ambiental */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center"
        >
          <div className="h-[360px] w-[360px] md:h-[500px] md:w-[500px] rounded-full bg-emerald-500/10 blur-[130px]" />
          <div className="h-[280px] w-[280px] md:h-[400px] md:w-[400px] rounded-full bg-cyan-500/10 blur-[110px] -translate-y-12 translate-x-20" />
        </div>

        <motion.div
          style={{
            y: shouldReduceMotion ? 0 : yParallax,
            opacity: shouldReduceMotion ? 1 : opacityParallax,
          }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center"
          >
            {/* Columna Izquierda: Información de Ingeniería */}
            <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
              <motion.div variants={itemVariants}>
                <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/70 backdrop-blur-md shadow-sm">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                  </span>
                  <span className="text-xs font-medium tracking-wide text-zinc-300">
                    Disponible para nuevos retos tecnológicos
                  </span>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-3">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-zinc-100">
                  Hola, soy{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                    Luis Sebastián Díaz
                  </span>
                </h1>
                <p className="text-lg sm:text-xl font-semibold text-zinc-300 tracking-normal">
                  <ScrambleText
                    text="Estudiante de Ingeniería de Software | Full-Stack & IoT Developer"
                    trigger="view"
                  />
                </p>
              </motion.div>

              <motion.p
                variants={itemVariants}
                className="text-base sm:text-lg text-zinc-400 max-w-2xl leading-relaxed"
              >
                Enfocado en el diseño y construcción de arquitecturas digitales
                escalables, aplicaciones web de alto rendimiento e integración de
                sistemas embebidos IoT con hardware real.
              </motion.p>

              {/* Botones de Acción */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto"
              >
                <a
                  href="/cv.pdf"
                  download="Luis_Sebastian_Diaz_CV.pdf"
                  onClick={handleDownloadCv}
                  aria-label="Descargar currículum vitae en formato PDF"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-zinc-950 font-semibold text-sm shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 hover:brightness-110 active:scale-[0.98] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
                >
                  <Download className="w-4 h-4" />
                  <span>Descargar CV</span>
                </a>

                <a
                  href="#proyectos"
                  aria-label="Navegar a la sección de proyectos desarrollados"
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-zinc-700/80 bg-zinc-900/60 hover:bg-zinc-800/80 text-zinc-200 hover:text-white text-sm font-semibold backdrop-blur-sm active:scale-[0.98] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
                >
                  <span>Ver proyectos</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </motion.div>

              {/* Insignias de Especialidad Escalonadas */}
              <motion.div
                variants={badgesContainerVariants}
                initial="hidden"
                animate="visible"
                className="pt-4 flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-400"
              >
                <motion.div
                  variants={badgeItemVariants}
                  whileHover={shouldReduceMotion ? undefined : { y: -3, scale: 1.03 }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-800/80 bg-zinc-900/60 transition-all duration-300 hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:text-emerald-300 hover:shadow-[0_0_15px_rgba(16,185,129,0.2)] cursor-default"
                >
                  <Terminal className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>5° Semestre de Ingeniería</span>
                </motion.div>

                <motion.div
                  variants={badgeItemVariants}
                  whileHover={shouldReduceMotion ? undefined : { y: -3, scale: 1.03 }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-800/80 bg-zinc-900/60 transition-all duration-300 hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:text-cyan-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] cursor-default"
                >
                  <Cpu className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Hardware IoT &amp; Embebidos</span>
                </motion.div>

                <motion.div
                  variants={badgeItemVariants}
                  whileHover={shouldReduceMotion ? undefined : { y: -3, scale: 1.03 }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-800/80 bg-zinc-900/60 transition-all duration-300 hover:border-teal-500/50 hover:bg-teal-500/10 hover:text-teal-300 hover:shadow-[0_0_15px_rgba(20,184,166,0.2)] cursor-default"
                >
                  <Layers className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span>Clean Architecture</span>
                </motion.div>
              </motion.div>
            </div>

            {/* Columna Derecha: ParticleNetwork en Marco de Cristal Tecnológico */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <motion.div
                variants={itemVariants}
                className="relative w-full max-w-md h-[380px] sm:h-[420px] select-none"
              >
                {/* Marco de Cristal Tecnológico */}
                <div className="relative h-full w-full rounded-3xl border border-emerald-500/30 bg-zinc-950/75 backdrop-blur-2xl shadow-[0_0_60px_rgba(16,185,129,0.18)] overflow-hidden">
                  {/* Corchetes angulares HUD en las 4 esquinas */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-emerald-400/80 z-20"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-cyan-400/80 z-20"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-cyan-400/80 z-20"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-emerald-400/80 z-20"
                  />

                  {/* Insignia Flotante Superior */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/40 bg-zinc-900/90 backdrop-blur-md shadow-lg shadow-emerald-500/10 font-mono text-[10px] sm:text-[11px] text-emerald-400 font-semibold tracking-wider uppercase whitespace-nowrap">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    <span>CORE DE ARQUITECTURA DISTRIBUIDA</span>
                  </div>

                  {/* Lienzo de Nodos IoT */}
                  <ParticleNetwork nodeCount={50} maxDistance={95} className="w-full h-full" />
                </div>

                {/* Tarjetas Satélite Flotantes Perimetrales */}
                <motion.div
                  animate={shouldReduceMotion ? undefined : { y: [-5, 5, -5] }}
                  transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={shouldReduceMotion ? undefined : { scale: 1.08 }}
                  className="absolute -top-3 -right-3 z-30 flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-700/80 bg-zinc-900/95 text-[11px] font-mono text-zinc-200 shadow-xl backdrop-blur-md transition-all duration-300 hover:border-emerald-500 hover:text-emerald-300 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] cursor-default"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Next.js 16</span>
                </motion.div>

                <motion.div
                  animate={shouldReduceMotion ? undefined : { y: [5, -5, 5] }}
                  transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  whileHover={shouldReduceMotion ? undefined : { scale: 1.08 }}
                  className="absolute -bottom-3 -left-3 z-30 flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-700/80 bg-zinc-900/95 text-[11px] font-mono text-zinc-200 shadow-xl backdrop-blur-md transition-all duration-300 hover:border-cyan-500 hover:text-cyan-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] cursor-default"
                >
                  <Cpu className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>ESP32 &amp; IoT</span>
                </motion.div>

                <motion.div
                  animate={shouldReduceMotion ? undefined : { y: [4, -4, 4] }}
                  transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  whileHover={shouldReduceMotion ? undefined : { scale: 1.08 }}
                  className="absolute -top-3 -left-2 z-30 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-700/80 bg-zinc-900/95 text-[11px] font-mono text-zinc-200 shadow-xl backdrop-blur-md transition-all duration-300 hover:border-teal-500 hover:text-teal-300 hover:shadow-[0_0_15px_rgba(20,184,166,0.3)] cursor-default"
                >
                  <Terminal className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span>Tauri 2 + Rust</span>
                </motion.div>

                <motion.div
                  animate={shouldReduceMotion ? undefined : { y: [-4, 4, -4] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                  whileHover={shouldReduceMotion ? undefined : { scale: 1.08 }}
                  className="absolute -bottom-3 -right-2 z-30 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-700/80 bg-zinc-900/95 text-[11px] font-mono text-zinc-200 shadow-xl backdrop-blur-md transition-all duration-300 hover:border-emerald-400 hover:text-emerald-300 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] cursor-default"
                >
                  <Code2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>TypeScript 5</span>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </BackgroundLines>
    </section>
  );
}
