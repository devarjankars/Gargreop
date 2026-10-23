import type { Metadata } from "next";
import localFont from "next/font/local";
import { Arrival } from "@/components/arrival";
import "./globals.css";

const manrope = localFont({
  src: "../node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2",
  variable: "--font-manrope",
  weight: "200 800",
  display: "swap",
});
const editorial = localFont({
  src: "../node_modules/@fontsource/dm-serif-display/files/dm-serif-display-latin-400-italic.woff2",
  variable: "--font-editorial",
  weight: "400",
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
    <html lang="en" className={`${manrope.variable} ${editorial.variable}`}>
      <body>
        <Arrival />
        {children}
      </body>
    </html>
  );
}
