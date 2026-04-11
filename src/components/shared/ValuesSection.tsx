"use client";

import { motion } from "framer-motion";
import type { ElementType } from "react";
import {
  Factory,
  BadgeCheck,
  Truck,
  Handshake,
  Leaf,
  Recycle,
  Shield,
  HeartHandshake,
} from "lucide-react";
import type { USP } from "@/types";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const defaultIconMap: Record<string, ElementType> = {
  Factory,
  BadgeCheck,
  Truck,
  Handshake,
  Leaf,
  Recycle,
  Shield,
  HeartHandshake,
};

interface ValuesSectionProps {
  title: string;
  subtitle?: string;
  items: USP[];
  iconMap?: Record<string, ElementType>;
}

export function ValuesSection({
  title,
  subtitle,
  items,
  iconMap = defaultIconMap,
}: ValuesSectionProps) {
  return (
    <section className="py-24 lg:py-32 bg-green-deep relative overflow-hidden">
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
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.span
            variants={fadeInUp}
            className="text-green-light font-medium text-sm uppercase tracking-wider"
          >
            {subtitle}
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white"
          >
            {title}
          </motion.h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch"
        >
          {items.map((item, index) => {
            const Icon = iconMap[item.icon] || Factory;
            return (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="flex flex-col h-full bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 hover:border-white/15 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-green-bright/20 flex items-center justify-center mb-6 shrink-0">
                  <Icon className="w-7 h-7 text-green-light" />
                </div>

                <div className="flex flex-col flex-grow">
                  <h3 className="font-display text-xl font-semibold text-white mb-3 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
