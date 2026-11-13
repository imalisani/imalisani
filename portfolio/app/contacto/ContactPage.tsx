"use client";

import { type FormEvent, useState } from "react";
import SocialDock from "../components/SocialDock";
import PortfolioHeader from "../components/PortfolioHeader";
import { usePortfolioPreferences } from "../components/usePortfolioPreferences";

const copy = {
  es: {
    contactLabel:"Contacto",contactTitle:<>¿Estás construyendo algo<br/>que necesita <em>confianza?</em></>,contactHeading:"Trabajemos juntos",
    name:"Nombre",email:"Email",subject:"Asunto",message:"Mensaje",send:"Enviar mensaje",sending:"Enviando…",success:"¡Gracias! Tu mensaje fue enviado.",error:"No se pudo enviar el mensaje. Intentá nuevamente.",
    calendarLabel:"Reserva directa",calendarTitle:"¿Preferís coordinar directamente?",calendarCopy:"Evitá el ida y vuelta: elegí el horario que mejor te quede y agendemos una conversación.",calendarLink:"Ver horarios disponibles",
  },
  en: {
    contactLabel:"Contact",contactTitle:<>Building something<br/>that needs <em>confidence?</em></>,contactHeading:"Let’s work together",
    name:"Name",email:"Email",subject:"Subject",message:"Message",send:"Send message",sending:"Sending…",success:"Thanks! Your message was sent.",error:"The message could not be sent. Please try again.",
    calendarLabel:"Direct booking",calendarTitle:"Prefer to coordinate directly?",calendarCopy:"Skip the back-and-forth: choose the time that works best for you and let’s schedule a conversation.",calendarLink:"View available times",
  },
} as const;

const Arrow = () => <span aria-hidden="true">↗</span>;

export default function ContactPage() {
  const preferences = usePortfolioPreferences();
  const { lang } = preferences;
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const c = copy[lang];

  const handleContactSubmit=async(event:FormEvent<HTMLFormElement>)=>{
    event.preventDefault();const form=event.currentTarget;const data=Object.fromEntries(new FormData(form).entries());setFormStatus("sending");
    try{
      const response=await fetch("/api/contact",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)});
      if(!response.ok)throw new Error("Contact request failed");form.reset();setFormStatus("success");
    }catch{setFormStatus("error");}
  };

  return <main lang={lang}>
    <PortfolioHeader {...preferences} showBack/>
    <section className="contactPage" id="contact" aria-labelledby="contact-title">
      <p className="label">{c.contactLabel}</p><h1 className="contactPageTitle" id="contact-title">{c.contactTitle}</h1>
      <SocialDock lang={lang}/>
      <div className="footerbottom">
        <div className="contactArea"><h2 className="contactHeading">{c.contactHeading}</h2><form className="contactForm" onSubmit={handleContactSubmit}><div className="contactFormGrid"><label><span>{c.name}</span><input name="name" type="text" autoComplete="name" maxLength={100} required/></label><label><span>{c.email}</span><input name="email" type="email" autoComplete="email" maxLength={254} required/></label></div><label><span>{c.subject}</span><input name="subject" type="text" maxLength={160} required/></label><label><span>{c.message}</span><textarea name="message" rows={5} maxLength={5000} required/></label><label className="contactHoneypot" aria-hidden="true"><span>Website</span><input name="website" type="text" tabIndex={-1} autoComplete="off"/></label><div className="contactFormActions"><button type="submit" disabled={formStatus==="sending"}>{formStatus==="sending"?c.sending:c.send} <Arrow/></button><p className={`contactFormStatus ${formStatus}`} role="status" aria-live="polite">{formStatus==="success"?c.success:formStatus==="error"?c.error:""}</p></div></form></div>
        <aside className="bookingArea" aria-labelledby="booking-title"><a className="bookingCard" href="https://calendar.app.google/f3mb9RDYyet8KZa9A" target="_blank" rel="noreferrer"><span className="bookingOrbit bookingOrbitOne" aria-hidden="true"/><span className="bookingOrbit bookingOrbitTwo" aria-hidden="true"/><span className="bookingNode" aria-hidden="true"/><p className="bookingEyebrow">{c.calendarLabel}</p><h2 className="bookingTitle" id="booking-title">{c.calendarTitle}</h2><p className="bookingCopy">{c.calendarCopy}</p><span className="bookingAction">{c.calendarLink} <Arrow/></span></a></aside>
      </div>
      <p className="signature">IRINA MALISANI</p>
    </section>
  </main>;
}
