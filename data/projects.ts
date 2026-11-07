export type ProjectCategory = "all" | "desktop-iot" | "fullstack-web";

export interface Project {
  id: string;
  title: string;
  tags: string[];
  githubUrl: string;
  liveUrl: string;
  category: ProjectCategory;
  featured: boolean;
}

export const PROJECT_CATEGORY_IDS: readonly ProjectCategory[] = [
  "all",
  "desktop-iot",
  "fullstack-web",
];

export const PROJECTS: Project[] = [
  {
    id: "ecoplaza-iot-desktop",
    title: "EcoPlaza IoT & Desktop",
    tags: ["Tauri 2", "Rust", "ESP32", "React", "TypeScript", "PostgreSQL"],
    githubUrl: "https://github.com/luis-sdiaz/ecoplaza-smart-waste-platform",
    liveUrl: "https://ecoplaza.luis-diaz.dev",
    category: "desktop-iot",
    featured: true,
  },
  {
    id: "visual-trace-mobile",
    title: "VisualTrace Mobile",
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
    featured: true,
  },
  {
    id: "ridewake-platform",
    title: "RideWake",
    tags: [
      "TypeScript",
      "Next.js 16",
      "Geolocation",
      "Tailwind CSS",
      "PostgreSQL",
    ],
    githubUrl: "https://github.com/luis-sdiaz/ridewake-ai-wearos",
    liveUrl: "https://github.com/luis-sdiaz/ridewake",
    category: "fullstack-web",
    featured: false,
  },
  {
    id: "lullaby-3d-game",
    title: "Lullaby 3D",
    tags: [
      "TypeScript",
      "Three.js / WebGL",
      "3D Physics",
      "State Machines",
      "Game Loop",
    ],
    githubUrl: "https://github.com/AlePython-byte/LULLABY",
    liveUrl: "https://github.com/AlePython-byte/LULLABY",
    category: "desktop-iot",
    featured: true,
  },
];
