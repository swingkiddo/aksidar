"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Filter,
  Package,
  ArrowRight,
  X,
  Check,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { ContactDialog } from "@/components/shared/ContactDialog";
import {
  products,
  filterProducts,
  getFilterOptions,
  categoryInfo,
} from "@/lib/data";
import { ProductCategory } from "@/types";

const categories: { id: ProductCategory | "all"; label: string }[] = [
  { id: "all", label: "Все" },
  { id: "liquid-soap-canisters", label: "Канистры" },
  { id: "liquid-soap-cartridges", label: "Картриджи" },
  { id: "liquid-soap-bottles", label: "Бутылки" },
  { id: "household-chemicals", label: "Бытовая химия" },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

interface FilterSectionProps {
  title: string;
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
}

function FilterSection({ title, options, selected, onToggle }: FilterSectionProps) {
  return (
    <div className="space-y-3">
      <h4 className="font-display font-semibold text-green-deep">{title}</h4>
      <div className="space-y-2">
        {options.map((option) => (
          <label
            key={option}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div
              className={cn(
                "w-5 h-5 rounded border-2 flex items-center justify-center transition-colors",
                selected.includes(option)
                  ? "bg-green-mid border-green-mid"
                  : "border-green-mid/30 group-hover:border-green-mid"
              )}
              onClick={() => onToggle(option)}
            >
              {selected.includes(option) && (
                <Check className="w-3 h-3 text-white" />
              )}
            </div>
            <span
              className={cn(
                "text-sm transition-colors",
                selected.includes(option)
                  ? "text-green-deep font-medium"
                  : "text-ink/70 group-hover:text-ink"
              )}
            >
              {option}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

interface FilterSidebarProps {
  filterOptions: ReturnType<typeof getFilterOptions>;
  selectedVolumes: string[];
  selectedPackaging: string[];
  selectedFragrances: string[];
  onToggleVolume: (v: string) => void;
  onTogglePackaging: (p: string) => void;
  onToggleFragrance: (f: string) => void;
  onClear: () => void;
  activeFiltersCount: number;
}

function FilterSidebar({
  filterOptions,
  selectedVolumes,
  selectedPackaging,
  selectedFragrances,
  onToggleVolume,
  onTogglePackaging,
  onToggleFragrance,
  onClear,
  activeFiltersCount,
}: FilterSidebarProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-xl font-semibold text-green-deep">
          Фильтры
        </h3>
        {activeFiltersCount > 0 && (
          <button
            onClick={onClear}
            className="text-sm text-green-mid hover:text-green-deep transition-colors"
          >
            Сбросить ({activeFiltersCount})
          </button>
        )}
      </div>

      <Accordion  defaultValue={["volume", "packaging", "fragrance"]}>
        <AccordionItem value="volume">
          <AccordionTrigger className="font-display font-semibold text-green-deep hover:no-underline">
            Объем
          </AccordionTrigger>
          <AccordionContent>
            <FilterSection
              title=""
              options={filterOptions.volumes}
              selected={selectedVolumes}
              onToggle={onToggleVolume}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="packaging">
          <AccordionTrigger className="font-display font-semibold text-green-deep hover:no-underline">
            Упаковка
          </AccordionTrigger>
          <AccordionContent>
            <FilterSection
              title=""
              options={filterOptions.packaging}
              selected={selectedPackaging}
              onToggle={onTogglePackaging}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="fragrance">
          <AccordionTrigger className="font-display font-semibold text-green-deep hover:no-underline">
            Аромат
          </AccordionTrigger>
          <AccordionContent>
            <FilterSection
              title=""
              options={filterOptions.fragrances}
              selected={selectedFragrances}
              onToggle={onToggleFragrance}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

interface MobileFilterDrawerProps extends FilterSidebarProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

function MobileFilterDrawer({
  isOpen,
  onOpenChange,
  ...filterProps
}: MobileFilterDrawerProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] bg-cream">
        <SheetHeader className="text-left border-b border-border pb-4">
          <SheetTitle className="font-display text-xl text-green-deep">
            Фильтры
          </SheetTitle>
        </SheetHeader>
        <div className="py-6 overflow-y-auto max-h-[calc(85vh-180px)]">
          <FilterSidebar {...filterProps} />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-border flex gap-3">
          <Button
            variant="outline"
            className="flex-1 border-green-mid text-green-mid"
            onClick={() => {
              filterProps.onClear();
              onOpenChange(false);
            }}
          >
            Сбросить
          </Button>
          <Button
            className="flex-1 bg-green-mid hover:bg-green-deep text-white"
            onClick={() => onOpenChange(false)}
          >
            Применить
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function ProductCard({
  product,
  onRequestPrice,
}: {
  product: (typeof products)[0];
  onRequestPrice: () => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="group bg-white rounded-2xl overflow-hidden border border-green-mist/50 hover:shadow-xl transition-all duration-300"
    >
      <Link href={`/catalog/${product.slug}`} className="block">
        <div className="aspect-[4/3] relative bg-gradient-to-br from-green-mist to-green-pale overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <Package className="w-16 h-16 text-green-mid/30 group-hover:scale-110 transition-transform duration-500" />
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && (
              <Badge className="bg-blue-500 text-white border-0">
                <Sparkles className="w-3 h-3 mr-1" />
                Новинка
              </Badge>
            )}
            {product.isBestseller && (
              <Badge className="bg-orange-500 text-white border-0">
                <TrendingUp className="w-3 h-3 mr-1" />
                Хит
              </Badge>
            )}
          </div>

          {/* Category label */}
          <div className="absolute bottom-3 right-3">
            <Badge
              variant="secondary"
              className="bg-white/90 text-ink text-xs"
            >
              {product.categoryLabel}
            </Badge>
          </div>
        </div>
      </Link>

      <div className="p-5">
        <Link href={`/catalog/${product.slug}`}>
          <h3 className="font-display text-lg font-semibold text-green-deep group-hover:text-green-mid transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-ink/60 mt-1 line-clamp-1">{product.tagline}</p>

        {/* Packaging badges */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {product.specs.packaging.slice(0, 2).map((pkg) => (
            <span
              key={pkg}
              className="inline-flex items-center px-2 py-1 rounded-md bg-green-mist/50 text-xs text-green-deep"
            >
              {pkg}
            </span>
          ))}
          {product.specs.packaging.length > 2 && (
            <span className="text-xs text-ink/40 px-1">
              +{product.specs.packaging.length - 2}
            </span>
          )}
        </div>

        {/* MOQ Badge */}
        <div className="mt-4 flex items-center gap-2">
          <Badge
            variant="outline"
            className="border-earth text-earth bg-earth/5"
          >
            Мин. заказ: {product.moq}
          </Badge>
        </div>

        {/* CTA */}
        <div className="mt-4 pt-4 border-t border-border">
          <Button
            className="w-full bg-green-mid hover:bg-green-deep text-white"
            onClick={(e) => {
              e.preventDefault();
              onRequestPrice();
            }}
          >
            Запросить цену
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

function CatalogContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isContactOpen, setIsContactOpen] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | "all">(
    "all"
  );
  const [selectedVolumes, setSelectedVolumes] = useState<string[]>([]);
  const [selectedPackaging, setSelectedPackaging] = useState<string[]>([]);
  const [selectedFragrances, setSelectedFragrances] = useState<string[]>([]);

  const filterOptions = getFilterOptions();

  // Initialize from URL params
  useEffect(() => {
    const category = searchParams.get("category") as ProductCategory | "all";
    const volumes = searchParams.get("volumes")?.split(",") || [];
    const packaging = searchParams.get("packaging")?.split(",") || [];
    const fragrances = searchParams.get("fragrances")?.split(",") || [];

    if (category && categories.some((c) => c.id === category)) {
      setSelectedCategory(category);
    }
    if (volumes.length > 0) setSelectedVolumes(volumes);
    if (packaging.length > 0) setSelectedPackaging(packaging);
    if (fragrances.length > 0) setSelectedFragrances(fragrances);
  }, [searchParams]);

  // Update URL when filters change
  const updateURL = useCallback(
    (params: {
      category?: ProductCategory | "all";
      volumes?: string[];
      packaging?: string[];
      fragrances?: string[];
    }) => {
      const newParams = new URLSearchParams();

      if (params.category && params.category !== "all") {
        newParams.set("category", params.category);
      }
      if (params.volumes?.length) {
        newParams.set("volumes", params.volumes.join(","));
      }
      if (params.packaging?.length) {
        newParams.set("packaging", params.packaging.join(","));
      }
      if (params.fragrances?.length) {
        newParams.set("fragrances", params.fragrances.join(","));
      }

      const queryString = newParams.toString();
      router.push(queryString ? `?${queryString}` : "/catalog", { scroll: false });
    },
    [router]
  );

  const handleCategoryChange = (category: ProductCategory | "all") => {
    setSelectedCategory(category);
    updateURL({
      category,
      volumes: selectedVolumes,
      packaging: selectedPackaging,
      fragrances: selectedFragrances,
    });
  };

  const toggleVolume = (volume: string) => {
    const newVolumes = selectedVolumes.includes(volume)
      ? selectedVolumes.filter((v) => v !== volume)
      : [...selectedVolumes, volume];
    setSelectedVolumes(newVolumes);
    updateURL({
      category: selectedCategory,
      volumes: newVolumes,
      packaging: selectedPackaging,
      fragrances: selectedFragrances,
    });
  };

  const togglePackaging = (packaging: string) => {
    const newPackaging = selectedPackaging.includes(packaging)
      ? selectedPackaging.filter((p) => p !== packaging)
      : [...selectedPackaging, packaging];
    setSelectedPackaging(newPackaging);
    updateURL({
      category: selectedCategory,
      volumes: selectedVolumes,
      packaging: newPackaging,
      fragrances: selectedFragrances,
    });
  };

  const toggleFragrance = (fragrance: string) => {
    const newFragrances = selectedFragrances.includes(fragrance)
      ? selectedFragrances.filter((f) => f !== fragrance)
      : [...selectedFragrances, fragrance];
    setSelectedFragrances(newFragrances);
    updateURL({
      category: selectedCategory,
      volumes: selectedVolumes,
      packaging: selectedPackaging,
      fragrances: newFragrances,
    });
  };

  const clearFilters = () => {
    setSelectedCategory("all");
    setSelectedVolumes([]);
    setSelectedPackaging([]);
    setSelectedFragrances([]);
    router.push("/catalog", { scroll: false });
  };

  const filteredProducts = filterProducts(
    selectedCategory,
    selectedVolumes,
    selectedPackaging,
    selectedFragrances
  );

  const activeFiltersCount =
    selectedVolumes.length +
    selectedPackaging.length +
    selectedFragrances.length +
    (selectedCategory !== "all" ? 1 : 0);

  const filterSidebarProps: FilterSidebarProps = {
    filterOptions,
    selectedVolumes,
    selectedPackaging,
    selectedFragrances,
    onToggleVolume: toggleVolume,
    onTogglePackaging: togglePackaging,
    onToggleFragrance: toggleFragrance,
    onClear: clearFilters,
    activeFiltersCount,
  };

  return (
    <>
      {/* Page Header */}
      <div className="bg-green-mid text-white pt-40 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl sm:text-5xl font-bold"
          >
            Каталог продукции
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-lg text-white/80 max-w-2xl"
          >
            Жидкое мыло и бытовая химия оптом от производителя
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all",
                  selectedCategory === cat.id
                    ? "bg-green-mid text-white"
                    : "bg-white text-ink/70 hover:bg-green-mist border border-border"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 bg-white rounded-2xl p-6 border border-green-mist/50">
              <FilterSidebar {...filterSidebarProps} />
            </div>
          </aside>

          {/* Mobile Filters */}
          <div className="lg:hidden flex items-center justify-between mb-4">
            <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
              <SheetTrigger>
                <Button variant="outline" className="border-green-mid text-green-mid">
                  <Filter className="w-4 h-4 mr-2" />
                  Фильтры
                  {activeFiltersCount > 0 && (
                    <Badge className="ml-2 bg-green-mid text-white">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[85vh] bg-cream">
                <SheetHeader className="text-left border-b border-border pb-4">
                  <SheetTitle className="font-display text-xl text-green-deep">
                    Фильтры
                  </SheetTitle>
                </SheetHeader>
                <div className="py-6 overflow-y-auto max-h-[calc(85vh-180px)]">
                  <div className="space-y-6 px-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-xl font-semibold text-green-deep">
                        Фильтры
                      </h3>
                      {activeFiltersCount > 0 && (
                        <button
                          onClick={clearFilters}
                          className="text-sm text-green-mid hover:text-green-deep transition-colors"
                        >
                          Сбросить ({activeFiltersCount})
                        </button>
                      )}
                    </div>

                    <Accordion  defaultValue={["volume", "packaging", "fragrance"]}>
                      <AccordionItem value="volume">
                        <AccordionTrigger className="font-display font-semibold text-green-deep hover:no-underline">
                          Объем
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2">
                            {filterOptions.volumes.map((option) => (
                              <label
                                key={option}
                                className="flex items-center gap-3 cursor-pointer group"
                              >
                                <div
                                  className={cn(
                                    "w-5 h-5 rounded border-2 flex items-center justify-center transition-colors",
                                    selectedVolumes.includes(option)
                                      ? "bg-green-mid border-green-mid"
                                      : "border-green-mid/30 group-hover:border-green-mid"
                                  )}
                                  onClick={() => toggleVolume(option)}
                                >
                                  {selectedVolumes.includes(option) && (
                                    <Check className="w-3 h-3 text-white" />
                                  )}
                                </div>
                                <span
                                  className={cn(
                                    "text-sm transition-colors",
                                    selectedVolumes.includes(option)
                                      ? "text-green-deep font-medium"
                                      : "text-ink/70 group-hover:text-ink"
                                  )}
                                >
                                  {option}
                                </span>
                              </label>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="packaging">
                        <AccordionTrigger className="font-display font-semibold text-green-deep hover:no-underline">
                          Упаковка
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2">
                            {filterOptions.packaging.map((option) => (
                              <label
                                key={option}
                                className="flex items-center gap-3 cursor-pointer group"
                              >
                                <div
                                  className={cn(
                                    "w-5 h-5 rounded border-2 flex items-center justify-center transition-colors",
                                    selectedPackaging.includes(option)
                                      ? "bg-green-mid border-green-mid"
                                      : "border-green-mid/30 group-hover:border-green-mid"
                                  )}
                                  onClick={() => togglePackaging(option)}
                                >
                                  {selectedPackaging.includes(option) && (
                                    <Check className="w-3 h-3 text-white" />
                                  )}
                                </div>
                                <span
                                  className={cn(
                                    "text-sm transition-colors",
                                    selectedPackaging.includes(option)
                                      ? "text-green-deep font-medium"
                                      : "text-ink/70 group-hover:text-ink"
                                  )}
                                >
                                  {option}
                                </span>
                              </label>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="fragrance">
                        <AccordionTrigger className="font-display font-semibold text-green-deep hover:no-underline">
                          Аромат
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2">
                            {filterOptions.fragrances.map((option) => (
                              <label
                                key={option}
                                className="flex items-center gap-3 cursor-pointer group"
                              >
                                <div
                                  className={cn(
                                    "w-5 h-5 rounded border-2 flex items-center justify-center transition-colors",
                                    selectedFragrances.includes(option)
                                      ? "bg-green-mid border-green-mid"
                                      : "border-green-mid/30 group-hover:border-green-mid"
                                  )}
                                  onClick={() => toggleFragrance(option)}
                                >
                                  {selectedFragrances.includes(option) && (
                                    <Check className="w-3 h-3 text-white" />
                                  )}
                                </div>
                                <span
                                  className={cn(
                                    "text-sm transition-colors",
                                    selectedFragrances.includes(option)
                                      ? "text-green-deep font-medium"
                                      : "text-ink/70 group-hover:text-ink"
                                  )}
                                >
                                  {option}
                                </span>
                              </label>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-border flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1 border-green-mid text-green-mid"
                    onClick={() => {
                      clearFilters();
                      setMobileFiltersOpen(false);
                    }}
                  >
                    Сбросить
                  </Button>
                  <Button
                    className="flex-1 bg-green-mid hover:bg-green-deep text-white"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    Применить
                  </Button>
                </div>
              </SheetContent>
            </Sheet>

            <span className="text-sm text-ink/60">
              {filteredProducts.length} товаров
            </span>
          </div>

          {/* Product Grid */}
          <main className="flex-1">
            <motion.div
              layout
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onRequestPrice={() => setIsContactOpen(true)}
                  />
                ))}
              </AnimatePresence>
            </motion.div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <Package className="w-16 h-16 text-green-mid/30 mx-auto mb-4" />
                <h3 className="font-display text-xl text-green-deep mb-2">
                  Товары не найдены
                </h3>
                <p className="text-ink/60 mb-6">
                  Попробуйте изменить параметры фильтрации
                </p>
                <Button
                  onClick={clearFilters}
                  variant="outline"
                  className="border-green-mid text-green-mid"
                >
                  <X className="w-4 h-4 mr-2" />
                  Сбросить фильтры
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>

      <ContactDialog open={isContactOpen} onOpenChange={setIsContactOpen} />
    </>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={<div className="h-screen bg-cream" />}>
      <CatalogContent />
    </Suspense>
  );
}
