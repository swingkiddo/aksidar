"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle } from "lucide-react";
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

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const productOptions = [
  { value: "", label: "Выберите интересующую продукцию" },
  { value: "liquid-soap-canisters", label: "Жидкое мыло — канистры" },
  { value: "liquid-soap-cartridges", label: "Жидкое мыло — картриджи" },
  { value: "liquid-soap-bottles", label: "Жидкое мыло — бутылки" },
  { value: "household-chemicals", label: "Бытовая химия" },
  { value: "private-label", label: "Private label / Контрактное производство" },
  { value: "other", label: "Другое" },
];

interface ContactFormProps {
  defaultProduct?: string;
  onSubmitSuccess?: () => void;
  variant?: "dialog" | "page";
}

export function ContactForm({
  defaultProduct = "",
  onSubmitSuccess,
  variant = "page",
}: ContactFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      company: "",
      phone: "",
      email: "",
      productInterest: defaultProduct,
      message: "",
    },
  });

  useEffect(() => {
    if (defaultProduct) {
      reset((formValues: ContactFormData) => ({
        ...formValues,
        productInterest: defaultProduct,
      }));
    }
  }, [defaultProduct, reset]);

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Form submitted:", data);
    setIsSubmitting(false);
    setIsSubmitted(true);

    if (onSubmitSuccess) {
      setTimeout(() => {
        setIsSubmitted(false);
        reset();
        onSubmitSuccess();
      }, 3000);
    }
  };

  if (isSubmitted) {
    return (
      <div className={variant === "dialog" ? "py-8 flex flex-col items-center justify-center text-center" : "py-16 flex flex-col items-center justify-center text-center"}>
        <div className="w-16 h-16 rounded-full bg-green-mist flex items-center justify-center mb-4">
          <CheckCircle className="w-8 h-8 text-green-mid" />
        </div>
        <h3 className={cn(
          "font-display text-green-deep mb-2",
          variant === "dialog" ? "text-lg" : "text-xl"
        )}>
          Заявка отправлена
        </h3>
        <p className="text-ink/60">
          Наш менеджер свяжется с вами в течение рабочего дня
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn(
      "space-y-5",
      variant === "page" && "mt-6"
    )}>
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
          rows={variant === "dialog" ? 4 : 5}
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
        className={cn(
          "bg-green-mid hover:bg-green-deep text-white font-semibold",
          variant === "dialog" ? "w-full h-11" : "w-full h-12 text-base"
        )}
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
  );
}
