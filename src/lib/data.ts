import { Product, ProductCategory, Certificate, CategoryCard, USP, TrustStat } from "@/types";

export const products: Product[] = [
  // Liquid Soap - Canisters
  {
    id: "ls-c-001",
    slug: "zhidkoe-mylo-kanistra-5l-landyshe",
    name: "Жидкое мыло «Ландыш»",
    tagline: "Классический аромат для HoReCa",
    category: "liquid-soap-canisters",
    categoryLabel: "Жидкое мыло — Канистры",
    description:
      "Жидкое мыло с нежным ароматом ландыша. Идеально подходит для диспенсерных систем в отелях, ресторанах и офисах. Обеспечивает бережное очищение кожи рук.",
    images: ["/images/products/soap-canister-landyshe-1.jpg"],
    specs: {
      volumes: ["5л", "10л", "20л"],
      packaging: ["Канистра", "ПЭТ-Канистра"],
      fragrances: ["Ландыш", "Алоэ вера", "Ромашка", "Нейтральный"],
      phLevel: "5.5 ± 0.5",
      composition: "Натуральная мыльная основа, глицерин, ароматизатор",
      shelfLife: "24 месяца",
    },
    moq: "50 литров",
    moqDescription: "Минимальный заказ от 50 литров одного аромата",
    certifications: ["ГОСТ Р", "Eco-friendly"],
    relatedProducts: ["ls-c-002", "ls-c-003", "ls-cc-001"],
    isBestseller: true,
  },
  {
    id: "ls-c-002",
    slug: "zhidkoe-mylo-kanistra-5l-aloe",
    name: "Жидкое мыло «Алоэ вера»",
    tagline: "Увлажняющая формула",
    category: "liquid-soap-canisters",
    categoryLabel: "Жидкое мыло — Канистры",
    description:
      "Увлажняющее жидкое мыло с экстрактом алоэ вера. Подходит для частого использования, предотвращает сухость кожи рук.",
    images: ["/images/products/soap-canister-aloe-1.jpg"],
    specs: {
      volumes: ["5л", "10л", "20л"],
      packaging: ["Канистра", "ПЭТ-Канистра"],
      fragrances: ["Алоэ вера", "Ландыш", "Ромашка"],
      phLevel: "5.5 ± 0.5",
      composition: "Мыльная основа, экстракт алоэ, глицерин",
      shelfLife: "24 месяца",
    },
    moq: "50 литров",
    moqDescription: "Минимальный заказ от 50 литров",
    certifications: ["ГОСТ Р", "Eco-friendly"],
    relatedProducts: ["ls-c-001", "ls-c-003", "ls-cc-002"],
  },
  {
    id: "ls-c-003",
    slug: "zhidkoe-mylo-kanistra-5l-antibakterialnoe",
    name: "Жидкое мыло антибактериальное",
    tagline: "С антимикробным эффектом",
    category: "liquid-soap-canisters",
    categoryLabel: "Жидкое мыло — Канистры",
    description:
      "Антибактериальное жидкое мыло для медицинских учреждений, пищевого производства и мест с повышенными требованиями к гигиене.",
    images: ["/images/products/soap-canister-antibac-1.jpg"],
    specs: {
      volumes: ["5л", "10л", "20л"],
      packaging: ["Канистра"],
      fragrances: ["Нейтральный", "Лимон"],
      phLevel: "5.0 ± 0.5",
      composition: "Мыльная основа, антибактериальные компоненты",
      shelfLife: "24 месяца",
    },
    moq: "50 литров",
    moqDescription: "Минимальный заказ от 50 литров",
    certifications: ["ГОСТ Р", "СанПиН", "Eco-friendly"],
    relatedProducts: ["ls-c-001", "ls-c-002", "ls-b-003"],
  },

  // Liquid Soap - Cartridges
  {
    id: "ls-cc-001",
    slug: "zhidkoe-mylo-kartridzh-1l-landyshe",
    name: "Жидкое мыло в картридже «Ландыш»",
    tagline: "Для профессиональных диспенсеров",
    category: "liquid-soap-cartridges",
    categoryLabel: "Жидкое мыло — Картриджи",
    description:
      "Картридж с жидким мылом для профессиональных диспенсеров. Универсальный размер подходит для большинства диспенсерных систем.",
    images: ["/images/products/soap-cartridge-landyshe-1.jpg"],
    specs: {
      volumes: ["0.5л", "1л"],
      packaging: ["Картридж", "ПЭТ-картридж"],
      fragrances: ["Ландыш", "Алоэ вера", "Ромашка"],
      phLevel: "5.5 ± 0.5",
      composition: "Натуральная мыльная основа",
      shelfLife: "24 месяца",
    },
    moq: "100 штук",
    moqDescription: "Минимальный заказ от 100 картриджей",
    certifications: ["ГОСТ Р"],
    relatedProducts: ["ls-cc-002", "ls-c-001", "ls-b-001"],
    isNew: true,
  },
  {
    id: "ls-cc-002",
    slug: "zhidkoe-mylo-kartridzh-1l-pennoe",
    name: "Пенное мыло в картридже",
    tagline: "Экономичный расход",
    category: "liquid-soap-cartridges",
    categoryLabel: "Жидкое мыло — Картриджи",
    description:
      "Концентрированное пенное мыло для систем с пенообразованием. Экономичный расход — одного картриджа хватает на 2000 порций.",
    images: ["/images/products/soap-cartridge-foam-1.jpg"],
    specs: {
      volumes: ["0.5л", "1л"],
      packaging: ["Картридж"],
      fragrances: ["Цитрус", "Цветочный", "Нейтральный"],
      phLevel: "5.5 ± 0.5",
      composition: "Концентрированная мыльная основа",
      shelfLife: "24 месяца",
    },
    moq: "100 штук",
    moqDescription: "Минимальный заказ от 100 картриджей",
    certifications: ["ГОСТ R", "Eco-friendly"],
    relatedProducts: ["ls-cc-001", "ls-c-002", "ls-b-002"],
  },
  {
    id: "ls-cc-003",
    slug: "krem-mylo-kartridzh-1l-shelochnoe",
    name: "Крем-мыло в картридже",
    tagline: "Питательная формула с шелком",
    category: "liquid-soap-cartridges",
    categoryLabel: "Жидкое мыло — Картриджи",
    description:
      "Премиальное крем-мыло с протеинами шелка для люксовых диспенсерных систем. Обеспечивает особенно бережное очищение и уход за кожей.",
    images: ["/images/products/soap-cartridge-cream-1.jpg"],
    specs: {
      volumes: ["0.5л", "1л"],
      packaging: ["Картридж", "Премиум-картридж"],
      fragrances: ["Ваниль", "Жасмин", "Молочный"],
      phLevel: "5.8 ± 0.3",
      composition: "Мыльная основа, протеины шелка, пантенол, витамин Е",
      shelfLife: "24 месяца",
    },
    moq: "100 штук",
    moqDescription: "Минимальный заказ от 100 картриджей",
    certifications: ["ГОСТ Р", "Eco-friendly"],
    relatedProducts: ["ls-cc-001", "ls-cc-002", "ls-b-002"],
    isBestseller: true,
  },

  // Liquid Soap - Bottles
  {
    id: "ls-b-001",
    slug: "zhidkoe-mylo-butylka-500ml-landyshe",
    name: "Жидкое мыло «Ландыш» 500 мл",
    tagline: "Готовая розничная упаковка",
    category: "liquid-soap-bottles",
    categoryLabel: "Жидкое мыло — Бутылки",
    description:
      "Жидкое мыло в готовой розничной упаковке. Элегантный дизайн бутылки, удобный дозатор. Идеально для магазинов и небольших отелей.",
    images: ["/images/products/soap-bottle-landyshe-1.jpg"],
    specs: {
      volumes: ["300мл", "500мл", "1л"],
      packaging: ["ПЭТ-бутылка с дозатором", "ПЭТ-бутылка с крышкой"],
      fragrances: ["Ландыш", "Алоэ вера", "Ромашка", "Океан"],
      phLevel: "5.5 ± 0.5",
      composition: "Натуральная мыльная основа",
      shelfLife: "24 месяца",
    },
    moq: "50 штук",
    moqDescription: "Минимальный заказ от 50 штук одного аромата",
    certifications: ["ГОСТ Р"],
    relatedProducts: ["ls-b-002", "ls-b-003", "ls-cc-001"],
  },
  {
    id: "ls-b-002",
    slug: "zhidkoe-mylo-butylka-500ml-romashka",
    name: "Жидкое мыло «Ромашка» 500 мл",
    tagline: "Успокаивающий эффект",
    category: "liquid-soap-bottles",
    categoryLabel: "Жидкое мыло — Бутылки",
    description:
      "Жидкое мыло с экстрактом ромашки. Успокаивает кожу, подходит для чувствительной кожи. Готовая розничная упаковка.",
    images: ["/images/products/soap-bottle-romashka-1.jpg"],
    specs: {
      volumes: ["300мл", "500мл", "1л"],
      packaging: ["ПЭТ-бутылка с дозатором"],
      fragrances: ["Ромашка", "Лаванда", "Алоэ вера"],
      phLevel: "5.5 ± 0.5",
      composition: "Мыльная основа, экстракт ромашки",
      shelfLife: "24 месяца",
    },
    moq: "50 штук",
    moqDescription: "Минимальный заказ от 50 штук",
    certifications: ["ГОСТ Р", "Eco-friendly"],
    relatedProducts: ["ls-b-001", "ls-b-003", "ls-cc-001"],
  },
  {
    id: "ls-b-003",
    slug: "zhidkoe-mylo-butylka-500ml-antibakterialnoe",
    name: "Антибактериальное мыло 500 мл",
    tagline: "Максимальная защита",
    category: "liquid-soap-bottles",
    categoryLabel: "Жидкое мыло — Бутылки",
    description:
      "Антибактериальное жидкое мыло в розничной упаковке. Эффективно удаляет 99.9% бактерий.",
    images: ["/images/products/soap-bottle-antibac-1.jpg"],
    specs: {
      volumes: ["300мл", "500мл", "1л"],
      packaging: ["ПЭТ-бутылка с дозатором"],
      fragrances: ["Нейтральный", "Лимон", "Чайное дерево"],
      phLevel: "5.0 ± 0.5",
      composition: "Мыльная основа с антибактериальными компонентами",
      shelfLife: "24 месяца",
    },
    moq: "50 штук",
    moqDescription: "Минимальный заказ от 50 штук",
    certifications: ["ГОСТ Р", "СанПиН"],
    relatedProducts: ["ls-b-001", "ls-b-002", "ls-c-003"],
  },

  // Household Chemicals
  {
    id: "hc-001",
    slug: "sredstvo-dlya-posudy-5l",
    name: "Средство для мытья посуды",
    tagline: "Эффективное удаление жира",
    category: "household-chemicals",
    categoryLabel: "Бытовая химия",
    description:
      "Концентрированное средство для мытья посуды. Эффективно удаляет жир и загрязнения даже в холодной воде. Экономичный расход.",
    images: ["/images/products/dishwashing-1.jpg"],
    specs: {
      volumes: ["5л", "10л", "20л"],
      packaging: ["Канистра", "ПЭТ-канистра"],
      fragrances: ["Лимон", "Апельсин", "Нейтральный"],
      phLevel: "7.0 ± 0.5",
      composition: "ПАВ, ароматизаторы, консерванты",
      shelfLife: "36 месяцев",
    },
    moq: "50 литров",
    moqDescription: "Минимальный заказ от 50 литров",
    certifications: ["ГОСТ Р", "СанПиН"],
    relatedProducts: ["hc-002", "hc-003", "hc-004"],
    isBestseller: true,
  },
  {
    id: "hc-002",
    slug: "sredstvo-dlya-stekol-5l",
    name: "Средство для мытья стекол и зеркал",
    tagline: "Без разводов и следов",
    category: "household-chemicals",
    categoryLabel: "Бытовая химия",
    description:
      "Профессиональное средство для чистки стекол, зеркал и хромированных поверхностей. Не оставляет разводов и ворсинок.",
    images: ["/images/products/glass-cleaner-1.jpg"],
    specs: {
      volumes: ["5л", "10л"],
      packaging: ["Канистра", "ПЭТ-канистра"],
      fragrances: ["Нейтральный", "Цитрус", "Мята"],
      phLevel: "8.0 ± 0.5",
      composition: "ПАВ, спирт изопропиловый, вода",
      shelfLife: "36 месяцев",
    },
    moq: "50 литров",
    moqDescription: "Минимальный заказ от 50 литров",
    certifications: ["ГОСТ Р"],
    relatedProducts: ["hc-001", "hc-003", "hc-005"],
  },
  {
    id: "hc-003",
    slug: "sredstvo-dlya-pola-5l-universalnoe",
    name: "Универсальное средство для мытья пола",
    tagline: "Все виды покрытий",
    category: "household-chemicals",
    categoryLabel: "Бытовая химия",
    description:
      "Универсальное средство для мытья всех типов полов: ламинат, паркет, плитка, линолеум. Не оставляет разводов.",
    images: ["/images/products/floor-cleaner-1.jpg"],
    specs: {
      volumes: ["5л", "10л", "20л"],
      packaging: ["Канистра", "ПЭТ-канистра"],
      fragrances: ["Свежесть", "Цитрус", "Нейтральный"],
      phLevel: "7.5 ± 0.5",
      composition: "ПАВ, кондиционирующие добавки",
      shelfLife: "36 месяцев",
    },
    moq: "50 литров",
    moqDescription: "Минимальный заказ от 50 литров",
    certifications: ["ГОСТ Р"],
    relatedProducts: ["hc-001", "hc-002", "hc-004"],
  },
  {
    id: "hc-004",
    slug: "sredstvo-dlya-sanuzlov-5l",
    name: "Средство для чистки санузлов",
    tagline: "Удаление известкового налета",
    category: "household-chemicals",
    categoryLabel: "Бытовая химия",
    description:
      "Кислотное средство для чистки сантехники от известкового налета, ржавчины и мыльных разводов. Профессиональная формула.",
    images: ["/images/products/bathroom-cleaner-1.jpg"],
    specs: {
      volumes: ["5л", "10л"],
      packaging: ["Канистра"],
      fragrances: ["Морская свежесть", "Цитрус"],
      phLevel: "2.0 ± 0.5",
      composition: "Кислотные компоненты, ПАВ, ароматизаторы",
      shelfLife: "24 месяца",
    },
    moq: "50 литров",
    moqDescription: "Минимальный заказ от 50 литров",
    certifications: ["ГОСТ Р", "СанПиН"],
    relatedProducts: ["hc-002", "hc-005", "ls-c-003"],
  },
  {
    id: "hc-005",
    slug: "universalnoe-chistyaschee-sredstvo-5l",
    name: "Универсальное чистящее средство",
    tagline: "Для всех поверхностей",
    category: "household-chemicals",
    categoryLabel: "Бытовая химия",
    description:
      "Универсальное средство для очистки всех видов поверхностей: столешницы, двери, перила, техника. Экономичный расход.",
    images: ["/images/products/universal-cleaner-1.jpg"],
    specs: {
      volumes: ["5л", "10л"],
      packaging: ["Канистра", "ПЭТ-канистра"],
      fragrances: ["Лимон", "Цветочный", "Нейтральный"],
      phLevel: "7.0 ± 0.5",
      composition: "ПАВ, ароматизаторы, консерванты",
      shelfLife: "36 месяцев",
    },
    moq: "50 литров",
    moqDescription: "Минимальный заказ от 50 литров",
    certifications: ["ГОСТ Р", "Eco-friendly"],
    relatedProducts: ["hc-001", "hc-002", "hc-003"],
    isNew: true,
  },
];

