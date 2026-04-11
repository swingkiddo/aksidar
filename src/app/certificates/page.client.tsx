"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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

interface Certificate {
  id: string;
  name: string;
  image: string;
}

interface CertificatesClientProps {
  certificates: Certificate[];
}

export default function CertificatesClient({ certificates }: CertificatesClientProps) {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openCert = (cert: Certificate, index: number) => {
    setSelectedCert(cert);
    setCurrentIndex(index);
  };

  const closeCert = () => setSelectedCert(null);

  const navigateCert = (direction: "prev" | "next") => {
    const newIndex = direction === "prev" 
      ? (currentIndex - 1 + certificates.length) % certificates.length 
      : (currentIndex + 1) % certificates.length;
    const newCert = certificates[newIndex];
    setSelectedCert(newCert);
    setCurrentIndex(newIndex);
  };

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
            Сертификаты
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-lg text-white/60 max-w-2xl"
          >
            Документы, подтверждающие качество и безопасность продукции
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {certificates.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full bg-green-mist mx-auto mb-6 flex items-center justify-center">
              <Award className="w-10 h-10 text-green-mid/40" />
            </div>
            <h3 className="font-display text-2xl text-green-deep mb-2">
              Сертификаты не найдены
            </h3>
            <p className="text-ink/50">
              В данный момент документы недоступны
            </p>
          </div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {certificates.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  variants={fadeInUp}
                  className="group bg-white rounded-2xl overflow-hidden border border-green-mist/40 hover:shadow-xl hover:shadow-green-deep/5 transition-all duration-500 cursor-pointer"
                  onClick={() => openCert(cert, index)}
                >
                  <div className="aspect-[3/4] relative bg-gradient-to-br from-green-mist to-green-pale overflow-hidden">
                    {cert.image ? (
                      <img
                        src={cert.image}
                        alt={cert.name}
                        className="absolute inset-0 w-full h-full object-contain p-4"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Award className="w-16 h-16 text-green-mid/20 group-hover:scale-125 group-hover:text-green-mid/35 transition-all duration-500" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-green-deep/0 group-hover:bg-green-deep/5 transition-colors duration-500" />
                  </div>
                  <div className="p-5">
                    <Badge className="bg-green-mist/60 text-green-deep text-xs">
                      Документ
                    </Badge>
                    <h3 className="font-display text-lg font-semibold text-green-deep mt-3 line-clamp-2">
                      {cert.name}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      <Dialog open={!!selectedCert} onOpenChange={(open) => !open && closeCert()}>
        <DialogContent className="max-w-[90vw] w-[90vw] bg-cream border-green-mist/40 p-0">
          <DialogHeader className="p-4 pb-0">
            <DialogTitle className="font-display text-xl text-green-deep">
              {selectedCert?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="p-4 pt-2">
            {selectedCert && (
              <img
                src={selectedCert.image}
                alt={selectedCert.name}
                className="w-full h-[80vh] object-contain rounded-lg"
              />
            )}
          </div>
          {certificates.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); navigateCert("prev"); }}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-lg transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-green-deep" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); navigateCert("next"); }}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-lg transition-colors"
              >
                <ChevronRight className="w-6 h-6 text-green-deep" />
              </button>
            </>
          )}
          <div className="flex justify-between items-center p-4 border-t border-green-mist/30">
            <span className="text-sm text-ink/50">
              {currentIndex + 1} / {certificates.length}
            </span>
            <Button variant="outline" className="border-green-mid text-green-mid">
              <a href={selectedCert?.image} download target="_blank" rel="noopener noreferrer">
                Скачать
              </a>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}