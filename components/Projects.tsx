"use client";

import { useState, useMemo, useCallback, useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import {
  ExternalLink,
  Terminal,
  Cpu,
  Globe,
  Sparkles,
  Smartphone,
  Gamepad2,
  Activity,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  PROJECTS,
  type ProjectCategory,
  type Project,
} from "@/data/projects";
import { ScrambleText } from "@/components/ui/scramble-text";
import { useTranslations } from "next-intl";

function GithubIcon({ className = "w-4 h-4 shrink-0" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function getProjectIcon(id: string) {
  switch (id) {
    case "ecoplaza-iot-desktop":
      return Cpu;
    case "visual-trace-mobile":
      return Smartphone;
    case "ridewake-platform":
      return Globe;
    case "lullaby-3d-game":
      return Gamepad2;
    default:
      return Terminal;
  }
}

function subscribeToReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getReducedMotionSnapshot(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot(): boolean {
  return false;
}

export default function Projects() {
  const t = useTranslations("Projects");
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("all");
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const prefersReducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  const projectCategories = [
    { id: "all" as ProjectCategory, label: t("filterAll") },
    { id: "desktop-iot" as ProjectCategory, label: t("filterDesktop") },
    { id: "fullstack-web" as ProjectCategory, label: t("filterWeb") },
  ];

  const filteredProjects: Project[] = useMemo(() => {
    if (activeCategory === "all") return PROJECTS;
    return PROJECTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const safeActiveIndex =
    activeIndex >= filteredProjects.length ? 0 : activeIndex;

  const handleCategorySelect = (categoryId: ProjectCategory) => {
    setActiveCategory(categoryId);
    setActiveIndex(0);
  };

  const handlePrev = useCallback(() => {
    setActiveIndex((current) =>
      current === 0 ? filteredProjects.length - 1 : current - 1
    );
  }, [filteredProjects.length]);

  const handleNext = useCallback(() => {
    setActiveIndex((current) =>
      current === filteredProjects.length - 1 ? 0 : current + 1
    );
  }, [filteredProjects.length]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      }
    },
    [handlePrev, handleNext]
  );

  const getCategoryLabel = (category: ProjectCategory) => {
    return category === "desktop-iot"
      ? t("categoryDesktop")
      : t("categoryWeb");
  };

  return (
    <section
      id="proyectos"
      className="relative mx-auto max-w-7xl scroll-mt-20 px-4 py-20 sm:px-6 lg:px-8 overflow-hidden"
      aria-label={t("sectionAriaLabel")}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {/* Encabezado de Sección */}
      <div className="mx-auto max-w-3xl text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1 text-xs font-semibold text-foreground shadow-sm">
          <Sparkles className="h-3.5 w-3.5 text-foreground" aria-hidden="true" />
          <span>{t("sectionLabel")}</span>
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          <ScrambleText text={t("titlePart1")} trigger="view" />
          <span className="bg-gradient-to-r from-foreground via-zinc-600 to-muted-foreground dark:from-foreground dark:via-zinc-300 dark:to-zinc-500 bg-clip-text text-transparent">
            <ScrambleText text={t("titlePart2")} trigger="view" />
          </span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {t("subtitle")}
        </p>
      </div>

      {/* Pestañas de Filtro de Categoría */}
      <div className="mt-8 flex justify-center">
        <nav
          className="inline-flex rounded-2xl border border-border bg-surface p-1.5 shadow-md backdrop-blur-md"
          role="tablist"
          aria-label={t("filterLabel")}
        >
          {projectCategories.map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                aria-controls="projects-stage"
                onClick={() => handleCategorySelect(tab.id)}
                className={`relative rounded-xl px-4 py-2 text-xs font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring sm:text-sm cursor-pointer ${
                  isActive ? "text-accent-foreground" : "text-muted-foreground hover:text-accent"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeProjectsFilter"
                    className="absolute inset-0 rounded-xl bg-accent shadow-sm"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Escenario 3D Exclusivo de Tarjetas (Desktop > 768px) */}
      <div
        id="projects-stage"
        className="relative mt-12 hidden h-[520px] w-full max-w-6xl mx-auto items-center justify-center overflow-visible md:flex"
        style={{
          perspective: "1200px",
          transformStyle: "preserve-3d",
        }}
      >
        {filteredProjects.map((project, i) => {
          const total = filteredProjects.length;
          let diff = (i - safeActiveIndex) % total;
          if (diff < -Math.floor(total / 2)) diff += total;
          if (diff > Math.floor(total / 2)) diff -= total;

          let translateX = 0;
          let translateZ = 0;
          let rotateY = 0;
          let scale = 1;
          let opacity = 1;
          let zIndex = 30;

          if (diff === 0) {
            translateX = 0;
            translateZ = 60;
            rotateY = 0;
            scale = 1.05;
            opacity = 1;
            zIndex = 30;
          } else if (diff === -1) {
            translateX = -365;
            translateZ = -110;
            rotateY = 22;
            scale = 0.9;
            opacity = 0.7;
            zIndex = 20;
          } else if (diff === 1) {
            translateX = 365;
            translateZ = -110;
            rotateY = -22;
            scale = 0.9;
            opacity = 0.7;
            zIndex = 20;
          } else {
            translateX = 0;
            translateZ = -220;
            rotateY = 0;
            scale = 0.8;
            opacity = 0.4;
            zIndex = 10;
          }

          const isCurrent = diff === 0;
          const ProjectIcon = getProjectIcon(project.id);
          const description = t(`descriptions.${project.id}` as Parameters<typeof t>[0]);
          const metric = t(`metrics.${project.id}` as Parameters<typeof t>[0]);

          return (
            <div
              key={project.id}
              onClick={() => setActiveIndex(i)}
              className={`card group absolute flex h-[435px] w-[380px] md:w-[390px] cursor-pointer flex-col justify-between rounded-2xl border px-6 py-5 backdrop-blur-xl shadow-xl transition-all duration-500 select-none ${
                isCurrent
                  ? "border-accent bg-surface shadow-2xl ring-1 ring-accent/30"
                  : "border-border bg-surface/90 hover:border-border-hover hover:opacity-95 shadow-md"
              }`}
              style={{
                transform: prefersReducedMotion
                  ? "none"
                  : `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                opacity,
                zIndex,
              }}
              role="button"
              tabIndex={0}
              aria-label={t("selectProject", { title: project.title })}
              aria-pressed={isCurrent}
            >
              {/* Acento superior de brillo monocromático en la tarjeta */}
              <div
                className={`absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-accent via-accent/40 to-transparent transition-opacity ${
                  isCurrent ? "opacity-100" : "opacity-30"
                }`}
              />

              {/* Encabezado: Icono Temático y Badge de Estado */}
              <div className="flex items-center justify-between">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl border transition-colors ${
                    isCurrent
                      ? "border-accent/40 bg-accent-muted text-accent"
                      : "border-border bg-surface-muted text-muted-foreground"
                  }`}
                >
                  <ProjectIcon className="h-5 w-5" aria-hidden="true" />
                </div>

                <span className="flex items-center gap-1.5 rounded-full border border-border bg-surface-muted px-2.5 py-1 text-[11px] font-medium text-foreground">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-30" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                  </span>
                  <span>{t("inProduction")}</span>
                </span>
              </div>

              {/* Categoría, Título y Métrica Técnica */}
              <div className="my-auto py-2">
                <span className="inline-block rounded-md border border-border bg-surface-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-foreground">
                  {getCategoryLabel(project.category)}
                </span>

                <h3 className="mt-1.5 text-xl font-bold tracking-tight text-foreground line-clamp-1">
                  {project.title}
                </h3>

                <div className="mt-2 inline-flex items-center gap-1.5 rounded-md border border-border bg-surface-muted px-2.5 py-1 font-mono text-xs text-foreground">
                  <Activity className="h-3.5 w-3.5 text-foreground shrink-0" aria-hidden="true" />
                  <span className="truncate">{metric}</span>
                </div>

                <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground line-clamp-2 sm:line-clamp-3">
                  {description}
                </p>

                {/* Chips de Tecnologías */}
                <div className="mt-3.5 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-border bg-surface-muted px-2 py-0.5 font-mono text-[10px] text-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Botones de Acción */}
              <div className="border-t border-border pt-3.5 flex items-center gap-3">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t("viewSourceCode", { title: project.title })}
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1 h-9 inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-surface px-4 text-xs font-medium text-foreground transition-colors hover:bg-surface-muted hover:border-border-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
                >
                  <GithubIcon className="w-3.5 h-3.5 shrink-0" />
                  <span>{t("codeButton")}</span>
                </a>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t("viewLiveDemo", { title: project.title })}
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1 h-9 inline-flex items-center justify-center gap-2 rounded-xl bg-accent-action px-4 text-xs font-semibold text-accent-action-foreground transition-colors hover:bg-accent-action-hover shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
                >
                  <ExternalLink className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>{t("demoButton")}</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Controles del Escenario: Paginación y Botones Prev/Next */}
      <div className="mt-6 hidden md:flex items-center justify-center gap-6">
        <button
          type="button"
          onClick={handlePrev}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface text-foreground shadow-sm transition-all hover:bg-surface-muted hover:border-border-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring cursor-pointer"
          aria-label={t("previousProject")}
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="flex items-center gap-2" role="tablist" aria-label={t("selectSlide")}>
          {filteredProjects.map((_, dotIdx) => (
            <button
              key={dotIdx}
              type="button"
              role="tab"
              aria-selected={dotIdx === safeActiveIndex}
              onClick={() => setActiveIndex(dotIdx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                dotIdx === safeActiveIndex
                ? "w-8 bg-accent shadow-sm"
                  : "w-2 bg-border hover:bg-muted-foreground"
              }`}
              aria-label={t("goToProject", { number: dotIdx + 1 })}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={handleNext}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface text-foreground shadow-sm transition-all hover:bg-surface-muted hover:border-border-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring cursor-pointer"
          aria-label={t("nextProject")}
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      {/* Vista Móvil y Tablet (<= 768px): Flujo Vertical Accesible */}
      <div className="mt-8 flex flex-col gap-6 md:hidden">
        {filteredProjects.map((project, idx) => {
          const isSelected = idx === safeActiveIndex;
          const ProjectIcon = getProjectIcon(project.id);
          const description = t(`descriptions.${project.id}` as Parameters<typeof t>[0]);
          const metric = t(`metrics.${project.id}` as Parameters<typeof t>[0]);

          return (
            <article
              key={project.id}
              onClick={() => setActiveIndex(idx)}
              className={`flex flex-col justify-between rounded-2xl border p-6 backdrop-blur-md transition-all ${
                isSelected
                  ? "border-accent bg-surface ring-1 ring-accent/30 shadow-lg"
                  : "border-border bg-surface"
              }`}
            >
              {/* Encabezado */}
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface-muted text-foreground">
                  <ProjectIcon className="h-5 w-5" aria-hidden="true" />
                </div>
                <span className="flex items-center gap-1.5 rounded-full border border-border bg-surface-muted px-2.5 py-1 text-[11px] font-medium text-foreground">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-30" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                  </span>
                  <span>{t("inProduction")}</span>
                </span>
              </div>

              {/* Detalles */}
              <div className="my-4">
                <span className="inline-block rounded-md border border-border bg-surface-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-foreground">
                  {getCategoryLabel(project.category)}
                </span>
                <h3 className="mt-2 text-xl font-bold tracking-tight text-foreground">
                  {project.title}
                </h3>
                <div className="mt-2 inline-flex items-center gap-1.5 rounded-md border border-border bg-surface-muted px-2.5 py-1 font-mono text-xs text-foreground">
                  <Activity className="h-3.5 w-3.5 text-foreground shrink-0" aria-hidden="true" />
                  <span className="truncate">{metric}</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {description}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-border bg-surface-muted px-2 py-0.5 font-mono text-xs text-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Botones */}
              <div className="border-t border-border pt-4 flex items-center gap-3">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t("viewSourceCode", { title: project.title })}
                  className="flex-1 h-10 inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-surface px-4 text-xs sm:text-sm font-medium text-foreground transition-colors hover:bg-surface-muted hover:border-border-hover"
                >
                  <GithubIcon className="w-4 h-4 shrink-0 text-foreground" />
                  <span>{t("codeButton")}</span>
                </a>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t("viewLiveDemo", { title: project.title })}
                  className="flex-1 h-10 inline-flex items-center justify-center gap-2 rounded-xl bg-accent-action px-4 text-xs sm:text-sm font-semibold text-accent-action-foreground transition-colors hover:bg-accent-action-hover shadow-sm"
                >
                  <ExternalLink className="w-4 h-4 shrink-0 text-background" aria-hidden="true" />
                  <span>{t("demoButton")}</span>
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
