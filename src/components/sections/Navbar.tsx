"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const LINKS = [
  { href: "#tentang", label: "Tentang" },
  { href: "#fitur", label: "Fitur" },
  { href: "#info", label: "Info Server" },
  { href: "#staff", label: "Staff" },
  { href: "#pengumuman", label: "Pengumuman" },
  { href: "#faq", label: "FAQ" }
];

export function Navbar({ serverName, logoUrl }: { serverName: string; logoUrl?: string | null }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-ink-50/90 backdrop-blur-md border-b border-emerald/10" : "bg-transparent"
      }`}
    >
      <nav className="container-px mx-auto max-w-7xl flex items-center justify-between h-20">
        <a href="#top" className="flex items-center gap-3">
          {logoUrl ? (
            <div className="slot h-10 w-10 overflow-hidden flex-shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logoUrl} alt={serverName} className="object-cover h-full w-full" />
            </div>
          ) : (
            <div className="slot h-10 w-10 flex items-center justify-center text-emerald font-pixel text-[10px]">
              {serverName.slice(0, 2).toUpperCase()}
            </div>
          )}
          <span className="font-display font-bold text-lg tracking-tight text-mist">{serverName}</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-mist-muted hover:text-emerald-bright transition-colors font-medium"
            >
              {l.label}
            </a>
          ))}
        </div>

        <button
          className="md:hidden text-mist"
          onClick={() => setOpen((v) => !v)}
          aria-label="Buka menu navigasi"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-ink-100 border-t border-emerald/10 px-6 py-4 flex flex-col gap-4">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-sm text-mist-muted hover:text-emerald-bright transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
