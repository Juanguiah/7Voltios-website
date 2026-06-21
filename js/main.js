const menuToggle = document.getElementById("menu-toggle");
const nav = document.querySelector(".nav");
const header = document.querySelector(".header");

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("active");
});

lucide.createIcons();

function updateHeaderOnScroll() {
  header.classList.toggle("is-scrolled", window.scrollY > 12);
}

window.addEventListener("scroll", updateHeaderOnScroll, { passive: true });
updateHeaderOnScroll();

const dashboardStatus = document.querySelector(".dashboard-status");
const kpis = document.querySelectorAll(".kpi[data-current][data-proposed]");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const kpiAnimationFrames = new WeakMap();

const revealGroups = [
  ".intro > div",
  ".section-title",
  ".service-card",
  ".why > div:first-child",
  ".why-item",
  ".contact > div"
];

const revealElements = revealGroups.flatMap((selector) =>
  Array.from(document.querySelectorAll(selector))
);

revealElements.forEach((element, index) => {
  element.classList.add("reveal");
  element.style.setProperty("--reveal-delay", `${(index % 3) * 90}ms`);
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

function animateKpiValue(kpi) {
  const valueElement = kpi.querySelector("strong");
  const target = Number(kpi.dataset.value);
  const decimals = Number(kpi.dataset.decimals || 0);
  const suffix = kpi.dataset.suffix || "";
  const duration = Number(kpi.dataset.duration || 1200);

  if (prefersReducedMotion.matches) {
    valueElement.textContent = `${target.toFixed(decimals)}${suffix}`;
    return;
  }

  const startTime = performance.now();

  function count(currentTime) {
    const progress = Math.min((currentTime - startTime) / duration, 1);
    const currentValue = target * progress;
    valueElement.textContent = `${currentValue.toFixed(decimals)}${suffix}`;

    if (progress < 1) {
      kpiAnimationFrames.set(kpi, requestAnimationFrame(count));
    }
  }

  valueElement.textContent = `${(0).toFixed(decimals)}${suffix}`;
  kpiAnimationFrames.set(kpi, requestAnimationFrame(count));
}

function updateDashboard(showProposed) {
  dashboardStatus.textContent = showProposed
    ? "Escenario optimizado"
    : "Estado actual";
  dashboardStatus.classList.toggle("is-proposed", showProposed);

  kpis.forEach((kpi) => {
    kpi.classList.add("is-updating");

    window.setTimeout(() => {
      const activeFrame = kpiAnimationFrames.get(kpi);

      if (activeFrame) {
        cancelAnimationFrame(activeFrame);
      }

      if (showProposed && kpi.dataset.value) {
        animateKpiValue(kpi);
      } else {
        kpi.querySelector("strong").textContent = showProposed
          ? kpi.dataset.proposed
          : kpi.dataset.current;
      }

      kpi.classList.toggle("kpi-alert", !showProposed);
      kpi.classList.toggle("kpi-positive", showProposed);
      kpi.classList.remove("is-updating");
    }, prefersReducedMotion.matches ? 0 : 300);
  });
}

if (dashboardStatus && kpis.length) {
  if (prefersReducedMotion.matches) {
    updateDashboard(true);
  } else {
    let showProposed = false;

    window.setInterval(() => {
      showProposed = !showProposed;
      updateDashboard(showProposed);
    }, 3000);
  }
}
