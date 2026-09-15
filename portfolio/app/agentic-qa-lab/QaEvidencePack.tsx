"use client";

import {useEffect,useState,type ReactNode} from "react";
import styles from "./qa-evidence-pack.module.css";

type Lang="es"|"en";
type RunStatus="passed"|"partial"|"failed";
type GateStatus=RunStatus;

type QaEvidence={
  schemaVersion:number;
  status:RunStatus;
  commit:string;
  runId:string;
  generatedAt:string;
  source:string;
  tests:{
    total:number;passed:number;failed:number;skipped:number;
    api:number;ui:number;accessibility:number;data:number;
    integration:number;security:number;unit:number;
  };
  coverage:{branches:number|null;gateMinimum:number};
  performance:{
    profile:string;p95Ms:number|null;errorRate:number|null;
    throughputRps:number|null;requests:number|null;checksRate:number|null;
    guardrail:string;guardrailType:string;
  };
  gates:Record<string,{status:GateStatus;tests?:number;failed?:number;profile?:string}>;
  missingRequiredEvidence:string[];
  limitations:string[];
};

const repo="https://github.com/imalisani/qa-agents-demo";
const allureReport="https://imalisani.github.io/qa-agents-demo/";
const publicEvidence=`${allureReport}qa-evidence.json`;

const copy={
  es:{
    eyebrow:"03 — Evidencia verificada",title:"QA Evidence Pack",
    intro:"No solo qué cubre el laboratorio. Qué ejecutó realmente el último quality gate.",
    latest:"Última ejecución verificada",loading:"Cargando evidencia",unavailable:"Evidencia temporalmente no disponible.",
    environment:"GitHub Actions · entorno demo / CI",checks:"Checks automatizados",coverage:"Cobertura de ramas en alcance",
    passed:"aprobados",failed:"fallidos",skipped:"omitidos",gate:"Gate",layers:"Capas de calidad",
    performance:"Performance · k6",gates:"Gates de calidad",profile:"Perfil",p95:"Latencia p95",
    httpFailures:"Fallos HTTP",throughput:"Throughput",requests:"Requests",checksRate:"Checks",
    performanceContext:"Resultado observado en el entorno demo/CI. No representa capacidad productiva ni un SLO de producto.",
    provenance:"Proveniencia",commit:"Commit",run:"CI run",generated:"Generado",
    limitations:"Qué no demuestra esta evidencia",allure:"Ver Allure",evidence:"Ver QA Evidence",github:"GitHub",ci:"CI",
    openEvidence:"Abrir evidencia verificada",tests:"tests",status:{passed:"Aprobado",partial:"Parcial",failed:"Falló"},
    layer:{api:"API",ui:"UI",accessibility:"Accesibilidad",data:"Datos",integration:"Integración",security:"Seguridad",unit:"Unitarias"},
    gateName:{functional:"Funcional",integration:"Integración",security:"Seguridad",data:"Datos / PostgreSQL",unit:"Unitarias",performance:"Performance"},
  },
  en:{
    eyebrow:"03 — Verified evidence",title:"QA Evidence Pack",
    intro:"Not just what the lab covers. What the latest quality gate actually executed.",
    latest:"Latest verified run",loading:"Loading evidence",unavailable:"Evidence temporarily unavailable.",
    environment:"GitHub Actions · demo / CI environment",checks:"Automated checks",coverage:"Scoped branch coverage",
    passed:"passed",failed:"failed",skipped:"skipped",gate:"Gate",layers:"Quality layers",
    performance:"Performance · k6",gates:"Quality gates",profile:"Profile",p95:"P95 latency",
    httpFailures:"HTTP failures",throughput:"Throughput",requests:"Requests",checksRate:"Checks",
    performanceContext:"Observed in the demo/CI environment. Not a production capacity claim or Product SLO.",
    provenance:"Provenance",commit:"Commit",run:"CI run",generated:"Generated",
    limitations:"What this evidence does not prove",allure:"View Allure",evidence:"View QA Evidence",github:"GitHub",ci:"CI",
    openEvidence:"Open verified evidence",tests:"tests",status:{passed:"Passed",partial:"Partial",failed:"Failed"},
    layer:{api:"API",ui:"UI",accessibility:"Accessibility",data:"Data",integration:"Integration",security:"Security",unit:"Unit"},
    gateName:{functional:"Functional",integration:"Integration",security:"Security",data:"Data / PostgreSQL",unit:"Unit",performance:"Performance"},
  },
} as const;

