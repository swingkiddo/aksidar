"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Package, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProductCardBaseProps {
  id: string;
  name: string;
  slug: string;
  image: string | null;
  href: string;
}

interface ProductCardVariant extends ProductCardBaseProps {
  variant: "product";
  category: string;
  brand?: string;
  volume?: string;
  onRequestPrice?: () => void;
}

interface CategoryCardVariant extends ProductCardBaseProps {
  variant: "category";
  description: string | null;
  productCount: number;
}

type ProductCardProps = ProductCardVariant | CategoryCardVariant;

export function ProductCard(props: ProductCardProps) {
  const { id, name, slug, image, href, variant } = props;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="group h-full bg-white rounded-2xl overflow-hidden border border-green-mist/40 hover:shadow-xl hover:shadow-green-deep/5 transition-all duration-500 hover:scale-[1.02] flex flex-col will-change-transform"
    >
      <Link href={href} className="block">
        <div className="aspect-[4/3] relative bg-gradient-to-br from-green-mist to-green-pale overflow-hidden backdrop-blur-sm">
          {image ? (
            <img
              src={image}
              alt={name}
              className="w-full h-full object-contain p-4"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <Package className="w-16 h-16 text-green-mid/20 group-hover:scale-125 group-hover:text-green-mid/35 transition-all duration-500" />
            </div>
          )}

          {variant === "product" && props.category && (
            <div className="absolute top-3 left-3">
              <Badge
                variant="secondary"
                className="bg-white/80 backdrop-blur-sm text-ink/70 text-xs"
              >
                {props.category.includes(" — ") ? props.category.split(" — ")[0] : props.category}
              </Badge>
            </div>
          )}

          {variant === "category" && (
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md rounded-full px-3 py-1 text-xs font-semibold text-green-deep shadow-sm">
              {props.productCount} товаров
            </div>
          )}

          <div className="absolute inset-0 bg-green-deep/0 group-hover:bg-green-deep/10 transition-colors duration-300" />
        </div>
      </Link>

      <div className="p-5 flex flex-col flex-grow justify-between">
        <Link href={href}>
          <h3 className="font-display text-base font-semibold text-green-deep group-hover:text-green-mid transition-colors line-clamp-2">
            {name}
          </h3>
        </Link>

        {variant === "category" && props.description && (
          <p className="mt-2 text-sm text-ink/60 line-clamp-3">
            {props.description}
          </p>
        )}

        {variant === "product" && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {props.volume && (
              <Badge
                variant="outline"
                className="border-green-mid/30 text-green-deep text-xs"
              >
                {props.volume}
              </Badge>
            )}
            {props.brand && (
              <Badge
                variant="outline"
                className="border-earth/30 text-earth text-xs"
              >
                {props.brand}
              </Badge>
            )}
          </div>
        )}

        {variant === "category" && (
          <div className="mt-auto pt-4">
            <Link
              href={href}
              className="flex items-center justify-center w-full py-2.5 px-4 rounded-lg bg-green-mist/50 group-hover:bg-green-mid text-white text-sm font-medium transition-all duration-300 cursor-pointer"
            >
              Перейти в каталог
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        )}

        {variant === "product" && props.onRequestPrice && (
          <div className="mt-4 pt-4 border-t border-green-mist/30">
            <Button
              className="w-full bg-green-mid hover:bg-green-deep text-white transition-all duration-300"
              onClick={(e) => {
                e.preventDefault();
                props.onRequestPrice?.();
              }}
            >
              Запросить цену
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
