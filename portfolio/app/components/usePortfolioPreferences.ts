"use client";

import { useEffect, useState } from "react";

type Language = "es" | "en";
type Theme = "light" | "dark";

export function usePortfolioPreferences() {
  const [lang, setLang] = useState<Language>("es");
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("portfolio-language");
    const savedTheme = window.localStorage.getItem("portfolio-theme");
    const preferredLanguage = savedLanguage === "en" ? "en" : "es";
    const preferredTheme = savedTheme === "light" ? "light" : "dark";

    setLang(preferredLanguage);
    setTheme(preferredTheme);
    document.documentElement.lang = preferredLanguage;
    document.documentElement.dataset.theme = preferredTheme;
  }, []);

  function toggleLanguage() {
    const next = lang === "es" ? "en" : "es";
    window.localStorage.setItem("portfolio-language", next);
    document.documentElement.lang = next;
    setLang(next);
  }

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    window.localStorage.setItem("portfolio-theme", next);
    document.documentElement.dataset.theme = next;
    setTheme(next);
  }

  return { lang, theme, toggleLanguage, toggleTheme };
}
