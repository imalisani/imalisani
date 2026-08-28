"use client";

import {useEffect,useRef,useState,type CSSProperties} from "react";
import styles from "./agent-system-scroll.module.css";

type Lang="es"|"en";
type Localized={es:string;en:string};

const repo="https://github.com/imalisani/qa-agents-demo";
const allureReport="https://imalisani.github.io/qa-agents-demo/";

type WorkflowStep={
  id:string;
  number:string;
  agent:Localized;
  eyebrow:Localized;
  title:Localized;
  body:Localized;
  metric:string;
  metricLabel:Localized;
  artifact:Localized;
  logs:{es:string[];en:string[]};
  activeNodes:string[];
  url:string;
  conditional?:boolean;
  code?:string[];
};

const workflow:WorkflowStep[]=[
  {
    id:"story",number:"01",agent:{es:"Entrada",en:"Input"},eyebrow:{es:"Historia o cambio",en:"Story or change"},
    title:{es:"El contexto entra al sistema",en:"Context enters the system"},
    body:{es:"La historia, el bug o el diff llega con sus criterios, alcance y restricciones. Todavía no se asume qué debe probarse.",en:"The story, bug or diff arrives with its criteria, scope and constraints. The system does not assume what should be tested yet."},
    metric:"01",metricLabel:{es:"entrada trazable",en:"traceable input"},artifact:{es:"Historia de usuario",en:"User story"},
    logs:{es:["entrada: refund-user-story.md","alcance: reembolsos completos + parciales","estado: requiere análisis"],en:["input: refund-user-story.md","scope: full + partial refunds","status: analysis required"]},
    activeNodes:["story"],url:`${repo}/blob/main/test-plans/refund-requirement-analysis.md`,
  },
  {
    id:"orchestrator",number:"02",agent:{es:"QA Orchestrator",en:"QA Orchestrator"},eyebrow:{es:"Inspección y delegación",en:"Inspection and delegation"},
    title:{es:"El orquestador decide la ruta",en:"The orchestrator chooses the route"},
    body:{es:"Inspecciona el proyecto, determina qué especialistas hacen falta, coordina el orden y conserva el contexto hasta el resultado final.",en:"It inspects the project, determines which specialists are needed, coordinates their order and preserves context through the final result."},
    metric:"11",metricLabel:{es:"agentes disponibles",en:"available agents"},artifact:{es:"Plan de orquestación",en:"Orchestration plan"},
    logs:{es:["proyecto: inspeccionado","ruta: requirements → risk → design","especialistas: seleccionados bajo demanda"],en:["project: inspected","route: requirements → risk → design","specialists: selected on demand"]},
    activeNodes:["orchestrator","pr","accessibility","performance"],url:`${repo}#agentes-disponibles`,
  },
  {
    id:"requirements",number:"03",agent:{es:"Requirements Agent",en:"Requirements Agent"},eyebrow:{es:"Comportamiento esperado",en:"Expected behaviour"},
    title:{es:"Pregunta antes de completar vacíos",en:"It asks before filling gaps"},
    body:{es:"Separa reglas confirmadas, ambigüedades y requisitos faltantes. Produce preguntas para Producto o Desarrollo y nunca inventa reglas.",en:"It separates confirmed rules, ambiguities and missing requirements. It produces questions for Product or Engineering and never invents rules."},
    metric:"09",metricLabel:{es:"ambigüedades detectadas",en:"ambiguities detected"},artifact:{es:"Análisis de requerimientos",en:"Requirements analysis"},
    logs:{es:["reglas_confirmadas: 11","preguntas_abiertas: 09","decisión: testabilidad parcial"],en:["confirmed_rules: 11","open_questions: 09","decision: partial testability"]},
    activeNodes:["requirements"],url:`${repo}/blob/main/test-plans/refund-requirement-analysis.md`,
  },
  {
    id:"risk",number:"04",agent:{es:"Risk Agent",en:"Risk Agent"},eyebrow:{es:"Priorización",en:"Prioritization"},
    title:{es:"El riesgo define qué importa primero",en:"Risk defines what matters first"},
    body:{es:"Evalúa impacto de negocio y técnico: finanzas, seguridad, concurrencia, integraciones, datos y regresión. Cada riesgo recibe una prioridad explícita.",en:"It evaluates business and technical impact: finance, security, concurrency, integrations, data and regression. Every risk receives an explicit priority."},
    metric:"10",metricLabel:{es:"riesgos priorizados",en:"prioritized risks"},artifact:{es:"Matriz de riesgos",en:"Risk matrix"},
    logs:{es:["critical: R-01 · R-02 · R-03 · R-05","high: R-04 · R-06","riesgo_residual: documentado"],en:["critical: R-01 · R-02 · R-03 · R-05","high: R-04 · R-06","residual_risk: documented"]},
    activeNodes:["risk"],url:`${repo}/blob/main/test-plans/refund-risk-assessment.md`,
  },
  {
    id:"design",number:"05",agent:{es:"Test Design Agent",en:"Test Design Agent"},eyebrow:{es:"Trazabilidad y Gherkin",en:"Traceability and Gherkin"},
    title:{es:"Los riesgos se convierten en escenarios",en:"Risks become scenarios"},
    body:{es:"Genera la tabla de trazabilidad y casos Gherkin con Feature, Scenario, Given, When y Then. Los supuestos no confirmados permanecen visibles como bloqueados.",en:"It generates the traceability table and Gherkin cases with Feature, Scenario, Given, When and Then. Unconfirmed assumptions remain visibly blocked."},
    metric:"12",metricLabel:{es:"escenarios trazables",en:"traceable scenarios"},artifact:{es:"Plan y casos en Gherkin",en:"Plan and Gherkin cases"},
    logs:{es:["RF-T04 · critical · automated","RF-T07 · critical · blocked","trazabilidad: riesgo ↔ escenario"],en:["RF-T04 · critical · automated","RF-T07 · critical · blocked","traceability: risk ↔ scenario"]},
    activeNodes:["design"],url:`${repo}/blob/main/test-plans/refund-test-plan.md`,
    code:["@RF-T04 @critical @risk-R03","Scenario: retry does not duplicate a refund","Given an order with refundable balance","When the request is submitted twice","Then exactly one refund exists"],
  },
  {
    id:"automation",number:"06",agent:{es:"Automation Agent",en:"Automation Agent"},eyebrow:{es:"Decisión de cobertura",en:"Coverage decision"},
    title:{es:"Solo automatiza lo seguro y útil",en:"It automates only what is safe and useful"},
    body:{es:"Prioriza escenarios Critical y High con resultados deterministas. Selecciona la cobertura y delega la implementación a UI Automation o API.",en:"It prioritizes Critical and High scenarios with deterministic outcomes. It selects coverage and delegates implementation to UI Automation or API."},
    metric:"06",metricLabel:{es:"casos automatizables",en:"automatable cases"},artifact:{es:"Estrategia de automatización",en:"Automation strategy"},
    logs:{es:["prioridad: critical + high","automatizables: 06","bloqueados_por_requisitos: 06"],en:["priority: critical + high","automatable: 06","blocked_by_requirements: 06"]},
    activeNodes:["automation"],url:`${repo}/tree/main/tests/refund`,
  },
  {
    id:"implementation",number:"07",agent:{es:"UI Automation + API",en:"UI Automation + API"},eyebrow:{es:"Implementación especializada",en:"Specialist implementation"},
    title:{es:"La cobertura se divide por interfaz",en:"Coverage branches by interface"},
    body:{es:"UI Automation usa locators accesibles, assertions web-first y datos aislados. API valida contratos, autenticación, errores, idempotencia, estados y efectos secundarios.",en:"UI Automation uses accessible locators, web-first assertions and isolated data. API validates contracts, authentication, errors, idempotency, states and side effects."},
    metric:"2+4",metricLabel:{es:"UI + API",en:"UI + API"},artifact:{es:"Playwright + TypeScript",en:"Playwright + TypeScript"},
    logs:{es:["ui: 02 escenarios visibles","api: 04 validaciones","esperas_fijas: 00"],en:["ui: 02 visible scenarios","api: 04 validations","fixed_waits: 00"]},
    activeNodes:["ui","api"],url:`${repo}/tree/main/tests`,
  },
  {
    id:"playwright",number:"08",agent:{es:"Playwright",en:"Playwright"},eyebrow:{es:"Ejecución",en:"Execution"},
    title:{es:"La suite produce evidencia real",en:"The suite produces real evidence"},
    body:{es:"Playwright ejecuta los tests. En modo portfolio abre Chromium headed, aplica el pacing del showcase y genera video, trazas y screenshots sin alterar la suite normal.",en:"Playwright runs the tests. Portfolio mode opens headed Chromium, applies showcase pacing and generates video, traces and screenshots without changing the regular suite."},
    metric:"6/6",metricLabel:{es:"tests aprobados",en:"tests passed"},artifact:{es:"Ejecución verificada",en:"Verified execution"},
    logs:{es:["comando: npm run test:portfolio","navegador: chromium headed","video: ecommerce-showcase.webm"],en:["command: npm run test:portfolio","browser: headed chromium","video: ecommerce-showcase.webm"]},
    activeNodes:["playwright"],url:allureReport,
  },
  {
    id:"failure",number:"09",agent:{es:"Failure Analysis Agent",en:"Failure Analysis Agent"},eyebrow:{es:"Ruta condicional",en:"Conditional route"},
    title:{es:"Un fallo se investiga antes de llamarlo bug",en:"A failure is investigated before it becomes a bug"},
    body:{es:"Solo se activa si algo falla. Clasifica el origen como producto, automatización, datos, entorno o requisito ambiguo y devuelve contexto al orquestador.",en:"It activates only when something fails. It classifies the source as product, automation, data, environment or ambiguous requirement and returns context to the orchestrator."},
    metric:"IF",metricLabel:{es:"existen fallos",en:"failures exist"},artifact:{es:"Diagnóstico de falla",en:"Failure diagnosis"},
    logs:{es:["condición: failed > 0","clasificación: 5 categorías","salida: diagnóstico + evidencia"],en:["condition: failed > 0","classification: 5 categories","output: diagnosis + evidence"]},
    activeNodes:["failure"],url:`${repo}/blob/main/reports/failure-investigation-2026-08-26.md`,conditional:true,
  },
  {
    id:"report",number:"10",agent:{es:"QA Orchestrator",en:"QA Orchestrator"},eyebrow:{es:"Consolidación",en:"Consolidation"},
    title:{es:"Todo vuelve como una decisión trazable",en:"Everything returns as a traceable decision"},
    body:{es:"El orquestador reúne cobertura, límites, resultados y evidencia. Allure presenta la ejecución; las trazas, screenshots y el video permiten auditarla.",en:"The orchestrator consolidates coverage, limits, results and evidence. Allure presents the run; traces, screenshots and video make it auditable."},
    metric:"PASS",metricLabel:{es:"dentro del alcance",en:"within scope"},artifact:{es:"Reporte y evidencia final",en:"Final report and evidence"},
    logs:{es:["resultado: 06 passed · 00 failed","evidencia: allure + traces + video","decisión: verificado dentro del alcance"],en:["result: 06 passed · 00 failed","evidence: allure + traces + video","decision: verified within scope"]},
    activeNodes:["report","orchestrator"],url:allureReport,
  },
];

