"use client";

import Link from "next/link";
import {useEffect,useRef,useState} from "react";
import styles from "./agentic-qa-lab.module.css";

type Lang="es"|"en";
type Theme="light"|"dark";

const repo="https://github.com/imalisani/qa-agents-demo";
const allureReport="https://imalisani.github.io/qa-agents-demo/";

const stages=[
  {
    id:"story",
    n:"01",
    agent:{es:"ENTRADA · HISTORIA DE USUARIO",en:"INPUT · USER STORY"},
    metric:"1",
    metricLabel:{es:"historia compleja",en:"complex user story"},
    es:{title:"La historia de usuario entra al sistema",copy:"Un cliente necesita solicitar reembolsos totales o parciales en una compra con múltiples vendedores, descuentos, envío y medios de pago combinados.",artifact:"Historia de usuario",log:["input: refund-user-story.md","scope: full + partial refunds","payment: card + internal credit","status: analysis required"]},
    en:{title:"The user story enters the system",copy:"A customer needs to request full or partial refunds for a purchase with multiple sellers, discounts, shipping and mixed payment methods.",artifact:"User story",log:["input: refund-user-story.md","scope: full + partial refunds","payment: card + internal credit","status: analysis required"]},
    url:`${repo}/blob/main/test-plans/refund-requirement-analysis.md`,
  },
  {
    id:"requirements",
    n:"02",
    agent:{es:"AGENTE DE REQUERIMIENTOS",en:"REQUIREMENTS AGENT"},
    metric:"09",
    metricLabel:{es:"ambigüedades detectadas",en:"ambiguities detected"},
    es:{title:"El agente cuestiona antes de automatizar",copy:"Separa reglas confirmadas de información faltante y genera preguntas críticas sobre idempotencia, redondeo, concurrencia, elegibilidad y estados.",artifact:"Análisis de requerimientos",log:["confirmed_rules: 11","open_questions: 09","critical_gaps: Q-01 · Q-02 · Q-03","decision: partial testability"]},
    en:{title:"The agent challenges before automating",copy:"It separates confirmed rules from missing information and raises critical questions about idempotency, rounding, concurrency, eligibility and states.",artifact:"Requirement analysis",log:["confirmed_rules: 11","open_questions: 09","critical_gaps: Q-01 · Q-02 · Q-03","decision: partial testability"]},
    url:`${repo}/blob/main/test-plans/refund-requirement-analysis.md`,
  },
  {
    id:"risks",
    n:"03",
    agent:{es:"AGENTE DE RIESGOS",en:"RISK AGENT"},
    metric:"10",
    metricLabel:{es:"riesgos priorizados",en:"prioritized risks"},
    es:{title:"El riesgo define la prioridad",copy:"El análisis identifica pérdidas financieras, duplicados, inconsistencias, concurrencia y fallas de integración. Cuatro riesgos quedan clasificados como críticos.",artifact:"Evaluación de riesgos",log:["risks_total: 10","critical: R-01 · R-02 · R-03 · R-05","release_gate: financial invariance","residual_risk: documented"]},
    en:{title:"Risk determines priority",copy:"The analysis identifies financial loss, duplicates, inconsistencies, concurrency and integration failures. Four risks are classified as Critical.",artifact:"Risk assessment",log:["risks_total: 10","critical: R-01 · R-02 · R-03 · R-05","release_gate: financial invariance","residual_risk: documented"]},
    url:`${repo}/blob/main/test-plans/refund-risk-assessment.md`,
  },
  {
    id:"design",
    n:"04",
    agent:{es:"AGENTE DE DISEÑO DE PRUEBAS",en:"TEST DESIGN AGENT"},
    metric:"12",
    metricLabel:{es:"escenarios trazables",en:"traceable scenarios"},
    es:{title:"El plan distingue certeza de supuestos",copy:"Diseña escenarios positivos, negativos, de límite, integración y estado. Seis pueden automatizarse; seis quedan bloqueados de forma explícita por requisitos faltantes.",artifact:"Plan basado en riesgos",log:["scenarios: RF-T01 → RF-T12","automatable: 06","blocked_by_requirements: 06","traceability: risk ↔ scenario"]},
    en:{title:"The plan separates certainty from assumptions",copy:"It designs positive, negative, boundary, integration and state scenarios. Six can be automated; six remain explicitly blocked by missing requirements.",artifact:"Risk-based test plan",log:["scenarios: RF-T01 → RF-T12","automatable: 06","blocked_by_requirements: 06","traceability: risk ↔ scenario"]},
    url:`${repo}/blob/main/test-plans/refund-test-plan.md`,
  },
  {
    id:"automation",
    n:"05",
    agent:{es:"AGENTE DE AUTOMATIZACIÓN",en:"AUTOMATION AGENT"},
    metric:"06",
    metricLabel:{es:"tests implementados",en:"implemented tests"},
    es:{title:"Solo se automatiza lo verificable",copy:"Playwright cubre dos flujos UI y cuatro validaciones API. La estrategia evita convertir reglas ambiguas en aserciones falsas o frágiles.",artifact:"Playwright + TypeScript",log:["ui_tests: RF-T01 · RF-T02","api_tests: RF-T03 → RF-T06","blocked: RF-T07 → RF-T12","ready: playwright test"]},
    en:{title:"Only verifiable behaviour is automated",copy:"Playwright covers two UI flows and four API checks. The strategy avoids turning ambiguous rules into false or fragile assertions.",artifact:"Playwright + TypeScript",log:["ui_tests: RF-T01 · RF-T02","api_tests: RF-T03 → RF-T06","blocked: RF-T07 → RF-T12","ready: playwright test"]},
    url:`${repo}/tree/main/tests/refund`,
  },
  {
    id:"execution",
    n:"06",
    agent:{es:"PLAYWRIGHT · CHROMIUM",en:"PLAYWRIGHT · CHROMIUM"},
    metric:"6/6",
    metricLabel:{es:"casos aprobados",en:"tests passed"},
    es:{title:"La suite produce evidencia real",copy:"La corrida verificada ejecuta lint, typecheck y Playwright. Los seis escenarios pasan sin fallas, flaky tests ni casos omitidos.",artifact:"Ejecución verificada",log:["project: chromium","passed: 06 · failed: 00","flaky: 00 · skipped: 00","duration: 3.89 seconds"]},
    en:{title:"The suite produces real evidence",copy:"The verified run executes lint, typecheck and Playwright. All six scenarios pass with no failures, flaky tests or skipped cases.",artifact:"Verified execution",log:["project: chromium","passed: 06 · failed: 00","flaky: 00 · skipped: 00","duration: 3.89 seconds"]},
    url:allureReport,
  },
  {
    id:"report",
    n:"07",
    agent:{es:"ORQUESTADOR QA · SALIDA",en:"QA ORCHESTRATOR · OUTPUT"},
    metric:"PASS",
    metricLabel:{es:"con riesgos residuales",en:"with residual risks"},
    es:{title:"El reporte conserva contexto y límites",copy:"El resultado comunica cobertura, evidencia y restricciones. La automatización termina; el criterio humano decide qué está probado y qué continúa pendiente.",artifact:"Reporte final",log:["result: 6 passed · 0 failed","evidence: execution summary","blocked_coverage: 06 scenarios","decision: verified within scope"]},
    en:{title:"The report preserves context and boundaries",copy:"The result communicates coverage, evidence and limitations. Automation ends; human judgement decides what is proven and what remains pending.",artifact:"Final report",log:["result: 6 passed · 0 failed","evidence: execution summary","blocked_coverage: 06 scenarios","decision: verified within scope"]},
    url:`${repo}/blob/main/reports/execution-summary.md`,
  },
] as const;

