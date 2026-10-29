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
  return (
    <header className="sticky top-0 z-50">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
        <a href="#inicio">LD</a>
      </nav>
    </header>
  );
}
