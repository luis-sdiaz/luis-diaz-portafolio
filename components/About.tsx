'use client';

import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { MapPin, GraduationCap, Cpu, Terminal, Code2, Layers } from 'lucide-react';

interface QuickFact {
  id: string;
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: string;
}

interface SkillChip {
  name: string;
  category: 'core' | 'framework' | 'database' | 'hardware';
  level: string;
}

const QUICK_FACTS: QuickFact[] = [
  {
    id: 'location',
    label: 'Ubicación',
    value: 'Pasto, Nariño, Colombia',
    icon: MapPin,
    accent: 'from-emerald-500/20 to-emerald-500/5 text-emerald-400 border-emerald-500/30',
  },
  {
    id: 'education',
    label: 'Formación',
    value: '5° Semestre — Ing. de Software',
    icon: GraduationCap,
    accent: 'from-cyan-500/20 to-cyan-500/5 text-cyan-400 border-cyan-500/30',
  },
  {
    id: 'focus',
    label: 'Enfoque Técnico',
    value: 'Web Escalable & Hardware IoT',
    icon: Cpu,
    accent: 'from-indigo-500/20 to-indigo-500/5 text-indigo-400 border-indigo-500/30',
  },
  {
    id: 'status',
    label: 'Disponibilidad',
    value: 'Desarrollo de Soluciones de Impacto',
    icon: Terminal,
    accent: 'from-teal-500/20 to-teal-500/5 text-teal-400 border-teal-500/30',
  },
];

const HIGHLIGHTED_SKILLS: SkillChip[] = [
  { name: 'TypeScript', category: 'core', level: 'Avanzado' },
  { name: 'Next.js 16', category: 'framework', level: 'Modern Web' },
  { name: 'Tailwind CSS', category: 'framework', level: 'Responsive UI' },
  { name: 'React', category: 'framework', level: 'Component Architecture' },
  { name: 'PostgreSQL', category: 'database', level: 'Relational DB' },
  { name: 'Tauri 2', category: 'framework', level: 'Cross-platform Desktop' },
  { name: 'ESP32 / IoT', category: 'hardware', level: 'Embedded Systems' },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function About() {
  return (
    <section
      id="sobre-mi"
      aria-labelledby="about-title"
      className="relative w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-gradient-to-tr from-emerald-500/10 via-cyan-500/10 to-transparent blur-3xl -z-10"
      />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="space-y-16"
      >
        <motion.div variants={itemVariants} className="text-center space-y-4">
          <h2 id="about-title" className="text-3xl font-bold text-white">
            Perfil Profesional
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <motion.div variants={itemVariants} className="lg:col-span-5 flex justify-center">
            <div className="relative group w-full max-w-md">
              <div
                aria-hidden="true"
                className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-emerald-500/30 via-teal-500/20 to-cyan-500/30 blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-700"
              />
              <div className="relative rounded-2xl bg-zinc-950/80 border border-white/10 p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
                <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                    </span>
                    <span className="text-xs font-mono text-zinc-400 tracking-wider uppercase">
                      Ingeniería & Hardware
                    </span>
                  </div>
                  <Layers className="w-4 h-4 text-zinc-500" />
                </div>
                <div className="relative mx-auto w-36 h-36 sm:w-44 sm:h-44 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700/60 flex items-center justify-center overflow-hidden shadow-inner">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-500/20 via-transparent to-transparent" />
                  <div className="text-center space-y-2 z-10">
                    <div className="mx-auto w-14 h-14 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-sm">
                      <Code2 className="w-7 h-7" />
                    </div>
                    <span className="block text-sm font-semibold text-zinc-200">Luis Díaz</span>
                    <span className="block text-[11px] font-mono text-emerald-400/90">@luis-diaz</span>
                  </div>
                </div>
                <div className="rounded-xl bg-zinc-900/60 border border-zinc-800 p-3.5 text-center">
                  <p className="text-xs text-zinc-300 font-medium">
                    Construyendo arquitecturas robustas y dispositivos inteligentes desde el sur de Colombia.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div variants={itemVariants} className="lg:col-span-7 space-y-6">
            <h3 className="text-2xl font-semibold text-zinc-100">
              Soluciones digitales fundamentadas en rigor, arquitectura y propósito.
            </h3>
            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed">
              Soy Luis Sebastián Díaz, estudiante de 5° semestre de Ingeniería de Software en Pasto, Colombia. 
              Me especializo en diseñar arquitecturas web modulares y en integrar microcontroladores IoT mediante 
              sistemas embebidos como el ESP32. Aplico estándares estrictos de calidad, interfaces intuitivas con 
              acabados glassmorphism y código tipado de extremo a extremo para resolver problemas reales con impacto comunitario.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {QUICK_FACTS.map((fact) => {
                const Icon = fact.icon;
                return (
                  <div
                    key={fact.id}
                    className="flex items-start gap-3.5 p-3.5 rounded-xl bg-zinc-900/50 border border-zinc-800/80"
                  >
                    <div className={`p-2 rounded-lg bg-gradient-to-br border shadow-sm ${fact.accent}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-xs text-zinc-400 font-medium block">{fact.label}</span>
                      <span className="text-sm font-semibold text-zinc-200 block">{fact.value}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="space-y-3 pt-4 border-t border-zinc-800/80">
              <span className="text-xs uppercase font-mono tracking-wider text-zinc-400 block">
                Stack tecnológico de enfoque principal
              </span>
              <div className="flex flex-wrap gap-2">
                {HIGHLIGHTED_SKILLS.map((skill) => (
                  <span
                    key={skill.name}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-900/90 text-zinc-200 border border-zinc-700/70"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