type SystemNode={id:string;label:Localized;x:number;y:number;step:number;core?:boolean;conditional?:boolean};
type SpecialistNode={id:string;label:Localized;x:number;y:number};
type FlowPath={step:number;x1:number;y1:number;x2:number;y2:number;conditional?:boolean};

const nodes:SystemNode[]=[
  {id:"story",label:{es:"Historia",en:"Story"},x:8,y:51,step:0},
  {id:"orchestrator",label:{es:"QA Orchestrator",en:"QA Orchestrator"},x:50,y:49,step:1,core:true},
  {id:"requirements",label:{es:"Requisitos",en:"Requirements"},x:27,y:17,step:2},
  {id:"risk",label:{es:"Riesgos",en:"Risk"},x:50,y:10,step:3},
  {id:"design",label:{es:"Diseño",en:"Design"},x:74,y:17,step:4},
  {id:"automation",label:{es:"Automatización",en:"Automation"},x:88,y:48,step:5},
  {id:"ui",label:{es:"UI",en:"UI"},x:74,y:79,step:6},
  {id:"api",label:{es:"API",en:"API"},x:55,y:89,step:6},
  {id:"playwright",label:{es:"Playwright",en:"Playwright"},x:31,y:83,step:7},
  {id:"failure",label:{es:"Análisis de falla",en:"Failure analysis"},x:10,y:76,step:8,conditional:true},
  {id:"report",label:{es:"Reporte",en:"Report"},x:12,y:23,step:9},
] ;

