const WHATSAPP_PHONE = "573003007000";

const createWhatsAppUrl = (message: string) =>
  `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;

const contactFields = "Nombre:\nEmpresa/Copropiedad:\nCiudad:";

export const WHATSAPP_GENERAL_URL = createWhatsAppUrl(
  `Hola. Quisiera evaluar mi proyecto con 7 VOLTIOS.\n${contactFields}`,
);

export const WHATSAPP_QUOTE_URL = createWhatsAppUrl(
  `Hola. Quisiera solicitar una cotización con 7 VOLTIOS.\n${contactFields}\nNecesidad:`,
);

export const WHATSAPP_INSTALLATION_URL = createWhatsAppUrl(
  `Hola. Quisiera cotizar con 7 VOLTIOS la instalación de un cargador para vehículo eléctrico.\n${contactFields}`,
);

export const WHATSAPP_PRODUCTS_URL = createWhatsAppUrl(
  `Hola. Quisiera recibir asesoría para elegir un cargador para vehículo eléctrico con 7 VOLTIOS.\n${contactFields}`,
);

export const WHATSAPP_CAPACITY_STUDY_URL = createWhatsAppUrl(
  `Hola. Quisiera evaluar con 7 VOLTIOS la capacidad y viabilidad de mi instalación para carga de vehículos eléctricos.\n${contactFields}`,
);

export const WHATSAPP_INFRASTRUCTURE_URL = createWhatsAppUrl(
  `Hola. Quisiera cotizar con 7 VOLTIOS una infraestructura de carga para vehículos eléctricos.\n${contactFields}`,
);

export const WHATSAPP_ENGINEERING_URL = createWhatsAppUrl(
  `Hola. Quisiera evaluar un servicio de ingeniería eléctrica con 7 VOLTIOS.\n${contactFields}`,
);

export const WHATSAPP_PROJECT_URL = createWhatsAppUrl(
  `Hola. Quisiera desarrollar un proyecto eléctrico con 7 VOLTIOS.\n${contactFields}`,
);

// Alias conservado para componentes generales y compatibilidad con enlaces existentes.
export const WHATSAPP_CONTACT_URL = WHATSAPP_GENERAL_URL;

export const EMAIL_CONTACT_URL =
  "mailto:proyectos@7voltios.com?subject=Solicitud%20de%20evaluaci%C3%B3n%20de%20proyecto%20%7C%207%20VOLTIOS&body=Hola.%20Quisiera%20evaluar%20mi%20proyecto%20con%207%20VOLTIOS%0D%0A%0D%0AMis%20datos%3A%0D%0ANombre%3A%0D%0AEmpresa%2FCopropiedad%3A%0D%0ACiudad%3A%0D%0A%0D%0ADescripci%C3%B3n%20breve%20del%20proyecto%3A";
