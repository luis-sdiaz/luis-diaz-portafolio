"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

const PHOTOS = [
  "/images/sobre-mi/futbol.png",
  "/images/sobre-mi/gatoel.png",
  "/images/sobre-mi/militar 1.png",
  "/images/sobre-mi/militar 2.png",
  "/images/sobre-mi/morochis.png",
  "/images/sobre-mi/novia.png",
  "/images/sobre-mi/pareja.png",
  "/images/sobre-mi/sobrina.png",
] as const;

const slideVariants = {
  enter: { y: "-100%", opacity: 0 },
  center: { y: "0%", opacity: 1 },
  exit: { y: "100%", opacity: 0 },
};

const reducedSlideVariants = {
  enter: { opacity: 1 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
};

export function PersonalGallery() {
  const t = useTranslations("About.gallery");
  const galleryRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(galleryRef, { amount: 0.45 });
  const shouldReduceMotion = usePrefersReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isManuallyPaused, setIsManuallyPaused] = useState(false);
  const altTexts = (t.raw("alts") as string[]) ?? [];

  const isPaused = shouldReduceMotion || !isInView || isManuallyPaused;

  const showNext = useCallback(() => {
    setActiveIndex((current) => (current + 1) % PHOTOS.length);
  }, []);

  const showPrevious = useCallback(() => {
    setActiveIndex((current) => (current - 1 + PHOTOS.length) % PHOTOS.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const intervalId = window.setInterval(showNext, 2800);
    return () => window.clearInterval(intervalId);
  }, [isPaused, showNext]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if ((event.target as HTMLElement).closest("button")) return;

    if (event.key === "ArrowRight") {
      event.preventDefault();
      showNext();
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showPrevious();
    }
  };

  const formattedIndex = String(activeIndex + 1).padStart(2, "0");
  const formattedTotal = String(PHOTOS.length).padStart(2, "0");

  return (
    <figure className="group relative mx-auto w-full max-w-md lg:mx-0">
      <div
        aria-hidden="true"
        className="absolute -inset-2 -z-10 rounded-[1.75rem] bg-accent/[0.05] blur-lg transition-opacity duration-500 group-hover:opacity-70 dark:bg-accent/[0.07]"
      />

      <div
        ref={galleryRef}
        role="region"
        aria-roledescription={t("roleDescription")}
        aria-label={t("label")}
        aria-describedby="personal-gallery-instructions personal-gallery-caption"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className="relative h-[340px] touch-pan-y overflow-hidden rounded-[1.5rem] border border-border bg-surface-muted shadow-[0_18px_50px_-30px_rgba(24,24,27,0.45)] outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background sm:h-[390px] lg:h-[410px] dark:shadow-[0_20px_55px_-32px_rgba(0,0,0,0.9)]"
      >
        <p id="personal-gallery-instructions" className="sr-only">
          {t("instructions")}
        </p>

        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={PHOTOS[activeIndex]}
            variants={shouldReduceMotion ? reducedSlideVariants : slideVariants}
            initial={shouldReduceMotion ? false : "enter"}
            animate="center"
            exit="exit"
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.65, ease: [0.22, 1, 0.36, 1] }
            }
            className="absolute inset-0"
          >
            <Image
              src={PHOTOS[activeIndex]}
              alt=""
              fill
              sizes="(max-width: 1023px) calc(100vw - 32px), 430px"
              className="scale-110 transform-gpu object-cover opacity-90 blur-lg brightness-75 saturate-90"
              aria-hidden="true"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-black/15 dark:bg-black/25" />
            <Image
              src={PHOTOS[activeIndex]}
              alt={altTexts[activeIndex] ?? ""}
              fill
              sizes="(max-width: 1023px) calc(100vw - 32px), 430px"
              priority={activeIndex === 0}
              className="object-contain"
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-x-0 top-0 z-20 flex items-start justify-between gap-4 p-3 sm:p-4">
          <span className="pointer-events-none rounded-full border border-border bg-background/80 px-2.5 py-1 font-mono text-[10px] font-semibold tracking-[0.14em] text-foreground shadow-sm backdrop-blur-md">
            {formattedIndex} / {formattedTotal}
          </span>
          {!shouldReduceMotion && (
            <button
              type="button"
              onClick={() => setIsManuallyPaused((paused) => !paused)}
              aria-label={isManuallyPaused ? t("resume") : t("pause")}
              aria-pressed={isManuallyPaused}
              title={isManuallyPaused ? t("resume") : t("pause")}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background/80 text-foreground shadow-sm backdrop-blur-md transition-colors hover:border-accent/40 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            >
              {isManuallyPaused ? (
                <Play className="h-3.5 w-3.5" aria-hidden="true" />
              ) : (
                <Pause className="h-3.5 w-3.5" aria-hidden="true" />
              )}
            </button>
          )}
        </div>
      </div>

      <figcaption id="personal-gallery-caption" className="px-1 pt-3">
        <p className="text-xs font-bold tracking-tight text-foreground">{t("caption")}</p>
        <p className="mt-0.5 max-w-md text-[11px] leading-relaxed text-muted-foreground sm:text-xs">
          {t("description")}
        </p>
      </figcaption>
    </figure>
  );
}

export default PersonalGallery;