const specialists:SpecialistNode[]=[
  {id:"pr",label:{es:"PR Analysis",en:"PR Analysis"},x:37,y:34},
  {id:"accessibility",label:{es:"Accesibilidad",en:"Accessibility"},x:63,y:34},
  {id:"performance",label:{es:"Performance",en:"Performance"},x:50,y:70},
] ;

const paths:FlowPath[]=[
  {step:0,x1:8,y1:51,x2:50,y2:49},
  {step:2,x1:50,y1:49,x2:27,y2:17},
  {step:3,x1:27,y1:17,x2:50,y2:10},
  {step:4,x1:50,y1:10,x2:74,y2:17},
  {step:5,x1:74,y1:17,x2:88,y2:48},
  {step:6,x1:88,y1:48,x2:74,y2:79},
  {step:6,x1:88,y1:48,x2:55,y2:89},
  {step:7,x1:74,y1:79,x2:31,y2:83},
  {step:7,x1:55,y1:89,x2:31,y2:83},
  {step:8,x1:31,y1:83,x2:10,y2:76,conditional:true},
  {step:9,x1:31,y1:83,x2:12,y2:23},
  {step:9,x1:10,y1:76,x2:12,y2:23,conditional:true},
  {step:9,x1:12,y1:23,x2:50,y2:49},
] ;

