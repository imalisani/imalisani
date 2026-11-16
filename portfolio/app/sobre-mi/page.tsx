"use client";

import Link from "next/link";
import { usePortfolioPreferences } from "../components/usePortfolioPreferences";
import type { CSSProperties } from "react";
import {cvFiles} from "../cv-files";
import SkillsMap from "../components/SkillsMap";
import LogisticsExperience from "./LogisticsExperience";
import styles from "./about-narrative.module.css";


const copy={
  es:{
    heroMotto:<>La calidad no es <em>suerte.</em><br/>Se diseña, se planifica, se valida y se protege <strong>de principio a fin.</strong></>,
    heroCopy:"Conecto criterio humano, estrategia de pruebas y automatización para que los riesgos aparezcan antes que los problemas.",
    evidenceLabel:"03 — Evidencia rápida",evidenceTitle:"Impacto que se entiende en segundos.",evidenceIntro:"Tres señales de una práctica orientada a prevenir, validar y decidir.",
    evidence:[
      {value:"90%",progress:90,label:"planes de prueba listos antes del desarrollo"},
      {value:"3–6",progress:null,label:"funcionalidades validadas por semana"},
      {value:"≈25%",progress:25,label:"de los bugs identificados antes de producción"},
    ],
    label:"Sobre mí · Recorrido completo",
    title:<>Aprendí a encontrar bugs.<br/><em>Elegí prevenirlos.</em></>,
    lead:"Soy Irina, QA Engineer con cinco años de experiencia ayudando a equipos de producto a convertir incertidumbre en decisiones de calidad.",
    storyHeading:"Mi recorrido en QA",
    storyTitles:["Preguntar antes de probar", "Anticipar riesgos", "Automatizar con criterio"],
    story:[
      "Trabajando con web, mobile, APIs, integraciones y algoritmos logísticos, entendí que probar no era solamente confirmar una respuesta: era hacer mejores preguntas, descubrir supuestos y acercar al equipo a la intención real del producto.",
      "Mi mejor trabajo comienza temprano. Leo requerimientos, planteo escenarios que todavía no están visibles, alineo riesgos con Producto y Desarrollo, y preparo la cobertura antes de que la implementación convierta una duda pequeña en un problema costoso.",
      "Ese recorrido me llevó del testing reactivo al shift-left, la automatización y los agentes de IA. La tecnología acelera el análisis; el criterio humano conserva la responsabilidad.",
    ],
    visionLabel:"Próximo horizonte",visionTitle:"La práctica de calidad que quiero ayudar a construir.",visionLead:"QA como un sistema de inteligencia para el producto, no como una etapa final de validación.",
    vision:[
      {title:"Agentes con límites",copy:"IA con contexto y trazabilidad, sin ocultar cómo llegó a una conclusión."},
      {title:"Evidencia continua",copy:"Señales conectadas al cambio, al riesgo y al impacto real."},
      {title:"Confianza para innovar",copy:"Equipos que experimentan más rápido porque la calidad también se diseña."},
    ],
    close:"¿Querés ver este enfoque en acción?",workflow:"Explorar cómo trabajo",cv:"Descargar CV",
  },
  en:{
    heroMotto:<>Quality isn&apos;t <em>luck.</em><br/>It&apos;s designed, planned, validated and protected <strong>from start to finish.</strong></>,
    heroCopy:"I connect human judgement, test strategy and automation so risks become visible before they become problems.",
    evidenceLabel:"03 — Quick evidence",evidenceTitle:"Impact understood in seconds.",evidenceIntro:"Three signals from a practice focused on preventing, validating and deciding.",
    evidence:[
      {value:"90%",progress:90,label:"test plans ready before development"},
      {value:"3–6",progress:null,label:"features validated each week"},
      {value:"≈25%",progress:25,label:"of bugs identified before production"},
    ],
    label:"About me · Complete journey",
    title:<>I learned to find bugs.<br/><em>I chose to prevent them.</em></>,
    lead:"I am Irina, a QA Engineer with five years of experience helping product teams turn uncertainty into quality decisions.",
    storyHeading:"My journey in QA",
    storyTitles:["Ask better questions", "Anticipate risks", "Automate with judgement"],
    story:[
      "Working across web, mobile, APIs, integrations and logistics algorithms, I learned that testing was not only about confirming an answer. It was about asking better questions, uncovering assumptions and bringing the team closer to the product's real intent.",
      "My strongest work starts early. I read requirements, surface scenarios that are not visible yet, align risks with Product and Development, and prepare coverage before implementation turns a small doubt into an expensive problem.",
      "That journey took me from reactive testing to shift-left, automation and AI agents. Technology accelerates the analysis; human judgement retains responsibility.",
    ],
    visionLabel:"Next horizon",visionTitle:"The quality practice I want to help build.",visionLead:"QA as a product intelligence system, not a final validation stage.",
    vision:[
      {title:"Agents with boundaries",copy:"AI with context and traceability, without hiding how it reached a conclusion."},
      {title:"Continuous evidence",copy:"Signals connected to the change, its risk and real impact."},
      {title:"Confidence to innovate",copy:"Teams that experiment faster because quality is designed too."},
    ],
    close:"Want to see this approach in action?",workflow:"Explore how I work",cv:"Download CV",
  },
} as const;

