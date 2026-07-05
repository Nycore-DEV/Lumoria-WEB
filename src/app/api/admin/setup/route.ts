import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { createSessionToken, SESSION_COOKIE } from "@/lib/auth";

// GET: tell the client whether a first admin account still needs to be created.
export async function GET() {
  const count = await prisma.adminUser.count();
  return NextResponse.json({ needsSetup: count === 0 });
}

// POST: create the first admin account. Only works while no admin account exists,
// so this can never be used to create additional accounts or hijack the site later.
export async function POST(req: NextRequest) {
  const count = await prisma.adminUser.count();
  if (count > 0) {
    return NextResponse.json(
      { error: "Akun admin sudah ada. Silakan login seperti biasa." },
      { status: 400 }
    );
  }

  const { username, password } = await req.json();
  if (!username || !password || password.length < 6) {
    return NextResponse.json(
      { error: "Username wajib diisi dan password minimal 6 karakter." },
      { status: 400 }
    );
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.adminUser.create({ data: { username, passwordHash } });

  // Make sure the singleton content rows exist so the site never 500s.
  await prisma.settings.upsert({ where: { id: 1 }, update: {}, create: { id: 1 } });
  await prisma.serverInfo.upsert({ where: { id: 1 }, update: {}, create: { id: 1 } });

  const token = await createSessionToken({ sub: user.id, username: user.username });
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  });
  return res;
}
