"use client";

import React from "react";

export default function Hero() {
  return (
    <section
      id="inicio"
      aria-label="Sección de bienvenida y presentación profesional"
      className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden py-16 md:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/70 backdrop-blur-md shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-xs font-medium tracking-wide text-zinc-300">
                Disponible para nuevos retos tecnológicos
              </span>
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-zinc-100">
                Hola, soy{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">
                  Luis Sebastián Díaz
                </span>
              </h1>
              <p className="text-lg sm:text-xl font-semibold text-zinc-300 tracking-normal">
                Estudiante de Ingeniería de Software | Full-Stack &amp; IoT Developer
              </p>
            </div>

            <p className="text-base sm:text-lg text-zinc-400 max-w-2xl leading-relaxed">
              Enfocado en el diseño y construcción de arquitecturas digitales
              escalables, aplicaciones web de alto rendimiento e integración de
              sistemas embebidos IoT con hardware real.
            </p>
          </div>
          <div className="lg:col-span-5 flex items-center justify-center">
            {/* Contenedor visual */}
          </div>
        </div>
      </div>
    </section>
  );
}
