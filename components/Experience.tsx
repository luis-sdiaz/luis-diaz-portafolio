"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
  type Variants,
} from "framer-motion";
import { Briefcase, Calendar, GraduationCap, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

type ExperienceType = "academica" | "laboral";

interface ExperienceItem {
  id: string;
  type: ExperienceType;
  title: string;
  organization: string;
  period: string;
  description: string;
  skills: string[];
}

const sectionHeaderVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/**
 * Variantes de entrada individual para cada tarjeta.
 * Estado inicial: completamente invisible (opacity: 0) y desplazada hacia abajo (y: 24).
 * Estado visible: opacidad plena (opacity: 1) y posición natural (y: 0).
 * Curva cúbica suave (easeOut) sin rebotes, con duración óptima entre 0.6s y 0.7s (0.65s).
 */
const cardEntranceVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
      delay,
    },
  }),
};

/**
 * Nodo circular interactivo de la línea de tiempo.
 * Se activa e ilumina con el naranja identitario conforme el trazo
 * progresivo del scroll lo alcanza, sin efectos de brillo exagerados.
 */
function TimelineNode({
  progress,
  index,
  total,
  shouldReduceMotion,
  onNodeRef,
}: {
  progress: MotionValue<number>;
  index: number;
  total: number;
  shouldReduceMotion: boolean | null;
  onNodeRef: (el: HTMLSpanElement | null) => void;
}) {
  const targetProgress = total > 1 ? index / (total - 1) : 0;
  const activeWindow = [
    Math.max(0, targetProgress - 0.04),
    Math.min(1, targetProgress + 0.01),
  ];

  const active = useTransform(progress, activeWindow, [0, 1]);
  const activeScale = useTransform(active, [0, 1], [1, 1.12]);

  return (
    <span
      ref={onNodeRef}
      className="absolute -left-[19px] sm:-left-[23px] top-[22px] flex h-3.5 w-3.5 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-125 z-20 pointer-events-none"
      aria-hidden="true"
    >
      {/* Base inactiva neutral */}
      <span className="absolute inset-0 rounded-full border-2 border-border bg-surface transition-colors dark:border-border/80 dark:bg-background" />

      {/* Estado activo progresivo (se ilumina suavemente cuando el trazo naranja lo alcanza) */}
      <motion.span
        style={{
          opacity: shouldReduceMotion ? 1 : active,
          scale: shouldReduceMotion ? 1 : activeScale,
        }}
        className="absolute inset-0 rounded-full bg-background ring-2 ring-accent shadow-[0_0_5px_rgba(234,88,12,0.3)] dark:bg-background dark:ring-accent dark:shadow-[0_0_5px_rgba(251,146,60,0.3)]"
      />

      {/* Núcleo central */}
      <span className="relative z-10 h-1.5 w-1.5 rounded-full bg-muted-foreground/35 transition-colors" />
      <motion.span
        style={{
          opacity: shouldReduceMotion ? 1 : active,
        }}
        className="absolute z-20 h-1.5 w-1.5 rounded-full bg-accent"
      />
    </span>
  );
}

