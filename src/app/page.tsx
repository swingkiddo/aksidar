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
import { trustStats, categoryCards, usps, certificates } from "@/lib/data";

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

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
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 bg-gradient-to-b from-green-deep via-green-deep to-green-mid" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Organic shape overlays */}
        <div className="absolute top-0 right-0 w-[60%] h-[80%] bg-gradient-to-bl from-green-bright/10 via-transparent to-transparent rounded-bl-[120px]" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[50%] bg-gradient-to-tr from-earth/10 via-transparent to-transparent rounded-tr-[80px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-0 w-full">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="lg:col-span-7 space-y-8"
            >
              <motion.div variants={fadeInUp} className="space-y-6">
                <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-green-light text-sm font-medium">
                  <Leaf className="w-4 h-4" />
                  Собственное производство с 2009 года
                </span>

                <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight">
                  Натуральная мыльная продукция
                  <span className="block text-green-light mt-1">оптом</span>
                </h1>

                <p className="text-lg sm:text-xl text-white/60 max-w-xl leading-relaxed">
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
                  className="bg-white text-green-deep hover:bg-green-mist h-14 px-8 text-base font-semibold shadow-lg shadow-black/10"
                  onClick={() => setIsContactOpen(true)}
                >
                  <Download className="w-5 h-5 mr-2" />
                  Скачать прайс-лист
                </Button>
                <Link href="/catalog">
                  <Button
                    size="lg"
                    className="bg-white text-green-deep hover:bg-green-mist h-14 px-8 text-base font-semibold shadow-lg"
                  >
                    Смотреть каталог
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="flex items-center gap-4 text-sm text-white/40"
              >
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-white/10 border-2 border-white/10 flex items-center justify-center"
                    >
                      <Package className="w-3.5 h-3.5 text-green-light/60" />
                    </div>
                  ))}
                </div>
                <span>Более 500 компаний уже работают с нами</span>
              </motion.div>
            </motion.div>

            {/* Right: Visual */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:block lg:col-span-5 relative"
            >
              <div className="relative aspect-[3/4] max-w-md mx-auto">
                {/* Large decorative circle */}
                <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/5 backdrop-blur-sm" />

                {/* Inner content area */}
                <div className="absolute inset-8 rounded-[2rem] overflow-hidden">
                  <img
                    src="/images/processed/soap_tsp_30.png"
                    alt="Жидкое мыло"
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Floating stat card - top */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -top-4 -left-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 px-5 py-4"
                >
                  <p className="text-2xl font-display font-bold text-white">
                    15+
                  </p>
                  <p className="text-xs text-white/50">лет на рынке</p>
                </motion.div>

                {/* Floating stat card - bottom */}
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                  className="absolute -bottom-4 -right-4 bg-green-bright/20 backdrop-blur-md rounded-2xl border border-green-bright/20 px-5 py-4"
                >
                  <p className="text-2xl font-display font-bold text-green-light">
                    5000+
                  </p>
                  <p className="text-xs text-green-light/60">тонн в год</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        {/*<motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2"
          >
            <div className="w-1 h-2 rounded-full bg-white/40" />
          </motion.div>
        </motion.div>*/}
      </section>

      {/* Trust Bar */}
      <section className="py-14 bg-white border-b border-green-mist/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-4"
          >
            {trustStats.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center"
              >
                <p className="font-display text-3xl sm:text-4xl font-bold text-green-deep">
                  {stat.value}
                </p>
                <p className="text-sm text-ink/50 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-24 lg:py-32 grain-overlay">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="mb-16"
          >
            <motion.span
              variants={fadeInUp}
              className="text-green-mid font-medium text-sm uppercase tracking-wider"
            >
              Каталог продукции
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-green-deep max-w-2xl"
            >
              Продукция для вашего бизнеса
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="mt-4 text-ink/60 max-w-xl leading-relaxed"
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
            {categoryCards.map((category, i) => (
              <motion.div
                key={category.id}
                variants={scaleIn}
                className={i === 0 ? "sm:row-span-1" : ""}
              >
                <Link
                  href={category.href}
                  className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-green-mist/40 h-full flex flex-col"
                >
                  <div className="aspect-[4/3] relative bg-gradient-to-br from-green-mist to-green-pale overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Package className="w-16 h-16 text-green-mid/25 group-hover:scale-125 group-hover:text-green-mid/40 transition-all duration-500" />
                    </div>
                    <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-green-deep">
                      {category.productCount} товаров
                    </div>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-green-deep/0 group-hover:bg-green-deep/5 transition-colors duration-500" />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-display text-xl font-semibold text-green-deep group-hover:text-green-mid transition-colors">
                      {category.title}
                    </h3>
                    <p className="mt-2 text-sm text-ink/60 flex-1">
                      {category.description}
                    </p>
                    <div className="mt-4 flex items-center text-green-mid font-medium text-sm">
                      <span>Перейти в каталог</span>
                      <ArrowRight className="w-4 h-4 ml-1 translate-x-0 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Us / USPs */}
      <section className="py-24 lg:py-32 bg-green-deep relative overflow-hidden">
        {/* Background texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-green-bright/5 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span
              variants={fadeInUp}
              className="text-green-light font-medium text-sm uppercase tracking-wider"
            >
              Почему мы
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white"
            >
              Преимущества работы с нами
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {usps.map((usp, index) => {
              const IconComponent = iconMap[usp.icon] || Package;
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 hover:border-white/15 transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-xl bg-green-bright/20 flex items-center justify-center mb-6">
                    <IconComponent className="w-7 h-7 text-green-light" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-white mb-3">
                    {usp.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {usp.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Certifications Teaser */}
      <section className="py-24 lg:py-32 grain-overlay">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
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
                className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-green-deep"
              >
                Сертифицированная продукция
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="mt-6 text-ink/60 leading-relaxed text-lg"
              >
                Вся наша продукция проходит строгий контроль качества и имеет
                все необходимые сертификаты соответствия.
              </motion.p>
              <motion.ul variants={fadeInUp} className="mt-8 space-y-4">
                {[
                  "Соответствие ГОСТ Р",
                  "Санитарно-эпидемиологические заключения",
                  "Система менеджмента качества ISO 9001",
                  "Eco-friendly сертификация",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-green-mist flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-green-mid" />
                    </div>
                    <span className="text-ink-soft">{item}</span>
                  </li>
                ))}
              </motion.ul>
              <motion.div variants={fadeInUp} className="mt-10">
                <Link href="/certificates">
                  <Button
                    variant="outline"
                    className="border-green-mid text-green-mid hover:bg-green-mist h-12 px-6"
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
              className="relative"
            >
              {/* Offset grid for visual interest */}
              <div className="grid grid-cols-2 gap-4">
                {certificates.slice(0, 4).map((cert, index) => (
                  <motion.div
                    key={cert.id}
                    variants={scaleIn}
                    className={`bg-white rounded-2xl p-5 shadow-sm border border-green-mist/40 hover:shadow-md transition-all duration-300 ${
                      index === 1 ? "mt-8" : ""
                    } ${index === 3 ? "mt-8" : ""}`}
                  >
                    <div className="aspect-[3/4] bg-gradient-to-br from-green-mist to-green-pale rounded-xl mb-4 flex items-center justify-center">
                      <Award className="w-12 h-12 text-green-mid/30" />
                    </div>
                    <h4 className="font-display font-semibold text-green-deep text-sm mb-1 line-clamp-2">
                      {cert.name}
                    </h4>
                    <p className="text-xs text-ink/50">{cert.issuer}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Block */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        {/* Rich gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-deep via-green-mid to-green-bright" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "36px 36px",
          }}
        />

        {/* Organic shapes */}
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-earth/10 blur-3xl" />

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
              className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed"
            >
              Получите актуальный прайс-лист, образцы продукции и персональное
              коммерческое предложение в течение одного рабочего дня
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                size="lg"
                className="bg-white text-green-deep hover:bg-green-mist h-14 px-8 text-base font-semibold shadow-lg shadow-black/10"
                onClick={() => setIsContactOpen(true)}
              >
                Запросить прайс-лист
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              {/*<a href="tel:+78001234567">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/25 text-white hover:bg-white/10 h-14 px-8 text-base backdrop-blur-sm"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Позвонить
                </Button>
              </a>*/}
            </motion.div>
            <motion.p variants={fadeInUp} className="text-sm text-white/50">
              Или напишите нам в{" "}
              <a
                href="https://t.me/darkosmetik"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-white/80 transition-colors"
              >
                Telegram
              </a>{" "}
              или{" "}
              <a
                href="https://wa.me/78001234567"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-white/80 transition-colors"
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
