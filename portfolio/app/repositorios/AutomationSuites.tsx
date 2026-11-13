import styles from "./repositories.module.css";

const selenium = "https://github.com/imalisani/selenium-portfolio-python";
const appium = "https://github.com/imalisani/appium-android-delivery-demo";

const javaSuites = [
  {
    title: "Selenium WebDriver",
    platform: { es: "Web · Chrome", en: "Web · Chrome" },
    flow: { es: "Checkout de Sauce Demo", en: "Sauce Demo checkout" },
    cases: {
      es: ["Confirma la compra y valida subtotal, impuestos y total.", "Bloquea el checkout si falta el código postal.", "Recalcula el subtotal al quitar un producto."],
      en: ["Confirms the order and checks subtotal, tax, and total.", "Blocks checkout when the postal code is missing.", "Recalculates the subtotal after removing an item."],
    },
    code: `${selenium}/blob/8661c4a00e57d94cabf15526e8c15e2167e4860a/java-tests/src/test/java/dev/imalisani/saucedemo/CheckoutTest.java`,
    evidence: `${selenium}/actions/runs/43506942690#artifacts`,
  },
  {
    title: "Appium",
    platform: { es: "Mobile · Android 14", en: "Mobile · Android 14" },
    flow: { es: "Comprobante de entrega con foto", en: "Proof of delivery with a photo" },
    cases: {
      es: ["Bloquea la confirmación si falta la foto.", "Mantiene la entrega pendiente si se deniega el permiso de cámara.", "Verifica que la foto y la confirmación persistan al reabrir la app."],
      en: ["Blocks confirmation when the photo is missing.", "Keeps the delivery pending when camera permission is denied.", "Checks that the photo and confirmation persist after reopening the app."],
    },
    code: `${appium}/blob/6054d433afd3ae88abd1101faf3834058c7546fe/java-tests/src/test/java/dev/imalisani/deliveryqa/DeliveryTest.java`,
    evidence: `${appium}/actions/runs/43501650215#artifacts`,
  },
] as const;

const copy = {
  es: {
    title: "Suites de automatización",
    result: "3 de 3 pruebas aprobadas",
    evidenceNote: "Las dos corridas de GitHub Actions dejaron capturas y reportes JUnit. Ambas suites usan Page Objects y esperas explícitas.",
    code: "Ver tests Java",
    evidence: "Ver corrida y evidencia",
    selenium: "Pruebas web de Sauce Demo con Pytest y cobertura de accesibilidad con axe.",
    appium: "Permisos de cámara, captura y persistencia del comprobante en Android.",
    playwright: "Pruebas web E2E de Sauce Demo con Page Objects y cobertura de accesibilidad.",
    repo: "Ver repositorio",
    pythonCode: "Ver tests Python",
    pythonEvidence: "Ver evidencia de Pytest",
    profile: "Ver perfil técnico en GitHub",
  },
  en: {
    title: "Test automation suites",
    result: "3 of 3 tests passed",
    evidenceNote: "Both GitHub Actions runs produced screenshots and JUnit reports. Both suites use Page Objects and explicit waits.",
    code: "View Java tests",
    evidence: "View run and evidence",
    selenium: "Sauce Demo web tests with Pytest and accessibility coverage with axe.",
    appium: "Android camera permissions, photo capture, and proof-of-delivery persistence.",
    playwright: "Sauce Demo end-to-end web tests with Page Objects and accessibility coverage.",
    repo: "View repository",
    pythonCode: "View Python tests",
    pythonEvidence: "View Pytest evidence",
    profile: "View technical profile on GitHub",
  },
} as const;

export default function AutomationSuites({ lang }: { lang: keyof typeof copy }) {
  const content = copy[lang];

  return (
    <section className={styles.suites} id="automatizacion" aria-labelledby="suites-title">
      <h2 id="suites-title">{content.title}</h2>

      <div className={styles.suiteGroup}>
        <h3>Java 17 · JUnit 5 · Maven</h3>
        <p>{content.evidenceNote}</p>
        <div className={styles.suiteGrid}>
          {javaSuites.map((suite) => (
            <article className={styles.suiteCard} key={suite.title}>
              <p className={styles.eyebrow}>{suite.platform[lang]}</p>
              <h4>{suite.title}</h4>
              <p><strong>{suite.flow[lang]}</strong></p>
              <ul>{suite.cases[lang].map((test) => <li key={test}>{test}</li>)}</ul>
              <p className={styles.suiteResult}>{content.result}</p>
              <div className={styles.suiteLinks}>
                <a href={suite.code}>{content.code} <span aria-hidden="true">↗</span></a>
                <a href={suite.evidence}>{content.evidence} <span aria-hidden="true">↗</span></a>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className={styles.suiteGroup}>
        <h3>Python · Pytest</h3>
        <div className={styles.suiteGrid}>
          <article className={styles.suiteCard}>
            <p className={styles.eyebrow}>Web</p>
            <h4>Selenium WebDriver</h4>
            <p>{content.selenium}</p>
            <div className={styles.suiteLinks}><a href={`${selenium}#readme`}>{content.repo} <span aria-hidden="true">↗</span></a></div>
          </article>
          <article className={styles.suiteCard} id="qa-mobile">
            <p className={styles.eyebrow}>Mobile · Android</p>
            <h4>Appium</h4>
            <p>{content.appium}</p>
            <div className={styles.suiteLinks}>
              <a href={`${appium}/blob/6fe37c06a68e4c3cef7ed3f8b8ae88be6e7b7591/tests/test_delivery.py`}>{content.pythonCode} <span aria-hidden="true">↗</span></a>
              <a href={`${appium}/actions/runs/43121075840#artifacts`}>{content.pythonEvidence} <span aria-hidden="true">↗</span></a>
            </div>
          </article>
        </div>
      </div>

      <div className={styles.suiteGroup}>
        <h3>TypeScript</h3>
        <div className={styles.suiteGrid}>
          <article className={styles.suiteCard}>
            <p className={styles.eyebrow}>Web</p>
            <h4>Playwright</h4>
            <p>{content.playwright}</p>
            <div className={styles.suiteLinks}><a href="https://github.com/imalisani/playwright-portfolio-typescript">{content.repo} <span aria-hidden="true">↗</span></a></div>
          </article>
        </div>
      </div>

      <a className={styles.suiteProfile} href="https://github.com/imalisani/imalisani">{content.profile} <span aria-hidden="true">↗</span></a>
    </section>
  );
}
