"use client";

import { useRef, useState } from "react";
import { Upload, X } from "lucide-react";
import { fileToDataUrl, MAX_IMAGE_BYTES } from "@/lib/file-to-data-url";

export function ImageField({
  label,
  value,
  onChange
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File | undefined) => {
    setError(null);
    if (!file) return;
    if (file.size > MAX_IMAGE_BYTES) {
      setError(`Ukuran gambar maksimal ${Math.round(MAX_IMAGE_BYTES / 1024)}KB. Kompres gambar terlebih dahulu.`);
      return;
    }
    const dataUrl = await fileToDataUrl(file);
    onChange(dataUrl);
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm text-mist-muted">{label}</label>
      <div className="flex items-center gap-3">
        <div className="h-16 w-16 rounded-md bg-ink-300 border border-mist/10 overflow-hidden flex items-center justify-center shrink-0">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt={label} className="object-cover h-full w-full" />
          ) : (
            <Upload size={18} className="text-mist-faint" />
          )}
        </div>
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Tempel URL gambar, atau unggah file"
          className="flex-1 bg-ink-300 border border-mist/10 rounded-md px-3 py-2 text-sm text-mist placeholder:text-mist-faint focus:outline-none focus:border-emerald/50"
        />
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="slot px-3 py-2 text-xs text-mist-muted hover:text-emerald-bright shrink-0"
        >
          Unggah
        </button>
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            aria-label="Hapus gambar"
            className="slot px-2 py-2 text-mist-faint hover:text-redstone shrink-0"
          >
            <X size={14} />
          </button>
        )}
      </div>
      {error && <p className="text-xs text-redstone">{error}</p>}
    </div>
  );
}
