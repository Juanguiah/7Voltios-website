/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly VERCEL_ENV?: "production" | "preview" | "development";
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
