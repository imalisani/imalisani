"use client";

import Link from "next/link";
import {useEffect,useState} from "react";
import styles from "./process.module.css";

type Lang="es"|"en";

const steps=[
  {n:"01",tone:"lime",es:{title:"Lectura humana + primer borrador con IA",copy:"Mientras un agente elabora el primer plan de pruebas, leo los requerimientos, criterios de aceptación y dependencias. La IA acelera el borrador; yo valido intención, contexto y riesgo.",result:"Borrador inicial + mapa de riesgos"},en:{title:"Human review + an AI first draft",copy:"While an agent drafts the first test plan, I read the requirements, acceptance criteria and dependencies. AI speeds up the draft; I validate intent, context and risk.",result:"Initial draft + risk map"}},
  {n:"02",tone:"paper",es:{title:"Las dudas se resuelven antes",copy:"Planteo preguntas concretas por Slack o el chat del equipo: “¿qué pasaría si…?”, “¿va bajo configuración o afecta a todos los clientes?”, “¿qué ocurre si el flujo se interrumpe a mitad?” y “¿cómo debe responder ante permisos, datos incompletos o una integración caída?”. Si el alcance lo requiere, alineamos en una reunión con Dev, PM y EM.",result:"Alcance y reglas acordadas"},en:{title:"Questions are resolved early",copy:"I ask concrete questions in Slack or the team chat: “what happens if…?”, “is this configuration-based or does it affect every customer?”, “what happens if the flow stops halfway through?” and “how should it respond to permissions, incomplete data or an integration outage?”. If scope requires it, I align with Dev, PM and EM in a meeting.",result:"Agreed scope and rules"}},
  {n:"03",tone:"sand",es:{title:"El plan queda visible antes de In Progress",copy:"Ajusto escenarios positivos, negativos, límites e integraciones y comparto el plan antes de que comience el desarrollo. Así, la cobertura esperada es parte de la conversación y nada toma al equipo por sorpresa.",result:"Plan de pruebas compartido"},en:{title:"The plan is visible before In Progress",copy:"I refine positive, negative, boundary and integration scenarios, then share the plan before development begins. Expected coverage becomes part of the conversation, so nothing takes the team by surprise.",result:"Shared test plan"}},
  {n:"04",tone:"violet",es:{title:"Trabajo en paralelo sin perder contexto",copy:"Mientras se desarrolla la tarea A, avanzo con la prueba de la tarea B. Puedo pasar de una API a un algoritmo en la misma mañana y conservar el criterio de calidad en contextos diferentes.",result:"Flujo continuo entre tareas"},en:{title:"Parallel work without losing context",copy:"While task A is being developed, I test task B. I can move from an API to an algorithm in the same morning while keeping quality judgement consistent across contexts.",result:"Continuous flow across tasks"}},
  {n:"05",tone:"paper",es:{title:"El plan se compara con el cambio real",copy:"Cuando Dev indica que la tarea está lista, un agente compara el plan contra el diff. Detectamos escenarios omitidos y también casos que dejaron de aplicar antes de invertir tiempo en ejecutarlos.",result:"Cobertura ajustada al diff"},en:{title:"The plan is compared with the real change",copy:"When Dev marks the task ready, an agent compares the plan against the diff. We find missing scenarios and remove cases that no longer apply before spending time executing them.",result:"Coverage aligned with the diff"}},
  {n:"06",tone:"lime",es:{title:"Automatización según el tipo de cambio",copy:"Si la tarea es automatizable —por ejemplo, una API— invoco el agente correspondiente, indico el ambiente desplegado y genero y ejecuto los casos. El resultado incluye reporte Allure, resumen y evidencia.",result:"Ejecución automática + Allure"},en:{title:"Automation based on the change type",copy:"If the task can be automated—for example, an API—I invoke the right agent, provide the deployed environment, then generate and run the cases. The result includes an Allure report, summary and evidence.",result:"Automated execution + Allure"}},
  {n:"07",tone:"sand",es:{title:"Testing manual donde aporta criterio",copy:"Completo la cobertura con pruebas manuales para escenarios no automatizables, exploratorios o que requieren observar comportamiento, integración y experiencia de uso.",result:"Cobertura manual complementaria"},en:{title:"Manual testing where judgement matters",copy:"I complete coverage with manual testing for scenarios that cannot be automated, exploratory paths or cases that require observing behaviour, integration and user experience.",result:"Complementary manual coverage"}},
  {n:"08",tone:"violet",es:{title:"Una decisión basada en evidencia",copy:"Cruzo resultados automáticos y manuales, documento la evidencia y comunico la decisión por Slack o el chat del equipo. El registro queda en Jira, Notion o Azure DevOps como subincidencia vinculada a la tarjeta de desarrollo, con impacto, riesgo y seguimiento.",result:"Return · Alerta · Ready for Deploy"},en:{title:"An evidence-based decision",copy:"I combine automated and manual results, document the evidence and communicate the decision in Slack or the team chat. It is recorded in Jira, Notion or Azure DevOps as a sub-issue linked to the development ticket, including impact, risk and follow-up.",result:"Return · Alert · Ready for Deploy"}},
] as const;

