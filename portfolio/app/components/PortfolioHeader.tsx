"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import PortfolioLogo from "./PortfolioLogo";
import { usePortfolioPreferences } from "./usePortfolioPreferences";
import styles from "./PortfolioHeader.module.css";

const primaryLinks = [
  { href: "/", es: "Inicio", en: "Home" },
  { href: "/sobre-mi", es: "Sobre mí", en: "About me" },
  { href: "/sobre-mi#simpliroute", es: "Experiencia", en: "Experience" },
] as const;

const workLinks = [
  { href: "/como-trabajo", es: "Flujo de QA", en: "QA workflow" },
  { href: "/agentic-qa-lab", es: "Agentic QA Lab", en: "Agentic QA Lab" },
  { href: "/casos-de-prueba", es: "Casos de prueba", en: "Test cases" },
] as const;

const secondaryLinks = [
  { href: "/repositorios", es: "Repositorios", en: "Repositories" },
  { href: "/contacto", es: "Contacto", en: "Contact" },
] as const;

type NavigationLink = { href: string; es: string; en: string };

export default function PortfolioHeader() {
  const { lang, theme, toggleLanguage, toggleTheme } = usePortfolioPreferences();
  const pathname = usePathname();
  const [fragment, setFragment] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [workOpen, setWorkOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const workButton = useRef<HTMLButtonElement>(null);
  const spanish = lang === "es";
  const dark = theme === "dark";
  const currentSection = primaryLinks.find(({ href }) => href === pathname + fragment);
  const activeHref = currentSection?.href ?? pathname;
  const workActive = workLinks.some(({ href }) => href === activeHref);
  const themeLabel = spanish
    ? (dark ? "Activar modo claro" : "Activar modo oscuro")
    : (dark ? "Use light mode" : "Use dark mode");

  useEffect(() => {
    function syncFragment() {
      setFragment(window.location.hash);
      setMenuOpen(false);
      setWorkOpen(false);
    }

    syncFragment();
    window.addEventListener("hashchange", syncFragment);
    window.addEventListener("pageshow", syncFragment);
    return () => {
      window.removeEventListener("hashchange", syncFragment);
      window.removeEventListener("pageshow", syncFragment);
    };
  }, [pathname]);

  function closeMenu() {
    if (menuOpen) {
      menuButton.current?.focus({ preventScroll: true });
    } else if (workOpen) {
      workButton.current?.focus({ preventScroll: true });
    }
    setMenuOpen(false);
    setWorkOpen(false);
  }

  function renderLink({ href, es, en }: NavigationLink) {
    const label = spanish ? es : en;
    const isFragment = href.includes("#");
    const current = href === activeHref ? (isFragment ? "location" : "page") : undefined;
    if (href === "/" || href === "/sobre-mi" || isFragment) {
      return <a key={href} href={href} aria-current={current} onClick={closeMenu}>{label}</a>;
    }
    return <Link key={href} href={href} aria-current={current} onNavigate={() => {
      setFragment("");
      closeMenu();
    }}>{label}</Link>;
  }

  const themeButton = (
    <button className={styles.theme} type="button" onClick={toggleTheme} aria-label={themeLabel}>
      <svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {dark
          ? <><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19m0-14-1.5 1.5m-11 11L5 19"/></>
          : <path d="M21 13A9 9 0 0 1 11 3a9 9 0 1 0 10 10Z"/>}
      </svg>
    </button>
  );

  const languageButton = (
    <button className={styles.language} type="button" onClick={toggleLanguage} aria-label={spanish ? "View in English" : "Ver en español"}>
      <span className={spanish ? styles.active : undefined}>ES</span>
      <span aria-hidden="true">/</span>
      <span className={!spanish ? styles.active : undefined}>EN</span>
    </button>
  );

  return (
    <header
      className={styles.header}
      data-header-theme={theme}
      onBlur={event => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setMenuOpen(false);
          setWorkOpen(false);
        }
      }}
      onKeyDown={event => {
        if (event.key !== "Escape") return;
        if (workOpen) {
          setWorkOpen(false);
          workButton.current?.focus({ preventScroll: true });
        } else if (menuOpen) {
          closeMenu();
        }
      }}
    >
      <div className={styles.bar}>
        <PortfolioLogo lang={lang} onClick={closeMenu}/>
        <div className={`${styles.controls} ${styles.mobileControls}`}>
          {languageButton}
          {themeButton}
        </div>
        <button
          ref={menuButton}
          className={styles.menuButton}
          type="button"
          aria-controls="portfolio-navigation"
          aria-expanded={menuOpen}
          onClick={() => menuOpen ? closeMenu() : setMenuOpen(true)}
        >
          <svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
            <path d={menuOpen ? "m6 6 12 12M18 6 6 18" : "M4 6h16M4 12h16M4 18h16"}/>
          </svg>
          <span>{spanish ? "Menú" : "Menu"}</span>
        </button>
        <nav id="portfolio-navigation" className={styles.navigation} data-open={menuOpen} aria-label={spanish ? "Navegación principal" : "Main navigation"}>
          {primaryLinks.map(renderLink)}
          <div className={styles.workGroup} onBlur={event => {
            if (!event.currentTarget.contains(event.relatedTarget)) setWorkOpen(false);
          }}>
            <button
              ref={workButton}
              className={styles.workButton}
              type="button"
              aria-expanded={workOpen}
              aria-controls="portfolio-work-navigation"
              data-active={workActive}
              onClick={() => setWorkOpen(open => !open)}
            >
              {spanish ? "Cómo trabajo" : "How I work"}
              <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m4 6 4 4 4-4"/>
              </svg>
            </button>
            <div id="portfolio-work-navigation" className={styles.workLinks} hidden={!workOpen}>
              {workLinks.map(renderLink)}
            </div>
          </div>
          {secondaryLinks.map(renderLink)}
        </nav>
        <div className={`${styles.controls} ${styles.desktopControls}`}>
          {themeButton}
          {languageButton}
        </div>
      </div>
    </header>
  );
}
