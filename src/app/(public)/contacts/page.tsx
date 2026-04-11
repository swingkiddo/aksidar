"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import {
  Send,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const contactFormSchema = z.object({
  name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
  company: z.string().optional(),
  phone: z.string().min(10, "Введите корректный номер телефона"),
  email: z.string().email("Введите корректный email"),
  productInterest: z.string().optional(),
  message: z.string().min(10, "Сообщение должно содержать минимум 10 символов"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const productOptions = [
  { value: "", label: "Выберите интересующую продукцию" },
  { value: "liquid-soap-canisters", label: "Жидкое мыло — канистры" },
  { value: "liquid-soap-cartridges", label: "Жидкое мыло — картриджи" },
  { value: "liquid-soap-bottles", label: "Жидкое мыло — бутылки" },
  { value: "household-chemicals", label: "Бытовая химия" },
  { value: "private-label", label: "Private label / Контрактное производство" },
  { value: "other", label: "Другое" },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Дар Косметик",
  image: "/og-image.jpg",
  address: {
    "@type": "PostalAddress",
    streetAddress: "ул. Производственная, 15",
    addressLocality: "Москва",
    addressCountry: "RU",
  },
  telephone: "+7-800-123-45-67",
  email: "info@darkosmetik.ru",
  url: "https://darkosmetik.ru",
  openingHours: ["Mo-Fr 09:00-18:00"],
  priceRange: "₽₽",
};

export default function ContactsPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Form submitted:", data);
    setIsSubmitting(false);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      reset();
    }, 3000);
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

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
            Контакты
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-lg text-white/60 max-w-2xl"
          >
            Свяжитесь с нами любым удобным способом — мы ответим в течение
            рабочего дня
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Contact Info Cards */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-5"
          >
            <motion.div
              variants={fadeInUp}
              className="bg-white rounded-2xl p-6 border border-green-mist/30 hover:shadow-lg hover:shadow-green-deep/5 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-mist flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-green-mid" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-green-deep mb-1">
                    Телефон
                  </h3>
                  <a
                    href="tel:+78001234567"
                    className="text-lg font-medium text-ink hover:text-green-mid transition-colors"
                  >
                    8 (800) 123-45-67
                  </a>
                  <p className="text-sm text-ink/50 mt-1">
                    Бесплатно по России
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-white rounded-2xl p-6 border border-green-mist/30 hover:shadow-lg hover:shadow-green-deep/5 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-mist flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-green-mid" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-green-deep mb-1">
                    Email
                  </h3>
                  <a
                    href="mailto:info@darkosmetik.ru"
                    className="text-lg font-medium text-ink hover:text-green-mid transition-colors"
                  >
                    info@darkosmetik.ru
                  </a>
                  <p className="text-sm text-ink/50 mt-1">
                    Ответим в течение дня
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-white rounded-2xl p-6 border border-green-mist/30 hover:shadow-lg hover:shadow-green-deep/5 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-mist flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-green-mid" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-green-deep mb-1">
                    Режим работы
                  </h3>
                  <p className="text-ink-soft">Пн–Пт: 9:00–18:00</p>
                  <p className="text-sm text-ink/50">Сб–Вс: выходной</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-white rounded-2xl p-6 border border-green-mist/30 hover:shadow-lg hover:shadow-green-deep/5 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-mist flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-green-mid" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-green-deep mb-1">
                    Адрес офиса
                  </h3>
                  <p className="text-ink-soft">г. Москва, ул. Производственная, 15</p>
                  <p className="text-sm text-ink/50">БЦ «Современник», офис 305</p>
                </div>
              </div>
            </motion.div>

            {/* Messenger Links */}
            <motion.div
              variants={fadeInUp}
              className="bg-gradient-to-br from-green-pale to-cream-dark rounded-2xl p-6 border border-green-mist/30"
            >
              <h3 className="font-display font-semibold text-green-deep mb-4">
                Или напишите нам в мессенджер
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href="https://wa.me/78001234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-3.5 rounded-xl bg-[#25D366] text-white font-medium hover:opacity-90 transition-opacity shadow-md shadow-[#25D366]/20"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" />
                  </svg>
                  WhatsApp
                </a>
                <a
                  href="https://t.me/darkosmetik"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-3.5 rounded-xl bg-[#0088cc] text-white font-medium hover:opacity-90 transition-opacity shadow-md shadow-[#0088cc]/20"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                  </svg>
                  Telegram
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <motion.div
              variants={fadeInUp}
              className="bg-white rounded-2xl p-8 border border-green-mist/30 shadow-sm"
            >
              <h2 className="font-display text-2xl font-bold text-green-deep mb-8">
                Отправить запрос
              </h2>

              {isSubmitted ? (
                <div className="py-16 flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 rounded-full bg-green-mist flex items-center justify-center mb-6">
                    <CheckCircle className="w-10 h-10 text-green-mid" />
                  </div>
                  <h3 className="font-display text-2xl text-green-deep mb-2">
                    Заявка отправлена
                  </h3>
                  <p className="text-ink/60">
                    Наш менеджер свяжется с вами в течение рабочего дня
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="name">
                        Имя <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="name"
                        placeholder="Ваше имя"
                        {...register("name")}
                        className={cn(errors.name && "border-red-500")}
                      />
                      {errors.name && (
                        <p className="text-xs text-red-500">{errors.name.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company">Компания</Label>
                      <Input
                        id="company"
                        placeholder="Название компании"
                        {...register("company")}
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="phone">
                        Телефон <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+7 (___) ___-__-__"
                        {...register("phone")}
                        className={cn(errors.phone && "border-red-500")}
                      />
                      {errors.phone && (
                        <p className="text-xs text-red-500">{errors.phone.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">
                        Email <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="email@company.ru"
                        {...register("email")}
                        className={cn(errors.email && "border-red-500")}
                      />
                      {errors.email && (
                        <p className="text-xs text-red-500">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="productInterest">Интересующая продукция</Label>
                    <select
                      id="productInterest"
                      {...register("productInterest")}
                      className="w-full h-11 px-4 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-input transition-colors"
                    >
                      {productOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">
                      Сообщение <span className="text-red-500">*</span>
                    </Label>
                    <textarea
                      id="message"
                      rows={5}
                      placeholder="Расскажите о вашем запросе, объемах, сроках..."
                      {...register("message")}
                      className={cn(
                        "w-full px-4 py-3 rounded-lg border bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-input transition-colors",
                        errors.message ? "border-red-500" : "border-input"
                      )}
                    />
                    {errors.message && (
                      <p className="text-xs text-red-500">{errors.message.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-green-mid hover:bg-green-deep text-white h-12 text-base font-semibold"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="mr-2">Отправка</span>
                        <span className="animate-spin">⟳</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Отправить запрос
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    Нажимая кнопку, вы соглашаетесь с{" "}
                    <a href="/privacy" className="underline hover:text-foreground">
                      политикой конфиденциальности
                    </a>
                  </p>
                </form>
              )}
            </motion.div>
          </motion.div>
        </div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="bg-gradient-to-br from-green-mist/60 to-cream-dark rounded-3xl p-10 md:p-20 flex flex-col items-center justify-center text-center min-h-[300px] border border-green-mist/30">
            <div className="w-20 h-20 rounded-2xl bg-green-mid/10 flex items-center justify-center mb-6">
              <MapPin className="w-10 h-10 text-green-mid/50" />
            </div>
            <h3 className="font-display text-2xl font-semibold text-green-deep mb-2">
              Мы на карте
            </h3>
            <p className="text-ink/50 mb-6 max-w-md">
              г. Москва, ул. Производственная, 15, БЦ «Современник»
            </p>
            <a
              href="https://yandex.ru/maps/-/CDXm6Q~5"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-green-mid text-white rounded-xl hover:bg-green-deep transition-colors font-medium shadow-md shadow-green-deep/10"
            >
              <MapPin className="w-4 h-4" />
              Открыть в Яндекс Картах
            </a>
            <p className="text-sm text-ink/40 mt-6">
              (Встроенная карта будет здесь при подключении API ключа)
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
}
