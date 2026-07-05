"use client";

import { motion } from "framer-motion";
import { getIcon } from "@/lib/icon-map";

type FeatureData = {
  id: string;
  icon?: string | null;
  imageUrl?: string | null;
  title: string;
  description: string;
};

export function Features({ features }: { features: FeatureData[] }) {
  if (features.length === 0) return null;

  return (
    <section id="fitur" className="py-24 md:py-32 bg-ink-100 relative">
      <div className="container-px mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <span className="text-xs font-display tracking-[0.3em] uppercase text-emerald mb-4 block">
            Apa Yang Ditawarkan
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-mist">Fitur Server</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => {
            const Icon = getIcon(f.icon);
            return (
              <motion.div
                key={f.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % 4) * 0.08 }}
                className="slot p-6 flex flex-col gap-4"
              >
                {f.imageUrl ? (
                  <div className="h-12 w-12 rounded-md overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={f.imageUrl} alt={f.title} className="object-cover h-full w-full" />
                  </div>
                ) : (
                  <div className="h-12 w-12 rounded-md bg-emerald/10 flex items-center justify-center text-emerald-bright">
                    <Icon size={22} />
                  </div>
                )}
                <h3 className="font-display font-semibold text-lg text-mist">{f.title}</h3>
                <p className="text-sm text-mist-muted leading-relaxed">{f.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
