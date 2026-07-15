import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  Settings,
  User,
  Receipt,
  CreditCard,
  FileCheck2,
  LifeBuoy,
  Users,
  ClipboardList,
  TrendingUp,
  BarChart3,
  BookOpen,
  UserCheck,
  ShieldAlert,
  Gavel,
  Search,
  type LucideIcon,
} from "lucide-react";
import type { Role } from "@/lib/types";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

const TAXPAYER_NAV: NavItem[] = [
  { label: "Dashboard", href: "/dashboard/taxpayer", icon: LayoutDashboard },
  { label: "My Profile", href: "/dashboard/taxpayer/profile", icon: User },
  { label: "Income Declaration", href: "/dashboard/taxpayer?tab=income", icon: TrendingUp },
  { label: "Expenses Declaration", href: "/dashboard/taxpayer?tab=expense", icon: Receipt },
  { label: "PAYE", href: "/dashboard/taxpayer?tab=paye", icon: ClipboardList },
  { label: "VAT", href: "/dashboard/taxpayer?tab=vat", icon: FileText },
  { label: "Withholding Tax", href: "/dashboard/taxpayer?tab=wht", icon: FileText },
  { label: "Refunds", href: "/dashboard/taxpayer?tab=refunds", icon: CreditCard },
  { label: "Payments", href: "/dashboard/taxpayer/payments", icon: CreditCard },
  { label: "Outstanding Liability", href: "/dashboard/taxpayer?tab=liability", icon: ShieldAlert },
  { label: "Documents", href: "/dashboard/taxpayer/documents", icon: FileText },
  { label: "Tax Clearance", href: "/dashboard/taxpayer/tax-clearance", icon: FileCheck2 },
  { label: "Correspondence", href: "/dashboard/taxpayer/messages", icon: MessageSquare },
  { label: "Support", href: "/dashboard/taxpayer/support", icon: LifeBuoy },
  { label: "Settings", href: "/dashboard/taxpayer/settings", icon: Settings },
];

const PRACTITIONER_NAV: NavItem[] = [
  { label: "Dashboard", href: "/dashboard/practitioner", icon: LayoutDashboard },
  { label: "My Profile", href: "/dashboard/practitioner/profile", icon: User },
  { label: "Clients", href: "/dashboard/practitioner/clients", icon: Users },
  { label: "Returns", href: "/dashboard/practitioner/returns", icon: FileText },
  { label: "Performance", href: "/dashboard/practitioner/performance", icon: TrendingUp },
  { label: "Reports", href: "/dashboard/practitioner/reports", icon: BarChart3 },
  { label: "Messages", href: "/dashboard/practitioner/messages", icon: MessageSquare },
  { label: "Resources", href: "/dashboard/practitioner/resources", icon: BookOpen },
  { label: "Settings", href: "/dashboard/practitioner/settings", icon: Settings },
];

const CONSULTANT_NAV: NavItem[] = [
  { label: "Dashboard", href: "/dashboard/consultant", icon: LayoutDashboard },
  { label: "My Profile", href: "/dashboard/consultant/profile", icon: User },
  { label: "Practitioner Management", href: "/dashboard/consultant/practitioners", icon: UserCheck },
  { label: "Taxpayer Onboarding", href: "/dashboard/consultant/onboarding", icon: Users },
  { label: "Compliance Monitoring", href: "/dashboard/consultant/compliance", icon: ShieldAlert },
  { label: "Dispute & Case Management", href: "/dashboard/consultant/disputes", icon: Gavel },
  { label: "Risk & Audit Management", href: "/dashboard/consultant/audits", icon: Search },
  { label: "Reports & Analytics", href: "/dashboard/consultant/reports", icon: BarChart3 },
  { label: "Messages", href: "/dashboard/consultant/messages", icon: MessageSquare },
  { label: "Training & Support", href: "/dashboard/consultant/support", icon: LifeBuoy },
  { label: "Settings", href: "/dashboard/consultant/settings", icon: Settings },
];

export function navItemsForRole(role: Role): NavItem[] {
  if (role === "taxpayer") return TAXPAYER_NAV;
  if (role === "tax_practitioner") return PRACTITIONER_NAV;
  return CONSULTANT_NAV;
}
