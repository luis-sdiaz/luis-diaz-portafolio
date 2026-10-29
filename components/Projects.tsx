import { PROJECTS, PROJECT_CATEGORIES } from "@/data/projects";

export default function Projects() {
  return (
    <section id="proyectos" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          Soluciones & Arquitectura
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight mt-4">
          Proyectos de <span className="text-emerald-400">Ingeniería</span>
        </h2>
        <p className="mt-4 text-zinc-400 text-sm sm:text-base">
          Sistemas construidos con foco en rendimiento, arquitecturas distribuidas, hardware integrado y tipado seguro.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROJECTS.map((project) => (
          <article key={project.id} className="rounded-2xl bg-zinc-900/50 border border-zinc-800 p-6">
            <h3 className="text-xl font-bold text-zinc-100">{project.title}</h3>
            <p className="mt-3 text-sm text-zinc-400">{project.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
