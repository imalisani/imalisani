"use client";

import Link from "next/link";
import {useEffect,useState} from "react";
import styles from "./repositories.module.css";

type Lang="es"|"en";

const repositories=[
  {n:"01",name:"imalisani / profile",stack:"QUALITY ENGINEERING · AGENTIC QA",url:"https://github.com/imalisani/imalisani",en:"My technical profile: shift-left practice, QA agent design, measurable impact and the roadmap behind my quality engineering work.",es:"Mi perfil técnico: práctica shift-left, diseño de agentes QA, impacto medible y el roadmap detrás de mi trabajo en quality engineering."},
  {n:"02",name:"playwright-portfolio-typescript",stack:"PLAYWRIGHT · TYPESCRIPT · POM · CI",url:"https://github.com/imalisani/playwright-portfolio-typescript",en:"A cross-browser E2E suite for Sauce Demo with Gherkin test plans, Page Object Model, accessibility checks, traceability and execution evidence.",es:"Suite E2E cross-browser sobre Sauce Demo con planes en Gherkin, Page Object Model, controles de accesibilidad, trazabilidad y evidencias."},
  {n:"03",name:"selenium-portfolio-python",stack:"SELENIUM · PYTHON · PYTEST · AXE",url:"https://github.com/imalisani/selenium-portfolio-python",en:"The same product tested through a second driver to compare architecture, explicit waits and independently confirm accessibility findings.",es:"El mismo producto probado con un segundo driver para comparar arquitectura, esperas explícitas y confirmar hallazgos de accesibilidad."},
] as const;

const copy={
  es:{back:"Portfolio",index:"Cómo trabajo",aboutIndex:"Sobre mí",metricsNav:"Mis métricas",experienceNav:"Experiencia",cvNav:"Descargar CV",process:"Flujo de QA",tests:"Casos de prueba",reposNav:"Repositorios",contact:"Contacto",label:"Código y evidencia",title:<>Repositorios que respaldan <em>el criterio.</em></>,lead:"Cada proyecto público conecta una decisión de calidad con estrategia, arquitectura, automatización, trazabilidad y resultados observables.",collection:"Trabajo abierto",hint:"Tres formas de llevar el razonamiento a código.",repo:"Explorar repositorio",footerLabel:"El recorrido completo",footerTitle:"Del requerimiento a la evidencia pública.",workflow:"Ver cómo trabajo",talk:"Hablemos"},
  en:{back:"Portfolio",index:"How I work",aboutIndex:"About me",metricsNav:"My metrics",experienceNav:"Experience",cvNav:"Download CV",process:"QA workflow",tests:"Test cases",reposNav:"Repositories",contact:"Contact",label:"Code and evidence",title:<>Repositories that back <em>the judgement.</em></>,lead:"Each public project connects a quality decision with strategy, architecture, automation, traceability and observable results.",collection:"Open work",hint:"Three ways to turn reasoning into code.",repo:"Explore repository",footerLabel:"The complete journey",footerTitle:"From requirement to public evidence.",workflow:"See how I work",talk:"Let’s talk"},
};

export default function RepositoriesPage(){
  const [lang,setLang]=useState<Lang>("es");
  const [theme,setTheme]=useState<"light"|"dark">("light");
  useEffect(()=>{
    const saved=window.localStorage.getItem("portfolio-theme");
    const preferred=saved==="dark"||saved==="light"?saved:window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";
    const savedLanguage=window.localStorage.getItem("portfolio-language");
    const preferredLanguage=savedLanguage==="en"||savedLanguage==="es"?savedLanguage:"es";
    setTheme(preferred);
    setLang(preferredLanguage);
    document.documentElement.dataset.theme=preferred;
    document.documentElement.lang=preferredLanguage;
  },[]);
  const toggleTheme=()=>setTheme(current=>{
    const next=current==="light"?"dark":"light";
    document.documentElement.dataset.theme=next;
    window.localStorage.setItem("portfolio-theme",next);
    return next;
  });
  const toggleLanguage=()=>setLang(current=>{
    const next=current==="es"?"en":"es";
    window.localStorage.setItem("portfolio-language",next);
    document.documentElement.lang=next;
    return next;
  });
  const c=copy[lang];

  return <main className={styles.page} lang={lang}>
    <nav className={styles.nav} aria-label={lang==="es"?"Navegación de repositorios":"Repositories navigation"}>
      <Link className={styles.logo} href="/" aria-label={lang==="es"?"Ir al inicio":"Go home"}>IM<span>.</span></Link>
      <div className={styles.navLinks}><Link href="/">← {c.back}</Link><details className={styles.navGroup} name="main-navigation"><summary className={styles.navParent}>{c.index} <span aria-hidden="true">↓</span></summary><div className={styles.navDropdown} aria-label={lang==="es"?"Índice de subpáginas":"Subpage index"}><Link href="/como-trabajo">{c.process}</Link><Link href="/agentic-qa-lab">Agentic QA Lab</Link><Link href="/casos-de-prueba">{c.tests}</Link><Link href="/repositorios" aria-current="page">{c.reposNav}</Link></div></details><details className={styles.navGroup} name="main-navigation"><summary className={styles.navParent}>{c.aboutIndex} <span aria-hidden="true">↓</span></summary><div className={styles.navDropdown} aria-label={lang==="es"?"Índice sobre mí":"About index"}><Link href="/#work">{c.metricsNav}</Link><Link href="/#about">{lang==="es"?"Mi historia":"My story"}</Link><a href="/CV-Irina-Malisani-QA-Engineer.pdf" download>CV — {c.cvNav}</a><Link href="/#contact">{c.contact}</Link></div></details></div>
      <div className={styles.controls}>
        <button className={styles.theme} type="button" onClick={toggleTheme} aria-label={lang==="es"?(theme==="dark"?"Activar modo claro":"Activar modo oscuro"):(theme==="dark"?"Use light mode":"Use dark mode")}><span aria-hidden="true">{theme==="dark"?"☀":"☾"}</span></button>
        <button className={`${styles.language} ${lang==="es"?styles.spanish:""}`} type="button" onClick={toggleLanguage} aria-pressed={lang==="es"} aria-label={lang==="es"?"View in English":"Ver en español"}><span className={lang==="en"?styles.active:""}>EN</span><i/><span className={lang==="es"?styles.active:""}>ES</span></button>
      </div>
    </nav>

    <header className={styles.hero}>
      <p className={styles.eyebrow}>{c.label}</p>
      <h1>{c.title}</h1>
      <p className={styles.lead}>{c.lead}</p>
    </header>

    <section className={styles.collection} aria-labelledby="repositories-title">
      <header><p className={styles.eyebrow} id="repositories-title">01 — {c.collection}</p><p>{c.hint}</p></header>
      <div className={styles.repoGrid}>{repositories.map(repository=><a className={styles.repoCard} href={repository.url} target="_blank" rel="noreferrer" key={repository.name}>
        <div><span>{repository.n}</span><span aria-hidden="true">↗</span></div>
        <small>{repository.stack}</small>
        <h2>{repository.name}</h2>
        <p>{repository[lang]}</p>
        <b>{c.repo} ↗</b>
      </a>)}</div>
    </section>

    <footer className={styles.footer}><p className={styles.eyebrow}>{c.footerLabel}</p><h2>{c.footerTitle}</h2><div><Link href="/como-trabajo">{c.workflow} ↗</Link><Link href="/#contact">{c.talk} ↗</Link></div></footer>
  </main>;
}
