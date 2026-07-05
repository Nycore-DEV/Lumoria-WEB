"use client";

import { useEffect, useState } from "react";
import { PageHeader, Field, TextInput, TextArea, PrimaryButton, DangerButton } from "@/components/admin/Field";
import { Plus, Trash2, Save } from "lucide-react";

type FaqRow = { id?: string; question: string; answer: string; order: number };

export default function FaqAdminPage() {
  const [items, setItems] = useState<FaqRow[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => fetch("/api/faq").then((r) => r.json()).then(setItems);

  useEffect(() => {
    load().then(() => setLoading(false));
  }, []);

  const addNew = () =>
    setItems((prev) => [...prev, { question: "Pertanyaan baru", answer: "", order: prev.length }]);

  const update = (idx: number, patch: Partial<FaqRow>) =>
    setItems((prev) => prev.map((it, i) => (i === idx ? { ...it, ...patch } : it)));

  const save = async (idx: number) => {
    const item = items[idx];
    if (item.id) {
      const res = await fetch(`/api/faq/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item)
      });
      update(idx, await res.json());
    } else {
      const res = await fetch(`/api/faq`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item)
      });
      update(idx, await res.json());
    }
  };

  const remove = async (idx: number) => {
    const item = items[idx];
    if (item.id) await fetch(`/api/faq/${item.id}`, { method: "DELETE" });
    setItems((prev) => prev.filter((_, i) => i !== idx));
  };

  if (loading) return <p className="text-mist-muted text-sm">Memuat...</p>;

  return (
    <div>
      <PageHeader title="FAQ" description="Kelola pertanyaan yang sering diajukan pemain." />

      <div className="flex flex-col gap-5 max-w-2xl">
        {items.map((item, idx) => (
          <div key={item.id || idx} className="slot p-5 flex flex-col gap-4">
            <Field label="Pertanyaan">
              <TextInput value={item.question} onChange={(e) => update(idx, { question: e.target.value })} />
            </Field>
            <Field label="Jawaban">
              <TextArea value={item.answer} onChange={(e) => update(idx, { answer: e.target.value })} />
            </Field>
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
          <Plus size={16} /> Tambah FAQ
        </button>
      </div>
    </div>
  );
}
