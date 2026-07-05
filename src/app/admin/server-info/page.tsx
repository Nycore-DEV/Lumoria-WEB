"use client";

import { useEffect, useState } from "react";
import { PageHeader, Field, TextInput, SelectInput, TextArea, PrimaryButton } from "@/components/admin/Field";
import { Check } from "lucide-react";

const EMPTY = {
  ip: "",
  bedrockPort: "",
  version: "",
  gameMode: "",
  status: "online",
  onlinePlayers: 0,
  maxPlayers: 200,
  location: "",
  extra: ""
};

export default function ServerInfoPage() {
  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/server-info")
      .then((r) => r.json())
      .then((data) => {
        setForm({ ...EMPTY, ...data });
        setLoading(false);
      });
  }, []);

  const set = (key: keyof typeof EMPTY) => (v: string | number) => setForm((f) => ({ ...f, [key]: v }));

  const save = async () => {
    setSaving(true);
    setSaved(false);
    await fetch("/api/server-info", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (loading) return <p className="text-mist-muted text-sm">Memuat...</p>;

  return (
    <div>
      <PageHeader title="Informasi Server" description="Detail koneksi dan status server yang tampil di halaman utama." />

      <div className="flex flex-col gap-5 max-w-xl">
        <Field label="IP Server (Java Edition)">
          <TextInput value={form.ip || ""} onChange={(e) => set("ip")(e.target.value)} placeholder="play.example.net" />
        </Field>
        <Field label="Bedrock Port" hint="Kosongkan jika tidak mendukung Bedrock Edition">
          <TextInput value={form.bedrockPort || ""} onChange={(e) => set("bedrockPort")(e.target.value)} placeholder="19132" />
        </Field>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Versi Minecraft">
            <TextInput value={form.version || ""} onChange={(e) => set("version")(e.target.value)} placeholder="1.21.x" />
          </Field>
          <Field label="Mode Permainan">
            <TextInput value={form.gameMode || ""} onChange={(e) => set("gameMode")(e.target.value)} placeholder="Survival" />
          </Field>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Status Server">
            <SelectInput value={form.status} onChange={(e) => set("status")(e.target.value)}>
              <option value="online">Online</option>
              <option value="offline">Offline</option>
              <option value="maintenance">Maintenance</option>
            </SelectInput>
          </Field>
          <Field label="Lokasi Server">
            <TextInput value={form.location || ""} onChange={(e) => set("location")(e.target.value)} placeholder="Singapore" />
          </Field>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Pemain Online">
            <TextInput
              type="number"
              value={form.onlinePlayers}
              onChange={(e) => set("onlinePlayers")(Number(e.target.value))}
            />
          </Field>
          <Field label="Maksimal Pemain">
            <TextInput
              type="number"
              value={form.maxPlayers}
              onChange={(e) => set("maxPlayers")(Number(e.target.value))}
            />
          </Field>
        </div>
        <Field label="Informasi Tambahan" hint="Opsional, misalnya catatan whitelist atau info lainnya.">
          <TextArea value={form.extra || ""} onChange={(e) => set("extra")(e.target.value)} />
        </Field>

        <div className="flex items-center gap-3">
          <PrimaryButton onClick={save} disabled={saving}>
            {saving ? "Menyimpan..." : "Simpan Perubahan"}
          </PrimaryButton>
          {saved && (
            <span className="flex items-center gap-1.5 text-sm text-emerald-bright">
              <Check size={16} /> Tersimpan
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
