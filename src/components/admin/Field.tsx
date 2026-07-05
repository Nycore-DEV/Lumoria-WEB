"use client";

import { ReactNode } from "react";

export function Field({ label, children, hint }: { label: string; children: ReactNode; hint?: string }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm text-mist-muted">{label}</label>
      {children}
      {hint && <p className="text-xs text-mist-faint">{hint}</p>}
    </div>
  );
}

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`bg-ink-300 border border-mist/10 rounded-md px-3 py-2 text-sm text-mist placeholder:text-mist-faint focus:outline-none focus:border-emerald/50 ${
        props.className || ""
      }`}
    />
  );
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`bg-ink-300 border border-mist/10 rounded-md px-3 py-2 text-sm text-mist placeholder:text-mist-faint focus:outline-none focus:border-emerald/50 min-h-[120px] ${
        props.className || ""
      }`}
    />
  );
}

export function SelectInput(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={`bg-ink-300 border border-mist/10 rounded-md px-3 py-2 text-sm text-mist focus:outline-none focus:border-emerald/50 ${
        props.className || ""
      }`}
    />
  );
}

export function PrimaryButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`slot px-5 py-2.5 text-sm font-semibold text-emerald-bright bg-emerald/10 hover:bg-emerald/20 disabled:opacity-50 disabled:cursor-not-allowed ${
        props.className || ""
      }`}
    />
  );
}

export function DangerButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`slot px-3 py-2 text-xs text-redstone hover:bg-redstone/10 ${props.className || ""}`}
    />
  );
}

export function PageHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mb-8">
      <h1 className="font-display font-bold text-2xl text-mist mb-1">{title}</h1>
      {description && <p className="text-sm text-mist-muted">{description}</p>}
    </div>
  );
}
