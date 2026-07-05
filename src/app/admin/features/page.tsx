"use client";

import { useEffect, useState } from "react";
import { PageHeader, Field, TextInput, TextArea, SelectInput, PrimaryButton, DangerButton } from "@/components/admin/Field";
import { ImageField } from "@/components/admin/ImageField";
import { ICON_NAMES, getIcon } from "@/lib/icon-map";
import { Plus, Trash2, Save } from "lucide-react";

type FeatureRow = {
  id?: string;
  icon: string;
  imageUrl: string;
  title: string;
  description: string;
  order: number;
};

export default function FeaturesPage() {
  const [items, setItems] = useState<FeatureRow[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => fetch("/api/features").then((r) => r.json()).then(setItems);

  useEffect(() => {
    load().then(() => setLoading(false));
  }, []);

  const addNew = () =>
    setItems((prev) => [
      ...prev,
      { icon: "Sparkles", imageUrl: "", title: "Fitur Baru", description: "", order: prev.length }
    ]);

  const update = (idx: number, patch: Partial<FeatureRow>) =>
    setItems((prev) => prev.map((it, i) => (i === idx ? { ...it, ...patch } : it)));

  const save = async (idx: number) => {
    const item = items[idx];
    if (item.id) {
      const res = await fetch(`/api/features/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item)
      });
      update(idx, await res.json());
    } else {
      const res = await fetch(`/api/features`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item)
      });
      update(idx, await res.json());
    }
  };

  const remove = async (idx: number) => {
    const item = items[idx];
    if (item.id) await fetch(`/api/features/${item.id}`, { method: "DELETE" });
    setItems((prev) => prev.filter((_, i) => i !== idx));
  };

  if (loading) return <p className="text-mist-muted text-sm">Memuat...</p>;

  return (
    <div>
      <PageHeader title="Fitur Server" description="Kelola card fitur yang tampil di halaman utama. Jumlah tidak dibatasi." />

      <div className="flex flex-col gap-5 max-w-2xl">
        {items.map((item, idx) => {
          const Icon = getIcon(item.icon);
          return (
            <div key={item.id || idx} className="slot p-5 flex flex-col gap-4">
              <div className="grid sm:grid-cols-2 gap-4 items-end">
                <Field label="Judul Fitur">
                  <TextInput value={item.title} onChange={(e) => update(idx, { title: e.target.value })} />
                </Field>
                <Field label="Icon">
                  <div className="flex items-center gap-2">
                    <div className="h-9 w-9 rounded-md bg-ink-300 flex items-center justify-center text-emerald-bright shrink-0">
                      <Icon size={16} />
                    </div>
                    <SelectInput value={item.icon} onChange={(e) => update(idx, { icon: e.target.value })}>
                      {ICON_NAMES.map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </SelectInput>
                  </div>
                </Field>
              </div>
              <Field label="Deskripsi">
                <TextArea value={item.description} onChange={(e) => update(idx, { description: e.target.value })} />
              </Field>
              <ImageField
                label="Gambar (opsional, menggantikan icon)"
                value={item.imageUrl || ""}
                onChange={(v) => update(idx, { imageUrl: v })}
              />
              <div className="flex justify-end gap-2">
                <PrimaryButton onClick={() => save(idx)} className="flex items-center gap-2">
                  <Save size={14} /> Simpan
                </PrimaryButton>
                <DangerButton onClick={() => remove(idx)}>
                  <Trash2 size={14} />
                </DangerButton>
              </div>
            </div>
          );
        })}

        <button
          onClick={addNew}
          className="slot p-4 flex items-center justify-center gap-2 text-sm text-mist-muted hover:text-emerald-bright"
        >
          <Plus size={16} /> Tambah Fitur
        </button>
      </div>
    </div>
  );
}
