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
        {/* Luces de fondo y atmósfera ambiental temática */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center"
        >
          <div className="h-[360px] w-[360px] md:h-[500px] md:w-[500px] rounded-full bg-foreground/5 blur-[130px]" />
          <div className="h-[280px] w-[280px] md:h-[400px] md:w-[400px] rounded-full bg-foreground/3 blur-[110px] -translate-y-12 translate-x-20" />
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
                <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-border bg-surface text-foreground backdrop-blur-md shadow-sm">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-foreground opacity-30" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-foreground" />
                  </span>
                  <span className="text-xs font-medium tracking-wide text-muted-foreground">
                    Disponible para nuevos retos tecnológicos
                  </span>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-3">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground">
                  Hola, soy{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-zinc-600 to-muted-foreground dark:from-foreground dark:via-zinc-300 dark:to-zinc-500">
                    Luis Sebastián Díaz
                  </span>
                </h1>
                <p className="text-lg sm:text-xl font-semibold text-muted-foreground tracking-normal">
                  <ScrambleText
                    text="Estudiante de Ingeniería de Software | Full-Stack & IoT Developer"
                    trigger="view"
                  />
                </p>
              </motion.div>

              <motion.p
                variants={itemVariants}
                className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed"
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
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-foreground text-background font-semibold text-sm shadow-md hover:opacity-90 active:scale-[0.98] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Descargar CV</span>
                </a>

                <a
                  href="#proyectos"
                  aria-label="Navegar a la sección de proyectos desarrollados"
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-border bg-surface hover:bg-surface-muted text-foreground text-sm font-semibold backdrop-blur-sm active:scale-[0.98] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring cursor-pointer"
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
                className="pt-4 flex flex-wrap items-center gap-3 text-xs font-mono text-muted-foreground"
              >
                <motion.div
                  variants={badgeItemVariants}
                  whileHover={shouldReduceMotion ? undefined : { y: -3, scale: 1.03 }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-surface transition-all duration-300 hover:border-border-hover hover:text-foreground hover:shadow-sm cursor-default"
                >
                  <Terminal className="w-3.5 h-3.5 text-foreground shrink-0" />
                  <span>5° Semestre de Ingeniería</span>
                </motion.div>

                <motion.div
                  variants={badgeItemVariants}
                  whileHover={shouldReduceMotion ? undefined : { y: -3, scale: 1.03 }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-surface transition-all duration-300 hover:border-border-hover hover:text-foreground hover:shadow-sm cursor-default"
                >
                  <Cpu className="w-3.5 h-3.5 text-foreground shrink-0" />
                  <span>Tauri 2 + ESP32 IoT</span>
                </motion.div>

                <motion.div
                  variants={badgeItemVariants}
                  whileHover={shouldReduceMotion ? undefined : { y: -3, scale: 1.03 }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-surface transition-all duration-300 hover:border-border-hover hover:text-foreground hover:shadow-sm cursor-default"
                >
                  <Layers className="w-3.5 h-3.5 text-foreground shrink-0" />
                  <span>Next.js 16 + React 19</span>
                </motion.div>
              </motion.div>
            </div>

            {/* Columna Derecha: Tarjeta Visual Interactiva */}
            <div className="lg:col-span-5 flex justify-center items-center relative">
              <motion.div
                variants={itemVariants}
                className="relative w-full max-w-[420px] aspect-[4/5] rounded-3xl p-1 border border-border bg-surface/75 backdrop-blur-xl shadow-2xl overflow-visible transition-colors duration-250"
              >
                {/* Marco de ingeniería */}
                <div className="relative w-full h-full rounded-[22px] overflow-hidden border border-border/80 bg-background/50">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-foreground/40 z-20"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-foreground/40 z-20"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-foreground/40 z-20"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-foreground/40 z-20"
                  />

                  {/* Insignia Flotante Superior */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border bg-surface/90 backdrop-blur-md shadow-md font-mono text-[10px] sm:text-[11px] text-foreground font-semibold tracking-wider uppercase whitespace-nowrap">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-foreground opacity-30" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-foreground" />
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
                  className="absolute -top-3 -right-3 z-30 flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border bg-surface/95 text-[11px] font-mono text-foreground shadow-xl backdrop-blur-md transition-all duration-300 hover:border-border-hover cursor-default"
                >
                  <Sparkles className="w-3.5 h-3.5 text-foreground shrink-0" />
                  <span>Next.js 16</span>
                </motion.div>

                <motion.div
                  animate={shouldReduceMotion ? undefined : { y: [5, -5, 5] }}
                  transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  whileHover={shouldReduceMotion ? undefined : { scale: 1.08 }}
                  className="absolute -bottom-3 -left-3 z-30 flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border bg-surface/95 text-[11px] font-mono text-foreground shadow-xl backdrop-blur-md transition-all duration-300 hover:border-border-hover cursor-default"
                >
                  <Cpu className="w-3.5 h-3.5 text-foreground shrink-0" />
                  <span>ESP32 &amp; IoT</span>
                </motion.div>

                <motion.div
                  animate={shouldReduceMotion ? undefined : { y: [4, -4, 4] }}
                  transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  whileHover={shouldReduceMotion ? undefined : { scale: 1.08 }}
                  className="absolute -top-3 -left-2 z-30 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border bg-surface/95 text-[11px] font-mono text-foreground shadow-xl backdrop-blur-md transition-all duration-300 hover:border-border-hover cursor-default"
                >
                  <Terminal className="w-3.5 h-3.5 text-foreground shrink-0" />
                  <span>Tauri 2 + Rust</span>
                </motion.div>

                <motion.div
                  animate={shouldReduceMotion ? undefined : { y: [-4, 4, -4] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                  whileHover={shouldReduceMotion ? undefined : { scale: 1.08 }}
                  className="absolute -bottom-3 -right-2 z-30 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border bg-surface/95 text-[11px] font-mono text-foreground shadow-xl backdrop-blur-md transition-all duration-300 hover:border-border-hover cursor-default"
                >
                  <Code2 className="w-3.5 h-3.5 text-foreground shrink-0" />
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
