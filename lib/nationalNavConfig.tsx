import {
  LayoutDashboard,
  TrendingUp,
  PieChart,
  Landmark,
  MapPin,
  ClipboardList,
  Users2,
  BarChart3,
  Download,
  Share2,
  Bell,
  UserCog,
  ShieldCheck,
  Settings,
  LifeBuoy,
  Globe2,
  Wallet,
  Banknote,
  ShieldAlert,
  Coins,
  Activity,
  Cpu,
  Lock,
  Building2,
  ReceiptText,
  HandCoins,
  LineChart,
  FolderKanban,
  Award,
  Eye,
  Network,
  Brain,
  type LucideIcon,
} from "lucide-react";
import type { Role } from "@/lib/types";

export interface NationalNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const TSA_NAV: NationalNavItem[] = [
  { label: "Dashboard", href: "/national/tsa", icon: LayoutDashboard },
  { label: "Revenue Collection", href: "/national/tsa/revenue-collection", icon: TrendingUp },
  { label: "Budget Allocation", href: "/national/tsa/budget-allocation", icon: PieChart },
  { label: "Ministry Tracker", href: "/national/tsa/ministry-tracker", icon: Landmark },
  { label: "Provincial Dashboard", href: "/national/tsa/provincial-dashboard", icon: MapPin },
  { label: "Projects Monitoring", href: "/national/tsa/projects-monitoring", icon: ClipboardList },
  { label: "Taxpayer Transparency", href: "/national/tsa/taxpayer-transparency", icon: Users2 },
  { label: "Analytics Center", href: "/national/tsa/analytics-center", icon: BarChart3 },
  { label: "Reports & Downloads", href: "/national/tsa/reports", icon: Download },
  { label: "System Integrations", href: "/national/tsa/system-integrations", icon: Share2 },
  { label: "Alerts & Notifications", href: "/national/tsa/alerts", icon: Bell },
  { label: "User Management", href: "/national/tsa/users", icon: UserCog },
  { label: "Audit & Compliance", href: "/national/tsa/audit-compliance", icon: ShieldCheck },
  { label: "Settings", href: "/national/tsa/settings", icon: Settings },
  { label: "Help & Support", href: "/national/tsa/support", icon: LifeBuoy },
];

export const BOZ_NAV: NationalNavItem[] = [
  { label: "Executive Overview", href: "/national/boz", icon: LayoutDashboard },
  { label: "Economic Overview", href: "/national/boz/economic-overview", icon: Globe2 },
  { label: "TSA Monitoring", href: "/national/boz/tsa-monitoring", icon: Landmark },
  { label: "Revenue Collections", href: "/national/boz/revenue-collections", icon: Wallet },
  { label: "Forex Reserves", href: "/national/boz/forex-reserves", icon: Banknote },
  { label: "Banking Supervision", href: "/national/boz/banking-supervision", icon: Building2 },
  { label: "Exchange Rates", href: "/national/boz/exchange-rates", icon: Coins },
  { label: "Monetary Policy", href: "/national/boz/monetary-policy", icon: LineChart },
  { label: "Debt Management", href: "/national/boz/debt-management", icon: ReceiptText },
  { label: "Financial Stability", href: "/national/boz/financial-stability", icon: ShieldAlert },
  { label: "CBDC Monitoring", href: "/national/boz/cbdc-monitoring", icon: Cpu },
  { label: "AML Intelligence", href: "/national/boz/aml-intelligence", icon: Lock },
  { label: "Reports & Analytics", href: "/national/boz/reports", icon: BarChart3 },
  { label: "Alerts & Notifications", href: "/national/boz/alerts", icon: Bell },
  { label: "System Integration", href: "/national/boz/system-integration", icon: Network },
];

export const MOFNP_NAV: NationalNavItem[] = [
  { label: "Executive Dashboard", href: "/national/mofnp", icon: LayoutDashboard },
  { label: "Budget Management", href: "/national/mofnp/budget-management", icon: PieChart },
  { label: "Revenue Monitoring", href: "/national/mofnp/revenue-monitoring", icon: TrendingUp },
  { label: "Expenditure Control", href: "/national/mofnp/expenditure-control", icon: HandCoins },
  { label: "Cash Management", href: "/national/mofnp/cash-management", icon: Wallet },
  { label: "Economic Affairs", href: "/national/mofnp/economic-affairs", icon: Activity },
  { label: "Debt Management", href: "/national/mofnp/debt-management", icon: ReceiptText },
  { label: "Investments (PIP)", href: "/national/mofnp/investments", icon: FolderKanban },
  { label: "Ministry Performance", href: "/national/mofnp/ministry-performance", icon: Award },
  { label: "Transparency Portal", href: "/national/mofnp/transparency-portal", icon: Eye },
  { label: "IFMIS Integration", href: "/national/mofnp/ifmis-integration", icon: Landmark },
  { label: "AI Intelligence Centre", href: "/national/mofnp/ai-intelligence", icon: Brain },
  { label: "Reports & Analytics", href: "/national/mofnp/reports", icon: BarChart3 },
  { label: "Settings", href: "/national/mofnp/settings", icon: Settings },
];

export function nationalNavForRole(role: Role): NationalNavItem[] {
  if (role === "tsa_admin") return TSA_NAV;
  if (role === "boz_executive") return BOZ_NAV;
  return MOFNP_NAV;
}

export function nationalHomePathForRole(role: Role): string {
  if (role === "tsa_admin") return "/national/tsa";
  if (role === "boz_executive") return "/national/boz";
  return "/national/mofnp";
}
