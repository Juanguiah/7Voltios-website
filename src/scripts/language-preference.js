const STORAGE_KEY = "7v-language-preference";
const SUPPORTED_LANGUAGES = new Set(["es", "en"]);

function normalizeLanguage(language) {
  const normalized = language?.toLowerCase().split("-")[0];
  return SUPPORTED_LANGUAGES.has(normalized) ? normalized : null;
}

function readLanguagePreference() {
  try {
    return normalizeLanguage(window.localStorage.getItem(STORAGE_KEY));
  } catch {
    return null;
  }
}

function saveLanguagePreference(language) {
  const normalized = normalizeLanguage(language);

  if (!normalized) return;

  try {
    window.localStorage.setItem(STORAGE_KEY, normalized);
  } catch {
    // The language switch still works when storage is unavailable.
  }
}

function getPreferredBrowserLanguage() {
  const browserLanguages = navigator.languages?.length
    ? navigator.languages
    : [navigator.language];

  for (const language of browserLanguages) {
    const normalized = normalizeLanguage(language);
    if (normalized) return normalized;
  }

  return null;
}

function getLanguageUrl(href) {
  const targetUrl = new URL(href, window.location.origin);

  if (!targetUrl.search) targetUrl.search = window.location.search;
  if (!targetUrl.hash) targetUrl.hash = window.location.hash;

  return targetUrl;
}

function revealSuggestion(suggestion) {
  suggestion.hidden = false;
  window.requestAnimationFrame(() => {
    suggestion.classList.add("is-visible");
  });
}

function dismissSuggestion(suggestion) {
  suggestion.classList.remove("is-visible");
  const shouldRestoreFocus = suggestion.contains(document.activeElement);

  const finishDismissal = () => {
    suggestion.hidden = true;

    if (shouldRestoreFocus) {
      document.querySelector("main")?.focus({ preventScroll: true });
    }
  };

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    finishDismissal();
    return;
  }

  suggestion.addEventListener("transitionend", finishDismissal, { once: true });
  window.setTimeout(finishDismissal, 260);
}

export function initLanguagePreference() {
  const suggestion = document.querySelector("[data-language-suggestion]");
  const currentLocale = normalizeLanguage(
    suggestion?.dataset.currentLocale ?? document.documentElement.lang,
  );

  document.querySelectorAll("[data-language-choice]").forEach((link) => {
    link.addEventListener("click", (event) => {
      const selectedLocale = normalizeLanguage(link.dataset.languageChoice);
      saveLanguagePreference(selectedLocale);

      if (!selectedLocale || selectedLocale === currentLocale) {
        event.preventDefault();
        return;
      }

      event.preventDefault();
      window.location.replace(getLanguageUrl(link.href));
    });
  });

  if (!suggestion) return;

  const suggestedLocale = normalizeLanguage(suggestion.dataset.suggestedLocale);
  const storedPreference = readLanguagePreference();

  // The root URL is the neutral entry point. Redirecting here is only allowed
  // after the visitor has explicitly chosen English on an earlier visit.
  if (
    storedPreference === "en" &&
    currentLocale === "es" &&
    window.location.pathname === "/"
  ) {
    window.location.replace(getLanguageUrl(suggestion.dataset.targetHref));
    return;
  }

  if (storedPreference || !currentLocale || !suggestedLocale) return;

  const browserLanguage = getPreferredBrowserLanguage();
  if (browserLanguage !== suggestedLocale) return;

  const stayButton = suggestion.querySelector(
    "[data-language-suggestion-stay]",
  );

  stayButton?.addEventListener("click", () => {
    saveLanguagePreference(currentLocale);
    dismissSuggestion(suggestion);
  });

  revealSuggestion(suggestion);
}
