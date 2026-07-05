import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const features = await prisma.feature.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(features);
}

export async function POST(req: NextRequest) {
  const { icon, imageUrl, title, description, order } = await req.json();
  const feature = await prisma.feature.create({
    data: { icon, imageUrl, title, description, order: Number(order) || 0 }
  });
  return NextResponse.json(feature, { status: 201 });
}
