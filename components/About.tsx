"use client";

import { useSyncExternalStore } from "react";
import { motion, type Variants } from "framer-motion";
import {
  AppWindow,
  GraduationCap,
  Layers3,
  MapPin,
  MonitorCog,
  Network,
  Sparkles,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { PersonalGallery } from "@/components/ui/PersonalGallery";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import {
  InfiniteMarquee,
  type MarqueeItem,
} from "@/components/ui/infinite-marquee";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.08 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

let hasPlayedAboutIntro = false;
const aboutIntroListeners = new Set<() => void>();

function subscribeToAboutIntro(listener: () => void) {
  aboutIntroListeners.add(listener);
  return () => aboutIntroListeners.delete(listener);
}

function markAboutIntroAsPlayed() {
  if (hasPlayedAboutIntro) return;
  hasPlayedAboutIntro = true;
  aboutIntroListeners.forEach((listener) => listener());
}

export default function About() {
  const t = useTranslations("About");
  const shouldReduceMotion = usePrefersReducedMotion();
  const hasPlayedIntro = useSyncExternalStore(
    subscribeToAboutIntro,
    () => hasPlayedAboutIntro,
    () => false
  );

  const quickFacts = [
    {
      id: "location",
      label: t("facts.locationLabel"),
      value: t("facts.locationValue"),
      icon: MapPin,
    },
    {
      id: "semester",
      label: t("facts.semesterLabel"),
      value: t("facts.semesterValue"),
      icon: GraduationCap,
    },
    {
      id: "interests",
      label: t("facts.interestsLabel"),
      value: t("facts.interestsValue"),
      icon: Network,
    },
  ];

  const frameworks: readonly MarqueeItem[] = [
    { name: "Next.js", category: t("frameworkCategories.web"), icon: MonitorCog },
    { name: "Tailwind CSS", category: t("frameworkCategories.css"), icon: Layers3 },
    { name: "Tauri 2", category: t("frameworkCategories.desktop"), icon: AppWindow },
  ];

  return (
    <section
      id="sobre-mi"
      aria-labelledby="about-title"
      className="relative mx-auto max-w-6xl overflow-hidden px-4 pb-6 pt-12 sm:px-6 sm:pb-8 sm:pt-14 lg:px-8 lg:pb-10 lg:pt-16"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-24 -z-10 h-72 w-72 rounded-full bg-accent/5 blur-3xl dark:bg-accent/10"
      />

      <motion.div
        variants={containerVariants}
        initial={shouldReduceMotion || hasPlayedIntro ? false : "hidden"}
        whileInView="visible"
        onViewportEnter={markAboutIntroAsPlayed}
        viewport={{ once: true, amount: 0.12 }}
        className="space-y-8 lg:space-y-10"
      >
        <motion.header variants={itemVariants} className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
            <span>{t("sectionLabel")}</span>
          </div>

          <div className="flex items-end gap-4">
            <h2
              id="about-title"
              className="text-2xl font-extrabold tracking-[-0.04em] text-foreground sm:text-3xl lg:text-4xl"
            >
              {t("title")}
            </h2>
            <span
              aria-hidden="true"
              className="mb-2 hidden h-px flex-1 bg-gradient-to-r from-accent/70 to-transparent sm:block"
            />
          </div>

          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {t("subtitle")}
          </p>
        </motion.header>

        <div className="grid items-center gap-7 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] lg:gap-10">
          <motion.div variants={itemVariants}>
            <PersonalGallery />
          </motion.div>

          <motion.div variants={itemVariants} className="min-w-0 space-y-5">
            <div className="space-y-2.5">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                {t("introEyebrow")}
              </p>
              <h3 className="max-w-xl text-xl font-bold tracking-[-0.025em] text-foreground sm:text-2xl">
                {t("bioTitle")}
              </h3>
              <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
                {t("bio")}
              </p>
            </div>

            <dl className="grid gap-2.5 sm:grid-cols-3">
              {quickFacts.map((fact) => {
                const Icon = fact.icon;
                return (
                  <div
                    key={fact.id}
                    className="group rounded-xl border border-accent/60 bg-surface p-3 shadow-sm transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-accent hover:shadow-md motion-reduce:transform-none"
                  >
                    <Icon className="mb-2.5 h-3.5 w-3.5 text-accent" aria-hidden="true" />
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                      {fact.label}
                    </dt>
                    <dd className="mt-1 text-xs font-semibold leading-snug text-foreground sm:text-[13px]">
                      {fact.value}
                    </dd>
                  </div>
                );
              })}
            </dl>

            <div className="border-t border-border pt-4">
              <div className="mb-1 flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-sm font-bold text-foreground">{t("frameworksTitle")}</h3>
                <p className="text-xs text-muted-foreground">{t("frameworksSubtitle")}</p>
              </div>
              <InfiniteMarquee
                row1={frameworks}
                row2={[]}
                ariaLabel={t("frameworksAriaLabel")}
              />
            </div>
          </motion.div>
        </div>

      </motion.div>
    </section>
  );
}
