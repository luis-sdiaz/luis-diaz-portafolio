"use client";

import React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Sparkles, Star, Quote, User } from "lucide-react";
import { useTranslations } from "next-intl";

/**
 * Estructura tipada para testimonios.
 * Preparada para recibir datos reales en el futuro:
 * cuando se disponga de testimonios auténticos, basta con
 * asignar `isPlaceholder: false` y completar los campos correspondientes.
 */
export interface TestimonialItem {
  id: string;
  slotNumber: string;
  isPlaceholder?: boolean;
  name?: string;
  role?: string;
  relation?: string;
  quote?: string;
  rating?: number; // 1-5 cuando esté disponible
  avatarUrl?: string;
}

/**
 * Ranuras iniciales: Tres tarjetas provisionales sin datos ficticios.
 */
const TESTIMONIAL_SLOTS: readonly TestimonialItem[] = [
  { id: "testimonial-slot-01", slotNumber: "01", isPlaceholder: true },
  { id: "testimonial-slot-02", slotNumber: "02", isPlaceholder: true },
  { id: "testimonial-slot-03", slotNumber: "03", isPlaceholder: true },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function Testimonials() {
  const t = useTranslations("Testimonials");
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="testimonios"
      className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-18 lg:px-8 lg:py-20 overflow-hidden"
      aria-labelledby="testimonials-heading"
    >
      {/* Encabezado honesto y provisional */}
      <div className="mx-auto max-w-3xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#DED8CF] bg-[#F5F3EF] px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#52525B] shadow-[0_1px_2px_rgba(24,24,27,0.02)] dark:border-border dark:bg-surface dark:text-muted-foreground dark:shadow-xs">
          <Sparkles className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
          <span>{t("sectionLabel")}</span>
        </div>
        <h2
          id="testimonials-heading"
          className="mt-3.5 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#18181B] dark:text-foreground"
        >
          {t("title")}
        </h2>
        <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#52525B] dark:text-muted-foreground">
          {t("subtitle")}
        </p>
      </div>

      {/* Cuadrícula responsive de 3 tarjetas */}
      <motion.div
        variants={containerVariants}
        initial={shouldReduceMotion ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className="mt-10 grid grid-cols-1 gap-6 sm:mt-12 md:grid-cols-3 lg:gap-8"
      >
        {TESTIMONIAL_SLOTS.map((slot) => (
          <motion.article
            key={slot.id}
            variants={cardVariants}
            className="group relative flex flex-col justify-between rounded-2xl border border-accent/50 bg-[#F5F3EF] p-5 shadow-[0_4px_24px_-4px_rgba(24,24,27,0.04),0_1px_3px_rgba(24,24,27,0.02)] transition-all duration-300 hover:border-accent/80 hover:shadow-[0_10px_28px_-6px_rgba(24,24,27,0.07)] dark:border-accent/30 dark:bg-surface dark:shadow-none dark:hover:border-accent/50 dark:hover:shadow-md sm:p-6"
          >
            <div className="flex flex-col">
              {/* Cabecera: Título provisional + Indicador de estado discreto */}
              <div className="flex items-center justify-between gap-2 border-b border-accent/45 pb-3 transition-colors group-hover:border-accent/70 dark:border-accent/25 dark:group-hover:border-accent/40">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#18181B] dark:text-foreground">
                  {t("cardTitle", { number: slot.slotNumber })}
                </span>

                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#DED8CF] bg-white/90 px-2 py-0.5 font-mono text-[9px] font-medium tracking-wide text-[#52525B] uppercase shadow-[0_1px_2px_rgba(24,24,27,0.02)] dark:border-accent/40 dark:bg-accent-subtle/60 dark:text-accent dark:font-semibold dark:text-[10px] dark:shadow-none">
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-accent/80 dark:bg-accent"
                    aria-hidden="true"
                  />
                  <span>{t("pendingBadge")}</span>
                </span>
              </div>

              {/* 5 estrellas vacías con gris neutro con contraste suficiente */}
              <div className="mt-3.5 flex items-center justify-between">
                <div
                  className="flex items-center gap-1"
                  aria-label={t("ratingPlaceholder")}
                >
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      className="h-3.5 w-3.5 text-[#A8A29E] stroke-[1.5] fill-none transition-colors dark:text-muted-foreground/30 dark:stroke-[1.5]"
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <span className="font-mono text-[10px] text-[#A8A29E] select-none dark:text-muted-foreground/60">
                  — / 5
                </span>
              </div>

              {/* Superficie interna blanca para la cita provisional (sin comillas falsas) */}
              <div className="relative mt-3.5 flex min-h-[96px] flex-col justify-center rounded-xl border border-[#E5E0D8] bg-white p-4 shadow-[0_1px_2px_rgba(24,24,27,0.02)] transition-colors dark:border-border/80 dark:bg-surface-muted/40 dark:shadow-none">
                <Quote
                  className="mb-2 h-4 w-4 text-accent/70 shrink-0 pointer-events-none dark:text-accent/35"
                  aria-hidden="true"
                />
                <p className="text-xs leading-relaxed text-[#52525B] italic font-normal dark:text-muted-foreground">
                  {t("quotePlaceholder")}
                </p>
              </div>
            </div>

            {/* Bloque de autoría limpio: Avatar neutro + Nombre + Cargo/relación */}
            <footer className="mt-5 flex items-center gap-3 border-t border-[#E5E0D8] pt-3.5 dark:border-border/70">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#DED8CF] bg-white text-[#71717A] shadow-[0_1px_2px_rgba(24,24,27,0.02)] dark:border-accent/40 dark:bg-surface-muted dark:text-muted-foreground/60 dark:shadow-none"
                aria-hidden="true"
              >
                <User className="h-4.5 w-4.5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs sm:text-sm font-semibold text-[#18181B] dark:text-foreground">
                  {t("namePlaceholder")}
                </p>
                <p className="truncate text-[11px] text-[#52525B] dark:text-muted-foreground">
                  {t("rolePlaceholder")}
                </p>
                <p className="truncate font-mono text-[10px] text-[#71717A] dark:text-muted-foreground/70">
                  {t("relationPlaceholder")}
                </p>
              </div>
            </footer>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
