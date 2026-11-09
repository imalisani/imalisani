"use client";

import Image from "next/image";
import Link from "next/link";
import {type CSSProperties,type FormEvent,useEffect,useState} from "react";
import SkillsMap from "./components/SkillsMap";
import SocialDock from "./components/SocialDock";
import {cvFiles} from "./cv-files";

type Language="en"|"es";

const copy={
  es:{
    navWork:"Cómo trabajo",navAbout:"Sobre mí",available:"Disponible para trabajar",location:"Argentina · Remoto",
    heroEyebrow:"Quality Engineer · Shift-left · Automatización · Agentic QA",
    heroMotto:<>La calidad no es <em>suerte.</em><br/>Se diseña, se planifica, se valida y se protege <strong>de principio a fin.</strong></>,
    heroCopy:"Conecto criterio humano, estrategia de pruebas y automatización para que los riesgos aparezcan antes que los problemas.",
    workCta:"Ver cómo trabajo",cvCta:"Descargar CV",
    indexLabel:"02 — Trabajo en acción",indexTitle:"Elegí la evidencia que querés explorar.",
    paths:[
      {title:"Cómo trabajo",copy:"El proceso completo: preguntas tempranas, cobertura, evidencia y decisiones de calidad.",action:"Ver el flujo",href:"/como-trabajo"},
      {title:"Agentic QA Lab",copy:"Una ejecución verificable desde la historia de usuario hasta la automatización y el reporte.",action:"Ejecutar la demo",href:"/agentic-qa-lab"},
      {title:"Casos de prueba",copy:"Escenarios Gherkin basados en riesgo y técnicas de diseño aplicadas.",action:"Ver los casos",href:"/casos-de-prueba"},
      {title:"Repositorios",copy:"Código público, arquitectura, trazabilidad y evidencia de ejecución.",action:"Explorar código",href:"/repositorios"},
    ],
    evidenceLabel:"03 — Evidencia rápida",evidenceTitle:"Impacto que se entiende en segundos.",evidenceIntro:"Tres señales de una práctica orientada a prevenir, validar y decidir.",
    evidence:[
      {value:"90%",progress:90,label:"planes de prueba listos antes del desarrollo"},
      {value:"3–6",progress:null,label:"funcionalidades validadas por semana"},
      {value:"25%",progress:25,label:"tareas con riesgos o defectos detectados antes de producción"},
    ],
    storyLabel:"05 — Mi historia",storyTitle:<>Aprendí a encontrar bugs.<br/><em>Elegí prevenirlos.</em></>,
    storyCopy:"Mi recorrido por web, mobile, APIs, integraciones y logística convirtió el testing en algo más amplio: hacer mejores preguntas, alinear al equipo y diseñar confianza antes del release.",
    storyCta:"Conocer mi recorrido",
    futureLabel:"06 — Visión",futureTitle:"QA como inteligencia para el producto.",futureCopy:"Quiero ayudar a construir equipos donde el criterio humano, la automatización y los agentes conviertan incertidumbre en decisiones trazables.",futureCta:"Ver mi visión completa",
    futurePillars:[
      {title:"Prevenir desde el diseño",copy:"Hacer visibles las preguntas y los riesgos antes de construir, no recién antes del release."},
      {title:"Automatizar con criterio",copy:"Elegir cobertura útil y agentes con contexto, límites y decisiones que puedan auditarse."},
      {title:"Decidir con evidencia",copy:"Conectar resultados e impacto de negocio para que el equipo entienda qué riesgo está aceptando."},
    ],
    contactLabel:"07 — Hablemos",contactTitle:<>¿Estás construyendo algo<br/>que necesita <em>confianza?</em></>,contactHeading:"Trabajemos juntos",
    name:"Nombre",email:"Email",subject:"Asunto",message:"Mensaje",send:"Enviar mensaje",sending:"Enviando…",success:"¡Gracias! Tu mensaje fue enviado.",error:"No se pudo enviar el mensaje. Intentá nuevamente.",
    calendarLabel:"Reserva directa",calendarTitle:"¿Preferís coordinar directamente?",calendarCopy:"Evitá el ida y vuelta: elegí el horario que mejor te quede y agendemos una conversación.",calendarLink:"Ver horarios disponibles",
    aboutLinks:["Mi historia","Mis capacidades","Mi visión","Contacto"],
  },
  en:{
    navWork:"How I work",navAbout:"About me",available:"Available for work",location:"Argentina · Remote",
    heroEyebrow:"Quality Engineer · Shift-left · Automation · Agentic QA",
    heroMotto:<>Quality isn&apos;t <em>luck.</em><br/>It&apos;s designed, planned, validated and protected <strong>from start to finish.</strong></>,
    heroCopy:"I connect human judgement, test strategy and automation so risks become visible before they become problems.",
    workCta:"See how I work",cvCta:"Download CV",
    indexLabel:"02 — Work in action",indexTitle:"Choose the evidence you want to explore.",
    paths:[
      {title:"How I work",copy:"The complete process: early questions, coverage, evidence and quality decisions.",action:"See the workflow",href:"/como-trabajo"},
      {title:"Agentic QA Lab",copy:"A verifiable run from user story through automation and reporting.",action:"Run the demo",href:"/agentic-qa-lab"},
      {title:"Test cases",copy:"Risk-based Gherkin scenarios and applied test design techniques.",action:"View the cases",href:"/casos-de-prueba"},
      {title:"Repositories",copy:"Public code, architecture, traceability and execution evidence.",action:"Explore code",href:"/repositorios"},
    ],
    evidenceLabel:"03 — Quick evidence",evidenceTitle:"Impact understood in seconds.",evidenceIntro:"Three signals from a practice focused on preventing, validating and deciding.",
    evidence:[
      {value:"90%",progress:90,label:"test plans ready before development"},
      {value:"3–6",progress:null,label:"features validated each week"},
      {value:"25%",progress:25,label:"tasks with risks or defects caught before production"},
    ],
    storyLabel:"05 — My story",storyTitle:<>I learned to find bugs.<br/><em>I chose to prevent them.</em></>,
    storyCopy:"My work across web, mobile, APIs, integrations and logistics turned testing into something broader: asking better questions, aligning the team and designing confidence before release.",
    storyCta:"Explore my journey",
    futureLabel:"06 — Vision",futureTitle:"QA as product intelligence.",futureCopy:"I want to help build teams where human judgement, automation and agents turn uncertainty into traceable decisions.",futureCta:"See my complete vision",
    futurePillars:[
      {title:"Prevent through design",copy:"Surface questions and risks before building, not only before release."},
      {title:"Automate with judgement",copy:"Choose useful coverage and agents with context, boundaries and auditable decisions."},
      {title:"Decide with evidence",copy:"Connect results to business impact so the team understands the risk it is accepting."},
    ],
    contactLabel:"07 — Let’s talk",contactTitle:<>Building something<br/>that needs <em>confidence?</em></>,contactHeading:"Let’s work together",
    name:"Name",email:"Email",subject:"Subject",message:"Message",send:"Send message",sending:"Sending…",success:"Thanks! Your message was sent.",error:"The message could not be sent. Please try again.",
    calendarLabel:"Direct booking",calendarTitle:"Prefer to coordinate directly?",calendarCopy:"Skip the back-and-forth: choose the time that works best for you and let’s schedule a conversation.",calendarLink:"View available times",
    aboutLinks:["My story","My capabilities","My vision","Contact"],
  },
} as const;

