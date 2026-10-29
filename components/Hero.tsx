"use client";

import React from "react";
import { toast } from "sonner";
import { Download, ArrowRight, Terminal, Cpu, Layers } from "lucide-react";

export default function Hero() {
  const handleDownloadCv = () => {
    toast.success("cv.pdf descargado", {
      description: "Hoja de vida descargada correctamente.",
      duration: 4000,
    });
  };

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

            <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
              <a
                href="/cv.pdf"
                download="Luis_Sebastian_Diaz_CV.pdf"
                onClick={handleDownloadCv}
                aria-label="Descargar currículum vitae en formato PDF"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-semibold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 hover:brightness-110 active:scale-[0.98] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
              >
                <Download className="w-4 h-4" />
                <span>Descargar CV</span>
              </a>

              <a
                href="#proyectos"
                aria-label="Navegar a la sección de proyectos desarrollados"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-zinc-700/80 bg-zinc-900/60 hover:bg-zinc-800/80 text-zinc-200 hover:text-white text-sm font-semibold backdrop-blur-sm active:scale-[0.98] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
              >
                <span>Ver proyectos</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-800/80 bg-zinc-900/40">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span>5° Semestre de Ingeniería</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-800/80 bg-zinc-900/40">
                <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                <span>Hardware IoT &amp; Embebidos</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-800/80 bg-zinc-900/40">
                <Layers className="w-3.5 h-3.5 text-sky-400" />
                <span>Clean Architecture</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="relative flex items-center justify-center w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80">
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-full border border-cyan-500/20 bg-gradient-to-tr from-cyan-500/10 via-transparent to-indigo-500/10 backdrop-blur-md animate-pulse"
              />
              <div
                aria-hidden="true"
                className="absolute -inset-3 rounded-full border border-dashed border-zinc-700/50"
              />
              <div className="relative z-10 flex flex-col items-center justify-center w-52 h-52 sm:w-60 sm:h-60 lg:w-64 lg:h-64 rounded-full border border-zinc-700/60 bg-zinc-900/90 shadow-2xl backdrop-blur-xl overflow-hidden group select-none">
                <div className="absolute inset-0 bg-radial from-cyan-500/10 to-transparent pointer-events-none" />
                <span className="text-5xl sm:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-zinc-100 via-zinc-300 to-zinc-500 group-hover:scale-105 transition-transform duration-300">
                  LD
                </span>
                <span className="mt-1 text-[11px] font-mono tracking-widest uppercase text-cyan-400 font-semibold">
                  Software Eng.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
