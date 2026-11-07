"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { Briefcase, Calendar, GraduationCap, Sparkles } from "lucide-react";
import { ScrambleText } from "@/components/ui/scramble-text";
import { SpotlightCard } from "@/components/ui/spotlight-card";

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

const academicExperiences: readonly ExperienceItem[] = [
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

const workExperiences: readonly ExperienceItem[] = [
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

const sectionHeaderVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

function ExperienceTimeline({
  items,
  direction = "left",
}: {
  items: readonly ExperienceItem[];
  direction?: "left" | "right";
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  return (
    <div ref={containerRef} className="relative pl-6 sm:pl-8">
      {/* Guía base inactiva */}
      <div
        className="absolute left-2.5 sm:left-3.5 top-3 bottom-3 w-[2px] bg-border rounded-full"
        aria-hidden="true"
      />

      {/* Trazo activo animado reactivo al scroll */}
      <motion.div
        style={{
          scaleY: shouldReduceMotion ? 1 : scrollYProgress,
          transformOrigin: "top",
        }}
        className="absolute left-2.5 sm:left-3.5 top-3 bottom-3 w-[2px] rounded-full bg-accent shadow-sm"
        aria-hidden="true"
      >
        <div
          className="absolute bottom-0 -left-[3px] h-2 w-2 rounded-full bg-accent shadow-sm"
          aria-hidden="true"
        />
      </motion.div>

      <ol className="space-y-8">
        {items.map((item, index) => (
          <li key={item.id} className="group relative pl-6 sm:pl-8">
            {/* Nodo circular monocromático */}
            <span
              className="absolute -left-[19px] sm:-left-[23px] top-5 h-4 w-4 rounded-full border-2 border-border bg-surface shadow-sm transition-transform duration-300 group-hover:scale-125"
              aria-hidden="true"
            >
              <span className="absolute inset-0 rounded-full bg-accent opacity-30 animate-ping" />
              <span className="relative block h-full w-full rounded-full bg-accent" />
            </span>

            {/* Tarjeta Spotlight */}
            <motion.div
              initial={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : {
                      opacity: 0,
                      x: direction === "left" ? -30 : 30,
                      filter: "blur(6px)",
                    }
              }
              whileInView={
                shouldReduceMotion
                  ? { opacity: 1 }
                  : { opacity: 1, x: 0, filter: "blur(0px)" }
              }
              viewport={{ once: false, margin: "-80px" }}
              transition={{
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
                delay: index * 0.05,
              }}
            >
              <SpotlightCard className="p-6">
                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <Calendar
                    className="h-4 w-4 text-accent"
                    aria-hidden="true"
                  />
                  <time>{item.period}</time>
                </div>

                <h4 className="mt-3.5 text-lg font-bold leading-snug text-foreground transition-colors">
                  {item.title}
                </h4>

                <p className="mt-1.5 text-sm font-semibold text-foreground">
                  {item.organization}
                </p>

                <p className="mt-3.5 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>

                <ul
                  className="mt-5 flex flex-wrap gap-2"
                  aria-label="Competencias técnicas aplicadas"
                >
                  {item.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full border border-border bg-surface-muted px-2.5 py-0.5 text-xs font-medium text-foreground transition-colors hover:border-accent/50 hover:bg-accent-muted hover:text-accent"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </motion.div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function Experience() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="experiencia"
      className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 overflow-hidden"
      aria-labelledby="experience-heading"
    >
      <motion.div
        variants={sectionHeaderVariants}
        initial={shouldReduceMotion ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="mx-auto max-w-3xl text-center"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-foreground shadow-sm">
          <Sparkles className="h-3.5 w-3.5 text-foreground" aria-hidden="true" />
          <span>Trayectoria</span>
        </div>
        <h2
          id="experience-heading"
          className="mt-5 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
        >
          <ScrambleText text="Experiencia & " trigger="view" />
          <span className="bg-gradient-to-r from-foreground via-zinc-600 to-muted-foreground dark:from-foreground dark:via-zinc-300 dark:to-zinc-500 bg-clip-text text-transparent">
            <ScrambleText text="Trayectoria" trigger="view" />
          </span>
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
          Un recorrido continuo por la formación ingenieril, el desarrollo de
          sistemas embebidos y el software de producción.
        </p>
      </motion.div>

      <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div>
          <div className="mb-8 flex items-center gap-3 pl-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface-muted text-foreground shadow-sm">
              <GraduationCap className="h-5 w-5" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-bold tracking-tight text-foreground">
              Formación Académica
            </h3>
          </div>
          <ExperienceTimeline items={academicExperiences} direction="left" />
        </div>

        <div>
          <div className="mb-8 flex items-center gap-3 pl-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface-muted text-foreground shadow-sm">
              <Briefcase className="h-5 w-5" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-bold tracking-tight text-foreground">
              Experiencia Laboral y Proyectos
            </h3>
          </div>
          <ExperienceTimeline items={workExperiences} direction="right" />
        </div>
      </div>
    </section>
  );
}
