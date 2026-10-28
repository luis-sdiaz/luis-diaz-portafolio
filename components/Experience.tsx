interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
}

const experienceHistory: ExperienceItem[] = [
  {
    id: "software-engineering",
    role: "Ingeniería de Software",
    organization: "Universidad Cooperativa de Colombia",
    period: "2023 — Actualidad",
    location: "Pasto, Nariño, Colombia",
    description:
      "Formación integral en diseño de algoritmos, arquitecturas limpias, metodologías de prueba y sistemas distribuidos.",
    achievements: [
      "5º Semestre con enfoque en plataformas web full-stack e IoT.",
      "Desarrollo de proyectos con microcontroladores (ESP32) y telemetría.",
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-5xl px-4 py-12">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
        Trayectoria
      </h2>
      <h3 className="mt-2 text-3xl font-semibold text-zinc-100">
        Experiencia y Formación
      </h3>

      <div className="mt-8 space-y-6">
        {experienceHistory.map((item: ExperienceItem) => (
          <div key={item.id} className="glass-panel rounded-xl p-6 md:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <h4 className="text-lg font-semibold text-zinc-100">
                {item.role}
              </h4>
              <span className="font-mono text-xs text-emerald-400">
                {item.period}
              </span>
            </div>

            <p className="mt-1 text-sm text-zinc-400">
              {item.organization} • {item.location}
            </p>

            <p className="mt-3 text-sm leading-relaxed text-zinc-300">
              {item.description}
            </p>

            <ul className="mt-4 space-y-1.5 text-xs text-zinc-400">
              {item.achievements.map((achievement: string) => (
                <li key={achievement} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
