"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

type FaqData = { id: string; question: string; answer: string };

export function Faq({ items }: { items: FaqData[] }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  if (items.length === 0) return null;

  return (
    <section id="faq" className="py-24 md:py-32 bg-ink-100">
      <div className="container-px mx-auto max-w-3xl">
        <div className="text-center mb-14">
          <span className="text-xs font-display tracking-[0.3em] uppercase text-emerald mb-4 block">
            Punya Pertanyaan?
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-mist">FAQ</h2>
        </div>

        <div className="flex flex-col gap-3">
          {items.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div key={item.id} className="slot overflow-hidden">
                <button
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-display font-medium text-mist">{item.question}</span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-emerald transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-sm text-mist-muted leading-relaxed">{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
