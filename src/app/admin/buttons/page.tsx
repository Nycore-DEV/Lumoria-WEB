"use client";

import { useEffect, useState } from "react";
import { PageHeader, Field, TextInput, SelectInput, PrimaryButton, DangerButton } from "@/components/admin/Field";
import { Plus, Trash2, Save } from "lucide-react";

type ButtonRow = {
  id?: string;
  label: string;
  url: string;
  type: string;
  active: boolean;
  order: number;
};

const TYPES = [
  { value: "join", label: "Join Server" },
  { value: "discord", label: "Join Discord" },
  { value: "vote", label: "Vote Server" },
  { value: "custom", label: "Lainnya" }
];

export default function ButtonsPage() {
  const [items, setItems] = useState<ButtonRow[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => fetch("/api/buttons").then((r) => r.json()).then(setItems);

  useEffect(() => {
    load().then(() => setLoading(false));
  }, []);

  const addNew = () => {
    setItems((prev) => [...prev, { label: "Tombol Baru", url: "https://", type: "custom", active: true, order: prev.length }]);
  };

  const update = (idx: number, patch: Partial<ButtonRow>) => {
    setItems((prev) => prev.map((it, i) => (i === idx ? { ...it, ...patch } : it)));
  };

  const save = async (idx: number) => {
    const item = items[idx];
    if (item.id) {
      const res = await fetch(`/api/buttons/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item)
      });
      const updated = await res.json();
      update(idx, updated);
    } else {
      const res = await fetch(`/api/buttons`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item)
      });
      const created = await res.json();
      update(idx, created);
    }
  };

  const remove = async (idx: number) => {
    const item = items[idx];
    if (item.id) await fetch(`/api/buttons/${item.id}`, { method: "DELETE" });
    setItems((prev) => prev.filter((_, i) => i !== idx));
  };

  if (loading) return <p className="text-mist-muted text-sm">Memuat...</p>;

  return (
    <div>
      <PageHeader
        title="Pengaturan Tombol"
        description="Atur tombol Join Server, Join Discord, Vote Server, dan tombol lainnya di hero section."
      />

      <div className="flex flex-col gap-5 max-w-2xl">
        {items.map((item, idx) => (
          <div key={item.id || idx} className="slot p-5 flex flex-col gap-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Nama Tombol">
                <TextInput value={item.label} onChange={(e) => update(idx, { label: e.target.value })} />
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
            <Field label="Link Tujuan">
              <TextInput value={item.url} onChange={(e) => update(idx, { url: e.target.value })} placeholder="https://" />
            </Field>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-mist-muted">
                <input
                  type="checkbox"
                  checked={item.active}
                  onChange={(e) => update(idx, { active: e.target.checked })}
                  className="accent-emerald"
                />
                Aktifkan tombol ini
              </label>
              <div className="flex items-center gap-2">
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

        <button
          onClick={addNew}
          className="slot p-4 flex items-center justify-center gap-2 text-sm text-mist-muted hover:text-emerald-bright"
        >
          <Plus size={16} /> Tambah Tombol
        </button>
      </div>
    </div>
  );
}