const limitationEs:Record<string,string>={
  "Performance values describe the current runner and are not a production SLO.":"Los valores de performance describen el runner actual y no representan un SLO de producción.",
  "The external refund provider is simulated and deterministic.":"El proveedor externo de reembolsos está simulado y es determinista.",
  "Authentication and authorization are outside the current demo scope.":"La autenticación y la autorización están fuera del alcance actual de la demo.",
};

const layerKeys=["api","ui","accessibility","data","integration","security","unit"] as const;

function isNumber(value:unknown):value is number{return typeof value==="number"&&Number.isFinite(value);}
function isEvidence(value:unknown):value is QaEvidence{
  if(!value||typeof value!=="object")return false;
  const evidence=value as Partial<QaEvidence>;
  const tests=evidence.tests as QaEvidence["tests"]|undefined;
  const coverage=evidence.coverage as QaEvidence["coverage"]|undefined;
  const performance=evidence.performance as QaEvidence["performance"]|undefined;
  return evidence.schemaVersion===1&&["passed","partial","failed"].includes(evidence.status??"")
    &&typeof evidence.commit==="string"&&typeof evidence.runId==="string"&&typeof evidence.generatedAt==="string"
    &&!!tests&&[tests.total,tests.passed,tests.failed,tests.skipped,...layerKeys.map(key=>tests[key])].every(isNumber)
    &&!!coverage&&(coverage.branches===null||isNumber(coverage.branches))&&isNumber(coverage.gateMinimum)
    &&!!performance&&typeof performance.profile==="string"&&!!evidence.gates&&typeof evidence.gates==="object"
    &&Array.isArray(evidence.limitations)&&evidence.limitations.every(item=>typeof item==="string");
}

function formatNumber(value:number|null,digits=2,lang:Lang="en"){
  if(value===null)return "—";
  return new Intl.NumberFormat(lang==="es"?"es-AR":"en-US",{maximumFractionDigits:digits}).format(value);
}

function formatTimestamp(value:string,lang:Lang){
  const date=new Date(value);
  if(Number.isNaN(date.getTime()))return value;
  return new Intl.DateTimeFormat(lang==="es"?"es-AR":"en-US",{dateStyle:"medium",timeStyle:"short",timeZone:"America/Buenos_Aires"}).format(date);
}

function MetaLink({href,label,children}:{href:string;label:string;children:ReactNode}){
  return <a href={href} target="_blank" rel="noreferrer" aria-label={label} title={label}>{children} <span aria-hidden="true">↗</span></a>;
}

