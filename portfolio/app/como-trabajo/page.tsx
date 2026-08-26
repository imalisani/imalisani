import type {Metadata} from "next";
import ProcessJourney from "./ProcessJourney";

export const metadata: Metadata = {
  title: "Cómo trabajo | Irina Malisani",
  description: "Del requerimiento al release: diseño temprano, agentes de QA, automatización, testing manual y decisiones basadas en evidencia.",
  alternates: {canonical: "/como-trabajo"},
  openGraph: {
    title: "Cómo trabajo | Irina Malisani",
    description: "Del requerimiento al release: un flujo de QA temprano, trazable y basado en evidencia.",
    url: "/como-trabajo",
    type: "website",
    images: [],
  },
  twitter: {
    card: "summary",
    title: "Cómo trabajo | Irina Malisani",
    description: "Del requerimiento al release: un flujo de QA temprano, trazable y basado en evidencia.",
    images: [],
  },
};

export default function HowIWorkPage(){
  return <ProcessJourney/>;
}
