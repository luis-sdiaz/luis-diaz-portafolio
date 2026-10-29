export type ProjectCategory = "all" | "desktop-iot" | "fullstack-web";

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  liveUrl: string;
  category: ProjectCategory;
  metrics: string;
  featured: boolean;
}

export interface CategoryFilter {
  id: ProjectCategory;
  label: string;
}

export const PROJECT_CATEGORIES: CategoryFilter[] = [
  { id: "all", label: "Todos" },
  { id: "desktop-iot", label: "Desktop & IoT" },
  { id: "fullstack-web", label: "Full-Stack Web" },
];

export const PROJECTS: Project[] = [
  {
    id: "ecoplaza-iot-desktop",
    title: "EcoPlaza IoT & Desktop",
    description:
      "Sistema integral de pesaje y trazabilidad de residuos sólidos en centros de acopio. Conexión serial directa con microcontroladores ESP32 y sensores ultrasónicos, sincronización en tiempo real y persistencia local de alta resiliencia.",
    tags: ["Tauri 2", "Rust", "ESP32", "React", "TypeScript", "PostgreSQL"],
    githubUrl: "https://github.com/luis-sdiaz/ecoplaza-smart-waste-platform",
    liveUrl: "https://ecoplaza.luis-diaz.dev",
    category: "desktop-iot",
    metrics: "< 15ms latencia en sensado",
    featured: true,
  },
  {
    id: "visual-trace-mobile",
    title: "VisualTrace Mobile",
    description:
      "Aplicación móvil para auditoría visual, inspección y captura de datos en campo. Diseñada bajo arquitectura offline-first con sincronización asíncrona, validación estricta de esquemas y renderizado fluido.",
    tags: [
      "React Native",
      "TypeScript",
      "Mobile UX",
      "Tailwind CSS",
      "REST APIs",
    ],
    githubUrl: "https://github.com/luis-sdiaz/visual-trace-mobile",
    liveUrl: "https://github.com/luis-sdiaz/visual-trace-mobile",
    category: "fullstack-web",
    metrics: "Arquitectura offline-first",
    featured: true,
  },
  {
    id: "ridewake-platform",
    title: "RideWake",
    description:
      "Plataforma reactiva para geolocalización, análisis de trayectorias y alertas de asistencia en movilidad. Algoritmos de seguimiento continuo y despacho optimizados para eficiencia de batería y bajo consumo.",
    tags: [
      "TypeScript",
      "Next.js 16",
      "Geolocalización",
      "Tailwind CSS",
      "PostgreSQL",
    ],
    githubUrl: "https://github.com/luis-sdiaz/ridewake-ai-wearos",
    liveUrl: "https://github.com/luis-sdiaz/ridewake",
    category: "fullstack-web",
    metrics: "Tracking reactivo continuo",
    featured: false,
  },
  {
    id: "lullaby-3d-game",
    title: "Lullaby 3D",
    description:
      "Videojuego 3D interactivo desarrollado en colaboración de ingeniería. Implementación de bucle desacoplado de renderizado, físicas tridimensionales dinámicas, shaders ambientales y máquina de estados finitos.",
    tags: [
      "TypeScript",
      "Three.js / WebGL",
      "Físicas 3D",
      "State Machines",
      "Game Loop",
    ],
    githubUrl: "https://github.com/AlePython-byte/LULLABY",
    liveUrl: "https://github.com/AlePython-byte/LULLABY",
    category: "desktop-iot",
    metrics: "60 FPS render 3D estable",
    featured: true,
  },
];
