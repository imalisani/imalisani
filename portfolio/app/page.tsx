"use client";

import Image from "next/image";
import Link from "next/link";
import PortfolioHeader from "./components/PortfolioHeader";
import { usePortfolioPreferences } from "./components/usePortfolioPreferences";
import { cvFiles } from "./cv-files";
import styles from "./home.module.css";

const copy = {
  es: {
    role: "QA Engineer · Automatización web y mobile",
    title: "Descubre cómo trabajo",
    automation: "Qué automatizo y con qué herramientas",
    automationLabel: "Automatización",
    automationDetail: "Playwright, Selenium y Appium",
    teamwork: "Cómo trabajo con Producto y Desarrollo",
    teamworkLabel: "Colaboración",
    teamworkDetail: "De los requisitos a la validación",
    ai: "Cómo uso IA en mi trabajo de QA",
    aiLabel: "Agentic QA Lab",
    aiDetail: "Del análisis de riesgos a la evidencia",
    about: "Mi recorrido profesional",
    cv: "Descargar CV en español · PDF",
    contact: "Contactarme",
  },
  en: {
    role: "QA Engineer · Web and mobile automation",
    title: "See how I work",
    automation: "What I automate and the tools I use",
    automationLabel: "Automation",
    automationDetail: "Playwright, Selenium, and Appium",
    teamwork: "How I work with Product and Engineering",
    teamworkLabel: "Collaboration",
    teamworkDetail: "From requirements to validation",
    ai: "How I use AI in my QA work",
    aiLabel: "Agentic QA Lab",
    aiDetail: "From risk analysis to evidence",
    about: "My professional journey",
    cv: "Download CV in English · PDF",
    contact: "Contact me",
  },
} as const;

const paths = [
  { key: "teamwork", href: "/como-trabajo", icon: <><circle cx="12" cy="7" r="3.5"/><path d="M6 21v-2a6 6 0 0 1 12 0v2M5 8a2.5 2.5 0 1 0 0 5m14-5a2.5 2.5 0 1 1 0 5M2 19a4 4 0 0 1 2-3.5M22 19a4 4 0 0 0-2-3.5"/></> },
  { key: "automation", href: "/repositorios#automatizacion", icon: <path d="m8 6-6 6 6 6m8-12 6 6-6 6m-2-15-4 18"/> },
  { key: "ai", href: "/agentic-qa-lab", icon: <><circle cx="5" cy="12" r="3"/><circle cx="19" cy="5" r="3"/><circle cx="19" cy="19" r="3"/><path d="m8 10.5 8.3-4m-8.3 7 8.3 4"/></> },
] as const;

function Arrow({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 12h17m-6-6 6 6-6 6"/>
    </svg>
  );
}

export default function Home() {
  const preferences = usePortfolioPreferences();
  const { lang, theme } = preferences;
  const c = copy[lang];

  return (
    <main className={styles.page} data-home-theme={theme} lang={lang}>
      <div className={styles.shell}>
        <PortfolioHeader {...preferences}/>
        <section className={styles.intro} aria-labelledby="home-title">
          <div className={styles.identity}>
            <h1 id="home-title">Irina Malisani</h1>
            <p>{c.role}</p>
          </div>
          <div className={styles.orbital} aria-hidden="true">
            <Image className={styles.planet} src="/qa-planet.png" alt="" width={1254} height={1254} sizes="(max-width: 620px) 130px, 250px" priority/>
            <span className={styles.ring}/>
            <span className={styles.moon}/>
          </div>
        </section>

        <section className={styles.explore} aria-labelledby="explore-title">
          <h2 id="explore-title">{c.title}</h2>
          <div className={styles.cards}>
            {paths.map(({ key, href, icon }) => (
              <Link key={key} className={styles.card} data-path={key} href={href} aria-labelledby={`path-${key}`} aria-describedby={`detail-${key}`}>
                <svg viewBox="0 0 24 24" className={styles.cardIcon} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{icon}</svg>
                <span className={styles.cardCopy}>
                  <span className={styles.cardLabel} aria-hidden="true">{c[`${key}Label`]}</span>
                  <span className={styles.cardTitle} id={`path-${key}`}>{c[key]}</span>
                  <span className={styles.cardDetail} id={`detail-${key}`}>{c[`${key}Detail`]}</span>
                </span>
                <Arrow className={styles.cardArrow}/>
              </Link>
            ))}
          </div>
          <div className={styles.actions}>
            <Link className={styles.about} href="/sobre-mi"><span className={styles.aboutLabel}>{c.about}</span><Arrow className={styles.arrow}/></Link>
            <a className={styles.cv} href={cvFiles[lang]} download><span aria-hidden="true">↓</span> {c.cv}</a>
            <Link className={styles.contact} href="/contacto">{c.contact}</Link>
          </div>
        </section>
      </div>
    </main>
  );
}
