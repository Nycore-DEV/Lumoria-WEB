"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Settings,
  MousePointerClick,
  Server,
  Sparkles,
  Users,
  Megaphone,
  HelpCircle,
  LogOut,
  ExternalLink,
  KeyRound
} from "lucide-react";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/settings", label: "Pengaturan Umum", icon: Settings },
  { href: "/admin/buttons", label: "Pengaturan Tombol", icon: MousePointerClick },
  { href: "/admin/server-info", label: "Info Server", icon: Server },
  { href: "/admin/features", label: "Fitur Server", icon: Sparkles },
  { href: "/admin/staff", label: "Staff", icon: Users },
  { href: "/admin/announcements", label: "Pengumuman", icon: Megaphone },
  { href: "/admin/faq", label: "FAQ", icon: HelpCircle },
  { href: "/admin/account", label: "Akun Admin", icon: KeyRound }
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <aside className="w-64 shrink-0 bg-ink-100 border-r border-mist/10 min-h-screen flex flex-col">
      <div className="px-6 py-6 border-b border-mist/10">
        <div className="font-display font-bold text-mist">Panel Admin</div>
        <div className="text-xs text-mist-faint mt-1">Kelola website server</div>
      </div>

      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {NAV.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors ${
                active ? "bg-emerald/10 text-emerald-bright" : "text-mist-muted hover:bg-ink-200 hover:text-mist"
              }`}
            >
              <item.icon size={16} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-mist/10 flex flex-col gap-1">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-mist-muted hover:bg-ink-200 hover:text-mist"
        >
          <ExternalLink size={16} />
          Lihat Website
        </a>
        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-mist-muted hover:bg-redstone/10 hover:text-redstone text-left"
        >
          <LogOut size={16} />
          Keluar
        </button>
      </div>
    </aside>
  );
}
