/**
 * Inicializa el encabezado fijo y el menú responsive.
 *
 * El inicializador es deliberadamente defensivo: las páginas futuras pueden
 * reutilizar solo el encabezado o incluso no incluir navegación sin provocar
 * errores de JavaScript.
 */
export function initNavigation() {
  const menuToggle = document.getElementById("menu-toggle");
  const nav = document.querySelector(".nav");
  const header = document.querySelector(".header");

  if (header) {
    const updateHeaderOnScroll = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 12);
    };

    window.addEventListener("scroll", updateHeaderOnScroll, { passive: true });
    updateHeaderOnScroll();
  }

  if (!menuToggle || !nav) {
    return;
  }

  const setMobileMenu = (open) => {
    nav.classList.toggle("active", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  };

  menuToggle.addEventListener("click", () => {
    setMobileMenu(!nav.classList.contains("active"));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMobileMenu(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("active")) {
      setMobileMenu(false);
      menuToggle.focus();
    }
  });

  document.addEventListener("pointerdown", (event) => {
    const target = event.target;

    if (
      target instanceof Node &&
      nav.classList.contains("active") &&
      !nav.contains(target) &&
      !menuToggle.contains(target)
    ) {
      setMobileMenu(false);
    }
  });

  const desktopNavigation = window.matchMedia("(min-width: 981px)");
  const closeMenuOnDesktop = (event) => {
    if (event.matches) {
      setMobileMenu(false);
    }
  };

  desktopNavigation.addEventListener("change", closeMenuOnDesktop);
}