export const certificates: Certificate[] = [
  {
    id: "cert-001",
    name: "Сертификат соответствия ГОСТ Р",
    issuer: "Орган по сертификации «Русский Регистр»",
    validUntil: "2027-12-31",
    scope: "Жидкое мыло, средства для мытья посуды",
    category: "soap",
    thumbnail: "/certificates/gost-thumb.jpg",
    pdfUrl: "/certificates/gost-r.pdf",
  },
  {
    id: "cert-002",
    name: "Санитарно-эпидемиологическое заключение",
    issuer: "Роспотребнадзор",
    validUntil: "2026-06-15",
    scope: "Вся продукция",
    category: "quality",
    thumbnail: "/certificates/ses-thumb.jpg",
    pdfUrl: "/certificates/ses.pdf",
  },
  {
    id: "cert-003",
    name: "Система менеджмента качества ISO 9001:2015",
    issuer: "TUV SUD",
    validUntil: "2027-03-20",
    scope: "Производство косметической продукции",
    category: "quality",
    thumbnail: "/certificates/iso-thumb.jpg",
    pdfUrl: "/certificates/iso-9001.pdf",
  },
  {
    id: "cert-004",
    name: "Eco-friendly сертификат",
    issuer: "ECOCERT",
    validUntil: "2026-09-30",
    scope: "Линейка органической продукции",
    category: "soap",
    thumbnail: "/certificates/eco-thumb.jpg",
    pdfUrl: "/certificates/eco.pdf",
  },
  {
    id: "cert-005",
    name: "Сертификат соответствия на бытовую химию",
    issuer: "Орган по сертификации «Тест-С.-Петербург»",
    validUntil: "2027-08-15",
    scope: "Средства для мытья пола, окон, санузлов",
    category: "household",
    thumbnail: "/certificates/household-thumb.jpg",
    pdfUrl: "/certificates/household.pdf",
  },
];

