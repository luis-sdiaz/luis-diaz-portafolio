interface ProfileHighlight {
  label: string;
  value: string;
}

const profileHighlights: ProfileHighlight[] = [
  { label: "Ubicación", value: "Pasto, Nariño, Colombia" },
  { label: "Especialidad", value: "Full-Stack, Desktop (Tauri) & IoT" },
  { label: "Enfoque", value: "Arquitectura limpia y calidad de software" },
];

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-5xl px-4 py-12">
      <div className="glass-panel rounded-2xl p-8 md:p-10">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
          Trayectoria
        </h2>
        <p className="mt-4 text-xl font-medium text-zinc-200 sm:text-2xl">
          Construcción de software confiable con rigor técnico, pruebas
          automatizadas y diseño centrado en el rendimiento.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-zinc-400">
          Estudiante de 5º semestre de Ingeniería de Software. Experiencia
          articulando interfaces reactivas, lógica de backend y desarrollo de
          hardware interactivo con microcontroladores (ESP32) para soluciones
          del mundo real.
        </p>

        <div className="mt-8 grid gap-4 border-t border-zinc-800/80 pt-6 sm:grid-cols-3">
          {profileHighlights.map((highlight) => (
            <div key={highlight.label}>
              <span className="text-xs text-zinc-500 font-medium">
                {highlight.label}
              </span>
              <p className="mt-1 text-sm font-semibold text-zinc-200">
                {highlight.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
