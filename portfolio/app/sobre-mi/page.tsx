"use client";

import Link from "next/link";
import PortfolioLogo from "../components/PortfolioLogo";
import {type CSSProperties,useEffect,useState} from "react";
import {cvFiles} from "../cv-files";
import SkillsMap from "../components/SkillsMap";

type Language="en"|"es";

const copy={
  es:{
    heroMotto:<>La calidad no es <em>suerte.</em><br/>Se diseña, se planifica, se valida y se protege <strong>de principio a fin.</strong></>,
    heroCopy:"Conecto criterio humano, estrategia de pruebas y automatización para que los riesgos aparezcan antes que los problemas.",
    evidenceLabel:"03 — Evidencia rápida",evidenceTitle:"Impacto que se entiende en segundos.",evidenceIntro:"Tres señales de una práctica orientada a prevenir, validar y decidir.",
    evidence:[
      {value:"90%",progress:90,label:"planes de prueba listos antes del desarrollo"},
      {value:"3–6",progress:null,label:"funcionalidades validadas por semana"},
      {value:"25%",progress:25,label:"tareas con riesgos o defectos detectados antes de producción"},
    ],
    back:"Volver al portfolio",switchLabel:"View in English",label:"Sobre mí · Recorrido completo",
    title:<>Aprendí a encontrar bugs.<br/><em>Elegí prevenirlos.</em></>,
    lead:"Soy Irina, QA Engineer con cinco años de experiencia ayudando a equipos de producto a convertir incertidumbre en decisiones de calidad.",
    story:[
      "Trabajando con web, mobile, APIs, integraciones y algoritmos logísticos, entendí que probar no era solamente confirmar una respuesta: era hacer mejores preguntas, descubrir supuestos y acercar al equipo a la intención real del producto.",
      "Mi mejor trabajo comienza temprano. Leo requerimientos, planteo escenarios que todavía no están visibles, alineo riesgos con Producto y Desarrollo, y preparo la cobertura antes de que la implementación convierta una duda pequeña en un problema costoso.",
      "Ese recorrido me llevó del testing reactivo al shift-left, la automatización y los agentes de IA. La tecnología acelera el análisis; el criterio humano conserva la responsabilidad.",
    ],
    scopeLabel:"Experiencia aplicada",scopeTitle:"Un perfil que conecta producto, código y riesgo.",
    scope:["Web, mobile, APIs e integraciones","Playwright, Appium y Python","Test strategy y diseño basado en riesgos","Agentes de QA con trazabilidad","Colaboración con Product, Dev y Engineering"],
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
      {value:"25%",progress:25,label:"tasks with risks or defects caught before production"},
    ],
    back:"Back to portfolio",switchLabel:"Ver en español",label:"About me · Complete journey",
    title:<>I learned to find bugs.<br/><em>I chose to prevent them.</em></>,
    lead:"I am Irina, a QA Engineer with five years of experience helping product teams turn uncertainty into quality decisions.",
    story:[
      "Working across web, mobile, APIs, integrations and logistics algorithms, I learned that testing was not only about confirming an answer. It was about asking better questions, uncovering assumptions and bringing the team closer to the product's real intent.",
      "My strongest work starts early. I read requirements, surface scenarios that are not visible yet, align risks with Product and Development, and prepare coverage before implementation turns a small doubt into an expensive problem.",
      "That journey took me from reactive testing to shift-left, automation and AI agents. Technology accelerates the analysis; human judgement retains responsibility.",
    ],
    scopeLabel:"Applied experience",scopeTitle:"A profile connecting product, code and risk.",
    scope:["Web, mobile, APIs and integrations","Playwright, Appium and Python","Test strategy and risk-based design","Traceable QA agents","Collaboration with Product, Dev and Engineering"],
    visionLabel:"Next horizon",visionTitle:"The quality practice I want to help build.",visionLead:"QA as a product intelligence system, not a final validation stage.",
    vision:[
      {title:"Agents with boundaries",copy:"AI with context and traceability, without hiding how it reached a conclusion."},
      {title:"Continuous evidence",copy:"Signals connected to the change, its risk and real impact."},
      {title:"Confidence to innovate",copy:"Teams that experiment faster because quality is designed too."},
    ],
    close:"Want to see this approach in action?",workflow:"Explore how I work",cv:"Download CV",
  },
} as const;

export default function AboutPage(){
  const [lang,setLang]=useState<Language>("es");
  const [theme,setTheme]=useState<"light"|"dark">("light");
  useEffect(()=>{
    const savedTheme=window.localStorage.getItem("portfolio-theme");
    const preferredTheme=savedTheme==="light"?"light":"dark";
    const savedLanguage=window.localStorage.getItem("portfolio-language");
    const preferredLanguage=savedLanguage==="en"||savedLanguage==="es"?savedLanguage:"es";
    setTheme(preferredTheme);setLang(preferredLanguage);document.documentElement.dataset.theme=preferredTheme;document.documentElement.lang=preferredLanguage;
  },[]);
  const toggleTheme=()=>setTheme(current=>{const next=current==="light"?"dark":"light";document.documentElement.dataset.theme=next;window.localStorage.setItem("portfolio-theme",next);return next;});
  const toggleLanguage=()=>setLang(current=>{const next=current==="en"?"es":"en";window.localStorage.setItem("portfolio-language",next);document.documentElement.lang=next;return next;});
  const c=copy[lang];
  return <main lang={lang} className="aboutPage">
    <nav className="nav aboutNav"><PortfolioLogo lang={lang}/><Link className="aboutBack" href="/">← {c.back}</Link><div className="navActions"><button className="themeSwitch" type="button" onClick={toggleTheme} aria-pressed={theme==="dark"} aria-label={lang==="es"?(theme==="dark"?"Activar modo claro":"Activar modo oscuro"):(theme==="dark"?"Use light mode":"Use dark mode")}><span aria-hidden="true">{theme==="dark"?"☀":"☾"}</span></button><button className={`langSwitch ${lang==="es"?"isSpanish":""}`} type="button" onClick={toggleLanguage} aria-pressed={lang==="es"} aria-label={c.switchLabel}><span className={lang==="en"?"active":""}>EN</span><i/><span className={lang==="es"?"active":""}>ES</span></button></div></nav>

    <article className="aboutHero" id="about">
      <p className="label">{c.label}</p><h1>{c.title}</h1><p className="aboutLead">{c.lead}</p>
    </article>
    <section className="aboutNarrative" aria-label={lang==="es"?"Recorrido profesional":"Professional journey"}>{c.story.map((paragraph,index)=><div key={paragraph}><span>0{index+1}</span><p>{paragraph}</p></div>)}</section>
    <section className="aboutScope" aria-labelledby="scope-title"><header><p className="label">{c.scopeLabel}</p><h2 id="scope-title">{c.scopeTitle}</h2></header><ul>{c.scope.map(item=><li key={item}>{item}</li>)}</ul></section>
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
