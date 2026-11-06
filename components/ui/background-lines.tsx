"use client";

import React from "react";
import { motion } from "framer-motion";
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
  const duration = svgOptions?.duration ?? 10;

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
          className="h-full w-full"
          width="100%"
          height="100%"
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <filter id="emerald-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <linearGradient id="emerald-line-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#34d399" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0.2" />
            </linearGradient>

            <linearGradient id="emerald-line-2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#059669" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#10b981" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.2" />
            </linearGradient>

            <linearGradient id="emerald-line-3" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#34d399" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {PATHS.map((path, idx) => {
            const strokeUrl =
              idx % 3 === 0
                ? "url(#emerald-line-1)"
                : idx % 3 === 1
                ? "url(#emerald-line-2)"
                : "url(#emerald-line-3)";

            return (
              <motion.path
                key={path}
                d={path}
                stroke={strokeUrl}
                strokeWidth={idx % 2 === 0 ? 2.5 : 2}
                strokeLinecap="round"
                filter="url(#emerald-glow)"
                initial={{
                  pathLength: 0,
                  opacity: 0.35,
                }}
                animate={{
                  pathLength: [0, 1],
                  opacity: [0.35, 0.8, 0.4],
                }}
                transition={{
                  duration: duration + (idx % 4) * 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: (idx % 5) * 0.4,
                }}
              />
            );
          })}
        </svg>
      </div>

      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}
