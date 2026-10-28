interface EndorsementItem {
  id: string;
  author: string;
  role: string;
  organization: string;
  content: string;
}

const endorsementRecords: EndorsementItem[] = [
  {
    id: "academic-peer",
    author: "Comunidad Académica",
    role: "Facultad de Ingeniería",
    organization: "Universidad Cooperativa de Colombia",
    content:
      "Compromiso constante en la entrega de proyectos rigurosos, buenas prácticas de desarrollo ágil y colaboración técnica en equipo.",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="mx-auto max-w-5xl px-4 py-12">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
        Colaboración
      </h2>
      <h3 className="mt-2 text-3xl font-semibold text-zinc-100">
        Recomendaciones & Feedback
      </h3>

      <div className="mt-8 grid gap-6 md:grid-cols-1">
        {endorsementRecords.map((item: EndorsementItem) => (
          <blockquote
            key={item.id}
            className="glass-panel rounded-xl p-6 md:p-8"
          >
            <p className="text-sm italic leading-relaxed text-zinc-300 sm:text-base">
              “{item.content}”
            </p>
            <footer className="mt-4 border-t border-zinc-800/80 pt-4">
              <cite className="not-italic font-semibold text-zinc-100">
                {item.author}
              </cite>
              <p className="text-xs text-zinc-400">
                {item.role} • {item.organization}
              </p>
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
