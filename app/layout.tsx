import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Sonu Garg — Analytics, with impact.', description: 'BI & Analytics Lead in Bengaluru. 11+ years turning complex data into clearer decisions across Accenture, Commvault, and Amazon.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
