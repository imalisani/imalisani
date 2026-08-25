import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://irina-malisani.vercel.app"),
  title: "Irina Malisani | QA Engineer",
  description:
    "QA Engineer especializada en shift-left testing, automatización inteligente y agentic quality engineering.",
  openGraph: {
    title: "Irina Malisani | QA Engineer",
    description: "Calidad antes de que el usuario tenga que pedirla.",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1731,
        height: 909,
        alt: "Irina Malisani — QA Engineer, Shift-Left y Agentic Quality",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Irina Malisani | QA Engineer",
    description: "Calidad antes de que el usuario tenga que pedirla.",
    images: ["/og.png"],
  },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
