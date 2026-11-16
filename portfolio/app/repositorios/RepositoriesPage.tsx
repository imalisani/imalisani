"use client";

import Link from "next/link";
import { usePortfolioPreferences } from "../components/usePortfolioPreferences";
import AutomationSuites from "./AutomationSuites";
import styles from "./repositories.module.css";


const copy={
  es:{label:"Código y evidencia",title:<>Repositorios que respaldan <em>el criterio.</em></>,lead:"Cada proyecto público conecta una decisión de calidad con estrategia, arquitectura, automatización, trazabilidad y resultados observables.",footerLabel:"El recorrido completo",footerTitle:"Del requerimiento a la evidencia pública.",workflow:"Ver cómo trabajo",talk:"Hablemos"},
  en:{label:"Code and evidence",title:<>Repositories that back <em>the judgement.</em></>,lead:"Each public project connects a quality decision with strategy, architecture, automation, traceability and observable results.",footerLabel:"The complete journey",footerTitle:"From requirement to public evidence.",workflow:"See how I work",talk:"Let’s talk"},
};

export default function RepositoriesPage(){
  const { lang } = usePortfolioPreferences();
  const c=copy[lang];

  return <main className={styles.page} lang={lang}>

    <header className={styles.hero}>
      <p className={styles.eyebrow}>{c.label}</p>
      <h1>{c.title}</h1>
      <p className={styles.lead}>{c.lead}</p>
    </header>

    <AutomationSuites lang={lang}/>

    <footer className={styles.footer}><p className={styles.eyebrow}>{c.footerLabel}</p><h2>{c.footerTitle}</h2><div><Link href="/como-trabajo">{c.workflow} ↗</Link><Link href="/contacto">{c.talk} ↗</Link></div></footer>
  </main>;
}
