"use client";

import { useEffect, useState } from "react";
import { PageHeader, Field, TextInput, TextArea, PrimaryButton } from "@/components/admin/Field";
import { ImageField } from "@/components/admin/ImageField";
import { Check } from "lucide-react";

const EMPTY = {
  serverName: "",
  tagline: "",
  logoUrl: "",
  faviconUrl: "",
  bannerUrl: "",
  backgroundUrl: "",
  themeColor: "#2FBF71",
  heroTitle: "",
  heroSubtitle: "",
  aboutTitle: "",
  aboutContent: "",
  footerText: "",
  discordUrl: "",
  twitterUrl: "",
  instagramUrl: "",
  youtubeUrl: "",
  tiktokUrl: "",
  contactEmail: ""
};

export default function SettingsPage() {
  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => {
        setForm({ ...EMPTY, ...data });
        setLoading(false);
      });
  }, []);

  const set = (key: keyof typeof EMPTY) => (v: string) => setForm((f) => ({ ...f, [key]: v }));

  const save = async () => {
    setSaving(true);
    setSaved(false);
    await fetch("/api/settings", {
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
      <PageHeader
        title="Pengaturan Umum"
        description="Kelola identitas website, konten halaman, dan tautan sosial media."
      />

      <div className="flex flex-col gap-10 max-w-2xl">
        <section className="flex flex-col gap-5">
          <h2 className="font-display font-semibold text-mist border-b border-mist/10 pb-2">Identitas Server</h2>
          <Field label="Nama Server">
            <TextInput value={form.serverName} onChange={(e) => set("serverName")(e.target.value)} />
          </Field>
          <Field label="Tagline / Deskripsi Singkat">
            <TextInput value={form.tagline || ""} onChange={(e) => set("tagline")(e.target.value)} />
          </Field>
          <ImageField label="Logo" value={form.logoUrl || ""} onChange={set("logoUrl")} />
          <ImageField label="Favicon" value={form.faviconUrl || ""} onChange={set("faviconUrl")} />
          <ImageField label="Banner" value={form.bannerUrl || ""} onChange={set("bannerUrl")} />
          <ImageField label="Background Hero" value={form.backgroundUrl || ""} onChange={set("backgroundUrl")} />
          <Field label="Warna Tema" hint="Digunakan sebagai warna aksen utama (format hex, contoh #2FBF71)">
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={form.themeColor}
                onChange={(e) => set("themeColor")(e.target.value)}
                className="h-10 w-14 bg-transparent rounded-md border border-mist/10"
              />
              <TextInput value={form.themeColor} onChange={(e) => set("themeColor")(e.target.value)} />
            </div>
          </Field>
        </section>

        <section className="flex flex-col gap-5">
          <h2 className="font-display font-semibold text-mist border-b border-mist/10 pb-2">Hero Section</h2>
          <Field label="Judul Hero">
            <TextInput value={form.heroTitle || ""} onChange={(e) => set("heroTitle")(e.target.value)} />
          </Field>
          <Field label="Sub-judul Hero">
            <TextArea value={form.heroSubtitle || ""} onChange={(e) => set("heroSubtitle")(e.target.value)} />
          </Field>
        </section>

        <section className="flex flex-col gap-5">
          <h2 className="font-display font-semibold text-mist border-b border-mist/10 pb-2">Tentang Server</h2>
          <Field label="Judul Section">
            <TextInput value={form.aboutTitle || ""} onChange={(e) => set("aboutTitle")(e.target.value)} />
          </Field>
          <Field label="Isi Tentang Server" hint="Sejarah, konsep, keunggulan, dan alasan bergabung.">
            <TextArea
              value={form.aboutContent || ""}
              onChange={(e) => set("aboutContent")(e.target.value)}
              className="min-h-[220px]"
            />
          </Field>
        </section>

        <section className="flex flex-col gap-5">
          <h2 className="font-display font-semibold text-mist border-b border-mist/10 pb-2">Footer &amp; Sosial Media</h2>
          <Field label="Teks Footer">
            <TextArea value={form.footerText || ""} onChange={(e) => set("footerText")(e.target.value)} />
          </Field>
          <Field label="Link Discord">
            <TextInput value={form.discordUrl || ""} onChange={(e) => set("discordUrl")(e.target.value)} placeholder="https://discord.gg/..." />
          </Field>
          <Field label="Link Twitter/X">
            <TextInput value={form.twitterUrl || ""} onChange={(e) => set("twitterUrl")(e.target.value)} />
          </Field>
          <Field label="Link Instagram">
            <TextInput value={form.instagramUrl || ""} onChange={(e) => set("instagramUrl")(e.target.value)} />
          </Field>
          <Field label="Link YouTube">
            <TextInput value={form.youtubeUrl || ""} onChange={(e) => set("youtubeUrl")(e.target.value)} />
          </Field>
          <Field label="Link TikTok">
            <TextInput value={form.tiktokUrl || ""} onChange={(e) => set("tiktokUrl")(e.target.value)} />
          </Field>
          <Field label="Email Kontak">
            <TextInput value={form.contactEmail || ""} onChange={(e) => set("contactEmail")(e.target.value)} />
          </Field>
        </section>

        <div className="flex items-center gap-3 sticky bottom-6">
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
