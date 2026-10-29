import { ArrowUpRight, FileDown } from "lucide-react";

export default function Hero() {
  return (
    <section id="inicio" className="relative mx-auto flex max-w-5xl flex-col items-center justify-center px-4 pt-20 text-center">
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
        <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
        Ingeniería de Software • 5º Semestre
      </div>

      <h1 className="text-4xl font-bold tracking-tight text-zinc-100 sm:text-6xl md:text-7xl">
        Luis Sebastián Díaz
      </h1>

      <p className="mt-6 max-w-2xl text-base text-zinc-400 sm:text-lg">
        Desarrollador de software enfocado en arquitecturas web full-stack,
        software de escritorio nativo con Tauri y sistemas de hardware IoT
        interactivo.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <a
          href="#projects"
          className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-400"
        >
          Explorar Proyectos
          <ArrowUpRight className="h-4 w-4" />
        </a>
        <a
          href="/cv.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900/60 px-5 py-2.5 text-sm font-medium text-zinc-200 transition hover:border-zinc-500 hover:bg-zinc-800"
        >
          <FileDown className="h-4 w-4" />
          Ver CV
        </a>
      </div>
    </section>
  );
}
