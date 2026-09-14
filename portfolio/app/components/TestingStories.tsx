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

function QAIllustration({ pose }: { pose: Pose }) {
  const thoughtful = pose === "thinking" || pose === "deciding";
  const alert = pose === "noticing";
  const speaking = pose === "asking" || pose === "explaining";
  const headTransform = pose === "thinking" ? "rotate(-4 111 76)" : pose === "noticing" ? "rotate(3 111 76)" : undefined;

  return <svg viewBox="0 0 220 250" focusable="false" aria-hidden="true">
    <path className={styles.qaHairBack} d="M56 118C45 83 48 42 72 24c15-12 37-16 56-10 31 10 43 40 38 82l12 111H42c11-40 14-62 14-89Z"/>
    <path className={styles.qaTorso} d="M33 243c4-62 31-96 78-96 48 0 73 34 78 96H33Z"/>
    <path className={styles.qaCardigan} d="M39 243c3-54 20-83 54-93l18 29 18-29c33 10 51 40 54 93h-44l-8-57-20 29-21-29-8 57H39Z"/>
    <path className={styles.qaBlouse} d="m91 150 20 29 18-29-7-8H99l-8 8Z"/>
    <path className={styles.qaNeck} d="M96 119h30v34c-8 9-22 9-30 0v-34Z"/>
    <g transform={headTransform}>
      <path className={styles.qaEar} d="M76 74c-11-3-15 7-10 18 3 7 8 10 14 7M148 74c11-3 15 7 10 18-3 7-8 10-14 7"/>
      <path className={styles.qaFace} d="M75 61c3-27 19-41 38-41 25 0 41 20 39 50l-5 32c-5 25-20 38-36 38-18 0-33-15-37-40l-3-22 4-17Z"/>
      <path className={styles.qaFringe} d="M74 68c-3-28 11-50 37-51 20-1 36 13 41 34-16 1-32-7-42-20-7 15-19 27-36 37Z"/>
      <path className={styles.qaHairLayer} d="M73 61c-8 28-3 61-12 101 12-2 20-8 26-17l2-43M151 55c8 30 5 66 14 106-13-1-22-7-29-17l-2-42"/>
      <path className={styles.qaHairHighlight} d="M65 48c9-19 24-29 43-30M158 50c-4-17-15-28-31-33M63 72c-2 28 2 52-6 77M160 70c4 28 2 53 9 77"/>
      <path className={styles.qaBrow} d={alert ? "M86 70c6-5 13-5 20-1M121 68c7-4 14-2 19 3" : thoughtful ? "M86 71c7-3 13-2 19 1M121 70c7-3 13-2 19 1" : "M86 70c7-4 13-4 19 0M121 70c7-4 13-4 19 0"}/>
      <path className={styles.qaEye} d={thoughtful ? "M88 80c5 3 10 3 15 0M123 80c5 2 10 2 15 0" : alert ? "M88 80c5-4 11-4 16 0-5 5-11 5-16 0ZM122 80c5-4 11-4 16 0-5 5-11 5-16 0Z" : "M88 80c5-3 11-3 16 0-5 4-11 4-16 0ZM122 80c5-3 11-3 16 0-5 4-11 4-16 0Z"}/>
      {!thoughtful && <><circle className={styles.qaIris} cx="97" cy="80" r={alert ? "2.8" : "2.2"}/><circle className={styles.qaIris} cx="131" cy="80" r={alert ? "2.8" : "2.2"}/></>}
      <path className={styles.qaNose} d="M113 82c-1 7-3 13-5 18 3 2 7 2 10 0"/>
      <path className={styles.qaMouth} d={speaking ? "M101 113c7 6 17 6 24 0-7-3-17-3-24 0Z" : alert ? "M103 113c6-2 13-2 20 0" : thoughtful ? "M102 114c7 2 14 2 21-1" : "M102 111c7 7 15 7 23 0"}/>
      <path className={styles.qaCheek} d="M85 99c4 2 8 2 12 0M130 99c4 2 8 2 12 0"/>
    </g>
    {pose === "thinking" ? <>
      <path className={styles.qaSleeve} d="M78 172c-19 10-26 30-24 56l28 1 14-52-18-5Z"/>
      <path className={styles.qaSleeve} d="M143 170c15 8 20 20 15 37l-22-7-10-28 17-2Z"/>
      <path className={styles.qaArm} d="M143 197c-5-17-4-36-12-50"/>
      <path className={styles.qaHand} d="M139 197c1-14-2-27-9-39-3-4-1-9 3-10 4-1 7 2 8 6l6 19c3 9 3 17 0 25l-8-1Z"/>
      <path className={styles.qaFinger} d="M137 188c-6-4-10-9-12-14"/>
    </> : pose === "asking" || pose === "explaining" ? <>
      <path className={styles.qaSleeve} d="M82 170c-23 5-42 22-55 43l19 17c16-14 29-28 43-43l-7-17Z"/>
      <path className={styles.qaArm} d="M44 216 18 226"/>
      <path className={styles.qaHand} d="M20 218c-8 1-14 5-17 10 5 8 13 11 22 8l16-8-6-13-15 3Z"/>
      <path className={styles.qaFinger} d="m8 227 15-2M11 233l14-4"/>
      <path className={styles.qaSleeve} d="M139 169c19 8 31 25 37 48l-25 10-24-43 12-15Z"/>
      {pose === "explaining" && <><path className={styles.qaArm} d="m171 217 27-16"/><path className={styles.qaHand} d="M194 196c9-5 17-4 22 2-1 8-7 14-17 15l-18 8-7-12 20-13Z"/><path className={styles.qaFinger} d="m198 203 12-5M201 208l11-4"/></>}
    </> : pose === "noticing" ? <>
      <path className={styles.qaSleeve} d="M78 171c-19 11-29 31-29 59h31l16-45-18-14ZM141 171c18 11 29 31 30 59h-31l-15-45 16-14Z"/>
      <path className={styles.qaArm} d="M74 218c12-7 25-9 38-7M147 218c-11-7-23-9-35-7"/>
      <path className={styles.qaHand} d="M83 214c10-4 20-4 29-2l-2 12H82l1-10ZM140 214c-10-4-20-4-29-2l2 12h28l-1-10Z"/>
    </> : pose === "deciding" ? <>
      <path className={styles.qaSleeve} d="M79 171c-20 10-30 31-30 60h31l16-47-17-13ZM141 171c18 10 28 30 30 58l-28 2-18-48 16-12Z"/>
      <path className={styles.qaClipboard} d="M118 175h48v61h-48z"/>
      <path className={styles.qaClipboardTop} d="M132 169h20v11h-20z"/>
      <path className={styles.qaChecklist} d="m126 191 4 4 7-8M141 191h17m-32 15 4 4 7-8M141 206h17m-32 15 4 4 7-8M141 221h17"/>
      <path className={styles.qaHand} d="M113 190c7-6 13-8 19-5l-2 13-15 5-2-13Z"/>
    </> : <>
      <path className={styles.qaSleeve} d="M79 170c-20 10-31 34-30 62h31l16-49-17-13ZM141 170c20 10 31 34 30 62h-31l-15-49 16-13Z"/>
      <path className={styles.qaArm} d="M79 217c20-8 42-8 63 0"/>
      <path className={styles.qaHand} d="M94 211c12-5 23-5 35 0l-3 13H96l-2-13Z"/>
    </>}
    <path className={styles.qaSeam} d="M111 179v62M74 214l8 4M149 214l-8 4"/>
  </svg>;
}