export const categoryCards: CategoryCard[] = [
  {
    id: "cat-001",
    title: "Жидкое мыло — Канистры",
    description: "Большие объемы для HoReCa и диспенсерных систем",
    image: "/images/categories/canisters.jpg",
    href: "/catalog?category=liquid-soap-canisters",
    productCount: 3,
  },
  {
    id: "cat-002",
    title: "Жидкое мыло — Картриджи",
    description: "Профессиональные картриджи для диспенсеров",
    image: "/images/categories/cartridges.jpg",
    href: "/catalog?category=liquid-soap-cartridges",
    productCount: 3,
  },
  {
    id: "cat-003",
    title: "Жидкое мыло — Бутылки",
    description: "Розничная упаковка для магазинов и отелей",
    image: "/images/categories/bottles.jpg",
    href: "/catalog?category=liquid-soap-bottles",
    productCount: 3,
  },
  {
    id: "cat-004",
    title: "Бытовая химия",
    description: "Для посуды, пола, стекол и санузлов",
    image: "/images/categories/household.jpg",
    href: "/catalog?category=household-chemicals",
    productCount: 5,
  },
];

export const usps: USP[] = [
  {
    title: "Собственное производство",
    description:
      "Полный цикл производства на современном оборудовании. Контроль качества на каждом этапе.",
    icon: "Factory",
  },
  {
    title: "Сертифицированное качество",
    description:
      "Вся продукция соответствует ГОСТ Р, имеет санитарно-эпидемиологические заключения.",
    icon: "BadgeCheck",
  },
  {
    title: "Гибкие условия",
    description:
      "Низкие минимальные партии для начала сотрудничества. Возможность под заказ.",
    icon: "Handshake",
  },
  {
    title: "Индивидуальная маркировка",
    description:
      "Разработка и нанесение вашего логотипа. Private label под вашим брендом.",
    icon: "Tag",
  },
];

