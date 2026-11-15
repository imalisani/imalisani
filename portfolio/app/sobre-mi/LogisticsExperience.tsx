import styles from "./logistics-experience.module.css";

const copy = {
  es: {
    eyebrow: "Experiencia laboral",
    intro: "Fui responsable de QA de una plataforma SaaS de logística. Validé la operación completa: desde la carga de visitas y la planificación de rutas en web hasta el cierre de la entrega en la app del conductor.",
    coverage: "Qué validé de punta a punta",
    steps: [
      { title: "Cargar visitas", text: "Creación y edición manual en web, importación por Excel y operaciones por API.", channels: ["Web", "Excel", "API"] },
      { title: "Planificar rutas", text: "Creación y edición de rutas. Validación del algoritmo de optimización con restricciones, escenarios complejos y resultados esperados.", channels: ["Web", "Optimización"] },
      { title: "Completar entregas", text: "Lista de pedidos en la app del conductor, registro de ítems, cierre de la entrega y comprobante con foto y firma. Contrasté el registro con los datos de la entrega.", channels: ["Mobile", "Checkout"] },
    ],
    layers: [
      { title: "Accesos y configuración", text: "Usuarios, roles, permisos, add-ons y configuraciones de cuenta." },
      { title: "APIs e integraciones", text: "Reglas de negocio, webhooks e intercambio de datos con plataformas de retail y comercio electrónico." },
    ],
    outcomes: "Resultados",
    metrics: [
      { value: "90%", label: "de los planes de prueba listos antes de iniciar el desarrollo" },
      { value: "≈25%", label: "de los bugs identificados antes de producción" },
      { value: "1 día", label: "promedio de validación por tarea" },
    ],
    approach: "Cómo aseguré la calidad",
    methods: [
      { title: "Prevención y trazabilidad", text: "Revisé requisitos, criterios de aceptación y casos borde con Producto y Desarrollo. Priorizaba por riesgo y registraba cobertura y defectos en Jira, TestRail y Xray." },
      { title: "Pruebas y automatización", text: "Combiné pruebas funcionales, exploratorias, smoke, de regresión y E2E. Automaticé flujos web críticos con Playwright y TypeScript, validé mobile con Appium y probé APIs con Postman." },
      { title: "Agentes de QA", text: "Construí agentes para contrastar planes de prueba con pull requests y detectar brechas de cobertura. Les incorporé técnicas de diseño de pruebas basadas en ISTQB." },
    ],
    back: "Volver a los casos destacados",
  },
  en: {
    eyebrow: "Work experience",
    intro: "I was responsible for QA on a logistics SaaS platform. I tested the full operation, from creating stops and planning routes on the web to completing deliveries in the driver app.",
    coverage: "What I tested end to end",
    steps: [
      { title: "Create stops", text: "Created and edited stops manually in the web app, through Excel imports, and via the API.", channels: ["Web", "Excel", "API"] },
      { title: "Plan routes", text: "Created and edited routes and tested the optimization algorithm against complex scenarios, constraints, and expected outcomes.", channels: ["Web", "Optimization"] },
      { title: "Complete deliveries", text: "Tested the order list in the driver app, item tracking, checkout, and proof of delivery with photo and signature. I checked the record against the delivery data.", channels: ["Mobile", "Checkout"] },
    ],
    layers: [
      { title: "Access and configuration", text: "Users, roles, permissions, add-ons, and account settings." },
      { title: "APIs and integrations", text: "Business rules, webhooks, and data exchange with retail and e-commerce platforms." },
    ],
    outcomes: "Results",
    metrics: [
      { value: "90%", label: "of test plans ready before development started" },
      { value: "≈25%", label: "of bugs identified before production" },
      { value: "1 day", label: "average validation time per task" },
    ],
    approach: "How I approached quality",
    methods: [
      { title: "Prevention and traceability", text: "I reviewed requirements, acceptance criteria, and edge cases with Product and Engineering, prioritized by risk, and tracked coverage and defects in Jira, TestRail, and Xray." },
      { title: "Testing and automation", text: "I combined functional, exploratory, smoke, regression, and end-to-end testing. I automated critical web flows with Playwright and TypeScript, tested mobile with Appium, and validated APIs with Postman." },
      { title: "QA agents", text: "I built agents that reviewed test plans against pull requests to find gaps in coverage, and equipped them with ISTQB-based test design techniques." },
    ],
    back: "Back to featured case studies",
  },
} as const;

const stageIcons = [
  <path key="visits" d="M9 5H6v16h12V5h-3M9 3h6v4H9zM9 11h6m-6 4h6" />,
  <path key="routes" d="M7 7h8a4 4 0 0 1 0 8H9a2 2 0 0 0 0 4h4m-6-12a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm10 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" />,
  <path key="delivery" d="M8 3h8a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm1 9 2 2 4-4m-4 7h2" />,
];

export default function LogisticsExperience({ lang }: { lang: keyof typeof copy }) {
  const c = copy[lang];

  return (
    <section className={styles.section} id="simpliroute" aria-labelledby="simpliroute-title">
      <div className={styles.inner}>
        <header className={styles.header}>
          <div>
            <p className={styles.eyebrow}>{c.eyebrow}</p>
            <h2 id="simpliroute-title">SimpliRoute</h2>
            <p className={styles.role}>QA Engineer</p>
          </div>
          <p className={styles.intro}>{c.intro}</p>
        </header>

        <h3 className={styles.subheading} id="logistics-coverage">{c.coverage}</h3>
        <ol className={styles.route} aria-labelledby="logistics-coverage">
          {c.steps.map((step, index) => (
            <li key={step.title}>
              <span className={styles.marker}>
                <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {stageIcons[index]}
                </svg>
              </span>
              <h4>{step.title}</h4>
              <p>{step.text}</p>
              <ul className={styles.channels}>
                {step.channels.map(channel => <li key={channel}>{channel}</li>)}
              </ul>
            </li>
          ))}
        </ol>

        <div className={styles.layers}>
          {c.layers.map(layer => (
            <div key={layer.title}>
              <h4>{layer.title}</h4><p>{layer.text}</p>
            </div>
          ))}
        </div>

        <h3 className={styles.subheading} id="logistics-results">{c.outcomes}</h3>
        <ul className={styles.metrics} aria-labelledby="logistics-results">
          {c.metrics.map(metric => (
            <li key={metric.value}><strong>{metric.value}</strong><span>{metric.label}</span></li>
          ))}
        </ul>

        <h3 className={styles.subheading}>{c.approach}</h3>
        <div className={styles.methods}>
          {c.methods.map(method => (
            <div key={method.title}><h4>{method.title}</h4><p>{method.text}</p></div>
          ))}
        </div>

        <a className={styles.back} href="/#casos"><span aria-hidden="true">←</span>{c.back}</a>
      </div>
    </section>
  );
}
