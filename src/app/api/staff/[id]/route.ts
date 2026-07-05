import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { gamertag, role, description, skinUrl, order } = await req.json();
  const staff = await prisma.staffMember.update({
    where: { id: params.id },
    data: { gamertag, role, description, skinUrl, order: Number(order) || 0 }
  });
  return NextResponse.json(staff);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  await prisma.staffMember.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
