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
        "Cargadores para vehículos eléctricos",
        "Cargadores Wallbox y portátiles",
        "Adaptadores y accesorios para carga de vehículos eléctricos",
        "Protecciones y sistemas de gestión de carga",
        "Instalación de cargadores para vehículos eléctricos",
        "Estudios de capacidad y viabilidad para carga de vehículos eléctricos",
        "Infraestructura eléctrica para sistemas de carga",
        "Diseños eléctricos",
        "Gestión para certificación RETIE y legalización de proyectos",
        "Estudios de calidad de energía",
        "Desarrollo de proyectos eléctricos",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Tienda de movilidad eléctrica",
        itemListElement: [
          { "@type": "OfferCatalog", name: "Cargadores portátiles" },
          { "@type": "OfferCatalog", name: "Wallbox" },
          { "@type": "OfferCatalog", name: "Adaptadores" },
          { "@type": "OfferCatalog", name: "Accesorios de carga" },
          { "@type": "OfferCatalog", name: "Protecciones especializadas" },
          { "@type": "OfferCatalog", name: "Sistemas de gestión y medición de carga" },
          { "@type": "OfferCatalog", name: "Tecnología para infraestructura de carga" },
        ],
      },
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
      name: "7 VOLTIOS | Movilidad eléctrica y proyectos eléctricos",
      description:
        "Cargadores, instalación e infraestructura para movilidad eléctrica y desarrollo de proyectos eléctricos con respaldo de ingeniería en Colombia.",
      inLanguage: "es-CO",
      isPartOf: {
        "@id": "https://7voltios.com/#website",
      },
      about: [
        {
          "@id": "https://7voltios.com/#servicio-movilidad-electrica",
        },
        {
          "@id": "https://7voltios.com/#servicio-proyectos-electricos",
        },
      ],
    },
    {
      "@type": "Service",
      "@id": "https://7voltios.com/#servicio-movilidad-electrica",
      name: "Movilidad eléctrica",
      serviceType: [
        "Instalación de cargadores",
        "Estudios de capacidad y viabilidad para carga de vehículos eléctricos",
        "Infraestructura eléctrica para sistemas de carga",
      ],
      description:
        "Instalación, estudios de capacidad e infraestructura de carga para vehículos eléctricos en hogares, empresas y copropiedades.",
      url: "https://7voltios.com/#movilidad-electrica",
      provider: {
        "@id": "https://7voltios.com/#organization",
      },
      areaServed: {
        "@type": "Country",
        name: "Colombia",
      },
    },
    {
      "@type": "Service",
      "@id": "https://7voltios.com/#servicio-proyectos-electricos",
      name: "Diseño y desarrollo de proyectos eléctricos",
      serviceType: [
        "Diseños eléctricos",
        "Gestión para certificación RETIE y legalización de proyectos",
        "Estudios de calidad de energía",
        "Desarrollo de proyectos eléctricos",
      ],
      description:
        "Diseño, gestión RETIE, diagnóstico de calidad de energía y desarrollo de proyectos eléctricos.",
      url: "https://7voltios.com/#desarrollo-proyectos-electricos",
      provider: {
        "@id": "https://7voltios.com/#organization",
      },
      areaServed: {
        "@type": "Country",
        name: "Colombia",
      },
    },
  ],
};
