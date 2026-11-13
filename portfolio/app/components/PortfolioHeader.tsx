import Link from "next/link";
import PortfolioLogo from "./PortfolioLogo";
import type { usePortfolioPreferences } from "./usePortfolioPreferences";
import styles from "../home.module.css";

type Props = ReturnType<typeof usePortfolioPreferences> & { showBack?: boolean };

export default function PortfolioHeader({ lang, theme, toggleLanguage, toggleTheme, showBack }: Props) {
  const spanish = lang === "es";
  const dark = theme === "dark";
  const themeLabel = spanish
    ? (dark ? "Activar modo claro" : "Activar modo oscuro")
    : (dark ? "Use light mode" : "Use dark mode");

  return (
    <header className={styles.header}>
      <PortfolioLogo lang={lang}/>
      {showBack && <Link href="/" className={styles.back}>{spanish ? "Volver al portfolio" : "Back to portfolio"}</Link>}
      <div className={styles.preferences}>
        <button className={styles.theme} type="button" onClick={toggleTheme} aria-label={themeLabel}>
          <span aria-hidden="true">{dark ? "☀" : "☾"}</span>
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
