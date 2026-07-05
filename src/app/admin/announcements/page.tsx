"use client";

import { useEffect, useState } from "react";
import { PageHeader, Field, TextInput, TextArea, SelectInput, PrimaryButton, DangerButton } from "@/components/admin/Field";
import { Plus, Trash2, Save } from "lucide-react";

type AnnouncementRow = {
  id?: string;
  title: string;
  content: string;
  type: string;
  published: boolean;
};

const TYPES = [
  { value: "event", label: "Event" },
  { value: "maintenance", label: "Maintenance" },
  { value: "update", label: "Update" },
  { value: "giveaway", label: "Giveaway" },
  { value: "info", label: "Informasi Umum" }
];

export default function AnnouncementsPage() {
  const [items, setItems] = useState<AnnouncementRow[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => fetch("/api/announcements").then((r) => r.json()).then(setItems);

  useEffect(() => {
    load().then(() => setLoading(false));
  }, []);

  const addNew = () =>
    setItems((prev) => [{ title: "Pengumuman Baru", content: "", type: "info", published: true }, ...prev]);

  const update = (idx: number, patch: Partial<AnnouncementRow>) =>
    setItems((prev) => prev.map((it, i) => (i === idx ? { ...it, ...patch } : it)));

  const save = async (idx: number) => {
    const item = items[idx];
    if (item.id) {
      const res = await fetch(`/api/announcements/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item)
      });
      update(idx, await res.json());
    } else {
      const res = await fetch(`/api/announcements`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item)
      });
      update(idx, await res.json());
    }
  };

  const remove = async (idx: number) => {
    const item = items[idx];
    if (item.id) await fetch(`/api/announcements/${item.id}`, { method: "DELETE" });
    setItems((prev) => prev.filter((_, i) => i !== idx));
  };

  if (loading) return <p className="text-mist-muted text-sm">Memuat...</p>;

  return (
    <div>
      <PageHeader
        title="Pengumuman"
        description="Kelola pengumuman event, maintenance, update, giveaway, dan info penting lainnya."
      />

      <div className="flex flex-col gap-5 max-w-2xl">
        <button
          onClick={addNew}
          className="slot p-4 flex items-center justify-center gap-2 text-sm text-mist-muted hover:text-emerald-bright"
        >
          <Plus size={16} /> Tambah Pengumuman
        </button>

        {items.map((item, idx) => (
          <div key={item.id || idx} className="slot p-5 flex flex-col gap-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Judul">
                <TextInput value={item.title} onChange={(e) => update(idx, { title: e.target.value })} />
              </Field>
              <Field label="Tipe">
                <SelectInput value={item.type} onChange={(e) => update(idx, { type: e.target.value })}>
                  {TYPES.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </SelectInput>
              </Field>
            </div>
            <Field label="Isi Pengumuman">
              <TextArea value={item.content} onChange={(e) => update(idx, { content: e.target.value })} />
            </Field>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-mist-muted">
                <input
                  type="checkbox"
                  checked={item.published}
                  onChange={(e) => update(idx, { published: e.target.checked })}
                  className="accent-emerald"
                />
                Tampilkan di website
              </label>
              <div className="flex gap-2">
                <PrimaryButton onClick={() => save(idx)} className="flex items-center gap-2">
                  <Save size={14} /> Simpan
                </PrimaryButton>
                <DangerButton onClick={() => remove(idx)}>
                  <Trash2 size={14} />
                </DangerButton>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
