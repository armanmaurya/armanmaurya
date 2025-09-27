import type { Metadata, Viewport } from "next";
import { Geist_Mono, Orbitron } from "next/font/google";

import { MotionShell } from "@/components/layout/motion-provider";

import "./globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-orbitron",
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Arman Maurya · Creative Frontend Engineer",
  description:
    "Dark-mode portfolio for Arman Maurya blending immersive visuals, performant motion, and a showcase of modern web projects.",
  keywords: [
    "Arman Maurya",
    "Frontend Engineer",
    "Portfolio",
    "Next.js",
    "React",
    "Framer Motion",
  ],
  authors: [{ name: "Arman Maurya" }],
  metadataBase: new URL("https://armanmaurya.dev"),
  openGraph: {
    title: "Arman Maurya · Creative Frontend Engineer",
    description:
      "An elevated portfolio experience balancing aesthetics, storytelling, and performance.",
    url: "https://armanmaurya.dev",
    siteName: "Arman Maurya",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@armanmaurya",
    title: "Arman Maurya · Creative Frontend Engineer",
    description:
      "Explore selected case studies, technical skills, and contact details for collaborations.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${orbitron.className} ${orbitron.variable} ${geistMono.variable} bg-transparent text-foreground antialiased`}
      >
        <MotionShell>{children}</MotionShell>
      </body>
    </html>
  );
}
