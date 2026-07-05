import Link from "next/link";
import { ReactNode } from "react";

export function SlotButton({
  href,
  children,
  variant = "primary",
  icon
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "gold" | "ghost";
  icon?: ReactNode;
}) {
  const base =
    "slot inline-flex items-center gap-2 px-6 py-3 font-display font-semibold text-sm tracking-wide uppercase";

  const styles: Record<string, string> = {
    primary: `${base} bg-emerald/10 text-emerald-bright hover:bg-emerald/20`,
    gold: `${base} slot-gold bg-gold/10 text-gold hover:bg-gold/20`,
    ghost: `${base} bg-transparent text-mist border border-mist/20 hover:border-mist/50 rounded-md`
  };

  const external = href.startsWith("http");

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={styles[variant]}>
        {icon}
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={styles[variant]}>
      {icon}
      {children}
    </Link>
  );
}
