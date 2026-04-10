import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const products = await prisma.product.findMany({
    include: {
      category: true,
      brand: true,
    },
    orderBy: { sortOrder: "asc" },
  });

  return NextResponse.json(products);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, slug, volume, categoryId, brandId, description, image, isActive } = body;

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        volume,
        categoryId,
        brandId,
        description,
        image,
        isActive: isActive ?? true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { error: "Ошибка при создании товара" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name, slug, volume, categoryId, brandId, description, image, isActive, sortOrder } = body;

    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        slug,
        volume,
        categoryId,
        brandId,
        description,
        image,
        isActive,
        sortOrder,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { error: "Ошибка при обновлении товара" },
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
        { error: "ID товара обязателен" },
        { status: 400 }
      );
    }

    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Ошибка при удалении товара" },
      { status: 500 }
    );
  }
}
