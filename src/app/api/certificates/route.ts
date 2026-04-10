import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const certificates = await prisma.certificate.findMany();

  return NextResponse.json(certificates);
}
