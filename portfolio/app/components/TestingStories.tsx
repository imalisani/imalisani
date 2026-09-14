import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./TestingStories.module.css";

type Lang = "es" | "en";
type Role = "qa" | "pm" | "dev" | "team";

const copy = {
  es: {
    bridgeLabel: "Lo que sucede entre las etapas",
    bridge: "El proceso se puede diagramar. El criterio, las conversaciones y las decisiones son más difíciles de meter en una flecha.",
    eyebrow: "02 — Dentro del trabajo real",
    title: "La parte del testing que no aparece en el test case",
    intro: "Tres momentos del mismo flujo. Lo que cambia no es solo la etapa: cambia la conversación que el equipo necesita.",
    phases: ["Antes del desarrollo", "Durante el testing", "Antes del release"],
    stories: [
      { verb: "Preguntar", title: "Preguntar antes de probar", closing: "Testing no siempre empieza ejecutando. A veces empieza preguntando." },
      { verb: "Reportar", title: "Encontrar un bug no es suficiente", closing: "Un buen reporte reduce la distancia entre encontrar un problema y resolverlo." },
      { verb: "Decidir", title: "Todo verde no significa cero riesgo", closing: "QA no decide si el software es perfecto. Ayuda al equipo a entender el riesgo de liberarlo." },
    ],
    panel: "Viñeta",
    simpleChange: <>Es un cambio simple: ahora <code>duration</code> se interpreta en minutos.</>,
    simpleReaction: "Simple… hasta que deja de serlo.",
    questions: ["¿Qué pasa con clientes que todavía envían segundos?", "¿Y con los datos existentes?", "¿Backend, frontend e integraciones cambian al mismo tiempo?"],
    missed: "Eso no lo habíamos contemplado.", missing: "Definición faltante",
    aligned: "Comportamiento acordado", alignedCopy: "QA, Dev y Product alinean reglas y cobertura antes del desarrollo.",
    found: "Ok… esto definitivamente no debería pasar.", poor: "Esto está roto.", poorLabel: "Sin contexto",
    useful: "En este escenario el usuario no puede completar la operación.", reproduction: "Reproducción", attachments: "Evidencia y datos utilizados", attachmentLabel: "Adjuntos",
    impact: "Además afecta el flujo principal. Recomendaría resolverlo antes del release.", understood: "Perfecto, ahora veo exactamente dónde está el problema.",
    issueReady: "Investigación desbloqueada", issueReadyCopy: "Impacto, reproducción y evidencia viajan juntos.",
    passed: "tests aprobados", deploy: "Todo verde. ¿Deploy?", stillRisk: "Los tests sí. Pero todavía tenemos un riesgo.", openRisk: "Riesgo abierto",
    pending: "Integración pendiente", pendingCopy: "El flujo principal funciona, pero este cambio afecta una integración que todavía no fue validada.", pendingState: "Sin validar",
    validate: "Validemos eso antes.", decision: "Decisión informada", decisionCopy: "El equipo conoce la señal positiva y el riesgo pendiente.",
    lab: "¿Y cómo llevo este criterio a automatización e IA?", cta: "Ver Agentic QA Lab",
  },
  en: {
    bridgeLabel: "What happens between the stages",
    bridge: "A process can be diagrammed. Judgment, conversations and decisions are harder to fit inside an arrow.",
    eyebrow: "02 — Inside the real work",
    title: "The part of testing you won't find in a test case",
    intro: "Three moments in the same workflow. The stage changes, and so does the conversation the team needs.",
    phases: ["Before development", "During testing", "Before release"],
    stories: [
      { verb: "Ask", title: "Ask before testing", closing: "Testing doesn't always start with execution. Sometimes it starts with a question." },
      { verb: "Report", title: "Finding a bug is not enough", closing: "A good bug report reduces the distance between finding a problem and fixing it." },
      { verb: "Decide", title: "All green does not mean zero risk", closing: "QA doesn't decide whether software is perfect. It helps the team understand the risk of releasing it." },
    ],
    panel: "Panel",
    simpleChange: <>It's a simple change: <code>duration</code> is now interpreted in minutes.</>,
    simpleReaction: "Simple… until it isn't.",
    questions: ["What happens to clients that still send seconds?", "What about existing data?", "Do backend, frontend and integrations change at the same time?"],
    missed: "We hadn't considered that.", missing: "Missing definition",
    aligned: "Behaviour agreed", alignedCopy: "QA, Dev and Product align rules and coverage before development.",
    found: "Okay… this definitely shouldn't happen.", poor: "This is broken.", poorLabel: "Without context",
    useful: "In this scenario the user cannot complete the operation.", reproduction: "Reproduction", attachments: "Evidence and test data attached", attachmentLabel: "Attachments",
    impact: "It also affects the main flow. I'd recommend fixing it before release.", understood: "Perfect, now I can see exactly where the problem is.",
    issueReady: "Investigation unblocked", issueReadyCopy: "Impact, reproduction and evidence travel together.",
    passed: "tests passed", deploy: "All green. Deploy?", stillRisk: "The tests are green. But we still have one risk.", openRisk: "Open risk",
    pending: "Integration pending", pendingCopy: "The main flow works, but this change affects an integration that has not been validated yet.", pendingState: "Not validated",
    validate: "Let's validate that first.", decision: "Informed decision", decisionCopy: "The team understands both the positive signal and the remaining risk.",
    lab: "How do I bring this way of thinking into automation and AI?", cta: "Explore Agentic QA Lab",
  },
} as const;

