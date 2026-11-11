"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Apple,
  ChevronDown,
  Download,
  ExternalLink,
  ImageOff,
  X,
} from "lucide-react";
import { useTranslations } from "next-intl";
import type {
  DownloadPlatform,
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

function PlatformIcon({
  platform,
  className = "h-4 w-4",
}: {
  platform: DownloadPlatform;
  className?: string;
}) {
  switch (platform) {
    case "windows":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M2.5 3.5 10 2.4v8.8H2.5V3.5zm8.7-1.4L21.5 0v11.2h-10.3V2.1zm-8.7 10.3H10v8.8L2.5 19.7v-7.3zm8.7 0H21.5V23.2l-10.3-1.6V12.4z" />
        </svg>
      );
    case "macos":
      return <Apple className={className} aria-hidden="true" />;
    case "linux":
      return (
        <svg
          className={className}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12.001 2c-2.38 0-4.31 1.93-4.31 4.31 0 .42.06.83.17 1.22-1.32.75-2.22 2.18-2.22 3.82 0 1.09.4 2.09 1.06 2.85-.31.78-.5 1.63-.5 2.53 0 3.31 2.69 6 6 6s6-2.69 6-6c0-.9-.19-1.75-.5-2.53.66-.76 1.06-1.76 1.06-2.85 0-1.64-.9-3.07-2.22-3.82.11-.39.17-.8.17-1.22 0-2.38-1.93-4.31-4.31-4.31zm-1.8 4.31c0-.99.81-1.8 1.8-1.8s1.8.81 1.8 1.8c0 .24-.05.47-.14.68-.45-.11-.92-.18-1.41-.18-.58 0-1.14.1-1.66.27-.24-.29-.39-.61-.39-.97zm-1.7 6.44c.48 0 .87.39.87.87s-.39.87-.87.87-.87-.39-.87-.87.39-.87.87-.87zm7.4 0c.48 0 .87.39.87.87s-.39.87-.87.87-.87-.39-.87-.87.39-.87.87-.87z" />
        </svg>
      );
  }
}

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
  const downloadTriggerRef = useRef<HTMLButtonElement>(null);
  const downloadsContainerRef = useRef<HTMLDivElement>(null);
  const [isDownloadsOpen, setIsDownloadsOpen] = useState(false);
  const [prevProjectId, setPrevProjectId] = useState(project.id);

  if (project.id !== prevProjectId) {
    setPrevProjectId(project.id);
    setIsDownloadsOpen(false);
  }

  const handleClose = useCallback(() => {
    setIsDownloadsOpen(false);
    onClose();
  }, [onClose]);

  const categoryLabel = t(
    `categories.${project.category}` as `categories.${ProjectCategory}`
  );
  const description = t(
    `descriptions.${project.id}` as Parameters<typeof t>[0]
  );
  const getRepositoryLabel = (kind: RepositoryKind) =>
    t(`repositoryLabels.${kind}` as Parameters<typeof t>[0]);

  useEffect(() => {
    if (!isDownloadsOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        downloadsContainerRef.current &&
        !downloadsContainerRef.current.contains(event.target as Node) &&
        downloadTriggerRef.current &&
        !downloadTriggerRef.current.contains(event.target as Node)
      ) {
        setIsDownloadsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDownloadsOpen]);

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
        if (isDownloadsOpen) {
          setIsDownloadsOpen(false);
          downloadTriggerRef.current?.focus();
          return;
        }
        handleClose();
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
  }, [isOpen, isDownloadsOpen, handleClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="project-dialog-backdrop fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950/65 p-4 backdrop-blur-sm sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) handleClose();
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
            onClick={handleClose}
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
                className="object-contain"
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

              {project.downloads && project.downloads.length > 0 ? (
                <button
                  ref={downloadTriggerRef}
                  type="button"
                  id="ecoplaza-download-trigger"
                  onClick={() => setIsDownloadsOpen((prev) => !prev)}
                  aria-expanded={isDownloadsOpen}
                  aria-controls="ecoplaza-downloads-menu"
                  aria-label={t("downloadAppAria", { title: project.title })}
                  className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-accent-action px-3 text-xs font-bold text-accent-action-foreground transition-colors hover:bg-accent-action-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring text-center"
                >
                  <Download className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{t("downloadAppButton")}</span>
                  <ChevronDown
                    className={`h-3.5 w-3.5 shrink-0 transition-transform duration-200 ${
                      isDownloadsOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>
              ) : project.downloadUrl ? (
                <a
                  href={project.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t("downloadApkAria", { title: project.title })}
                  className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-accent-action px-3 text-xs font-bold text-accent-action-foreground transition-colors hover:bg-accent-action-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring text-center"
                >
                  <Download className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{t("downloadApkButton")}</span>
                </a>
              ) : project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={
                    project.interactiveDemo
                      ? t("viewInteractiveDemoAria", { title: project.title })
                      : t("viewLiveDemo", { title: project.title })
                  }
                  className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-accent-action px-3 text-xs font-bold text-accent-action-foreground transition-colors hover:bg-accent-action-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring text-center"
                >
                  <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>
                    {project.interactiveDemo
                      ? t("interactiveDemoButton")
                      : t("demoButton")}
                  </span>
                </a>
              ) : (
                <span
                  aria-disabled="true"
                  className="inline-flex min-h-10 flex-1 cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-border bg-surface-muted px-3 text-xs font-semibold text-muted-foreground opacity-80 text-center"
                >
                  <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span>{t("demoUnavailable")}</span>
                </span>
              )}

              {isDownloadsOpen && project.downloads && project.downloads.length > 0 && (
                <div
                  id="ecoplaza-downloads-menu"
                  ref={downloadsContainerRef}
                  role="region"
                  aria-label={t("downloadAppAria", { title: project.title })}
                  className="mt-1 w-full rounded-2xl border border-accent/30 bg-surface-muted p-2 shadow-lg backdrop-blur-sm"
                >
                  <div className="flex flex-col gap-1.5">
                    {project.downloads.map((item) => (
                      <a
                        key={item.platform}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={t(`platformDownloads.${item.platform}.ariaLabel`, {
                          title: project.title,
                        })}
                        className="group flex items-center justify-between gap-3 rounded-xl border border-transparent bg-surface/60 px-3 py-2 text-xs transition-colors hover:border-accent/40 hover:bg-accent-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-accent/25 bg-surface text-accent group-hover:border-accent/60 group-hover:text-accent-hover dark:group-hover:text-accent">
                            <PlatformIcon platform={item.platform} className="h-4 w-4" />
                          </span>
                          <div className="flex flex-col text-left truncate">
                            <span className="font-bold text-foreground">
                              {t(`platformDownloads.${item.platform}.title`)}
                            </span>
                            <span className="text-[10px] text-muted-foreground">
                              {t(`platformDownloads.${item.platform}.subtitle`)}
                            </span>
                          </div>
                        </div>
                        <Download
                          className="h-3.5 w-3.5 shrink-0 text-muted-foreground group-hover:text-accent"
                          aria-hidden="true"
                        />
                      </a>
                    ))}

                    {project.allReleasesUrl && (
                      <>
                        <div className="my-1 border-t border-border/80" />
                        <a
                          href={project.allReleasesUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={t("viewAllReleasesAria", {
                            title: project.title,
                          })}
                          className="flex items-center justify-center gap-1.5 rounded-lg px-2 py-1.5 text-[11px] font-semibold text-accent-hover hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring dark:text-accent text-center"
                        >
                          <span>{t("viewAllReleases")}</span>
                          <ExternalLink
                            className="h-3 w-3 shrink-0"
                            aria-hidden="true"
                          />
                        </a>
                      </>
                    )}
                  </div>
                </div>
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