const outcomes=[
  {key:"return",es:{title:"Return to Dev",copy:"Hay una falla explícita o un bloqueo. Dev recibe la devolución por el chat del equipo, con evidencia, pasos de reproducción e impacto registrados en una subincidencia vinculada."},en:{title:"Return to Dev",copy:"There is an explicit failure or blocker. Dev receives the result through the team chat, with evidence, reproduction steps and impact recorded in a linked sub-issue."}},
  {key:"alert",es:{title:"Alerta",copy:"El riesgo no bloquea el release. Lo comunico por Slack o el chat del equipo y lo registro en Jira, Notion o Azure DevOps para asegurar su seguimiento."},en:{title:"Alert",copy:"The risk does not block the release. I communicate it in Slack or the team chat and record it in Jira, Notion or Azure DevOps for follow-up."}},
  {key:"ready",es:{title:"Ready for Deploy",copy:"Los criterios y casos aplicables pasan, la evidencia queda cargada y el equipo puede avanzar con una señal clara."},en:{title:"Ready for Deploy",copy:"Applicable criteria and cases pass, evidence is uploaded and the team can move forward with a clear signal."}},
] as const;

const copy={
  es:{back:"Portfolio",flowNav:"Flujo de QA",casesNav:"Casos de prueba",reposNav:"Repositorios",contact:"Contacto",label:"Del requerimiento al release",title:<>De historia de usuario a una <em>decisión de release.</em></>,lead:"Los agentes aceleran el análisis y la ejecución. El criterio, las preguntas y la decisión de calidad siguen siendo humanos.",chips:["Antes de In Progress","Agentes + criterio humano","Automatización + testing manual","Return · Alerta · Ready"],timeline:"El recorrido",outcomeLabel:"La salida",outcomeTitle:"Tres decisiones, una misma trazabilidad.",outcomeCopy:"Cada resultado se comunica por Slack o el chat del equipo y queda respaldado por evidencia y un registro vinculado a la tarjeta de desarrollo.",ctaLabel:"¿Querés ver el resultado?",ctaTitle:"Explorá casos de prueba y repositorios con evidencia real.",evidence:"Ver casos y evidencia",repos:"Explorar repositorios",talk:"Hablemos"},
  en:{back:"Portfolio",flowNav:"QA workflow",casesNav:"Test cases",reposNav:"Repositories",contact:"Contact",label:"From requirement to release",title:<>From user story to an <em>evidence-based release decision.</em></>,lead:"Agents accelerate analysis and execution. Judgement, questions and quality decisions remain human.",chips:["Before In Progress","Agents + human judgement","Automation + manual testing","Return · Alert · Ready"],timeline:"The journey",outcomeLabel:"The outcome",outcomeTitle:"Three decisions, one traceable process.",outcomeCopy:"Every result is communicated in Slack or the team chat and backed by evidence and a record linked to the development ticket.",ctaLabel:"Want to see the outcome?",ctaTitle:"Explore test cases and repositories with real evidence.",evidence:"View cases and evidence",repos:"Explore repositories",talk:"Let’s talk"},
};

