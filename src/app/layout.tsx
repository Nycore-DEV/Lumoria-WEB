import type { Metadata } from "next";
import { Sora, Inter, Press_Start_2P } from "next/font/google";
import "./globals.css";
import { prisma } from "@/lib/prisma";

const sora = Sora({ subsets: ["latin"], variable: "--font-sora", weight: ["400", "600", "700", "800"] });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const pixel = Press_Start_2P({ subsets: ["latin"], variable: "--font-pixel", weight: "400" });

export async function generateMetadata(): Promise<Metadata> {
  let settings;
  try {
    settings = await prisma.settings.findUnique({ where: { id: 1 } });
  } catch {
    settings = null;
  }

  const name = settings?.serverName || "Minecraft Server";

  return {
    title: `${name} - Official Website`,
    description: settings?.tagline || "Server Minecraft resmi.",
    icons: settings?.faviconUrl ? [{ url: settings.faviconUrl }] : undefined
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${sora.variable} ${inter.variable} ${pixel.variable}`}>
      <body className="font-body bg-ink-50 text-mist antialiased">{children}</body>
    </html>
  );
}
