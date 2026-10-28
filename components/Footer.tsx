interface NavigationFooterLink {
  label: string;
  href: string;
}

const footerLinks: NavigationFooterLink[] = [
  { label: "Sobre mí", href: "#about" },
  { label: "Habilidades", href: "#skills" },
  { label: "Proyectos", href: "#projects" },
  { label: "Experiencia", href: "#experience" },
  { label: "Contacto", href: "#contact" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-zinc-900 bg-zinc-950/40 py-8 text-xs text-zinc-500">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 sm:flex-row">
        <div>
          <span className="font-mono tracking-wider text-zinc-400">
            LUIS-DIAZ.DEV • {currentYear}
          </span>
          <p className="mt-0.5 text-zinc-600">
            Luis Sebastián Díaz • Pasto, Nariño, Colombia
          </p>
        </div>

        <nav aria-label="Footer Navigation">
          <ul className="flex flex-wrap items-center gap-4 text-zinc-400">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="transition-colors hover:text-zinc-100"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
