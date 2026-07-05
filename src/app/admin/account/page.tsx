"use client";

import { useState, FormEvent } from "react";
import { PageHeader, Field, TextInput, PrimaryButton } from "@/components/admin/Field";
import { Check } from "lucide-react";

export default function AccountPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSaved(false);

    const res = await fetch("/api/admin/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword, newPassword })
    });

    setSaving(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Gagal mengganti password.");
      return;
    }

    setCurrentPassword("");
    setNewPassword("");
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div>
      <PageHeader title="Akun Admin" description="Ganti password login panel admin." />

      <form onSubmit={onSubmit} className="flex flex-col gap-5 max-w-md">
        <Field label="Password Saat Ini">
          <TextInput
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </Field>
        <Field label="Password Baru" hint="Minimal 6 karakter.">
          <TextInput type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
        </Field>

        {error && <p className="text-sm text-redstone">{error}</p>}

        <div className="flex items-center gap-3">
          <PrimaryButton type="submit" disabled={saving}>
            {saving ? "Menyimpan..." : "Ganti Password"}
          </PrimaryButton>
          {saved && (
            <span className="flex items-center gap-1.5 text-sm text-emerald-bright">
              <Check size={16} /> Password diganti
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
