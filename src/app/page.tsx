"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Download,
  Package,
  Leaf,
  Award,
  Phone,
  CheckCircle,
  Factory,
  BadgeCheck,
  Handshake,
  Tag,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactDialog } from "@/components/shared/ContactDialog";
import {
  trustStats,
  categoryCards,
  usps,
  certificates,
} from "@/lib/data";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

// Icon mapping for USPs
const iconMap: Record<string, React.ElementType> = {
  Factory,
  BadgeCheck,
  Handshake,
  Tag,
};

export default function HomePage() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-cream via-green-mist/30 to-cream" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-green-mist/50 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="space-y-8"
            >
              <motion.div variants={fadeInUp} className="space-y-4">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-mist text-green-deep text-sm font-medium">
                  <Leaf className="w-4 h-4" />
                  Собственное производство с 2009 года
                </span>
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-green-deep leading-tight">
                  Натуральная мыльная продукция оптом — от производителя
                </h1>
                <p className="text-lg sm:text-xl text-ink/70 max-w-xl leading-relaxed">
                  Жидкое мыло, бытовая химия и средства гигиены для розницы,
                  HoReCa и дистрибьюции. Собственное производство,
                  сертифицированное качество, гибкие условия.
                </p>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button
                  size="lg"
                  className="bg-green-mid hover:bg-green-deep text-white h-14 px-8 text-base"
                  onClick={() => setIsContactOpen(true)}
                >
                  <Download className="w-5 h-5 mr-2" />
                  Скачать прайс-лист
                </Button>
                <Link href="/catalog">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-green-mid text-green-mid hover:bg-green-mist h-14 px-8 text-base"
                  >
                    Смотреть каталог
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="flex items-center gap-4 text-sm text-ink/60"
              >
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-green-mid/20 border-2 border-white flex items-center justify-center"
                    >
                      <Package className="w-4 h-4 text-green-mid" />
                    </div>
                  ))}
                </div>
                <span>Более 500 компаний уже работают с нами</span>
              </motion.div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative hidden lg:block"
            >
              <div className="relative aspect-square max-w-lg mx-auto">
                {/* Decorative circles */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-mist to-green-pale" />
                <div className="absolute inset-8 rounded-full bg-gradient-to-br from-green-mist/50 to-cream" />

                {/* Product image placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-64 h-80 bg-white rounded-2xl shadow-2xl flex items-center justify-center transform rotate-6 hover:rotate-0 transition-transform duration-500">
                    <div className="text-center p-6">
                      <div className="w-48 h-48 mx-auto mb-4 bg-green-mist rounded-xl flex items-center justify-center">
                        <Package className="w-24 h-24 text-green-mid" />
                      </div>
                      <p className="text-ink/60 text-sm">Жидкое мыло</p>
                      <p className="font-display text-xl text-green-deep">
                        Премиум качества
                      </p>
                    </div>
                  </div>
                </div>

                {/* Floating badges */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-10 left-0 bg-white rounded-xl shadow-lg px-4 py-3"
                >
                  <p className="text-sm font-medium text-green-deep">
                    ГОСТ Р
                  </p>
                  <p className="text-xs text-ink/60">Сертификат</p>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-20 right-0 bg-green-mid rounded-xl shadow-lg px-4 py-3 text-white"
                >
                  <p className="text-sm font-medium">5000+ тонн</p>
                  <p className="text-xs text-white/80">в год</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-green-mid/30 flex items-start justify-center p-2"
          >
            <div className="w-1 h-2 rounded-full bg-green-mid" />
          </motion.div>
        </motion.div>
      </section>

      {/* Trust Bar */}
      <section className="py-12 bg-white border-y border-green-mist">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-5 gap-8"
          >
            {trustStats.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center"
              >
                <p className="font-display text-3xl sm:text-4xl font-bold text-green-mid">
                  {stat.value}
                </p>
                <p className="text-sm text-ink/60 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span
              variants={fadeInUp}
              className="text-green-mid font-medium text-sm uppercase tracking-wider"
            >
              Каталог продукции
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="mt-4 font-display text-3xl sm:text-4xl font-bold text-green-deep"
            >
              Продукция для вашего бизнеса
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="mt-4 text-ink/60 max-w-2xl mx-auto"
            >
              От канистр для HoReCa до розничных бутылок — выберите продукцию,
              которая подходит именно вам
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {categoryCards.map((category) => (
              <motion.div key={category.id} variants={scaleIn}>
                <Link
                  href={category.href}
                  className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-green-mist/50"
                >
                  <div className="aspect-[4/3] relative bg-green-mist">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Package className="w-16 h-16 text-green-mid/40 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-green-deep">
                      {category.productCount} товаров
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl font-semibold text-green-deep group-hover:text-green-mid transition-colors">
                      {category.title}
                    </h3>
                    <p className="mt-2 text-sm text-ink/60">
                      {category.description}
                    </p>
                    <div className="mt-4 flex items-center text-green-mid font-medium text-sm group-hover:gap-2 transition-all">
                      <span>Перейти в каталог</span>
                      <ArrowRight className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Us / USPs */}
      <section className="py-20 lg:py-32 bg-green-pale">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span
              variants={fadeInUp}
              className="text-green-mid font-medium text-sm uppercase tracking-wider"
            >
              Почему мы
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="mt-4 font-display text-3xl sm:text-4xl font-bold text-green-deep"
            >
              Преимущества работы с нами
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {usps.map((usp, index) => {
              const IconComponent = iconMap[usp.icon] || Package;
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow"
                >
                  <div className="w-14 h-14 rounded-xl bg-green-mist flex items-center justify-center mb-6">
                    <IconComponent className="w-7 h-7 text-green-mid" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-green-deep mb-3">
                    {usp.title}
                  </h3>
                  <p className="text-ink/60 text-sm leading-relaxed">
                    {usp.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Certifications Teaser */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.span
                variants={fadeInUp}
                className="text-green-mid font-medium text-sm uppercase tracking-wider"
              >
                Качество и безопасность
              </motion.span>
              <motion.h2
                variants={fadeInUp}
                className="mt-4 font-display text-3xl sm:text-4xl font-bold text-green-deep"
              >
                Сертифицированная продукция
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="mt-4 text-ink/60 leading-relaxed"
              >
                Вся наша продукция проходит строгий контроль качества и имеет
                все необходимые сертификаты соответствия. Мы гарантируем
                безопасность и высокое качество каждой единицы продукции.
              </motion.p>
              <motion.ul
                variants={fadeInUp}
                className="mt-6 space-y-3"
              >
                {[
                  "Соответствие ГОСТ Р",
                  "Санитарно-эпидемиологические заключения",
                  "Система менеджмента качества ISO 9001",
                  "Eco-friendly сертификация",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-mid flex-shrink-0" />
                    <span className="text-ink/80">{item}</span>
                  </li>
                ))}
              </motion.ul>
              <motion.div variants={fadeInUp} className="mt-8">
                <Link href="/certificates">
                  <Button
                    variant="outline"
                    className="border-green-mid text-green-mid hover:bg-green-mist"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Все сертификаты
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid grid-cols-2 gap-4"
            >
              {certificates.slice(0, 4).map((cert, index) => (
                <motion.div
                  key={cert.id}
                  variants={scaleIn}
                  className={`bg-white rounded-xl p-6 shadow-sm border border-green-mist/50 hover:shadow-md transition-shadow ${
                    index === 0 ? "sm:translate-y-8" : ""
                  } ${index === 2 ? "sm:translate-y-8" : ""}`}
                >
                  <div className="aspect-[3/4] bg-green-mist rounded-lg mb-4 flex items-center justify-center">
                    <Award className="w-12 h-12 text-green-mid/40" />
                  </div>
                  <h4 className="font-display font-semibold text-green-deep text-sm mb-1">
                    {cert.name.length > 40
                      ? cert.name.slice(0, 40) + "..."
                      : cert.name}
                  </h4>
                  <p className="text-xs text-ink/50">{cert.issuer}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Block */}
      <section className="py-20 lg:py-32 bg-green-mid relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-mid to-green-deep" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-green-deep/50 to-transparent" />
        <div className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full bg-white/5" />
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-white/5" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="space-y-8"
          >
            <motion.h2
              variants={fadeInUp}
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white"
            >
              Готовы начать сотрудничество?
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-white/80 max-w-2xl mx-auto"
            >
              Получите актуальный прайс-лист, образцы продукции и
              персональное коммерческое предложение в течение одного рабочего
              дня
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                size="lg"
                className="bg-white text-green-deep hover:bg-green-pale h-14 px-8 text-base"
                onClick={() => setIsContactOpen(true)}
              >
                Запросить прайс-лист
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <a href="tel:+78001234567">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white bg-green-mid hover:bg-green-deep/10 h-14 px-8 text-base"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Позвонить
                </Button>
              </a>
            </motion.div>
            <motion.p
              variants={fadeInUp}
              className="text-sm text-white/60"
            >
              Или напишите нам в{" "}
              <a
                href="https://t.me/darkosmetik"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white"
              >
                Telegram
              </a>{" "}
              или{" "}
              <a
                href="https://wa.me/78001234567"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white"
              >
                WhatsApp
              </a>
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Dialog */}
      <ContactDialog open={isContactOpen} onOpenChange={setIsContactOpen} />
    </>
  );
}
