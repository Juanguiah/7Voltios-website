const HERO_QUESTION_INTERVAL = 4000;

/**
 * Inicializa el carrusel de preguntas del hero.
 * Mantiene el intervalo, controles y comportamiento accesible del sitio actual.
 */
export function initHeroQuestions() {
  const heroQuestion = document.querySelector(".hero-question");
  const heroQuestionOptions = Array.from(
    document.querySelectorAll(".hero-question-option")
  );

  if (!heroQuestion || heroQuestionOptions.length === 0) {
    return;
  }

  const heroQuestionSelectors = Array.from(
    document.querySelectorAll(".hero-question-selector")
  );
  const heroQuestionCounter = document.querySelector(".hero-question-counter");
  const heroQuestionAutoplay = document.querySelector(".hero-question-autoplay");
  const heroQuestionAnnouncement = document.getElementById(
    "hero-question-announcement"
  );
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  let heroQuestionIndex = 0;
  let heroQuestionInterval = null;
  let heroQuestionVisible = true;
  let heroQuestionPaused = false;

  const showHeroQuestion = (index, announce = false) => {
    heroQuestionIndex =
      (index + heroQuestionOptions.length) % heroQuestionOptions.length;

    heroQuestionOptions.forEach((option, optionIndex) => {
      const isActive = optionIndex === heroQuestionIndex;
      option.classList.toggle("is-active", isActive);
      option.setAttribute("aria-hidden", String(!isActive));
    });

    heroQuestionSelectors.forEach((selector, selectorIndex) => {
      const isActive = selectorIndex === heroQuestionIndex;
      selector.classList.toggle("is-active", isActive);

      if (isActive) {
        selector.setAttribute("aria-current", "true");
      } else {
        selector.removeAttribute("aria-current");
      }
    });

    if (heroQuestionCounter) {
      heroQuestionCounter.textContent = `${heroQuestionIndex + 1} de ${heroQuestionOptions.length}`;
    }

    if (announce && heroQuestionAnnouncement) {
      heroQuestionAnnouncement.textContent =
        `Pregunta ${heroQuestionIndex + 1} de ${heroQuestionOptions.length}: ` +
        heroQuestionOptions[heroQuestionIndex].textContent.trim();
    }
  };

  const stopHeroQuestionCycle = () => {
    if (heroQuestionInterval) {
      window.clearInterval(heroQuestionInterval);
      heroQuestionInterval = null;
    }
  };

  const startHeroQuestionCycle = () => {
    if (
      heroQuestionInterval ||
      heroQuestionOptions.length < 2 ||
      prefersReducedMotion.matches ||
      heroQuestionPaused ||
      !heroQuestionVisible ||
      document.hidden
    ) {
      return;
    }

    heroQuestionInterval = window.setInterval(() => {
      showHeroQuestion((heroQuestionIndex + 1) % heroQuestionOptions.length);
    }, HERO_QUESTION_INTERVAL);
  };

  const restartHeroQuestionCycle = () => {
    stopHeroQuestionCycle();
    startHeroQuestionCycle();
  };

  const updateHeroQuestionAutoplay = () => {
    if (!heroQuestionAutoplay) {
      return;
    }

    heroQuestionAutoplay.setAttribute("aria-pressed", String(heroQuestionPaused));
    heroQuestionAutoplay.setAttribute(
      "aria-label",
      heroQuestionPaused
        ? "Reanudar cambio automático de preguntas"
        : "Pausar cambio automático de preguntas"
    );
    heroQuestionAutoplay.title = heroQuestionPaused
      ? "Reanudar preguntas"
      : "Pausar preguntas";
  };

  showHeroQuestion(0);
  updateHeroQuestionAutoplay();

  heroQuestionSelectors.forEach((selector) => {
    selector.addEventListener("click", () => {
      const selectedIndex = Number(selector.dataset.questionIndex);

      if (!Number.isInteger(selectedIndex)) {
        return;
      }

      stopHeroQuestionCycle();
      showHeroQuestion(selectedIndex, true);
      startHeroQuestionCycle();
    });
  });

  heroQuestionAutoplay?.addEventListener("click", () => {
    heroQuestionPaused = !heroQuestionPaused;
    updateHeroQuestionAutoplay();

    if (heroQuestionPaused) {
      stopHeroQuestionCycle();
    } else {
      restartHeroQuestionCycle();
    }
  });

  if ("IntersectionObserver" in window) {
    const heroQuestionObserver = new IntersectionObserver(
      ([entry]) => {
        heroQuestionVisible = entry.isIntersecting;

        if (heroQuestionVisible) {
          startHeroQuestionCycle();
        } else {
          stopHeroQuestionCycle();
        }
      },
      { threshold: 0.1 }
    );

    heroQuestionObserver.observe(heroQuestion);
  }

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopHeroQuestionCycle();
    } else {
      startHeroQuestionCycle();
    }
  });

  prefersReducedMotion.addEventListener("change", (event) => {
    if (event.matches) {
      stopHeroQuestionCycle();
      showHeroQuestion(0);
    } else {
      restartHeroQuestionCycle();
    }
  });

  startHeroQuestionCycle();
}
