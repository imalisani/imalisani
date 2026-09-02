"use client";

import Link from "next/link";
import {useEffect,useState} from "react";
import styles from "./process.module.css";

type Lang="es"|"en";

const steps=[
  {n:"01",tone:"lime",es:{short:"Historia + contexto",phase:"ENTENDER",title:"Lectura humana + primer borrador con IA",copy:"Mientras un agente elabora el primer plan de pruebas, leo los requerimientos, criterios de aceptación y dependencias. La IA acelera el borrador; yo valido intención, contexto y riesgo.",result:"Borrador inicial + mapa de riesgos"},en:{short:"Story + context",phase:"UNDERSTAND",title:"Human review + an AI first draft",copy:"While an agent drafts the first test plan, I read the requirements, acceptance criteria and dependencies. AI speeds up the draft; I validate intent, context and risk.",result:"Initial draft + risk map"}},
  {n:"02",tone:"paper",es:{short:"Preguntas tempranas",phase:"ALINEAR",title:"Las dudas se resuelven antes",copy:"Planteo preguntas concretas por Slack o el chat del equipo: “¿qué pasaría si…?”, “¿va bajo configuración o afecta a todos los clientes?”, “¿qué ocurre si el flujo se interrumpe a mitad?” y “¿cómo debe responder ante permisos, datos incompletos o una integración caída?”. Si el alcance lo requiere, alineamos en una reunión con Dev, PM y EM.",result:"Alcance y reglas acordadas"},en:{short:"Early questions",phase:"ALIGN",title:"Questions are resolved early",copy:"I ask concrete questions in Slack or the team chat: “what happens if…?”, “is this configuration-based or does it affect every customer?”, “what happens if the flow stops halfway through?” and “how should it respond to permissions, incomplete data or an integration outage?”. If scope requires it, I align with Dev, PM and EM in a meeting.",result:"Agreed scope and rules"}},
  {n:"03",tone:"sand",es:{short:"Plan compartido",phase:"PLANIFICAR",title:"El plan queda visible antes de In Progress",copy:"Ajusto escenarios positivos, negativos, límites e integraciones y comparto el plan antes de que comience el desarrollo. Así, la cobertura esperada es parte de la conversación y nada toma al equipo por sorpresa.",result:"Plan de pruebas compartido"},en:{short:"Shared test plan",phase:"PLAN",title:"The plan is visible before In Progress",copy:"I refine positive, negative, boundary and integration scenarios, then share the plan before development begins. Expected coverage becomes part of the conversation, so nothing takes the team by surprise.",result:"Shared test plan"}},
  {n:"04",tone:"violet",es:{short:"Trabajo en paralelo",phase:"ADAPTAR",title:"Trabajo en paralelo sin perder contexto",copy:"Mientras se desarrolla la tarea A, avanzo con la prueba de la tarea B. Puedo pasar de una API a un algoritmo en la misma mañana y conservar el criterio de calidad en contextos diferentes.",result:"Flujo continuo entre tareas"},en:{short:"Parallel work",phase:"ADAPT",title:"Parallel work without losing context",copy:"While task A is being developed, I test task B. I can move from an API to an algorithm in the same morning while keeping quality judgement consistent across contexts.",result:"Continuous flow across tasks"}},
  {n:"05",tone:"paper",es:{short:"Plan vs. diff",phase:"RECALIBRAR",title:"El plan se compara con el cambio real",copy:"Cuando Dev indica que la tarea está lista, un agente compara el plan contra el diff. Detectamos escenarios omitidos y también casos que dejaron de aplicar antes de invertir tiempo en ejecutarlos.",result:"Cobertura ajustada al diff"},en:{short:"Plan vs. diff",phase:"RECALIBRATE",title:"The plan is compared with the real change",copy:"When Dev marks the task ready, an agent compares the plan against the diff. We find missing scenarios and remove cases that no longer apply before spending time executing them.",result:"Coverage aligned with the diff"}},
  {n:"06",tone:"lime",es:{short:"Evaluación de automatización",phase:"EVALUAR",title:"Se evalúa si corresponde automatizar",copy:"Antes de automatizar, evalúo la criticidad y el riesgo del flujo, su frecuencia de ejecución y valor para regresión, la estabilidad del ambiente, los datos y las integraciones, que el resultado sea determinista y el costo de mantenimiento. Solo cuando aporta cobertura repetible y sostenible invoco el agente correspondiente, ejecuto los casos y genero el reporte Allure con evidencia.",result:"Decisión documentada + automatización cuando aporta valor"},en:{short:"Automation assessment",phase:"EVALUATE",title:"I assess whether automation is appropriate",copy:"Before automating, I evaluate the flow’s criticality and risk, execution frequency and regression value, the stability of the environment, data and integrations, whether the outcome is deterministic, and maintenance cost. Only when it provides repeatable, sustainable coverage do I invoke the appropriate agent, run the cases and generate an Allure report with evidence.",result:"Documented decision + automation when it adds value"}},
  {n:"07",tone:"sand",es:{short:"Testing manual",phase:"OBSERVAR",title:"Testing manual donde aporta criterio",copy:"Completo la cobertura con pruebas manuales para escenarios no automatizables, exploratorios o que requieren observar comportamiento, integración y experiencia de uso.",result:"Cobertura manual complementaria"},en:{short:"Manual testing",phase:"OBSERVE",title:"Manual testing where judgement matters",copy:"I complete coverage with manual testing for scenarios that cannot be automated, exploratory paths or cases that require observing behaviour, integration and user experience.",result:"Complementary manual coverage"}},
  {n:"08",tone:"violet",es:{short:"Evidencia + decisión",phase:"DECIDIR",title:"Una decisión basada en evidencia",copy:"Cruzo resultados automáticos y manuales, documento la evidencia y comunico la decisión por Slack o el chat del equipo. El registro queda en Jira, Notion o Azure DevOps como subincidencia vinculada a la tarjeta de desarrollo, con impacto, riesgo y seguimiento.",result:"Return · Alerta · Ready for Deploy"},en:{short:"Evidence + decision",phase:"DECIDE",title:"An evidence-based decision",copy:"I combine automated and manual results, document the evidence and communicate the decision in Slack or the team chat. It is recorded in Jira, Notion or Azure DevOps as a sub-issue linked to the development ticket, including impact, risk and follow-up.",result:"Return · Alert · Ready for Deploy"}},
] as const;