const copy={
  es:{back:"Portfolio",index:"Cómo trabajo",about:"Sobre mí",flow:"Flujo de QA",cases:"Casos de prueba",repos:"Repositorios",lab:"Agentic QA Lab",workflow:"Flujo de reembolsos",metrics:"Mis métricas",story:"Mi historia",cv:"Descargar CV",contact:"Contacto",eyebrow:"Agentic Quality Engineering · Caso real",title:<>De una historia ambigua a una <em>decisión trazable.</em></>,lead:"Reproducí una ejecución verificada del QA Agent System. Cada etapa muestra qué recibió el agente, qué produjo y dónde intervino el criterio humano.",verified:"Replay de una ejecución verificada · 27 AGO 2026",run:"Ejecutar demo",pause:"Pausar",restart:"Reiniciar",previous:"Anterior",next:"Siguiente",step:"Etapa",of:"de",agentProposes:"MI AGENTE PROPONE.",humanDecides:"YO DECIDO.",artifact:"Artefacto",openEvidence:"Abrir evidencia real",videoLabel:"Evidencia de ejecución · Showcase real",videoTitle:"Mirá un flujo E2E completo.",videoIntro:"Una ejecución de 29,2 segundos en Chromium headed, grabada deliberadamente para mostrar el comportamiento real sin ralentizar la suite habitual.",showcaseTitle:"De producto a checkout",showcaseCopy:"El test inicia sesión, busca Blue Top, valida precio y stock, lo agrega al carrito, revisa el checkout y muestra un resultado PASS. Si no recibe credenciales, crea y elimina una cuenta descartable.",videoFallback:"Abrir video",allureFull:"Explorar evidencia histórica en Allure",reportLabel:"Resultado de la corrida",reportTitle:"6 pasaron. 6 quedaron fuera por decisión, no por olvido.",reportCopy:"La fortaleza del sistema no es automatizar todo: es hacer visible qué está validado, qué permanece bloqueado y por qué.",passed:"Passed",failed:"Failed",duration:"Duración",blocked:"Bloqueados",allureEyebrow:"Evidencia interactiva · GitHub Pages",allureTitle:"Abrir dashboard Allure",allureCopy:"Resultados reales, suites, tiempos y detalle de cada caso. Se publica automáticamente en cada push a main.",allureMeta:"6 passed · 0 failed · Chromium",code:"Ver código",summary:"Ver reporte",investigation:"Ver investigación de falla",note:"Los datos mostrados pertenecen a una corrida real documentada. El botón reproduce su recorrido; no ejecuta Playwright dentro del portfolio."},
  en:{back:"Portfolio",index:"How I work",about:"About me",flow:"QA workflow",cases:"Test cases",repos:"Repositories",lab:"Agentic QA Lab",workflow:"Refund workflow",metrics:"My metrics",story:"My story",cv:"Download CV",contact:"Contact",eyebrow:"Agentic Quality Engineering · Real case",title:<>From an ambiguous story to a <em>traceable decision.</em></>,lead:"Replay a verified QA Agent System run. Every stage shows what the agent received, what it produced and where human judgement intervened.",verified:"Verified execution replay · AUG 27 2026",run:"Run demo",pause:"Pause",restart:"Restart",previous:"Previous",next:"Next",step:"Stage",of:"of",agentProposes:"MY AGENT PROPOSES.",humanDecides:"I DECIDE.",artifact:"Artifact",openEvidence:"Open real evidence",videoLabel:"Execution evidence · Real showcase",videoTitle:"Watch a complete E2E flow.",videoIntro:"A 29.2-second headed Chromium run, deliberately recorded to show real behaviour without slowing down the regular suite.",showcaseTitle:"From product to checkout",showcaseCopy:"The test signs in, searches for Blue Top, validates price and stock, adds it to the cart, reviews checkout and displays a PASS result. Without configured credentials, it creates and removes a disposable account.",videoFallback:"Open video",allureFull:"Explore historical evidence in Allure",reportLabel:"Run result",reportTitle:"6 passed. 6 stayed out by decision, not by omission.",reportCopy:"The system's strength is not automating everything: it makes visible what is validated, what remains blocked and why.",passed:"Passed",failed:"Failed",duration:"Duration",blocked:"Blocked",allureEyebrow:"Interactive evidence · GitHub Pages",allureTitle:"Open Allure dashboard",allureCopy:"Real results, suites, timings and test-level details. It is automatically published on every push to main.",allureMeta:"6 passed · 0 failed · Chromium",code:"View code",summary:"View report",investigation:"View failure investigation",note:"The displayed data belongs to a documented real run. The button replays its journey; it does not execute Playwright inside the portfolio."},
} as const;

