import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const certificates = await prisma.certificate.findMany();
  return NextResponse.json(certificates);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, image } = body;

    const certificate = await prisma.certificate.create({
      data: {
        name,
        image,
      },
    });

    return NextResponse.json(certificate);
  } catch (error) {
    return NextResponse.json(
      { error: "Ошибка при создании сертификата" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name, image } = body;

    const certificate = await prisma.certificate.update({
      where: { id },
      data: {
        name,
        image,
      },
    });

    return NextResponse.json(certificate);
  } catch (error) {
    return NextResponse.json(
      { error: "Ошибка при обновлении сертификата" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "ID сертификата обязателен" },
        { status: 400 }
      );
    }

    await prisma.certificate.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Ошибка при удалении сертификата" },
      { status: 500 }
    );
  }
}