type Language="en"|"es";

type SocialLink={
  name:string;
  href:string;
  icon:"linkedin"|"github"|"instagram"|"twitch"|"x"|"email"|"whatsapp";
  external?:boolean;
};

const links:SocialLink[]=[
  {name:"LinkedIn",href:"https://www.linkedin.com/in/imalisani/",icon:"linkedin",external:true},
  {name:"GitHub",href:"https://github.com/imalisani",icon:"github",external:true},
  {name:"Instagram",href:"https://www.instagram.com/irinamalisani/",icon:"instagram",external:true},
  {name:"Twitch",href:"https://www.twitch.tv/iris_mlsni",icon:"twitch",external:true},
  {name:"X",href:"https://x.com/irinamalisani",icon:"x",external:true},
  {name:"Email",href:"mailto:irinanmalisani@gmail.com",icon:"email"},
  {name:"WhatsApp",href:"https://wa.me/543424629957",icon:"whatsapp",external:true}
];

function SocialIcon({name}:{name:SocialLink["icon"]}){
  if(name==="linkedin")return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.4 7.3A2.15 2.15 0 1 0 5.4 3a2.15 2.15 0 0 0 0 4.3ZM3.5 9h3.8v11.5H3.5V9Zm6.1 0h3.6v1.6h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.7 4.8 6.1v5.8h-3.8v-5.2c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.3H9.6V9Z"/></svg>;
  if(name==="github")return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.86c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.35 1.09 2.92.83.09-.65.35-1.09.64-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.84c.85 0 1.7.11 2.5.33 1.9-1.29 2.74-1.02 2.74-1.02.56 1.37.21 2.39.11 2.64.64.7 1.02 1.59 1.02 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.86v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"/></svg>;
  if(name==="instagram")return <svg className="socialOutlineIcon" viewBox="0 0 24 24" strokeWidth="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.5" cy="6.5" r="1" className="socialIconDot"/></svg>;
  if(name==="twitch")return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 3h17v12l-5 5h-4l-2.5 2.5V20H5V17H2.5L4 3Zm2 2-1 10h4v3l3-3h5l2-2V5H6Zm4 3h2v5h-2V8Zm5 0h2v5h-2V8Z"/></svg>;
  if(name==="x")return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.2 3h4.4l4.2 5.6L17.7 3h2.1l-6 7.1L20.5 21h-4.4l-4.7-6.2L6.1 21H4l6.4-7.6L4.2 3Zm3.3 1.7 9.5 14.6h1.7L9.2 4.7H7.5Z"/></svg>;
  if(name==="email")return <svg className="socialOutlineIcon" viewBox="0 0 24 24" strokeWidth="1.8" aria-hidden="true"><rect x="2.5" y="4.5" width="19" height="15" rx="2"/><path d="m4 7 8 6 8-6"/></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.04 2a9.84 9.84 0 0 0-8.42 14.92L2.05 22l5.2-1.53A9.9 9.9 0 1 0 12.04 2Zm0 17.82a7.78 7.78 0 0 1-3.97-1.09l-.28-.17-3.08.91.92-3-.18-.3A7.76 7.76 0 1 1 12.04 19.82Zm4.27-5.82c-.24-.12-1.39-.69-1.6-.76-.22-.08-.38-.12-.54.12-.16.23-.61.76-.75.92-.14.15-.28.17-.51.05-.24-.12-1-.37-1.9-1.17a7.16 7.16 0 0 1-1.31-1.63c-.14-.23-.02-.36.1-.48.11-.1.24-.27.35-.4.12-.14.16-.24.24-.4.08-.15.04-.29-.02-.4-.06-.12-.53-1.29-.73-1.76-.2-.46-.39-.4-.54-.4h-.45c-.16 0-.41.06-.63.3-.21.23-.82.8-.82 1.96s.84 2.28.96 2.44c.12.15 1.66 2.53 4.02 3.55.56.24 1 .39 1.34.5.57.18 1.08.15 1.49.09.45-.07 1.39-.57 1.59-1.12.19-.55.19-1.02.13-1.12-.06-.1-.22-.16-.46-.28Z"/></svg>;
}

export default function SocialDock({lang}:{lang:Language}){
  return <nav className="socialDock" aria-label={lang==="es"?"Redes sociales y contacto":"Social networks and contact"}>
    {links.map(link=><a
      className="socialDockLink"
      data-label={link.name}
      href={link.href}
      key={link.name}
      aria-label={link.name}
      target={link.external?"_blank":undefined}
      rel={link.external?"noreferrer":undefined}
    ><SocialIcon name={link.icon}/></a>)}
  </nav>;
}
