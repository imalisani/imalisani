"use client";

import Link from "next/link";
import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import styles from "./TestingStories.module.css";

type Lang = "es" | "en";

const copy = {
  es: {
    eyebrow: "Cómo trabajo · Dentro de la conversación",
    title: "La parte del testing que no aparece en el test case",
    navigation: "Elegir una historia de trabajo",
    tabs: ["Preguntar", "Reportar", "Decidir"],
    titles: ["Preguntar antes de probar", "Encontrar un bug no es suficiente", "Todo verde no significa cero riesgo"],
    contexts: ["Antes del desarrollo", "Al comunicar un defecto", "Antes del release"],
    endings: [
      "Testing no siempre empieza ejecutando. A veces empieza preguntando.",
      "Un buen reporte reduce la distancia entre encontrar un problema y resolverlo.",
      "QA no decide si el software es perfecto. Ayuda al equipo a entender el riesgo de liberarlo.",
    ],
    lab: "¿Y cómo llevo este enfoque a automatización e IA?",
    cta: "Ver Agentic QA Lab",
  },
  en: {
    eyebrow: "How I work · Inside the conversation",
    title: "The part of testing you won't find in a test case",
    navigation: "Choose a work story",
    tabs: ["Ask", "Report", "Decide"],
    titles: ["Ask before testing", "Finding a bug is not enough", "All green doesn't mean zero risk"],
    contexts: ["Before development", "When reporting a defect", "Before release"],
    endings: [
      "Testing doesn't always start with execution. Sometimes it starts with a question.",
      "A good bug report reduces the distance between finding a problem and fixing it.",
      "QA doesn't decide whether software is perfect. It helps the team understand the risk of releasing it.",
    ],
    lab: "How do I bring this approach into automation and AI?",
    cta: "Explore Agentic QA Lab",
  },
} as const;

function Dialogue({ speaker, qa = false, children }: {
  speaker: string;
  qa?: boolean;
  children: ReactNode;
}) {
  return <div className={`${styles.dialogue} ${qa ? styles.qa : ""}`}>
    <span className={styles.speaker}>{speaker}</span>
    <div className={styles.bubble}>{children}</div>
  </div>;
}

