import { initialProjects, type ProjectItem } from "@/data/projects";
import { ExternalLink } from "lucide-react";

function GithubIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

export default function Projects() {
  return (
    <section id="proyectos" className="mx-auto max-w-5xl px-4 py-12">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
        Portafolio
      </h2>
      <h3 className="mt-2 text-3xl font-semibold text-zinc-100">
        Proyectos Seleccionados
      </h3>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {initialProjects.map((project: ProjectItem) => (
          <article
            key={project.id}
            className="glass-panel flex flex-col justify-between rounded-xl p-6"
          >
            <div>
              <span className="text-xs font-medium text-emerald-400">
                {project.category}
              </span>
              <h4 className="mt-2 text-xl font-semibold text-zinc-100">
                {project.title}
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                {project.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.technologies.map((tech: string) => (
                  <span
                    key={tech}
                    className="rounded bg-zinc-800/80 px-2 py-0.5 text-[11px] text-zinc-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-zinc-800/80 pt-4 text-xs">
              <span className="font-mono text-zinc-500">{project.metrics}</span>
              <div className="flex items-center gap-3">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`GitHub repository for ${project.title}`}
                    className="text-zinc-400 transition-colors hover:text-zinc-100"
                  >
                    <GithubIcon className="h-4 w-4" />
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Live site for ${project.title}`}
                    className="text-zinc-400 transition-colors hover:text-zinc-100"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
