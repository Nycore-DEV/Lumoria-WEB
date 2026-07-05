"use client";

import { motion } from "framer-motion";
import { CalendarClock, Wrench, Sparkles, Gift, Megaphone } from "lucide-react";

type AnnouncementData = { id: string; title: string; content: string; type: string; createdAt: string };

const TYPE_META: Record<string, { label: string; icon: any; color: string }> = {
  event: { label: "Event", icon: Sparkles, color: "text-emerald-bright" },
  maintenance: { label: "Maintenance", icon: Wrench, color: "text-redstone" },
  update: { label: "Update", icon: CalendarClock, color: "text-gold" },
  giveaway: { label: "Giveaway", icon: Gift, color: "text-gold" },
  info: { label: "Info", icon: Megaphone, color: "text-mist-muted" }
};

export function Announcements({ announcements }: { announcements: AnnouncementData[] }) {
  if (announcements.length === 0) return null;

  return (
    <section id="pengumuman" className="py-24 md:py-32 bg-ink-50">
      <div className="container-px mx-auto max-w-4xl">
        <div className="text-center mb-14">
          <span className="text-xs font-display tracking-[0.3em] uppercase text-emerald mb-4 block">
            Tetap Update
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-mist">Pengumuman</h2>
        </div>

        <div className="flex flex-col gap-4">
          {announcements.map((a, i) => {
            const meta = TYPE_META[a.type] || TYPE_META.info;
            const Icon = meta.icon;
            return (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="slot p-6 flex gap-4"
              >
                <div className={`shrink-0 h-10 w-10 rounded-md bg-ink-200 flex items-center justify-center ${meta.color}`}>
                  <Icon size={18} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1 flex-wrap">
                    <h3 className="font-display font-semibold text-mist">{a.title}</h3>
                    <span className={`text-[10px] uppercase tracking-widest ${meta.color}`}>{meta.label}</span>
                    <span className="text-[10px] text-mist-faint ml-auto">
                      {new Date(a.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                    </span>
                  </div>
                  <p className="text-sm text-mist-muted leading-relaxed whitespace-pre-line">{a.content}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
