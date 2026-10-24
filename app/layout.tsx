import type { Metadata } from "next";
import localFont from "next/font/local";
import { Arrival } from "@/components/arrival";
import { CursorAura } from "@/components/cursor-aura";
import { ScrollCompass } from "@/components/scroll-compass";
import { AmbientMotion } from "@/components/ambient-motion";
import "./globals.css";
import "./refinements.css";
import "./discovery.css";
import "./portfolio.css";

const manrope = localFont({
  src: "../node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2",
  variable: "--font-manrope",
  weight: "200 800",
  display: "swap",
});
const editorial = localFont({
  src: "../node_modules/@fontsource-variable/lora/files/lora-latin-wght-italic.woff2",
  variable: "--font-editorial",
  weight: "400 700",
  style: "italic",
  display: "swap",
});
export const metadata: Metadata = {
  title: "Sonu Garg — Clarity in complexity.",
  description:
    "BI & Analytics Lead in Bengaluru. 11+ years connecting data, risk, and AI across Accenture, Commvault, and Amazon.",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-arrival="pending"
      className={`${manrope.variable} ${editorial.variable}`}
    >
      <body>
        <CursorAura />
        <Arrival />
        <AmbientMotion />
        {children}
        <ScrollCompass />
      </body>
    </html>
  );
}
