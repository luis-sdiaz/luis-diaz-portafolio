"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, ExternalLink, Terminal } from "lucide-react";
import { PROJECTS, PROJECT_CATEGORIES, ProjectCategory } from "@/data/projects";

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("all");

  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") return PROJECTS;
    return PROJECTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <section
      id="proyectos"
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20"
      aria-label="Proyectos de Ingeniería de Software"
    >
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-4">
          <Terminal className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Soluciones & Arquitectura</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight">
          Proyectos de <span className="text-emerald-400">Ingeniería</span>
        </h2>
        <p className="mt-4 text-zinc-400 text-sm sm:text-base leading-relaxed">
          Sistemas construidos con foco en rendimiento, arquitecturas distribuidas, hardware integrado y tipado seguro.
        </p>
      </div>

      <div className="flex justify-center mb-12">
        <nav
          className="inline-flex p-1.5 rounded-2xl bg-zinc-900 border border-zinc-800"
          role="tablist"
          aria-label="Filtro de proyectos por categoría"
        >
          {PROJECT_CATEGORIES.map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                aria-controls="projects-grid"
                onClick={() => setActiveCategory(tab.id)}
                className={`relative px-4 py-2 text-xs sm:text-sm font-medium rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                  isActive ? "text-zinc-100" : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute inset-0 bg-zinc-800 rounded-xl"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <motion.div id="projects-grid" layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.article
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="flex flex-col justify-between rounded-2xl bg-zinc-900/50 border border-zinc-800 p-6"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-950/40 text-emerald-400 border border-emerald-500/20">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    <span>En producción</span>
                  </div>
                  <div className="inline-flex items-center gap-1 text-[11px] font-mono text-zinc-400 bg-zinc-800/60 px-2 py-0.5 rounded-md border border-zinc-700/40">
                    <Activity className="w-3 h-3 text-cyan-400" aria-hidden="true" />
                    <span>{project.metrics}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-zinc-100">{project.title}</h3>
                <p className="mt-3 text-sm text-zinc-400 leading-relaxed">{project.description}</p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-0.5 text-xs font-mono rounded-md bg-zinc-800 text-zinc-300 border border-zinc-700">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-8 pt-4 border-t border-zinc-800 flex items-center gap-3">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Ver código fuente de ${project.title} en GitHub`}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium rounded-xl text-zinc-300 bg-zinc-800 hover:text-zinc-100 border border-zinc-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                >
                  Código
                </a>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Ver demo en vivo de ${project.title}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold rounded-xl text-zinc-950 bg-emerald-400 hover:bg-emerald-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
                >
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                  Demo
                </a>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
