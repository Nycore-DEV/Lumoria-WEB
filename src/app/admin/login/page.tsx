"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import { TextInput } from "@/components/admin/Field";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    fetch("/api/admin/setup")
      .then((r) => r.json())
      .then((data) => {
        if (data.needsSetup) {
          router.replace("/admin/setup");
          return;
        }
        setChecking(false);
      });
  }, [router]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Gagal masuk.");
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-mist-muted text-sm">Memuat...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-grid-glow">
      <form onSubmit={onSubmit} className="slot w-full max-w-sm p-8 flex flex-col gap-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 rounded-md bg-emerald/10 flex items-center justify-center text-emerald-bright">
            <Lock size={18} />
          </div>
          <div>
            <div className="font-display font-bold text-mist">Panel Admin</div>
            <div className="text-xs text-mist-faint">Masuk untuk mengelola website</div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-mist-muted">Username</label>
          <TextInput value={username} onChange={(e) => setUsername(e.target.value)} required autoFocus />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-mist-muted">Password</label>
          <TextInput type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>

        {error && <p className="text-sm text-redstone">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="slot px-5 py-2.5 text-sm font-semibold text-emerald-bright bg-emerald/10 hover:bg-emerald/20 disabled:opacity-50 mt-2"
        >
          {loading ? "Memproses..." : "Masuk"}
        </button>
      </form>
    </div>
  );
}
