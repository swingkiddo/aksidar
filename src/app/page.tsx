import { prisma } from "@/lib/prisma";
import HomePageClient from "./page.client";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [categories, certificates] = await Promise.all([
    prisma.category.findMany({
      include: {
        _count: {
          select: { products: true },
        },
      },
      orderBy: { sortOrder: "asc" },
    }),
    prisma.certificate.findMany({ take: 9 }),
  ]);

  return (
    <HomePageClient categories={categories} certificates={certificates} />
  );
}