function LoadingFrame({lang}:{lang:Lang}){
  const c=copy[lang];
  return <div className={`${styles.frame} ${styles.loadingFrame}`} aria-live="polite" aria-busy="true">
    <div className={styles.statusBar}><div><span>{c.latest}</span><p>{c.loading}</p></div><strong className={styles.loadingStatus}>—</strong></div>
    <div className={styles.primaryMetrics}>
      <article><strong>—</strong><span>{c.checks}</span><p>—</p></article>
      <article><strong>—</strong><span>{c.coverage}</span><p>{c.gate} ≥ —</p></article>
    </div>
    <section className={styles.layers}><h3>{c.layers}</h3><div>{layerKeys.map(key=><article key={key}><span>{c.layer[key]}</span><strong>—</strong></article>)}</div></section>
    <div className={styles.detailGrid}>
      <section className={styles.gates}><h3>{c.gates}</h3><div className={styles.placeholderRows}>{Array.from({length:6},(_,index)=><p key={index}>—</p>)}</div></section>
      <section className={styles.performance}><h3>{c.performance}</h3><div className={styles.placeholderRows}>{Array.from({length:6},(_,index)=><p key={index}>—</p>)}</div><p className={styles.context}>{c.performanceContext}</p></section>
    </div>
    <section className={styles.provenance}><h3>{c.provenance}</h3><div><span>{c.commit}</span><strong>—</strong></div><div><span>{c.run}</span><strong>—</strong></div><div><span>{c.generated}</span><strong>—</strong></div></section>
    <section className={styles.limitations}><h3>{c.limitations}</h3><p>—</p></section>
    <div className={styles.actions}><span>—</span></div>
  </div>;
}

function ErrorFrame({lang}:{lang:Lang}){
  const c=copy[lang];
  return <div className={`${styles.frame} ${styles.errorFrame}`} role="status">
    <div className={styles.statusBar}><div><span>{c.latest}</span><p>{c.environment}</p></div><strong className={styles.loadingStatus}>—</strong></div>
    <div className={styles.errorBody}><p>{c.unavailable}</p><a href={publicEvidence} target="_blank" rel="noreferrer">{c.openEvidence} <span aria-hidden="true">→</span></a></div>
  </div>;
}

