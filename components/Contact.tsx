"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
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
  Send,
  Sparkles,
  CheckCircle2,
  ArrowUpRight,
  RotateCcw,
  Loader2,
  AlertCircle,
  Info,
  ExternalLink,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { CONTACT_DATA } from "@/data/contact";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

type SubmissionStatus = "idle" | "submitting" | "success" | "error" | "unconfigured";

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

function WhatsappIcon({ className = "h-5 w-5" }: { className?: string }) {
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
      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
      <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
    </svg>
  );
}

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const columnVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
      delay,
    },
  }),
};

const formTransitionVariants: Variants = {
  initial: { opacity: 0, scale: 0.98, y: 12 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
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
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [serverErrorMessage, setServerErrorMessage] = useState<string | null>(null);

  // Canales directos configurados desde la fuente única de verdad
  const directChannels = [
    {
      id: "email",
      title: t("channels.email.title"),
      value: CONTACT_DATA.email.display,
      href: CONTACT_DATA.email.href,
      icon: Mail,
      isExternal: false,
    },
    {
      id: "github",
      title: t("channels.github.title"),
      value: CONTACT_DATA.github.display,
      href: CONTACT_DATA.github.url,
      icon: GithubIcon,
      isExternal: true,
    },
    {
      id: "linkedin",
      title: t("channels.linkedin.title"),
      value: CONTACT_DATA.linkedin.display,
      href: CONTACT_DATA.linkedin.url,
      icon: LinkedinIcon,
      isExternal: true,
    },
    {
      id: "whatsapp",
      title: t("channels.whatsapp.title"),
      value: CONTACT_DATA.whatsapp.display,
      href: CONTACT_DATA.whatsapp.url,
      icon: WhatsappIcon,
      isExternal: true,
    },
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    const trimmedName = formData.name.trim();
    if (!trimmedName) {
      newErrors.name = t("validation.nameRequired");
    } else if (trimmedName.length < 2) {
      newErrors.name = t("validation.nameMinLength");
    }

    if (!formData.email.trim()) {
      newErrors.email = t("validation.emailRequired");
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = t("validation.emailInvalid");
      }
    }

    if (!formData.message.trim()) {
      newErrors.message = t("validation.messageRequired");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Limpiar error del campo modificado en cuanto el usuario escribe
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name as keyof FormErrors];
        return next;
      });
    }

    if (status === "error" || status === "unconfigured") {
      setStatus("idle");
      setServerErrorMessage(null);
    }
  };

  const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID;

  // Enlace directo de respaldo (mailto) con los datos ya digitados por el usuario
  const mailtoFallbackUrl = `mailto:${CONTACT_DATA.email.address}?subject=${encodeURIComponent(
    formData.subject.trim() || "Contacto desde el Portafolio"
  )}&body=${encodeURIComponent(
    `Nombre: ${formData.name.trim() || "(No especificado)"}\nCorreo: ${
      formData.email.trim() || "(No especificado)"
    }\n\nMensaje:\n${formData.message.trim()}`
  )}`;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Si Formspree no tiene ID configurado, no simulamos un envío ficticio:
    if (!formspreeId || formspreeId.trim() === "") {
      setStatus("unconfigured");
      toast.error(t("toast.errorTitle"), {
        description: t("errors.unconfiguredService"),
      });
      return;
    }

    setStatus("submitting");
    setServerErrorMessage(null);

    try {
      const response = await fetch(`https://formspree.io/f/${formspreeId.trim()}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim() || undefined,
          message: formData.message.trim(),
          _replyto: formData.email.trim(),
        }),
      });

      if (response.ok) {
        setStatus("success");
        toast.success(t("toast.title"), {
          description: t("toast.description"),
        });
      } else {
        const data = await response.json().catch(() => null);
        const serverError =
          data?.error ||
          (Array.isArray(data?.errors)
            ? data.errors.map((errItem: { message?: string }) => errItem.message).filter(Boolean).join(", ")
            : null);

        const errorText = serverError || t("errors.submitError");
        setServerErrorMessage(errorText);
        setStatus("error");
        toast.error(t("toast.errorTitle"), {
          description: errorText,
        });
      }
    } catch {
      const fallbackError = t("errors.submitError");
      setServerErrorMessage(fallbackError);
      setStatus("error");
      toast.error(t("toast.errorTitle"), {
        description: fallbackError,
      });
    }
  };

  const handleReset = () => {
    setFormData({ name: "", email: "", subject: "", message: "" });
    setErrors({});
    setStatus("idle");
    setServerErrorMessage(null);
  };

  return (
    <section
      id="contacto"
      className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-18 lg:px-8 lg:py-20 overflow-hidden scroll-mt-16 sm:scroll-mt-20"
      aria-labelledby="contact-heading"
    >
      <Toaster
        position="bottom-right"
        theme={(resolvedTheme as "light" | "dark" | "system") || "light"}
        richColors
      />

      {/* Encabezado Editorial Minimalista */}
      <motion.div
        variants={headerVariants}
        initial={shouldReduceMotion ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        className="mx-auto max-w-3xl text-center"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold uppercase tracking-widest text-foreground shadow-sm">
          <Sparkles className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
          <span>{t("sectionLabel")}</span>
        </div>

        <h2
          id="contact-heading"
          className="mt-3.5 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#18181B] dark:text-foreground"
        >
          {t("title")}
        </h2>

        {/* Pequeño acento gráfico refinado en naranja energético */}
        <div className="mx-auto mt-3 h-1 w-10 rounded-full bg-accent/80" aria-hidden="true" />

        <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base leading-relaxed text-muted-foreground">
          {t("subtitle")}
        </p>
      </motion.div>

      {/* Grid de 2 Columnas: Canales Directos (5 cols) + Formulario (7 cols) */}
      <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10 items-start">
        {/* Columna Izquierda: Canales Directos */}
        <motion.div
          variants={columnVariants}
          custom={0}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="space-y-4 lg:col-span-5"
        >
          <div className="space-y-1.5 pl-1">
            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
              {t("directChannelsTitle")}
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
              {t("directChannelsSubtitle")}
            </p>
          </div>

          <div className="space-y-3 pt-2">
            {directChannels.map((channel) => {
              const Icon = channel.icon;
              const ariaLabel = channel.isExternal
                ? `${channel.title}: ${channel.value} ${t("externalTab")}`
                : `${channel.title}: ${channel.value}`;

              return (
                <a
                  key={channel.id}
                  href={channel.href}
                  target={channel.isExternal ? "_blank" : undefined}
                  rel={channel.isExternal ? "noopener noreferrer" : undefined}
                  aria-label={ariaLabel}
                  className="group relative flex items-center justify-between rounded-2xl border border-accent/30 bg-[#FAF8F5] p-4 sm:p-4.5 shadow-[0_2px_14px_-2px_rgba(24,24,27,0.04),0_1px_3px_rgba(24,24,27,0.02)] transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-[0_8px_24px_-4px_rgba(24,24,27,0.08)] focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring dark:border-accent/25 dark:bg-surface dark:shadow-none dark:hover:border-accent/50 dark:hover:shadow-md motion-reduce:transform-none"
                >
                  <div className="flex items-center gap-3.5 min-w-0 flex-1">
                    {/* Caja de Icono */}
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-accent/20 bg-accent-subtle/60 text-accent transition-transform duration-300 group-hover:scale-105 group-hover:border-accent/40 dark:border-accent/30 dark:bg-accent-subtle/30 dark:text-accent">
                      <Icon className="h-5 w-5" />
                    </div>

                    {/* Información textual equilibrada sin insignias redundantes */}
                    <div className="min-w-0 flex-1 pr-2">
                      <span className="block text-xs sm:text-sm font-semibold text-foreground transition-colors group-hover:text-accent">
                        {channel.title}
                      </span>
                      <p className="mt-0.5 truncate font-mono text-xs text-muted-foreground select-all">
                        {channel.value}
                      </p>
                    </div>
                  </div>

                  {/* Flecha indicadora de apertura externa */}
                  <div className="shrink-0 pl-1">
                    <ArrowUpRight
                      className="h-4 w-4 text-muted-foreground/70 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                      aria-hidden="true"
                    />
                  </div>
                </a>
              );
            })}
          </div>
        </motion.div>

        {/* Columna Derecha: Formulario Profesional */}
        <motion.div
          variants={columnVariants}
          custom={0.1}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="lg:col-span-7"
        >
          <div className="rounded-2xl sm:rounded-3xl border border-accent/30 bg-[#FAF8F5] p-6 sm:p-8 shadow-[0_4px_24px_-4px_rgba(24,24,27,0.04),0_1px_3px_rgba(24,24,27,0.02)] dark:border-accent/25 dark:bg-surface dark:shadow-none transition-all duration-300">
            <AnimatePresence mode="wait">
              {status !== "success" ? (
                <motion.form
                  key="contact-form"
                  variants={formTransitionVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  onSubmit={handleSubmit}
                  noValidate
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

                  {/* Fila 1 en escritorio: Nombre completo + Correo electrónico */}
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
                        minLength={2}
                        maxLength={100}
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={t("namePlaceholder")}
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/75 transition-all duration-200 focus:outline-none focus:ring-2 dark:bg-surface-muted dark:text-foreground dark:placeholder:text-zinc-400/85 ${
                          errors.name
                            ? "border-red-500/70 focus:border-red-500 focus:ring-red-500/20"
                            : "border-border/80 focus:border-focus-ring focus:ring-focus-ring/20 dark:border-border"
                        }`}
                      />
                      {errors.name && (
                        <p
                          id="name-error"
                          role="alert"
                          className="mt-1 flex items-center gap-1 text-[11px] font-medium text-red-600 dark:text-red-400"
                        >
                          <AlertCircle className="h-3 w-3 shrink-0" aria-hidden="true" />
                          <span>{errors.name}</span>
                        </p>
                      )}
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
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/75 transition-all duration-200 focus:outline-none focus:ring-2 dark:bg-surface-muted dark:text-foreground dark:placeholder:text-zinc-400/85 ${
                          errors.email
                            ? "border-red-500/70 focus:border-red-500 focus:ring-red-500/20"
                            : "border-border/80 focus:border-focus-ring focus:ring-focus-ring/20 dark:border-border"
                        }`}
                      />
                      {errors.email && (
                        <p
                          id="email-error"
                          role="alert"
                          className="mt-1 flex items-center gap-1 text-[11px] font-medium text-red-600 dark:text-red-400"
                        >
                          <AlertCircle className="h-3 w-3 shrink-0" aria-hidden="true" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Fila 2: Asunto (opcional) */}
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
                      className="w-full rounded-xl border border-border/80 bg-white px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/75 transition-all duration-200 focus:border-focus-ring focus:outline-none focus:ring-2 focus:ring-focus-ring/20 dark:border-border dark:bg-surface-muted dark:text-foreground dark:placeholder:text-zinc-400/85"
                    />
                  </div>

                  {/* Fila 3: Mensaje (obligatorio) */}
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
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? "message-error" : undefined}
                      className={`w-full resize-y rounded-xl border bg-white px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/75 transition-all duration-200 focus:outline-none focus:ring-2 dark:bg-surface-muted dark:text-foreground dark:placeholder:text-zinc-400/85 ${
                        errors.message
                          ? "border-red-500/70 focus:border-red-500 focus:ring-red-500/20"
                          : "border-border/80 focus:border-focus-ring focus:ring-focus-ring/20 dark:border-border"
                      }`}
                    />
                    {errors.message && (
                      <p
                        id="message-error"
                        role="alert"
                        className="mt-1 flex items-center gap-1 text-[11px] font-medium text-red-600 dark:text-red-400"
                      >
                        <AlertCircle className="h-3 w-3 shrink-0" aria-hidden="true" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Alerta informativa en caso de error de servidor o servicio no configurado */}
                  {(status === "unconfigured" || status === "error") && (
                    <div
                      role="alert"
                      className="rounded-xl border border-accent/30 bg-accent-subtle/50 p-4 text-xs leading-relaxed text-foreground dark:border-accent/40 dark:bg-accent-subtle/20"
                    >
                      <div className="flex items-start gap-2.5">
                        <Info className="h-4 w-4 shrink-0 text-accent mt-0.5" aria-hidden="true" />
                        <div className="space-y-2 flex-1">
                          <p className="font-medium text-foreground">
                            {status === "unconfigured"
                              ? t("errors.unconfiguredService")
                              : serverErrorMessage || t("errors.submitError")}
                          </p>
                          <a
                            href={mailtoFallbackUrl}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-accent/30 bg-accent px-3 py-1.5 font-semibold text-accent-foreground shadow-xs transition-colors hover:bg-accent-hover"
                          >
                            <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                            <span>{t("errors.directEmailFallback")}</span>
                            <ExternalLink className="h-3 w-3" aria-hidden="true" />
                          </a>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Botón Principal de Envío */}
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full py-3.5 px-6 rounded-xl bg-accent text-accent-foreground font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-md shadow-accent/20 hover:bg-accent-hover hover:shadow-lg active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
                  >
                    {status === "submitting" ? (
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
                /* Estado de Confirmación Exitoso (Solo ante confirmación real del servidor) */
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
                    className="flex h-16 w-16 items-center justify-center rounded-full border border-accent/40 bg-accent-subtle text-accent shadow-md dark:border-accent/40 dark:bg-accent-subtle/30"
                  >
                    <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
                  </motion.div>

                  <h3 className="mt-6 text-2xl font-bold tracking-tight text-[#18181B] dark:text-foreground">
                    {t("successTitle")}
                  </h3>

                  <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                    {t("successMessage")}
                  </p>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl border border-accent/30 bg-[#FAF8F5] px-6 py-3 text-sm font-semibold text-foreground transition-all hover:bg-surface hover:border-accent/60 hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring dark:border-accent/30 dark:bg-surface dark:hover:border-accent/50 cursor-pointer"
                  >
                    <RotateCcw className="h-4 w-4 text-accent" aria-hidden="true" />
                    <span>{t("sendAnotherButton")}</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
