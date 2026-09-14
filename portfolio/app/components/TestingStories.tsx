import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./TestingStories.module.css";

type Lang = "es" | "en";
type Role = "qa" | "pm" | "dev" | "team";
type Pose = "thinking" | "asking" | "noticing" | "explaining" | "listening" | "deciding";
type Direction = "left" | "right";
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

const roleLabels: Record<Role, string> = { qa: "QA", pm: "PM", dev: "Dev", team: "Team" };

function Character({
  role,
  pose = "listening",
  direction = "right",
  emphasis = false,
  size = "medium",
}: {
  role: Role;
  pose?: Pose;
  direction?: Direction;
  emphasis?: boolean;
  size?: "small" | "medium" | "large";
}) {
  const className = [
    styles.character,
    styles["character" + role.toUpperCase()],
    styles["pose" + pose.charAt(0).toUpperCase() + pose.slice(1)],
    styles["size" + size.charAt(0).toUpperCase() + size.slice(1)],
    direction === "left" ? styles.faceLeft : "",
    emphasis ? styles.characterEmphasis : "",
  ].filter(Boolean).join(" ");

  return <div className={className} aria-hidden="true">
    <span className={styles.portrait}>
      <svg viewBox="0 0 120 150" focusable="false">
        {role === "qa" ? <>
          <path className={styles.qaHairBack} d="M35 42C35 17 51 8 62 8c21 0 30 16 29 39l5 54H27l7-55Z"/>
          <path className={styles.qaNeck} d="M52 65h19v22H52z"/>
          <path className={styles.qaTop} d="M25 142c2-38 13-58 36-58 25 0 36 19 38 58H25Z"/>
          <path className={styles.qaShirt} d="m49 84 12 22 13-22c-8-4-17-4-25 0Z"/>
          <ellipse className={styles.skin} cx="61" cy="45" rx="23" ry="28"/>
          <path className={styles.qaFringe} d="M38 39c1-20 13-29 26-29 15 0 25 12 25 29-8-2-14-8-18-15-8 9-18 14-33 15Z"/>
          <path className={styles.faceLine} d={pose === "noticing" ? "M49 44h7m13 0h7M56 59c4 2 8 2 12-1" : pose === "thinking" || pose === "deciding" ? "M48 44c3-2 6-2 9 0m12 0c3-2 6-2 9 0M57 59c4-1 7-1 11 0" : "M49 44h7m13 0h7M56 58c4 4 9 4 13 0"}/>
          <path className={styles.qaHairSide} d="M37 39c-3 20-1 42-4 58h13l1-37M86 37c4 19 1 42 5 60H78l-1-37"/>
          {pose === "thinking" || pose === "deciding" ? <>
            <path className={styles.armLine} d="M43 96c-13 10-12 27 4 30"/>
            <path className={styles.armLine} d="M45 125c5-15 7-30 13-41"/>
            <circle className={styles.skin} cx="47" cy="123" r="5"/>
          </> : pose === "asking" || pose === "explaining" ? <>
            <path className={styles.armLine} d="M42 96c-17 5-24 17-30 28"/>
            <circle className={styles.skin} cx="11" cy="125" r="5"/>
            <path className={styles.armLine} d="M80 96c13 8 17 19 20 31"/>
          </> : <>
            <path className={styles.armLine} d="M42 98c-8 13-10 25-11 39M81 98c8 13 10 25 11 39"/>
          </>}
          <path className={styles.qaBadge} d="M72 112h14v8H72z"/>
        </> : role === "team" ? <>
          <circle className={styles.supportHair} cx="43" cy="45" r="23"/>
          <ellipse className={styles.skin} cx="43" cy="49" rx="18" ry="22"/>
          <path className={styles.supportTop} d="M12 142c3-36 12-55 31-55s29 19 32 55H12Z"/>
          <circle className={styles.devHair} cx="81" cy="53" r="21"/>
          <ellipse className={styles.skinAlt} cx="81" cy="56" rx="17" ry="21"/>
          <path className={styles.teamTop} d="M53 142c3-32 11-50 29-50s27 18 30 50H53Z"/>
          <path className={styles.faceLine} d="M36 49h5m7 0h5M38 61c4 3 8 3 12 0M74 56h5m7 0h5M76 67c4 3 8 3 12 0"/>
        </> : <>
          <path className={role === "pm" ? styles.pmHair : styles.devHair} d={role === "pm" ? "M37 43c0-22 13-33 27-33 17 0 28 14 27 35-13-2-24-8-31-17-5 8-13 13-23 15Z" : "M35 42c2-21 14-32 28-32 17 0 28 13 29 33-10-6-19-8-29-7-9 1-18 3-28 6Z"}/>
          <path className={styles.supportNeck} d="M53 67h18v20H53z"/>
          <path className={role === "pm" ? styles.pmTop : styles.devTop} d="M25 142c3-38 14-57 37-57s35 19 38 57H25Z"/>
          <ellipse className={role === "pm" ? styles.skinAlt : styles.skin} cx="62" cy="48" rx="23" ry="28"/>
          <path className={styles.faceLine} d={pose === "noticing" ? "M49 47h7m13 0h7M56 62c4-1 8-1 12 0" : "M49 47h7m13 0h7M56 61c4 4 9 4 13 0"}/>
          {pose === "explaining" ? <>
            <path className={styles.supportArm} d="M44 98c-18 7-26 18-32 29"/>
            <circle className={styles.skin} cx="11" cy="128" r="5"/>
          </> : <path className={styles.supportArm} d="M43 99c-8 12-10 25-11 38M81 99c8 12 10 25 11 38"/>}
        </>}
      </svg>
    </span>
    <small>{roleLabels[role]}</small>
  </div>;
}