function SupportingIllustration({ role, pose }: { role: Role; pose: Pose }) {
  if (role === "team") return <svg viewBox="0 0 220 250" focusable="false" aria-hidden="true">
    <path className={styles.teamBack} d="M18 244c4-62 29-93 72-93s68 31 72 93H18Z"/>
    <path className={styles.supportNeck} d="M73 121h30v34H73z"/>
    <path className={styles.supportFace} d="M52 65c2-30 17-46 39-46 25 0 41 20 39 51l-5 35c-4 25-19 38-36 38-19 0-34-16-38-42l-3-24 4-12Z"/>
    <path className={styles.supportHair} d="M50 72c-3-35 14-56 41-56 23 0 40 17 41 48-15-8-28-12-42-11-14 1-27 7-40 19Z"/>
    <path className={styles.supportFeatures} d="M66 78c6-4 12-4 18 0m16 0c6-4 12-4 18 0M69 87c4 3 9 3 13 0m20 0c4 3 9 3 13 0M88 91l-3 13c3 2 7 2 10 0m-15 14c8 6 17 6 25 0"/>
    <path className={styles.teamFront} d="M91 244c3-53 24-80 62-80s59 27 63 80H91Z"/>
    <path className={styles.supportNeckAlt} d="M140 137h27v30h-27z"/>
    <path className={styles.supportFaceAlt} d="M119 88c2-27 16-42 36-42 23 0 38 18 36 47l-4 31c-4 22-18 35-34 35-17 0-31-15-35-38l-3-22 4-11Z"/>
    <path className={styles.devHair} d="M117 95c-2-32 14-51 38-51 22 0 37 16 39 43-12-8-25-11-38-10-14 1-26 7-39 18Z"/>
    <path className={styles.supportFeatures} d="M132 99c5-3 11-3 16 0m15 0c5-3 11-3 16 0M134 108c4 3 8 3 12 0m19 0c4 3 8 3 12 0m-24 4-3 11c3 2 6 2 9 0m-13 12c7 5 15 5 22 0"/>
  </svg>;

  const pm = role === "pm";
  const surprised = pose === "noticing";
  return <svg viewBox="0 0 220 250" focusable="false" aria-hidden="true">
    <path className={pm ? styles.pmTorso : styles.devTorso} d="M32 244c4-64 30-98 79-98 48 0 74 34 78 98H32Z"/>
    <path className={styles.supportShirt} d="m91 151 20 27 19-27-8-9H99l-8 9Z"/>
    <path className={styles.supportNeck} d="M96 119h30v35c-8 8-22 8-30 0v-35Z"/>
    <path className={styles.supportEar} d="M76 75c-11-3-15 7-10 18 3 7 8 10 14 7M148 75c11-3 15 7 10 18-3 7-8 10-14 7"/>
    <path className={pm ? styles.supportFaceAlt : styles.supportFace} d="M75 61c3-27 19-41 38-41 25 0 41 20 39 50l-5 32c-5 25-20 38-36 38-18 0-33-15-37-40l-3-22 4-17Z"/>
    <path className={pm ? styles.pmHair : styles.devHair} d={pm ? "M73 68c-4-31 12-51 39-51 23 0 40 17 42 46-16-2-31-11-41-25-8 14-21 24-40 30Z" : "M72 70c-3-33 13-53 41-53 24 0 40 18 42 47-13-7-27-11-42-10-14 1-28 6-41 16Z"}/>
    <path className={styles.supportHairDetail} d="M76 48c10-19 25-28 45-28M148 43c-8-15-19-22-34-24"/>
    <path className={styles.supportBrow} d={surprised ? "M86 69c6-5 13-5 19-1M121 68c7-4 14-2 19 3" : "M86 70c7-4 13-4 19 0M121 70c7-4 13-4 19 0"}/>
    <path className={styles.supportEye} d="M88 81c5-3 11-3 16 0-5 4-11 4-16 0ZM122 81c5-3 11-3 16 0-5 4-11 4-16 0Z"/>
    <circle className={styles.supportIris} cx="97" cy="81" r={surprised ? "2.8" : "2.2"}/><circle className={styles.supportIris} cx="131" cy="81" r={surprised ? "2.8" : "2.2"}/>
    <path className={styles.supportNose} d="M113 83c-1 7-3 13-5 18 3 2 7 2 10 0"/>
    <path className={styles.supportMouth} d={surprised ? "M104 114c6-2 13-2 19 0" : "M103 112c7 6 15 6 22 0"}/>
    {pose === "explaining" ? <>
      <path className={styles.supportSleeve} d="M81 170c-22 6-42 24-54 44l20 16c15-14 29-29 43-43l-9-17Z"/>
      <path className={styles.supportArm} d="M45 216 18 226"/><path className={styles.supportHand} d="M20 218c-8 1-14 5-17 10 5 8 13 11 22 8l16-8-6-13-15 3Z"/>
      <path className={styles.supportSleeve} d="M140 170c19 9 31 31 35 58h-30l-20-43 15-15Z"/>
    </> : <>
      <path className={styles.supportSleeve} d="M80 170c-19 11-29 34-28 62h30l14-48-16-14ZM141 170c19 11 29 34 28 62h-30l-14-48 16-14Z"/>
      <path className={styles.supportArm} d="M81 218c19-8 40-8 60 0"/><path className={styles.supportHand} d="M96 211c10-4 21-4 31 0l-2 13H98l-2-13Z"/>
    </>}
  </svg>;
}

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
    styles["size" + size.charAt(0).toUpperCase() + size.slice(1)],
    direction === "left" ? styles.faceLeft : "",
    emphasis ? styles.characterEmphasis : "",
  ].filter(Boolean).join(" ");

  return <div className={className} aria-hidden="true">
    <span className={styles.portrait}>{role === "qa" ? <QAIllustration pose={pose}/> : <SupportingIllustration role={role} pose={pose}/>}</span>
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
