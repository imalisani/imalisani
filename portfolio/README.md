# Portfolio de Irina Malisani

Portfolio bilingüe de QA Engineering preparado para desplegarse con Next.js en Vercel.

Sitio publicado: [irina-malisani.vercel.app](https://irina-malisani.vercel.app/)

## Contenido

- Portfolio responsive en español e inglés, con modo claro y oscuro.
- Experiencia, métricas mensuales, casos de prueba y repositorios públicos.
- Habilidades técnicas y humanas, CV descargable y canales de contacto.
- Página independiente [Cómo trabajo](https://irina-malisani.vercel.app/como-trabajo), con el recorrido completo desde que una historia de usuario llega a QA hasta la decisión de release.
- Laboratorio interactivo `/agentic-qa-lab`, basado en una ejecución verificada del repositorio público [`qa-agents-demo`](https://github.com/imalisani/qa-agents-demo).

## Cómo trabajo

La ruta `/como-trabajo` presenta un proceso trazable que combina:

1. Lectura humana de requerimientos y primer plan asistido por IA.
2. Resolución temprana de dudas con Producto y Desarrollo.
3. Entrega del plan de pruebas antes de **In Progress**.
4. Comparación del plan contra el diff real.
5. Automatización, ejecución manual y evidencia en Allure.
6. Una salida clara: **Return to Dev**, **Alerta** o **Ready for Deploy**.

## Agentic QA Lab

La ruta `/agentic-qa-lab` reproduce el recorrido documentado de un caso de reembolsos:

1. Historia de usuario y análisis de requerimientos.
2. Ambigüedades, preguntas y riesgos priorizados.
3. Diseño de 12 escenarios con trazabilidad.
4. Selección e implementación de 6 pruebas Playwright.
5. Ejecución verificada: **6 passed, 0 failed**.
6. Reporte final con alcance y riesgos residuales explícitos.

La experiencia es un replay visual de evidencia pública; no ejecuta Playwright dentro del portfolio.

## Despliegue en Vercel

1. Importar el repositorio `imalisani/imalisani`.
2. Elegir `portfolio` como **Root Directory**.
3. Usar `irina-malisani` como nombre del proyecto.
4. Mantener el framework detectado como **Next.js** y desplegar.

No requiere variables de entorno.