export default function AgenticQaLab(){
  const [lang,setLang]=useState<Lang>("es");
  const [theme,setTheme]=useState<Theme>("light");
  const [active,setActive]=useState(0);
  const [running,setRunning]=useState(false);
  const [reducedMotion,setReducedMotion]=useState(false);
  const timer=useRef<ReturnType<typeof setTimeout>|null>(null);

  useEffect(()=>{
    const savedTheme=window.localStorage.getItem("portfolio-theme");
    const preferredTheme=savedTheme==="dark"||savedTheme==="light"?savedTheme:window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";
    const savedLanguage=window.localStorage.getItem("portfolio-language");
    const preferredLanguage=savedLanguage==="en"||savedLanguage==="es"?savedLanguage:"es";
    setTheme(preferredTheme);
    setLang(preferredLanguage);
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    document.documentElement.dataset.theme=preferredTheme;
    document.documentElement.lang=preferredLanguage;
  },[]);

  useEffect(()=>{
    if(!running)return;
    if(active>=stages.length-1){setRunning(false);return;}
    timer.current=setTimeout(()=>setActive(current=>current+1),1450);
    return()=>{if(timer.current)clearTimeout(timer.current);};
  },[active,running]);

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
  const selectStage=(index:number)=>{setRunning(false);setActive(index);};
  const run=()=>{
    if(running){setRunning(false);return;}
    if(reducedMotion){setActive(stages.length-1);return;}
    if(active>=stages.length-1)setActive(0);
    setRunning(true);
  };
  const restart=()=>{setRunning(false);setActive(0);};
  const c=copy[lang];
  const stage=stages[active];
  const content=stage[lang];
  const progress=((active+1)/stages.length)*100;

  return <main className={styles.page} lang={lang}>
    <nav className={styles.nav} aria-label={lang==="es"?"Navegación del Agentic QA Lab":"Agentic QA Lab navigation"}>
      <Link className={styles.logo} href="/" aria-label={lang==="es"?"Ir al inicio":"Go home"}>IM<span>.</span></Link>
      <div className={styles.navLinks}><Link href="/">← {c.back}</Link><details className={styles.navGroup} name="main-navigation"><summary className={styles.navParent}>{c.index} <span aria-hidden="true">↓</span></summary><div className={styles.navDropdown}><Link href="/como-trabajo">{c.flow}</Link><Link href="/agentic-qa-lab" aria-current="page">{c.lab}</Link><Link href="/casos-de-prueba">{c.cases}</Link><Link href="/repositorios">{c.repos}</Link></div></details><details className={styles.navGroup} name="main-navigation"><summary className={styles.navParent}>{c.about} <span aria-hidden="true">↓</span></summary><div className={styles.navDropdown}><Link href="/#work">{c.metrics}</Link><Link href="/#about">{c.story}</Link><a href="/CV-Irina-Malisani-QA-Engineer.pdf" download>CV — {c.cv}</a><Link href="/#contact">{c.contact}</Link></div></details></div>
      <div className={styles.controls}><button className={styles.theme} type="button" onClick={toggleTheme} aria-label={lang==="es"?(theme==="dark"?"Activar modo claro":"Activar modo oscuro"):(theme==="dark"?"Use light mode":"Use dark mode")}><span aria-hidden="true">{theme==="dark"?"☀":"☾"}</span></button><button className={`${styles.language} ${lang==="es"?styles.spanish:""}`} type="button" onClick={toggleLanguage} aria-pressed={lang==="es"} aria-label={lang==="es"?"View in English":"Ver en español"}><span className={lang==="en"?styles.active:""}>EN</span><i/><span className={lang==="es"?styles.active:""}>ES</span></button></div>
    </nav>

    <header className={styles.hero}>
      <p className={styles.eyebrow}>{c.eyebrow}</p>
      <h1>{c.title}</h1>
      <div className={styles.heroBottom}><p>{c.lead}</p><span>{c.verified}</span></div>
    </header>

    <section className={styles.lab} aria-labelledby="lab-title">
      <div className={styles.labTop}>
        <div><p className={styles.eyebrow}>01 — {c.lab}</p><h2 id="lab-title">{c.workflow}</h2></div>
        <div className={styles.runControls}><button type="button" className={styles.runButton} onClick={run}>{running?c.pause:c.run} <span aria-hidden="true">{running?"Ⅱ":"▶"}</span></button><button type="button" className={styles.secondaryButton} onClick={restart}>{c.restart}</button></div>
      </div>

      <div className={styles.progressMeta}><span>{c.step} {active+1} {c.of} {stages.length}</span><span>{Math.round(progress)}%</span></div>
      <div className={styles.progressTrack} role="progressbar" aria-valuemin={1} aria-valuemax={stages.length} aria-valuenow={active+1} aria-label={lang==="es"?"Progreso de la ejecución":"Execution progress"}><span style={{width:`${progress}%`}}/></div>

      <ol className={styles.stageNav}>{stages.map((item,index)=><li key={item.id} className={index<active?styles.complete:index===active?styles.current:""}><button type="button" onClick={()=>selectStage(index)} aria-current={index===active?"step":undefined}><span>{item.n}</span><b>{item.agent[lang]}</b></button></li>)}</ol>

      <div className={styles.stage} aria-live="polite">
        <article className={styles.narrative}>
          <p>{stage.agent[lang]}</p>
          <h3>{content.title}</h3>
          <p>{content.copy}</p>
          <div className={styles.judgement}><strong>{c.agentProposes}</strong><span>{c.humanDecides}</span></div>
          <a href={stage.url} target="_blank" rel="noreferrer">{c.openEvidence} ↗</a>
        </article>

        <div className={`${styles.evidenceWindow} ${running?styles.isRunning:""}`}>
          <div className={styles.windowBar}><span/><span/><span/><b>qa-agent-system / {stage.id}</b></div>
          <div className={styles.windowBody}>
            <div className={styles.metric}><strong>{stage.metric}</strong><span>{stage.metricLabel[lang]}</span></div>
            <div className={styles.terminal}>{content.log.map((line,index)=><p key={line}><span>{String(index+1).padStart(2,"0")}</span><code>{line}</code><b>{index===content.log.length-1?"●":"✓"}</b></p>)}</div>
            <div className={styles.artifact}><span>{c.artifact}</span><strong>{content.artifact}</strong></div>
          </div>
        </div>
      </div>

      <div className={styles.stepControls}><button type="button" onClick={()=>selectStage(Math.max(0,active-1))} disabled={active===0}>← {c.previous}</button><button type="button" onClick={()=>selectStage(Math.min(stages.length-1,active+1))} disabled={active===stages.length-1}>{c.next} →</button></div>
      <p className={styles.disclosure}>{c.note}</p>
    </section>

    <section className={styles.videoEvidence} aria-labelledby="video-evidence-title">
      <header className={styles.videoHeader}>
        <div><p className={styles.eyebrow}>{c.videoLabel}</p><h2 id="video-evidence-title">{c.videoTitle}</h2></div>
        <p>{c.videoIntro}</p>
      </header>
      <figure className={styles.showcaseCard}>
        <div className={styles.videoFrame}>
          <video controls muted preload="metadata" playsInline aria-label={c.showcaseTitle}>
            <source src="/evidence/videos/ecommerce-showcase.webm" type="video/webm"/>
            <a href="/evidence/videos/ecommerce-showcase.webm">{c.videoFallback}</a>
          </video>
          <span>29.2 s · Passed · E2E</span>
        </div>
        <figcaption><div><span>Portfolio showcase · Chromium headed</span><h3>{c.showcaseTitle}</h3></div><p>{c.showcaseCopy}</p></figcaption>
      </figure>
      <a className={styles.videoReportLink} href={allureReport} target="_blank" rel="noreferrer">{c.allureFull} ↗</a>
    </section>

    <section className={styles.report} aria-labelledby="report-title">
      <header><div><p className={styles.eyebrow}>{c.reportLabel}</p><h2 id="report-title">{c.reportTitle}</h2></div><p>{c.reportCopy}</p></header>
      <div className={styles.reportGrid}><article><span>{c.passed}</span><strong>06</strong></article><article><span>{c.failed}</span><strong>00</strong></article><article><span>{c.duration}</span><strong>3.89s</strong></article><article><span>{c.blocked}</span><strong>06</strong></article></div>
      <a className={styles.allureCard} href={allureReport} target="_blank" rel="noreferrer">
        <div><span>{c.allureEyebrow}</span><h3>{c.allureTitle}</h3><p>{c.allureCopy}</p></div>
        <div className={styles.allureAction}><span>{c.allureMeta}</span><b aria-hidden="true">↗</b></div>
      </a>
      <div className={styles.reportLinks}><a href={`${repo}/tree/main/tests/refund`} target="_blank" rel="noreferrer">{c.code} ↗</a><a href={`${repo}/blob/main/reports/execution-summary.md`} target="_blank" rel="noreferrer">{c.summary} ↗</a><a href={`${repo}/blob/main/reports/failure-investigation-2026-08-26.md`} target="_blank" rel="noreferrer">{c.investigation} ↗</a></div>
    </section>
  </main>;
}
