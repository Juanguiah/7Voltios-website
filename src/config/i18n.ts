export type Locale = "es" | "en";

export const localeConfig = {
  es: {
    htmlLang: "es-CO",
    ogLocale: "es_CO",
    alternateOgLocale: "en_US",
    homePath: "/",
    manifestPath: "/site.webmanifest?v=20261029-bilingual",
  },
  en: {
    htmlLang: "en",
    ogLocale: "en_US",
    alternateOgLocale: "es_CO",
    homePath: "/en/",
    manifestPath: "/site-en.webmanifest?v=20261029-bilingual",
  },
} as const satisfies Record<Locale, {
  htmlLang: string;
  ogLocale: string;
  alternateOgLocale: string;
  homePath: string;
  manifestPath: string;
}>;

export const alternateHomeUrls = {
  es: "/",
  en: "/en/",
  default: "/",
} as const;
