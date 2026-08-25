import {NextResponse} from "next/server";

const destination="irinanmalisani@gmail.com";
const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value:string){
return value.replace(/[&<>'"]/g,character=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[character]??character);
}

export async function POST(request:Request){
let payload:Record<string,unknown>;
try{
payload=await request.json();
}catch{
return NextResponse.json({error:"Invalid request"},{status:400});
}

const name=typeof payload.name==="string"?payload.name.trim():"";
const email=typeof payload.email==="string"?payload.email.trim():"";
const subject=typeof payload.subject==="string"?payload.subject.trim():"";
const message=typeof payload.message==="string"?payload.message.trim():"";
const website=typeof payload.website==="string"?payload.website.trim():"";

if(website)return NextResponse.json({ok:true});
if(name.length<2||name.length>100||!emailPattern.test(email)||email.length>254||subject.length<2||subject.length>160||message.length<2||message.length>5000){
return NextResponse.json({error:"Invalid form fields"},{status:400});
}

const apiKey=process.env.RESEND_API_KEY;
if(!apiKey)return NextResponse.json({error:"Email service unavailable"},{status:503});

const safeName=escapeHtml(name);
const safeEmail=escapeHtml(email);
const safeSubject=escapeHtml(subject);
const safeMessage=escapeHtml(message).replace(/\n/g,"<br/>");
const response=await fetch("https://api.resend.com/emails",{
method:"POST",
headers:{Authorization:`Bearer ${apiKey}`,"Content-Type":"application/json","User-Agent":"irina-malisani-portfolio/1.0"},
body:JSON.stringify({
from:process.env.CONTACT_FROM_EMAIL??"Portfolio de Irina <onboarding@resend.dev>",
to:[destination],
reply_to:email,
subject:`[Portfolio] ${subject}`,
text:`Nombre: ${name}\nEmail: ${email}\n\n${message}`,
html:`<h2>${safeSubject}</h2><p><strong>Nombre:</strong> ${safeName}<br/><strong>Email:</strong> ${safeEmail}</p><p>${safeMessage}</p>`
})
});

if(!response.ok)return NextResponse.json({error:"Email delivery failed"},{status:502});
return NextResponse.json({ok:true});
}
