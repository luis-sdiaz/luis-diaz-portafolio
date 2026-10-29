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
  }
];
