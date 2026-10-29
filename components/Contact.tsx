import { Mail } from "lucide-react";

export default function Contact() {
  return (
    <section id="contacto" className="mx-auto max-w-5xl px-4 py-12">
      <div className="glass-panel rounded-2xl p-8 text-center md:p-12">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
          Contacto
        </h2>
        <h3 className="mt-2 text-3xl font-semibold text-zinc-100">
          Iniciemos una conversación
        </h3>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-zinc-400">
          Disponible para proyectos de software full-stack, aplicaciones de
          escritorio nativas con Tauri y prototipado de sistemas IoT
          interactivos.
        </p>

        <div className="mt-8 flex justify-center">
          <a
            href="mailto:contacto@luis-diaz.dev"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-6 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-400"
          >
            <Mail className="h-4 w-4" />
            contacto@luis-diaz.dev
          </a>
        </div>
      </div>
    </section>
  );
}
