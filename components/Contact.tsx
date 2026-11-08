"use client";

import { useState } from "react";
import {
  motion,
  useReducedMotion,
  type Variants,
  AnimatePresence,
} from "framer-motion";
import { toast, Toaster } from "sonner";
import { useTheme } from "next-themes";
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
import { useTranslations } from "next-intl";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface DirectChannel {
  id: string;
  titleKey: string;
  value: string;
  href: string;
  icon: LucideIcon | React.ComponentType<{ className?: string }>;
  badgeKey: string;
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
    titleKey: "channels.email.title",
    value: "contacto@luis-diaz.dev",
    href: "mailto:contacto@luis-diaz.dev",
    icon: Mail,
    badgeKey: "channels.email.badge",
  },
  {
    id: "github",
    titleKey: "channels.github.title",
    value: "github.com/luis-sdiaz",
    href: "https://github.com/luis-sdiaz",
    icon: GithubIcon,
    badgeKey: "channels.github.badge",
  },
  {
    id: "linkedin",
    titleKey: "channels.linkedin.title",
    value: "linkedin.com/in/luis-sdiaz",
    href: "https://linkedin.com/in/luis-sdiaz",
    icon: LinkedinIcon,
    badgeKey: "channels.linkedin.badge",
  },
  {
    id: "whatsapp",
    titleKey: "channels.whatsapp.title",
    value: "+57 (300) 000-0000",
    href: "https://wa.me/573000000000?text=Hola%20Luis%2C%20vi%20tu%20portafolio%20y%20me%20gustar%C3%ADa%20conversar",
    icon: MessageCircle,
    badgeKey: "channels.whatsapp.badge",
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
  const t = useTranslations("Contact");
  const shouldReduceMotion = useReducedMotion();
  const { resolvedTheme } = useTheme();

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

    toast.success(t("toast.title"), {
      description: t("toast.description"),
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
      className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-18 lg:px-8 lg:py-20 overflow-hidden"
      aria-labelledby="contact-heading"
    >
      <Toaster
        position="bottom-right"
        theme={(resolvedTheme as "light" | "dark" | "system") || "light"}
        richColors
      />

      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold uppercase tracking-widest text-foreground shadow-sm">
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          <span>{t("sectionLabel")}</span>
        </span>
        <h2
          id="contact-heading"
          className="mt-3.5 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground"
        >
          {t("titlePart1")}{" "}
          <span className="bg-gradient-to-r from-foreground via-zinc-600 to-muted-foreground dark:from-foreground dark:via-zinc-300 dark:to-zinc-500 bg-clip-text text-transparent">
            {t("titlePart2")}
          </span>
        </h2>
        <p className="mt-3 text-sm sm:text-base leading-relaxed text-muted-foreground">
          {t("subtitle")}
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12 items-start">
        {/* Columna de Canales Directos */}
        <motion.div
          variants={containerVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: false, margin: "-60px" }}
          className="flex flex-col justify-between space-y-5 lg:col-span-5"
        >
          <div className="space-y-3">
            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
              {t("directChannelsTitle")}
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
              {t("directChannelsSubtitle")}
            </p>
          </div>

          <div className="space-y-3">
            {directChannels.map((channel) => {
              const Icon = channel.icon;
              const isExternal = channel.href.startsWith("http");

              return (
                <a
                  key={channel.id}
                  href={channel.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className="group flex items-center justify-between rounded-2xl border border-border bg-surface p-4 backdrop-blur-md transition-all duration-300 hover:border-border-hover hover:bg-surface-muted shadow-sm"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-surface-muted text-foreground transition-transform group-hover:scale-105">
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm font-semibold text-foreground">
                          {t(channel.titleKey as Parameters<typeof t>[0])}
                        </span>
                        <span className="rounded-full border border-border bg-surface-muted px-2 py-0.5 text-[10px] font-mono text-muted-foreground">
                          {t(channel.badgeKey as Parameters<typeof t>[0])}
                        </span>
                      </div>
                      <p className="mt-0.5 font-mono text-xs text-muted-foreground">
                        {channel.value}
                      </p>
                    </div>
                  </div>

                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
                </a>
              );
            })}
          </div>
        </motion.div>

        {/* Columna del Formulario de Contacto */}
        <motion.div
          variants={itemVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="lg:col-span-7"
        >
          <SpotlightCard className="rounded-2xl sm:rounded-3xl border border-border bg-surface p-6 sm:p-8 shadow-xl">
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
                  <div className="space-y-1">
                    <h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
                      {t("formTitle")}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {t("formSubtitle")}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="name"
                        className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground"
                      >
                        {t("nameLabel")}{" "}
                        <span className="text-accent" aria-hidden="true">
                          {t("requiredField")}
                        </span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={t("namePlaceholder")}
                        className="w-full rounded-xl border border-border bg-surface-muted px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition-all duration-200 focus:border-focus-ring focus:outline-none focus:ring-2 focus:ring-focus-ring/20"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="email"
                        className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground"
                      >
                        {t("emailLabel")}{" "}
                        <span className="text-accent" aria-hidden="true">
                          {t("requiredField")}
                        </span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t("emailPlaceholder")}
                        className="w-full rounded-xl border border-border bg-surface-muted px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition-all duration-200 focus:border-focus-ring focus:outline-none focus:ring-2 focus:ring-focus-ring/20"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="subject"
                      className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground"
                    >
                      {t("subjectLabel")}
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder={t("subjectPlaceholder")}
                      className="w-full rounded-xl border border-border bg-surface-muted px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition-all duration-200 focus:border-focus-ring focus:outline-none focus:ring-2 focus:ring-focus-ring/20"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="message"
                      className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground"
                    >
                      {t("messageLabel")}{" "}
                      <span className="text-accent" aria-hidden="true">
                        {t("requiredField")}
                      </span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={t("messagePlaceholder")}
                      className="w-full resize-y rounded-xl border border-border bg-surface-muted px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition-all duration-200 focus:border-focus-ring focus:outline-none focus:ring-2 focus:ring-focus-ring/20"
                    />
                  </div>

                  {/* Botón de envío */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-6 rounded-xl bg-accent-action text-accent-action-foreground font-semibold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 shadow-md hover:bg-accent-action-hover disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2
                          className="h-4 w-4 animate-spin relative z-10"
                          aria-hidden="true"
                        />
                        <span className="relative z-10">{t("sendingButton")}</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 relative z-10" aria-hidden="true" />
                        <span className="relative z-10">{t("submitButton")}</span>
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
                    className="flex h-16 w-16 items-center justify-center rounded-full border border-border bg-surface-muted text-foreground shadow-lg"
                  >
                    <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
                  </motion.div>

                  <h3 className="mt-6 text-2xl font-bold tracking-tight text-foreground">
                    {t("successTitle")}
                  </h3>

                  <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                    {t("successMessage")}
                  </p>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-surface px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface-muted hover:border-border-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring cursor-pointer"
                  >
                    <RotateCcw className="h-4 w-4" aria-hidden="true" />
                    <span>{t("sendAnotherButton")}</span>
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
