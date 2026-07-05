"use client";

import { motion } from "framer-motion";
import { UserRound } from "lucide-react";

type StaffData = { id: string; gamertag: string; role: string; description?: string | null; skinUrl?: string | null };

export function Staff({ staff }: { staff: StaffData[] }) {
  if (staff.length === 0) return null;

  return (
    <section id="staff" className="py-24 md:py-32 bg-ink-100">
      <div className="container-px mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <span className="text-xs font-display tracking-[0.3em] uppercase text-emerald mb-4 block">
            Di Balik Layar
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-mist">Staff &amp; Petinggi Server</h2>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {staff.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 4) * 0.08 }}
              className="slot p-6 flex flex-col items-center text-center gap-3"
            >
              <div className="slot h-20 w-20 overflow-hidden flex items-center justify-center bg-ink-200">
                {s.skinUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={s.skinUrl} alt={s.gamertag} className="object-cover h-full w-full" />
                ) : (
                  <UserRound size={36} className="text-mist-faint" />
                )}
              </div>
              <div className="font-display font-semibold text-mist">{s.gamertag}</div>
              <div className="text-xs uppercase tracking-widest text-gold">{s.role}</div>
              {s.description && <p className="text-xs text-mist-muted leading-relaxed">{s.description}</p>}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
