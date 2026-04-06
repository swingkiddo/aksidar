"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Package,
  CheckCircle,
  ArrowRight,
  Award,
  TrendingUp,
  Sparkles,
  Phone,
  FileText,
  Beaker,
  Clock,
  Droplets,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { ContactDialog } from "@/components/shared/ContactDialog";
import { products, categoryInfo } from "@/lib/data";
import { Product } from "@/types";

interface ProductDetailContentProps {
  product: Product;
  relatedProducts: Product[];
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const certificateIcons: Record<string, string> = {
  "ГОСТ Р": "ГОСТ Р",
  "Eco-friendly": "Eco",
  "СанПиН": "СанПиН",
};

export default function ProductDetailContent({
  product,
  relatedProducts,
}: ProductDetailContentProps) {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  const categoryInfoData = categoryInfo[product.category];

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-green-pale border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center text-sm text-ink/60 overflow-x-auto">
            <Link href="/" className="hover:text-green-mid transition-colors">
              Главная
            </Link>
            <ChevronRight className="w-4 h-4 mx-2 flex-shrink-0" />
            <Link
              href="/catalog"
              className="hover:text-green-mid transition-colors"
            >
              Каталог
            </Link>
            <ChevronRight className="w-4 h-4 mx-2 flex-shrink-0" />
            <Link
              href={`/catalog?category=${product.category}`}
              className="hover:text-green-mid transition-colors whitespace-nowrap"
            >
              {categoryInfoData.label}
            </Link>
            <ChevronRight className="w-4 h-4 mx-2 flex-shrink-0" />
            <span className="text-green-deep font-medium truncate">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* Back to catalog (mobile) */}
          <motion.div variants={fadeInUp} className="mb-6 lg:hidden">
            <Link
              href="/catalog"
              className="inline-flex items-center text-sm text-ink/60 hover:text-green-mid transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Назад в каталог
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Image Gallery */}
            <motion.div variants={fadeInUp} className="space-y-4">
              <div className="aspect-square bg-gradient-to-br from-green-mist to-green-pale rounded-2xl flex items-center justify-center relative overflow-hidden">
                <Package className="w-32 h-32 text-green-mid/30" />

                {/* Badges on image */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.isNew && (
                    <Badge className="bg-blue-500 text-white border-0">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Новинка
                    </Badge>
                  )}
                  {product.isBestseller && (
                    <Badge className="bg-orange-500 text-white border-0">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Хит продаж
                    </Badge>
                  )}
                </div>
              </div>

              {/* Thumbnail strip */}
              <div className="flex gap-3 justify-center">
                {[0, 1, 2].map((idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={cn(
                      "w-20 h-20 rounded-xl bg-gradient-to-br flex items-center justify-center transition-all",
                      selectedImage === idx
                        ? "from-green-mist to-green-pale ring-2 ring-green-mid"
                        : "from-gray-100 to-gray-50 hover:from-green-mist/50 hover:to-green-pale/50"
                    )}
                  >
                    <Package
                      className={cn(
                        "w-8 h-8",
                        selectedImage === idx
                          ? "text-green-mid"
                          : "text-gray-400"
                      )}
                    />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div variants={fadeInUp} className="space-y-6">
              {/* Header */}
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <Badge
                    variant="secondary"
                    className="bg-green-mist text-green-deep"
                  >
                    {product.categoryLabel}
                  </Badge>
                </div>
                <h1 className="font-display text-3xl sm:text-4xl font-bold text-green-deep">
                  {product.name}
                </h1>
                <p className="text-lg text-ink/70 mt-2">{product.tagline}</p>
              </div>

              {/* Certifications */}
              <div className="flex flex-wrap gap-2">
                {product.certifications.map((cert) => (
                  <Badge
                    key={cert}
                    variant="outline"
                    className="border-green-mid/30 text-green-mid"
                  >
                    <Award className="w-3 h-3 mr-1" />
                    {cert}
                  </Badge>
                ))}
              </div>

              <Separator />

              {/* Description */}
              <p className="text-ink/80 leading-relaxed">
                {product.description}
              </p>

              {/* Key Features */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-green-pale rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-green-mid/10 flex items-center justify-center">
                    <Droplets className="w-5 h-5 text-green-mid" />
                  </div>
                  <div>
                    <p className="text-xs text-ink/60">Объем</p>
                    <p className="font-medium text-green-deep">
                      {product.specs.volumes.join(", ")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-green-pale rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-green-mid/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-green-mid" />
                  </div>
                  <div>
                    <p className="text-xs text-ink/60">Срок годности</p>
                    <p className="font-medium text-green-deep">
                      {product.specs.shelfLife}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Two-Column Details */}
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 mt-12">
            {/* Left Column: Specs */}
            <motion.div variants={fadeInUp} className="lg:col-span-2 space-y-8">
              {/* Specs Table */}
              <div className="bg-white rounded-2xl p-6 border border-green-mist/50">
                <h2 className="font-display text-xl font-semibold text-green-deep mb-6 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-green-mid" />
                  Технические характеристики
                </h2>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium text-ink/60 w-1/3">
                        Объем
                      </TableCell>
                      <TableCell className="text-green-deep">
                        {product.specs.volumes.join(", ")}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium text-ink/60">
                        Упаковка
                      </TableCell>
                      <TableCell className="text-green-deep">
                        {product.specs.packaging.join(", ")}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium text-ink/60">
                        Аромат
                      </TableCell>
                      <TableCell className="text-green-deep">
                        {product.specs.fragrances.join(", ")}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium text-ink/60">
                        <div className="flex items-center gap-2">
                          <Beaker className="w-4 h-4" />
                          pH уровень
                        </div>
                      </TableCell>
                      <TableCell className="text-green-deep">
                        {product.specs.phLevel}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium text-ink/60">
                        Состав
                      </TableCell>
                      <TableCell className="text-green-deep">
                        {product.specs.composition}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium text-ink/60">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          Срок годности
                        </div>
                      </TableCell>
                      <TableCell className="text-green-deep">
                        {product.specs.shelfLife}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              {/* Certificates */}
              <div className="bg-white rounded-2xl p-6 border border-green-mist/50">
                <h2 className="font-display text-xl font-semibold text-green-deep mb-6 flex items-center gap-2">
                  <Award className="w-5 h-5 text-green-mid" />
                  Сертификаты
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {product.certifications.map((cert) => (
                    <div
                      key={cert}
                      className="aspect-square bg-green-pale rounded-xl flex flex-col items-center justify-center p-4 hover:bg-green-mist transition-colors"
                    >
                      <Award className="w-8 h-8 text-green-mid mb-2" />
                      <span className="text-sm font-medium text-green-deep text-center">
                        {cert}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Column: Order Info */}
            <motion.div variants={fadeInUp} className="space-y-6">
              <div className="sticky top-24 bg-white rounded-2xl p-6 border border-green-mist/50 space-y-6">
                {/* MOQ Info */}
                <div className="bg-green-pale rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-green-mid flex items-center justify-center">
                      <Package className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-ink/60">Минимальный заказ</p>
                      <p className="text-xl font-display font-bold text-green-deep">
                        {product.moq}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-ink/70">
                    {product.moqDescription}
                  </p>
                </div>

                <Separator />

                {/* CTA */}
                <div className="space-y-3">
                  <Button
                    className="w-full bg-green-mid hover:bg-green-deep text-white h-14 text-base"
                    onClick={() => setIsContactOpen(true)}
                  >
                    Запросить цену
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-green-mid text-green-mid hover:bg-green-mist h-12"
                    onClick={() => window.open('tel:+78001234567', '_self')}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Позвонить
                  </Button>
                </div>

                {/* Contact info */}
                <div className="text-center text-sm text-ink/60">
                  <p>Или напишите нам:</p>
                  <div className="flex justify-center gap-4 mt-2">
                    <a
                      href="https://t.me/darkosmetik"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-mid hover:underline"
                    >
                      Telegram
                    </a>
                    <a
                      href="https://wa.me/78001234567"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-mid hover:underline"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <motion.div variants={fadeInUp} className="mt-16">
              <h2 className="font-display text-2xl font-semibold text-green-deep mb-8">
                Похожие товары
              </h2>
              <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
                {relatedProducts.map((related) => (
                  <Link
                    key={related.id}
                    href={`/catalog/${related.slug}`}
                    className="flex-shrink-0 w-64 snap-start"
                  >
                    <div className="bg-white rounded-xl border border-green-mist/50 overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="aspect-square bg-gradient-to-br from-green-mist to-green-pale flex items-center justify-center">
                        <Package className="w-12 h-12 text-green-mid/40" />
                      </div>
                      <div className="p-4">
                        <Badge
                          variant="secondary"
                          className="text-xs mb-2"
                        >
                          {related.categoryLabel}
                        </Badge>
                        <h3 className="font-display font-semibold text-green-deep line-clamp-2">
                          {related.name}
                        </h3>
                        <p className="text-sm text-ink/60 mt-1">
                          {related.tagline}
                        </p>
                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-xs text-ink/50">
                            от {Math.min(...related.specs.volumes.map(v => parseInt(v)))} шт
                          </span>
                          <ArrowRight className="w-4 h-4 text-green-mid" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Sticky Mobile Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border p-4 lg:hidden z-40 pb-safe">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <p className="font-display font-semibold text-green-deep truncate">
              {product.name}
            </p>
            <p className="text-xs text-ink/60">Мин. заказ: {product.moq}</p>
          </div>
          <Button
            className="bg-green-mid hover:bg-green-deep text-white"
            onClick={() => setIsContactOpen(true)}
          >
            Запросить цену
          </Button>
        </div>
      </div>

      {/* Spacer for mobile bottom bar */}
      <div className="h-20 lg:hidden" />

      {/* Contact Dialog */}
      <ContactDialog
        open={isContactOpen}
        onOpenChange={setIsContactOpen}
        defaultProduct={product.category}
      />
    </>
  );
}
