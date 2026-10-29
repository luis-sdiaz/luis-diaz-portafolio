export type ProjectCategory = 'all' | 'desktop-iot' | 'fullstack-web';

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
  { id: 'all', label: 'Todos' },
  { id: 'desktop-iot', label: 'Desktop & IoT' },
  { id: 'fullstack-web', label: 'Full-Stack Web' }
];

export const PROJECTS: Project[] = [
  {
    id: 'ecoplaza-iot-desktop',
    title: 'EcoPlaza IoT & Desktop',
    description:
      'Sistema integral de pesaje y trazabilidad de residuos sólidos en puntos de acopio. Conexión serial directa con microcontroladores ESP32 y sensores ultrasónicos, sincronización distribuida en tiempo real y persistencia local de alta resiliencia.',
    tags: ['Tauri 2', 'Rust', 'ESP32', 'React', 'TypeScript', 'PostgreSQL'],
    githubUrl: 'https://github.com/luisdiaz/ecoplaza',
    liveUrl: 'https://ecoplaza.luis-diaz.dev',
    category: 'desktop-iot',
    metrics: '< 15ms latencia en sensado',
    featured: true
  },
  {
    id: 'solidary-vote-engine',
    title: 'Solidary Vote Engine',
    description:
      'Plataforma de gobernanza democrática y votaciones transparentes para cooperativas y fondos de empleados. Algoritmos criptográficos de verificación de sufragio con cómputo distribuido sin revelación del voto individual.',
    tags: ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'Criptografía', 'PostgreSQL'],
    githubUrl: 'https://github.com/luisdiaz/solidary-vote',
    liveUrl: 'https://vote.luis-diaz.dev',
    category: 'fullstack-web',
    metrics: '100% trazabilidad criptográfica',
    featured: true
  },
  {
    id: 'dev-audio-streamer',
    title: 'Dev Audio Streamer',
    description:
      'Motor de procesamiento y streaming de audio de baja latencia en el navegador. Implementación de Web Audio API para análisis espectral en tiempo real, buffers circulares dinámicos y reproducción de audio posicional multicanal.',
    tags: ['TypeScript', 'Web Audio API', 'React', 'Canvas 2D', 'Node.js'],
    githubUrl: 'https://github.com/luisdiaz/dev-audio-streamer',
    liveUrl: 'https://audio.luis-diaz.dev',
    category: 'fullstack-web',
    metrics: '60 FPS render espectral',
    featured: false
  }
];
