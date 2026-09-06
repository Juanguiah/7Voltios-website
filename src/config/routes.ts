/**
 * Contrato central de URLs de la nueva arquitectura comercial.
 * En Fase 1 estas constantes no publican páginas vacías; únicamente evitan que
 * futuras páginas, enlaces y CTAs definan rutas incompatibles entre sí.
 */
export const routes = {
  home: "/",
  mobility: "/movilidad-electrica/",
  chargerInstallation: "/movilidad-electrica/instalacion-cargadores/",
  electricalEngineering: "/ingenieria-electrica/",
  store: "/tienda/",
  projects: "/proyectos/",
  about: "/nosotros/",
  contact: "/contacto/",
  product: (slug: string) => `/productos/${slug}/`,
  project: (slug: string) => `/proyectos/${slug}/`,
} as const;
