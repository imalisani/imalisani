import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./TestingStories.module.css";

type Lang = "es" | "en";
type SupportingRole = "pm" | "dev" | "team";
type QaPose = "neutral" | "laptop" | "thinking" | "asking" | "explaining" | "evidence" | "risk" | "ready";
type BubbleTail = "left" | "right" | "thought";

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
    simpleReaction: "Simple... hasta que deja de serlo.",
    questions: ["¿Qué pasa con clientes que todavía envían segundos?", "¿Y con los datos existentes?", "¿Backend, frontend e integraciones cambian al mismo tiempo?"],
    missed: "Eso no lo habíamos contemplado.", missing: "Definición faltante",
    aligned: "Comportamiento acordado", alignedCopy: "QA, Dev y Product alinean reglas y cobertura antes del desarrollo.",
    found: "Ok... esto definitivamente no debería pasar.", poor: "Esto está roto.", poorLabel: "Sin contexto",
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
    simpleReaction: "Simple... until it isn't.",
    questions: ["What happens to clients that still send seconds?", "What about existing data?", "Do backend, frontend and integrations change at the same time?"],
    missed: "We hadn't considered that.", missing: "Missing definition",
    aligned: "Behaviour agreed", alignedCopy: "QA, Dev and Product align rules and coverage before development.",
    found: "Okay... this definitely shouldn't happen.", poor: "This is broken.", poorLabel: "Without context",
    useful: "In this scenario the user cannot complete the operation.", reproduction: "Reproduction", attachments: "Evidence and test data attached", attachmentLabel: "Attachments",
    impact: "It also affects the main flow. I'd recommend fixing it before release.", understood: "Perfect, now I can see exactly where the problem is.",
    issueReady: "Investigation unblocked", issueReadyCopy: "Impact, reproduction and evidence travel together.",
    passed: "tests passed", deploy: "All green. Deploy?", stillRisk: "The tests are green. But we still have one risk.", openRisk: "Open risk",
    pending: "Integration pending", pendingCopy: "The main flow works, but this change affects an integration that has not been validated yet.", pendingState: "Not validated",
    validate: "Let's validate that first.", decision: "Informed decision", decisionCopy: "The team understands both the positive signal and the remaining risk.",
    lab: "How do I bring this way of thinking into automation and AI?", cta: "Explore Agentic QA Lab",
  },
} as const;

const roleLabels: Record<SupportingRole, string> = { pm: "Product", dev: "Dev", team: "Team" };

function QACharacter({ pose, size = "large", className = "" }: { pose: QaPose; size?: "small" | "medium" | "large"; className?: string }) {
  return <div className={[styles.qaCharacter, styles[`qa${size.charAt(0).toUpperCase()}${size.slice(1)}`], className].filter(Boolean).join(" ")} aria-hidden="true">
    <span className={styles.characterStage}>
      <Image
        className={styles.qaArtwork}
        src={`/characters/qa/${pose}.png`}
        width={1122}
        height={1402}
        sizes="(max-width: 560px) 42vw, (max-width: 1250px) 24vw, 12vw"
        alt=""
      />
    </span>
    <small>QA</small>
  </div>;
}

function RoleToken({ role, compact = false }: { role: SupportingRole; compact?: boolean }) {
  const initials = role === "pm" ? "PM" : role === "dev" ? "DEV" : "TEAM";
  return <div className={[styles.roleToken, styles[`role${role.toUpperCase()}`], compact ? styles.roleCompact : ""].filter(Boolean).join(" ")} aria-hidden="true">
    <span>{initials}</span>
    <small>{roleLabels[role]}</small>
  </div>;
}

function Bubble({ speaker, tail = "left", qa = false, children }: { speaker: string; tail?: BubbleTail; qa?: boolean; children: ReactNode }) {
  const className = [styles.bubble, styles[`bubble${tail.charAt(0).toUpperCase()}${tail.slice(1)}`], qa ? styles.qaBubble : ""].filter(Boolean).join(" ");
  return <div className={className}><span>{speaker}</span><p>{children}</p></div>;
}

function Scene({ number, label, className = "", children }: { number: string; label: string; className?: string; children: ReactNode }) {
  return <li className={[styles.storyPanel, className].filter(Boolean).join(" ")} aria-label={`${label} ${number}`}>
    <span className={styles.sceneIndex} aria-hidden="true">{number}</span>
    <div className={styles.panelContent}>{children}</div>
  </li>;
}

