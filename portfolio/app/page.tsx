"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import avatar from "../public/home/irina.webp";
import PortfolioHeader from "./components/PortfolioHeader";
import PortfolioLogo from "./components/PortfolioLogo";
import { usePortfolioPreferences } from "./components/usePortfolioPreferences";
import { cvFiles } from "./cv-files";
import styles from "./home.module.css";

const copy = {
  es: {
    nav: "Navegación principal",
    links: ["Inicio", "Sobre mí", "Experiencia", "Casos", "Repositorios", "Contacto"],
    greeting: "Hola, soy",
    focus: "Automatización · Calidad · Producto · IA",
    intro: "Ayudo a equipos de producto a construir software confiable mediante testing estratégico, automatización y el uso de IA, desde los requisitos hasta el release.",
    success: "Ver mis casos de éxito",
    cv: "Descargar CV · PDF",
    cvLabel: "Descargar CV en español · PDF",
    principles: ["Enfoque en resultados", "Colaboración con Producto y Desarrollo", "Mentalidad shift-left", "IA como aliada"],
    motto: "La calidad no es suerte.",
    mottoLines: ["Se diseña.", "Se planifica.", "Se valida.", "Se protege."],
    metrics: "Resultados y compromiso",
    metricLabels: ["de planes de prueba listos antes del desarrollo", "de tareas con riesgos o defectos detectados antes de producción", "compromiso con la calidad"],
    technologies: "Tecnologías principales",
    groups: ["Web", "Mobile", "APIs y rendimiento", "Datos", "CI/CD", "Gestión"],
    more: "Ver más",
    explore: "Explora mi trabajo",
    exploreTitle: "Cuatro formas de conocer mi enfoque",
    exploreIntro: "Desde la estrategia hasta el código, estos recorridos muestran cómo convierto la calidad en impacto real.",
    paths: [
      ["Cómo trabajo con Producto y Desarrollo", "Del requerimiento al release: preguntas tempranas y decisiones de calidad."],
      ["Agentic QA Lab", "Una ejecución verificada de principio a fin, con IA y automatización."],
      ["Casos de prueba", "Escenarios Gherkin, técnicas de diseño y ejemplos reales."],
      ["Repositorios", "Código público con arquitectura, trazabilidad y evidencia de ejecución."],
    ],
    cases: "Casos destacados",
    logistics: "Logística inteligente de punta a punta",
    logisticsSummary: "Validación de entregas y comprobantes con foto y firma",
    logisticsDetails: "Validé el flujo de cierre de entregas en mobile, desde el registro de ítems hasta la captura de foto y firma en el comprobante. Contrasté lo registrado en la app con los datos de la entrega y sus integraciones.",
    checkout: "Del producto al checkout",
    checkoutLabel: "Ver evidencia de Del producto al checkout",
    contact: "Hablemos de calidad",
    automation: "Automatización",
  },
  en: {
    nav: "Main navigation",
    links: ["Home", "About me", "Experience", "Case studies", "Repositories", "Contact"],
    greeting: "Hi, I’m",
    focus: "Automation · Quality · Product · AI",
    intro: "I help product teams build reliable software through strategic testing, automation and AI, from requirements to release.",
    success: "Explore my case studies",
    cv: "Download CV · PDF",
    cvLabel: "Download CV in English · PDF",
    principles: ["Results-oriented", "Collaboration with Product and Engineering", "Shift-left mindset", "AI-assisted QA"],
    motto: "Quality isn’t luck.",
    mottoLines: ["Designed.", "Planned.", "Validated.", "Protected."],
    metrics: "Results and commitment",
    metricLabels: ["of test plans ready before development", "of tasks with risks or defects caught before production", "commitment to quality"],
    technologies: "Core technologies",
    groups: ["Web", "Mobile", "APIs and performance", "Data", "CI/CD", "Management"],
    more: "See more",
    explore: "Explore my work",
    exploreTitle: "Four ways to get to know my approach",
    exploreIntro: "From strategy to code, these examples show how I apply quality engineering in practice.",
    paths: [
      ["How I work with Product and Engineering", "From requirements to release: early questions and quality decisions."],
      ["Agentic QA Lab", "A verified end-to-end run with AI and automation."],
      ["Test cases", "Gherkin scenarios, test design techniques and real examples."],
      ["Repositories", "Public code with architecture, traceability and execution evidence."],
    ],
    cases: "Featured case studies",
    logistics: "End-to-end logistics",
    logisticsSummary: "Delivery validation and proof of delivery with photo and signature",
    logisticsDetails: "I validated the mobile delivery completion flow, from recording individual items to capturing a photo and signature for proof of delivery. I checked the data recorded in the app against the delivery data and its integrations.",
    checkout: "From product to checkout",
    checkoutLabel: "See evidence for From product to checkout",
    contact: "Let’s talk quality",
    automation: "Automation",
  },
} as const;

