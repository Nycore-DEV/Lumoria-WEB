import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/admin/Field";
import {
  MousePointerClick,
  Sparkles,
  Users,
  Megaphone,
  HelpCircle,
  Server,
  Circle
} from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [settings, serverInfo, buttons, features, staff, announcements, faq] = await Promise.all([
    prisma.settings.upsert({ where: { id: 1 }, update: {}, create: { id: 1 } }),
    prisma.serverInfo.upsert({ where: { id: 1 }, update: {}, create: { id: 1 } }),
    prisma.actionButton.count(),
    prisma.feature.count(),
    prisma.staffMember.count(),
    prisma.announcement.count(),
    prisma.faqItem.count()
  ]);

  const cards = [
    { label: "Tombol Aktif", value: buttons, icon: MousePointerClick, href: "/admin/buttons" },
    { label: "Fitur Server", value: features, icon: Sparkles, href: "/admin/features" },
    { label: "Staff", value: staff, icon: Users, href: "/admin/staff" },
    { label: "Pengumuman", value: announcements, icon: Megaphone, href: "/admin/announcements" },
    { label: "FAQ", value: faq, icon: HelpCircle, href: "/admin/faq" }
  ];

  return (
    <div>
      <PageHeader
        title={`Halo, selamat datang kembali`}
        description={`Ringkasan website ${settings.serverName} saat ini.`}
      />

      <div className="slot p-6 mb-8 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <Server size={20} className="text-emerald" />
          <div>
            <div className="text-xs uppercase tracking-widest text-mist-faint">Status Server</div>
            <div className="font-display font-semibold text-mist capitalize">{serverInfo.status}</div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-mist-muted">
          <Circle size={8} className="fill-emerald text-emerald" />
          IP: <span className="text-mist">{serverInfo.ip || "-"}</span>
        </div>
        <Link href="/admin/server-info" className="text-sm text-emerald-bright hover:underline">
          Ubah info server &rarr;
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {cards.map((c) => (
          <Link key={c.label} href={c.href} className="slot p-6 flex flex-col gap-3">
            <c.icon size={20} className="text-emerald" />
            <div className="font-display font-bold text-2xl text-mist">{c.value}</div>
            <div className="text-sm text-mist-muted">{c.label}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
