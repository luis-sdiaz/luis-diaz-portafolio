export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  technologies: string[];
  metrics: string;
  githubUrl?: string;
  liveUrl?: string;
  category: "Desktop / IoT" | "Full-stack Web" | "Systems";
}

export const initialProjects: ProjectItem[] = [
  {
    id: "ecoplaza",
    title: "EcoPlaza IoT & Desktop",
    tagline: "Smart waste management platform with edge hardware integration",
    description:
      "Plataforma de gestión inteligente de residuos con microcontroladores ESP32, sensores ultrasónicos HC-SR04, frontend React/TypeScript sobre Tauri 2 y telemetría en tiempo real.",
    technologies: [
      "Next.js",
      "Tauri 2",
      "TypeScript",
      "ESP32",
      "PostgreSQL",
      "Gemini API",
    ],
    metrics: "500+ tests de integración | <100ms respuesta sensor",
    githubUrl: "https://github.com/luis-diaz",
    category: "Desktop / IoT",
  },
  {
    id: "solidary-voting",
    title: "Solidary Vote Engine",
    tagline: "High-integrity voting software for cooperatives & alliances",
    description:
      "Sistema distribuido para votaciones gremiales y asambleas cooperativas con trazabilidad criptográfica y auditoría en tiempo real.",
    technologies: ["TypeScript", "Next.js", "Tailwind CSS", "PostgreSQL"],
    metrics: "100% inmutabilidad en registro electoral",
    githubUrl: "https://github.com/luis-diaz",
    category: "Full-stack Web",
  },
];
