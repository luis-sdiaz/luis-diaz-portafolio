"use client";

import { useState } from "react";
import { FileDown, Menu, X } from "lucide-react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

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
  const [isOpen, setIsOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/80 backdrop-blur-md transition-colors duration-250">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
        <a
          href="#inicio"
          className="text-lg font-bold tracking-tight text-foreground transition-opacity hover:opacity-75"
          aria-label="Ir al inicio"
        >
          LD
        </a>

        <ul className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
          {navigationItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2.5">
          <ThemeToggle />

          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-xl bg-foreground px-3.5 py-2 text-xs font-semibold text-background transition-opacity hover:opacity-90 shadow-sm md:inline-flex"
          >
            <FileDown className="h-4 w-4" />
            <span>Ver CV</span>
          </a>

          <button
            type="button"
            className="rounded-xl p-2 text-muted-foreground transition-colors hover:bg-surface-muted hover:text-foreground md:hidden"
            aria-expanded={isOpen}
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            aria-controls="mobile-navigation"
            onClick={() => setIsOpen((open) => !open)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-navigation"
            className="border-t border-border bg-surface/95 px-4 pb-4 backdrop-blur-md md:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ul className="mx-auto flex max-w-6xl flex-col gap-1 pt-3 text-sm font-medium text-foreground">
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="block rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:bg-surface-muted hover:text-foreground"
                    onClick={closeMenu}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="pt-2 flex items-center justify-between gap-2 border-t border-border mt-1">
                <a
                  href="/cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-foreground px-3 py-2.5 text-xs font-semibold text-background transition-opacity hover:opacity-90 shadow-sm"
                  onClick={closeMenu}
                >
                  <FileDown className="h-4 w-4" />
                  <span>Ver CV</span>
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-foreground"
        style={{ scaleX }}
        aria-hidden="true"
      />
    </header>
  );
}
