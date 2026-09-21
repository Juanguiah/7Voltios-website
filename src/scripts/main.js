import { initNavigation } from "./navigation.js";
import { initReveals } from "./reveals.js";

function initializeSiteInteractions() {
  initNavigation();
  initReveals();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeSiteInteractions, {
    once: true
  });
} else {
  initializeSiteInteractions();
}
