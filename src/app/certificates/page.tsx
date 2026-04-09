"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  Download,
  X,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Building2,
  Shield,
  CheckCircle,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { certificates } from "@/lib/data";
import { CertificateCategory } from "@/types";

const categories: { id: CertificateCategory; label: string }[] = [
  { id: "all", label: "Все" },
  { id: "soap", label: "Мыло" },
  { id: "household", label: "Бытовая химия" },
  { id: "quality", label: "Системы качества" },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

export default function CertificatesPage() {
  const [activeCategory, setActiveCategory] = useState<CertificateCategory>("all");
  const [selectedCert, setSelectedCert] = useState<typeof certificates[0] | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const filteredCerts =
    activeCategory === "all"
      ? certificates
      : certificates.filter((cert) => cert.category === activeCategory);

  const openLightbox = (cert: typeof certificates[0], index: number) => {
    setSelectedCert(cert);
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelectedCert(null);
  };

  const goToPrev = useCallback(() => {
    const newIndex = selectedIndex === 0 ? filteredCerts.length - 1 : selectedIndex - 1;
    setSelectedIndex(newIndex);
    setSelectedCert(filteredCerts[newIndex]);
  }, [selectedIndex, filteredCerts]);

  const goToNext = useCallback(() => {
    const newIndex = selectedIndex === filteredCerts.length - 1 ? 0 : selectedIndex + 1;
    setSelectedIndex(newIndex);
    setSelectedCert(filteredCerts[newIndex]);
  }, [selectedIndex, filteredCerts]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedCert) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goToPrev();
      if (e.key === "ArrowRight") goToNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedCert, goToPrev, goToNext]);

  return (
    <>
      {/* Page Header */}
      <div className="bg-gradient-to-br from-green-deep via-green-mid to-green-bright text-white pt-40 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`, backgroundSize: '36px 36px' }} />
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-green-bright/10 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold"
          >
            Сертификаты
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-lg text-white/60 max-w-2xl"
          >
            Подтверждение качества и соответствия стандартам
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mb-14"
        >
          <p className="text-ink/70 leading-relaxed mb-8 text-lg">
            Сертификация — это не просто формальность. Для B2B-покупателей она является
            критическим инструментом управления рисками и обеспечения непрерывности
            поставок.
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="flex items-start gap-3 p-5 bg-white rounded-xl border border-green-mist/30">
              <div className="w-10 h-10 rounded-lg bg-green-mist flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-green-mid" />
              </div>
              <div>
                <p className="font-semibold text-green-deep">ГОСТ Р</p>
                <p className="text-sm text-ink/50">Государственный стандарт РФ</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-5 bg-white rounded-xl border border-green-mist/30">
              <div className="w-10 h-10 rounded-lg bg-green-mist flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-5 h-5 text-green-mid" />
              </div>
              <div>
                <p className="font-semibold text-green-deep">СанПиН</p>
                <p className="text-sm text-ink/50">Санитарные нормы и правила</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-5 bg-white rounded-xl border border-green-mist/30">
              <div className="w-10 h-10 rounded-lg bg-green-mist flex items-center justify-center flex-shrink-0">
                <Award className="w-5 h-5 text-green-mid" />
              </div>
              <div>
                <p className="font-semibold text-green-deep">ISO 9001</p>
                <p className="text-sm text-ink/50">Система менеджмента качества</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filter Tabs */}
        <div className="mb-10">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                  activeCategory === cat.id
                    ? "bg-green-deep text-white shadow-md"
                    : "bg-white text-ink/60 hover:bg-green-mist border border-green-mist/40"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Certificate Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredCerts.map((cert, index) => (
              <motion.div
                key={cert.id}
                variants={fadeInUp}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="group bg-white rounded-2xl overflow-hidden border border-green-mist/40 hover:shadow-xl hover:shadow-green-deep/5 transition-all duration-500 cursor-pointer"
                onClick={() => openLightbox(cert, index)}
              >
                <div className="aspect-[3/4] bg-gradient-to-br from-green-mist to-green-pale relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <FileText className="w-20 h-20 text-green-mid/20 group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="absolute inset-6 border-2 border-dashed border-green-mid/15 rounded-xl" />

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-green-deep/40 backdrop-blur-sm">
                    <Button
                      variant="secondary"
                      className="bg-white text-green-deep hover:bg-green-mist shadow-lg"
                    >
                      <Award className="w-4 h-4 mr-2" />
                      Открыть
                    </Button>
                  </div>

                  <div className="absolute top-4 right-4">
                    <Badge
                      variant="secondary"
                      className="bg-white/80 backdrop-blur-sm text-ink/70 text-xs"
                    >
                      {cert.category === "soap" && "Мыло"}
                      {cert.category === "household" && "Бытовая химия"}
                      {cert.category === "quality" && "Качество"}
                    </Badge>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-display font-semibold text-green-deep mb-3 line-clamp-2">
                    {cert.name}
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-ink/50">
                      <Building2 className="w-4 h-4 flex-shrink-0" />
                      <span className="line-clamp-1">{cert.issuer}</span>
                    </div>
                    <div className="flex items-center gap-2 text-ink/50">
                      <Calendar className="w-4 h-4 flex-shrink-0" />
                      <span>Действует до: {cert.validUntil}</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-green-mist/30">
                    <p className="text-xs text-ink/40 line-clamp-1">
                      Область: {cert.scope}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredCerts.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full bg-green-mist mx-auto mb-6 flex items-center justify-center">
              <Award className="w-10 h-10 text-green-mid/40" />
            </div>
            <h3 className="font-display text-2xl text-green-deep mb-2">
              Сертификаты не найдены
            </h3>
            <p className="text-ink/50">
              Выберите другую категорию
            </p>
          </div>
        )}
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={!!selectedCert} onOpenChange={closeLightbox}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden">
          {selectedCert && (
            <div className="grid md:grid-cols-2">
              <div className="aspect-[3/4] bg-gradient-to-br from-green-mist to-green-pale relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <FileText className="w-32 h-32 text-green-mid/20" />
                </div>
                <div className="absolute inset-8 border-2 border-dashed border-green-mid/15 rounded-xl" />

                <button
                  onClick={(e) => { e.stopPropagation(); goToPrev(); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-white transition-colors"
                  aria-label="Предыдущий"
                >
                  <ChevronLeft className="w-6 h-6 text-green-deep" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); goToNext(); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-white transition-colors"
                  aria-label="Следующий"
                >
                  <ChevronRight className="w-6 h-6 text-green-deep" />
                </button>
              </div>

              <div className="p-8">
                <DialogHeader className="space-y-4">
                  <Badge variant="secondary" className="w-fit">
                    {selectedCert.category === "soap" && "Мыло"}
                    {selectedCert.category === "household" && "Бытовая химия"}
                    {selectedCert.category === "quality" && "Система качества"}
                  </Badge>
                  <DialogTitle className="font-display text-2xl text-green-deep">
                    {selectedCert.name}
                  </DialogTitle>
                </DialogHeader>

                <div className="mt-6 space-y-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-ink/40 mb-1">Выдан</p>
                      <p className="font-medium text-ink">{selectedCert.issuer}</p>
                    </div>
                    <div>
                      <p className="text-sm text-ink/40 mb-1">Действует до</p>
                      <p className="font-medium text-ink">{selectedCert.validUntil}</p>
                    </div>
                    <div>
                      <p className="text-sm text-ink/40 mb-1">Область применения</p>
                      <p className="font-medium text-ink">{selectedCert.scope}</p>
                    </div>
                  </div>

                  <div className="bg-green-pale rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-green-mid flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-ink/70">
                        Данный сертификат подтверждает соответствие продукции
                        требованиям качества и безопасности.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button className="flex-1 bg-green-mid hover:bg-green-deep text-white">
                      <Download className="w-4 h-4 mr-2" />
                      Скачать PDF
                    </Button>
                    <Button
                      variant="outline"
                      className="border-green-mid text-green-mid"
                      onClick={closeLightbox}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>

                  <p className="text-xs text-center text-ink/40">
                    Используйте стрелки ← → для навигации, ESC для закрытия
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
