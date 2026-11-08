"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { Briefcase, Calendar, GraduationCap, Sparkles } from "lucide-react";
import { ScrambleText } from "@/components/ui/scramble-text";
import { SpotlightCard } from "@/components/ui/spotlight-card";
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
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  return (
    <div ref={containerRef} className="relative pl-6 sm:pl-8">
      {/* Guía base inactiva */}
      <div
        className="absolute left-2.5 sm:left-3.5 top-3 bottom-3 w-[2px] bg-border rounded-full"
        aria-hidden="true"
      />

      {/* Trazo activo animado reactivo al scroll */}
      <motion.div
        style={{
          scaleY: shouldReduceMotion ? 1 : scrollYProgress,
          transformOrigin: "top",
        }}
        className="absolute left-2.5 sm:left-3.5 top-3 bottom-3 w-[2px] rounded-full bg-accent shadow-sm"
        aria-hidden="true"
      >
        <div
          className="absolute bottom-0 -left-[3px] h-2 w-2 rounded-full bg-accent shadow-sm"
          aria-hidden="true"
        />
      </motion.div>

      <ol className="space-y-6">
        {items.map((item, index) => (
          <li key={item.id} className="group relative pl-6 sm:pl-8">
            {/* Nodo circular monocromático */}
            <span
              className="absolute -left-[19px] sm:-left-[23px] top-5 h-4 w-4 rounded-full border-2 border-border bg-surface shadow-sm transition-transform duration-300 group-hover:scale-125"
              aria-hidden="true"
            >
              <span className="absolute inset-0 rounded-full bg-accent opacity-30 animate-ping" />
              <span className="relative block h-full w-full rounded-full bg-accent" />
            </span>

            {/* Tarjeta Spotlight */}
            <motion.div
              initial={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : {
                      opacity: 0,
                      x: direction === "left" ? -30 : 30,
                      filter: "blur(6px)",
                    }
              }
              whileInView={
                shouldReduceMotion
                  ? { opacity: 1 }
                  : { opacity: 1, x: 0, filter: "blur(0px)" }
              }
              viewport={{ once: false, margin: "-80px" }}
              transition={{
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
                delay: index * 0.05,
              }}
            >
              <SpotlightCard className="p-4 sm:p-5">
                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <Calendar
                    className="h-3.5 w-3.5 text-accent"
                    aria-hidden="true"
                  />
                  <time>{item.period}</time>
                </div>

                <h4 className="mt-2.5 text-base sm:text-lg font-bold leading-snug text-foreground transition-colors">
                  {item.title}
                </h4>

                <p className="mt-1 text-xs sm:text-sm font-semibold text-foreground">
                  {item.organization}
                </p>

                <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>

                <ul
                  className="mt-4 flex flex-wrap gap-1.5"
                  aria-label={skillsAriaLabel}
                >
                  {item.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full border border-border bg-surface-muted px-2.5 py-0.5 text-xs font-medium text-foreground transition-all duration-200 hover:border-accent/40 hover:bg-accent-subtle hover:text-accent-hover dark:hover:text-accent"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </motion.div>
          </li>
        ))}
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
      className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-18 lg:px-8 lg:py-20 overflow-hidden"
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
          <Sparkles className="h-3.5 w-3.5 text-foreground" aria-hidden="true" />
          <span>{t("sectionLabel")}</span>
        </div>
        <h2
          id="experience-heading"
          className="mt-3.5 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground"
        >
          <ScrambleText text={t("titlePart1")} trigger="view" />
          <span className="bg-gradient-to-r from-foreground via-zinc-600 to-muted-foreground dark:from-foreground dark:via-zinc-300 dark:to-zinc-500 bg-clip-text text-transparent">
            <ScrambleText text={t("titlePart2")} trigger="view" />
          </span>
        </h2>
        <p className="mt-3 text-sm sm:text-base leading-relaxed text-muted-foreground">
          {t("subtitle")}
        </p>
      </motion.div>

      <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div>
          <div className="mb-6 flex items-center gap-3 pl-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-surface-muted text-foreground shadow-sm">
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
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-surface-muted text-foreground shadow-sm">
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
