"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Language = "es" | "en";
type Theme = "light" | "dark";

type Preferences = {
  lang: Language;
  theme: Theme;
  toggleLanguage: () => void;
  toggleTheme: () => void;
};

const PortfolioPreferences = createContext<Preferences | null>(null);

export function PortfolioPreferencesProvider({ children }: { children: ReactNode }) {
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

  return (
    <PortfolioPreferences.Provider value={{ lang, theme, toggleLanguage, toggleTheme }}>
      {children}
    </PortfolioPreferences.Provider>
  );
}

export function usePortfolioPreferences() {
  const preferences = useContext(PortfolioPreferences);
  if (!preferences) throw new Error("Portfolio preferences are unavailable.");
  return preferences;
}