const outcomes=[
  {key:"return",code:"01",es:{title:"Return to Dev",copy:"Falla o bloqueo: evidencia y pasos de reproducción vuelven a Dev en una subincidencia vinculada."},en:{title:"Return to Dev",copy:"Failure or blocker: evidence and reproduction steps return to Dev in a linked sub-issue."}},
  {key:"alert",code:"02",es:{title:"Alerta",copy:"El riesgo no bloquea el release, pero se comunica y queda registrado para seguimiento."},en:{title:"Alert",copy:"The risk does not block release, but it is communicated and recorded for follow-up."}},
  {key:"ready",code:"03",es:{title:"Ready for Deploy",copy:"Los criterios aplicables pasan y la evidencia permite avanzar con una señal clara."},en:{title:"Ready for Deploy",copy:"Applicable criteria pass and the evidence provides a clear signal to move forward."}},
] as const;

const copy={
  es:{back:"Portfolio",index:"Cómo trabajo",aboutIndex:"Sobre mí",metricsNav:"Mis métricas",cvNav:"Descargar CV",flowNav:"Flujo de QA",casesNav:"Casos de prueba",reposNav:"Repositorios",contact:"Contacto",label:"Del requerimiento al release",title:<>Un flujo de QA que convierte incertidumbre en una <em>decisión trazable.</em></>,lead:"El proceso no empieza cuando la tarea está lista para probar. Empieza cuando todavía se puede preguntar, ajustar y prevenir.",chips:["Antes de In Progress","Agentes + criterio humano","Automatización + testing manual","Evidencia trazable"],diagram:"Mapa del proceso",diagramTitle:"Seleccioná una etapa para explorar el flujo.",diagramLead:"Las conexiones muestran el recorrido principal. La ejecución automática y la manual trabajan en paralelo y vuelven a reunirse en una decisión con evidencia.",detail:"Detalle de la etapa",output:"Salida",parallel:"DOS CAPAS DE COBERTURA",decision:"DECISIÓN DE QA",outcomeTitle:"Tres salidas posibles",outcomeCopy:"La decisión se comunica en el canal del equipo y queda vinculada a la tarjeta de desarrollo.",ctaLabel:"¿Querés ver el resultado?",ctaTitle:"Explorá casos de prueba y repositorios con evidencia real.",evidence:"Ver casos y evidencia",repos:"Explorar repositorios",talk:"Hablemos"},
  en:{back:"Portfolio",index:"How I work",aboutIndex:"About me",metricsNav:"My metrics",cvNav:"Download CV",flowNav:"QA workflow",casesNav:"Test cases",reposNav:"Repositories",contact:"Contact",label:"From requirement to release",title:<>A QA workflow that turns uncertainty into a <em>traceable decision.</em></>,lead:"The process does not begin when a task is ready to test. It begins while there is still time to ask, adjust and prevent.",chips:["Before In Progress","Agents + human judgement","Automation + manual testing","Traceable evidence"],diagram:"Process map",diagramTitle:"Select a stage to explore the workflow.",diagramLead:"Connections show the main journey. Automated and manual execution run in parallel, then converge into an evidence-based decision.",detail:"Stage detail",output:"Output",parallel:"TWO COVERAGE LAYERS",decision:"QA DECISION",outcomeTitle:"Three possible outcomes",outcomeCopy:"The decision is shared in the team channel and linked to the development ticket.",ctaLabel:"Want to see the outcome?",ctaTitle:"Explore test cases and repositories with real evidence.",evidence:"View cases and evidence",repos:"Explore repositories",talk:"Let’s talk"},
};

