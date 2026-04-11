import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create categories with descriptions
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: "liquid-soap-bottles" },
      update: {},
      create: {
        name: "Жидкое мыло — Бутылки",
        slug: "liquid-soap-bottles",
        description: "Бутылки и флаконы 475–1000 мл. Серия «Флородель» для розничных сетей, магазинов и отелей.",
        sortOrder: 1,
      },
    }),
    prisma.category.upsert({
      where: { slug: "liquid-soap-canisters" },
      update: {},
      create: {
        name: "Жидкое мыло — Канистры",
        slug: "liquid-soap-canisters",
        description: "Канистры 5 л для HoReCa, офисов и производств. Серия «Флородель» с оптимальным pH.",
        sortOrder: 2,
      },
    }),
    prisma.category.upsert({
      where: { slug: "household-chemicals" },
      update: {},
      create: {
        name: "Бытовая химия",
        slug: "household-chemicals",
        description: "Профессиональные средства «ЕЛИКУМ», «ЕЛИКОМ», «ТРИДОРА» для уборки и мытья посуды.",
        sortOrder: 3,
      },
    }),
  ]);

  const [catBottles, catCanisters, catHousehold] = categories;

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

  const [brandFlorodel, brandElikum, brandElikom, brandTridora] = brands;

  // Create products
  // soap 1-23: Бутылки (475ml, 500ml, 520ml, 1000ml)
  // soap 24-38: Канистры (5л) + 1 бытовая химия
  // soap 39-40: Бытовая химия

  const productsData = [
    // soap 1 - Florodel - Бутылки 475мл
    { name: "Крем-мыло без запаха", volume: "475мл", categoryId: catBottles.id, brandId: brandFlorodel.id },
    // soap 2 - Florodel - Канистры 5л
    { name: "Гель-мыло мягкое", volume: "5л", categoryId: catCanisters.id, brandId: brandFlorodel.id },
    // soap 3-23 - Florodel - Бутылки
    { name: "Гель-мыло мягкое", volume: "475мл", categoryId: catBottles.id, brandId: brandFlorodel.id },
    { name: "Гель-мыло мягкое", volume: "500мл", categoryId: catBottles.id, brandId: brandFlorodel.id },
    { name: "Крем-мыло без запаха", volume: "500мл", categoryId: catBottles.id, brandId: brandFlorodel.id },
    { name: "Крем-мыло жидкое Лимон", volume: "475мл", categoryId: catBottles.id, brandId: brandFlorodel.id },
    { name: "Крем-мыло жидкое Лимон", volume: "500мл", categoryId: catBottles.id, brandId: brandFlorodel.id },
    { name: "Гель-мыло для тела и волос", volume: "475мл", categoryId: catBottles.id, brandId: brandFlorodel.id },
    { name: "Гель-мыло жидкое с антибактериальным эффектом", volume: "475мл", categoryId: catBottles.id, brandId: brandFlorodel.id },
    { name: "Гель-мыло для тела и волос", volume: "500мл", categoryId: catBottles.id, brandId: brandFlorodel.id },
    { name: "Гель-мыло жидкое с антибактериальным эффектом", volume: "500мл", categoryId: catBottles.id, brandId: brandFlorodel.id },
    { name: "Крем-мыло жидкое с антибактериальным эффектом", volume: "475мл", categoryId: catBottles.id, brandId: brandFlorodel.id },
    { name: "Крем-мыло жидкое с антибактериальным эффектом", volume: "500мл", categoryId: catBottles.id, brandId: brandFlorodel.id },
    { name: "Гель-мыло Яблоко", volume: "520мл", categoryId: catBottles.id, brandId: brandFlorodel.id },
    { name: "Крем-мыло с антибактериальным эффектом", volume: "520мл", categoryId: catBottles.id, brandId: brandFlorodel.id },
    { name: "Крем-мыло универсальное", volume: "520мл", categoryId: catBottles.id, brandId: brandFlorodel.id },
    { name: "Гель-мыло Морская свежесть", volume: "520мл", categoryId: catBottles.id, brandId: brandFlorodel.id },
    { name: "Крем-мыло без запаха", volume: "1000мл", categoryId: catBottles.id, brandId: brandFlorodel.id },
    { name: "Гель-мыло мягкое", volume: "1000мл", categoryId: catBottles.id, brandId: brandFlorodel.id },
    { name: "Крем-мыло жидкое Лимон", volume: "1000мл", categoryId: catBottles.id, brandId: brandFlorodel.id },
    { name: "Гель-мыло для тела и волос", volume: "1000мл", categoryId: catBottles.id, brandId: brandFlorodel.id },
    { name: "Крем-мыло жидкое с антибактериальным эффектом", volume: "1000мл", categoryId: catBottles.id, brandId: brandFlorodel.id },
    { name: "Гель-мыло жидкое с антибактериальным эффектом", volume: "1000мл", categoryId: catBottles.id, brandId: brandFlorodel.id },
    // soap 24-38 - Florodel - Канистры 5л
    { name: "Крем-мыло Молоко и мёд", volume: "5л", categoryId: catCanisters.id, brandId: brandFlorodel.id },
    { name: "Крем-мыло с антибактериальным эффектом", volume: "5л", categoryId: catCanisters.id, brandId: brandFlorodel.id },
    { name: "Крем-мыло Арбуз", volume: "5л", categoryId: catCanisters.id, brandId: brandFlorodel.id },
    { name: "Крем-мыло универсальное", volume: "5л", categoryId: catCanisters.id, brandId: brandFlorodel.id },
    { name: "Чистящий гель для сантехники с антибактериальным эффектом", volume: "5л", categoryId: catHousehold.id, brandId: brandElikom.id },
    { name: "Гель-мыло универсальное", volume: "5л", categoryId: catCanisters.id, brandId: brandFlorodel.id },
    { name: "Гель-мыло жидкое Хозяйственное", volume: "5л", categoryId: catCanisters.id, brandId: brandFlorodel.id },
    { name: "Крем-мыло без запаха", volume: "5л", categoryId: catCanisters.id, brandId: brandFlorodel.id },
    { name: "Гель-мыло Яблоко", volume: "5л", categoryId: catCanisters.id, brandId: brandFlorodel.id },
    { name: "Крем-мыло Лимон", volume: "5л", categoryId: catCanisters.id, brandId: brandFlorodel.id },
    { name: "Гель-мыло универсальное", volume: "5л", categoryId: catCanisters.id, brandId: brandFlorodel.id },
    { name: "Крем-мыло универсальное", volume: "5л", categoryId: catCanisters.id, brandId: brandFlorodel.id },
    { name: "Гель-мыло Морская свежесть", volume: "5л", categoryId: catCanisters.id, brandId: brandFlorodel.id },
    { name: "Гель-мыло с антибактериальным эффектом", volume: "5л", categoryId: catCanisters.id, brandId: brandFlorodel.id },
    // soap 38 - Florodel - Канистра 5л (was missing)
    { name: "Крем-мыло универсальное", volume: "5л", categoryId: catCanisters.id, brandId: brandFlorodel.id },
    // soap 39-40 - Бытовая химия
    { name: "Средство для полов и других поверхностей", volume: "5л", categoryId: catHousehold.id, brandId: brandElikum.id },
    { name: "Гель для мытья посуды", volume: "5л", categoryId: catHousehold.id, brandId: brandTridora.id },
  ];

  const firstProductPerCategory: Record<string, string> = {};

  for (let i = 0; i < productsData.length; i++) {
    const p = productsData[i];
    const slug = `soap-${i + 1}-${p.name.toLowerCase().replace(/[^а-яa-z0-9]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "")}`;
    
    const product = await prisma.product.upsert({
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

    // Save first product image for category
    if (!firstProductPerCategory[p.categoryId]) {
      firstProductPerCategory[p.categoryId] = `/images/soap_${String(i + 1).padStart(2, "0")}.png`;
    }
  }

  // Update category images with first product images
  for (const cat of categories) {
    const image = firstProductPerCategory[cat.id];
    if (image) {
      await prisma.category.update({
        where: { id: cat.id },
        data: { image },
      });
      console.log(`Set ${cat.slug} image to ${image}`);
    }
  }

  console.log(`Created ${productsData.length} products`);

  // Create certificates
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
