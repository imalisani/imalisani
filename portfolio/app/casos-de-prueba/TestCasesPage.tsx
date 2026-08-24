"use client";

import Link from "next/link";
import {useEffect,useState} from "react";
import styles from "./test-cases.module.css";

type Lang="es"|"en";

const testExamples=[
  {id:"TC-LOGIN-001",type:{en:"Positive · Smoke",es:"Positivo · Smoke"},priority:"P0",title:{en:"Successful login with a standard user",es:"Inicio de sesión exitoso con usuario estándar"},risk:{en:"A valid user could be unable to access the core product flow.",es:"Un usuario válido podría no acceder al flujo principal del producto."},pre:{en:"A valid and active standard_user exists.",es:"Existe un usuario standard_user válido y activo."},steps:{en:["Open the login page","Enter valid credentials","Select “Login”"],es:["Abrir la página de inicio","Ingresar credenciales válidas","Seleccionar “Login”"]},expected:{en:"The inventory page loads and the authenticated session is created.",es:"Se muestra el inventario y se crea la sesión autenticada."},tech:{en:"Equivalence Partitioning",es:"Partición de Equivalencia"},repo:"https://github.com/imalisani/playwright-portfolio-typescript"},
  {id:"TC-LOGIN-002",type:{en:"Negative · Regression",es:"Negativo · Regresión"},priority:"P0",title:{en:"Blocked user cannot access the product",es:"Un usuario bloqueado no puede acceder al producto"},risk:{en:"A blocked account could bypass an access restriction.",es:"Una cuenta bloqueada podría evadir una restricción de acceso."},pre:{en:"The locked_out_user is blocked by the system.",es:"El usuario locked_out_user está bloqueado por el sistema."},steps:{en:["Open the login page","Enter the blocked user credentials","Select “Login”"],es:["Abrir la página de inicio","Ingresar las credenciales del usuario bloqueado","Seleccionar “Login”"]},expected:{en:"Access is denied and the exact locked-user message is displayed.",es:"Se deniega el acceso y se muestra el mensaje exacto para usuario bloqueado."},tech:{en:"Negative testing · Error oracle",es:"Testing negativo · Oráculo de error"},repo:"https://github.com/imalisani/playwright-portfolio-typescript"},
  {id:"TC-A11Y-003",type:{en:"Accessibility · Known defect",es:"Accesibilidad · Defecto conocido"},priority:"P1",title:{en:"Inventory controls have accessible names",es:"Los controles del inventario tienen nombres accesibles"},risk:{en:"Assistive technology users could encounter controls without an understandable purpose.",es:"Las personas que usan tecnologías de asistencia podrían encontrar controles sin un propósito comprensible."},pre:{en:"The user is authenticated and the inventory is visible.",es:"El usuario está autenticado y el inventario está visible."},steps:{en:["Run axe-core on the inventory page","Filter critical and serious violations","Inspect the reported controls"],es:["Ejecutar axe-core en el inventario","Filtrar violaciones críticas y serias","Inspeccionar los controles reportados"]},expected:{en:"Every interactive control exposes an accessible name. A missing name is tracked as BUG-001.",es:"Cada control interactivo expone un nombre accesible. La ausencia se registra como BUG-001."},tech:{en:"WCAG 4.1.2 · Cross-tool confirmation",es:"WCAG 4.1.2 · Confirmación cruzada"},repo:"https://github.com/imalisani/selenium-portfolio-python"},
] as const;

const copy={
  es:{back:"Portfolio",process:"Cómo trabajo",contact:"Contacto",label:"Diseño de pruebas",title:<>Casos que hacen visible <em>el riesgo.</em></>,lead:"Cada ejemplo conecta una pregunta de negocio con datos, comportamiento esperado, técnica de diseño y una implementación pública.",collection:"Colección de casos",hint:"Abrí cada caso para ver su trazabilidad.",risk:"Riesgo cubierto",pre:"Precondición",steps:"Pasos",expected:"Resultado esperado",technique:"Técnica",code:"Ver implementación",footerLabel:"Evidencia real",footerTitle:"Del razonamiento al código ejecutable.",repositories:"Explorar repositorios",talk:"Hablemos"},
  en:{back:"Portfolio",process:"How I work",contact:"Contact",label:"Test design",title:<>Test cases that make <em>risk visible.</em></>,lead:"Each example connects a business question with data, expected behaviour, a design technique and a public implementation.",collection:"Test case collection",hint:"Open each case to see its traceability.",risk:"Risk covered",pre:"Precondition",steps:"Steps",expected:"Expected result",technique:"Technique",code:"View implementation",footerLabel:"Real evidence",footerTitle:"From reasoning to executable code.",repositories:"Explore repositories",talk:"Let’s talk"},
};

export default function TestCasesPage(){
  const [lang,setLang]=useState<Lang>("es");
  const [theme,setTheme]=useState<"light"|"dark">("light");
  useEffect(()=>{
    const saved=window.localStorage.getItem("portfolio-theme");
    const preferred=saved==="dark"||saved==="light"?saved:window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";
    setTheme(preferred);
    document.documentElement.dataset.theme=preferred;
  },[]);
  const toggleTheme=()=>setTheme(current=>{
    const next=current==="light"?"dark":"light";
    document.documentElement.dataset.theme=next;
    window.localStorage.setItem("portfolio-theme",next);
    return next;
  });
  const c=copy[lang];

  return <main className={styles.page} lang={lang}>
    <nav className={styles.nav} aria-label={lang==="es"?"Navegación de casos de prueba":"Test cases navigation"}>
      <Link className={styles.logo} href="/" aria-label={lang==="es"?"Ir al inicio":"Go home"}>IM<span>.</span></Link>
      <div className={styles.navLinks}><Link href="/">← {c.back}</Link><Link href="/como-trabajo">{c.process}</Link><Link href="/#contact">{c.contact}</Link></div>
      <div className={styles.controls}>
        <button className={styles.theme} type="button" onClick={toggleTheme} aria-label={lang==="es"?(theme==="dark"?"Activar modo claro":"Activar modo oscuro"):(theme==="dark"?"Use light mode":"Use dark mode")}><span aria-hidden="true">{theme==="dark"?"☀":"☾"}</span></button>
        <button className={styles.language} type="button" onClick={()=>setLang(lang==="es"?"en":"es")} aria-label={lang==="es"?"View in English":"Ver en español"}><span className={lang==="en"?styles.active:""}>EN</span><i/><span className={lang==="es"?styles.active:""}>ES</span></button>
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
          <div><span>{c.risk}</span><p>{test.risk[lang]}</p></div>
          <div><span>{c.pre}</span><p>{test.pre[lang]}</p></div>
          <div><span>{c.steps}</span><ol>{test.steps[lang].map(step=><li key={step}>{step}</li>)}</ol></div>
          <div><span>{c.expected}</span><p>{test.expected[lang]}</p></div>
          <div><span>{c.technique}</span><p>{test.tech[lang]}</p></div>
          <a href={test.repo} target="_blank" rel="noreferrer">{c.code} ↗</a>
        </div>
      </details>)}</div>
    </section>

    <footer className={styles.footer}><p className={styles.eyebrow}>{c.footerLabel}</p><h2>{c.footerTitle}</h2><div><Link href="/#github">{c.repositories} ↗</Link><Link href="/#contact">{c.talk} ↗</Link></div></footer>
  </main>;
}
