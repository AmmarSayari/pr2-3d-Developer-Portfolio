/* eslint-disable react/prop-types, react-refresh/only-export-components */
import { createContext, useCallback, useContext, useLayoutEffect, useMemo, useState } from "react";
import { localeDirection, normalizeLocale, readSavedLocale, saveLocale, translateV1 } from "./localeUtilsV1";

const PortfolioLocaleContextV1 = createContext(null);

const getStorage = () => {
  try {
    return window.localStorage;
  } catch {
    return undefined;
  }
};

export const PortfolioLocaleProviderV1 = ({ children }) => {
  const [locale, updateLocale] = useState(() => readSavedLocale(getStorage()));
  const setLocale = useCallback((next) => updateLocale(normalizeLocale(next)), []);
  const toggleLocale = useCallback(() => updateLocale((current) => current === "en" ? "ar" : "en"), []);
  const t = useCallback((key, values) => translateV1(locale, key, values), [locale]);

  useLayoutEffect(() => {
    const html = document.documentElement;
    const previous = { lang: html.getAttribute("lang"), dir: html.getAttribute("dir"), title: document.title };
    html.lang = locale;
    html.dir = localeDirection(locale);
    document.title = translateV1(locale, "page.title");
    saveLocale(getStorage(), locale);
    return () => {
      for (const attribute of ["lang", "dir"]) {
        if (previous[attribute] === null) html.removeAttribute(attribute);
        else html.setAttribute(attribute, previous[attribute]);
      }
      document.title = previous.title;
    };
  }, [locale]);

  const value = useMemo(() => ({ locale, isArabic: locale === "ar", setLocale, toggleLocale, t }), [locale, setLocale, toggleLocale, t]);
  return <PortfolioLocaleContextV1.Provider value={value}>{children}</PortfolioLocaleContextV1.Provider>;
};

export const usePortfolioLocaleV1 = () => {
  const value = useContext(PortfolioLocaleContextV1);
  if (!value) throw new Error("Portfolio locale provider is missing.");
  return value;
};
