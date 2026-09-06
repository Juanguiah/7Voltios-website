import { initDashboard } from "./dashboard.js";
import { initHeroQuestions } from "./hero-questions.js";
import { initNavigation } from "./navigation.js";
import { initReveals } from "./reveals.js";

function initializeSiteInteractions() {
  initNavigation();
  initHeroQuestions();
  initReveals();
  initDashboard();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeSiteInteractions, {
    once: true
  });
} else {
  initializeSiteInteractions();
}
