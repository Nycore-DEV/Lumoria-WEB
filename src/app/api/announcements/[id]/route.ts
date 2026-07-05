import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { title, content, type, published } = await req.json();
  const announcement = await prisma.announcement.update({
    where: { id: params.id },
    data: { title, content, type, published }
  });
  return NextResponse.json(announcement);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  await prisma.announcement.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