function Outcome({ title, children }: { title: string; children: ReactNode }) {
  return <div className={styles.outcomeCard}><span aria-hidden="true">✓</span><div><strong>{title}</strong><p>{children}</p></div></div>;
}

function AskPanels({ lang }: { lang: Lang }) {
  const c = copy[lang];
  return <>
    <Scene number="01" label={c.panel} className={styles.requirementScene}>
      <div className={styles.requirementComposition}>
        <QACharacter pose="laptop" size="large"/>
        <div className={styles.requirementDialogue}>
          <RoleToken role="pm"/>
          <Bubble speaker="PM" tail="left">{c.simpleChange}</Bubble>
        </div>
      </div>
    </Scene>
    <Scene number="02" label={c.panel} className={styles.focusScene}>
      <div className={styles.analysisComposition}>
        <QACharacter pose="thinking" size="large"/>
        <div className={styles.analysisNotes}>
          <div className={styles.requirementCard}><span>duration</span><b>60 → ?</b><small>{c.missing}</small></div>
          <Bubble speaker="QA" tail="thought" qa>{c.simpleReaction}</Bubble>
        </div>
      </div>
    </Scene>
    <Scene number="03" label={c.panel} className={styles.questionScene}>
      <div className={styles.questionComposition}>
        <QACharacter pose="asking" size="large"/>
        <div className={[styles.bubble, styles.bubbleLeft, styles.qaBubble, styles.questionBubble].join(" ")}>
          <span>QA</span>
          <ul>{c.questions.map((question, index) => <li key={question}><b>0{index + 1}</b>{question}</li>)}</ul>
        </div>
      </div>
      <div className={styles.reactionLine}><div><RoleToken role="dev" compact/><RoleToken role="pm" compact/></div><p>{c.missed}</p></div>
    </Scene>
    <Scene number="04" label={c.panel} className={styles.resolutionScene}>
      <div className={styles.alignmentComposition}>
        <QACharacter pose="ready" size="medium"/>
        <div className={styles.alignmentBoard}><span>AMBIGUITY</span><i/><span>CONVERSATION</span><i/><span>AGREEMENT</span><b>✓</b></div>
        <div className={styles.roleStack}><RoleToken role="dev" compact/><RoleToken role="pm" compact/></div>
      </div>
      <Outcome title={c.aligned}>{c.alignedCopy}</Outcome>
    </Scene>
  </>;
}

function ReportPanels({ lang }: { lang: Lang }) {
  const c = copy[lang];
  return <>
    <Scene number="01" label={c.panel}>
      <div className={styles.discoveryComposition}>
        <QACharacter pose="evidence" size="large"/>
        <div className={styles.discoveryContext}>
          <div className={styles.failureCard} aria-hidden="true"><span>TEST RESULT</span><b>×</b><small>checkout / payment</small></div>
          <Bubble speaker="QA" tail="left" qa>{c.found}</Bubble>
        </div>
      </div>
    </Scene>
    <Scene number="02" label={c.panel} className={styles.reportScene}>
      <div className={styles.reportContrast}>
        <div className={styles.poorReport}><span aria-hidden="true">×</span><small>{c.poorLabel}</small><q>{c.poor}</q></div>
        <div className={styles.usefulReport}><span aria-hidden="true">✓</span><p>{c.useful}</p><dl><div><dt>{c.reproduction}</dt><dd>100%</dd></div><div><dt>{c.attachmentLabel}</dt><dd>{c.attachments}</dd></div></dl></div>
      </div>
    </Scene>
    <Scene number="03" label={c.panel} className={styles.dialogueScene}>
      <div className={styles.qaDevConversation}>
        <QACharacter pose="explaining" size="large"/>
        <div className={styles.dialogueStack}>
          <Bubble speaker="QA" tail="left" qa>{c.impact}</Bubble>
          <div className={styles.devReply}><Bubble speaker="Dev" tail="right">{c.understood}</Bubble><RoleToken role="dev"/></div>
        </div>
      </div>
    </Scene>
    <Scene number="04" label={c.panel} className={styles.resolutionScene}>
      <div className={styles.fixComposition}>
        <QACharacter pose="ready" size="medium"/>
        <div className={styles.issueTrack} aria-hidden="true"><span>EVIDENCE</span><i/><span>BUG</span><i/><span>DEV</span><i/><span>FIX</span></div>
        <RoleToken role="dev" compact/>
      </div>
      <Outcome title={c.issueReady}>{c.issueReadyCopy}</Outcome>
    </Scene>
  </>;
}

