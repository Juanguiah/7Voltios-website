import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { copyFile } from "node:fs/promises";

const preserveLegacySitemapUrl = {
  name: "preserve-legacy-sitemap-url",
  hooks: {
    "astro:build:done": async ({ dir }) => {
      await copyFile(
        new URL("sitemap-index.xml", dir),
        new URL("sitemap.xml", dir),
      );
    },
  },
};

export default defineConfig({
  site: "https://7voltios.com",
  output: "static",
  trailingSlash: "always",
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      filter: (page) => !page.endsWith("/404/"),
      i18n: {
        defaultLocale: "es",
        locales: {
          es: "es-CO",
          en: "en",
        },
      },
    }),
    preserveLegacySitemapUrl,
  ],
});
