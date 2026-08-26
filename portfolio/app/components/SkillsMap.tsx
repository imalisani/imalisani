import styles from "./SkillsMap.module.css";

type Lang="en"|"es";

const copy={
  es:{
    label:"Mapa de capacidades",
    title:"Mi sistema de calidad.",
    intro:"Tecnología, estrategia y habilidades humanas conectadas por un mismo criterio de calidad.",
    technical:{action:"Construir",side:"Técnicas",title:"Competencias técnicas",skills:["Playwright · TS","Appium · Python","Selenium · Pytest","APIs · Postman","SQL · Datos","k6 · CI/CD"]},
    strategy:{action:"Decidir",side:"Estrategia",title:"Estrategia y gestión de calidad",skills:["Shift-left","Test planning","Análisis de riesgos","Revisión del diff","Gherkin","Ciclo de defectos"]},
    human:{action:"Colaborar",side:"Humanas",title:"Habilidades humanas",skills:["Pensamiento crítico","Comunicación","Adaptabilidad","Ownership","Trabajo en equipo","Curiosidad"]},
    coreLabel:"Agentic QA",
    coreTitle:"Quality Engineering",
    coreCopy:"Criterio humano como centro",
  },
  en:{
    label:"Capability map",
    title:"My quality system.",
    intro:"Technology, strategy and human skills connected by one consistent quality judgement.",
    technical:{action:"Build",side:"Technical",title:"Technical skills",skills:["Playwright · TS","Appium · Python","Selenium · Pytest","APIs · Postman","SQL · Data","k6 · CI/CD"]},
    strategy:{action:"Decide",side:"Strategy",title:"Quality strategy and management",skills:["Shift-left","Test planning","Risk analysis","Diff review","Gherkin","Defect lifecycle"]},
    human:{action:"Collaborate",side:"Human",title:"Human skills",skills:["Critical thinking","Communication","Adaptability","Ownership","Teamwork","Curiosity"]},
    coreLabel:"Agentic QA",
    coreTitle:"Quality Engineering",
    coreCopy:"Human judgement at the core",
  },
};

type Domain=typeof copy.es.technical;

function SkillDomain({number,domain,tone}:{number:string;domain:Domain;tone:"technical"|"strategy"|"human"}){
  return <article className={`${styles.domain} ${styles[tone]}`}>
    <div className={styles.topline}><span>{number} — {domain.action}</span><span>{domain.side}</span></div>
    <h3>{domain.title}</h3>
    <div className={styles.skills}>{domain.skills.map(skill=><span key={skill}>{skill}</span>)}</div>
  </article>;
}

export default function SkillsMap({lang}:{lang:Lang}){
  const c=copy[lang];
  return <section className={styles.section} aria-labelledby="skills-map-title">
    <header className="head"><div><p className="label">{c.label}</p><h2 id="skills-map-title">{c.title}</h2></div><p>{c.intro}</p></header>
    <div className={styles.map}>
      <svg className={styles.orbits} viewBox="0 0 1000 520" preserveAspectRatio="none" aria-hidden="true">
        <g className={styles.orbitTrack} transform="rotate(-12 500 260)">
          <ellipse cx="500" cy="260" rx="235" ry="112"/>
          <circle className={styles.movingNode} r="7">
            <animateMotion dur="12s" repeatCount="indefinite" path="M265 260a235 112 0 1 0 470 0a235 112 0 1 0-470 0"/>
          </circle>
        </g>
        <g className={`${styles.orbitTrack} ${styles.orbitTrackReverse}`} transform="rotate(26 500 260)">
          <ellipse cx="500" cy="260" rx="120" ry="222"/>
          <circle className={styles.movingNode} r="6">
            <animateMotion dur="16s" begin="-5s" repeatCount="indefinite" path="M380 260a120 222 0 1 0 240 0a120 222 0 1 0-240 0"/>
          </circle>
        </g>
        <path className={styles.connector} d="M110 405 C290 370 350 300 440 278"/>
        <path className={`${styles.connector} ${styles.connectorReverse}`} d="M890 118 C700 145 650 205 560 240"/>
        <circle className={`${styles.signal} ${styles.signalOne}`} cx="307" cy="196" r="6"/>
        <circle className={`${styles.signal} ${styles.signalTwo}`} cx="690" cy="325" r="6"/>
        <circle className={`${styles.signal} ${styles.signalThree}`} cx="500" cy="70" r="6"/>
      </svg>
      <SkillDomain number="01" domain={c.technical} tone="technical"/>
      <div className={styles.core}>
        <div className={styles.coreContent}><span>{c.coreLabel}</span><strong>{c.coreTitle}</strong><p>{c.coreCopy}</p></div>
      </div>
      <SkillDomain number="02" domain={c.strategy} tone="strategy"/>
      <SkillDomain number="03" domain={c.human} tone="human"/>
    </div>
  </section>;
}