function Scene({ story, lang }: { story: number; lang: Lang }) {
  const es = lang === "es";
  if (story === 0) return <>
    <Dialogue speaker="PM"><p>{es ? <>Es un cambio simple: ahora <code>duration</code> se interpreta en minutos.</> : <>It's a simple change: <code>duration</code> is now interpreted in minutes.</>}</p></Dialogue>
    <Dialogue speaker="QA" qa>
      <p>{es ? "Simple… hasta que deja de serlo." : "Simple… until it isn't."}</p>
      <ul className={styles.questions}>
        <li>{es ? "¿Qué pasa con clientes que todavía envían segundos?" : "What about clients still sending seconds?"}</li>
        <li>{es ? "¿Y con los datos existentes?" : "And the existing data?"}</li>
        <li>{es ? "¿Backend, frontend e integraciones cambian al mismo tiempo?" : "Do the backend, frontend and integrations change at the same time?"}</li>
      </ul>
    </Dialogue>
    <Dialogue speaker="Dev / PM"><p>{es ? "Eso no lo habíamos contemplado." : "We hadn't considered that."}</p></Dialogue>
    <p className={styles.resolution}><span aria-hidden="true">✓</span> {es ? "QA + Dev + Product · Comportamiento alineado antes de desarrollar." : "QA + Dev + Product · Behaviour aligned before development."}</p>
  </>;

  if (story === 1) return <>
    <div className={styles.vague}><span aria-hidden="true">×</span><span>{es ? "Sin contexto" : "Without context"}</span><q>{es ? "Esto está roto." : "This is broken."}</q></div>
    <Dialogue speaker="QA" qa>
      <p>{es ? "En este escenario el usuario no puede completar la operación." : "In this scenario, the user cannot complete the operation."}</p>
      <div className={styles.report}>
        <span><b>{es ? "Reproducción" : "Reproduction"}</b>100%</span>
        <span><b>{es ? "Adjuntos" : "Attachments"}</b>{es ? "Evidencia + datos utilizados" : "Evidence + test data"}</span>
      </div>
      <p>{es ? "Además afecta el flujo principal. Recomendaría resolverlo antes del release." : "It also affects the main flow. I'd recommend fixing it before release."}</p>
    </Dialogue>
    <Dialogue speaker="Dev"><p>{es ? "Perfecto, ahora veo exactamente dónde está el problema." : "Great, now I can see exactly where the problem is."}</p></Dialogue>
    <p className={styles.resolution}><span aria-hidden="true">✓</span> {es ? "Impacto + reproducción + evidencia · Un problema que se puede investigar." : "Impact + reproduction + evidence · A problem we can investigate."}</p>
  </>;

  return <>
    <div className={styles.testResult}><span aria-hidden="true">✓</span><strong>{es ? "42 tests aprobados" : "42 tests passed"}</strong><span>{es ? "En este escenario" : "In this scenario"}</span></div>
    <Dialogue speaker="Dev"><p>{es ? "Todo verde. ¿Deploy?" : "All green. Deploy?"}</p></Dialogue>
    <Dialogue speaker="QA" qa>
      <p>{es ? "Los tests sí. Pero todavía tenemos un riesgo." : "The tests are green. But we still have a risk."}</p>
      <div className={styles.risk}><span aria-hidden="true">!</span><div><b>{es ? "Integración pendiente de validar" : "Integration awaiting validation"}</b><p>{es ? "El flujo principal funciona, pero este cambio afecta una integración que todavía no fue validada." : "The main flow works, but this change affects an integration that hasn't been validated yet."}</p></div></div>
    </Dialogue>
    <Dialogue speaker={es ? "Equipo" : "Team"}><p>{es ? "Validemos eso antes." : "Let's validate that first."}</p></Dialogue>
  </>;
}

export default function TestingStories({ lang }: { lang: Lang }) {
  const [active, setActive] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();
  const c = copy[lang];

  function onTabKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    switch (event.key) {
      case "ArrowRight": next = (index + 1) % 3; break;
      case "ArrowLeft": next = (index + 2) % 3; break;
      case "Home": next = 0; break;
      case "End": next = 2; break;
      default: return;
    }
    event.preventDefault();
    setActive(next);
    buttons.current[next]?.focus();
  }

  return <section className={styles.section} id="testing-conversations" aria-labelledby={`${id}-title`}>
    <header className={styles.header}>
      <p className="label">{c.eyebrow}</p>
      <h2 id={`${id}-title`}>{(["es", "en"] as const).map(language =>
        <span key={language} lang={language} aria-hidden={language !== lang}>{copy[language].title}</span>
      )}</h2>
    </header>
    <div className={styles.tabs} role="tablist" aria-label={c.navigation}>
      {c.tabs.map((label, index) => <button
        key={index}
        ref={element => { buttons.current[index] = element; }}
        type="button"
        role="tab"
        id={`${id}-tab-${index}`}
        aria-selected={active === index}
        aria-controls={`${id}-panel-${lang}-${index}`}
        tabIndex={active === index ? 0 : -1}
        onClick={() => setActive(index)}
        onKeyDown={event => onTabKey(event, index)}
      ><span className={styles.tabNumber} aria-hidden="true">0{index + 1}</span>{label}<span className={styles.tabArrow} aria-hidden="true">↗</span></button>)}
    </div>
    {/* All scenes share a grid cell so their content, including both languages,
        determines the height. Inactive scenes are inert and hidden from AT. */}
    <div className={styles.stage}>
      {(["es", "en"] as const).flatMap(language => copy[language].titles.map((title, index) => {
        const selected = language === lang && active === index;
        return <div
          key={`${language}-${index}`}
          id={`${id}-panel-${language}-${index}`}
          role="tabpanel"
          aria-labelledby={`${id}-tab-${index}`}
          aria-hidden={!selected}
          inert={!selected}
          tabIndex={selected ? 0 : -1}
          className={styles.panel}
          data-active={selected}
          lang={language}
        >
          <div className={styles.storyIntro}>
            <p className={styles.context}>{copy[language].contexts[index]}</p>
            <h3>{title}</h3>
            <div className={styles.participants} aria-hidden="true"><span>QA</span><i/><span>Dev</span><i/><span>PM</span></div>
          </div>
          <div className={styles.scene}><Scene story={index} lang={language}/></div>
          <blockquote className={styles.takeaway}>{copy[language].endings[index]}</blockquote>
        </div>;
      }))}
    </div>
    <div className={styles.labLink}><p>{c.lab}</p><Link href="/agentic-qa-lab">{c.cta} <span aria-hidden="true">→</span></Link></div>
  </section>;
}
