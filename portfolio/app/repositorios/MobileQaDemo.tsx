import styles from "./repositories.module.css";

const repository = "https://github.com/imalisani/appium-android-delivery-demo";
const verifiedCommit = "6fe37c06a68e4c3cef7ed3f8b8ae88be6e7b7591";
const source = `${repository}/blob/${verifiedCommit}`;
const run = `${repository}/actions/runs/43121075840`;

const copy = {
  es: {
    title: "Comprobante de entrega con foto",
    intro: "Una app nativa en Java y CameraX simula la entrega DEMO-101. Appium, Python y Pytest prueban el permiso de cámara de Android y verifican que la foto y el estado se guarden localmente.",
    status: "3 de 3 pruebas aprobadas en Android 14",
    repo: "Ver repositorio",
    cases: [
      { id: "POD-01", title: "Entrega sin foto", result: "La confirmación está deshabilitada y la entrega sigue pendiente." },
      { id: "POD-02", title: "Permiso de cámara denegado", result: "La app informa la denegación, bloquea la confirmación y mantiene la entrega pendiente." },
      { id: "POD-03", title: "Captura, confirmación y reapertura", result: "Appium acepta el permiso del sistema y toma una foto con la cámara del emulador. Tras confirmar y reabrir la app, la foto sigue visible y la entrega figura como confirmada." },
    ],
    gherkin: "Escenario Gherkin",
    test: "Prueba Appium en Python",
    run: "Corrida y artefactos",
    artifacts: "La corrida de GitHub Actions incluye el APK, las capturas, el reporte JUnit y el log de Appium.",
  },
  en: {
    title: "Proof of delivery with a photo",
    intro: "A native Java and CameraX app simulates delivery DEMO-101. Appium, Python, and Pytest exercise Android’s camera permission and verify that the photo and delivery status are stored locally.",
    status: "3 of 3 tests passed on Android 14",
    repo: "View repository",
    cases: [
      { id: "POD-01", title: "Delivery without a photo", result: "Confirmation is disabled and the delivery stays pending." },
      { id: "POD-02", title: "Camera permission denied", result: "The app explains the denial, blocks confirmation, and leaves the delivery pending." },
      { id: "POD-03", title: "Capture, confirm, and reopen", result: "Appium grants the system permission and takes a photo with the emulator camera. After confirming and reopening the app, the photo is still visible and the delivery is marked as confirmed." },
    ],
    gherkin: "Gherkin scenario",
    test: "Python Appium test",
    run: "Run and artifacts",
    artifacts: "The GitHub Actions run includes the APK, screenshots, the JUnit report, and the Appium log.",
  },
} as const;

export default function MobileQaDemo({ lang }: { lang: keyof typeof copy }) {
  const content = copy[lang];

  return (
    <section className={styles.mobileDemo} id="qa-mobile" aria-labelledby="qa-mobile-title">
      <header className={styles.mobileDemoHeader}>
        <div>
          <p className={styles.eyebrow}>Android · Appium · Python · Pytest</p>
          <h2 id="qa-mobile-title">{content.title}</h2>
          <p>{content.intro}</p>
        </div>
        <div className={styles.mobileDemoStatus}>
          <strong>{content.status}</strong>
          <a href={repository}>{content.repo} <span aria-hidden="true">↗</span></a>
        </div>
      </header>
      <div className={styles.mobileDemoCases}>
        {content.cases.map(({ id, title, result }) => (
          <article className={id === "POD-03" ? styles.mobileDemoFocus : undefined} key={id}>
            <p className={styles.eyebrow}>{id}</p>
            <h3>{title}</h3>
            <p>{result}</p>
            {id === "POD-03" && (
              <>
                <div className={styles.mobileDemoLinks}>
                  <a href={`${source}/docs/proof-of-delivery.feature#L26-L35`}>{content.gherkin} <span aria-hidden="true">↗</span></a>
                  <a href={`${source}/tests/test_delivery.py#L28-L47`}>{content.test} <span aria-hidden="true">↗</span></a>
                  <a href={`${run}#artifacts`}>{content.run} <span aria-hidden="true">↗</span></a>
                </div>
                <p className={styles.mobileDemoArtifacts}>{content.artifacts}</p>
              </>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
