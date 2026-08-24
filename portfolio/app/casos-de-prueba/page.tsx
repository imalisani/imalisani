import type {Metadata} from "next";
import TestCasesPage from "./TestCasesPage";

export const metadata: Metadata = {
  title: "Casos de prueba | Irina Malisani",
  description: "Ejemplos bilingües de diseño de pruebas en Gherkin, con riesgo, técnica y código público.",
  alternates: {canonical: "/casos-de-prueba"},
  openGraph: {
    title: "Casos de prueba | Irina Malisani",
    description: "Escenarios Gherkin trazables, basados en riesgo y conectados con implementaciones reales.",
    url: "/casos-de-prueba",
    type: "website",
    images: [],
  },
  twitter: {
    card: "summary",
    title: "Casos de prueba | Irina Malisani",
    description: "Escenarios Gherkin trazables, basados en riesgo y conectados con implementaciones reales.",
    images: [],
  },
};

export default function TestCasesRoute(){
  return <TestCasesPage/>;
}
