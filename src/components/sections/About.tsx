"use client";

import { motion } from "framer-motion";

export function About({ title, content }: { title?: string | null; content?: string | null }) {
  return (
    <section id="tentang" className="py-24 md:py-32 bg-ink-50 relative">
      <div className="container-px mx-auto max-w-4xl text-center">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs font-display tracking-[0.3em] uppercase text-emerald mb-4 block"
        >
          Kenali Kami
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-display font-bold text-3xl md:text-4xl text-mist mb-8"
        >
          {title || "Tentang Server"}
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-mist-muted leading-relaxed whitespace-pre-line text-base md:text-lg"
        >
          {content || "Ceritakan sejarah, konsep, dan keunggulan server di panel admin."}
        </motion.div>
      </div>
    </section>
  );
}
