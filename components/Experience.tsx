"use client";

import { motion, type Variants } from "framer-motion";
import { Briefcase, Calendar, GraduationCap } from "lucide-react";

type ExperienceType = "academica" | "laboral";

interface ExperienceItem {
  id: string;
  type: ExperienceType;
  title: string;
  organization: string;
  period: string;
  description: string;
  skills: string[];
}

const academicExperiences: ExperienceItem[] = [
  {
    id: "ucc-ingenieria",
    type: "academica",
    title: "Ingeniería de Software (5° Semestre)",
    organization: "Universidad Cooperativa de Colombia (UCC Pasto)",
    period: "2026 – En curso",
    description:
      "Formación en arquitectura de software, metodologías ágiles, patrones de diseño, desarrollo full-stack y aseguramiento de calidad.",
    skills: [
      "Arquitectura de Software",
      "Patrones de Diseño",
      "Testing",
      "Bases de Datos",
    ],
  },
  {
    id: "educative-java",
    type: "academica",
    title: "Learn Java from Scratch",
    organization: "Educative",
    period: "2026",
    description:
      "Dominio de programación orientada a objetos (POO), encapsulamiento, polimorfismo, colecciones y algoritmia tipada en Java.",
    skills: ["Java", "POO", "Algoritmos", "Estructuras de Datos"],
  },
  {
    id: "sena-python",
    type: "academica",
    title: "Variables y Estructuras de Control en Python (48h)",
    organization: "SENA",
    period: "2025",
    description:
      "Implementación de algoritmia aplicada, lógica de control de flujo de ejecución y automatización de procesos estructurados.",
    skills: [
      "Python",
      "Lógica de Programación",
      "Algoritmos",
      "Automatización",
    ],
  },
  {
    id: "sena-calidad",
    type: "academica",
    title:
      "Aplicación de la Calidad del Software en el Proceso de Desarrollo (40h)",
    organization: "SENA",
    period: "2024",
    description:
      "Modelado de pruebas unitarias y de integración, aseguramiento de calidad (QA), métricas de software y ciclo de vida (SDLC).",
    skills: ["Calidad de Software", "QA & Testing", "Métricas", "SDLC"],
  },
  {
    id: "sena-logistica",
    type: "academica",
    title: "Técnico en Integración de Operaciones Logísticas",
    organization: "SENA",
    period: "Formación Previa",
    description:
      "Optimización de procesos operativos, control sistematizado de inventarios y trazabilidad de cadenas de suministro; base para arquitectura de software logístico.",
    skills: [
      "Gestión de Procesos",
      "Control de Inventarios",
      "Trazabilidad",
      "Logística",
    ],
  },
];

const workExperiences: ExperienceItem[] = [
  {
    id: "ecoplaza-lead",
    type: "laboral",
    title: "Líder Técnico & Desarrollador Desktop / IoT",
    organization: "EcoPlaza",
    period: "2026 – Presente",
    description:
      "Dirección de arquitectura nativa en Tauri 2 con Rust y React; sincronización de telemetría IoT con microcontroladores ESP32 y sensores ultrasónicos para optimización de rutas de recolección.",
    skills: ["Tauri 2", "Rust", "React", "TypeScript", "ESP32 / IoT"],
  },
  {
    id: "freelance-frontend",
    type: "laboral",
    title: "Desarrollador Frontend Freelance",
    organization: "Desarrollo Web Independiente",
    period: "2025",
    description:
      "Construcción de interfaces web interactivas y responsivas con Next.js, TypeScript y Tailwind CSS, implementando accesibilidad WCAG y optimización de rendimiento.",
    skills: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "WCAG",
    ],
  },
  {
    id: "fatima-logistica",
    type: "laboral",
    title: "Practicante en Compras y Apoyo Logístico",
    organization: "Clínica Nuestra Señora de Fátima S.A.",
    period: "2024",
    description:
      "Gestión y trazabilidad de suministros médicos, optimización de adquisiciones hospitalarias y control sistematizado de flujos de inventario en etapa productiva certificada.",
    skills: [
      "Gestión Hospitalaria",
      "Flujos Operativos",
      "Control de Inventarios",
      "Datos Externos",
    ],
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants: Variants = {
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

function ExperienceTimeline({
  items,
}: {
  items: ExperienceItem[];
}) {
  return (
    <motion.ol
      className="relative ml-4 space-y-8 border-l-2 border-zinc-800"
      variants={containerVariants}
    >
      {items.map((item) => (
        <motion.li key={item.id} className="relative pl-8" variants={itemVariants}>
          <span
            className="absolute -left-[25px] top-6 h-4 w-4 rounded-full border-2 border-emerald-500 bg-zinc-950 shadow-[0_0_12px_rgba(16,185,129,0.35)]"
            aria-hidden="true"
          />
          <motion.article
            className="rounded-2xl border border-zinc-800/80 bg-zinc-900/50 p-6 backdrop-blur-md transition-colors hover:border-emerald-500/40"
            whileHover={{ y: -4 }}
          >
            <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400">
              <Calendar
                className="h-4 w-4 text-emerald-400"
                aria-hidden="true"
              />
              <time>{item.period}</time>
            </div>
            <h4 className="mt-4 text-lg font-semibold leading-snug text-zinc-100">
              {item.title}
            </h4>
            <p className="mt-2 text-sm font-medium text-emerald-400">
              {item.organization}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-zinc-300">
              {item.description}
            </p>
            <ul className="mt-5 flex flex-wrap gap-2" aria-label="Competencias">
              {item.skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </motion.article>
        </motion.li>
      ))}
    </motion.ol>
  );
}

export default function Experience() {
  return (
    <section
      id="experiencia"
      className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8"
      aria-labelledby="experience-heading"
    >
      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-flex rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-400">
          Trayectoria
        </span>
        <h2
          id="experience-heading"
          className="mt-5 text-3xl font-semibold tracking-tight text-zinc-100 sm:text-4xl"
        >
          Experiencia académica y laboral
        </h2>
        <p className="mt-4 text-base leading-relaxed text-zinc-400">
          Un recorrido por la formación, los proyectos y las experiencias que
          han consolidado mi perfil técnico.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <div className="mb-8 flex items-center gap-3">
            <GraduationCap
              className="h-6 w-6 text-emerald-400"
              aria-hidden="true"
            />
            <h3 className="text-xl font-semibold text-zinc-100">
              Formación Académica
            </h3>
          </div>
          <ExperienceTimeline items={academicExperiences} />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <div className="mb-8 flex items-center gap-3">
            <Briefcase
              className="h-6 w-6 text-emerald-400"
              aria-hidden="true"
            />
            <h3 className="text-xl font-semibold text-zinc-100">
              Experiencia Laboral y Proyectos
            </h3>
          </div>
          <ExperienceTimeline items={workExperiences} />
        </motion.div>
      </div>
    </section>
  );
}