function DecidePanels({ lang }: { lang: Lang }) {
  const c = copy[lang];
  return <>
    <Scene number="01" label={c.panel}>
      <div className={styles.deployComposition}>
        <div className={styles.deployOverview}><div className={styles.testDashboard}><span aria-hidden="true">✓</span><strong>42</strong><p>{c.passed}</p></div><QACharacter pose="neutral" size="small"/></div>
        <div className={styles.deployQuestion}><RoleToken role="dev"/><Bubble speaker="Dev" tail="right">{c.deploy}</Bubble></div>
      </div>
    </Scene>
    <Scene number="02" label={c.panel} className={styles.focusScene}>
      <div className={styles.riskComposition}>
        <QACharacter pose="risk" size="large"/>
        <div className={styles.riskDialogue}><div className={styles.riskSignal}><i aria-hidden="true">!</i><span>{c.openRisk}</span></div><Bubble speaker="QA" tail="left" qa>{c.stillRisk}</Bubble></div>
      </div>
    </Scene>
    <Scene number="03" label={c.panel} className={styles.riskScene}>
      <div className={styles.riskExplanation}>
        <QACharacter pose="explaining" size="large"/>
        <div className={styles.integrationEvidence}>
          <div className={styles.integrationMap} aria-hidden="true"><span>APP</span><i/><span className={styles.uncheckedNode}>API</span><i/><span>PARTNER</span></div>
          <div className={styles.riskHeading}><span aria-hidden="true">!</span><div><strong>{c.pending}</strong><small>{c.pendingState}</small></div></div>
          <Bubble speaker="QA" tail="left" qa>{c.pendingCopy}</Bubble>
        </div>
      </div>
    </Scene>
    <Scene number="04" label={c.panel} className={styles.resolutionScene}>
      <div className={styles.decisionComposition}>
        <QACharacter pose="ready" size="medium"/>
        <div className={styles.teamReply}><Bubble speaker={lang === "es" ? "Equipo" : "Team"} tail="right">{c.validate}</Bubble><RoleToken role="team"/></div>
      </div>
      <Outcome title={c.decision}>{c.decisionCopy}</Outcome>
    </Scene>
  </>;
}

export default function TestingStories({ lang }: { lang: Lang }) {
  const c = copy[lang];
  return <section className={styles.section} id="testing-conversations" aria-labelledby="testing-stories-title">
    <div className={styles.bridge}><span>{c.bridgeLabel}</span><p>{c.bridge}</p><i aria-hidden="true"/></div>
    <div className={styles.body}>
      <header className={styles.header}><p className={styles.eyebrow}>{c.eyebrow}</p><div><h2 id="testing-stories-title">{c.title}</h2><p>{c.intro}</p></div></header>
      <ol className={styles.phaseRail} aria-label={lang === "es" ? "Momentos del flujo de QA" : "Moments in the QA workflow"}>{c.stories.map((story, index) => <li key={story.verb}><span>0{index + 1}</span><div><strong>{story.verb}</strong><small>{c.phases[index]}</small></div></li>)}</ol>
      <div className={styles.stories}>{c.stories.map((story, index) => <article className={styles.story} key={story.verb} aria-labelledby={`story-${index}-title`}>
        <header className={styles.storyHeader}><span>0{index + 1} / 03</span><p>{c.phases[index]}</p><h3 id={`story-${index}-title`}>{story.title}</h3><strong>{story.verb}</strong></header>
        <ol className={styles.panels}>{index === 0 ? <AskPanels lang={lang}/> : index === 1 ? <ReportPanels lang={lang}/> : <DecidePanels lang={lang}/>}</ol>
        <blockquote>{story.closing}</blockquote>
      </article>)}</div>
      <div className={styles.labLink}><p>{c.lab}</p><Link href="/agentic-qa-lab">{c.cta} <span aria-hidden="true">→</span></Link></div>
    </div>
  </section>;
}
