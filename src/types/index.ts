// Product Types
export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: ProductCategory;
  categoryLabel: string;
  description: string;
  images: string[];
  specs: ProductSpecs;
  moq: string;
  moqDescription: string;
  certifications: string[];
  relatedProducts: string[];
  isNew?: boolean;
  isBestseller?: boolean;
}

export type ProductCategory =
  | "liquid-soap-canisters"
  | "liquid-soap-cartridges"
  | "liquid-soap-bottles"
  | "household-chemicals";

export interface ProductSpecs {
  volumes: string[];
  packaging: string[];
  fragrances: string[];
  phLevel: string;
  composition: string;
  shelfLife: string;
}

// Certificate Types
export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  validUntil: string;
  scope: string;
  category: CertificateCategory;
  thumbnail: string;
  pdfUrl: string;
}

export type CertificateCategory =
  | "all"
  | "soap"
  | "household"
  | "quality";

// Filter Types
export interface ProductFilters {
  category: ProductCategory | "all";
  packaging: string[];
  volumes: string[];
  fragrances: string[];
  certifications: string[];
}

// Contact Form Types
export interface ContactFormData {
  name: string;
  company: string;
  phone: string;
  email: string;
  productInterest: string;
  message: string;
}

// Navigation Types
export interface NavItem {
  label: string;
  href: string;
  isActive?: boolean;
}

// Trust Bar Stats
export interface TrustStat {
  value: string;
  label: string;
  icon?: string;
}

// USP Block
export interface USP {
  title: string;
  description: string;
  icon: string;
}

// Category Card
export interface CategoryCard {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
  productCount: number;
}

// Testimonial (optional)
export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  company: string;
  role: string;
}
