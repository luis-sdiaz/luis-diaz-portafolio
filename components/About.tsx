'use client';

import React from 'react';
import { Code2, Layers } from 'lucide-react';

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
      <div className="space-y-16">
        <div className="text-center space-y-4">
          <h2 id="about-title" className="text-3xl font-bold text-white">
            Perfil Profesional
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-5 flex justify-center">
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
          </div>
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-2xl font-semibold text-zinc-100">
              Soluciones digitales fundamentadas en rigor, arquitectura y propósito.
            </h3>
            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed">
              Soy Luis Sebastián Díaz, estudiante de 5° semestre de Ingeniería de Software en Pasto, Colombia. 
              Me especializo en diseñar arquitecturas web modulares y en integrar microcontroladores IoT mediante 
              sistemas embebidos como el ESP32. Aplico estándares estrictos de calidad, interfaces intuitivas con 
              acabados glassmorphism y código tipado de extremo a extremo para resolver problemas reales con impacto comunitario.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
