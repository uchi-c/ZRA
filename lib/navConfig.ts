import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  Settings,
  type LucideIcon,
} from "lucide-react";
import type { Role } from "@/lib/types";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export function navItemsForRole(role: Role): NavItem[] {
  const base = `/dashboard/${role === "taxpayer" ? "taxpayer" : role === "tax_practitioner" ? "practitioner" : "consultant"}`;
  return [
    { label: "Dashboard", href: base, icon: LayoutDashboard },
    { label: "Documents", href: `${base}/documents`, icon: FileText },
    { label: "Messages", href: `${base}/messages`, icon: MessageSquare },
    { label: "Settings", href: `${base}/settings`, icon: Settings },
  ];
}
