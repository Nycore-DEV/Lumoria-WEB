"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Users, MapPin, Gamepad2, Radio, Smartphone } from "lucide-react";

export function ServerInfoSection({
  ip,
  bedrockPort,
  version,
  gameMode,
  status,
  onlinePlayers,
  maxPlayers,
  location
}: {
  ip?: string | null;
  bedrockPort?: string | null;
  version?: string | null;
  gameMode?: string | null;
  status: string;
  onlinePlayers: number;
  maxPlayers: number;
  location?: string | null;
}) {
  const [copied, setCopied] = useState(false);

  const copyIp = async () => {
    if (!ip) return;
    try {
      await navigator.clipboard.writeText(ip);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard unavailable, ignore silently
    }
  };

  const stats = [
    { icon: Gamepad2, label: "Mode", value: gameMode || "-" },
    { icon: Users, label: "Pemain Online", value: `${onlinePlayers}/${maxPlayers}` },
    { icon: MapPin, label: "Lokasi", value: location || "-" },
    { icon: Radio, label: "Versi", value: version || "-" }
  ];

  return (
    <section id="info" className="py-24 md:py-32 bg-ink-50">
      <div className="container-px mx-auto max-w-5xl">
        <div className="text-center mb-14">
          <span className="text-xs font-display tracking-[0.3em] uppercase text-emerald mb-4 block">
            Cara Bergabung
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-mist">Informasi Server</h2>
        </div>

        <motion.button
          onClick={copyIp}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="slot w-full flex flex-col md:flex-row items-center justify-between gap-4 px-8 py-6 mb-8 group"
        >
          <div className="text-left">
            <div className="text-xs uppercase tracking-widest text-mist-faint mb-1">Java Edition IP</div>
            <div className="font-display font-bold text-2xl md:text-3xl text-mist">{ip || "-"}</div>
          </div>
          <div className="flex items-center gap-2 text-emerald-bright text-sm font-medium">
            {copied ? <Check size={18} /> : <Copy size={18} />}
            {copied ? "Tersalin!" : "Salin IP"}
          </div>
        </motion.button>

        {bedrockPort && (
          <div className="slot flex items-center gap-4 px-8 py-5 mb-10 text-mist-muted text-sm">
            <Smartphone size={20} className="text-gold" />
            Bedrock Edition &middot; Port <span className="text-mist font-semibold">{bedrockPort}</span>
          </div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="slot p-6 flex flex-col items-center text-center gap-3"
            >
              <s.icon size={20} className="text-emerald" />
              <div className="text-xs uppercase tracking-widest text-mist-faint">{s.label}</div>
              <div className="font-display font-semibold text-mist">{s.value}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
