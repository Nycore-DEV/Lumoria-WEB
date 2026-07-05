"use client";

import { useEffect, useState } from "react";
import { PageHeader, Field, TextInput, TextArea, PrimaryButton, DangerButton } from "@/components/admin/Field";
import { ImageField } from "@/components/admin/ImageField";
import { Plus, Trash2, Save, ArrowUp, ArrowDown } from "lucide-react";

type StaffRow = {
  id?: string;
  gamertag: string;
  role: string;
  description: string;
  skinUrl: string;
  order: number;
};

export default function StaffPage() {
  const [items, setItems] = useState<StaffRow[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => fetch("/api/staff").then((r) => r.json()).then(setItems);

  useEffect(() => {
    load().then(() => setLoading(false));
  }, []);

  const addNew = () =>
    setItems((prev) => [
      ...prev,
      { gamertag: "Gamertag", role: "Jabatan", description: "", skinUrl: "", order: prev.length }
    ]);

  const update = (idx: number, patch: Partial<StaffRow>) =>
    setItems((prev) => prev.map((it, i) => (i === idx ? { ...it, ...patch } : it)));

  const save = async (idx: number) => {
    const item = items[idx];
    if (item.id) {
      const res = await fetch(`/api/staff/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item)
      });
      update(idx, await res.json());
    } else {
      const res = await fetch(`/api/staff`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item)
      });
      update(idx, await res.json());
    }
  };

  const remove = async (idx: number) => {
    const item = items[idx];
    if (item.id) await fetch(`/api/staff/${item.id}`, { method: "DELETE" });
    setItems((prev) => prev.filter((_, i) => i !== idx));
  };

  const move = (idx: number, dir: -1 | 1) => {
    setItems((prev) => {
      const next = [...prev];
      const target = idx + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[idx], next[target]] = [next[target], next[idx]];
      return next.map((it, i) => ({ ...it, order: i }));
    });
  };

  if (loading) return <p className="text-mist-muted text-sm">Memuat...</p>;

  return (
    <div>
      <PageHeader
        title="Staff &amp; Petinggi Server"
        description="Kelola daftar staff beserta foto skin Minecraft, gamertag, dan jabatan."
      />

      <div className="flex flex-col gap-5 max-w-2xl">
        {items.map((item, idx) => (
          <div key={item.id || idx} className="slot p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-mist-faint">Urutan #{idx + 1}</span>
              <div className="flex gap-1">
                <button onClick={() => move(idx, -1)} className="slot p-1.5 text-mist-muted hover:text-emerald-bright">
                  <ArrowUp size={14} />
                </button>
                <button onClick={() => move(idx, 1)} className="slot p-1.5 text-mist-muted hover:text-emerald-bright">
                  <ArrowDown size={14} />
                </button>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Gamertag">
                <TextInput value={item.gamertag} onChange={(e) => update(idx, { gamertag: e.target.value })} />
              </Field>
              <Field label="Jabatan">
                <TextInput value={item.role} onChange={(e) => update(idx, { role: e.target.value })} />
              </Field>
            </div>
            <Field label="Deskripsi Singkat (opsional)">
              <TextArea value={item.description || ""} onChange={(e) => update(idx, { description: e.target.value })} />
            </Field>
            <ImageField
              label="Foto Skin Minecraft"
              value={item.skinUrl || ""}
              onChange={(v) => update(idx, { skinUrl: v })}
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
        ))}

        <button
          onClick={addNew}
          className="slot p-4 flex items-center justify-center gap-2 text-sm text-mist-muted hover:text-emerald-bright"
        >
          <Plus size={16} /> Tambah Staff
        </button>
      </div>
    </div>
  );
}