function Bubble({
  speaker,
  tail = "left",
  qa = false,
  children,
}: {
  speaker: string;
  tail?: BubbleTail;
  qa?: boolean;
  children: ReactNode;
}) {
  const className = [styles.bubble, styles["bubble" + tail.charAt(0).toUpperCase() + tail.slice(1)], qa ? styles.qaBubble : ""].filter(Boolean).join(" ");
  return <div className={className}><span>{speaker}</span><p>{children}</p></div>;
}

function Scene({
  number,
  label,
  className = "",
  children,
}: {
  number: string;
  label: string;
  className?: string;
  children: ReactNode;
}) {
  return <li className={[styles.storyPanel, className].filter(Boolean).join(" ")} aria-label={label + " " + number}>
    <span className={styles.sceneIndex} aria-hidden="true">{number}</span>
    <div className={styles.panelContent}>{children}</div>
  </li>;
}

function Laptop({ alert = false }: { alert?: boolean }) {
  return <div className={styles.laptop} aria-hidden="true"><span><i/><i/><i/>{alert ? <b>!</b> : <b>✓</b>}</span><em/></div>;
}

function AskPanels({ lang }: { lang: Lang }) {
  const c = copy[lang];
  return <>
    <Scene number="01" label={c.panel}>
      <div className={styles.deskScene}>
        <Character role="pm" pose="explaining" direction="left"/>
        <div className={styles.sceneDesk}><Laptop/></div>
        <Character role="qa" pose="listening" emphasis size="large"/>
      </div>
      <Bubble speaker="PM" tail="left">{c.simpleChange}</Bubble>
    </Scene>
    <Scene number="02" label={c.panel} className={styles.focusScene}>
      <div className={styles.qaSpotlight}>
        <Character role="qa" pose="thinking" emphasis size="large"/>
        <div className={styles.requirementCard}><span>duration</span><b>?</b><small>60 → 1?</small></div>
      </div>
      <Bubble speaker="QA" tail="thought" qa>{c.simpleReaction}</Bubble>
    </Scene>
    <Scene number="03" label={c.panel} className={styles.questionScene}>
      <div className={styles.questionComposition}>
        <Character role="qa" pose="asking" emphasis size="large"/>
        <div className={[styles.bubble, styles.bubbleLeft, styles.qaBubble, styles.questionBubble].join(" ")}>
          <span>QA</span>
          <ul>{c.questions.map((question, index) => <li key={question}><b>0{index + 1}</b>{question}</li>)}</ul>
        </div>
      </div>
      <div className={styles.reactionLine}><Character role="dev" pose="noticing" size="small"/><Character role="pm" pose="noticing" size="small"/><p>{c.missed}</p></div>
    </Scene>
    <Scene number="04" label={c.panel} className={styles.resolutionScene}>
      <div className={styles.teamComposition}>
        <Character role="qa" pose="explaining" emphasis/>
        <div className={styles.alignmentBoard}><span>QA</span><i/><span>DEV</span><i/><span>PRODUCT</span><b>✓</b></div>
        <Character role="dev" pose="listening" size="small"/>
        <Character role="pm" pose="listening" size="small"/>
      </div>
      <div className={styles.outcomeCard}><span aria-hidden="true">✓</span><div><strong>{c.aligned}</strong><p>{c.alignedCopy}</p></div></div>
    </Scene>
  </>;
}

