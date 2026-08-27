import type {Metadata} from "next";
import AgenticQaLab from "./AgenticQaLab";

export const metadata:Metadata={
  title:"Agentic QA Lab | Irina Malisani",
  description:"De una historia de usuario compleja a una ejecución Playwright y un reporte trazable: agentes QA, riesgos, automatización y evidencia real.",
  alternates:{canonical:"/agentic-qa-lab"},
  openGraph:{
    title:"Agentic QA Lab | Irina Malisani",
    description:"Un recorrido verificable desde el requerimiento hasta el reporte de ejecución.",
    url:"/agentic-qa-lab",
    type:"website",
    images:[],
  },
  twitter:{
    card:"summary",
    title:"Agentic QA Lab | Irina Malisani",
    description:"Agentes QA, Playwright y evidencia real desde la historia de usuario hasta el reporte.",
    images:[],
  },
};

export default function AgenticQaLabPage(){
  return <AgenticQaLab/>;
}
