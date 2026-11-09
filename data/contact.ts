/**
 * Configuración centralizada de datos de contacto.
 * Fuente única de verdad compartida entre la sección Contacto y el Footer.
 */

export interface ContactData {
  email: {
    readonly address: string;
    readonly href: string;
    readonly display: string;
  };
  github: {
    readonly url: string;
    readonly display: string;
  };
  linkedin: {
    readonly url: string;
    readonly display: string;
  };
  whatsapp: {
    readonly phone: string;
    readonly rawPhone: string;
    readonly url: string;
    readonly display: string;
    readonly defaultMessage: string;
  };
}

const DEFAULT_WHATSAPP_MESSAGE = "Hola, vi tu portafolio y me gustaría conversar contigo.";

export const CONTACT_DATA: ContactData = {
  email: {
    address: "bastiandev88@gmail.com",
    href: "mailto:bastiandev88@gmail.com",
    display: "bastiandev88@gmail.com",
  },
  github: {
    url: "https://github.com/luis-sdiaz",
    display: "github.com/luis-sdiaz",
  },
  linkedin: {
    url: "https://www.linkedin.com/in/sebastian-diaz-9570322b4/",
    display: "linkedin.com/in/sebastian-diaz-9570322b4",
  },
  whatsapp: {
    phone: "+57 317 817 8078",
    rawPhone: "573178178078",
    defaultMessage: DEFAULT_WHATSAPP_MESSAGE,
    url: `https://wa.me/573178178078?text=${encodeURIComponent(DEFAULT_WHATSAPP_MESSAGE)}`,
    display: "+57 317 817 8078",
  },
};
