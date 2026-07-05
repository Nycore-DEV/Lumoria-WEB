import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const faq = await prisma.faqItem.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(faq);
}

export async function POST(req: NextRequest) {
  const { question, answer, order } = await req.json();
  const faq = await prisma.faqItem.create({ data: { question, answer, order: Number(order) || 0 } });
  return NextResponse.json(faq, { status: 201 });
}