const connectors=[
  {d:"M170 90 H600",at:1},
  {d:"M600 90 H1030",at:2},
  {d:"M1030 90 V320",at:3},
  {d:"M1030 320 H600",at:4},
  {d:"M600 320 C530 430 360 440 290 570",at:5},
  {d:"M600 320 C670 430 840 440 910 570",at:6},
  {d:"M290 570 C340 700 470 735 600 790",at:7},
  {d:"M910 570 C860 700 730 735 600 790",at:7},
] as const;

export default function ProcessJourney(){
  const [lang,setLang]=useState<Lang>("es");
  const [theme,setTheme]=useState<"light"|"dark">("light");
  const [activeStep,setActiveStep]=useState(0);

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
  const active=steps[activeStep][lang];

  return <main className={styles.page} lang={lang}>
    <nav className={styles.nav} aria-label={lang==="es"?"Navegación de Cómo trabajo":"How I work navigation"}>
      <Link className={styles.logo} href="/" aria-label={lang==="es"?"Ir al inicio":"Go home"}>IM<span>.</span></Link>
      <div className={styles.navLinks}><Link href="/">← {c.back}</Link><details className={styles.navGroup} name="main-navigation"><summary className={styles.navParent}>{c.index} <span aria-hidden="true">↓</span></summary><div className={styles.navDropdown} aria-label={lang==="es"?"Índice de subpáginas":"Subpage index"}><Link href="/como-trabajo" aria-current="page">{c.flowNav}</Link><Link href="/agentic-qa-lab">Agentic QA Lab</Link><Link href="/casos-de-prueba">{c.casesNav}</Link><Link href="/repositorios">{c.reposNav}</Link></div></details><details className={styles.navGroup} name="main-navigation"><summary className={styles.navParent}>{c.aboutIndex} <span aria-hidden="true">↓</span></summary><div className={styles.navDropdown} aria-label={lang==="es"?"Índice sobre mí":"About index"}><Link href="/#work">{c.metricsNav}</Link><Link href="/#about">{lang==="es"?"Mi historia":"My story"}</Link><a href="/CV-Irina-Malisani-QA-Engineer.pdf" download>CV — {c.cvNav}</a><Link href="/#contact">{c.contact}</Link></div></details></div>
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

    <section className={styles.flowSection} aria-labelledby="flow-title">
      <header className={styles.flowHeader}>
        <div><p className={styles.eyebrow}>01 — {c.diagram}</p><h2 id="flow-title">{c.diagramTitle}</h2></div>
        <p>{c.diagramLead}</p>
      </header>

      <div className={styles.flowLayout}>
        <div className={styles.flowCanvas} role="list" aria-label={lang==="es"?"Etapas del flujo de QA":"QA workflow stages"}>
          <svg className={styles.flowSvg} viewBox="0 0 1200 900" preserveAspectRatio="none" aria-hidden="true">
            <defs><marker id="flow-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z"/></marker></defs>
            {connectors.map((connector,index)=><path key={connector.d} d={connector.d} markerEnd="url(#flow-arrow)" className={`${styles.connector} ${activeStep>=connector.at?styles.connectorActive:""}`} style={{animationDelay:`${index*-.45}s`}}/>)}
          </svg>
          <span className={styles.parallelLabel}>{c.parallel}</span>
          {steps.map((step,index)=>{const item=step[lang];return <div className={`${styles.nodeSlot} ${styles[`node${index+1}`]}`} key={step.n} role="listitem">
            <button type="button" className={`${styles.flowNode} ${styles[step.tone]} ${activeStep===index?styles.nodeActive:""}`} onClick={()=>setActiveStep(index)} aria-pressed={activeStep===index}>
              <span className={styles.nodeNumber}>{step.n}</span><span className={styles.nodePhase}>{item.phase}</span><strong>{item.short}</strong><i aria-hidden="true"/>
            </button>
            {activeStep===index&&<article className={styles.mobileDetail} aria-live="polite"><span>{c.detail} · {step.n}</span><h3>{item.title}</h3><p>{item.copy}</p><strong>{c.output}: {item.result}</strong></article>}
          </div>})}
        </div>

        <aside className={styles.detailPanel} id="flow-detail" aria-live="polite">
          <div className={styles.detailIndex}><span>{c.detail}</span><strong>{steps[activeStep].n} / 08</strong></div>
          <p className={styles.detailPhase}>{active.phase}</p>
          <h3>{active.title}</h3>
          <p className={styles.detailCopy}>{active.copy}</p>
          <div className={styles.detailOutput}><span>{c.output}</span><strong>{active.result}</strong></div>
          <div className={styles.stepPicker} aria-label={lang==="es"?"Elegir etapa":"Choose stage"}>{steps.map((step,index)=><button key={step.n} type="button" onClick={()=>setActiveStep(index)} aria-label={`${lang==="es"?"Etapa":"Stage"} ${step.n}`} aria-current={activeStep===index?"step":undefined}>{step.n}</button>)}</div>
        </aside>
      </div>

      <div className={styles.decisionGate}>
        <div className={styles.decisionCore}><span>{c.decision}</span><h2>{c.outcomeTitle}</h2><p>{c.outcomeCopy}</p></div>
        <div className={styles.outcomeGrid}>{outcomes.map(outcome=>{const item=outcome[lang];return <article key={outcome.key} className={styles[outcome.key]}><span>{outcome.code}</span><h3>{item.title}</h3><p>{item.copy}</p></article>})}</div>
      </div>
    </section>

    <footer className={styles.footer}><p className={styles.eyebrow}>{c.ctaLabel}</p><h2>{c.ctaTitle}</h2><div><Link href="/casos-de-prueba">{c.evidence} ↗</Link><Link href="/repositorios">{c.repos} ↗</Link><Link href="/#contact">{c.talk} ↗</Link></div></footer>
  </main>;
}
