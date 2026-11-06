"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";
import {
  Quote,
  Star,
  Sparkles,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Terminal,
} from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  relation: string;
  projectTag: string;
  text: string;
  rating: number;
  avatar: string;
}

const testimonials: readonly Testimonial[] = [
  {
    id: "docente-ingenieria",
    name: "Ing. Docente de Arquitectura de Software",
    role: "Facultad de Ingeniería — UCC Pasto",
    relation: "Evaluador Académico Principal",
    projectTag: "ARQUITECTURA DE SOFTWARE & PATRONES",
    text: "Luis ha demostrado criterio arquitectónico riguroso, disciplina y capacidad para resolver problemas complejos con código limpio, tipado estricto y patrones sólidos.",
    rating: 5,
    avatar: "AS",
  },
  {
    id: "colega-frontend",
    name: "Alejandro M.",
    role: "Co-desarrollador de Ingeniería",
    relation: "Proyecto Lullaby 3D & Sistemas",
    projectTag: "FULL-STACK & MOTOR 3D INTERACTIVO",
    text: "Su enfoque en la experiencia de usuario, microinteracciones a 60 FPS y solidez de componentes en Next.js y Tauri aporta un valor inmenso a cualquier equipo técnico.",
    rating: 5,
    avatar: "AM",
  },
  {
    id: "evaluador-iot",
    name: "Comité de Proyectos de Hardware",
    role: "Jurado Evaluador de Ingeniería",
    relation: "Sistemas Embebidos & Telemetría IoT",
    projectTag: "ECOPLAZA IOT & HARDWARE ESP32",
    text: "Presentó una arquitectura IoT sobresaliente en EcoPlaza: integración serial fluida con ESP32, baja latencia y persistencia de alta resiliencia orientada a producción.",
    rating: 5,
    avatar: "CP",
  },
  {
    id: "operaciones-logistica",
    name: "Líder de Procesos & Trazabilidad",
    role: "Supervisión de Flujos Sistematizados",
    relation: "Trazabilidad de Cadena Operativa",
    projectTag: "GESTIÓN DE DATOS & RESILIENCIA LOCAL",
    text: "Estructuró bases de datos relacionales y algoritmos de pesaje continuo con gran robustez, eliminando cuellos de botella de entrada y automatizando reportes críticos.",
    rating: 5,
    avatar: "LP",
  },
];

const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
    scale: 0.96,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
    scale: 0.96,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

export default function Testimonials() {
  const shouldReduceMotion = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  const current = testimonials[currentIndex];

  return (
    <section
      id="testimonios"
      className="mx-auto max-w-5xl px-4 py-24 sm:px-6 lg:px-8 overflow-hidden"
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto max-w-3xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-400">
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Recomendaciones</span>
        </div>
        <h2
          id="testimonials-heading"
          className="mt-5 text-3xl font-extrabold tracking-tight text-zinc-100 sm:text-4xl lg:text-5xl"
        >
          La experiencia de{" "}
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            trabajar juntos
          </span>
        </h2>
        <p className="mt-4 text-base leading-relaxed text-zinc-400 sm:text-lg">
          Referencias técnicas y académicas de profesionales que han colaborado en proyectos de software y sistemas embebidos.
        </p>
      </div>

      {/* Carrusel Deslizante de Vidrio Ahumado */}
      <div className="relative mt-14 max-w-4xl mx-auto">
        <div className="relative min-h-[380px] sm:min-h-[340px] flex items-center justify-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current.id}
              custom={direction}
              variants={shouldReduceMotion ? undefined : slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full"
            >
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/60 p-7 sm:p-10 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all">
                {/* Resplandor ambiental de borde superior */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent"
                />

                <div className="flex flex-wrap items-center justify-between gap-4">
                  {/* Cita vectorial esmeralda */}
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 shadow-sm">
                      <Quote className="h-6 w-6" strokeWidth={1.75} />
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg border border-zinc-800 bg-zinc-950/80 font-mono text-[10px] text-zinc-400">
                      <Terminal className="w-3 h-3 text-cyan-400" />
                      <span>{current.projectTag}</span>
                    </div>
                  </div>

                  {/* Insignia de verificación y Calificación */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-emerald-500/30 bg-emerald-950/60 font-mono text-[11px] text-emerald-400 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Verificado</span>
                    </div>

                    <div className="flex gap-1" aria-label="Calificación de 5 estrellas">
                      {Array.from({ length: current.rating }, (_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-amber-400 text-amber-400"
                          strokeWidth={1.5}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Texto testimonial */}
                <p className="mt-7 text-base sm:text-lg leading-relaxed text-zinc-200 font-normal">
                  “{current.text}”
                </p>

                {/* Pie de autoría con avatar */}
                <footer className="mt-8 flex items-center justify-between border-t border-zinc-800/80 pt-6">
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700 text-base font-bold text-white shadow-lg shadow-emerald-500/20">
                      {current.avatar}
                    </div>
                    <div>
                      <cite className="not-italic text-sm sm:text-base font-bold text-zinc-100">
                        {current.name}
                      </cite>
                      <p className="text-xs text-zinc-400">
                        {current.role}
                      </p>
                      <p className="text-[11px] font-mono text-emerald-400/90">{current.relation}</p>
                    </div>
                  </div>
                </footer>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controles de Navegación del Carrusel */}
        <div className="mt-8 flex items-center justify-between px-2">
          {/* Paginación con Píldoras Interactivas */}
          <div className="flex items-center gap-2">
            {testimonials.map((t, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "w-8 bg-gradient-to-r from-emerald-400 to-cyan-400 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                      : "w-2 bg-zinc-700 hover:bg-zinc-500"
                  }`}
                  aria-label={`Ir al testimonio de ${t.name}`}
                />
              );
            })}
          </div>

          {/* Flechas de Navegación y Contador */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-zinc-400">
              <strong className="text-emerald-400">{String(currentIndex + 1).padStart(2, "0")}</strong>
              {" / "}
              {String(testimonials.length).padStart(2, "0")}
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/90 text-zinc-300 shadow-md transition-all hover:border-emerald-500/50 hover:bg-zinc-800 hover:text-white cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                aria-label="Testimonio anterior"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/90 text-zinc-300 shadow-md transition-all hover:border-emerald-500/50 hover:bg-zinc-800 hover:text-white cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                aria-label="Siguiente testimonio"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
