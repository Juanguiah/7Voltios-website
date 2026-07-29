const menuToggle = document.getElementById("menu-toggle");
const nav = document.querySelector(".nav");
const header = document.querySelector(".header");

function setMobileMenu(open) {
  nav.classList.toggle("active", open);
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
}

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
  if (
    nav.classList.contains("active") &&
    !nav.contains(event.target) &&
    !menuToggle.contains(event.target)
  ) {
    setMobileMenu(false);
  }
});

const desktopNavigation = window.matchMedia("(min-width: 981px)");

function closeMenuOnDesktop(event) {
  if (event.matches) {
    setMobileMenu(false);
  }
}

desktopNavigation.addEventListener("change", closeMenuOnDesktop);

if (window.lucide) {
  window.lucide.createIcons();
}

function updateHeaderOnScroll() {
  header.classList.toggle("is-scrolled", window.scrollY > 12);
}

window.addEventListener("scroll", updateHeaderOnScroll, { passive: true });
updateHeaderOnScroll();

const dashboardStatus = document.querySelector(".dashboard-status");
const currentStatusLabel = document.querySelector(".status-current");
const proposedStatusLabel = document.querySelector(".status-proposed");
const dashboardCard = document.querySelector(".hero-card");
const dashboardMotionToggle = document.querySelector(".dashboard-motion-toggle");
const kpis = document.querySelectorAll(".kpi[data-current][data-proposed]");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const kpiAnimationFrames = new WeakMap();
const kpiUpdateTimeouts = new WeakMap();

const revealGroups = [
  ".intro > div",
  ".section-title",
  ".service-card",
  ".process-step",
  ".services-next-step",
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

function animateKpiValue(kpi) {
  const valueElement = kpi.querySelector("dd");
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
    } else {
      kpiAnimationFrames.delete(kpi);
    }
  }

  valueElement.textContent = `${(0).toFixed(decimals)}${suffix}`;
  kpiAnimationFrames.set(kpi, requestAnimationFrame(count));
}

function updateDashboard(showProposed) {
  dashboardStatus.classList.toggle("is-proposed", showProposed);
  currentStatusLabel.toggleAttribute("aria-current", !showProposed);
  proposedStatusLabel.toggleAttribute("aria-current", showProposed);

  kpis.forEach((kpi) => {
    const pendingUpdate = kpiUpdateTimeouts.get(kpi);
    const activeFrame = kpiAnimationFrames.get(kpi);

    if (pendingUpdate) {
      window.clearTimeout(pendingUpdate);
    }

    if (activeFrame) {
      cancelAnimationFrame(activeFrame);
    }

    kpi.classList.add("is-updating");

    const updateTimeout = window.setTimeout(() => {
      kpiUpdateTimeouts.delete(kpi);

      if (showProposed && kpi.dataset.value) {
        animateKpiValue(kpi);
      } else {
        kpi.querySelector("dd").textContent = showProposed
          ? kpi.dataset.proposed
          : kpi.dataset.current;
      }

      kpi.classList.toggle("kpi-alert", !showProposed);
      kpi.classList.toggle("kpi-positive", showProposed);
      kpi.classList.remove("is-updating");
    }, prefersReducedMotion.matches ? 0 : 300);

    kpiUpdateTimeouts.set(kpi, updateTimeout);
  });
}

let dashboardInterval = null;
let showProposed = false;
let dashboardVisible = true;
let dashboardPausedByUser = false;

function cancelDashboardAnimations() {
  kpis.forEach((kpi) => {
    const pendingUpdate = kpiUpdateTimeouts.get(kpi);
    const activeFrame = kpiAnimationFrames.get(kpi);

    if (pendingUpdate) {
      window.clearTimeout(pendingUpdate);
      kpiUpdateTimeouts.delete(kpi);
    }

    if (activeFrame) {
      cancelAnimationFrame(activeFrame);
      kpiAnimationFrames.delete(kpi);
    }

    kpi.querySelector("dd").textContent = showProposed
      ? kpi.dataset.proposed
      : kpi.dataset.current;
    kpi.classList.toggle("kpi-alert", !showProposed);
    kpi.classList.toggle("kpi-positive", showProposed);
    kpi.classList.remove("is-updating");
  });
}

function stopDashboardCycle() {
  if (dashboardInterval) {
    window.clearInterval(dashboardInterval);
    dashboardInterval = null;
  }

  cancelDashboardAnimations();
}

function canRunDashboardCycle() {
  return (
    !prefersReducedMotion.matches &&
    !dashboardPausedByUser &&
    dashboardVisible &&
    !document.hidden
  );
}

function startDashboardCycle() {
  if (!canRunDashboardCycle() || dashboardInterval) {
    return;
  }

  dashboardInterval = window.setInterval(() => {
    showProposed = !showProposed;
    updateDashboard(showProposed);
  }, 4000);
}

function updateDashboardControl() {
  if (!dashboardMotionToggle) {
    return;
  }

  dashboardMotionToggle.textContent = dashboardPausedByUser ? "Reanudar" : "Pausar";
  dashboardMotionToggle.setAttribute(
    "aria-label",
    dashboardPausedByUser
      ? "Reanudar cambio automático de indicadores"
      : "Pausar cambio automático de indicadores"
  );
}

if (dashboardStatus && dashboardCard && kpis.length) {
  if (dashboardMotionToggle) {
    dashboardMotionToggle.addEventListener("click", () => {
      dashboardPausedByUser = !dashboardPausedByUser;
      updateDashboardControl();

      if (dashboardPausedByUser) {
        stopDashboardCycle();
      } else {
        startDashboardCycle();
      }
    });
  }

  if ("IntersectionObserver" in window) {
    const dashboardObserver = new IntersectionObserver(
      ([entry]) => {
        dashboardVisible = entry.isIntersecting;

        if (dashboardVisible) {
          startDashboardCycle();
        } else {
          stopDashboardCycle();
        }
      },
      { threshold: 0.1 }
    );

    dashboardObserver.observe(dashboardCard);
  }

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopDashboardCycle();
    } else {
      startDashboardCycle();
    }
  });

  prefersReducedMotion.addEventListener("change", (event) => {
    if (event.matches) {
      stopDashboardCycle();
      showProposed = true;
      updateDashboard(true);
    } else {
      startDashboardCycle();
    }
  });

  updateDashboardControl();

  if (prefersReducedMotion.matches) {
    showProposed = true;
    updateDashboard(true);
  } else {
    startDashboardCycle();
  }
}
