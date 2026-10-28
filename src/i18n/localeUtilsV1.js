import { stringsV1 } from "./stringsV1.js";

export const LOCALE_STORAGE_KEY = "amar9dev.portfolio.language.v1";
export const normalizeLocale = (locale) => (locale === "ar" ? "ar" : "en");
export const localeDirection = (locale) => (locale === "ar" ? "rtl" : "ltr");

export const readSavedLocale = (storage) => {
  try {
    return normalizeLocale(storage?.getItem(LOCALE_STORAGE_KEY));
  } catch {
    return "en";
  }
};

export const saveLocale = (storage, locale) => {
  try {
    storage?.setItem(LOCALE_STORAGE_KEY, normalizeLocale(locale));
  } catch {
    // Storage can be unavailable; switching still works for this visit.
  }
};

export const translateV1 = (locale, key, values = {}) => {
  const template = stringsV1[normalizeLocale(locale)][key] ?? stringsV1.en[key] ?? key;
  return template.replace(/\{(\w+)\}/g, (match, name) =>
    Object.prototype.hasOwnProperty.call(values, name) ? String(values[name]) : match,
  );
};

// Text-only overlays never replace source links, asset files, or technology data.
export const localizeProjectRecord = (project, copy = {}, key) => ({
  ...project,
  localizationKey: key,
  name: copy.name ?? project.name,
  description: copy.description ?? project.description,
  achievements: copy.achievements ?? project.achievements,
  achievement_label: copy.achievement_label ?? project.achievement_label,
  apps: project.apps.map((app, index) => {
    const text = copy.apps?.[index] ?? {};
    return {
      ...app,
      name: text.name ?? app.name,
      status_label: text.status_label ?? app.status_label,
      summary: text.summary ?? app.summary,
      images: app.images?.map((image, imageIndex) => ({
        ...image,
        alt: text.images?.[imageIndex]?.alt ?? image.alt,
        caption: text.images?.[imageIndex]?.caption ?? image.caption,
      })),
    };
  }),
});
