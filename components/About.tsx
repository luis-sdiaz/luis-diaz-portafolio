'use client';

import React from 'react';

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
      <div className="space-y-16">
        <div className="text-center space-y-4">
          <h2 id="about-title" className="text-3xl font-bold text-white">
            Perfil Profesional
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
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
