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
