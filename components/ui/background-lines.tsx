"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface BackgroundLinesProps {
  children?: React.ReactNode;
  className?: string;
  svgOptions?: {
    duration?: number;
  };
}

const PATHS: readonly string[] = [
  "M -100,100 C 350,20 650,480 1540,160",
  "M -100,180 C 380,80 680,520 1540,240",
  "M -100,260 C 400,140 720,580 1540,320",
  "M -100,340 C 440,200 760,640 1540,400",
  "M -100,420 C 480,260 800,700 1540,480",
  "M -100,680 C 420,380 840,860 1540,420",
  "M -100,760 C 460,440 880,920 1540,500",
  "M -100,840 C 500,500 920,980 1540,580",
  "M -100,920 C 540,560 960,1040 1540,660",
  "M 200,-100 C 340,380 900,520 1150,1000",
  "M 380,-100 C 500,420 980,580 1300,1000",
  "M 560,-100 C 660,460 1060,640 1450,1000",
  "M 100,-100 C 260,340 780,500 980,1000",
  "M 740,-100 C 840,520 1140,700 1600,1000",
];

export function BackgroundLines({
  children,
  className,
  svgOptions,
}: BackgroundLinesProps) {
  const duration = svgOptions?.duration ?? 12;
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className={cn(
        "relative w-full h-full flex flex-col items-center justify-center overflow-hidden",
        className
      )}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0"
        style={{
          WebkitMaskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 80%)",
          maskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 80%)",
        }}
      >
        <svg
          className="w-full h-full absolute inset-0"
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="monochrome-lines" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--foreground)" stopOpacity="0.16" />
              <stop offset="50%" stopColor="var(--muted-foreground)" stopOpacity="0.10" />
              <stop offset="100%" stopColor="var(--foreground)" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          {PATHS.map((path, idx) => (
            <motion.path
              key={idx}
              d={path}
              stroke="url(#monochrome-lines)"
              strokeWidth="1.2"
              strokeDasharray="8 6"
              initial={{ pathLength: 0.3, pathOffset: 0 }}
              animate={
                shouldReduceMotion
                  ? { pathLength: 0.3, pathOffset: 0 }
                  : {
                      pathLength: [0.15, 0.45, 0.15],
                      pathOffset: [0, 1],
                    }
              }
              transition={
                shouldReduceMotion
                  ? undefined
                  : {
                      duration: duration + (idx % 4) * 2,
                      repeat: Infinity,
                      ease: "linear",
                    }
              }
            />
          ))}
        </svg>
      </div>

      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}

export default BackgroundLines;