const destinations = ["/", "/sobre-mi", "/sobre-mi#scope-title", "#casos", "/repositorios", "/contacto"];
const role = "Sr QA Engineer";
const metricValues = ["90%", "≈25%", "100%"];

const techGroups = [
  [["playwright", "Playwright"], ["selenium", "Selenium"], ["cypress", "Cypress"], ["typescript", "TypeScript"], ["java", "Java"]],
  [["appium", "Appium"], ["python", "Python"], ["androidstudio", "Android Studio"], ["proxyman", "Proxyman"]],
  [["postman", "Postman"], ["swagger", "Swagger"], ["k6", "k6"]],
  [["sql", "SQL"], ["postgresql", "PostgreSQL"], ["oracle", "Oracle"], ["mongodb", "MongoDB"], ["redis", "Redis"]],
  [["githubactions", "GitHub Actions"], ["jenkins", "Jenkins"]],
  [["jira", "Jira"], ["notion", "Notion"], ["testrail", "TestRail"]],
] as const;

const teamworkIcon = <><circle cx="9" cy="6" r="3.5"/><path d="M2 21v-2a7 7 0 0 1 14 0v2H2m14-18a3.5 3.5 0 0 1 0 7m2 3a5 5 0 0 1 4 5v3"/></>;

const principleIcons = [
  <><circle cx="11" cy="13" r="8"/><circle cx="11" cy="13" r="4"/><path d="m11 13 8-8m-3 0 4-3v3h3l-3 4h-3"/></>,
  teamworkIcon,
  <><path d="M2 21h20M4 21v-5h4v5m2 0V12h4v9m2 0V9h4v12M5 11l5-5 3 1 6-5m-4 0h4v4"/></>,
  <path d="M12 6a3 3 0 0 0-5-2 4 4 0 0 0-3 4 4 4 0 0 0 0 7 4 4 0 0 0 3 4 3 3 0 0 0 5-2V6Zm0 0a3 3 0 0 1 5-2 4 4 0 0 1 3 4 4 4 0 0 1 0 7 4 4 0 0 1-3 4 3 3 0 0 1-5-2M7 9l2 2m6 2 2 2M7 15l2-2m6-4 2 2"/>,
];

const paths = [
  { href: "/como-trabajo", icon: teamworkIcon },
  { href: "/agentic-qa-lab", icon: <><path d="M9 3h6m-5 0v7l-6 9a1 1 0 0 0 1 2h14a1 1 0 0 0 1-2l-6-9V3M7 15h10"/><path d="M11 18h.01m3-1h.01"/></> },
  { href: "/casos-de-prueba", icon: <path d="M6 3h8l4 4v14H6zM14 3v5h4M9 12h6m-6 4h6"/> },
  { href: "/repositorios", icon: <path d="m8 6-6 6 6 6m8-12 6 6-6 6m-2-15-4 18"/> },
];

