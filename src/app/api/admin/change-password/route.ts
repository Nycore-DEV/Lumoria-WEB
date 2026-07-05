import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const session = token ? await verifySessionToken(token) : null;
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { currentPassword, newPassword } = await req.json();
  if (!currentPassword || !newPassword || newPassword.length < 6) {
    return NextResponse.json(
      { error: "Password baru minimal 6 karakter dan password saat ini wajib diisi." },
      { status: 400 }
    );
  }

  const user = await prisma.adminUser.findUnique({ where: { id: session.sub } });
  if (!user) return NextResponse.json({ error: "Pengguna tidak ditemukan." }, { status: 404 });

  const valid = await bcrypt.compare(currentPassword, user.passwordHash);
  if (!valid) return NextResponse.json({ error: "Password saat ini salah." }, { status: 401 });

  const passwordHash = await bcrypt.hash(newPassword, 10);
  await prisma.adminUser.update({ where: { id: user.id }, data: { passwordHash } });

  return NextResponse.json({ ok: true });
}
