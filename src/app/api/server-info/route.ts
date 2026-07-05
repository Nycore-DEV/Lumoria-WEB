import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const info = await prisma.serverInfo.upsert({ where: { id: 1 }, update: {}, create: { id: 1 } });
  return NextResponse.json(info);
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const { ip, bedrockPort, version, gameMode, status, onlinePlayers, maxPlayers, location, extra } = body;

  const updated = await prisma.serverInfo.upsert({
    where: { id: 1 },
    update: {
      ip,
      bedrockPort,
      version,
      gameMode,
      status,
      onlinePlayers: Number(onlinePlayers) || 0,
      maxPlayers: Number(maxPlayers) || 0,
      location,
      extra
    },
    create: {
      id: 1,
      ip,
      bedrockPort,
      version,
      gameMode,
      status,
      onlinePlayers: Number(onlinePlayers) || 0,
      maxPlayers: Number(maxPlayers) || 0,
      location,
      extra
    }
  });

  return NextResponse.json(updated);
}
