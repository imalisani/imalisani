import styles from "./PortfolioLogo.module.css";

export default function PortfolioLogo({ lang, onClick }: { lang: "es" | "en"; onClick?: () => void }) {
  return (
    <a href="/" onClick={onClick} className={styles.logo} aria-label={lang === "es" ? "Ir al inicio" : "Go home"}>
      IM.
    </a>
  );
}