function ReportPanels({ lang }: { lang: Lang }) {
  const c = copy[lang];
  return <>
    <Scene number="01" label={c.panel}>
      <div className={styles.bugDesk}>
        <Character role="qa" pose="noticing" emphasis size="large"/>
        <div><Laptop alert/><span className={styles.bugMarker}>BUG</span></div>
      </div>
      <Bubble speaker="QA" tail="left" qa>{c.found}</Bubble>
    </Scene>
    <Scene number="02" label={c.panel} className={styles.reportScene}>
      <div className={styles.reportContrast}>
        <div className={styles.poorReport}><span aria-hidden="true">×</span><small>{c.poorLabel}</small><q>{c.poor}</q></div>
        <div className={styles.usefulReport}><span aria-hidden="true">✓</span><p>{c.useful}</p><dl><div><dt>{c.reproduction}</dt><dd>100%</dd></div><div><dt>{c.attachmentLabel}</dt><dd>{c.attachments}</dd></div></dl></div>
      </div>
      <div className={styles.evidenceCharacter}><Character role="qa" pose="explaining" emphasis/><span className={styles.evidenceTrail} aria-hidden="true"><i/><i/><i/></span></div>
    </Scene>
    <Scene number="03" label={c.panel} className={styles.dialogueScene}>
      <div className={styles.dialogueRow}><Character role="qa" pose="explaining" emphasis/><Bubble speaker="QA" tail="left" qa>{c.impact}</Bubble></div>
      <div className={styles.dialogueRowReverse}><Bubble speaker="Dev" tail="right">{c.understood}</Bubble><Character role="dev" pose="noticing"/></div>
    </Scene>
    <Scene number="04" label={c.panel} className={styles.resolutionScene}>
      <div className={styles.fixScene}><Character role="dev" pose="explaining"/><div className={styles.issueTrack} aria-hidden="true"><span>BUG</span><i/><span>DEV</span><i/><span>FIX</span></div><Character role="qa" pose="listening" emphasis/></div>
      <div className={styles.outcomeCard}><span aria-hidden="true">✓</span><div><strong>{c.issueReady}</strong><p>{c.issueReadyCopy}</p></div></div>
    </Scene>
  </>;
}

function DecidePanels({ lang }: { lang: Lang }) {
  const c = copy[lang];
  return <>
    <Scene number="01" label={c.panel}>
      <div className={styles.deployScene}><div className={styles.testDashboard}><span aria-hidden="true">✓</span><strong>42</strong><p>{c.passed}</p></div><Character role="dev" pose="explaining" size="large"/></div>
      <Bubble speaker="Dev" tail="right">{c.deploy}</Bubble>
    </Scene>
    <Scene number="02" label={c.panel} className={styles.focusScene}>
      <div className={styles.qaSpotlight}><Character role="qa" pose="deciding" emphasis size="large"/><div className={styles.riskSignal}><i aria-hidden="true">!</i><span>{c.openRisk}</span></div></div>
      <Bubble speaker="QA" tail="left" qa>{c.stillRisk}</Bubble>
    </Scene>
    <Scene number="03" label={c.panel} className={styles.riskScene}>
      <div className={styles.integrationMap} aria-hidden="true"><span>APP</span><i/><span className={styles.uncheckedNode}>API</span><i/><span>PARTNER</span></div>
      <Character role="qa" pose="explaining" emphasis/>
      <div className={styles.riskCopy}><span>!</span><div><strong>{c.pending}</strong><p>{c.pendingCopy}</p><small>{c.pendingState}</small></div></div>
    </Scene>
    <Scene number="04" label={c.panel} className={styles.resolutionScene}>
      <div className={styles.teamDecision}><Character role="team" pose="listening" size="large"/><Bubble speaker={lang === "es" ? "Equipo" : "Team"} tail="left">{c.validate}</Bubble><Character role="qa" pose="listening" emphasis/></div>
      <div className={styles.outcomeCard}><span aria-hidden="true">✓</span><div><strong>{c.decision}</strong><p>{c.decisionCopy}</p></div></div>
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
      <div className={styles.stories}>{c.stories.map((story, index) => <article className={styles.story} key={story.verb} aria-labelledby={"story-" + index + "-title"}>
        <header className={styles.storyHeader}><span>0{index + 1} / 03</span><p>{c.phases[index]}</p><h3 id={"story-" + index + "-title"}>{story.title}</h3><strong>{story.verb}</strong></header>
        <ol className={styles.panels}>{index === 0 ? <AskPanels lang={lang}/> : index === 1 ? <ReportPanels lang={lang}/> : <DecidePanels lang={lang}/>}</ol>
        <blockquote>{story.closing}</blockquote>
      </article>)}</div>
      <div className={styles.labLink}><p>{c.lab}</p><Link href="/agentic-qa-lab">{c.cta} <span aria-hidden="true">→</span></Link></div>
    </div>
  </section>;
}
