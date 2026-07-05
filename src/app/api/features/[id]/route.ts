import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { icon, imageUrl, title, description, order } = await req.json();
  const feature = await prisma.feature.update({
    where: { id: params.id },
    data: { icon, imageUrl, title, description, order: Number(order) || 0 }
  });
  return NextResponse.json(feature);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  await prisma.feature.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
