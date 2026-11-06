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
  PROJECT_CATEGORIES,
  type ProjectCategory,
  type Project,
} from "@/data/projects";
import { ScrambleText } from "@/components/ui/scramble-text";

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
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("all");
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const prefersReducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

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

  return (
    <section
      id="proyectos"
      className="relative mx-auto max-w-7xl scroll-mt-20 px-4 py-20 sm:px-6 lg:px-8 overflow-hidden"
      aria-label="Proyectos de Ingeniería de Software"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {/* Encabezado de Sección */}
      <div className="mx-auto max-w-3xl text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-400 shadow-sm shadow-emerald-500/10">
          <Sparkles className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
          <span>Sistemas Distribuidos & Hardware</span>
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight text-zinc-100 sm:text-4xl lg:text-5xl">
          <ScrambleText text="Proyectos de " trigger="view" />
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            <ScrambleText text="Ingeniería" trigger="view" />
          </span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
          Sistemas construidos con foco en rendimiento, arquitecturas distribuidas, hardware integrado y tipado seguro.
        </p>
      </div>

      {/* Pestañas de Filtro de Categoría */}
      <div className="mt-8 flex justify-center">
        <nav
          className="inline-flex rounded-2xl border border-zinc-800/80 bg-zinc-900/80 p-1.5 shadow-xl backdrop-blur-md"
          role="tablist"
          aria-label="Filtrar proyectos por categoría"
        >
          {PROJECT_CATEGORIES.map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                aria-controls="projects-stage"
                onClick={() => handleCategorySelect(tab.id)}
                className={`relative rounded-xl px-4 py-2 text-xs font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 sm:text-sm cursor-pointer ${
                  isActive ? "text-zinc-100" : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeProjectsFilter"
                    className="absolute inset-0 rounded-xl border border-zinc-700/60 bg-zinc-800 shadow-inner"
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

          return (
            <div
              key={project.id}
              onClick={() => setActiveIndex(i)}
              className={`card group absolute flex h-[435px] w-[380px] md:w-[390px] cursor-pointer flex-col justify-between rounded-2xl border px-6 py-5 backdrop-blur-xl shadow-2xl transition-all duration-500 select-none ${
                isCurrent
                  ? "border-emerald-500/60 bg-gradient-to-b from-[#0f172a]/95 via-zinc-900/95 to-[#090d16] ring-2 ring-emerald-500/60 shadow-[0_15px_50px_rgba(16,185,129,0.2)]"
                  : "border-white/10 bg-gradient-to-b from-[#0d121c]/90 via-zinc-950/90 to-[#080c14] hover:border-emerald-500/30 hover:opacity-90"
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
              aria-label={`Seleccionar proyecto: ${project.title}`}
              aria-pressed={isCurrent}
            >
              {/* Acento superior de brillo en la tarjeta */}
              <div
                className={`absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r transition-opacity ${
                  project.category === "desktop-iot"
                    ? "from-emerald-500 via-teal-400 to-cyan-500"
                    : "from-cyan-500 via-blue-400 to-emerald-400"
                } ${isCurrent ? "opacity-100" : "opacity-40"}`}
              />

              {/* Encabezado: Icono Temático y Badge de Estado */}
              <div className="flex items-center justify-between">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl border transition-colors ${
                    isCurrent
                      ? "border-emerald-500/40 bg-emerald-500/20 text-emerald-300"
                      : "border-zinc-800 bg-zinc-900/80 text-zinc-400"
                  }`}
                >
                  <ProjectIcon className="h-5 w-5" aria-hidden="true" />
                </div>

                <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-950/60 px-2.5 py-1 text-[11px] font-medium text-emerald-400">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  <span>En producción</span>
                </span>
              </div>

              {/* Categoría, Título y Métrica Técnica */}
              <div className="my-auto py-2">
                <span className="inline-block rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-400">
                  {project.category === "desktop-iot"
                    ? "Desktop & IoT"
                    : "Full-Stack Web"}
                </span>

                <h3 className="mt-1.5 text-xl font-bold tracking-tight text-zinc-100 line-clamp-1">
                  {project.title}
                </h3>

                <div className="mt-2 inline-flex items-center gap-1.5 rounded-md border border-zinc-800 bg-zinc-950/80 px-2.5 py-1 font-mono text-xs text-cyan-400">
                  <Activity className="h-3.5 w-3.5 text-cyan-400 shrink-0" aria-hidden="true" />
                  <span className="truncate">{project.metrics}</span>
                </div>

                <p className="mt-2.5 text-xs leading-relaxed text-zinc-300 line-clamp-2 sm:line-clamp-3">
                  {project.description}
                </p>

                {/* Chips de Tecnologías */}
                <div className="mt-3.5 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-zinc-800 bg-zinc-950/70 px-2 py-0.5 font-mono text-[10px] text-zinc-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Botones de Acción en la Base con Iluminación "Foot-Bloom" */}
              <div className="border-t border-zinc-800/80 pt-3.5 flex items-center gap-3">
                {/* Botón Código Fuente */}
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  aria-label={`Ver código fuente de ${project.title} en GitHub`}
                  className="group relative flex-1 h-10 inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl border border-zinc-700/60 bg-[#0a111d] px-4 text-xs sm:text-sm font-medium text-zinc-200 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-500 hover:text-white hover:shadow-cyan-500/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                >
                  <span
                    className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-400/20 to-transparent"
                    aria-hidden="true"
                  />
                  <span
                    className="pointer-events-none absolute bottom-0 left-1/2 h-[18px] w-3/4 -translate-x-1/2 bg-[radial-gradient(ellipse_at_bottom,rgba(6,182,212,0.45)_0%,rgba(16,185,129,0.25)_45%,transparent_80%)] blur-[2px] opacity-70 transition-all duration-300 group-hover:h-[22px] group-hover:w-full group-hover:opacity-100"
                    aria-hidden="true"
                  />
                  <span
                    className="pointer-events-none absolute inset-x-2 bottom-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent transition-all duration-300 group-hover:via-emerald-400"
                    aria-hidden="true"
                  />
                  <GithubIcon className="relative z-10 w-4 h-4 shrink-0 text-zinc-300 group-hover:text-white" />
                  <span className="relative z-10">Código</span>
                </a>

                {/* Botón Demo en Vivo */}
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  aria-label={`Ver demo en vivo de ${project.title}`}
                  className="group relative flex-1 h-10 inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl border border-emerald-500/30 bg-[#0a111d] px-4 text-xs sm:text-sm font-medium text-zinc-100 shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-400/60 hover:shadow-emerald-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                >
                  <span
                    className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent"
                    aria-hidden="true"
                  />
                  <span
                    className="pointer-events-none absolute bottom-0 left-1/2 h-[18px] w-4/5 -translate-x-1/2 bg-[radial-gradient(ellipse_at_bottom,rgba(16,185,129,0.7)_0%,rgba(6,182,212,0.4)_45%,transparent_80%)] blur-[2px] opacity-80 transition-all duration-300 group-hover:h-[22px] group-hover:w-full group-hover:opacity-100"
                    aria-hidden="true"
                  />
                  <span
                    className="pointer-events-none absolute inset-x-2 bottom-0 h-[1.5px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent transition-all duration-300 group-hover:via-cyan-300"
                    aria-hidden="true"
                  />
                  <ExternalLink
                    className="relative z-10 w-4 h-4 shrink-0 text-emerald-400 group-hover:text-cyan-300"
                    aria-hidden="true"
                  />
                  <span className="relative z-10">Demo</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Controles Flotantes Inferiores de Navegación (Flechas e Indicador Paginador) */}
      <div className="mt-8 hidden items-center justify-center gap-4 md:flex">
        <button
          type="button"
          onClick={handlePrev}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/90 text-zinc-300 shadow-lg transition-all hover:border-emerald-500/50 hover:bg-zinc-800 hover:text-white hover:shadow-emerald-500/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 cursor-pointer"
          aria-label="Proyecto anterior"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900/90 px-4 py-2 font-mono text-xs font-semibold text-zinc-300 shadow-lg">
          <span className="text-emerald-400">
            {String(safeActiveIndex + 1).padStart(2, "0")}
          </span>
          <span className="text-zinc-600">/</span>
          <span>{String(filteredProjects.length).padStart(2, "0")}</span>
        </div>

        <button
          type="button"
          onClick={handleNext}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/90 text-zinc-300 shadow-lg transition-all hover:border-emerald-500/50 hover:bg-zinc-800 hover:text-white hover:shadow-emerald-500/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 cursor-pointer"
          aria-label="Siguiente proyecto"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      {/* Vista Móvil y Tablet (<= 768px): Flujo Vertical Accesible sin Desbordamiento */}
      <div className="mt-8 flex flex-col gap-6 md:hidden">
        {filteredProjects.map((project, idx) => {
          const isSelected = idx === safeActiveIndex;
          const ProjectIcon = getProjectIcon(project.id);

          return (
            <article
              key={project.id}
              onClick={() => setActiveIndex(idx)}
              className={`flex flex-col justify-between rounded-2xl border p-6 backdrop-blur-md transition-all ${
                isSelected
                  ? "border-emerald-500/60 bg-gradient-to-b from-[#0f172a] to-zinc-950 ring-1 ring-emerald-500/50 shadow-lg shadow-emerald-500/5"
                  : "border-white/10 bg-gradient-to-b from-[#0d121c] to-zinc-950"
              }`}
            >
              {/* Encabezado */}
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                  <ProjectIcon className="h-5 w-5" aria-hidden="true" />
                </div>
                <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-950/60 px-2.5 py-1 text-[11px] font-medium text-emerald-400">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  <span>En producción</span>
                </span>
              </div>

              {/* Detalles */}
              <div className="my-4">
                <span className="inline-block rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-400">
                  {project.category === "desktop-iot"
                    ? "Desktop & IoT"
                    : "Full-Stack Web"}
                </span>
                <h3 className="mt-2 text-xl font-bold tracking-tight text-zinc-100">
                  {project.title}
                </h3>
                <div className="mt-2 inline-flex items-center gap-1.5 rounded-md border border-zinc-800 bg-zinc-950/80 px-2.5 py-1 font-mono text-xs text-cyan-400">
                  <Activity className="h-3.5 w-3.5 text-cyan-400 shrink-0" aria-hidden="true" />
                  <span className="truncate">{project.metrics}</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                  {project.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-zinc-800 bg-zinc-950/70 px-2 py-0.5 font-mono text-xs text-zinc-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Botones */}
              <div className="border-t border-zinc-800/80 pt-4 flex items-center gap-3">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Ver código fuente de ${project.title} en GitHub`}
                  className="flex-1 h-10 inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-700/60 bg-[#0a111d] px-4 text-xs sm:text-sm font-medium text-zinc-200 transition-colors hover:border-zinc-500 hover:text-white"
                >
                  <GithubIcon className="w-4 h-4 shrink-0 text-zinc-300" />
                  <span>Código</span>
                </a>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Ver demo en vivo de ${project.title}`}
                  className="flex-1 h-10 inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-500/30 bg-[#0a111d] px-4 text-xs sm:text-sm font-medium text-zinc-100 transition-colors hover:border-emerald-400/60"
                >
                  <ExternalLink className="w-4 h-4 shrink-0 text-emerald-400" aria-hidden="true" />
                  <span>Demo</span>
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
