"use client";

import { useState } from "react";
import {
  motion,
  useReducedMotion,
  type Variants,
  AnimatePresence,
} from "framer-motion";
import { toast, Toaster } from "sonner";
import {
  Mail,
  MessageCircle,
  Send,
  Sparkles,
  CheckCircle2,
  ArrowUpRight,
  RotateCcw,
  Loader2,
  type LucideIcon,
} from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface DirectChannel {
  id: string;
  title: string;
  value: string;
  href: string;
  icon: LucideIcon | React.ComponentType<{ className?: string }>;
  badge?: string;
}

function GithubIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const directChannels: readonly DirectChannel[] = [
  {
    id: "email",
    title: "Correo Electrónico",
    value: "contacto@luis-diaz.dev",
    href: "mailto:contacto@luis-diaz.dev",
    icon: Mail,
    badge: "Principal",
  },
  {
    id: "github",
    title: "GitHub",
    value: "github.com/luis-sdiaz",
    href: "https://github.com/luis-sdiaz",
    icon: GithubIcon,
    badge: "Código abierto",
  },
  {
    id: "linkedin",
    title: "LinkedIn",
    value: "linkedin.com/in/luis-sdiaz",
    href: "https://linkedin.com/in/luis-sdiaz",
    icon: LinkedinIcon,
    badge: "Perfil profesional",
  },
  {
    id: "whatsapp",
    title: "WhatsApp",
    value: "+57 (300) 000-0000",
    href: "https://wa.me/573000000000?text=Hola%20Luis%2C%20vi%20tu%20portafolio%20y%20me%20gustar%C3%ADa%20conversar",
    icon: MessageCircle,
    badge: "Chat directo",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const formTransitionVariants: Variants = {
  initial: { opacity: 0, scale: 0.98, y: 12 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    y: -12,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

export default function Contact() {
  const shouldReduceMotion = useReducedMotion();
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 600));

    toast.success("¡Mensaje enviado con éxito!", {
      description: "Me pondré en contacto contigo a la brevedad.",
    });

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const handleReset = () => {
    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSuccess(false);
  };

  return (
    <section
      id="contacto"
      className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 overflow-hidden"
      aria-labelledby="contact-heading"
    >
      <Toaster position="bottom-right" theme="dark" richColors />

      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-400">
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Contacto</span>
        </span>
        <h2
          id="contact-heading"
          className="mt-5 text-3xl font-extrabold tracking-tight text-zinc-100 sm:text-4xl lg:text-5xl"
        >
          Hablemos de tu{" "}
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            próximo proyecto
          </span>
        </h2>
        <p className="mt-4 text-base leading-relaxed text-zinc-400 sm:text-lg">
          ¿Tienes una idea en mente, una oportunidad laboral o necesitas asesoría en desarrollo web, software de escritorio o IoT? Escríbeme y construyamos soluciones de alto impacto.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">
        {/* Columna de Canales Directos */}
        <motion.div
          variants={containerVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: false, margin: "-60px" }}
          className="flex flex-col justify-between space-y-6 lg:col-span-5"
        >
          <div className="space-y-4">
            <h3 className="text-xl font-bold tracking-tight text-zinc-100">
              Canales directos
            </h3>
            <p className="text-sm leading-relaxed text-zinc-400">
              ¿Prefieres una comunicación más ágil o consultar mis repositorios? Puedes contactarme a través de cualquiera de estos canales o revisar mi actividad profesional en línea.
            </p>
          </div>

          <div className="space-y-4">
            {directChannels.map((channel, idx) => {
              const Icon = channel.icon;
              const isExternal = channel.href.startsWith("http");

              return (
                <a
                  key={channel.id}
                  href={channel.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className="block group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-2xl"
                  aria-label={`${channel.title}: ${channel.value}${isExternal ? " (se abre en una nueva pestaña)" : ""}`}
                >
                  <SpotlightCard
                    delay={idx * 0.08}
                    className="p-5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 transition-colors duration-300 group-hover:border-emerald-500/40 group-hover:bg-emerald-500/20">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-zinc-400">
                              {channel.title}
                            </span>
                            {channel.badge && (
                              <span className="rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                                {channel.badge}
                              </span>
                            )}
                          </div>
                          <span className="mt-0.5 block text-sm font-semibold text-zinc-200 transition-colors group-hover:text-emerald-400">
                            {channel.value}
                          </span>
                        </div>
                      </div>

                      <ArrowUpRight
                        className="h-4 w-4 text-zinc-500 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-emerald-400"
                        aria-hidden="true"
                      />
                    </div>
                  </SpotlightCard>
                </a>
              );
            })}
          </div>

          <SpotlightCard className="p-5">
            <div className="flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                Disponibilidad Activa
              </span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-zinc-400">
              Respondo usualmente en menos de 24 horas. Disponible para colaborar en proyectos innovadores y nuevos retos tecnológicos.
            </p>
          </SpotlightCard>
        </motion.div>

        {/* Contenedor del Formulario en SpotlightCard de gran formato */}
        <motion.div
          variants={itemVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: false, margin: "-60px" }}
          className="lg:col-span-7"
        >
          <SpotlightCard className="p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form
                  key="contact-form"
                  variants={formTransitionVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label
                        htmlFor="name"
                        className="block text-xs font-medium uppercase tracking-wider text-zinc-300"
                      >
                        Nombre completo{" "}
                        <span className="text-emerald-400" aria-hidden="true">
                          *
                        </span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Ej. Carlos Pérez"
                        autoComplete="name"
                        className="w-full rounded-xl border border-zinc-800 bg-zinc-950/70 px-4 py-3 text-zinc-100 placeholder:text-zinc-500 transition-all duration-200 focus:border-emerald-500/70 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="block text-xs font-medium uppercase tracking-wider text-zinc-300"
                      >
                        Correo electrónico{" "}
                        <span className="text-emerald-400" aria-hidden="true">
                          *
                        </span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="ejemplo@correo.com"
                        autoComplete="email"
                        className="w-full rounded-xl border border-zinc-800 bg-zinc-950/70 px-4 py-3 text-zinc-100 placeholder:text-zinc-500 transition-all duration-200 focus:border-emerald-500/70 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="subject"
                      className="block text-xs font-medium uppercase tracking-wider text-zinc-300"
                    >
                      Asunto{" "}
                      <span className="text-emerald-400" aria-hidden="true">
                        *
                      </span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Ej. Propuesta de proyecto / Consultoría"
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-950/70 px-4 py-3 text-zinc-100 placeholder:text-zinc-500 transition-all duration-200 focus:border-emerald-500/70 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className="block text-xs font-medium uppercase tracking-wider text-zinc-300"
                    >
                      Mensaje{" "}
                      <span className="text-emerald-400" aria-hidden="true">
                        *
                      </span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Describe tu proyecto, requerimientos técnicos o consulta..."
                      className="w-full resize-y rounded-xl border border-zinc-800 bg-zinc-950/70 px-4 py-3 text-zinc-100 placeholder:text-zinc-500 transition-all duration-200 focus:border-emerald-500/70 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    />
                  </div>

                  {/* Botón con efecto de barrido de luz (shimmer) */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative overflow-hidden w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-zinc-950 font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                  >
                    {/* Shimmer sweep */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -inset-full top-0 block -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition-all duration-700 group-hover:inset-full group-hover:opacity-100"
                    />

                    {isSubmitting ? (
                      <>
                        <Loader2
                          className="h-4 w-4 animate-spin relative z-10"
                          aria-hidden="true"
                        />
                        <span className="relative z-10">Enviando mensaje...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 relative z-10" aria-hidden="true" />
                        <span className="relative z-10">Enviar mensaje</span>
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="contact-success"
                  variants={formTransitionVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="flex flex-col items-center justify-center py-10 text-center"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -25 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 18,
                    }}
                    className="flex h-16 w-16 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/20 text-emerald-400 shadow-xl shadow-emerald-500/10"
                  >
                    <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
                  </motion.div>

                  <h3 className="mt-6 text-2xl font-bold tracking-tight text-zinc-100">
                    ¡Mensaje recibido!
                  </h3>

                  <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-zinc-400">
                    Gracias por ponerte en contacto. Tu mensaje ha sido recibido
                    con éxito y me pondré en contacto contigo a la brevedad.
                  </p>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800/80 px-6 py-3 text-sm font-medium text-zinc-200 transition-colors hover:bg-zinc-800 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 cursor-pointer"
                  >
                    <RotateCcw className="h-4 w-4" aria-hidden="true" />
                    <span>Enviar otro mensaje</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </SpotlightCard>
        </motion.div>
      </div>
    </section>
  );
}
