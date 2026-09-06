# 7 VOLTIOS · Sitio web

Base estática construida con [Astro](https://astro.build/) y preparada para desplegarse en
Vercel. La Fase 1 conserva el contenido y la apariencia de la landing existente, mientras
separa layout, componentes, estilos y comportamiento para permitir el crecimiento multipágina.

## Comandos

```powershell
pnpm install
pnpm dev
pnpm check
pnpm build
pnpm preview
```

El resultado estático se genera en `dist/`.

## Estructura

```text
public/                 recursos servidos con URL estable: imágenes, robots y manifest
src/components/         componentes visuales compartidos
src/components/home/    secciones exclusivas de la portada actual
src/config/routes.ts    contrato de URLs aprobado para las fases siguientes
src/data/               datos estructurados y contenido reutilizable
src/layouts/             estructura HTML, metadatos y recursos comunes
src/pages/               rutas públicas reales
src/scripts/             interacciones progresivas y defensivas
src/styles/              tokens corporativos y estilos globales
```

Astro crea una URL únicamente cuando existe un archivo dentro de `src/pages`. Por esa razón,
en esta fase solo se publican el Home y la página 404: las rutas comerciales aprobadas están
definidas como contrato en `src/config/routes.ts`, pero no se generan páginas vacías.

## SEO y entornos

- El dominio canónico siempre es `https://7voltios.com`.
- Los despliegues cuyo `VERCEL_ENV` sea `preview` reciben `noindex, nofollow` en sus metadatos.
- El sitemap se genera durante el build a partir de las rutas públicas reales.
- Se conservan los anclajes históricos `#servicios`, `#porque` y `#contacto`.

## Alcance de esta rama

La rama `codex/nueva-version-web` contiene la migración técnica. No debe integrarse a `main`
hasta aprobar visual y funcionalmente la Fase 1. El nuevo posicionamiento, Hero y navegación
pertenecen a la Fase 2.
