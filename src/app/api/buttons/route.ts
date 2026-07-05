import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const buttons = await prisma.actionButton.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(buttons);
}

export async function POST(req: NextRequest) {
  const { label, url, type, active, order } = await req.json();
  const button = await prisma.actionButton.create({
    data: { label, url, type: type || "custom", active: active ?? true, order: Number(order) || 0 }
  });
  return NextResponse.json(button, { status: 201 });
}