function Icon({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}

function Arrow() {
  return <Icon><path d="M3 12h17m-6-6 6 6-6 6"/></Icon>;
}

export default function Home() {
  const preferences = usePortfolioPreferences();
  const { lang, theme } = preferences;
  const c = copy[lang];

  return (
    <main className={styles.page} data-home-theme={theme} lang={lang}>
      <div className={styles.shell}>
        <PortfolioHeader {...preferences} navigation={
          <nav className={styles.navigation} aria-label={c.nav}>
            {destinations.map((href, index) => (
              <Link key={href} href={href} aria-current={index === 0 ? "page" : undefined}>{c.links[index]}</Link>
            ))}
          </nav>
        }/>

        <section className={styles.intro} aria-labelledby="home-title">
          <div className={styles.identity}>
            <p className={styles.eyebrow}>{c.greeting}</p>
            <h1 id="home-title">Irina Malisani</h1>
            <div className={styles.roleLine}><p className={styles.role}>{role}</p><p className={styles.focus}>{c.focus}</p></div>
            <p className={styles.lead}>{c.intro}</p>
            <div className={styles.actions}>
              <a className={styles.primary} href="#casos">{c.success}<Arrow/></a>
              <a className={styles.secondary} href={cvFiles[lang]} download aria-label={c.cvLabel}>
                {c.cv}<Icon><path d="M12 3v13m-5-5 5 5 5-5M4 21h16"/></Icon>
              </a>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <Image className={styles.avatar} src={avatar} alt="" sizes="(max-width: 680px) 90vw, (max-width: 1550px) 44vw, 675px" preload/>
            <blockquote className={styles.motto}>
              <p>{c.motto}</p>
              <span>{c.mottoLines.map(line => <span key={line}>{line}</span>)}</span>
            </blockquote>
          </div>

          <ul className={styles.principles}>
            {c.principles.map((label, index) => <li key={label}><Icon>{principleIcons[index]}</Icon><span>{label}</span></li>)}
          </ul>
        </section>

        <section className={styles.metrics} aria-label={c.metrics}>
          <ul>
            {metricValues.map((value, index) => <li key={value}><strong>{value}</strong><span>{c.metricLabels[index]}</span></li>)}
          </ul>
        </section>

        <section className={styles.technologies} aria-labelledby="technologies-title">
          <div className={styles.sectionHeading}>
            <h2 id="technologies-title">{c.technologies}</h2>
            <Link className={styles.more} href="/sobre-mi#capabilities">{c.more}<Arrow/></Link>
          </div>
          <div className={styles.techGrid}>
            {techGroups.map((tools, index) => (
              <div className={styles.techGroup} key={c.groups[index]}>
                <h3>{c.groups[index]}</h3>
                <ul>{tools.map(([id, name]) => (
                  <li key={id}>
                    <Image src={`/home/tech/${id}.${id === "proxyman" ? "webp" : "svg"}`} alt="" unoptimized width={23} height={23}/>
                    {name}
                  </li>
                ))}</ul>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.explore} aria-labelledby="explore-title">
          <div className={styles.exploreIntro}>
            <p className={styles.eyebrow}>{c.explore}</p>
            <h2 id="explore-title">{c.exploreTitle}</h2>
            <p>{c.exploreIntro}</p>
          </div>
          <div className={styles.cards}>
            {paths.map(({ href, icon }, index) => (
              <Link key={href} className={styles.card} href={href} aria-labelledby={`path-${index}`}>
                <Icon className={styles.cardIcon}>{icon}</Icon>
                <h3 id={`path-${index}`}>{c.paths[index][0]}</h3>
                <p>{c.paths[index][1]}</p>
                <span className={styles.roundArrow}><Arrow/></span>
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.cases} id="casos" aria-labelledby="cases-title">
          <div className={styles.sectionHeading}><h2 id="cases-title">{c.cases}</h2></div>
          <div className={styles.caseGrid}>
            <article className={styles.case}>
              <details>
                <summary className={styles.caseCover} aria-labelledby="logistics-title">
                  <Image src="/home/logistics.webp" alt="" fill sizes="(max-width: 680px) 94vw, (max-width: 1550px) 48vw, 710px"/>
                  <span className={styles.caseCopy}><strong id="logistics-title">{c.logistics}</strong><span>{c.logisticsSummary}</span></span>
                  <span className={styles.caseArrow}><Arrow/></span>
                </summary>
                <p className={styles.caseDetails}>{c.logisticsDetails}</p>
              </details>
            </article>
            <article className={styles.case}>
              <Link className={styles.caseCover} href="/agentic-qa-lab#video-evidence-title" aria-label={c.checkoutLabel}>
                <Image src="/home/checkout.webp" alt="" fill sizes="(max-width: 680px) 94vw, (max-width: 1550px) 48vw, 710px"/>
                <span className={styles.caseCopy}><strong>{c.checkout}</strong><span>Playwright · TypeScript</span></span>
                <span className={styles.caseArrow}><Arrow/></span>
              </Link>
            </article>
          </div>
        </section>

        <footer className={styles.footer}>
          <PortfolioLogo lang={lang}/>
          <p>{role}<span>{c.automation}</span><span>Shift-left</span><span>{lang === "es" ? "IA" : "AI"}</span></p>
          <Link href="/contacto">{c.contact}<Arrow/></Link>
        </footer>
      </div>
    </main>
  );
}
