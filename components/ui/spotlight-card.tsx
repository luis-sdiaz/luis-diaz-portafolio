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
  spotlightColor = "rgba(16, 185, 129, 0.14)",
  ...props
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top } = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const backgroundGradient = useMotionTemplate`
    radial-gradient(
      600px circle at ${mouseX}px ${mouseY}px,
      ${spotlightColor},
      transparent 40%
    )
  `;

  const borderGradient = useMotionTemplate`
    radial-gradient(
      400px circle at ${mouseX}px ${mouseY}px,
      rgba(16, 185, 129, 0.45),
      transparent 60%
    )
  `;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={
        shouldReduceMotion
          ? { opacity: 0 }
          : { opacity: 0, y: 35, scale: 0.97, filter: "blur(8px)" }
      }
      whileInView={
        shouldReduceMotion
          ? { opacity: 1 }
          : { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
      }
      viewport={{ once: false, amount: 0.2, margin: "-40px" }}
      transition={{
        type: "spring",
        stiffness: 110,
        damping: 20,
        delay,
      }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/50 backdrop-blur-xl transition-colors duration-300 hover:border-emerald-500/30",
        className
      )}
      {...props}
    >
      {/* Resplandor radial de fondo */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-0"
        style={{ background: backgroundGradient }}
      />

      {/* Iluminación de borde direccional estilo Linear/Vercel */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-0"
        style={{
          background: borderGradient,
          maskImage:
            "linear-gradient(black, black) content-box, linear-gradient(black, black)",
          WebkitMaskImage:
            "linear-gradient(black, black) content-box, linear-gradient(black, black)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
      />

      {/* Capa de contenido */}
      <div className="relative z-10 h-full w-full">{children}</div>
    </motion.div>
  );
}

export default SpotlightCard;

