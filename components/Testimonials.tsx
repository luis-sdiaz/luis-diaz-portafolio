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
} from "lucide-react";
import { useTranslations } from "next-intl";

interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  relation: string;
  projectTag: string;
  text: string;
  rating: number;
  avatar: string;
}

const TESTIMONIAL_IDS = [
  "docente-ingenieria",
  "colega-frontend",
  "evaluador-iot",
  "operaciones-logistica",
] as const;

const TESTIMONIAL_RATINGS: Record<string, number> = {
  "docente-ingenieria": 5,
  "colega-frontend": 5,
  "evaluador-iot": 5,
  "operaciones-logistica": 5,
};

const TESTIMONIAL_AVATARS: Record<string, string> = {
  "docente-ingenieria": "AS",
  "colega-frontend": "AM",
  "evaluador-iot": "CP",
  "operaciones-logistica": "LP",
};

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
  const t = useTranslations("Testimonials");
  const shouldReduceMotion = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const testimonials: TestimonialItem[] = TESTIMONIAL_IDS.map((id) => ({
    id,
    name: t(`items.${id}.name`),
    role: t(`items.${id}.role`),
    relation: t(`items.${id}.relation`),
    projectTag: t(`items.${id}.projectTag`),
    text: t(`items.${id}.text`),
    rating: TESTIMONIAL_RATINGS[id],
    avatar: TESTIMONIAL_AVATARS[id],
  }));

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  const current = testimonials[currentIndex];

  return (
    <section
      id="testimonios"
      className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-18 lg:px-8 lg:py-20 overflow-hidden"
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto max-w-3xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold uppercase tracking-widest text-foreground shadow-sm">
          <Sparkles className="h-3.5 w-3.5 text-foreground" aria-hidden="true" />
          <span>{t("sectionLabel")}</span>
        </div>
        <h2
          id="testimonials-heading"
          className="mt-3.5 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground"
        >
          {t("titlePart1")}{" "}
          <span className="bg-gradient-to-r from-foreground via-zinc-600 to-muted-foreground dark:from-foreground dark:via-zinc-300 dark:to-zinc-500 bg-clip-text text-transparent">
            {t("titlePart2")}
          </span>
        </h2>
        <p className="mt-3 text-sm sm:text-base leading-relaxed text-muted-foreground">
          {t("subtitle")}
        </p>
      </div>

      {/* Carrusel Deslizante */}
      <div className="relative mt-10 max-w-4xl mx-auto">
        <div className="relative min-h-[340px] sm:min-h-[300px] flex items-center justify-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current.id}
              custom={direction}
              variants={shouldReduceMotion ? undefined : slideVariants}
              initial={shouldReduceMotion ? { opacity: 0 } : "enter"}
              animate={shouldReduceMotion ? { opacity: 1 } : "center"}
              exit={shouldReduceMotion ? { opacity: 0 } : "exit"}
              className="w-full"
            >
              <div className="relative rounded-2xl sm:rounded-3xl border border-border bg-surface p-6 sm:p-8 backdrop-blur-xl shadow-xl transition-all duration-300">
                <Quote className="absolute right-6 top-6 h-14 w-14 text-foreground/5 pointer-events-none" />

                {/* Cabecera del testimonio */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3.5">
                  <span className="rounded-md border border-border bg-surface-muted px-2.5 py-0.5 font-mono text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                    {current.projectTag}
                  </span>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-border bg-surface-muted font-mono text-[10px] sm:text-[11px] text-foreground font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-foreground" />
                      <span>{t("verified")}</span>
                    </div>

                    <div className="flex gap-1" aria-label={t("ratingAriaLabel", { count: current.rating })}>
                      {Array.from({ length: current.rating }, (_, i) => (
                        <Star
                          key={i}
                          className="h-3.5 w-3.5 fill-accent text-accent"
                          strokeWidth={1.5}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Texto testimonial */}
                <p className="mt-5 text-sm sm:text-base md:text-lg leading-relaxed text-foreground font-normal">
                  &ldquo;{current.text}&rdquo;
                </p>

                {/* Pie de autoría con avatar */}
                <footer className="mt-6 flex items-center justify-between border-t border-border pt-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl bg-foreground text-sm sm:text-base font-bold text-background shadow-md">
                      {current.avatar}
                    </div>
                    <div>
                      <cite className="not-italic text-sm sm:text-base font-bold text-foreground">
                        {current.name}
                      </cite>
                      <p className="text-xs text-muted-foreground">
                        {current.role}
                      </p>
                      <p className="text-[10px] sm:text-[11px] font-mono text-muted-foreground">{current.relation}</p>
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
          <div className="flex items-center gap-2" role="tablist" aria-label={t("navigationAriaLabel")}>
            {testimonials.map((testimonial, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={testimonial.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "w-8 bg-accent shadow-sm"
                      : "w-2 bg-border hover:bg-muted-foreground"
                  }`}
                  aria-label={t("goToTestimonial", { name: testimonial.name })}
                />
              );
            })}
          </div>

          {/* Flechas de Navegación y Contador */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-muted-foreground">
              <strong className="text-foreground">{String(currentIndex + 1).padStart(2, "0")}</strong>
              {" / "}
              {String(testimonials.length).padStart(2, "0")}
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface text-foreground shadow-sm transition-all hover:bg-accent-muted hover:border-accent/50 hover:text-accent cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
                aria-label={t("previousTestimonial")}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface text-foreground shadow-sm transition-all hover:bg-accent-muted hover:border-accent/50 hover:text-accent cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
                aria-label={t("nextTestimonial")}
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
