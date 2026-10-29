import type { Locale } from "../config/i18n";

export const homeFaqsByLocale = {
  es: [
    {
      question: "¿7 VOLTIOS vende e instala cargadores para vehículos eléctricos?",
      answer:
        "Sí. Podemos suministrar el cargador, desarrollar la instalación y acompañar la integración de la solución de carga según el alcance de cada proyecto.",
    },
    {
      question: "¿Puedo comprar solo el cargador o contratar únicamente la instalación?",
      answer:
        "Sí. Puedes consultar únicamente por el equipo o solicitar la instalación de un cargador que ya tengas. Antes de confirmar el servicio revisamos la información básica del cargador y del lugar de instalación.",
    },
    {
      question: "¿Atienden hogares, comercios, empresas y copropiedades?",
      answer:
        "Sí. Desarrollamos soluciones para distintos tipos de usuarios y espacios, desde un punto de carga individual hasta infraestructura para múltiples vehículos.",
    },
    {
      question: "¿También desarrollan proyectos eléctricos que no están relacionados con vehículos eléctricos?",
      answer:
        "Sí. Nuestra línea de proyectos eléctricos incluye diseños, gestión técnica para certificación RETIE y legalización, estudios de calidad de energía y desarrollo de proyectos eléctricos.",
    },
    {
      question: "¿7 VOLTIOS acompaña la certificación RETIE y la legalización del proyecto?",
      answer:
        "Sí. Prestamos acompañamiento técnico y documental según el alcance del proyecto. Cuando aplica certificación, esta es emitida por un organismo de inspección acreditado independiente.",
    },
    {
      question: "¿Qué beneficio ofrece un estudio de calidad de energía?",
      answer:
        "Permite convertir mediciones reales de la instalación en un diagnóstico de ingeniería y en recomendaciones orientadas a mejorar la confiabilidad, el desempeño y la continuidad de la operación.",
    },
    {
      question: "¿Cómo puedo solicitar una cotización?",
      answer:
        "Puedes escribirnos por WhatsApp para iniciar una conversación directa o enviar la información disponible a proyectos@7voltios.com. Indica tu nombre, ciudad y una descripción breve de la necesidad.",
    },
  ],
  en: [
    {
      question: "Does 7 VOLTIOS sell and install EV chargers?",
      answer:
        "Yes. We can supply the charger, perform the installation and support the integration of the charging solution according to the scope of each project.",
    },
    {
      question: "Can I purchase only the charger or hire only the installation service?",
      answer:
        "Yes. You may ask us only about equipment or request the installation of a charger you already own. Before confirming the service, we review basic information about the charger and the installation site.",
    },
    {
      question: "Do you serve homes, commercial properties, companies and residential communities?",
      answer:
        "Yes. We develop solutions for different users and sites, from an individual charging point to infrastructure for multiple vehicles in Colombia.",
    },
    {
      question: "Do you also develop electrical projects unrelated to electric vehicles?",
      answer:
        "Yes. Our electrical project services include electrical designs, RETIE certification support and permitting, power quality studies and electrical project development.",
    },
    {
      question: "Does 7 VOLTIOS support RETIE certification and project permitting?",
      answer:
        "Yes. We provide technical and documentation support according to the project scope. When certification is required, it is issued by an independent accredited inspection body in Colombia.",
    },
    {
      question: "What is the benefit of a power quality study?",
      answer:
        "It turns actual installation measurements into an engineering diagnosis and recommendations aimed at improving reliability, performance and operational continuity.",
    },
    {
      question: "How can I request a quote?",
      answer:
        "Contact us on WhatsApp for a direct conversation or email the available information to proyectos@7voltios.com. Include your name, city or country and a brief description of your project needs.",
    },
  ],
} as const satisfies Record<Locale, readonly { question: string; answer: string }[]>;

export const homeFaqs = homeFaqsByLocale.es;