function Character({ role, active = false }: { role: Role; active?: boolean }) {
  const label = role === "pm" ? "PM" : role === "qa" ? "QA" : role === "dev" ? "Dev" : "Team";
  return <div className={`${styles.character} ${active ? styles.characterActive : ""}`} aria-hidden="true"><span className={styles.avatar}><i/><b/></span><small>{label}</small></div>;
}

function Bubble({ speaker, qa = false, children }: { speaker: string; qa?: boolean; children: ReactNode }) {
  return <div className={`${styles.bubble} ${qa ? styles.qaBubble : ""}`}><span>{speaker}</span><p>{children}</p></div>;
}

function Panel({ number, label, className = "", children }: { number: string; label: string; className?: string; children: ReactNode }) {
  return <li className={`${styles.storyPanel} ${className}`}><span className={styles.panelNumber}>{label} {number}</span><div className={styles.panelContent}>{children}</div></li>;
}

function AskPanels({ lang }: { lang: Lang }) {
  const c = copy[lang];
  return <>
    <Panel number="01" label={c.panel}><div className={styles.cast}><Character role="pm"/><Character role="qa" active/></div><Bubble speaker="PM">{c.simpleChange}</Bubble><Bubble speaker="QA" qa>{c.simpleReaction}</Bubble></Panel>
    <Panel number="02" label={c.panel} className={styles.questionPanel}><Character role="qa" active/><div className={`${styles.bubble} ${styles.qaBubble}`}><span>QA</span><ul>{c.questions.map(question => <li key={question}>{question}</li>)}</ul></div></Panel>
    <Panel number="03" label={c.panel}><div className={styles.cast}><Character role="dev"/><Character role="pm"/></div><Bubble speaker="Dev / PM">{c.missed}</Bubble><div className={styles.signal}><i aria-hidden="true">!</i><span>{c.missing}</span></div></Panel>
    <Panel number="04" label={c.panel} className={styles.outcomePanel}><div className={styles.teamLine}><Character role="qa" active/><i/><Character role="dev"/><i/><Character role="pm"/></div><div className={styles.outcomeCard}><span aria-hidden="true">✓</span><div><strong>{c.aligned}</strong><p>{c.alignedCopy}</p></div></div></Panel>
  </>;
}