const storyIcons = [
  "M20 10.5a7.5 7.5 0 0 1-7.5 7.5H8l-4 3v-5.5A7.5 7.5 0 1 1 20 10.5Z M10 8.5a2.5 2.5 0 1 1 4 2l-1.5 1.2v.8 M12.5 15h.01",
  "M12 3 4 6v5c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6l-8-3Z M8.5 12l2.5 2.5 4.5-4.5",
  "m8 7-5 5 5 5m8-10 5 5-5 5m-2-13-4 16",
];

export default function AboutPage(){
  const { lang } = usePortfolioPreferences();
  const c=copy[lang];
  return <main lang={lang} className="aboutPage">

    <article className="aboutHero" id="about">
      <p className="label">{c.label}</p><h1>{c.title}</h1><p className="aboutLead">{c.lead}</p>
    </article>
    <section className={styles.narrative} id="recorrido" aria-labelledby="qa-journey-title">
      <div className={styles.inner}>
        <h2 id="qa-journey-title">{c.storyHeading}</h2>
        <div className={styles.cards}>
          {c.story.map((paragraph, index) => (
            <article className={styles.card} key={c.storyTitles[index]}>
              <svg className={styles.icon} viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d={storyIcons[index]} />
              </svg>
              <h3>{c.storyTitles[index]}</h3>
              <p>{paragraph}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
    <LogisticsExperience lang={lang}/>
    <section className="aboutMotto" aria-label={lang==="es"?"Mi enfoque de calidad":"My approach to quality"}><h2 className="heroPromise">{c.heroMotto}</h2><p>{c.heroCopy}</p></section>
    <section className="evidence" id="evidence" aria-labelledby="evidence-title">
      <header className="evidenceHead"><div><p className="label">{c.evidenceLabel}</p><h2 id="evidence-title">{c.evidenceTitle}</h2></div><p>{c.evidenceIntro}</p></header>
      <div className="evidenceGrid">{c.evidence.map((item,index)=><article key={item.value+item.label}><div className={item.progress===null?"evidenceRange":"evidenceRing"} style={item.progress===null?undefined:{"--progress":item.progress} as CSSProperties}><span>{item.value}</span>{item.progress===null?<small>{lang==="es"?"por semana":"per week"}</small>:null}</div><div><span>0{index+1}</span><p>{item.label}</p></div></article>)}</div>
    </section>

    <SkillsMap lang={lang}/>

    <section className="aboutVision" id="vision" aria-labelledby="about-vision-title"><header><p className="label">{c.visionLabel}</p><h2 id="about-vision-title">{c.visionTitle}</h2><p>{c.visionLead}</p></header><div>{c.vision.map((item,index)=><article key={item.title}><span>0{index+1}</span><h3>{item.title}</h3><p>{item.copy}</p></article>)}</div></section>
    <section className="aboutClose"><h2>{c.close}</h2><div><Link className="buttonPrimary" href="/como-trabajo">{c.workflow} <span aria-hidden="true">↗</span></Link><a className="buttonSecondary" href={cvFiles[lang]} download>{c.cv} <span aria-hidden="true">↓</span></a></div></section>
  </main>;
}