const Arrow=()=> <span aria-hidden="true">↗</span>;

export default function Home(){
  const [lang,setLang]=useState<Language>("es");
  const [theme,setTheme]=useState<"light"|"dark">("light");
  const [formStatus,setFormStatus]=useState<"idle"|"sending"|"success"|"error">("idle");

  useEffect(()=>{
    const savedTheme=window.localStorage.getItem("portfolio-theme");
    const preferredTheme=savedTheme==="dark"||savedTheme==="light"?savedTheme:window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";
    const savedLanguage=window.localStorage.getItem("portfolio-language");
    const preferredLanguage=savedLanguage==="en"||savedLanguage==="es"?savedLanguage:"es";
    setTheme(preferredTheme);setLang(preferredLanguage);
    document.documentElement.dataset.theme=preferredTheme;document.documentElement.lang=preferredLanguage;
  },[]);

  const toggleTheme=()=>setTheme(current=>{
    const next=current==="light"?"dark":"light";
    document.documentElement.dataset.theme=next;window.localStorage.setItem("portfolio-theme",next);return next;
  });
  const toggleLanguage=()=>setLang(current=>{
    const next=current==="en"?"es":"en";
    window.localStorage.setItem("portfolio-language",next);document.documentElement.lang=next;return next;
  });
  const handleContactSubmit=async(event:FormEvent<HTMLFormElement>)=>{
    event.preventDefault();const form=event.currentTarget;const data=Object.fromEntries(new FormData(form).entries());setFormStatus("sending");
    try{
      const response=await fetch("/api/contact",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)});
      if(!response.ok)throw new Error("Contact request failed");form.reset();setFormStatus("success");
    }catch{setFormStatus("error");}
  };

  const c=copy[lang];
  const cvHref=cvFiles[lang];
  return <main lang={lang}>
    <nav className="nav">
      <a className="logo" href="#top">IM<span>.</span></a>
      <div className="navlinks">
        <details className="navGroup" name="main-navigation"><summary className="navParent">{c.navWork} <span aria-hidden="true">↓</span></summary><div className="navDropdown"><Link href="/como-trabajo">{c.paths[0].title}</Link><Link href="/agentic-qa-lab">Agentic QA Lab</Link><Link href="/casos-de-prueba">{c.paths[2].title}</Link><Link href="/repositorios">{c.paths[3].title}</Link></div></details>
        <details className="navGroup" name="main-navigation"><summary className="navParent">{c.navAbout} <span aria-hidden="true">↓</span></summary><div className="navDropdown"><Link href="/sobre-mi">{c.aboutLinks[0]}</Link><a href="#capabilities">{c.aboutLinks[1]}</a><Link href="/sobre-mi#vision">{c.aboutLinks[2]}</Link><a href="#contact">{c.aboutLinks[3]}</a></div></details>
      </div>
      <div className="navActions">
        <button className="themeSwitch" type="button" onClick={toggleTheme} aria-pressed={theme==="dark"} aria-label={lang==="es"?(theme==="dark"?"Activar modo claro":"Activar modo oscuro"):(theme==="dark"?"Use light mode":"Use dark mode")}><span aria-hidden="true">{theme==="dark"?"☀":"☾"}</span></button>
        <button className={`langSwitch ${lang==="es"?"isSpanish":""}`} type="button" onClick={toggleLanguage} aria-pressed={lang==="es"} aria-label={lang==="en"?"Ver en español":"View in English"}><span className={lang==="en"?"active":""}>EN</span><i/><span className={lang==="es"?"active":""}>ES</span></button>
        <a className="status" href="#contact"><i/> {c.available}</a>
      </div>
    </nav>

    <section className="hero heroMinimal" id="top">
      <div className="kicker"><span>QA Engineer</span><span>{c.location}</span></div>
      <div className="heroGrid">
        <div className="heroIdentity">
          <p className="heroEyebrow">{c.heroEyebrow}</p>
          <h1 className="heroName">Irina<br/>Malisani<span>.</span></h1>
          <h2 className="heroPromise">{c.heroMotto}</h2>
          <p className="heroSummary">{c.heroCopy}</p>
          <div className="heroActions"><a className="buttonPrimary" href="#como-trabajo">{c.workCta} <span aria-hidden="true">↓</span></a><a className="buttonSecondary" href={cvHref} download>{c.cvCta} <span aria-hidden="true">↓</span></a></div>
        </div>
        <div className="qaUniverse" aria-hidden="true"><div className="orbit orbitOne"><span>{lang==="es"?"ESTRATEGIA":"SHIFT-LEFT"}</span><span>ISTQB</span><span>{lang==="es"?"RIESGOS":"RISK"}</span></div><div className="orbit orbitTwo"><span>PLAYWRIGHT</span><span>APIs</span><span>{lang==="es"?"QA CON IA":"AGENTIC QA"}</span></div><Image className="planet" src="/qa-planet.png" width={1254} height={1254} sizes="(max-width: 760px) 76vw, 38vw" priority alt=""/></div>
      </div>
    </section>

    <section className="pageIndex compactIndex" id="como-trabajo" aria-labelledby="page-index-title">
      <header><p className="label">{c.indexLabel}</p><h2 id="page-index-title">{c.indexTitle}</h2></header>
      <div className="pageIndexGrid">{c.paths.map((path,index)=><Link className="pageIndexCard" href={path.href} key={path.href}><span>0{index+1}</span><div><h3>{path.title}</h3><p>{path.copy}</p></div><b>{path.action} <Arrow/></b></Link>)}</div>
    </section>

    <section className="evidence" id="evidence" aria-labelledby="evidence-title">
      <header className="evidenceHead"><div><p className="label">{c.evidenceLabel}</p><h2 id="evidence-title">{c.evidenceTitle}</h2></div><p>{c.evidenceIntro}</p></header>
      <div className="evidenceGrid">{c.evidence.map((item,index)=><article key={item.value+item.label}><div className={item.progress===null?"evidenceRange":"evidenceRing"} style={item.progress===null?undefined:{"--progress":item.progress} as CSSProperties}><span>{item.value}</span>{item.progress===null?<small>{lang==="es"?"por semana":"per week"}</small>:null}</div><div><span>0{index+1}</span><p>{item.label}</p></div></article>)}</div>
    </section>

    <SkillsMap lang={lang}/>

    <section className="storyTeaser" id="about" aria-labelledby="story-title">
      <div><p className="label">{c.storyLabel}</p><h2 id="story-title">{c.storyTitle}</h2></div>
      <div><p>{c.storyCopy}</p><Link className="textlink" href="/sobre-mi">{c.storyCta} <Arrow/></Link></div>
    </section>

    <section className="futureCompact futureFocused" id="vision" aria-labelledby="vision-title">
      <header><p className="label">{c.futureLabel}</p><h2 id="vision-title">{c.futureTitle}</h2><p>{c.futureCopy}</p></header>
      <ol className="visionPillars">{c.futurePillars.map((pillar,index)=><li key={pillar.title}><span aria-hidden="true">0{index+1}</span><h3>{pillar.title}</h3><p>{pillar.copy}</p></li>)}</ol>
      <Link className="visionMore" href="/sobre-mi#vision">{c.futureCta} <Arrow/></Link>
    </section>

    <footer id="contact">
      <p className="label">{c.contactLabel}</p><h2>{c.contactTitle}</h2>
      <div className="footerbottom">
        <div className="contactArea"><h3 className="contactHeading">{c.contactHeading}</h3><form className="contactForm" onSubmit={handleContactSubmit}><div className="contactFormGrid"><label><span>{c.name}</span><input name="name" type="text" autoComplete="name" maxLength={100} required/></label><label><span>{c.email}</span><input name="email" type="email" autoComplete="email" maxLength={254} required/></label></div><label><span>{c.subject}</span><input name="subject" type="text" maxLength={160} required/></label><label><span>{c.message}</span><textarea name="message" rows={5} maxLength={5000} required/></label><label className="contactHoneypot" aria-hidden="true"><span>Website</span><input name="website" type="text" tabIndex={-1} autoComplete="off"/></label><div className="contactFormActions"><button type="submit" disabled={formStatus==="sending"}>{formStatus==="sending"?c.sending:c.send} <Arrow/></button><p className={`contactFormStatus ${formStatus}`} role="status" aria-live="polite">{formStatus==="success"?c.success:formStatus==="error"?c.error:""}</p></div></form></div>
        <aside className="bookingArea" aria-labelledby="booking-title"><a className="bookingCard" href="https://calendar.app.google/f3mb9RDYyet8KZa9A" target="_blank" rel="noreferrer"><span className="bookingOrbit bookingOrbitOne" aria-hidden="true"/><span className="bookingOrbit bookingOrbitTwo" aria-hidden="true"/><span className="bookingNode" aria-hidden="true"/><p className="bookingEyebrow">{c.calendarLabel}</p><h3 className="bookingTitle" id="booking-title">{c.calendarTitle}</h3><p className="bookingCopy">{c.calendarCopy}</p><span className="bookingAction">{c.calendarLink} <Arrow/></span></a></aside>
      </div>
      <p className="signature">IRINA MALISANI</p>
    </footer>
    <SocialDock lang={lang}/>
  </main>;
}