function ReportPanels({ lang }: { lang: Lang }) {
  const c = copy[lang];
  return <>
    <Panel number="01" label={c.panel}><Character role="qa" active/><div className={styles.bugWindow} aria-hidden="true"><span/><span/><span/><i>!</i></div><Bubble speaker="QA" qa>{c.found}</Bubble></Panel>
    <Panel number="02" label={c.panel} className={styles.reportPanel}><div className={styles.poorReport}><span aria-hidden="true">×</span><small>{c.poorLabel}</small><q>{c.poor}</q></div><div className={styles.usefulReport}><span aria-hidden="true">✓</span><p>{c.useful}</p><dl><div><dt>{c.reproduction}</dt><dd>100%</dd></div><div><dt>{c.attachmentLabel}</dt><dd>{c.attachments}</dd></div></dl></div></Panel>
    <Panel number="03" label={c.panel}><Character role="qa" active/><Bubble speaker="QA" qa>{c.impact}</Bubble><Character role="dev"/><Bubble speaker="Dev">{c.understood}</Bubble></Panel>
    <Panel number="04" label={c.panel} className={styles.outcomePanel}><div className={styles.issueTrack} aria-hidden="true"><span>BUG</span><i/><span>DEV</span><i/><span>FIX</span></div><div className={styles.outcomeCard}><span aria-hidden="true">✓</span><div><strong>{c.issueReady}</strong><p>{c.issueReadyCopy}</p></div></div></Panel>
  </>;
}

function DecidePanels({ lang }: { lang: Lang }) {
  const c = copy[lang];
  return <>
    <Panel number="01" label={c.panel}><div className={styles.testDashboard}><span aria-hidden="true">✓</span><strong>42</strong><p>{c.passed}</p></div><Character role="dev"/><Bubble speaker="Dev">{c.deploy}</Bubble></Panel>
    <Panel number="02" label={c.panel}><Character role="qa" active/><Bubble speaker="QA" qa>{c.stillRisk}</Bubble><div className={styles.signal}><i aria-hidden="true">!</i><span>{c.openRisk}</span></div></Panel>
    <Panel number="03" label={c.panel} className={styles.riskPanel}><span className={styles.riskIcon} aria-hidden="true">!</span><strong>{c.pending}</strong><p>{c.pendingCopy}</p><span className={styles.riskState}>{c.pendingState}</span></Panel>
    <Panel number="04" label={c.panel} className={styles.outcomePanel}><div className={styles.cast}><Character role="team"/><Character role="qa" active/></div><Bubble speaker={lang === "es" ? "Equipo" : "Team"}>{c.validate}</Bubble><div className={styles.outcomeCard}><span aria-hidden="true">✓</span><div><strong>{c.decision}</strong><p>{c.decisionCopy}</p></div></div></Panel>
  </>;
}

export default function TestingStories({ lang }: { lang: Lang }) {
  const c = copy[lang];
  return <section className={styles.section} id="testing-conversations" aria-labelledby="testing-stories-title">
    <div className={styles.bridge}><span>{c.bridgeLabel}</span><p>{c.bridge}</p><i aria-hidden="true"/></div>
    <div className={styles.body}>
      <header className={styles.header}><p className={styles.eyebrow}>{c.eyebrow}</p><div><h2 id="testing-stories-title">{c.title}</h2><p>{c.intro}</p></div></header>
      <ol className={styles.phaseRail} aria-label={lang === "es" ? "Momentos del flujo de QA" : "Moments in the QA workflow"}>{c.stories.map((story, index) => <li key={story.verb}><span>0{index + 1}</span><div><strong>{story.verb}</strong><small>{c.phases[index]}</small></div></li>)}</ol>
      <div className={styles.stories}>{c.stories.map((story, index) => <article className={styles.story} key={story.verb} aria-labelledby={`story-${index}-title`}><header className={styles.storyHeader}><span>0{index + 1} / 03</span><p>{c.phases[index]}</p><h3 id={`story-${index}-title`}>{story.title}</h3><strong>{story.verb}</strong></header><ol className={styles.panels}>{index === 0 ? <AskPanels lang={lang}/> : index === 1 ? <ReportPanels lang={lang}/> : <DecidePanels lang={lang}/>}</ol><blockquote>{story.closing}</blockquote></article>)}</div>
      <div className={styles.labLink}><p>{c.lab}</p><Link href="/agentic-qa-lab">{c.cta} <span aria-hidden="true">→</span></Link></div>
    </div>
  </section>;
}
