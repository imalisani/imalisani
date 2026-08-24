"use client";

import Link from "next/link";
import {useEffect,useState} from "react";
import styles from "./test-cases.module.css";

type Lang="es"|"en";

const testExamples=[
  {id:"TC-LOGIN-001",type:{en:"Positive · Smoke",es:"Positivo · Smoke"},priority:"P0",title:{en:"Successful login with a standard user",es:"Inicio de sesión exitoso con usuario estándar"},risk:{en:"A valid user could be unable to access the core product flow.",es:"Un usuario válido podría no acceder al flujo principal del producto."},gherkin:{en:[{keyword:"Feature:",text:"Authentication"},{keyword:"Scenario:",text:"Successful login with a standard user"},{keyword:"Given",text:"an active standard_user is on the login page"},{keyword:"When",text:"the user enters valid credentials and selects “Login”"},{keyword:"Then",text:"the inventory page is displayed"},{keyword:"And",text:"an authenticated session is created"}],es:[{keyword:"Característica:",text:"Autenticación"},{keyword:"Escenario:",text:"Inicio de sesión exitoso con usuario estándar"},{keyword:"Dado",text:"que un standard_user activo está en la página de inicio de sesión"},{keyword:"Cuando",text:"ingresa credenciales válidas y selecciona “Login”"},{keyword:"Entonces",text:"se muestra la página de inventario"},{keyword:"Y",text:"se crea una sesión autenticada"}]},tech:{en:"Equivalence Partitioning",es:"Partición de Equivalencia"},repo:"https://github.com/imalisani/playwright-portfolio-typescript"},
  {id:"TC-LOGIN-002",type:{en:"Negative · Regression",es:"Negativo · Regresión"},priority:"P0",title:{en:"Blocked user cannot access the product",es:"Un usuario bloqueado no puede acceder al producto"},risk:{en:"A blocked account could bypass an access restriction.",es:"Una cuenta bloqueada podría evadir una restricción de acceso."},gherkin:{en:[{keyword:"Feature:",text:"Access control"},{keyword:"Scenario:",text:"Blocked user cannot access the product"},{keyword:"Given",text:"the locked_out_user is blocked by the system"},{keyword:"And",text:"the user is on the login page"},{keyword:"When",text:"the user enters the blocked account credentials and selects “Login”"},{keyword:"Then",text:"access to the product is denied"},{keyword:"And",text:"the exact locked-user message is displayed"}],es:[{keyword:"Característica:",text:"Control de acceso"},{keyword:"Escenario:",text:"Un usuario bloqueado no puede acceder al producto"},{keyword:"Dado",text:"que locked_out_user está bloqueado por el sistema"},{keyword:"Y",text:"se encuentra en la página de inicio de sesión"},{keyword:"Cuando",text:"ingresa las credenciales de la cuenta bloqueada y selecciona “Login”"},{keyword:"Entonces",text:"se deniega el acceso al producto"},{keyword:"Y",text:"se muestra el mensaje exacto para usuario bloqueado"}]},tech:{en:"Negative testing · Error oracle",es:"Testing negativo · Oráculo de error"},repo:"https://github.com/imalisani/playwright-portfolio-typescript"},
  {id:"TC-A11Y-003",type:{en:"Accessibility · Known defect",es:"Accesibilidad · Defecto conocido"},priority:"P1",title:{en:"Inventory controls have accessible names",es:"Los controles del inventario tienen nombres accesibles"},risk:{en:"Assistive technology users could encounter controls without an understandable purpose.",es:"Las personas que usan tecnologías de asistencia podrían encontrar controles sin un propósito comprensible."},gherkin:{en:[{keyword:"Feature:",text:"Inventory accessibility"},{keyword:"Scenario:",text:"Interactive controls expose accessible names"},{keyword:"Given",text:"an authenticated user can see the inventory"},{keyword:"When",text:"axe-core analyzes the inventory page"},{keyword:"And",text:"critical and serious violations are filtered"},{keyword:"Then",text:"every interactive control exposes an accessible name"},{keyword:"And",text:"any missing name is recorded as BUG-001"}],es:[{keyword:"Característica:",text:"Accesibilidad del inventario"},{keyword:"Escenario:",text:"Los controles interactivos exponen nombres accesibles"},{keyword:"Dado",text:"que un usuario autenticado puede ver el inventario"},{keyword:"Cuando",text:"axe-core analiza la página de inventario"},{keyword:"Y",text:"se filtran las violaciones críticas y serias"},{keyword:"Entonces",text:"cada control interactivo expone un nombre accesible"},{keyword:"Y",text:"cualquier nombre ausente se registra como BUG-001"}]},tech:{en:"WCAG 4.1.2 · Cross-tool confirmation",es:"WCAG 4.1.2 · Confirmación cruzada"},repo:"https://github.com/imalisani/selenium-portfolio-python"},
] as const;