const sectionCopy={
  es:{eyebrow:"01 — Sistema Agentic QA",title:"Observá al orquestador en acción.",lead:"Desplazate para seguir cómo el contexto se transforma en requisitos, riesgos, casos, automatización y evidencia. El orquestador conserva el control de principio a fin.",scroll:"Desplazate para ejecutar",specialists:"Especialistas bajo demanda",conditional:"Ruta condicional",artifact:"Salida de esta etapa",open:"Abrir evidencia",progress:"Progreso del sistema"},
  en:{eyebrow:"01 — Agentic QA System",title:"Watch the orchestrator in action.",lead:"Scroll to follow how context becomes requirements, risks, cases, automation and evidence. The orchestrator remains in control from start to finish.",scroll:"Scroll to execute",specialists:"On-demand specialists",conditional:"Conditional route",artifact:"Stage output",open:"Open evidence",progress:"System progress"},
} as const;

export default function AgentSystemScroll({lang}:{lang:Lang}){
  const [active,setActive]=useState(0);
  const stepRefs=useRef<Array<HTMLElement|null>>([]);
  const c=sectionCopy[lang];
  const current=workflow[active];

  useEffect(()=>{
    const observer=new IntersectionObserver(entries=>{
      const visible=entries.filter(entry=>entry.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
      if(visible)setActive(Number((visible.target as HTMLElement).dataset.stepIndex));
    },{rootMargin:"-38% 0px -38% 0px",threshold:[0,.1,.25,.5]});
    stepRefs.current.forEach(step=>{if(step)observer.observe(step);});
    return()=>observer.disconnect();
  },[]);

  const goToStep=(index:number)=>{
    const behavior=window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth";
    stepRefs.current[index]?.scrollIntoView({behavior,block:"center"});
  };

  return <section className={styles.section} aria-labelledby="agent-system-title">
    <header className={styles.intro}>
      <div><p>{c.eyebrow}</p><h2 id="agent-system-title">{c.title}</h2></div>
      <div><p>{c.lead}</p><span>{c.scroll} <b aria-hidden="true">↓</b></span></div>
    </header>

    <div className={styles.scrolly}>
      <div className={styles.visualWrap}>
        <div className={styles.systemPanel}>
          <div className={styles.panelHeader}>
            <span>QA-AGENT-SYSTEM / LIVE</span>
            <div className={styles.progress} role="progressbar" aria-label={c.progress} aria-valuemin={1} aria-valuemax={workflow.length} aria-valuenow={active+1}><i style={{width:`${((active+1)/workflow.length)*100}%`}}/></div>
            <b>{current.number}/{String(workflow.length).padStart(2,"0")}</b>
          </div>

          <div className={styles.networkCanvas}>
            <div className={styles.gridGlow}/>
            <div className={styles.orbitOne}/><div className={styles.orbitTwo}/>
            <svg className={styles.connections} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              {paths.map((path,index)=><line key={`${path.step}-${index}`} x1={path.x1} y1={path.y1} x2={path.x2} y2={path.y2} className={`${path.step===active?styles.pathActive:path.step<active?styles.pathComplete:""} ${path.conditional?styles.pathConditional:""}`}/>) }
              <line x1="50" y1="49" x2="37" y2="34" className={active===1?styles.pathActive:styles.pathOptional}/>
              <line x1="50" y1="49" x2="63" y2="34" className={active===1?styles.pathActive:styles.pathOptional}/>
              <line x1="50" y1="49" x2="50" y2="70" className={active===1?styles.pathActive:styles.pathOptional}/>
            </svg>

            {nodes.map(node=>{
              const state=node.step===active?styles.nodeActive:node.step<active?styles.nodeComplete:styles.nodeIdle;
              return <button key={node.id} type="button" onClick={()=>goToStep(node.step)} className={`${styles.node} ${node.core?styles.core:""} ${node.conditional?styles.conditional:""} ${state}`} style={{"--x":`${node.x}%`,"--y":`${node.y}%`} as CSSProperties} aria-label={node.label[lang]} aria-current={node.step===active?"step":undefined}>
                <i/><span>{node.label[lang]}</span>{node.conditional&&<small>IF</small>}
              </button>;
            })}

            {specialists.map(node=><div key={node.id} className={`${styles.specialist} ${active===1?styles.specialistActive:""}`} style={{"--x":`${node.x}%`,"--y":`${node.y}%`} as CSSProperties}><i/><span>{node.label[lang]}</span></div>)}
            <span className={styles.specialistLabel}>{c.specialists}</span>
          </div>

          <div className={styles.outputPanel} aria-live="polite">
            <div className={styles.outputTop}><span>{current.agent[lang]}</span>{current.conditional&&<b>{c.conditional}</b>}</div>
            <div className={styles.outputBody}>
              <div className={styles.metric}><strong className={current.metric.length>3?styles.metricWord:undefined}>{current.metric}</strong><span>{current.metricLabel[lang]}</span></div>
              <div className={styles.logs}>{current.logs[lang].map((log,index)=><p key={log}><span>{String(index+1).padStart(2,"0")}</span><code>{log}</code><b>{index===current.logs[lang].length-1?"●":"✓"}</b></p>)}</div>
              {current.code&&<pre className={styles.codeSample}>{current.code.join("\n")}</pre>}
              <div className={styles.outputFooter}><span>{c.artifact}</span><strong>{current.artifact[lang]}</strong><a href={current.url} target="_blank" rel="noreferrer">{c.open} ↗</a></div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.steps}>
        {workflow.map((step,index)=><article key={step.id} ref={element=>{stepRefs.current[index]=element;}} data-step-index={index} className={`${styles.step} ${index===active?styles.stepActive:index<active?styles.stepComplete:""}`}>
          <div className={styles.stepCard}>
            <div className={styles.stepMeta}><span>{step.number}</span><b>{step.agent[lang]}</b>{step.conditional&&<i>{c.conditional}</i>}</div>
            <p className={styles.stepEyebrow}>{step.eyebrow[lang]}</p>
            <h3>{step.title[lang]}</h3>
            <p>{step.body[lang]}</p>
            <div className={styles.stepArtifact}><span>{c.artifact}</span><strong>{step.artifact[lang]}</strong></div>
          </div>
        </article>)}
      </div>
    </div>
  </section>;
}
