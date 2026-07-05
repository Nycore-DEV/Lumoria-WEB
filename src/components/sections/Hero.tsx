"use client";

import { motion } from "framer-motion";
import { Play, MessageCircle, ArrowUpRight } from "lucide-react";
import { SlotButton } from "@/components/ui/SlotButton";

type ButtonData = { id: string; label: string; url: string; type: string; active: boolean };

export function Hero({
  serverName,
  tagline,
  heroTitle,
  heroSubtitle,
  backgroundUrl,
  logoUrl,
  buttons,
  status
}: {
  serverName: string;
  tagline?: string | null;
  heroTitle?: string | null;
  heroSubtitle?: string | null;
  backgroundUrl?: string | null;
  logoUrl?: string | null;
  buttons: ButtonData[];
  status: string;
}) {
  const iconFor = (type: string) => {
    if (type === "discord") return <MessageCircle size={18} />;
    if (type === "join") return <Play size={18} />;
    return <ArrowUpRight size={18} />;
  };

  const variantFor = (type: string): "primary" | "gold" | "ghost" => {
    if (type === "join") return "primary";
    if (type === "vote") return "gold";
    return "ghost";
  };

  return (
    <section id="top" className="relative min-h-screen flex items-center overflow-hidden bg-grid-glow">
      <div className="absolute inset-0 -z-10">
        {backgroundUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={backgroundUrl} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-ink-200 via-ink-50 to-ink-50" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-50 via-transparent to-ink-50/60" />
      </div>

      <div className="container-px mx-auto max-w-7xl w-full pt-28 pb-20 grid md:grid-cols-[auto_1fr] gap-10 items-center">
        {logoUrl && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="hidden md:flex slot h-28 w-28 items-center justify-center animate-float overflow-hidden"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logoUrl} alt={serverName} className="object-cover h-full w-full" />
          </motion.div>
        )}

        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 mb-5"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
                  status === "online" ? "bg-emerald" : "bg-redstone"
                } opacity-60`}
              />
              <span
                className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                  status === "online" ? "bg-emerald" : "bg-redstone"
                }`}
              />
            </span>
            <span className="text-xs font-display tracking-[0.2em] uppercase text-mist-muted">
              Server {status === "online" ? "Online" : status === "maintenance" ? "Maintenance" : "Offline"} &middot; {serverName}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-extrabold text-4xl md:text-6xl leading-[1.05] tracking-tight text-mist mb-6 max-w-3xl"
          >
            {heroTitle || `Selamat Datang di ${serverName}`}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-mist-muted text-base md:text-lg max-w-xl mb-4"
          >
            {tagline}
          </motion.p>

          {heroSubtitle && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-mist-faint text-sm md:text-base max-w-xl mb-8"
            >
              {heroSubtitle}
            </motion.p>
          )}

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            {buttons
              .filter((b) => b.active)
              .map((b) => (
                <SlotButton key={b.id} href={b.url} variant={variantFor(b.type)} icon={iconFor(b.type)}>
                  {b.label}
                </SlotButton>
              ))}
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 terrain-divider" />
    </section>
  );
}
