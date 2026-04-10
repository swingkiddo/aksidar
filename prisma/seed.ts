import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: "zhidkoe-mylo" },
      update: {},
      create: { name: "Жидкое мыло", slug: "zhidkoe-mylo", sortOrder: 1 },
    }),
    prisma.category.upsert({
      where: { slug: "sredstvo-dlya-posudy" },
      update: {},
      create: { name: "Средство для посуды", slug: "sredstvo-dlya-posudy", sortOrder: 2 },
    }),
    prisma.category.upsert({
      where: { slug: "sredstva-dlya-uborki" },
      update: {},
      create: { name: "Средства для уборки", slug: "sredstva-dlya-uborki", sortOrder: 3 },
    }),
    prisma.category.upsert({
      where: { slug: "hozyaystvennoe-mylo" },
      update: {},
      create: { name: "Хозяйственное мыло", slug: "hozyaystvennoe-mylo", sortOrder: 4 },
    }),
  ]);

  const catLiquidSoap = categories[0];
  const catDishwash = categories[1];
  const catCleaning = categories[2];
  const catHousehold = categories[3];

  // Create brands
  const brands = await Promise.all([
    prisma.brand.upsert({
      where: { slug: "florodel" },
      update: {},
      create: { name: "Флородель", slug: "florodel" },
    }),
    prisma.brand.upsert({
      where: { slug: "elikum" },
      update: {},
      create: { name: "ЕЛИКУМ", slug: "elikum" },
    }),
    prisma.brand.upsert({
      where: { slug: "elikom" },
      update: {},
      create: { name: "ЕЛИКОМ", slug: "elikom" },
    }),
    prisma.brand.upsert({
      where: { slug: "tridora" },
      update: {},
      create: { name: "ТРИДОРА", slug: "tridora" },
    }),
  ]);

  const brandFlorodel = brands[0];
  const brandElikum = brands[1];
  const brandElikom = brands[2];
  const brandTridora = brands[3];

  // Create products from categories file
  const products = [
    // soap 1-7 (475ml, 500ml) -Florodel
    { name: "Крем-мыло без запаха", volume: "475мл", categoryId: catLiquidSoap.id, brandId: brandFlorodel.id },
    { name: "Гель-мыло мягкое", volume: "5л", categoryId: catLiquidSoap.id, brandId: brandFlorodel.id },
    { name: "Гель-мыло мягкое", volume: "475мл", categoryId: catLiquidSoap.id, brandId: brandFlorodel.id },
    { name: "Гель-мыло мягкое", volume: "500мл", categoryId: catLiquidSoap.id, brandId: brandFlorodel.id },
    { name: "Крем-мыло без запаха", volume: "500мл", categoryId: catLiquidSoap.id, brandId: brandFlorodel.id },
    { name: "Крем-мыло жидкое Лимон", volume: "475мл", categoryId: catLiquidSoap.id, brandId: brandFlorodel.id },
    { name: "Крем-мыло жидкое Лимон", volume: "500мл", categoryId: catLiquidSoap.id, brandId: brandFlorodel.id },
    // soap 8-13 (475ml, 500ml)
    { name: "Гель-мыло для тела и волос", volume: "475мл", categoryId: catLiquidSoap.id, brandId: brandFlorodel.id },
    { name: "Гель-мыло жидкое с антибактериальным эффектом", volume: "475мл", categoryId: catLiquidSoap.id, brandId: brandFlorodel.id },
    { name: "Гель-мыло для тела и волос", volume: "500мл", categoryId: catLiquidSoap.id, brandId: brandFlorodel.id },
    { name: "Гель-мыло жидкое с антибактериальным эффектом", volume: "500мл", categoryId: catLiquidSoap.id, brandId: brandFlorodel.id },
    { name: "Крем-мыло жидкое с антибактериальным эффектом", volume: "475мл", categoryId: catLiquidSoap.id, brandId: brandFlorodel.id },
    { name: "Крем-мыло жидкое с антибактериальным эффектом", volume: "500мл", categoryId: catLiquidSoap.id, brandId: brandFlorodel.id },
    // soap 14-17 (520ml)
    { name: "Гель-мыло Яблоко", volume: "520мл", categoryId: catLiquidSoap.id, brandId: brandFlorodel.id },
    { name: "Крем-мыло с антибактериальным эффектом", volume: "520мл", categoryId: catLiquidSoap.id, brandId: brandFlorodel.id },
    { name: "Крем-мыло универсальное", volume: "520мл", categoryId: catLiquidSoap.id, brandId: brandFlorodel.id },
    { name: "Гель-мыло Морская свежесть", volume: "520мл", categoryId: catLiquidSoap.id, brandId: brandFlorodel.id },
    // soap 18-23 (1000ml)
    { name: "Крем-мыло без запаха", volume: "1000мл", categoryId: catLiquidSoap.id, brandId: brandFlorodel.id },
    { name: "Гель-мыло мягкое", volume: "1000мл", categoryId: catLiquidSoap.id, brandId: brandFlorodel.id },
    { name: "Крем-мыло жидкое Лимон", volume: "1000мл", categoryId: catLiquidSoap.id, brandId: brandFlorodel.id },
    { name: "Гель-мыло для тела и волос", volume: "1000мл", categoryId: catLiquidSoap.id, brandId: brandFlorodel.id },
    { name: "Крем-мыло жидкое с антибактериальным эффектом", volume: "1000мл", categoryId: catLiquidSoap.id, brandId: brandFlorodel.id },
    { name: "Гель-мыло жидкое с антибактериальным эффектом", volume: "1000мл", categoryId: catLiquidSoap.id, brandId: brandFlorodel.id },
    // soap 24-28 (5l)
    { name: "Крем-мыло Молоко и мёд", volume: "5л", categoryId: catLiquidSoap.id, brandId: brandFlorodel.id },
    { name: "Крем-мыло с антибактериальным эффектом", volume: "5л", categoryId: catLiquidSoap.id, brandId: brandFlorodel.id },
    { name: "Крем-мыло Арбуз", volume: "5л", categoryId: catLiquidSoap.id, brandId: brandFlorodel.id },
    { name: "Крем-мыло универсальное", volume: "5л", categoryId: catLiquidSoap.id, brandId: brandFlorodel.id },
    { name: "Чистящий гель для сантехники с антибактериальным эффектом", volume: "5л", categoryId: catCleaning.id, brandId: brandElikom.id },
    // soap 29-38 (5l continued)
    { name: "Гель-мыло универсальное", volume: "5л", categoryId: catLiquidSoap.id, brandId: brandFlorodel.id },
    { name: "Гель-мыло жидкое Хозяйственное", volume: "5л", categoryId: catHousehold.id, brandId: brandFlorodel.id },
    { name: "Крем-мыло без запаха", volume: "5л", categoryId: catLiquidSoap.id, brandId: brandFlorodel.id },
    { name: "Гель-мыло Яблоко", volume: "5л", categoryId: catLiquidSoap.id, brandId: brandFlorodel.id },
    { name: "Крем-мыло Лимон", volume: "5л", categoryId: catLiquidSoap.id, brandId: brandFlorodel.id },
    { name: "Гель-мыло универсальное", volume: "5л", categoryId: catLiquidSoap.id, brandId: brandFlorodel.id },
    { name: "Крем-мыло универсальное", volume: "5л", categoryId: catLiquidSoap.id, brandId: brandFlorodel.id },
    { name: "Гель-мыло Морская свежесть", volume: "5л", categoryId: catLiquidSoap.id, brandId: brandFlorodel.id },
    { name: "Гель-мыло с антибактериальным эффектом", volume: "5л", categoryId: catLiquidSoap.id, brandId: brandFlorodel.id },
    // soap 39-40 (special)
    { name: "Средство для полов и других поверхностей", volume: "5л", categoryId: catCleaning.id, brandId: brandElikum.id },
    { name: "Гель для мытья посуды", volume: "5л", categoryId: catDishwash.id, brandId: brandTridora.id },
  ];

  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    const slug = `soap-${i + 1}-${p.name.toLowerCase().replace(/[^а-яa-z0-9]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "")}`;
    await prisma.product.upsert({
      where: { slug },
      update: {},
      create: {
        name: p.name,
        slug,
        volume: p.volume,
        categoryId: p.categoryId,
        brandId: p.brandId,
        sortOrder: i + 1,
      },
    });
  }

  console.log(`Created ${products.length} products`);

  // Create certificates (using existing files)
  const certificates = [
    { name: "Гель-мыло декларация", image: "/images/certificates/gel-milo.jpg" },
    { name: "Гель-мыло 2 декларация", image: "/images/certificates/gel-milo2.jpg" },
    { name: "Крем-мыло декларация", image: "/images/certificates/krem-milo.jpg" },
    { name: "Крем-мыло без запаха", image: "/images/certificates/krem-milo-bez-zapaha.jpg" },
    { name: "Мыло-пена декларация", image: "/images/certificates/milo-pena.jpg" },
    { name: "ЕЛИКУМ полы", image: "/images/certificates/ELIKUM_poly.jpeg" },
    { name: "ЕЛИКОМ сантехника", image: "/images/certificates/ELIKOM.jpg" },
    { name: "ТРИДОРА декларация", image: "/images/certificates/tridora.jpg" },
    { name: "Хозяйственное мыло", image: "/images/certificates/milo-hoz.jpg" },
  ];

  for (const cert of certificates) {
    await prisma.certificate.upsert({
      where: { id: cert.name },
      update: {},
      create: { name: cert.name, image: cert.image },
    });
  }

  console.log(`Created ${certificates.length} certificates`);

  // Create admin user (password: admin123)
  await prisma.admin.upsert({
    where: { login: "admin" },
    update: {},
    create: {
      login: "admin",
      password: "$2b$10$ryNEt520nvIkYWDawuIt9ezq/39oESrzGIsSh4ZdeAK.li5TLU.xO",
    },
  });

  console.log("Created admin user");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
