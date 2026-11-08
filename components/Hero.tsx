"use client";

import React, { useRef, useEffect, useSyncExternalStore } from "react";
import Image from "next/image";
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
} from "lucide-react";
import { BackgroundLines } from "@/components/ui/background-lines";
import { ScrambleText } from "@/components/ui/scramble-text";
import { ParticleNetwork } from "@/components/ui/particle-network";
import { useTranslations } from "next-intl";

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

// Estado persistente en la sesión de navegación del cliente para evitar destellos y reinicios de animación en cambio de idioma
let hasHeroAnimatedInSession = false;
const heroListeners = new Set<() => void>();

function subscribeHero(callback: () => void) {
  heroListeners.add(callback);
  return () => {
    heroListeners.delete(callback);
  };
}

function getHeroSnapshot() {
  return hasHeroAnimatedInSession;
}

function getServerSnapshot() {
  return false;
}

export default function Hero() {
  const t = useTranslations("Hero");
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const hasAnimated = useSyncExternalStore(
    subscribeHero,
    getHeroSnapshot,
    getServerSnapshot
  );

  useEffect(() => {
    if (!hasHeroAnimatedInSession) {
      hasHeroAnimatedInSession = true;
      heroListeners.forEach((listener) => listener());
    }
  }, []);

  // Si ya se ejecutó la animación de entrada en esta sesión (o reduced motion está activo), no esconder los elementos con initial="hidden"
  const initialVariant = hasAnimated || shouldReduceMotion ? false : "hidden";

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const opacityParallax = useTransform(scrollYProgress, [0, 0.85], [1, 0.2]);

  const handleDownloadCv = () => {
    toast.success(t("toast.title"), {
      description: t("toast.description"),
      duration: 4000,
    });
  };

  return (
    <section
      ref={sectionRef}
      id="inicio"
      aria-label={t("welcome")}
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
          <div className="h-[360px] w-[360px] md:h-[500px] md:w-[500px] rounded-full bg-[var(--hero-glow-primary)] blur-[130px]" />
          <div className="h-[280px] w-[280px] md:h-[400px] md:w-[400px] rounded-full bg-[var(--hero-glow-secondary)] blur-[110px] -translate-y-12 translate-x-20" />
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
            initial={initialVariant}
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center"
          >
            {/* Columna Izquierda: Información de Ingeniería */}
            <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
              <motion.div variants={itemVariants}>
                <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-border bg-surface text-foreground backdrop-blur-md shadow-sm">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-30" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent" />
                  </span>
                  <span className="text-xs font-medium tracking-wide text-muted-foreground">
                    {t("availability")}
                  </span>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-3">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground">
                  {t("greeting")}{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-zinc-600 to-muted-foreground dark:from-foreground dark:via-zinc-300 dark:to-zinc-500">
                    Luis Sebastián Díaz
                  </span>
                </h1>
                <p className="text-lg sm:text-xl font-semibold text-muted-foreground tracking-normal">
                  <ScrambleText
                    text={t("subtitle")}
                    trigger="view"
                  />
                </p>
              </motion.div>

              <motion.p
                variants={itemVariants}
                className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed"
              >
                {t("description")}
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
                  aria-label={t("downloadCvLabel")}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-accent-action text-accent-action-foreground font-semibold text-sm shadow-md hover:bg-accent-action-hover active:scale-[0.98] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>{t("downloadCv")}</span>
                </a>

                <a
                  href="#proyectos"
                  aria-label={t("projectsLabel")}
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-border bg-surface hover:border-accent/50 hover:bg-accent-muted text-foreground text-sm font-semibold backdrop-blur-sm active:scale-[0.98] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring cursor-pointer"
                >
                  <span>{t("projects")}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </motion.div>

              {/* Insignias de Especialidad Escalonadas */}
              <motion.div
                variants={badgesContainerVariants}
                initial={initialVariant}
                animate="visible"
                className="pt-4 flex flex-wrap items-center gap-3 text-xs font-mono text-muted-foreground"
              >
                <motion.div
                  variants={badgeItemVariants}
                  whileHover={shouldReduceMotion ? undefined : { y: -3, scale: 1.03 }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-surface transition-all duration-300 hover:border-accent/50 hover:text-accent hover:shadow-sm cursor-default"
                >
                  <Terminal className="w-3.5 h-3.5 text-foreground shrink-0" />
                  <span>{t("semester")}</span>
                </motion.div>

                <motion.div
                  variants={badgeItemVariants}
                  whileHover={shouldReduceMotion ? undefined : { y: -3, scale: 1.03 }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-surface transition-all duration-300 hover:border-accent/50 hover:text-accent hover:shadow-sm cursor-default"
                >
                  <Cpu className="w-3.5 h-3.5 text-foreground shrink-0" />
                  <span>{t("stack")}</span>
                </motion.div>

                <motion.div
                  variants={badgeItemVariants}
                  whileHover={shouldReduceMotion ? undefined : { y: -3, scale: 1.03 }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-surface transition-all duration-300 hover:border-accent/50 hover:text-accent hover:shadow-sm cursor-default"
                >
                  <Layers className="w-3.5 h-3.5 text-foreground shrink-0" />
                  <span>{t("frameworks")}</span>
                </motion.div>
              </motion.div>
            </div>

            {/* Columna Derecha: Tarjeta Fotográfica Profesional & Fondo Ambiental */}
            <div className="lg:col-span-5 flex justify-center items-center relative select-none">
              {/* Capa de partículas ambiental conectada en el fondo del marco fotográfico */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-4 sm:-inset-8 z-0 overflow-hidden rounded-[32px] opacity-60 dark:opacity-75 transition-opacity"
              >
                <ParticleNetwork nodeCount={36} maxDistance={85} showMetrics={false} className="w-full h-full" />
              </div>

              <motion.div
                variants={itemVariants}
                className="group relative z-10 w-full max-w-[360px] sm:max-w-[400px] aspect-[3/4] sm:aspect-[4/5] rounded-3xl p-1.5 border border-border bg-surface/85 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:border-accent/40"
              >
                {/* Marco fotográfico interno minimalista */}
                <div className="relative w-full h-full rounded-[20px] sm:rounded-[22px] overflow-hidden border border-border/80 bg-surface-muted/50">
                  {/* Fotografía profesional de Luis Sebastián Díaz */}
                  <Image
                    src="/images/foto-perfil.png"
                    alt={t("photoAlt")}
                    fill
                    sizes="(max-width: 640px) 340px, (max-width: 1024px) 380px, 410px"
                    priority
                    quality={92}
                    className="object-cover object-[center_18%] sm:object-[center_20%] select-none transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                    draggable={false}
                  />

                  {/* Gradiente viñeta inferior sutil para fundir armónicamente la silueta en la base */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background/70 via-background/15 to-transparent dark:from-[#09090b]/80 dark:via-[#09090b]/20 z-10"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </BackgroundLines>
    </section>
  );
}
