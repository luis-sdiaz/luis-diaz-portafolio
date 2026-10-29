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
            {/* Contenido principal */}
          </div>
          <div className="lg:col-span-5 flex items-center justify-center">
            {/* Contenedor visual */}
          </div>
        </div>
      </div>
    </section>
  );
}
