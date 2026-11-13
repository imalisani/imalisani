import Link from "next/link";
import styles from "./PortfolioLogo.module.css";

export default function PortfolioLogo({ lang }: { lang: "es" | "en" }) {
  return (
    <Link href="/" className={styles.logo} aria-label={lang === "es" ? "Ir al inicio" : "Go home"}>
      IM.
    </Link>
  );
}
