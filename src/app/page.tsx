import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Features } from "@/components/sections/Features";
import { ServerInfoSection } from "@/components/sections/ServerInfoSection";
import { Staff } from "@/components/sections/Staff";
import { Announcements } from "@/components/sections/Announcements";
import { Faq } from "@/components/sections/Faq";
import { Footer } from "@/components/sections/Footer";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [settings, serverInfo, buttons, features, staff, announcements, faq] = await Promise.all([
    prisma.settings.upsert({ where: { id: 1 }, update: {}, create: { id: 1 } }),
    prisma.serverInfo.upsert({ where: { id: 1 }, update: {}, create: { id: 1 } }),
    prisma.actionButton.findMany({ orderBy: { order: "asc" } }),
    prisma.feature.findMany({ orderBy: { order: "asc" } }),
    prisma.staffMember.findMany({ orderBy: { order: "asc" } }),
    prisma.announcement.findMany({ where: { published: true }, orderBy: { createdAt: "desc" }, take: 8 }),
    prisma.faqItem.findMany({ orderBy: { order: "asc" } })
  ]);

  return (
    <main className="min-h-screen">
      <Navbar serverName={settings.serverName} logoUrl={settings.logoUrl} />

      <Hero
        serverName={settings.serverName}
        tagline={settings.tagline}
        heroTitle={settings.heroTitle}
        heroSubtitle={settings.heroSubtitle}
        backgroundUrl={settings.backgroundUrl}
        logoUrl={settings.logoUrl}
        buttons={buttons}
        status={serverInfo.status}
      />

      <About title={settings.aboutTitle} content={settings.aboutContent} />

      <Features features={features} />

      <ServerInfoSection
        ip={serverInfo.ip}
        bedrockPort={serverInfo.bedrockPort}
        version={serverInfo.version}
        gameMode={serverInfo.gameMode}
        status={serverInfo.status}
        onlinePlayers={serverInfo.onlinePlayers}
        maxPlayers={serverInfo.maxPlayers}
        location={serverInfo.location}
      />

      <Staff staff={staff} />

      <Announcements
        announcements={announcements.map((a) => ({ ...a, createdAt: a.createdAt.toISOString() }))}
      />

      <Faq items={faq} />

      <Footer
        serverName={settings.serverName}
        footerText={settings.footerText}
        discordUrl={settings.discordUrl}
        twitterUrl={settings.twitterUrl}
        instagramUrl={settings.instagramUrl}
        youtubeUrl={settings.youtubeUrl}
        tiktokUrl={settings.tiktokUrl}
        contactEmail={settings.contactEmail}
      />
    </main>
  );
}