function EvidenceFrame({evidence,lang}:{evidence:QaEvidence;lang:Lang}){
  const c=copy[lang];
  const commitValid=/^[a-f0-9]{40}$/i.test(evidence.commit);
  const runValid=/^\d+$/.test(evidence.runId);
  const commitHref=commitValid?`${repo}/commit/${evidence.commit}`:repo;
  const runHref=runValid?`${repo}/actions/runs/${evidence.runId}`:`${repo}/actions`;
  const timestamp=formatTimestamp(evidence.generatedAt,lang);

  return <div className={styles.frame}>
    <div className={styles.statusBar}>
      <div><span>{c.latest}</span><p>{timestamp} · {c.environment}</p></div>
      <strong data-status={evidence.status}><i aria-hidden="true"/>{c.status[evidence.status]}</strong>
    </div>

    <div className={styles.primaryMetrics}>
      <article><strong>{evidence.tests.total}</strong><span>{c.checks}</span><p>{evidence.tests.passed} {c.passed} · {evidence.tests.failed} {c.failed} · {evidence.tests.skipped} {c.skipped}</p></article>
      <article><strong>{evidence.coverage.branches===null?"—":`${formatNumber(evidence.coverage.branches,1,lang)}%`}</strong><span>{c.coverage}</span><p>{c.gate} ≥ {formatNumber(evidence.coverage.gateMinimum,1,lang)}%</p></article>
    </div>

    <section className={styles.layers}>
      <h3>{c.layers}</h3>
      <div>{layerKeys.map(key=><article key={key}><span>{c.layer[key]}</span><strong>{evidence.tests[key]}</strong></article>)}</div>
    </section>

    <div className={styles.detailGrid}>
      <section className={styles.gates}>
        <h3>{c.gates}</h3>
        <div>{Object.entries(evidence.gates).map(([key,gate])=>{
          const label=key in c.gateName?c.gateName[key as keyof typeof c.gateName]:key.replaceAll("_"," ");
          const detail=typeof gate.tests==="number"?`${gate.tests} ${c.tests}`:gate.profile?.toUpperCase()??"";
          return <div className={styles.gateRow} key={key} data-status={gate.status}><span aria-hidden="true">{gate.status==="passed"?"✓":gate.status==="failed"?"×":"!"}</span><strong>{label}</strong><small>{detail}</small><i className={styles.srOnly}>{c.status[gate.status]}</i></div>;
        })}</div>
      </section>

      <section className={styles.performance}>
        <h3>{c.performance}</h3>
        <dl>
          <div><dt>{c.profile}</dt><dd>{evidence.performance.profile.toUpperCase()}</dd></div>
          <div><dt>{c.p95}</dt><dd>{formatNumber(evidence.performance.p95Ms,2,lang)} ms</dd></div>
          <div><dt>{c.httpFailures}</dt><dd>{evidence.performance.errorRate===null?"—":`${formatNumber(evidence.performance.errorRate*100,2,lang)} %`}</dd></div>
          <div><dt>{c.throughput}</dt><dd>{evidence.performance.throughputRps===null?"—":`${formatNumber(evidence.performance.throughputRps,2,lang)} req/s`}</dd></div>
          <div><dt>{c.requests}</dt><dd>{formatNumber(evidence.performance.requests,0,lang)}</dd></div>
          <div><dt>{c.checksRate}</dt><dd>{evidence.performance.checksRate===null?"—":`${formatNumber(evidence.performance.checksRate*100,2,lang)} %`}</dd></div>
        </dl>
        <p className={styles.context}>{c.performanceContext}</p>
      </section>
    </div>

    <section className={styles.provenance}>
      <h3>{c.provenance}</h3>
      <div><span>{c.commit}</span><MetaLink href={commitHref} label={`${c.commit} ${evidence.commit}`}>{evidence.commit.slice(0,7)}</MetaLink></div>
      <div><span>{c.run}</span><MetaLink href={runHref} label={`${c.run} ${evidence.runId}`}>#{evidence.runId}</MetaLink></div>
      <div><span>{c.generated}</span><strong>{timestamp}</strong></div>
    </section>

    <section className={styles.limitations}>
      <h3>{c.limitations}</h3>
      <ul>{evidence.limitations.map(item=><li key={item}>{lang==="es"?limitationEs[item]??item:item}</li>)}</ul>
    </section>

    <div className={styles.actions} role="navigation" aria-label={lang==="es"?"Enlaces de evidencia":"Evidence links"}>
      <a className={styles.primaryAction} href={allureReport} target="_blank" rel="noreferrer">{c.allure} <span aria-hidden="true">→</span></a>
      <a href={publicEvidence} target="_blank" rel="noreferrer">{c.evidence} <span aria-hidden="true">→</span></a>
      <a href={repo} target="_blank" rel="noreferrer">{c.github} <span aria-hidden="true">→</span></a>
      <a href={runHref} target="_blank" rel="noreferrer">{c.ci} <span aria-hidden="true">→</span></a>
    </div>
  </div>;
}

export default function QaEvidencePack({lang}:{lang:Lang}){
  const [state,setState]=useState<{status:"loading"}|{status:"ready";evidence:QaEvidence}|{status:"error"}>({status:"loading"});
  const c=copy[lang];

  useEffect(()=>{
    const controller=new AbortController();
    async function loadEvidence(){
      try{
        const response=await fetch("/qa-evidence.json",{cache:"no-store",signal:controller.signal});
        if(!response.ok)throw new Error(`Evidence request failed: ${response.status}`);
        const payload:unknown=await response.json();
        if(!isEvidence(payload))throw new Error("Evidence payload does not match schema version 1");
        setState({status:"ready",evidence:payload});
      }catch(error){
        if((error as Error).name!=="AbortError")setState({status:"error"});
      }
    }
    loadEvidence();
    return()=>controller.abort();
  },[]);

  return <section id="qa-evidence-pack" className={styles.section} aria-labelledby="qa-evidence-title">
    <header className={styles.intro}><p>{c.eyebrow}</p><h2 id="qa-evidence-title">{c.title}</h2><p>{c.intro}</p></header>
    {state.status==="loading"?<LoadingFrame lang={lang}/>:state.status==="error"?<ErrorFrame lang={lang}/>:<EvidenceFrame evidence={state.evidence} lang={lang}/>}
  </section>;
}
