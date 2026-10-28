interface SkillCategory {
  title: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend & UI",
    skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    title: "Desktop & IoT",
    skills: ["Tauri 2", "ESP32", "Arduino Uno", "C++ / Firmware"],
  },
  {
    title: "Backend & Datos",
    skills: ["Node.js", "PostgreSQL", "Supabase", "REST APIs"],
  },
  {
    title: "Calidad & Entorno",
    skills: ["Vitest", "Testing Library", "Git", "PowerShell", "ESLint"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-5xl px-4 py-12">
      <h2 className="text-center text-xs font-semibold uppercase tracking-widest text-emerald-400">
        Capacidades Técnicas
      </h2>
      <h3 className="mt-2 text-center text-3xl font-semibold text-zinc-100">
        Stack de Ingeniería
      </h3>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {skillCategories.map((category) => (
          <div key={category.title} className="glass-panel rounded-xl p-6">
            <h4 className="text-base font-semibold text-zinc-200">
              {category.title}
            </h4>
            <div className="mt-4 flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-md border border-zinc-800 bg-zinc-900/80 px-2.5 py-1 text-xs text-zinc-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