function ExperienceTimeline({
  items,
  direction = "left",
  skillsAriaLabel,
}: {
  items: readonly ExperienceItem[];
  direction?: "left" | "right";
  skillsAriaLabel: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const firstNodeRef = useRef<HTMLSpanElement | null>(null);
  const lastNodeRef = useRef<HTMLSpanElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  // Medición geométrica precisa para acotar la línea exactamente entre el primer y último nodo
  const [lineGeometry, setLineGeometry] = useState<{ top: number; height: number }>({
    top: 29,
    height: 0,
  });

  useEffect(() => {
    const updateGeometry = () => {
      if (!containerRef.current || !firstNodeRef.current || !lastNodeRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const firstRect = firstNodeRef.current.getBoundingClientRect();
      const lastRect = lastNodeRef.current.getBoundingClientRect();

      const top = firstRect.top + firstRect.height / 2 - containerRect.top;
      const bottom = lastRect.top + lastRect.height / 2 - containerRect.top;
      setLineGeometry({
        top,
        height: Math.max(0, bottom - top),
      });
    };

    updateGeometry();
    window.addEventListener("resize", updateGeometry);
    const observer = new ResizeObserver(updateGeometry);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener("resize", updateGeometry);
      observer.disconnect();
    };
  }, [items]);

  // Seguimiento independiente del scroll con física de resorte ultra-suave
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 60%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 35,
    restDelta: 0.001,
  });

  return (
    <div ref={containerRef} className="relative pl-6 sm:pl-8">
      {/* 1. Línea vertical neutral de fondo (pista continua) */}
      <div
        style={{
          top: `${lineGeometry.top}px`,
          height: lineGeometry.height ? `${lineGeometry.height}px` : "calc(100% - 58px)",
        }}
        className="absolute left-[11px] sm:left-[15px] w-[2px] rounded-full bg-border/80 dark:bg-border/50 pointer-events-none"
        aria-hidden="true"
      />

      {/* 2. Trazo naranja activo que crece y retrocede sincronizado con el scroll */}
      <motion.div
        style={{
          top: `${lineGeometry.top}px`,
          height: lineGeometry.height ? `${lineGeometry.height}px` : "calc(100% - 58px)",
          scaleY: shouldReduceMotion ? 1 : smoothProgress,
          transformOrigin: "top",
        }}
        className="absolute left-[11px] sm:left-[15px] w-[2px] rounded-full bg-accent shadow-[0_0_6px_rgba(234,88,12,0.3)] dark:shadow-[0_0_6px_rgba(251,146,60,0.3)] z-10 pointer-events-none"
        aria-hidden="true"
      />

      <ol className="space-y-6 sm:space-y-7">
        {items.map((item, index) => {
          // Desfase sutil opcional solo para la primera tarjeta de la columna derecha
          // cuando ambas columnas entran simultáneamente en pantalla grande.
          // Para las tarjetas subsiguientes que aparecen con scroll, la activación es 100% individual.
          const columnStagger = index === 0 && direction === "right" ? 0.08 : 0;

          return (
            <li key={item.id} className="group relative pl-6 sm:pl-8">
              {/* Nodo circular interactivo sincronizado */}
              <TimelineNode
                progress={smoothProgress}
                index={index}
                total={items.length}
                shouldReduceMotion={shouldReduceMotion}
                onNodeRef={(el) => {
                  if (index === 0) firstNodeRef.current = el;
                  if (index === items.length - 1) lastNodeRef.current = el;
                }}
              />

              {/* Contenedor animado de entrada independiente (Framer Motion) */}
              <motion.div
                variants={cardEntranceVariants}
                custom={columnStagger}
                initial={shouldReduceMotion ? false : "hidden"}
                whileInView="visible"
                viewport={{ once: true, amount: 0.25, margin: "0px 0px -50px 0px" }}
                className="w-full"
              >
              {/* Tarjeta con hover CSS nativo e independiente (sin conflicto de transform) */}
              <article
                className="group/card relative rounded-2xl border border-accent/30 bg-[#FAF8F5] p-5 shadow-[0_2px_14px_-2px_rgba(24,24,27,0.04),0_1px_3px_rgba(24,24,27,0.02)] transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-[0_8px_24px_-4px_rgba(24,24,27,0.08)] dark:border-accent/25 dark:bg-surface dark:shadow-none dark:hover:border-accent/50 dark:hover:shadow-md sm:p-6 motion-reduce:transform-none"
              >
                {/* A. Fecha (secundaria visualmente con tipografía limpia) */}
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/20 bg-accent-subtle/60 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-accent dark:border-accent/30 dark:bg-accent-subtle/30">
                    <Calendar className="h-3 w-3 text-accent" aria-hidden="true" />
                    <time>{item.period}</time>
                  </span>
                </div>

                {/* B. Título académico o cargo (jerarquía destacada) */}
                <h4 className="mt-2.5 text-base sm:text-lg font-bold tracking-tight text-foreground leading-snug">
                  {item.title}
                </h4>

                {/* C. Institución u organización (jerarquía intermedia) */}
                <p className="mt-1 text-xs sm:text-sm font-semibold text-foreground/80 dark:text-foreground/90">
                  {item.organization}
                </p>

                {/* D. Descripción (legible y equilibrada) */}
                <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>

                {/* E. Tecnologías o competencias (etiquetas bien distribuidas) */}
                <ul
                  className="mt-4 flex flex-wrap gap-1.5 border-t border-border/50 pt-3 dark:border-border/40"
                  aria-label={skillsAriaLabel}
                >
                  {item.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-lg border border-border/80 bg-white px-2.5 py-1 text-[11px] font-medium text-foreground/85 shadow-[0_1px_2px_rgba(24,24,27,0.02)] transition-colors hover:border-accent/40 hover:text-accent-hover dark:border-border dark:bg-surface-muted dark:text-muted-foreground dark:hover:border-accent/50 dark:hover:text-foreground"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </article>
            </motion.div>
          </li>
          );
        })}
      </ol>
    </div>
  );
}