export const trustStats: TrustStat[] = [
  { value: "25+", label: "лет на рынке" },
  { value: "50+", label: "SKU в каталоге" },
  { value: "3", label: "страны поставок" },
  { value: "5", label: "сертификатов" },
  { value: "20 000+", label: "тонн в год" },
];

export const navItems = [
  { label: "Главная", href: "/" },
  { label: "Каталог", href: "/catalog" },
  { label: "Сертификаты", href: "/certificates" },
  { label: "О компании", href: "/about" },
  { label: "Контакты", href: "/contacts" },
];

// Product Helper Functions

/**
 * Get a single product by slug
 */
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

/**
 * Get all product slugs for static generation
 */
export function getAllProductSlugs(): string[] {
  return products.map((product) => product.slug);
}

/**
 * Filter products by category
 */
export function getProductsByCategory(
  category: ProductCategory | "all"
): Product[] {
  if (category === "all") return products;
  return products.filter((product) => product.category === category);
}

/**
 * Get related products for a given product
 */
export function getRelatedProducts(productId: string): Product[] {
  const product = products.find((p) => p.id === productId);
  if (!product) return [];

  return product.relatedProducts
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is Product => p !== undefined);
}

/**
 * Get filter options for the catalog
 */
export function getFilterOptions() {
  const volumes = new Set<string>();
  const packaging = new Set<string>();
  const fragrances = new Set<string>();
  const certifications = new Set<string>();

  products.forEach((product) => {
    product.specs.volumes.forEach((v) => volumes.add(v));
    product.specs.packaging.forEach((p) => packaging.add(p));
    product.specs.fragrances.forEach((f) => fragrances.add(f));
    product.certifications.forEach((c) => certifications.add(c));
  });

  return {
    volumes: Array.from(volumes).sort(),
    packaging: Array.from(packaging).sort(),
    fragrances: Array.from(fragrances).sort(),
    certifications: Array.from(certifications).sort(),
  };
}

