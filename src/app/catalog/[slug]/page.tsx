import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getProductBySlug,
  getAllProductSlugs,
  getRelatedProducts,
  categoryInfo,
} from "@/lib/data";
import ProductDetailContent from "./ProductDetailContent";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all products
export async function generateStaticParams() {
  const slugs = getAllProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Товар не найден | Дар Косметик",
    };
  }

  const title = `${product.name} Оптом — Производитель | Дар Косметик`;
  const description = `${product.description.slice(0, 150)}... ${product.specs.volumes.join(", ")}. Минимальный заказ: ${product.moq}`;

  return {
    title,
    description,
    keywords: [
      product.name.toLowerCase(),
      `${product.name.toLowerCase()} оптом`,
      "производитель мыла",
      "оптовые поставки",
      ...product.specs.fragrances,
    ],
    openGraph: {
      title,
      description,
      type: "website",
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product.id);

  // Generate JSON-LD schemas
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images[0] || "/images/products/placeholder.jpg",
    brand: {
      "@type": "Brand",
      name: "Дар Косметик",
    },
    offers: {
      "@type": "AggregateOffer",
      availability: "https://schema.org/InStock",
      priceCurrency: "RUB",
      lowPrice: "0",
      highPrice: "0",
      offerCount: product.specs.volumes.length,
      description: `Минимальный заказ: ${product.moq}`,
    },
    additionalProperty: [
      ...product.specs.volumes.map((vol) => ({
        "@type": "PropertyValue",
        name: "Объем",
        value: vol,
      })),
      {
        "@type": "PropertyValue",
        name: "Срок годности",
        value: product.specs.shelfLife,
      },
      {
        "@type": "PropertyValue",
        name: "pH уровень",
        value: product.specs.phLevel,
      },
    ],
    hasCertification: product.certifications.map((cert) => ({
      "@type": "Certification",
      name: cert,
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Главная",
        item: "/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Каталог",
        item: "/catalog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: categoryInfo[product.category].label,
        item: `/catalog?category=${product.category}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: product.name,
        item: `/catalog/${product.slug}`,
      },
    ],
  };

  return (
    <>
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <ProductDetailContent
        product={product}
        relatedProducts={relatedProducts}
      />
    </>
  );
}
