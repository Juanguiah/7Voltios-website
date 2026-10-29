import type { Locale } from "../config/i18n";
import { localeConfig } from "../config/i18n";
import { INSTAGRAM_URL } from "../components/contactLinks";
import { homeFaqsByLocale } from "./faqs";
import { siteContent } from "./siteContent";

const SITE_URL = "https://7voltios.com";

export function getHomeStructuredData(locale: Locale = "es") {
  const copy = siteContent[locale];
  const faqs = homeFaqsByLocale[locale];
  const localePath = localeConfig[locale].homePath;
  const pageUrl = new URL(localePath, SITE_URL).toString();
  const isEnglish = locale === "en";
  const language = localeConfig[locale].htmlLang;
  const mobilityId = `${pageUrl}#${isEnglish ? "electric-mobility-service" : "servicio-movilidad-electrica"}`;
  const engineeringId = `${pageUrl}#${isEnglish ? "electrical-project-service" : "servicio-proyectos-electricos"}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "7 VOLTIOS",
        alternateName: "7 VOLTIOS TECHNOLOGIES",
        url: `${SITE_URL}/`,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/img/logo-maestro.png`,
          width: 560,
          height: 379,
        },
        image: `${SITE_URL}/img/og-image-v2.png`,
        email: "proyectos@7voltios.com",
        sameAs: [INSTAGRAM_URL],
        areaServed: {
          "@type": "Country",
          name: "Colombia",
        },
        knowsAbout: [
          ...copy.products.categories.map((category) => category.title),
          ...copy.mobility.services.map((service) => service.title),
          ...copy.engineering.services.map((service) => service.title),
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: copy.products.eyebrow,
          itemListElement: copy.products.categories.map((category) => ({
            "@type": "OfferCatalog",
            name: category.title,
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: "7 VOLTIOS",
        inLanguage: ["es-CO", "en"],
        publisher: {
          "@id": `${SITE_URL}/#organization`,
        },
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: copy.meta.title,
        description: copy.meta.description,
        inLanguage: language,
        isPartOf: {
          "@id": `${SITE_URL}/#website`,
        },
        about: [{ "@id": mobilityId }, { "@id": engineeringId }],
      },
      {
        "@type": "Service",
        "@id": mobilityId,
        name: copy.mobility.eyebrow,
        serviceType: copy.mobility.services.map((service) => service.title),
        description: copy.mobility.intro,
        url: `${pageUrl}#movilidad-electrica`,
        provider: {
          "@id": `${SITE_URL}/#organization`,
        },
        areaServed: {
          "@type": "Country",
          name: "Colombia",
        },
      },
      {
        "@type": "Service",
        "@id": engineeringId,
        name: copy.engineering.eyebrow,
        serviceType: copy.engineering.services.map((service) => service.title),
        description: copy.engineering.intro,
        url: `${pageUrl}#desarrollo-proyectos-electricos`,
        provider: {
          "@id": `${SITE_URL}/#organization`,
        },
        areaServed: {
          "@type": "Country",
          name: "Colombia",
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#preguntas-frecuentes`,
        url: `${pageUrl}#preguntas-frecuentes`,
        inLanguage: language,
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };
}

export const homeStructuredData = getHomeStructuredData("es");
