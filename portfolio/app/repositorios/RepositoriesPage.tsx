"use client";

import Link from "next/link";
import {useEffect,useState} from "react";
import {cvFiles} from "../cv-files";
import AutomationSuites from "./AutomationSuites";
import styles from "./repositories.module.css";

type Lang="es"|"en";

const copy={
  es:{back:"Portfolio",index:"Cómo trabajo",aboutIndex:"Sobre mí",metricsNav:"Mis métricas",experienceNav:"Experiencia",cvNav:"Descargar CV",process:"Flujo de QA",tests:"Casos de prueba",reposNav:"Repositorios",contact:"Contacto",label:"Código y evidencia",title:<>Repositorios que respaldan <em>el criterio.</em></>,lead:"Cada proyecto público conecta una decisión de calidad con estrategia, arquitectura, automatización, trazabilidad y resultados observables.",footerLabel:"El recorrido completo",footerTitle:"Del requerimiento a la evidencia pública.",workflow:"Ver cómo trabajo",talk:"Hablemos"},
  en:{back:"Portfolio",index:"How I work",aboutIndex:"About me",metricsNav:"My metrics",experienceNav:"Experience",cvNav:"Download CV",process:"QA workflow",tests:"Test cases",reposNav:"Repositories",contact:"Contact",label:"Code and evidence",title:<>Repositories that back <em>the judgement.</em></>,lead:"Each public project connects a quality decision with strategy, architecture, automation, traceability and observable results.",footerLabel:"The complete journey",footerTitle:"From requirement to public evidence.",workflow:"See how I work",talk:"Let’s talk"},
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
      <div className={styles.navLinks}><Link href="/">← {c.back}</Link><details className={styles.navGroup} name="main-navigation"><summary className={styles.navParent}>{c.index} <span aria-hidden="true">↓</span></summary><div className={styles.navDropdown} aria-label={lang==="es"?"Índice de subpáginas":"Subpage index"}><Link href="/como-trabajo">{c.process}</Link><Link href="/agentic-qa-lab">Agentic QA Lab</Link><Link href="/casos-de-prueba">{c.tests}</Link><Link href="/repositorios" aria-current="page">{c.reposNav}</Link></div></details><details className={styles.navGroup} name="main-navigation"><summary className={styles.navParent}>{c.aboutIndex} <span aria-hidden="true">↓</span></summary><div className={styles.navDropdown} aria-label={lang==="es"?"Índice sobre mí":"About index"}><Link href="/#work">{c.metricsNav}</Link><Link href="/#about">{lang==="es"?"Mi historia":"My story"}</Link><a href={cvFiles[lang]} download>CV — {c.cvNav}</a><Link href="/#contact">{c.contact}</Link></div></details></div>
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

    <AutomationSuites lang={lang}/>

    <footer className={styles.footer}><p className={styles.eyebrow}>{c.footerLabel}</p><h2>{c.footerTitle}</h2><div><Link href="/como-trabajo">{c.workflow} ↗</Link><Link href="/#contact">{c.talk} ↗</Link></div></footer>
  </main>;
}
