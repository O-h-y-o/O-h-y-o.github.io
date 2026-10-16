// Module-level (singleton) state shared by every CodeEditor instance on the
// page, so we observe <html data-theme> with a single MutationObserver
// instead of one per open editor tab.
const themeChangeListeners = new Set<() => void>();
let sharedThemeObserver: MutationObserver | null = null;

export const isDarkMode = () =>
  document.documentElement.getAttribute("data-theme") === "dark";

export function subscribeThemeChange(listener: () => void) {
  themeChangeListeners.add(listener);
  if (!sharedThemeObserver) {
    sharedThemeObserver = new MutationObserver(() => {
      themeChangeListeners.forEach((l) => l());
    });
    sharedThemeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
  }
  return () => themeChangeListeners.delete(listener);
}
