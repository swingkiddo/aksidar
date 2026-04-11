"use client";

import { motion } from "framer-motion";
import type { ElementType } from "react";

export function USPCard({
  title,
  description,
  Icon,
  fadeInUp,
}: {
  title: string;
  description: string;
  Icon: ElementType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fadeInUp?: any;
}) {
  return (
    <motion.div
      variants={fadeInUp}
      className="flex flex-col h-full bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 hover:border-white/15 transition-all duration-300"
    >
      <div className="w-14 h-14 rounded-xl bg-green-bright/20 flex items-center justify-center mb-6 shrink-0">
        <Icon className="w-7 h-7 text-green-light" />
      </div>

      <div className="flex flex-col flex-grow">
        <h3 className="font-display text-2xl font-semibold text-white mb-4 leading-tight min-h-[4rem]">
          {title}
        </h3>
        
        <p className="text-white/60 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}