const copy={
  es:{back:"Portfolio",process:"Flujo de QA",testsNav:"Casos de prueba",reposNav:"Repositorios",contact:"Contacto",label:"Diseño de pruebas · Gherkin",title:<>Casos que hacen visible <em>el riesgo.</em></>,lead:"Cada ejemplo conecta una pregunta de negocio con un escenario Gherkin, una técnica de diseño y una implementación pública.",collection:"Escenarios Gherkin",hint:"Abrí cada escenario para ver su trazabilidad.",risk:"Riesgo cubierto",scenario:"Escenario Gherkin",technique:"Técnica",code:"Ver implementación",footerLabel:"Evidencia real",footerTitle:"Del comportamiento esperado al código ejecutable.",repositories:"Explorar repositorios",talk:"Hablemos"},
  en:{back:"Portfolio",process:"QA workflow",testsNav:"Test cases",reposNav:"Repositories",contact:"Contact",label:"Test design · Gherkin",title:<>Test cases that make <em>risk visible.</em></>,lead:"Each example connects a business question with a Gherkin scenario, a design technique and a public implementation.",collection:"Gherkin scenarios",hint:"Open each scenario to see its traceability.",risk:"Risk covered",scenario:"Gherkin scenario",technique:"Technique",code:"View implementation",footerLabel:"Real evidence",footerTitle:"From expected behaviour to executable code.",repositories:"Explore repositories",talk:"Let’s talk"},
};

export default function TestCasesPage(){
  const [lang,setLang]=useState<Lang>("es");
  const [theme,setTheme]=useState<"light"|"dark">("light");
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

  return <main className={styles.page} lang={lang}>
    <nav className={styles.nav} aria-label={lang==="es"?"Navegación de casos de prueba":"Test cases navigation"}>
      <Link className={styles.logo} href="/" aria-label={lang==="es"?"Ir al inicio":"Go home"}>IM<span>.</span></Link>
      <div className={styles.navLinks}><Link href="/">← {c.back}</Link><Link href="/como-trabajo">01 — {c.process}</Link><Link href="/casos-de-prueba" aria-current="page">02 — {c.testsNav}</Link><Link href="/repositorios">03 — {c.reposNav}</Link><Link href="/#contact">{c.contact}</Link></div>
      <div className={styles.controls}>
        <button className={styles.theme} type="button" onClick={toggleTheme} aria-label={lang==="es"?(theme==="dark"?"Activar modo claro":"Activar modo oscuro"):(theme==="dark"?"Use light mode":"Use dark mode")}><span aria-hidden="true">{theme==="dark"?"☀":"☾"}</span></button>
        <button className={`${styles.language} ${lang==="es"?styles.spanish:""}`} type="button" onClick={toggleLanguage} aria-pressed={lang==="es"} aria-label={lang==="es"?"View in English":"Ver en español"}><span className={lang==="en"?styles.active:""}>EN</span><i/><span className={lang==="es"?styles.active:""}>ES</span></button>
      </div>
    </nav>

    <header className={styles.hero}>
      <p className={styles.eyebrow}>{c.label}</p>
      <h1>{c.title}</h1>
      <p className={styles.lead}>{c.lead}</p>
    </header>

    <section className={styles.collection} aria-labelledby="collection-title">
      <header><p className={styles.eyebrow} id="collection-title">01 — {c.collection}</p><p>{c.hint}</p></header>
      <div className={styles.testList}>{testExamples.map((test,index)=><details className={styles.testCard} key={test.id} open={index===0}>
        <summary><span className={styles.testId}>{test.id}</span><div><small>{test.type[lang]} · {test.priority}</small><h2>{test.title[lang]}</h2></div><b aria-hidden="true">+</b></summary>
        <div className={styles.testDetail}>
          <div className={styles.context}>
            <div><span>{c.risk}</span><p>{test.risk[lang]}</p></div>
            <div><span>{c.technique}</span><p>{test.tech[lang]}</p></div>
          </div>
          <div className={styles.gherkin}><span>{c.scenario}</span><code>{test.gherkin[lang].map((line,index)=><span className={index<2?styles.heading:""} key={`${line.keyword}-${index}`}><b>{line.keyword}</b> {line.text}</span>)}</code></div>
          <a href={test.repo} target="_blank" rel="noreferrer">{c.code} ↗</a>
        </div>
      </details>)}</div>
    </section>

    <footer className={styles.footer}><p className={styles.eyebrow}>{c.footerLabel}</p><h2>{c.footerTitle}</h2><div><Link href="/repositorios">{c.repositories} ↗</Link><Link href="/#contact">{c.talk} ↗</Link></div></footer>
  </main>;
}
