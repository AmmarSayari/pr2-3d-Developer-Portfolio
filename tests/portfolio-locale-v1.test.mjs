import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { stringsV1 } from "../src/i18n/stringsV1.js";
import { experienceStoriesArabicV1, projectsArabicV1 } from "../src/i18n/contentArabicV1.js";
import {
  LOCALE_STORAGE_KEY, localizeProjectRecord, localeDirection, normalizeLocale,
  readSavedLocale, saveLocale, translateV1,
} from "../src/i18n/localeUtilsV1.js";

test("English and Arabic have complete, nonempty UI dictionaries", () => {
  assert.deepEqual(Object.keys(stringsV1.ar).sort(), Object.keys(stringsV1.en).sort());
  for (const locale of ["en", "ar"]) {
    for (const [key, value] of Object.entries(stringsV1[locale])) {
      assert.equal(typeof value, "string", `${locale}:${key}`);
      assert.ok(value.trim(), `${locale}:${key}`);
      const placeholders = (value.match(/\{\w+\}/g) || []).sort();
      assert.deepEqual(placeholders, (stringsV1.en[key].match(/\{\w+\}/g) || []).sort(), key);
    }
  }
  assert.equal(translateV1("ar", "name.full"), "عمار الصيعري");
});

test("Only supported locales are accepted; English remains the default", () => {
  for (const input of [undefined, null, "", "fr", "ar-SA", "AR"]) {
    assert.equal(normalizeLocale(input), "en");
    assert.equal(localeDirection(input), "ltr");
  }
  assert.equal(normalizeLocale("ar"), "ar");
  assert.equal(localeDirection("ar"), "rtl");
});

test("Interpolation, fallback and missing values are predictable", () => {
  assert.equal(translateV1("ar", "nav.traveling", { destination: "المشاريع" }), "الانتقال إلى المشاريع");
  assert.equal(translateV1("en", "projects.next", { app: "Demo" }), "Show next Demo screenshot");
  assert.equal(translateV1("unknown", "nav.home"), "Home");
  assert.equal(translateV1("ar", "unknown.key"), "unknown.key");
  assert.equal(translateV1("en", "nav.traveling"), "Traveling to {destination}");
});

test("Saved preferences round-trip without requiring browser storage", () => {
  const values = new Map();
  const storage = { getItem: (key) => values.get(key), setItem: (key, value) => values.set(key, value) };
  assert.equal(readSavedLocale(storage), "en");
  saveLocale(storage, "ar");
  assert.equal(values.get(LOCALE_STORAGE_KEY), "ar");
  assert.equal(readSavedLocale(storage), "ar");
  saveLocale(storage, "unsupported");
  assert.equal(readSavedLocale(storage), "en");
});

test("Disabled/private storage never breaks switching", () => {
  const blocked = { getItem() { throw new Error("blocked"); }, setItem() { throw new Error("blocked"); } };
  assert.equal(readSavedLocale(blocked), "en");
  assert.equal(readSavedLocale(undefined), "en");
  assert.doesNotThrow(() => saveLocale(blocked, "ar"));
  assert.doesNotThrow(() => saveLocale(undefined, "ar"));
});

test("Text overlays retain media, links, technologies and stable identity without mutation", () => {
  const source = {
    name: "Project", description: "Description", achievements: "Built", achievement_label: "Achievement", layout: "special",
    apps: [{ name: "App", status_label: "Preview", summary: "Summary", technologies: [{ techName: "React" }],
      source_code_link: "https://example.com/source", live_preview_link: "https://example.com/live",
      images: [{ image: "/asset.jpg", alt: "Original", caption: "Caption" }] }],
  };
  const snapshot = structuredClone(source);
  const result = localizeProjectRecord(source, {
    name: "المشروع", description: "وصف", apps: [{ name: "التطبيق", images: [{ alt: "الصورة" }] }],
  }, "stable-project-id");
  assert.deepEqual(source, snapshot);
  assert.equal(result.localizationKey, "stable-project-id");
  assert.equal(result.name, "المشروع");
  assert.equal(result.layout, source.layout);
  assert.equal(result.apps[0].images[0].image, source.apps[0].images[0].image);
  assert.equal(result.apps[0].images[0].alt, "الصورة");
  assert.equal(result.apps[0].images[0].caption, "Caption");
  for (const key of ["technologies", "source_code_link", "live_preview_link", "status_label", "summary"]) {
    assert.deepEqual(result.apps[0][key], source.apps[0][key]);
  }
  const english = localizeProjectRecord(source, undefined, "stable-project-id");
  const { localizationKey, ...englishRecord } = english;
  assert.equal(localizationKey, result.localizationKey);
  assert.deepEqual(englishRecord, source);
});

test("All six projects and three experience stories have text-only Arabic overlays", () => {
  assert.deepEqual(Object.keys(projectsArabicV1), ["malafa", "sawlah", "ballot", "legacy", "ecommerce", "spare"]);
  assert.deepEqual(Object.keys(experienceStoriesArabicV1), ["expo", "stack-junior", "website"]);
  const expectedImageCounts = { malafa: [6, 5], sawlah: [3, 4, 4, 4], ballot: [2, 1], legacy: [4], ecommerce: [1, 1], spare: [1, 1, 1] };
  for (const [key, project] of Object.entries(projectsArabicV1)) {
    assert.ok(project.description && project.achievements && project.name);
    assert.deepEqual(project.apps.map((app) => app.images.length), expectedImageCounts[key]);
  }
  const checkTextOnly = (record) => {
    for (const [key, value] of Object.entries(record)) {
      assert.ok(!["src", "image", "poster", "url", "technologies", "source_code_link", "live_preview_link", "webside_link"].includes(key), key);
      if (typeof value === "object" && value !== null) checkTextOnly(value);
      else assert.equal(typeof value, "string");
    }
  };
  checkTextOnly(projectsArabicV1);
  checkTextOnly(experienceStoriesArabicV1);
});

test("Localized contact preserves the existing EmailJS integration contract", async () => {
  const original = await readFile(new URL("../src/components/contact-v2/ContactSignalConsoleV2.jsx", import.meta.url), "utf8");
  const localized = await readFile(new URL("../src/components/contact-v2/ContactSignalConsoleLocalizedV1.jsx", import.meta.url), "utf8");
  const sendCall = (text) => text.slice(text.indexOf("await emailjs.send("), text.indexOf("setForm(INITIAL_FORM)"));
  assert.equal(sendCall(localized).replace(/\s/g, ""), sendCall(original).replace(/\s/g, ""));
  for (const env of ["VITE_APP_KEY_SERVICE", "VITE_APP_KEY_TEMPLATE", "VITE_APP_KEY_PUBLIC"]) assert.ok(localized.includes(env));
});
