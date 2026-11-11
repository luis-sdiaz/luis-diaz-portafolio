export type ProjectCategory =
  | "desktop-iot"
  | "mobile"
  | "wearable"
  | "game"
  | "fullstack-game"
  | "web-audio";

export type RepositoryKind =
  | "code"
  | "frontend"
  | "backend"
  | "zeppos"
  | "wearos";

export interface ProjectRepository {
  kind: RepositoryKind;
  url: string;
}

export type DownloadPlatform = "windows" | "macos" | "linux";

export interface PlatformDownload {
  platform: DownloadPlatform;
  url: string;
}

export interface Project {
  id: string;
  title: string;
  tags: string[];
  repositories: ProjectRepository[];
  liveUrl: string | null;
  downloadUrl?: string | null;
  downloads?: PlatformDownload[];
  allReleasesUrl?: string | null;
  interactiveDemo?: boolean;
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
    downloads: [
      {
        platform: "windows",
        url: "https://github.com/luis-sdiaz/ecoplaza-smart-waste-platform/releases/download/v1.0.0/EcoPlaza.Smart.Waste.and.IoT.Platform_1.0.0_x64-setup.exe",
      },
      {
        platform: "macos",
        url: "https://github.com/luis-sdiaz/ecoplaza-smart-waste-platform/releases/download/v1.0.0/EcoPlaza.Smart.Waste.and.IoT.Platform_1.0.0_aarch64.dmg",
      },
      {
        platform: "linux",
        url: "https://github.com/luis-sdiaz/ecoplaza-smart-waste-platform/releases/download/v1.0.0/EcoPlaza.Smart.Waste.and.IoT.Platform_1.0.0_amd64.AppImage",
      },
    ],
    allReleasesUrl:
      "https://github.com/luis-sdiaz/ecoplaza-smart-waste-platform/releases/tag/v1.0.0",
    imageSrc: "/projects/ecoplaza.png",
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
    downloadUrl:
      "https://github.com/luis-sdiaz/visual-trace-mobile/releases/download/v1.0.0/VisualTrace-v1.0.0-android-arm64.apk.apk",
    imageSrc: "/projects/visualtrace.png",
    category: "mobile",
  },
  {
    id: "ridewake-platform",
    title: "RideWake AI",
    tags: [
      "Zepp OS",
      "JavaScript",
      "Xiaomi Smart Band 7",
      "Machine Learning",
      "Vite",
    ],
    repositories: [
      {
        kind: "zeppos",
        url: "https://github.com/luis-sdiaz/ridewake-zeppos",
      },
      {
        kind: "wearos",
        url: "https://github.com/luis-sdiaz/ridewake-ai-wearos",
      },
    ],
    liveUrl: "https://ridewake-web.vercel.app",
    interactiveDemo: true,
    imageSrc: "/projects/ridewake.png",
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
    imageSrc: "/projects/lullaby.png",
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
    imageSrc: "/projects/legado-de-valientes.png",
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
    imageSrc: "/projects/reproductor-musica.png",
    category: "web-audio",
  },
];
