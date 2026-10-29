"use client";

import { useState } from "react";
import { FileDown, Menu, X } from "lucide-react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";

interface NavItem {
  label: string;
  href: string;
}

const navigationItems: NavItem[] = [
  { label: "Inicio", href: "#inicio" },
  { label: "Sobre mí", href: "#sobre-mi" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Experiencia", href: "#experiencia" },
  { label: "Contacto", href: "#contacto" },
];

export default function Navbar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-800/60 bg-[#09090b]/80 backdrop-blur-md">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
        <a
          href="#inicio"
          className="text-lg font-bold tracking-tight text-zinc-100 transition-colors hover:text-emerald-400"
          aria-label="Ir al inicio"
        >
          LD
        </a>
      </nav>

      <motion.div
        className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-emerald-400"
        style={{ scaleX }}
        aria-hidden="true"
      />
    </header>
  );
}
