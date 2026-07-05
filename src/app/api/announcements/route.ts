import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const announcements = await prisma.announcement.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(announcements);
}

export async function POST(req: NextRequest) {
  const { title, content, type, published } = await req.json();
  const announcement = await prisma.announcement.create({
    data: { title, content, type: type || "info", published: published ?? true }
  });
  return NextResponse.json(announcement, { status: 201 });
}
