import type {Metadata} from "next";
import ProcessJourney from "./ProcessJourney";

export const metadata: Metadata = {
  title: "Cómo trabajo | Irina Malisani",
  description: "Del requerimiento al release: diseño temprano, agentes de QA, automatización, testing manual y decisiones basadas en evidencia.",
  alternates: {canonical: "/como-trabajo"},
};

export default function HowIWorkPage(){
  return <ProcessJourney/>;
}
