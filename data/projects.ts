export type ProjectCategory =
  | "desktop-iot"
  | "mobile"
  | "wearable"
  | "game"
  | "fullstack-game"
  | "web-audio";

export type RepositoryKind = "code" | "frontend" | "backend";

export interface ProjectRepository {
  kind: RepositoryKind;
  url: string;
}

export interface Project {
  id: string;
  title: string;
  tags: string[];
  repositories: ProjectRepository[];
  liveUrl: string | null;
  imageSrc: string | null;
  category: ProjectCategory;
  collaborative?: boolean;
}

export const PROJECTS: Project[] = [
  {
    id: "ecoplaza-iot-desktop",
    title: "EcoPlaza IoT & Desktop",
    tags: ["Tauri 2", "Rust", "ESP32", "React", "TypeScript", "PostgreSQL"],
    repositories: [
      {
        kind: "code",
        url: "https://github.com/luis-sdiaz/ecoplaza-smart-waste-platform",
      },
    ],
    liveUrl: null,
    imageSrc: null,
    category: "desktop-iot",
  },
  {
    id: "visual-trace-mobile",
    title: "VisualTrace Mobile",
    tags: ["Expo", "React Native", "TypeScript", "Supabase", "PostgreSQL"],
    repositories: [
      {
        kind: "code",
        url: "https://github.com/luis-sdiaz/visual-trace-mobile",
      },
    ],
    liveUrl: null,
    imageSrc: null,
    category: "mobile",
  },
  {
    id: "ridewake-platform",
    title: "RideWake",
    tags: ["Kotlin", "Jetpack Compose", "Wear OS", "Material 3", "Android SDK"],
    repositories: [
      {
        kind: "code",
        url: "https://github.com/luis-sdiaz/ridewake-ai-wearos",
      },
    ],
    liveUrl: null,
    imageSrc: null,
    category: "wearable",
  },
  {
    id: "lullaby-3d-game",
    title: "Lullaby 3D",
    tags: ["Godot 4.7", "C#", "Blender", "Krita"],
    repositories: [
      {
        kind: "code",
        url: "https://github.com/AlePython-byte/LULLABY",
      },
    ],
    liveUrl: null,
    imageSrc: null,
    category: "game",
    collaborative: true,
  },
  {
    id: "legado-de-valientes",
    title: "Legado de Valientes",
    tags: ["React", "TypeScript", "Phaser 3", "Java 21", "Spring Boot", "MongoDB"],
    repositories: [
      {
        kind: "frontend",
        url: "https://github.com/luis-sdiaz/Legado_de_valientes_frontend",
      },
      {
        kind: "backend",
        url: "https://github.com/luis-sdiaz/Legado_de_valientes_backend",
      },
    ],
    liveUrl: "https://legado-de-valientes-frontend.vercel.app",
    imageSrc: null,
    category: "fullstack-game",
  },
  {
    id: "music-player",
    title: "Reproductor de Música",
    tags: ["React", "TypeScript", "Vite", "CSS Modules", "HTML5 Audio"],
    repositories: [
      {
        kind: "code",
        url: "https://github.com/luis-sdiaz/Reproductor-de-musica",
      },
    ],
    liveUrl: "https://musica.luis-diaz.dev",
    imageSrc: null,
    category: "web-audio",
  },
];
