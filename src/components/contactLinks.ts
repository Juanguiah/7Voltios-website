import type { Locale } from "../config/i18n";

const WHATSAPP_PHONE = "573003007000";
export const CONTACT_EMAIL = "proyectos@7voltios.com";
export const INSTAGRAM_HANDLE = "@7VoltiosTech";
export const INSTAGRAM_URL = "https://www.instagram.com/7voltiostech/";

const createWhatsAppUrl = (message: string) =>
  `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;

const contactFields = {
  es: "Nombre:\nEmpresa/Copropiedad:\nCiudad:",
  en: "Name:\nCompany / Residential community:\nCity / Country:",
} as const satisfies Record<Locale, string>;

export function getContactLinks(locale: Locale = "es") {
  const fields = contactFields[locale];

  if (locale === "en") {
    const emailSubject = "Project inquiry | 7 VOLTIOS";
    const emailBody =
      "Hello. I would like to discuss my project with 7 VOLTIOS.\n\nMy details:\nName:\nCompany / Residential community:\nCity / Country:\n\nProject needs:";

    return {
      general: createWhatsAppUrl(
        `Hello. I would like to discuss my project with 7 VOLTIOS.\n${fields}\nProject needs:`,
      ),
      quote: createWhatsAppUrl(
        `Hello. I would like to request a quote from 7 VOLTIOS.\n${fields}\nProject needs:`,
      ),
      installation: createWhatsAppUrl(
        `Hello. I would like a quote from 7 VOLTIOS for an EV charger installation.\n${fields}`,
      ),
      products: createWhatsAppUrl(
        `Hello. I would like advice from 7 VOLTIOS on selecting an EV charger.\n${fields}`,
      ),
      capacityStudy: createWhatsAppUrl(
        `Hello. I would like 7 VOLTIOS to assess the capacity and feasibility of my electrical installation for EV charging.\n${fields}`,
      ),
      infrastructure: createWhatsAppUrl(
        `Hello. I would like a quote from 7 VOLTIOS for EV charging infrastructure.\n${fields}`,
      ),
      engineering: createWhatsAppUrl(
        `Hello. I would like to discuss an electrical engineering service with 7 VOLTIOS.\n${fields}`,
      ),
      project: createWhatsAppUrl(
        `Hello. I would like to develop an electrical project with 7 VOLTIOS.\n${fields}`,
      ),
      email: `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`,
    };
  }

  const emailSubject = "Solicitud de evaluación de proyecto | 7 VOLTIOS";
  const emailBody =
    "Hola. Quisiera evaluar mi proyecto con 7 VOLTIOS.\n\nMis datos:\nNombre:\nEmpresa/Copropiedad:\nCiudad:\n\nDescripción breve del proyecto:";

  return {
    general: createWhatsAppUrl(
      `Hola. Quisiera evaluar mi proyecto con 7 VOLTIOS.\n${fields}`,
    ),
    quote: createWhatsAppUrl(
      `Hola. Quisiera solicitar una cotización con 7 VOLTIOS.\n${fields}\nNecesidad:`,
    ),
    installation: createWhatsAppUrl(
      `Hola. Quisiera cotizar con 7 VOLTIOS la instalación de un cargador para vehículo eléctrico.\n${fields}`,
    ),
    products: createWhatsAppUrl(
      `Hola. Quisiera recibir asesoría para elegir un cargador para vehículo eléctrico con 7 VOLTIOS.\n${fields}`,
    ),
    capacityStudy: createWhatsAppUrl(
      `Hola. Quisiera evaluar con 7 VOLTIOS la capacidad y viabilidad de mi instalación para carga de vehículos eléctricos.\n${fields}`,
    ),
    infrastructure: createWhatsAppUrl(
      `Hola. Quisiera cotizar con 7 VOLTIOS una infraestructura de carga para vehículos eléctricos.\n${fields}`,
    ),
    engineering: createWhatsAppUrl(
      `Hola. Quisiera evaluar un servicio de ingeniería eléctrica con 7 VOLTIOS.\n${fields}`,
    ),
    project: createWhatsAppUrl(
      `Hola. Quisiera desarrollar un proyecto eléctrico con 7 VOLTIOS.\n${fields}`,
    ),
    email: `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`,
  };
}

const spanishContactLinks = getContactLinks("es");

export const WHATSAPP_GENERAL_URL = spanishContactLinks.general;
export const WHATSAPP_QUOTE_URL = spanishContactLinks.quote;
export const WHATSAPP_INSTALLATION_URL = spanishContactLinks.installation;
export const WHATSAPP_PRODUCTS_URL = spanishContactLinks.products;
export const WHATSAPP_CAPACITY_STUDY_URL = spanishContactLinks.capacityStudy;
export const WHATSAPP_INFRASTRUCTURE_URL = spanishContactLinks.infrastructure;
export const WHATSAPP_ENGINEERING_URL = spanishContactLinks.engineering;
export const WHATSAPP_PROJECT_URL = spanishContactLinks.project;

// Alias conservado para componentes generales y compatibilidad con enlaces existentes.
export const WHATSAPP_CONTACT_URL = WHATSAPP_GENERAL_URL;

export const EMAIL_CONTACT_URL = spanishContactLinks.email;
