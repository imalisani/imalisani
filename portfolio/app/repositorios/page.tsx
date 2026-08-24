import type {Metadata} from "next";
import RepositoriesPage from "./RepositoriesPage";

export const metadata: Metadata = {
  title: "Repositorios | Irina Malisani",
  description: "Repositorios públicos de QA con estrategia, automatización, arquitectura, trazabilidad y evidencia de ejecución.",
  alternates: {canonical: "/repositorios"},
  openGraph: {
    title: "Repositorios | Irina Malisani",
    description: "Código público que conecta estrategia de pruebas, automatización y evidencia real.",
    url: "/repositorios",
    type: "website",
    images: [],
  },
  twitter: {
    card: "summary",
    title: "Repositorios | Irina Malisani",
    description: "Código público que conecta estrategia de pruebas, automatización y evidencia real.",
    images: [],
  },
};

export default function RepositoriesRoute(){
  return <RepositoriesPage/>;
}
