import {
  Swords,
  ShieldCheck,
  Users,
  Sparkles,
  Pickaxe,
  Castle,
  Gem,
  Rocket,
  Trophy,
  Globe,
  Server,
  Gift,
  Zap,
  Heart,
  Map,
  Coins,
  MessageCircle,
  Star,
  type LucideIcon
} from "lucide-react";

export const ICONS: Record<string, LucideIcon> = {
  Swords,
  ShieldCheck,
  Users,
  Sparkles,
  Pickaxe,
  Castle,
  Gem,
  Rocket,
  Trophy,
  Globe,
  Server,
  Gift,
  Zap,
  Heart,
  Map,
  Coins,
  MessageCircle,
  Star
};

export const ICON_NAMES = Object.keys(ICONS);

export function getIcon(name?: string | null): LucideIcon {
  if (!name) return Sparkles;
  return ICONS[name] || Sparkles;
}