/**
 * Filter products based on criteria
 */
export function filterProducts(
  category: ProductCategory | "all",
  selectedVolumes: string[],
  selectedPackaging: string[],
  selectedFragrances: string[]
): Product[] {
  return products.filter((product) => {
    // Category filter
    if (category !== "all" && product.category !== category) {
      return false;
    }

    // Volume filter
    if (
      selectedVolumes.length > 0 &&
      !selectedVolumes.some((v) => product.specs.volumes.includes(v))
    ) {
      return false;
    }

    // Packaging filter
    if (
      selectedPackaging.length > 0 &&
      !selectedPackaging.some((p) => product.specs.packaging.includes(p))
    ) {
      return false;
    }

    // Fragrance filter
    if (
      selectedFragrances.length > 0 &&
      !selectedFragrances.some((f) => product.specs.fragrances.includes(f))
    ) {
      return false;
    }

    return true;
  });
}

/**
 * Get category display info
 */
export const categoryInfo: Record<
  ProductCategory,
  { label: string; description: string }
> = {
  "liquid-soap-canisters": {
    label: "Жидкое мыло — Канистры",
    description: "Крупные объемы для HoReCa и диспенсерных систем",
  },
  "liquid-soap-cartridges": {
    label: "Жидкое мыло — Картриджи",
    description: "Профессиональные картриджи для диспенсеров",
  },
  "liquid-soap-bottles": {
    label: "Жидкое мыло — Бутылки",
    description: "Розничная упаковка для магазинов и отелей",
  },
  "household-chemicals": {
    label: "Бытовая химия",
    description: "Средства для посуды, пола, стекол и санузлов",
  },
};
