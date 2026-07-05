import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const settings = await prisma.settings.upsert({ where: { id: 1 }, update: {}, create: { id: 1 } });
  return NextResponse.json(settings);
}

export async function PUT(req: NextRequest) {
  const body = await req.json();

  const {
    serverName,
    tagline,
    logoUrl,
    faviconUrl,
    bannerUrl,
    backgroundUrl,
    themeColor,
    heroTitle,
    heroSubtitle,
    aboutTitle,
    aboutContent,
    footerText,
    discordUrl,
    twitterUrl,
    instagramUrl,
    youtubeUrl,
    tiktokUrl,
    contactEmail
  } = body;

  const updated = await prisma.settings.upsert({
    where: { id: 1 },
    update: {
      serverName,
      tagline,
      logoUrl,
      faviconUrl,
      bannerUrl,
      backgroundUrl,
      themeColor,
      heroTitle,
      heroSubtitle,
      aboutTitle,
      aboutContent,
      footerText,
      discordUrl,
      twitterUrl,
      instagramUrl,
      youtubeUrl,
      tiktokUrl,
      contactEmail
    },
    create: {
      id: 1,
      serverName,
      tagline,
      logoUrl,
      faviconUrl,
      bannerUrl,
      backgroundUrl,
      themeColor,
      heroTitle,
      heroSubtitle,
      aboutTitle,
      aboutContent,
      footerText,
      discordUrl,
      twitterUrl,
      instagramUrl,
      youtubeUrl,
      tiktokUrl,
      contactEmail
    }
  });

  return NextResponse.json(updated);
}
