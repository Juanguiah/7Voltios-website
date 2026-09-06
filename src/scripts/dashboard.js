const DASHBOARD_INTERVAL = 4000;

/**
 * Inicializa la comparación Estado actual / Escenario optimizado y sus KPI.
 * Las referencias opcionales permiten reutilizar el script en páginas sin dashboard.
 */
export function initDashboard() {
  const dashboardStatus = document.querySelector(".dashboard-status");
  const dashboardCard = document.querySelector(".hero-card");
  const kpis = Array.from(
    document.querySelectorAll(".kpi[data-current][data-proposed]")
  );

  if (!dashboardStatus || !dashboardCard || kpis.length === 0) {
    return;
  }

  const currentStatusLabel = document.querySelector(".status-current");
  const proposedStatusLabel = document.querySelector(".status-proposed");
  const dashboardMotionToggle = document.querySelector(
    ".dashboard-motion-toggle"
  );
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );
  const kpiAnimationFrames = new WeakMap();
  const kpiUpdateTimeouts = new WeakMap();

  let dashboardInterval = null;
  let showProposed = false;
  let dashboardVisible = true;
  let dashboardPausedByUser = false;

  const setKpiText = (kpi, value) => {
    const valueElement = kpi.querySelector("dd");

    if (valueElement) {
      valueElement.textContent = value;
    }
  };

  const animateKpiValue = (kpi) => {
    const valueElement = kpi.querySelector("dd");

    if (!valueElement) {
      return;
    }

    const target = Number(kpi.dataset.value);
    const decimals = Number(kpi.dataset.decimals || 0);
    const suffix = kpi.dataset.suffix || "";
    const duration = Number(kpi.dataset.duration || 1200);

    if (prefersReducedMotion.matches) {
      valueElement.textContent = `${target.toFixed(decimals)}${suffix}`;
      return;
    }

    const startTime = performance.now();

    const count = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const currentValue = target * progress;
      valueElement.textContent = `${currentValue.toFixed(decimals)}${suffix}`;

      if (progress < 1) {
        kpiAnimationFrames.set(kpi, requestAnimationFrame(count));
      } else {
        kpiAnimationFrames.delete(kpi);
      }
    };

    valueElement.textContent = `${(0).toFixed(decimals)}${suffix}`;
    kpiAnimationFrames.set(kpi, requestAnimationFrame(count));
  };

  const updateDashboard = (shouldShowProposed) => {
    dashboardStatus.classList.toggle("is-proposed", shouldShowProposed);
    currentStatusLabel?.toggleAttribute("aria-current", !shouldShowProposed);
    proposedStatusLabel?.toggleAttribute("aria-current", shouldShowProposed);

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

        if (shouldShowProposed && kpi.dataset.value) {
          animateKpiValue(kpi);
        } else {
          setKpiText(
            kpi,
            shouldShowProposed ? kpi.dataset.proposed : kpi.dataset.current
          );
        }

        kpi.classList.toggle("kpi-alert", !shouldShowProposed);
        kpi.classList.toggle("kpi-positive", shouldShowProposed);
        kpi.classList.remove("is-updating");
      }, prefersReducedMotion.matches ? 0 : 300);

      kpiUpdateTimeouts.set(kpi, updateTimeout);
    });
  };

  const cancelDashboardAnimations = () => {
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

      setKpiText(kpi, showProposed ? kpi.dataset.proposed : kpi.dataset.current);
      kpi.classList.toggle("kpi-alert", !showProposed);
      kpi.classList.toggle("kpi-positive", showProposed);
      kpi.classList.remove("is-updating");
    });
  };

  const stopDashboardCycle = () => {
    if (dashboardInterval) {
      window.clearInterval(dashboardInterval);
      dashboardInterval = null;
    }

    cancelDashboardAnimations();
  };

  const canRunDashboardCycle = () =>
    !prefersReducedMotion.matches &&
    !dashboardPausedByUser &&
    dashboardVisible &&
    !document.hidden;

  const startDashboardCycle = () => {
    if (!canRunDashboardCycle() || dashboardInterval) {
      return;
    }

    dashboardInterval = window.setInterval(() => {
      showProposed = !showProposed;
      updateDashboard(showProposed);
    }, DASHBOARD_INTERVAL);
  };

  const updateDashboardControl = () => {
    if (!dashboardMotionToggle) {
      return;
    }

    dashboardMotionToggle.textContent = dashboardPausedByUser
      ? "Reanudar"
      : "Pausar";
    dashboardMotionToggle.setAttribute(
      "aria-label",
      dashboardPausedByUser
        ? "Reanudar cambio automático de indicadores"
        : "Pausar cambio automático de indicadores"
    );
  };

  dashboardMotionToggle?.addEventListener("click", () => {
    dashboardPausedByUser = !dashboardPausedByUser;
    updateDashboardControl();

    if (dashboardPausedByUser) {
      stopDashboardCycle();
    } else {
      startDashboardCycle();
    }
  });

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
