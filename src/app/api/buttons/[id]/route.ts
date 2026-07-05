import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { label, url, type, active, order } = await req.json();
  const button = await prisma.actionButton.update({
    where: { id: params.id },
    data: { label, url, type, active, order: Number(order) || 0 }
  });
  return NextResponse.json(button);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  await prisma.actionButton.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
