import { MessageCircle, Twitter, Instagram, Youtube, Mail, Music2 } from "lucide-react";

export function Footer({
  serverName,
  footerText,
  discordUrl,
  twitterUrl,
  instagramUrl,
  youtubeUrl,
  tiktokUrl,
  contactEmail
}: {
  serverName: string;
  footerText?: string | null;
  discordUrl?: string | null;
  twitterUrl?: string | null;
  instagramUrl?: string | null;
  youtubeUrl?: string | null;
  tiktokUrl?: string | null;
  contactEmail?: string | null;
}) {
  const socials = [
    { href: discordUrl, icon: MessageCircle, label: "Discord" },
    { href: twitterUrl, icon: Twitter, label: "Twitter" },
    { href: instagramUrl, icon: Instagram, label: "Instagram" },
    { href: youtubeUrl, icon: Youtube, label: "YouTube" },
    { href: tiktokUrl, icon: Music2, label: "TikTok" }
  ].filter((s) => s.href);

  return (
    <footer className="bg-ink-200 border-t border-emerald/10 py-14">
      <div className="container-px mx-auto max-w-7xl grid md:grid-cols-3 gap-10 mb-10">
        <div>
          <div className="font-display font-bold text-lg text-mist mb-3">{serverName}</div>
          <p className="text-sm text-mist-muted leading-relaxed max-w-xs">{footerText}</p>
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest text-mist-faint mb-4">Navigasi Cepat</div>
          <div className="flex flex-col gap-2 text-sm">
            {[
              { href: "#tentang", label: "Tentang" },
              { href: "#fitur", label: "Fitur" },
              { href: "#staff", label: "Staff" },
              { href: "#faq", label: "FAQ" }
            ].map((l) => (
              <a key={l.href} href={l.href} className="text-mist-muted hover:text-emerald-bright transition-colors w-fit">
                {l.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest text-mist-faint mb-4">Terhubung</div>
          <div className="flex gap-3 mb-4">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href!}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="slot h-10 w-10 flex items-center justify-center text-mist-muted hover:text-emerald-bright"
              >
                <s.icon size={16} />
              </a>
            ))}
          </div>
          {contactEmail && (
            <a href={`mailto:${contactEmail}`} className="text-sm text-mist-muted hover:text-emerald-bright flex items-center gap-2">
              <Mail size={14} /> {contactEmail}
            </a>
          )}
        </div>
      </div>

      <div className="container-px mx-auto max-w-7xl border-t border-mist/10 pt-6 text-center text-xs text-mist-faint">
        &copy; {new Date().getFullYear()} {serverName}. Seluruh hak cipta dilindungi.
      </div>
    </footer>
  );
}
