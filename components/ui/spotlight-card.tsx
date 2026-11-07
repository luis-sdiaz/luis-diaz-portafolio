"use client";

import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useReducedMotion,
  type HTMLMotionProps,
} from "framer-motion";
import { cn } from "@/lib/utils";

export interface SpotlightCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  spotlightColor?: string;
}

export function SpotlightCard({
  children,
  className,
  delay = 0,
  spotlightColor,
  ...props
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top } = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const handleMouseLeave = () => {
    mouseX.set(-1000);
    mouseY.set(-1000);
  };

  const defaultSpotlight =
    "color-mix(in srgb, var(--accent) var(--spotlight-opacity), transparent)";
  const defaultBorderSpotlight =
    "color-mix(in srgb, var(--accent) var(--spotlight-border-opacity), transparent)";

  const activeSpotlight = spotlightColor || defaultSpotlight;

  const backgroundGradient = useMotionTemplate`
    radial-gradient(
      500px circle at ${mouseX}px ${mouseY}px,
      ${activeSpotlight},
      transparent 50%
    )
  `;

  const borderGradient = useMotionTemplate`
    radial-gradient(
      350px circle at ${mouseX}px ${mouseY}px,
      ${defaultBorderSpotlight},
      transparent 50%
    )
  `;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn(
        "group relative rounded-2xl border border-border bg-surface text-foreground shadow-sm transition-all duration-300 hover:shadow-md overflow-hidden",
        className
      )}
      {...props}
    >
      {/* Resplandor ambiental radial que sigue el cursor */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-0"
        style={{ background: backgroundGradient }}
      />

      {/* Iluminación de borde reactivo al cursor */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10"
        style={{ background: borderGradient }}
      />

      {/* Contenido de la tarjeta */}
      <div className="relative z-20 h-full w-full">{children}</div>
    </motion.div>
  );
}

export default SpotlightCard;
