"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Package,
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
import { categoryInfo } from "@/lib/data";
import { Product } from "@/types";

interface ProductDetailContentProps {
  product: Product;
  relatedProducts: Product[];
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
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
      <div className="bg-green-pale border-b border-green-mist/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center text-sm text-ink/50 overflow-x-auto scrollbar-hide">
            <Link href="/" className="hover:text-green-mid transition-colors whitespace-nowrap">
              Главная
            </Link>
            <ChevronRight className="w-3.5 h-3.5 mx-2 flex-shrink-0" />
            <Link
              href="/catalog"
              className="hover:text-green-mid transition-colors whitespace-nowrap"
            >
              Каталог
            </Link>
            <ChevronRight className="w-3.5 h-3.5 mx-2 flex-shrink-0" />
            <Link
              href={`/catalog?category=${product.category}`}
              className="hover:text-green-mid transition-colors whitespace-nowrap"
            >
              {categoryInfoData.label}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 mx-2 flex-shrink-0" />
            <span className="text-green-deep font-medium truncate">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* Back to catalog (mobile) */}
          <motion.div variants={fadeInUp} className="mb-6 lg:hidden">
            <Link
              href="/catalog"
              className="inline-flex items-center text-sm text-ink/50 hover:text-green-mid transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Назад в каталог
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Image Gallery */}
            <motion.div variants={fadeInUp} className="space-y-5">
              <div className="aspect-square bg-gradient-to-br from-green-mist to-green-pale rounded-3xl flex items-center justify-center relative overflow-hidden border border-green-mist/30">
                <div className="w-40 h-40 rounded-3xl bg-green-mid/5 flex items-center justify-center">
                  <Package className="w-20 h-20 text-green-mid/25" />
                </div>

                <div className="absolute top-5 left-5 flex flex-col gap-2">
                  {product.isNew && (
                    <Badge className="bg-green-bright text-white border-0 text-xs">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Новинка
                    </Badge>
                  )}
                  {product.isBestseller && (
                    <Badge className="bg-earth-warm text-white border-0 text-xs">
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
                      "w-20 h-20 rounded-xl bg-gradient-to-br flex items-center justify-center transition-all duration-300 border-2",
                      selectedImage === idx
                        ? "from-green-mist to-green-pale border-green-mid"
                        : "from-gray-100 to-gray-50 border-transparent hover:border-green-mist"
                    )}
                  >
                    <Package
                      className={cn(
                        "w-8 h-8 transition-colors",
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
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <Badge
                    variant="secondary"
                    className="bg-green-mist text-green-deep text-sm"
                  >
                    {product.categoryLabel}
                  </Badge>
                </div>
                <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-green-deep leading-tight">
                  {product.name}
                </h1>
                <p className="text-lg text-ink/60 mt-3">{product.tagline}</p>
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

              <p className="text-ink/70 leading-relaxed text-base">
                {product.description}
              </p>

              {/* Key Features */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-4 p-5 bg-green-pale rounded-2xl border border-green-mist/30">
                  <div className="w-12 h-12 rounded-xl bg-green-mid/10 flex items-center justify-center flex-shrink-0">
                    <Droplets className="w-6 h-6 text-green-mid" />
                  </div>
                  <div>
                    <p className="text-xs text-ink/50 mb-0.5">Объем</p>
                    <p className="font-semibold text-green-deep text-sm">
                      {product.specs.volumes.join(", ")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-5 bg-green-pale rounded-2xl border border-green-mist/30">
                  <div className="w-12 h-12 rounded-xl bg-green-mid/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-green-mid" />
                  </div>
                  <div>
                    <p className="text-xs text-ink/50 mb-0.5">Срок годности</p>
                    <p className="font-semibold text-green-deep text-sm">
                      {product.specs.shelfLife}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Two-Column Details */}
          <div className="grid lg:grid-cols-3 gap-10 lg:gap-14 mt-16">
            {/* Left Column: Specs */}
            <motion.div variants={fadeInUp} className="lg:col-span-2 space-y-8">
              {/* Specs Table */}
              <div className="bg-white rounded-2xl p-6 lg:p-8 border border-green-mist/30">
                <h2 className="font-display text-xl font-semibold text-green-deep mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-mist flex items-center justify-center">
                    <FileText className="w-5 h-5 text-green-mid" />
                  </div>
                  Технические характеристики
                </h2>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium text-ink/50 w-1/3">
                        Объем
                      </TableCell>
                      <TableCell className="text-green-deep">
                        {product.specs.volumes.join(", ")}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium text-ink/50">
                        Упаковка
                      </TableCell>
                      <TableCell className="text-green-deep">
                        {product.specs.packaging.join(", ")}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium text-ink/50">
                        Аромат
                      </TableCell>
                      <TableCell className="text-green-deep">
                        {product.specs.fragrances.join(", ")}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium text-ink/50">
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
                      <TableCell className="font-medium text-ink/50">
                        Состав
                      </TableCell>
                      <TableCell className="text-green-deep">
                        {product.specs.composition}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium text-ink/50">
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
              <div className="bg-white rounded-2xl p-6 lg:p-8 border border-green-mist/30">
                <h2 className="font-display text-xl font-semibold text-green-deep mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-mist flex items-center justify-center">
                    <Award className="w-5 h-5 text-green-mid" />
                  </div>
                  Сертификаты
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {product.certifications.map((cert) => (
                    <div
                      key={cert}
                      className="aspect-square bg-green-pale rounded-xl flex flex-col items-center justify-center p-4 hover:bg-green-mist transition-colors border border-green-mist/30"
                    >
                      <Award className="w-8 h-8 text-green-mid/50 mb-2" />
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
              <div className="sticky top-24 bg-white rounded-2xl p-6 border border-green-mist/30 space-y-6 shadow-sm">
                {/* MOQ Info */}
                <div className="bg-green-pale rounded-xl p-5 border border-green-mist/30">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-green-mid flex items-center justify-center">
                      <Package className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-ink/50">Минимальный заказ</p>
                      <p className="text-xl font-display font-bold text-green-deep">
                        {product.moq}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-ink/60">
                    {product.moqDescription}
                  </p>
                </div>

                <Separator />

                {/* CTA */}
                <div className="space-y-3">
                  <Button
                    className="w-full bg-green-mid hover:bg-green-deep text-white h-14 text-base font-semibold"
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
                <div className="text-center text-sm text-ink/50">
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
            <motion.div variants={fadeInUp} className="mt-20">
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
                    <div className="bg-white rounded-xl border border-green-mist/30 overflow-hidden hover:shadow-lg hover:shadow-green-deep/5 transition-all duration-300">
                      <div className="aspect-square bg-gradient-to-br from-green-mist to-green-pale flex items-center justify-center">
                        <Package className="w-12 h-12 text-green-mid/25" />
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
                        <p className="text-sm text-ink/50 mt-1">
                          {related.tagline}
                        </p>
                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-xs text-ink/40">
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
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-green-mist/20 p-4 lg:hidden z-40 pb-safe">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <p className="font-display font-semibold text-green-deep truncate">
              {product.name}
            </p>
            <p className="text-xs text-ink/50">Мин. заказ: {product.moq}</p>
          </div>
          <Button
            className="bg-green-mid hover:bg-green-deep text-white font-semibold"
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
