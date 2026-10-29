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
      </div>
    </section>
  );
}