export default function ProcessJourney(){
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
    <nav className={styles.nav} aria-label={lang==="es"?"Navegación de Cómo trabajo":"How I work navigation"}>
      <Link className={styles.logo} href="/" aria-label={lang==="es"?"Ir al inicio":"Go home"}>IM<span>.</span></Link>
      <div className={styles.navLinks}><Link href="/">← {c.back}</Link><Link href="/como-trabajo" aria-current="page">01 — {c.flowNav}</Link><Link href="/casos-de-prueba">02 — {c.casesNav}</Link><Link href="/repositorios">03 — {c.reposNav}</Link><Link href="/#contact">{c.contact}</Link></div>
      <div className={styles.controls}>
        <button className={styles.theme} type="button" onClick={toggleTheme} aria-label={lang==="es"?(theme==="dark"?"Activar modo claro":"Activar modo oscuro"):(theme==="dark"?"Use light mode":"Use dark mode")}><span aria-hidden="true">{theme==="dark"?"☀":"☾"}</span></button>
        <button className={`${styles.language} ${lang==="es"?styles.spanish:""}`} type="button" onClick={toggleLanguage} aria-pressed={lang==="es"} aria-label={lang==="es"?"View in English":"Ver en español"}><span className={lang==="en"?styles.active:""}>EN</span><i/><span className={lang==="es"?styles.active:""}>ES</span></button>
      </div>
    </nav>

    <header className={styles.hero}>
      <p className={styles.eyebrow}>{c.label}</p>
      <h1>{c.title}</h1>
      <div className={styles.heroBottom}><p>{c.lead}</p><div className={styles.chips}>{c.chips.map(chip=><span key={chip}>{chip}</span>)}</div></div>
    </header>

    <section className={styles.timelineSection} aria-labelledby="timeline-title">
      <p className={styles.eyebrow} id="timeline-title">01 — {c.timeline}</p>
      <ol className={styles.timeline}>{steps.map((step,index)=>{const item=step[lang];return <li className={`${styles.step} ${styles[step.tone]}`} key={step.n}>
        <span className={styles.dot} aria-hidden="true"/>
        <article><div className={styles.stepTop}><span>{step.n}</span><span>{index<3?(lang==="es"?"ANTES DEL DESARROLLO":"BEFORE DEVELOPMENT"):index<5?(lang==="es"?"CAMBIO LISTO":"CHANGE READY"):(lang==="es"?"EJECUCIÓN Y DECISIÓN":"EXECUTION & DECISION")}</span></div><h2>{item.title}</h2><p>{item.copy}</p><strong>{item.result}</strong></article>
      </li>})}</ol>
    </section>

    <section className={styles.outcomes} aria-labelledby="outcomes-title">
      <header><div><p className={styles.eyebrow}>{c.outcomeLabel}</p><h2 id="outcomes-title">{c.outcomeTitle}</h2></div><p>{c.outcomeCopy}</p></header>
      <div className={styles.outcomeGrid}>{outcomes.map((outcome,index)=>{const item=outcome[lang];return <article key={outcome.key}><span>0{index+1}</span><h3>{item.title}</h3><p>{item.copy}</p></article>})}</div>
    </section>

    <footer className={styles.footer}><p className={styles.eyebrow}>{c.ctaLabel}</p><h2>{c.ctaTitle}</h2><div><Link href="/casos-de-prueba">{c.evidence} ↗</Link><Link href="/repositorios">{c.repos} ↗</Link><Link href="/#contact">{c.talk} ↗</Link></div></footer>
  </main>;
}
