const REVEAL_GROUPS = [
  ".intro > div",
  ".section-title",
  ".service-card",
  ".process-step",
  ".services-next-step",
  ".why > div:first-child",
  ".why-item",
  ".contact > div"
];

/** Activa las apariciones suaves al entrar en el viewport. */
export function initReveals() {
  const revealElements = REVEAL_GROUPS.flatMap((selector) =>
    Array.from(document.querySelectorAll(selector))
  );

  if (revealElements.length === 0) {
    return;
  }

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  revealElements.forEach((element, index) => {
    element.classList.add("reveal");
    element.style.setProperty("--reveal-delay", `${(index % 3) * 90}ms`);
  });

  document.querySelectorAll(".process-step").forEach((element, index) => {
    element.style.setProperty("--reveal-delay", `${index * 90}ms`);
  });

  if (!prefersReducedMotion.matches && "IntersectionObserver" in window) {
    document.documentElement.classList.add("motion-ready");

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -40px" }
    );

    revealElements.forEach((element) => revealObserver.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add("is-visible"));
  }
}
