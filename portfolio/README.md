# Portfolio de Irina Malisani

Portfolio bilingüe de **QA Engineering** preparado para desplegarse con Next.js en Vercel. Presenta mi experiencia, mi enfoque preventivo de calidad y evidencia pública de cómo convierto requerimientos y riesgos en decisiones de release.

Sitio publicado: [irina-malisani.vercel.app](https://irina-malisani.vercel.app/)

## Contenido

- Portfolio responsive en español e inglés, con modo claro y oscuro.
- Experiencia profesional, métricas de impacto y CV descargable.
- Mapa visual de skills técnicas, estratégicas y humanas, con movimiento y soporte para `prefers-reduced-motion`.
- Casos de prueba con trazabilidad, escenarios Gherkin y enlaces a implementaciones públicas.
- Repositorios de automatización y evidencias de ejecución.
- Formulario y canales de contacto.

## Recorridos principales

- [Cómo trabajo](https://irina-malisani.vercel.app/como-trabajo): desde que una historia de usuario llega a QA hasta la decisión de release.
- [Agentic QA Lab](https://irina-malisani.vercel.app/agentic-qa-lab): recorrido animado por scroll del sistema de agentes, desde la historia de usuario hasta el reporte final.
- [Casos de prueba](https://irina-malisani.vercel.app/casos-de-prueba): ejemplos basados en riesgo, técnicas de diseño y escenarios Gherkin.
- [Repositorios](https://irina-malisani.vercel.app/repositorios): estrategia, arquitectura, automatización y evidencia pública.

## Cómo trabajo

La ruta `/como-trabajo` presenta un proceso trazable que combina:

1. Lectura humana de requerimientos y primer plan asistido por IA.
2. Resolución temprana de dudas con Producto y Desarrollo.
3. Entrega del plan de pruebas antes de **In Progress**.
4. Comparación del plan contra el diff real.
5. Automatización, ejecución manual y evidencia en Allure.
6. Una salida clara: **Return to Dev**, **Alerta** o **Ready for Deploy**.

## Agentic QA Lab

La ruta `/agentic-qa-lab` presenta un scrollytelling bilingüe: el QA Orchestrator permanece como núcleo, activa los especialistas necesarios y consolida el resultado final. El recorrido documentado incluye:

1. Historia de usuario y análisis de requerimientos.
2. Ambigüedades, preguntas y riesgos priorizados.
3. Diseño de 12 escenarios con trazabilidad.
4. Selección e implementación de 6 pruebas Playwright.
5. Ejecución verificada: **6 passed, 0 failed**.
6. Reporte final con alcance y riesgos residuales explícitos.

La experiencia es un replay visual de evidencia pública; no ejecuta Playwright dentro del portfolio.

Repositorio que respalda la demostración: [`imalisani/qa-agents-demo`](https://github.com/imalisani/qa-agents-demo).

El [dashboard Allure](https://imalisani.github.io/qa-agents-demo/) permite explorar los resultados reales, suites, tiempos y detalle de cada caso. El workflow `publish-allure.yml` lo publica automáticamente mediante GitHub Pages en cada push a `main`.

La página también reproduce `public/evidence/videos/ecommerce-showcase.webm`, un showcase E2E real generado con `npm run test:portfolio`. La versión web omite los tres segundos iniciales sin actividad y reproduce en bucle 26,2 segundos útiles del flujo de autenticación, búsqueda de producto, carrito y checkout en Chromium headed.

## Tecnologías

- Next.js 16
- React 19
- TypeScript
- CSS Modules
- Vercel Analytics y Speed Insights

## Ejecutar localmente

Requiere Node.js 22.13 o superior.

```bash
cd portfolio
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

## Despliegue en Vercel

1. Importar el repositorio `imalisani/imalisani`.
2. Elegir `portfolio` como **Root Directory**.
3. Usar `irina-malisani` como nombre del proyecto.
4. Mantener el framework detectado como **Next.js** y desplegar.

No requiere variables de entorno.

## Contacto

- [LinkedIn](https://www.linkedin.com/in/imalisani/)
- [GitHub](https://github.com/imalisani)
- [Portfolio](https://irina-malisani.vercel.app/)
