"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";
import { ExternalLink, ImageOff, X } from "lucide-react";
import { useTranslations } from "next-intl";
import type {
  Project,
  ProjectCategory,
  RepositoryKind,
} from "@/data/projects";

interface ProjectDetailsModalProps {
  isOpen: boolean;
  project: Project;
  onClose: () => void;
}

const FOCUSABLE_ELEMENTS = [
  "a[href]",
  "button:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

function GithubIcon({ className = "h-4 w-4" }: { className?: string }) {
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

export default function ProjectDetailsModal({
  isOpen,
  project,
  onClose,
}: ProjectDetailsModalProps) {
  const t = useTranslations("Projects");
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const categoryLabel = t(
    `categories.${project.category}` as `categories.${ProjectCategory}`
  );
  const description = t(
    `descriptions.${project.id}` as Parameters<typeof t>[0]
  );
  const getRepositoryLabel = (kind: RepositoryKind) =>
    t(`repositoryLabels.${kind}` as Parameters<typeof t>[0]);

  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusFrame = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusableElements = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_ELEMENTS)
      ).filter((element) => !element.hasAttribute("disabled"));

      if (focusableElements.length === 0) {
        event.preventDefault();
        dialogRef.current.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey && activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      } else if (!dialogRef.current.contains(activeElement)) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="project-dialog-backdrop fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950/65 p-4 backdrop-blur-sm sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        id="project-details-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-dialog-title"
        aria-describedby="project-dialog-description"
        tabIndex={-1}
        className="project-dialog-panel relative max-h-[calc(100dvh-2rem)] w-full max-w-3xl overflow-y-auto rounded-3xl border border-accent/40 bg-surface shadow-2xl shadow-black/30 outline-none sm:max-h-[calc(100dvh-3rem)]"
      >
        <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-border bg-surface/95 px-4 py-3 backdrop-blur-md sm:px-5">
          <div className="min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-accent">
              {t("technicalSummary")}
            </span>
            <h3
              id="project-dialog-title"
              className="truncate text-lg font-extrabold text-foreground sm:text-xl"
            >
              {project.title}
            </h3>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label={t("closeDetailsAria", { title: project.title })}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-surface-muted text-foreground transition-colors hover:border-accent/45 hover:bg-accent-muted hover:text-accent-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring dark:hover:text-accent"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </header>

        <div className="grid gap-5 p-4 sm:p-5 md:grid-cols-[0.9fr_1.1fr]">
          <div className="relative min-h-44 overflow-hidden rounded-2xl border border-accent/25 bg-surface-muted md:min-h-64">
            {project.imageSrc ? (
              <Image
                src={project.imageSrc}
                alt={t("projectImageAlt", { title: project.title })}
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
              />
            ) : (
              <div
                role="img"
                aria-label={t("screenshotPendingAria", { title: project.title })}
                className="flex h-full min-h-44 flex-col items-center justify-center gap-3 bg-gradient-to-br from-accent-muted via-surface-muted to-surface p-6 text-center md:min-h-64"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-accent/30 bg-surface text-accent shadow-sm">
                  <ImageOff className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <span className="block text-sm font-bold text-foreground">
                    {t("screenshotPending")}
                  </span>
                  <span className="mt-1 block text-xs text-muted-foreground">
                    {t("screenshotPendingHint")}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="flex min-w-0 flex-col">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-accent/30 bg-accent-muted px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-accent-hover dark:text-accent">
                {categoryLabel}
              </span>
              {project.collaborative && (
                <span className="rounded-full border border-border bg-surface-muted px-2.5 py-1 text-[10px] font-semibold text-muted-foreground">
                  {t("collaborative")}
                </span>
              )}
            </div>

            <p
              id="project-dialog-description"
              className="mt-4 text-sm leading-relaxed text-muted-foreground"
            >
              {description}
            </p>

            <h4 className="mt-5 text-xs font-bold uppercase tracking-[0.12em] text-foreground">
              {t("technologiesHeading")}
            </h4>
            <ul
              className="mt-2 flex flex-wrap gap-1.5"
              aria-label={t("technologiesLabel", { title: project.title })}
            >
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-lg border border-border bg-surface-muted px-2.5 py-1 font-mono text-[10px] text-foreground"
                >
                  {tag}
                </li>
              ))}
            </ul>

            <h4 className="mt-5 text-xs font-bold uppercase tracking-[0.12em] text-foreground">
              {t("repositoriesHeading")}
            </h4>
            <div className="mt-2 flex flex-wrap gap-2">
              {project.repositories.map((repository) => {
                const repositoryLabel = getRepositoryLabel(repository.kind);

                return (
                  <a
                    key={repository.url}
                    href={repository.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t("viewRepository", {
                      repository: repositoryLabel,
                      title: project.title,
                    })}
                    className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-xl border border-accent/35 bg-surface px-3 text-xs font-bold text-foreground transition-colors hover:bg-accent-muted hover:text-accent-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring dark:hover:text-accent"
                  >
                    <GithubIcon />
                    <span>{repositoryLabel}</span>
                  </a>
                );
              })}

              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t("viewLiveDemo", { title: project.title })}
                  className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-accent-action px-3 text-xs font-bold text-accent-action-foreground transition-colors hover:bg-accent-action-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
                >
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  <span>{t("demoButton")}</span>
                </a>
              ) : (
                <span
                  aria-disabled="true"
                  className="inline-flex min-h-10 flex-1 cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-border bg-surface-muted px-3 text-xs font-semibold text-muted-foreground opacity-80"
                >
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{t("demoUnavailable")}</span>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .project-dialog-backdrop {
          animation: dialog-backdrop-in 160ms ease-out both;
        }

        .project-dialog-panel {
          animation: dialog-panel-in 190ms ease-out both;
        }

        @keyframes dialog-backdrop-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes dialog-panel-in {
          from { opacity: 0; transform: translateY(8px) scale(0.99); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @media (prefers-reduced-motion: reduce) {
          .project-dialog-backdrop,
          .project-dialog-panel {
            animation: none;
          }
        }
      `}</style>
    </div>,
    document.body
  );
}
