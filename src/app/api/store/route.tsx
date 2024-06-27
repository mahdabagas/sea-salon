import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function POST(request: Request) {
  const data = await request.json();

  const result = await prisma.store.create({
    data,
  });

  return NextResponse.json(result);
}

export async function GET() {
  const result = await prisma.store.findMany();

  return NextResponse.json(result);
}
