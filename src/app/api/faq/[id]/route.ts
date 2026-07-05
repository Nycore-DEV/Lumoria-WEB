import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { question, answer, order } = await req.json();
  const faq = await prisma.faqItem.update({
    where: { id: params.id },
    data: { question, answer, order: Number(order) || 0 }
  });
  return NextResponse.json(faq);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  await prisma.faqItem.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