export default function Experience() {
  const t = useTranslations("Experience");
  const shouldReduceMotion = useReducedMotion();

  const academicExperiences: readonly ExperienceItem[] = [
    {
      id: "ucc-ingenieria",
      type: "academica",
      title: t("academic.ucc-ingenieria.title"),
      organization: t("academic.ucc-ingenieria.organization"),
      period: t("academic.ucc-ingenieria.period"),
      description: t("academic.ucc-ingenieria.description"),
      skills: (t.raw("academic.ucc-ingenieria.skills") as string[]),
    },
    {
      id: "educative-java",
      type: "academica",
      title: t("academic.educative-java.title"),
      organization: t("academic.educative-java.organization"),
      period: t("academic.educative-java.period"),
      description: t("academic.educative-java.description"),
      skills: (t.raw("academic.educative-java.skills") as string[]),
    },
    {
      id: "sena-python",
      type: "academica",
      title: t("academic.sena-python.title"),
      organization: t("academic.sena-python.organization"),
      period: t("academic.sena-python.period"),
      description: t("academic.sena-python.description"),
      skills: (t.raw("academic.sena-python.skills") as string[]),
    },
    {
      id: "sena-calidad",
      type: "academica",
      title: t("academic.sena-calidad.title"),
      organization: t("academic.sena-calidad.organization"),
      period: t("academic.sena-calidad.period"),
      description: t("academic.sena-calidad.description"),
      skills: (t.raw("academic.sena-calidad.skills") as string[]),
    },
    {
      id: "sena-logistica",
      type: "academica",
      title: t("academic.sena-logistica.title"),
      organization: t("academic.sena-logistica.organization"),
      period: t("academic.sena-logistica.period"),
      description: t("academic.sena-logistica.description"),
      skills: (t.raw("academic.sena-logistica.skills") as string[]),
    },
  ];

  const workExperiences: readonly ExperienceItem[] = [
    {
      id: "ecoplaza-lead",
      type: "laboral",
      title: t("work.ecoplaza-lead.title"),
      organization: t("work.ecoplaza-lead.organization"),
      period: t("work.ecoplaza-lead.period"),
      description: t("work.ecoplaza-lead.description"),
      skills: (t.raw("work.ecoplaza-lead.skills") as string[]),
    },
    {
      id: "freelance-frontend",
      type: "laboral",
      title: t("work.freelance-frontend.title"),
      organization: t("work.freelance-frontend.organization"),
      period: t("work.freelance-frontend.period"),
      description: t("work.freelance-frontend.description"),
      skills: (t.raw("work.freelance-frontend.skills") as string[]),
    },
    {
      id: "fatima-logistica",
      type: "laboral",
      title: t("work.fatima-logistica.title"),
      organization: t("work.fatima-logistica.organization"),
      period: t("work.fatima-logistica.period"),
      description: t("work.fatima-logistica.description"),
      skills: (t.raw("work.fatima-logistica.skills") as string[]),
    },
  ];

  return (
    <section
      id="experiencia"
      className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-18 lg:px-8 lg:py-20 overflow-hidden scroll-mt-16 sm:scroll-mt-20"
      aria-labelledby="experience-heading"
    >
      <motion.div
        variants={sectionHeaderVariants}
        initial={shouldReduceMotion ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="mx-auto max-w-3xl text-center"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold uppercase tracking-widest text-foreground shadow-sm">
          <Sparkles className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
          <span>{t("sectionLabel")}</span>
        </div>
        <h2
          id="experience-heading"
          className="mt-3.5 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground"
        >
          {t("titlePart1")}{" "}
          <span className="text-accent">
            {t("titlePart2")}
          </span>
        </h2>
        <p className="mt-3 text-sm sm:text-base leading-relaxed text-muted-foreground">
          {t("subtitle")}
        </p>
      </motion.div>

      <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div>
          <div className="mb-6 flex items-center gap-3 pl-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-accent/25 bg-accent-subtle/50 text-accent shadow-xs dark:border-accent/30 dark:bg-accent-subtle/30">
              <GraduationCap className="h-4.5 w-4.5" aria-hidden="true" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
              {t("educationTitle")}
            </h3>
          </div>
          <ExperienceTimeline
            items={academicExperiences}
            direction="left"
            skillsAriaLabel={t("skillsAriaLabel")}
          />
        </div>

        <div>
          <div className="mb-6 flex items-center gap-3 pl-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-accent/25 bg-accent-subtle/50 text-accent shadow-xs dark:border-accent/30 dark:bg-accent-subtle/30">
              <Briefcase className="h-4.5 w-4.5" aria-hidden="true" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
              {t("workTitle")}
            </h3>
          </div>
          <ExperienceTimeline
            items={workExperiences}
            direction="right"
            skillsAriaLabel={t("skillsAriaLabel")}
          />
        </div>
      </div>
    </section>
  );
}
