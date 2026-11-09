"use client";

import Image from "next/image";
import {
  Cpu,
  Eye,
  Gamepad2,
  Music2,
  Pause,
  Play,
  Smartphone,
  Sparkles,
  Swords,
  Terminal,
  Watch,
} from "lucide-react";
import {
  useCallback,
  useState,
  useSyncExternalStore,
  type CSSProperties,
} from "react";
import { PROJECTS, type ProjectCategory } from "@/data/projects";
import { useTranslations } from "next-intl";
import ProjectDetailsModal from "@/components/ProjectDetailsModal";

type RingTrackStyle = CSSProperties & { "--quantity": number };
type RingCardStyle = CSSProperties & { "--index": number };

function subscribeToReducedMotion(callback: () => void) {
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

function getProjectIcon(id: string) {
  switch (id) {
    case "ecoplaza-iot-desktop":
      return Cpu;
    case "visual-trace-mobile":
      return Smartphone;
    case "ridewake-platform":
      return Watch;
    case "lullaby-3d-game":
      return Gamepad2;
    case "legado-de-valientes":
      return Swords;
    case "music-player":
      return Music2;
    default:
      return Terminal;
  }
}

export default function Projects() {
  const t = useTranslations("Projects");
  const prefersReducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );
  const [isPausedByUser, setIsPausedByUser] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(PROJECTS[0].id);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const selectedProject =
    PROJECTS.find((project) => project.id === selectedProjectId) ?? PROJECTS[0];
  const isRingPaused =
    isPausedByUser || prefersReducedMotion || isDetailsOpen;

  const getCategoryLabel = (category: ProjectCategory) =>
    t(`categories.${category}` as Parameters<typeof t>[0]);

  const openProjectDetails = useCallback((projectId: string) => {
    setSelectedProjectId(projectId);
    setIsDetailsOpen(true);
  }, []);

  const closeProjectDetails = useCallback(() => {
    setIsDetailsOpen(false);
  }, []);

  const ringTrackStyle = {
    "--quantity": PROJECTS.length,
  } as RingTrackStyle;

  return (
    <section
      className="relative mx-auto max-w-7xl overflow-hidden px-4 pb-12 pt-14 sm:px-6 sm:pb-16 sm:pt-18 lg:px-8 lg:pb-18 lg:pt-20"
      aria-label={t("sectionAriaLabel")}
    >
      {/* Encabezado y ancla conservados de la Fase 1 */}
      <div id="proyectos" className="mx-auto max-w-3xl text-center">
        <div className="mb-3.5 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold text-foreground shadow-sm">
          <Sparkles className="h-3.5 w-3.5 text-foreground" aria-hidden="true" />
          <span>{t("sectionLabel")}</span>
        </div>
        <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
          <span>{t("titlePart1")}</span>
          <span className="text-accent">{t("titlePart2")}</span>
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          {t("subtitle")}
        </p>
      </div>

      <div className="ring-shell mx-auto mt-7 max-w-6xl rounded-3xl border border-accent/25 bg-surface/70 p-3 shadow-xl shadow-zinc-950/5 backdrop-blur-sm dark:shadow-black/25 sm:mt-8 sm:p-4">
        <div className="flex flex-col gap-1 px-2 pt-1 text-center sm:px-4">
          <h3 className="text-base font-bold text-foreground sm:text-lg">
            {t("ringTitle")}
          </h3>
          <p className="mx-auto max-w-2xl text-xs leading-relaxed text-muted-foreground sm:text-sm">
            {t("ringDescription")}
          </p>
        </div>

        <div className="ring-viewport relative mt-2 overflow-hidden">
          <div
            className="ring-track"
            data-paused={isRingPaused}
            style={ringTrackStyle}
          >
            {PROJECTS.map((project, index) => {
              const ProjectIcon = getProjectIcon(project.id);
              const cardStyle = { "--index": index } as RingCardStyle;

              return (
                <button
                  key={project.id}
                  type="button"
                  className="ring-card"
                  data-selected={project.id === selectedProjectId}
                  style={cardStyle}
                  onClick={() => openProjectDetails(project.id)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      openProjectDetails(project.id);
                    }
                  }}
                  aria-label={t("ringCardAria", { title: project.title })}
                  aria-haspopup="dialog"
                  aria-controls="project-details-dialog"
                >
                  <div className="ring-card-media">
                    {project.imageSrc ? (
                      <Image
                        src={project.imageSrc}
                        alt=""
                        fill
                        sizes="160px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="ring-card-fallback">
                        <ProjectIcon aria-hidden="true" />
                        <span>{t("screenshotPending")}</span>
                      </div>
                    )}
                  </div>
                  <div className="ring-card-copy">
                    <span>{getCategoryLabel(project.category)}</span>
                    <strong>{project.title}</strong>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div
          className="ring-controls mx-auto flex max-w-4xl flex-col items-stretch justify-center gap-2 rounded-2xl border border-border bg-surface p-2.5 shadow-sm sm:flex-row sm:items-center sm:p-3"
          role="group"
          aria-label={t("ringTitle")}
        >
          <button
            type="button"
            onClick={() => setIsPausedByUser((paused) => !paused)}
            disabled={prefersReducedMotion}
            aria-pressed={isRingPaused}
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-accent/30 bg-accent-muted px-3 text-xs font-semibold text-accent-hover transition-colors hover:border-accent/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring disabled:cursor-not-allowed disabled:opacity-65 dark:text-accent"
          >
            {isRingPaused ? (
              <Play className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Pause className="h-4 w-4" aria-hidden="true" />
            )}
            <span>
              {prefersReducedMotion
                ? t("motionReduced")
                : isPausedByUser
                  ? t("resumeRing")
                  : t("pauseRing")}
            </span>
          </button>

          <label className="flex min-h-10 min-w-0 flex-1 items-center gap-2 rounded-xl border border-border bg-surface-muted px-3 text-xs font-semibold text-foreground sm:max-w-sm">
            <span className="shrink-0 text-muted-foreground">
              {t("projectSelectorLabel")}
            </span>
            <select
              value={selectedProjectId}
              onChange={(event) => setSelectedProjectId(event.target.value)}
              className="project-select min-w-0 flex-1 cursor-pointer rounded-md bg-surface px-2 py-2 text-xs font-semibold text-foreground outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            >
              {PROJECTS.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.title}
                </option>
              ))}
            </select>
          </label>

          <button
            type="button"
            onClick={() => openProjectDetails(selectedProject.id)}
            aria-controls="project-details-dialog"
            aria-haspopup="dialog"
            aria-label={t("viewDetailsAria", { title: selectedProject.title })}
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-accent-action px-4 text-xs font-bold text-accent-action-foreground shadow-sm transition-colors hover:bg-accent-action-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
          >
            <span>{t("viewDetails")}</span>
            <Eye className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <ProjectDetailsModal
        isOpen={isDetailsOpen}
        project={selectedProject}
        onClose={closeProjectDetails}
      />

      <style jsx>{`
        .ring-viewport {
          height: 315px;
          perspective: 1000px;
          perspective-origin: 50% 46%;
        }

        .ring-track {
          --ring-card-width: 142px;
          --ring-card-height: 178px;
          --ring-radius: 220px;
          position: absolute;
          left: 50%;
          top: 44%;
          width: var(--ring-card-width);
          height: var(--ring-card-height);
          transform-style: preserve-3d;
          animation: engineering-ring-spin 40s linear infinite;
          will-change: transform;
        }

        .ring-track[data-paused="true"],
        .ring-shell:has(:focus-visible) .ring-track {
          animation-play-state: paused;
        }

        .project-select {
          color-scheme: light;
          background-color: var(--surface);
          color: var(--foreground);
        }

        :global(.dark) .project-select {
          color-scheme: dark;
        }

        .project-select :global(option) {
          background-color: var(--surface);
          color: var(--foreground);
        }

        .ring-card {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          border: 1px solid color-mix(in srgb, var(--accent) 36%, transparent);
          border-radius: 16px;
          background: var(--surface);
          box-shadow: 0 18px 38px -24px rgba(9, 9, 11, 0.62);
          backface-visibility: hidden;
          transform: rotateY(calc((360deg / var(--quantity)) * var(--index)))
            translateZ(var(--ring-radius));
          transform-style: preserve-3d;
          cursor: pointer;
          padding: 0;
          text-align: left;
          outline: none;
        }

        .ring-card:focus-visible {
          border-color: var(--accent);
          box-shadow:
            0 0 0 3px color-mix(in srgb, var(--focus-ring) 40%, transparent),
            0 22px 42px -24px color-mix(in srgb, var(--accent) 58%, transparent);
        }

        .ring-card[data-selected="true"] {
          border-color: var(--accent);
          box-shadow:
            0 0 0 1px color-mix(in srgb, var(--accent) 42%, transparent),
            0 22px 42px -24px color-mix(in srgb, var(--accent) 58%, transparent);
        }

        .ring-card-media {
          position: relative;
          flex: 1;
          overflow: hidden;
          border-bottom: 1px solid color-mix(in srgb, var(--accent) 20%, transparent);
          background: var(--surface-muted);
        }

        .ring-card-fallback {
          display: flex;
          height: 100%;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px;
          color: var(--accent);
          background:
            radial-gradient(circle at 80% 18%, var(--accent-muted), transparent 34%),
            linear-gradient(145deg, var(--surface-muted), var(--surface));
        }

        .ring-card-fallback :global(svg) {
          width: 24px;
          height: 24px;
        }

        .ring-card-fallback span {
          color: var(--muted-foreground);
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .ring-card-copy {
          display: flex;
          min-height: 50px;
          flex-direction: column;
          justify-content: center;
          gap: 3px;
          padding: 9px 10px 10px;
        }

        .ring-card-copy span {
          overflow: hidden;
          color: var(--accent);
          font-size: 8px;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-overflow: ellipsis;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .ring-card-copy strong {
          display: -webkit-box;
          overflow: hidden;
          color: var(--foreground);
          font-size: 11px;
          font-weight: 800;
          line-height: 1.2;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }

        @keyframes engineering-ring-spin {
          from {
            transform: translate(-50%, -50%) rotateX(-11deg) rotateY(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotateX(-11deg) rotateY(360deg);
          }
        }

        @media (max-width: 1024px) {
          .ring-viewport {
            height: 292px;
            perspective: 900px;
          }

          .ring-track {
            --ring-card-width: 126px;
            --ring-card-height: 158px;
            --ring-radius: 185px;
          }
        }

        @media (max-width: 767px) {
          .ring-viewport {
            height: 258px;
            perspective: 820px;
          }

          .ring-track {
            --ring-card-width: 108px;
            --ring-card-height: 138px;
            --ring-radius: 142px;
          }

          .ring-card-copy {
            min-height: 44px;
            padding: 7px 8px 8px;
          }

          .ring-card-copy strong {
            font-size: 10px;
          }
        }

        @media (max-width: 430px) {
          .ring-viewport {
            height: 228px;
            perspective: 760px;
          }

          .ring-track {
            --ring-card-width: 94px;
            --ring-card-height: 122px;
            --ring-radius: 108px;
          }

          .ring-card-fallback :global(svg) {
            width: 20px;
            height: 20px;
          }

          .ring-card-fallback span {
            font-size: 7px;
          }

          .ring-card-copy {
            min-height: 40px;
          }

          .ring-card-copy span {
            font-size: 6px;
          }

          .ring-card-copy strong {
            font-size: 9px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ring-track {
            animation: none;
            transform: translate(-50%, -50%) rotateX(-11deg) rotateY(0deg);
            will-change: auto;
          }

        }
      `}</style>
    </section>
  );
}
