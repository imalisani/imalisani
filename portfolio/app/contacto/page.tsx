import type { Metadata } from "next";
import ContactPage from "./ContactPage";

export const metadata: Metadata = {
  title: "Contacto | Irina Malisani",
};

export default function Page() {
  return <ContactPage/>;
}
