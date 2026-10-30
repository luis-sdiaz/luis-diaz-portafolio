"use client";

import { motion, type Variants } from "framer-motion";
import { Quote, Star } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  relation: string;
  text: string;
  rating: number;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: "docente-ingenieria",
    name: "Nombre del docente",
    role: "Docente de Ingeniería de Software",
    relation: "Referente académico",
    text: "Ha demostrado criterio técnico, disciplina y una actitud consistente para convertir los retos de ingeniería en soluciones claras y mantenibles.",
    rating: 5,
    avatar: "DI",
  },
  {
    id: "colega-frontend",
    name: "Nombre del colega",
    role: "Colega Desarrollador Frontend",
    relation: "Colaborador de equipo",
    text: "Su enfoque en la calidad del código, la experiencia de usuario y la comunicación técnica aporta valor en cada etapa del desarrollo.",
    rating: 5,
    avatar: "CF",
  },
  {
    id: "evaluador-iot",
    name: "Nombre del evaluador",
    role: "Evaluador de Proyecto IoT",
    relation: "Evaluador técnico",
    text: "Presentó una solución IoT bien estructurada, con capacidad para integrar hardware, software y decisiones técnicas orientadas a resultados.",
    rating: 5,
    avatar: "EP",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function Testimonials() {
  return (
    <section
      id="testimonios"
      className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8"
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-flex rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-400">
          Recomendaciones
        </span>
        <h2
          id="testimonials-heading"
          className="mt-5 text-3xl font-semibold tracking-tight text-zinc-100 sm:text-4xl"
        >
          La experiencia de trabajar juntos
        </h2>
        <p className="mt-4 text-base leading-relaxed text-zinc-400">
          Referencias de personas que han compartido proyectos académicos y
          profesionales.
        </p>
      </div>

      <motion.div
        className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {testimonials.map((testimonial) => (
          <motion.blockquote
            key={testimonial.id}
            className="glass-panel group flex h-full flex-col rounded-2xl border border-zinc-800/80 bg-zinc-900/50 p-6 backdrop-blur-md transition-colors hover:border-emerald-500/40 md:p-8"
            variants={cardVariants}
            whileHover={{ y: -6 }}
          >
            <Quote
              aria-hidden="true"
              className="h-9 w-9 text-emerald-400/70"
              strokeWidth={1.5}
            />

            <p className="mt-6 flex-1 text-sm leading-relaxed text-zinc-300 sm:text-base">
              “{testimonial.text}”
            </p>

            <div
              className="mt-6 flex gap-1"
              aria-label="Calificación de 5 sobre 5 estrellas"
            >
              {Array.from({ length: testimonial.rating }, (_, index) => (
                <Star
                  key={`${testimonial.id}-star-${index}`}
                  aria-hidden="true"
                  className="h-4 w-4 fill-amber-400 text-amber-400"
                  strokeWidth={1.5}
                />
              ))}
            </div>

            <footer className="mt-6 flex items-center gap-3 border-t border-zinc-800/80 pt-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-700 text-sm font-bold text-white">
                {testimonial.avatar}
              </div>
              <div>
                <cite className="not-italic font-semibold text-zinc-100">
                  {testimonial.name}
                </cite>
                <p className="mt-0.5 text-xs text-zinc-400">
                  {testimonial.role}
                </p>
                <p className="text-xs text-zinc-500">{testimonial.relation}</p>
              </div>
            </footer>
          </motion.blockquote>
        ))}
      </motion.div>
    </section>
  );
}
