"use client";

import { motion } from "framer-motion";
import {
  Factory,
  Leaf,
  Award,
  Globe,
  Users,
  Truck,
  TrendingUp,
  Shield,
  HeartHandshake,
  Recycle,
  MapPin,
  Building2,
} from "lucide-react";
import { trustStats } from "@/lib/data";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const values = [
  {
    icon: Leaf,
    title: "Натуральные ингредиенты",
    description:
      "Используем только качественное сырье от проверенных поставщиков. Растительные экстракты, эфирные масла и гипоаллергенные компоненты.",
  },
  {
    icon: Recycle,
    title: "Ответственное производство",
    description:
      "Соблюдаем принципы green manufacturing: минимизация отходов, энергоэффективность, переработка упаковки.",
  },
  {
    icon: Shield,
    title: "Контроль качества",
    description:
      "Многоступенчатый контроль на всех этапах: от входящего сырья до готовой продукции. Собственная лаборатория.",
  },
  {
    icon: HeartHandshake,
    title: "Долгосрочные партнерства",
    description:
      "Ценим каждого клиента и стремимся к долгосрочному сотрудничеству. Гибкие условия, лояльность, поддержка.",
  },
];

const geography = [
  { city: "Москва и МО", type: "Штаб-квартира и производство", color: "bg-green-mid" },
  { city: "Санкт-Петербург", type: "Филиал и склад", color: "bg-green-bright" },

];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <div className="bg-green-mid text-white py-20 lg:py-28 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-green-deep/30 to-transparent" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-white/5" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 mb-6"
            >
              <Factory className="w-4 h-4" />
              <span className="text-sm font-medium">С 2009 года</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
            >
              Производитель, которому доверяют
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-lg text-white/80 leading-relaxed"
            >
              Дар Косметик — это производственная компания с полным циклом
              создания мыльной продукции и бытовой химии. Мы объединяем
              современные технологии с вниманием к деталям и ответственностью
              перед партнерами.
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Stats */}
      <section className="py-16 bg-white -mt-8 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-5 gap-8"
          >
            {trustStats.map((stat, index) => (
              <motion.div key={index} variants={fadeInUp} className="text-center">
                <p className="font-display text-3xl font-bold text-green-mid">
                  {stat.value}
                </p>
                <p className="text-sm text-ink/60 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6"
            >
              <motion.span
                variants={fadeInUp}
                className="text-green-mid font-medium text-sm uppercase tracking-wider"
              >
                Наша история
              </motion.span>
              <motion.h2
                variants={fadeInUp}
                className="font-display text-3xl font-bold text-green-deep"
              >
                От семейной мастерской до промышленного производства
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-ink/70 leading-relaxed">
                Компания была основана в 2009 году как небольшое производство
                натурального мыла. Сегодня это современный завод площадью
                5000 кв.м с автоматическими линиями розлива и упаковки.
              </motion.p>
              <motion.p variants={fadeInUp} className="text-ink/70 leading-relaxed">
                За 15 лет мы прошли путь от локального производителя до
                федерального поставщика с экспортом в страны СНГ. Наши
                продукты стоят на полках крупнейших торговых сетей и в
                номерах отелей класса deluxe.
              </motion.p>

              {/* Timeline */}
              <motion.div variants={fadeInUp} className="space-y-4 pt-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-mid flex items-center justify-center text-white font-bold">
                    2009
                  </div>
                  <div>
                    <p className="font-medium text-green-deep">Основание</p>
                    <p className="text-sm text-ink/60">Первые партии натурального мыла</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-mid flex items-center justify-center text-white font-bold">
                    2015
                  </div>
                  <div>
                    <p className="font-medium text-green-deep">Расширение</p>
                    <p className="text-sm text-ink/60">Запуск линии бытовой химии</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-mid flex items-center justify-center text-white font-bold">
                    2024
                  </div>
                  <div>
                    <p className="font-medium text-green-deep">Экспорт</p>
                    <p className="text-sm text-ink/60">Поставки в Казахстан и Беларусь</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Image/Visual */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-[4/3] bg-gradient-to-br from-green-mist to-green-pale rounded-2xl flex items-center justify-center">
                <div className="text-center p-8">
                  <Factory className="w-24 h-24 text-green-mid/30 mx-auto mb-4" />
                  <p className="font-display text-2xl text-green-deep">
                    Производственный комплекс
                  </p>
                  <p className="text-ink/60">5000 кв.м современных мощностей</p>
                </div>
              </div>

              {/* Floating stats */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-green-mist flex items-center justify-center">
                    <Users className="w-6 h-6 text-green-mid" />
                  </div>
                  <div>
                    <p className="text-2xl font-display font-bold text-green-deep">150+</p>
                    <p className="text-xs text-ink/60">Сотрудников</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute -top-6 -right-6 bg-white rounded-xl shadow-xl p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-green-mist flex items-center justify-center">
                    <Award className="w-6 h-6 text-green-mid" />
                  </div>
                  <div>
                    <p className="text-2xl font-display font-bold text-green-deep">5</p>
                    <p className="text-xs text-ink/60">Сертификатов</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-green-mid font-medium text-sm uppercase tracking-wider">
              Ценности
            </span>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold text-green-deep">
              Принципы нашей работы
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white rounded-2xl p-8 border border-green-mist/50 hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 rounded-xl bg-green-mist flex items-center justify-center mb-6">
                  <value.icon className="w-7 h-7 text-green-mid" />
                </div>
                <h3 className="font-display text-xl font-semibold text-green-deep mb-3">
                  {value.title}
                </h3>
                <p className="text-ink/60 text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Geography */}
      <section className="py-20 bg-green-pale">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6"
            >
              <motion.span
                variants={fadeInUp}
                className="text-green-mid font-medium text-sm uppercase tracking-wider"
              >
                География присутствия
              </motion.span>
              <motion.h2
                variants={fadeInUp}
                className="font-display text-3xl font-bold text-green-deep"
              >
                Логистика для вашего бизнеса
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-ink/70 leading-relaxed">
                Собственные склады в ключевых регионах России и партнерская
                сеть дистрибьюторов позволяют нам осуществлять поставки точно
                в срок. Доставляем в любую точку страны и стран СНГ.
              </motion.p>

              <motion.div variants={fadeInUp} className="space-y-3 pt-4">
                {geography.map((location, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-3 bg-white rounded-xl"
                  >
                    <div className={`w-3 h-3 rounded-full ${location.color}`} />
                    <div className="flex-1">
                      <p className="font-medium text-green-deep">{location.city}</p>
                      <p className="text-sm text-ink/60">{location.type}</p>
                    </div>
                    <MapPin className="w-4 h-4 text-ink/30" />
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Map Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-green-mist/50 to-cream rounded-2xl p-8 flex items-center justify-center">
                <div className="text-center">
                  <Globe className="w-32 h-32 text-green-mid/30 mx-auto mb-4" />
                  <p className="font-display text-2xl text-green-deep">
                    От Москвы до Алматы
                  </p>
                  <p className="text-ink/60">Полное покрытие России и СНГ</p>
                </div>
              </div>

              {/* Stats cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute bottom-6 left-6 right-6 bg-white rounded-xl shadow-lg p-6"
              >
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-display font-bold text-green-mid">3</p>
                    <p className="text-xs text-ink/60">Страны</p>
                  </div>
                  <div>
                    <p className="text-2xl font-display font-bold text-green-mid">6</p>
                    <p className="text-xs text-ink/60">Городов присутствия</p>
                  </div>
                  <div>
                    <p className="text-2xl font-display font-bold text-green-mid">5</p>
                    <p className="text-xs text-ink/60">Дней доставка</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-green-mid">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="font-display text-3xl font-bold text-white">
              Станьте нашим партнером
            </h2>
            <p className="text-lg text-white/80">
              Отправьте запрос и получите персональное коммерческое предложение
              с учетом ваших объемов и условий доставки
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contacts"
                className="inline-flex items-center justify-center h-14 px-8 bg-white text-green-deep rounded-lg font-medium hover:bg-green-pale transition-colors"
              >
                Связаться с нами
              </a>
              <a
                href="/catalog"
                className="inline-flex items-center justify-center h-14 px-8 border border-white/30 text-white rounded-lg font-medium hover:bg-white/10 transition-colors"
              >
                Смотреть каталог
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
