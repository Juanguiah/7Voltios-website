import { initNavigation } from "./navigation.js";
import { initReveals } from "./reveals.js";
import { initLanguagePreference } from "./language-preference.js";

function initializeSiteInteractions() {
  initNavigation();
  initReveals();
  initLanguagePreference();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeSiteInteractions, {
    once: true
  });
} else {
  initializeSiteInteractions();
}
