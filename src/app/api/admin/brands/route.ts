import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const brands = await prisma.brand.findMany({
    orderBy: { name: "asc" },
  });
  return NextResponse.json(brands);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, slug } = body;

    const brand = await prisma.brand.create({
      data: {
        name,
        slug,
      },
    });

    return NextResponse.json(brand);
  } catch (error) {
    return NextResponse.json(
      { error: "Ошибка при создании бренда" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name, slug } = body;

    const brand = await prisma.brand.update({
      where: { id },
      data: {
        name,
        slug,
      },
    });

    return NextResponse.json(brand);
  } catch (error) {
    return NextResponse.json(
      { error: "Ошибка при обновлении бренда" },
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
        { error: "ID бренда обязателен" },
        { status: 400 }
      );
    }

    await prisma.brand.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Ошибка при удалении бренда" },
      { status: 500 }
    );
  }
}