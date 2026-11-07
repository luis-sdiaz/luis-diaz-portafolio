"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Code2,
  Cpu,
  Layers,
  Terminal,
  Database,
  Globe,
  ShieldCheck,
  Server,
  Zap,
  Box,
  Binary,
  Smartphone,
  Flame,
  type LucideIcon,
} from "lucide-react";

export interface MarqueeItem {
  name: string;
  category: string;
  icon: LucideIcon | React.ComponentType<{ className?: string }>;
}

export const ROW_1_TECH: readonly MarqueeItem[] = [
  { name: "TypeScript 5", category: "Core", icon: Code2 },
  { name: "Next.js 16", category: "Framework", icon: Globe },
  { name: "Rust", category: "Systems", icon: Flame },
  { name: "Tauri 2", category: "Desktop", icon: Box },
  { name: "ESP32 Firmware", category: "IoT", icon: Cpu },
  { name: "PostgreSQL", category: "Database", icon: Database },
  { name: "Tailwind CSS v4", category: "UI Engine", icon: Layers },
  { name: "Framer Motion", category: "Animations", icon: Zap },
];

export const ROW_2_TECH: readonly MarqueeItem[] = [
  { name: "React 19", category: "Library", icon: Code2 },
  { name: "Embedded C++", category: "Hardware", icon: Binary },
  { name: "UART / I2C Telemetry", category: "Protocols", icon: Terminal },
  { name: "SQLite Edge Cache", category: "Storage", icon: Database },
  { name: "Node.js Runtimes", category: "Backend", icon: Server },
  { name: "Vitest QA", category: "Testing", icon: ShieldCheck },
  { name: "Arduino Core", category: "IoT Hardware", icon: Cpu },
  { name: "Cross-Platform UI", category: "Systems", icon: Smartphone },
];

function MarqueeRow({
  items,
  direction = "left",
  speed = 28,
}: {
  items: readonly MarqueeItem[];
  direction?: "left" | "right";
  speed?: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  const [isPaused, setIsPaused] = useState(false);

  const duplicatedItems = [...items, ...items, ...items];

  return (
    <div
      className="relative flex overflow-hidden select-none py-1.5"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <motion.div
        className="flex w-max shrink-0 items-center gap-4"
        animate={
          shouldReduceMotion || isPaused
            ? undefined
            : {
                x: direction === "left" ? ["0%", "-33.333%"] : ["-33.333%", "0%"],
              }
        }
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {duplicatedItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={`${item.name}-${index}`}
              className="group relative flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-2.5 backdrop-blur-md shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-border-hover hover:bg-surface-muted cursor-default"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-surface-muted text-foreground transition-colors duration-300 group-hover:border-border-hover group-hover:bg-surface">
                <Icon className="h-4 w-4 text-foreground" />
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
      </motion.div>
    </div>
  );
}

export function InfiniteMarquee({
  row1 = ROW_1_TECH,
  row2 = ROW_2_TECH,
}: {
  row1?: readonly MarqueeItem[];
  row2?: readonly MarqueeItem[];
}) {
  return (
    <div className="relative w-full overflow-hidden py-4">
      {/* Mascarilla de desvanecimiento cinemático en bordes izquierdo y derecho */}
      <div
        className="relative w-full space-y-3"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        }}
      >
        <MarqueeRow items={row1} direction="left" speed={30} />
        <MarqueeRow items={row2} direction="right" speed={34} />
      </div>
    </div>
  );
}

export default InfiniteMarquee;
