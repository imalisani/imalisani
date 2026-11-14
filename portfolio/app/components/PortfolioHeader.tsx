import Link from "next/link";
import type { ReactNode } from "react";
import PortfolioLogo from "./PortfolioLogo";
import type { usePortfolioPreferences } from "./usePortfolioPreferences";
import styles from "../home.module.css";

type Props = ReturnType<typeof usePortfolioPreferences> & { showBack?: boolean; navigation?: ReactNode };

export default function PortfolioHeader({ lang, theme, toggleLanguage, toggleTheme, showBack, navigation }: Props) {
  const spanish = lang === "es";
  const dark = theme === "dark";
  const themeLabel = spanish
    ? (dark ? "Activar modo claro" : "Activar modo oscuro")
    : (dark ? "Use light mode" : "Use dark mode");

  return (
    <header className={styles.header}>
      <PortfolioLogo lang={lang}/>
      {showBack && <Link href="/" className={styles.back}>{spanish ? "Volver al portfolio" : "Back to portfolio"}</Link>}
      {navigation}
      <div className={styles.preferences}>
        <button className={styles.theme} type="button" onClick={toggleTheme} aria-label={themeLabel}>
          <svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            {dark
              ? <><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19m0-14-1.5 1.5m-11 11L5 19"/></>
              : <path d="M21 13A9 9 0 0 1 11 3a9 9 0 1 0 10 10Z"/>}
          </svg>
        </button>
        <button
          className={styles.language}
          type="button"
          onClick={toggleLanguage}
          aria-label={spanish ? "View in English" : "Ver en español"}
        >
          <span className={spanish ? styles.active : undefined}>ES</span>
          <span aria-hidden="true">/</span>
          <span className={!spanish ? styles.active : undefined}>EN</span>
        </button>
      </div>
    </header>
  );
}
