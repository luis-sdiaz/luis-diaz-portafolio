"use client";

import React, { useEffect, useRef, useState } from "react";
import { useAnimate } from "framer-motion";
import { type LucideIcon } from "lucide-react";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

export interface MarqueeItem {
  name: string;
  category: string;
  icon: LucideIcon | React.ComponentType<{ className?: string }>;
}

function MarqueeRow({
  items,
  direction = "left",
  speed = 28,
  animated = true,
  ariaLabel,
}: {
  items: readonly MarqueeItem[];
  direction?: "left" | "right";
  speed?: number;
  animated?: boolean;
  ariaLabel?: string;
}) {
  const [isPaused, setIsPaused] = useState(false);
  const [marqueeScope, animateMarquee] = useAnimate<HTMLDivElement>();
  const playbackControls = useRef<ReturnType<typeof animateMarquee> | null>(null);
  const isMoving = animated;
  const copies = isMoving ? [0, 1] : [0];

  useEffect(() => {
    if (!isMoving || !marqueeScope.current) return;

    const controls = animateMarquee(
      marqueeScope.current,
      { x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] },
      { duration: speed, repeat: Infinity, ease: "linear" }
    );
    playbackControls.current = controls;

    return () => {
      controls.stop();
      playbackControls.current = null;
    };
  }, [animateMarquee, direction, isMoving, marqueeScope, speed]);

  useEffect(() => {
    const controls = playbackControls.current;
    if (!controls) return;

    if (isPaused) {
      controls.pause();
    } else {
      controls.play();
    }
  }, [isPaused]);

  return (
    <div
      role={ariaLabel ? "region" : undefined}
      aria-label={ariaLabel}
      aria-live="off"
      tabIndex={isMoving ? 0 : undefined}
      className="relative flex overflow-hidden select-none rounded-xl py-1.5 outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div
        ref={marqueeScope}
        className={
          isMoving
            ? "flex w-max shrink-0 items-center will-change-transform"
            : "flex w-full items-center"
        }
      >
        {copies.map((copyIndex) => (
          <div
            key={copyIndex}
            aria-hidden={copyIndex > 0 ? true : undefined}
            className={
              isMoving
                ? "flex shrink-0 items-center gap-3 pr-3"
                : "flex w-full flex-wrap items-center gap-2"
            }
          >
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.name}
                  className="group relative flex cursor-default items-center gap-2.5 rounded-xl border border-border bg-surface px-3 py-2 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:bg-surface-muted motion-reduce:transform-none"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-surface-muted text-foreground transition-colors duration-300 group-hover:border-border-hover group-hover:bg-surface">
                    <Icon className="h-4 w-4 text-foreground" aria-hidden="true" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-mono text-xs font-bold text-foreground transition-colors">
                      {item.name}
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                      {item.category}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export function InfiniteMarquee({
  row1 = [],
  row2 = [],
  animated = true,
  ariaLabel,
}: {
  row1?: readonly MarqueeItem[];
  row2?: readonly MarqueeItem[];
  animated?: boolean;
  ariaLabel?: string;
}) {
  const shouldReduceMotion = usePrefersReducedMotion();
  const motionEnabled = animated && !shouldReduceMotion;

  return (
    <div className={`relative w-full overflow-hidden ${motionEnabled ? "py-4" : "py-2"}`}>
      {/* Mascarilla de desvanecimiento cinemático en bordes izquierdo y derecho */}
      <div
        className="relative w-full space-y-3"
        style={
          motionEnabled
            ? {
                maskImage:
                  "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
              }
            : undefined
        }
      >
        {row1.length > 0 && (
          <MarqueeRow
            items={row1}
            direction="left"
            speed={30}
            animated={motionEnabled}
            ariaLabel={ariaLabel}
          />
        )}
        {row2.length > 0 && (
          <MarqueeRow items={row2} direction="right" speed={34} animated={motionEnabled} />
        )}
      </div>
    </div>
  );
}

export default InfiniteMarquee;
