"use client";

import { usePathname } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isBare = pathname === "/admin/login" || pathname === "/admin/setup";

  if (isBare) {
    return <div className="min-h-screen bg-ink-50">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-ink-50 flex">
      <AdminSidebar />
      <main className="flex-1 min-w-0 px-8 py-10 max-w-5xl">{children}</main>
    </div>
  );
}
