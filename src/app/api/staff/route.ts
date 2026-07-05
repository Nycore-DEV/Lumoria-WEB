import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const staff = await prisma.staffMember.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(staff);
}

export async function POST(req: NextRequest) {
  const { gamertag, role, description, skinUrl, order } = await req.json();
  const staff = await prisma.staffMember.create({
    data: { gamertag, role, description, skinUrl, order: Number(order) || 0 }
  });
  return NextResponse.json(staff, { status: 201 });
}
