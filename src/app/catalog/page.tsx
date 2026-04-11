"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Filter,
  Package,
  X,
  Check,
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
import { ProductCard } from "@/components/shared/ProductCard";
import { useProducts } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
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
      {title && <h4 className="font-display font-semibold text-green-deep">{title}</h4>}
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
  volumes: string[];
  brands: string[];
  selectedVolumes: string[];
  selectedBrands: string[];
  onToggleVolume: (v: string) => void;
  onToggleBrand: (b: string) => void;
  onClear: () => void;
  activeFiltersCount: number;
}

function FilterSidebar({
  volumes,
  brands,
  selectedVolumes,
  selectedBrands,
  onToggleVolume,
  onToggleBrand,
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

      <Accordion defaultValue={["volume", "brand"]}>
        <AccordionItem value="volume">
          <AccordionTrigger className="font-display font-semibold text-green-deep hover:no-underline">
            Объём
          </AccordionTrigger>
          <AccordionContent>
            <FilterSection
              title=""
              options={volumes}
              selected={selectedVolumes}
              onToggle={onToggleVolume}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="brand">
          <AccordionTrigger className="font-display font-semibold text-green-deep hover:no-underline">
            Бренд
          </AccordionTrigger>
          <AccordionContent>
            <FilterSection
              title=""
              options={brands}
              selected={selectedBrands}
              onToggle={onToggleBrand}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

function CatalogContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { products, loading: productsLoading } = useProducts();
  const { categories, loading: categoriesLoading } = useCategories();

  const initialCategory = searchParams.get("category") || "all";
  const initialVolumes = searchParams.get("volumes")?.split(",") || [];
  const initialBrands = searchParams.get("brands")?.split(",") || [];

  const [isContactOpen, setIsContactOpen] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedVolumes, setSelectedVolumes] = useState<string[]>(initialVolumes);
  const [selectedBrands, setSelectedBrands] = useState<string[]>(initialBrands);

  const volumes = useMemo(() => {
    const v = new Set(products.map((p) => p.volume));
    return Array.from(v).sort((a, b) => {
      const aNum = parseInt(a.replace(/[^\d]/g, "")) || 0;
      const bNum = parseInt(b.replace(/[^\d]/g, "")) || 0;
      return aNum - bNum;
    });
  }, [products]);

  const brands = useMemo(() => {
    const b = new Set(products.map((p) => p.brand.name));
    return Array.from(b).sort();
  }, [products]);

  const updateURL = (params: { category?: string; volumes?: string[]; brands?: string[] }) => {
    const newParams = new URLSearchParams();

    if (params.category && params.category !== "all") {
      newParams.set("category", params.category);
    }
    if (params.volumes?.length) {
      newParams.set("volumes", params.volumes.join(","));
    }
    if (params.brands?.length) {
      newParams.set("brands", params.brands.join(","));
    }

    const queryString = newParams.toString();
    router.push(queryString ? `?${queryString}` : "/catalog", { scroll: false });
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    updateURL({ category, volumes: selectedVolumes, brands: selectedBrands });
  };

  const toggleVolume = (volume: string) => {
    const newVolumes = selectedVolumes.includes(volume)
      ? selectedVolumes.filter((v) => v !== volume)
      : [...selectedVolumes, volume];
    setSelectedVolumes(newVolumes);
    updateURL({ category: selectedCategory, volumes: newVolumes, brands: selectedBrands });
  };

  const toggleBrand = (brand: string) => {
    const newBrands = selectedBrands.includes(brand)
      ? selectedBrands.filter((b) => b !== brand)
      : [...selectedBrands, brand];
    setSelectedBrands(newBrands);
    updateURL({ category: selectedCategory, volumes: selectedVolumes, brands: newBrands });
  };

  const clearFilters = () => {
    setSelectedCategory("all");
    setSelectedVolumes([]);
    setSelectedBrands([]);
    router.push("/catalog", { scroll: false });
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (selectedCategory !== "all" && product.category.slug !== selectedCategory) {
        return false;
      }
      if (selectedVolumes.length && !selectedVolumes.includes(product.volume)) {
        return false;
      }
      if (selectedBrands.length && !selectedBrands.includes(product.brand.name)) {
        return false;
      }
      return true;
    });
  }, [products, selectedCategory, selectedVolumes, selectedBrands]);

  const activeFiltersCount =
    selectedVolumes.length + selectedBrands.length + (selectedCategory !== "all" ? 1 : 0);

  const categoryTabs = useMemo(() => {
    const tabs = [{ id: "all", label: "Все" }];
    categories.forEach((cat) => {
      const shortName = cat.name.includes(" — ") ? cat.name.split(" — ")[0] : cat.name;
      tabs.push({ id: cat.slug, label: shortName });
    });
    return tabs;
  }, [categories]);

  if (productsLoading || categoriesLoading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="animate-pulse text-green-mid">Загрузка...</div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-gradient-to-br from-green-deep via-green-mid to-green-bright text-white pt-40 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`, backgroundSize: '36px 36px' }} />
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-green-bright/10 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold"
          >
            Каталог продукции
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-lg text-white/60 max-w-2xl"
          >
            Жидкое мыло и бытовая химия оптом от производителя
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-10">
          <div className="flex flex-wrap gap-2">
            {categoryTabs.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={cn(
                  "px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                  selectedCategory === cat.id
                    ? "bg-green-deep text-white shadow-md"
                    : "bg-white text-ink/60 hover:bg-green-mist border border-green-mist/40"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 bg-white rounded-2xl p-6 border border-green-mist/40">
              <FilterSidebar
                volumes={volumes}
                brands={brands}
                selectedVolumes={selectedVolumes}
                selectedBrands={selectedBrands}
                onToggleVolume={toggleVolume}
                onToggleBrand={toggleBrand}
                onClear={clearFilters}
                activeFiltersCount={activeFiltersCount}
              />
            </div>
          </aside>

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
                    <Accordion defaultValue={["volume", "brand"]}>
                      <AccordionItem value="volume">
                        <AccordionTrigger className="font-display font-semibold text-green-deep hover:no-underline">
                          Объём
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2">
                            {volumes.map((option) => (
                              <label key={option} className="flex items-center gap-3 cursor-pointer group">
                                <div
                                  className={cn("w-5 h-5 rounded border-2 flex items-center justify-center transition-colors", selectedVolumes.includes(option) ? "bg-green-mid border-green-mid" : "border-green-mid/30 group-hover:border-green-mid")}
                                  onClick={() => toggleVolume(option)}
                                >
                                  {selectedVolumes.includes(option) && <Check className="w-3 h-3 text-white" />}
                                </div>
                                <span className={cn("text-sm transition-colors", selectedVolumes.includes(option) ? "text-green-deep font-medium" : "text-ink/70 group-hover:text-ink")}>{option}</span>
                              </label>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="brand">
                        <AccordionTrigger className="font-display font-semibold text-green-deep hover:no-underline">
                          Бренд
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2">
                            {brands.map((option) => (
                              <label key={option} className="flex items-center gap-3 cursor-pointer group">
                                <div
                                  className={cn("w-5 h-5 rounded border-2 flex items-center justify-center transition-colors", selectedBrands.includes(option) ? "bg-green-mid border-green-mid" : "border-green-mid/30 group-hover:border-green-mid")}
                                  onClick={() => toggleBrand(option)}
                                >
                                  {selectedBrands.includes(option) && <Check className="w-3 h-3 text-white" />}
                                </div>
                                <span className={cn("text-sm transition-colors", selectedBrands.includes(option) ? "text-green-deep font-medium" : "text-ink/70 group-hover:text-ink")}>{option}</span>
                              </label>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-border flex gap-3">
                  <Button variant="outline" className="flex-1 border-green-mid text-green-mid" onClick={() => { clearFilters(); setMobileFiltersOpen(false); }}>Сбросить</Button>
                  <Button className="flex-1 bg-green-mid hover:bg-green-deep text-white" onClick={() => setMobileFiltersOpen(false)}>Применить</Button>
                </div>
              </SheetContent>
            </Sheet>

            <span className="text-sm text-ink/50">
              {filteredProducts.length} товаров
            </span>
          </div>

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
                    variant="product"
                    id={product.id}
                    name={product.name}
                    slug={product.slug}
                    image={product.image}
                    href={`/catalog/${product.slug}`}
                    category={product.category.name}
                    brand={product.brand.name}
                    volume={product.volume}
                    onRequestPrice={() => setIsContactOpen(true)}
                  />
                ))}
              </AnimatePresence>
            </motion.div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <div className="w-20 h-20 rounded-full bg-green-mist mx-auto mb-6 flex items-center justify-center">
                  <Package className="w-10 h-10 text-green-mid/40" />
                </div>
                <h3 className="font-display text-2xl text-green-deep mb-2">
                  Товары не найдены
                </h3>
                <p className="text-ink/50 mb-6">
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
    <Suspense fallback={<div className="min-h-screen bg-cream" />}>
      <CatalogContent />
    </Suspense>
  );
}
