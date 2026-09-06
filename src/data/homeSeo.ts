export const homeStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://7voltios.com/#organization",
      name: "7 VOLTIOS",
      alternateName: "7 VOLTIOS TECHNOLOGIES",
      url: "https://7voltios.com/",
      logo: {
        "@type": "ImageObject",
        url: "https://7voltios.com/img/logo-maestro.png",
        width: 560,
        height: 379,
      },
      image: "https://7voltios.com/img/og-image-v2.png",
      email: "proyectos@7voltios.com",
      areaServed: {
        "@type": "Country",
        name: "Colombia",
      },
      knowsAbout: [
        "Infraestructura de carga para vehículos eléctricos",
        "Consultoría energética",
        "Diseños eléctricos",
        "Cumplimiento RETIE",
        "Energía solar fotovoltaica",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://7voltios.com/#website",
      url: "https://7voltios.com/",
      name: "7 VOLTIOS",
      inLanguage: "es-CO",
      publisher: {
        "@id": "https://7voltios.com/#organization",
      },
    },
    {
      "@type": "WebPage",
      "@id": "https://7voltios.com/#webpage",
      url: "https://7voltios.com/",
      name: "7 VOLTIOS | Consultoría, Diseños Eléctricos y Soluciones Energéticas",
      description:
        "Evaluamos y diseñamos infraestructura de carga para vehículos eléctricos destinada a personas, empresas y copropiedades en Colombia, con enfoque RETIE.",
      inLanguage: "es-CO",
      isPartOf: {
        "@id": "https://7voltios.com/#website",
      },
      about: {
        "@id": "https://7voltios.com/#servicio-infraestructura-carga",
      },
    },
    {
      "@type": "Service",
      "@id": "https://7voltios.com/#servicio-infraestructura-carga",
      name: "Infraestructura de carga para vehículos eléctricos",
      serviceType: [
        "Evaluación de viabilidad",
        "Diseño eléctrico",
        "Integración de infraestructura de carga",
      ],
      description:
        "Evaluación, diseño e integración de infraestructura de carga para vehículos eléctricos destinada a personas, empresas y copropiedades, con criterios técnicos, normativos y de escalabilidad.",
      url: "https://7voltios.com/#servicios",
      provider: {
        "@id": "https://7voltios.com/#organization",
      },
      areaServed: {
        "@type": "Country",
        name: "Colombia",
      },
      audience: [
        {
          "@type": "Audience",
          audienceType: "Personas naturales",
        },
        {
          "@type": "BusinessAudience",
          audienceType: "Empresas y comercios",
        },
        {
          "@type": "Audience",
          audienceType: "Copropiedades",
        },
      ],
    },
  ],
};
