// Mock datasets for the three national command-center dashboards (TSA, BOZ, MoFNP),
// modeled on the BICA "Integrated National Dashboard" reference mockups.

export interface KpiTile {
  label: string;
  value: string;
  sub: string;
  delta?: string;
  deltaTone?: "positive" | "negative" | "neutral";
}

export interface StatusRow {
  label: string;
  value: string;
  status?: "green" | "amber" | "red";
  trend?: "up" | "down";
}

// ---------------------------------------------------------------------------
// TSA — Treasury Single Account National Revenue Dashboard
// ---------------------------------------------------------------------------

export const TSA_KPIS: KpiTile[] = [
  { label: "Total Revenue Collected Today", value: "K 1,250,000,000", sub: "", delta: "12.5% vs Yesterday", deltaTone: "positive" },
  { label: "Total Revenue This Month", value: "K 32,500,000,000", sub: "", delta: "8.7% vs Last Month", deltaTone: "positive" },
  { label: "Total Revenue This Year", value: "K 150,000,000,000", sub: "", delta: "16.2% vs Last Year", deltaTone: "positive" },
  { label: "Active Taxpayers", value: "6,500,000", sub: "", delta: "10.4%", deltaTone: "positive" },
  { label: "Active Tax Practitioners", value: "5,000", sub: "", delta: "5.3%", deltaTone: "positive" },
  { label: "Active ZRA Consultants", value: "1,000", sub: "", delta: "2.1%", deltaTone: "positive" },
];

export interface RevenueSummaryRow {
  taxType: string;
  daily: number;
  monthly: number;
  annual: number;
}

export const TSA_REVENUE_SUMMARY: RevenueSummaryRow[] = [
  { taxType: "PAYE", daily: 25_000_000, monthly: 750_000_000, annual: 9_000_000_000 },
  { taxType: "VAT", daily: 40_000_000, monthly: 1_200_000_000, annual: 14_400_000_000 },
  { taxType: "Corporate Tax", daily: 35_000_000, monthly: 1_050_000_000, annual: 12_600_000_000 },
  { taxType: "Withholding Tax", daily: 8_000_000, monthly: 240_000_000, annual: 2_880_000_000 },
  { taxType: "Customs Duty", daily: 30_000_000, monthly: 900_000_000, annual: 10_800_000_000 },
  { taxType: "Excise Duty", daily: 12_000_000, monthly: 360_000_000, annual: 4_320_000_000 },
  { taxType: "Property Transfer Tax", daily: 4_000_000, monthly: 120_000_000, annual: 1_440_000_000 },
  { taxType: "Other Taxes", daily: 6_000_000, monthly: 180_000_000, annual: 2_160_000_000 },
];

export const TSA_REVENUE_BY_TYPE = [
  { name: "PAYE", value: 24.0, color: "#0F2A5C" },
  { name: "VAT", value: 28.0, color: "#1C8A3C" },
  { name: "Corporate Tax", value: 20.0, color: "#EF7D00" },
  { name: "Customs Duty", value: 18.0, color: "#C9A24A" },
  { name: "Excise Duty", value: 7.2, color: "#7C3AED" },
  { name: "Withholding Tax", value: 5.6, color: "#0EA5E9" },
  { name: "Property Transfer Tax", value: 2.8, color: "#D6262A" },
  { name: "Other Taxes", value: 4.4, color: "#94A3B8" },
];

export interface BudgetAllocationRow {
  ministry: string;
  pct: number;
  amount: number;
  progress: number;
}

export const TSA_BUDGET_ALLOCATION: BudgetAllocationRow[] = [
  { ministry: "Education", pct: 25, amount: 37_500_000_000, progress: 80 },
  { ministry: "Health", pct: 20, amount: 30_000_000_000, progress: 75 },
  { ministry: "Infrastructure", pct: 15, amount: 22_500_000_000, progress: 70 },
  { ministry: "Agriculture", pct: 15, amount: 15_000_000_000, progress: 65 },
  { ministry: "Defence & Security", pct: 8, amount: 12_000_000_000, progress: 60 },
  { ministry: "Local Government", pct: 7, amount: 10_500_000_000, progress: 55 },
  { ministry: "Social Protection", pct: 5, amount: 7_500_000_000, progress: 50 },
  { ministry: "Energy", pct: 4, amount: 6_000_000_000, progress: 55 },
  { ministry: "Water & Sanitation", pct: 3, amount: 4_500_000_000, progress: 50 },
  { ministry: "Digital Transformation", pct: 2, amount: 3_000_000_000, progress: 45 },
  { ministry: "Strategic Reserve", pct: 1, amount: 1_500_000_000, progress: 100 },
];

export interface MinistryTrackerCard {
  ministry: string;
  allocated: number;
  programs: { name: string; amount: number }[];
  released: number;
  pending: number;
  tone: "navy" | "red";
}

export const TSA_MINISTRY_TRACKERS: MinistryTrackerCard[] = [
  {
    ministry: "Ministry of Education",
    allocated: 37_500_000_000,
    tone: "navy",
    programs: [
      { name: "Classroom Construction", amount: 12_000_000_000 },
      { name: "Teacher Recruitment", amount: 8_000_000_000 },
      { name: "Free Education Support", amount: 10_000_000_000 },
      { name: "School Infrastructure", amount: 5_000_000_000 },
      { name: "Digital Learning", amount: 2_500_000_000 },
    ],
    released: 80,
    pending: 20,
  },
  {
    ministry: "Ministry of Health",
    allocated: 30_000_000_000,
    tone: "red",
    programs: [
      { name: "Hospitals", amount: 12_000_000_000 },
      { name: "Medicines", amount: 8_000_000_000 },
      { name: "Medical Equipment", amount: 5_000_000_000 },
      { name: "Recruitment", amount: 3_000_000_000 },
      { name: "Rural Health Centres", amount: 2_000_000_000 },
    ],
    released: 75,
    pending: 25,
  },
];

export interface ProvincialAllocationRow {
  province: string;
  amount: number;
  pct: number;
}

export const TSA_PROVINCIAL_ALLOCATION: ProvincialAllocationRow[] = [
  { province: "Lusaka", amount: 18_000_000_000, pct: 12.0 },
  { province: "Copperbelt", amount: 16_000_000_000, pct: 10.7 },
  { province: "Southern", amount: 12_000_000_000, pct: 8.0 },
  { province: "Central", amount: 10_000_000_000, pct: 6.7 },
  { province: "Eastern", amount: 10_000_000_000, pct: 6.7 },
  { province: "Northern", amount: 9_000_000_000, pct: 6.0 },
  { province: "North-Western", amount: 8_000_000_000, pct: 5.3 },
  { province: "Western", amount: 7_000_000_000, pct: 4.7 },
  { province: "Luapula", amount: 6_000_000_000, pct: 4.0 },
  { province: "Muchinga", amount: 6_000_000_000, pct: 4.0 },
];

export interface ProjectMonitoringRow {
  project: string;
  budget: number;
  status: "On Track" | "In Progress" | "Delayed";
  progress: number;
}

export const TSA_PROJECT_MONITORING: ProjectMonitoringRow[] = [
  { project: "Road Construction", budget: 8_000_000_000, status: "On Track", progress: 75 },
  { project: "Hospital Upgrades", budget: 5_000_000_000, status: "On Track", progress: 60 },
  { project: "School Construction", budget: 6_000_000_000, status: "On Track", progress: 82 },
  { project: "Rural Electrification", budget: 3_000_000_000, status: "In Progress", progress: 55 },
  { project: "Water Projects", budget: 2_000_000_000, status: "On Track", progress: 68 },
];

export const TSA_TAXPAYER_TRANSPARENCY = {
  tpin: "XXXXXXXX",
  totalPaid: 25_000,
  sectors: [
    { sector: "Education", amount: 6_250, pct: 25.0 },
    { sector: "Health", amount: 5_000, pct: 20.0 },
    { sector: "Roads", amount: 3_750, pct: 15.0 },
    { sector: "Agriculture", amount: 2_500, pct: 10.0 },
    { sector: "Defence", amount: 2_000, pct: 8.0 },
    { sector: "Local Government", amount: 1_750, pct: 7.0 },
    { sector: "Social Protection", amount: 1_250, pct: 5.0 },
    { sector: "Energy", amount: 1_000, pct: 4.0 },
    { sector: "Water", amount: 750, pct: 3.0 },
    { sector: "Digital Services", amount: 500, pct: 2.0 },
    { sector: "Reserve Fund", amount: 250, pct: 1.0 },
  ],
};

export interface TreasuryKpiRow {
  indicator: string;
  target: string;
  actual: string;
  status: "green" | "amber";
  trend: "up" | "down";
}

export const TSA_TREASURY_KPIS: TreasuryKpiRow[] = [
  { indicator: "Tax Collection Growth", target: "15%", actual: "18%", status: "green", trend: "up" },
  { indicator: "Filing Compliance", target: "90%", actual: "92%", status: "green", trend: "up" },
  { indicator: "Payment Compliance", target: "85%", actual: "88%", status: "green", trend: "up" },
  { indicator: "New Taxpayers Registered", target: "500,000", actual: "620,000", status: "green", trend: "up" },
  { indicator: "Tax Practitioner Coverage", target: "5,000", actual: "4,850", status: "amber", trend: "down" },
  { indicator: "Average Collection Time", target: "2 Days", actual: "1.6 Days", status: "green", trend: "up" },
  { indicator: "Refund Processing Time", target: "10 Days", actual: "8 Days", status: "green", trend: "up" },
];

export const TSA_SYSTEM_INTEGRATIONS = ["BOZ", "Banks", "Mobile Money", "Budget Office", "Auditor General"];

// ---------------------------------------------------------------------------
// BOZ — Executive Command Center
// ---------------------------------------------------------------------------

export const BOZ_KPIS: KpiTile[] = [
  { label: "Policy Rate", value: "12.50%", sub: "Monetary Policy Rate" },
  { label: "Inflation Rate", value: "8.2%", sub: "Annual Inflation (YoY)" },
  { label: "Exchange Rate", value: "K25.50 / USD", sub: "USD/ZMW (Mid Rate)" },
  { label: "Foreign Reserves", value: "USD 5.2 Bn", sub: "Total International Reserves" },
  { label: "TSA Balance", value: "K42.0 Bn", sub: "Treasury Single Account" },
  { label: "Public Debt", value: "K650 Bn", sub: "Total Public Debt" },
  { label: "Banking Liquidity", value: "K18.0 Bn", sub: "Sector Liquidity" },
  { label: "Money Supply (M3)", value: "K420 Bn", sub: "Broad Money Supply" },
  { label: "GDP Growth", value: "4.5%", sub: "Real GDP Growth" },
];

export const BOZ_ECONOMIC_OVERVIEW: StatusRow[] = [
  { label: "GDP (Real Growth)", value: "4.5%", trend: "up" },
  { label: "Inflation Rate (YoY)", value: "8.2%", status: "amber", trend: "up" },
  { label: "Exchange Rate (USD/ZMW)", value: "K25.50", trend: "up" },
  { label: "Treasury Balance (TSA)", value: "K42.0 Bn", trend: "up" },
  { label: "Foreign Direct Investment (YTD)", value: "USD 1.1 Bn", trend: "up" },
  { label: "Mining Revenue (YTD)", value: "K28.7 Bn", trend: "up" },
  { label: "Tax Revenue (YTD)", value: "K84.6 Bn", trend: "up" },
  { label: "Employment Rate", value: "74.1%", trend: "up" },
];

export const BOZ_TSA_MONITORING = [
  { label: "Opening Balance (Yesterday)", value: "K41.2 Bn" },
  { label: "Daily Revenue Collections", value: "K415.0 Mn", tone: "green" as const },
  { label: "Daily Budget Allocations", value: "K385.0 Mn", tone: "red" as const },
  { label: "Available Treasury Balance", value: "K42.0 Bn" },
  { label: "Government Payments (Today)", value: "K210.0 Mn" },
  { label: "Debt Service Payments (Today)", value: "K75.0 Mn" },
];

export const BOZ_DAILY_REVENUE_BY_SOURCE = [
  { name: "PAYE", value: 85_000_000, pct: 20.5, color: "#0F2A5C" },
  { name: "VAT", value: 120_000_000, pct: 28.9, color: "#1C8A3C" },
  { name: "Corporate Tax", value: 65_000_000, pct: 15.7, color: "#EF7D00" },
  { name: "Customs Duty", value: 70_000_000, pct: 16.9, color: "#C9A24A" },
  { name: "Mineral Royalty Tax", value: 55_000_000, pct: 13.3, color: "#7C3AED" },
  { name: "Other Revenue", value: 20_000_000, pct: 4.8, color: "#94A3B8" },
];

export const BOZ_FOREX_RESERVES = [
  { label: "US Dollar Assets", value: "USD 3.0 Bn" },
  { label: "Gold Reserves", value: "USD 1.2 Bn" },
  { label: "SDR Holdings (IMF)", value: "USD 0.5 Bn" },
  { label: "Foreign Securities", value: "USD 0.5 Bn" },
  { label: "Foreign Bonds", value: "USD 0.5 Bn" },
];

export const BOZ_BANKING_SECTOR = [
  { label: "Total Banks Licensed", value: "19" },
  { label: "Capital Adequacy Ratio", value: "18.0%" },
  { label: "Non-Performing Loans (NPL)", value: "6.5%" },
  { label: "Total Deposits", value: "K280.0 Bn" },
  { label: "Total Loans", value: "K185.0 Bn" },
  { label: "Sector Liquidity Ratio", value: "42.0%" },
];

export const BOZ_BANKING_INDUSTRY_SUMMARY = [
  { name: "Total Deposits", value: 280.0 },
  { name: "Total Loans", value: 185.0 },
  { name: "Liquid Assets", value: 117.6 },
  { name: "Capital & Reserves", value: 50.4 },
];

export interface FxRateRow {
  currency: string;
  flag: string;
  buy: string;
  sell: string;
  change: string;
}

export const BOZ_FX_RATES: FxRateRow[] = [
  { currency: "USD", flag: "🇺🇸", buy: "25.45", sell: "25.55", change: "+0.15%" },
  { currency: "EUR", flag: "🇪🇺", buy: "29.00", sell: "29.20", change: "+0.12%" },
  { currency: "GBP", flag: "🇬🇧", buy: "33.40", sell: "33.80", change: "+0.10%" },
  { currency: "ZAR", flag: "🇿🇦", buy: "1.42", sell: "1.48", change: "+0.14%" },
  { currency: "CNY", flag: "🇨🇳", buy: "3.50", sell: "3.60", change: "+0.09%" },
];

export const BOZ_MONETARY_POLICY = [
  { label: "Policy Rate", value: "12.50%" },
  { label: "Statutory Reserve Ratio", value: "26%" },
  { label: "Inflation Target", value: "6% – 8%" },
  { label: "Treasury Bill Yield (91 Days)", value: "15.8%" },
  { label: "Government Bond Yield (5Y)", value: "18.2%" },
  { label: "Open Market Operations (Today)", value: "K300.0 Mn" },
];

export const BOZ_PUBLIC_DEBT = [
  { name: "External Debt", value: 350, pct: 53.8, color: "#0F2A5C" },
  { name: "Domestic Debt", value: 300, pct: 46.2, color: "#EF7D00" },
];

export const BOZ_DEBT_MATURITY = [
  { name: "< 1 Year", value: 85.0 },
  { name: "1 - 3 Years", value: 120.0 },
  { name: "3 - 5 Years", value: 110.0 },
  { name: "5 - 10 Years", value: 160.0 },
  { name: "> 10 Years", value: 175.0 },
];

export const BOZ_GOVERNMENT_CASH_FLOW = [
  { label: "Total Revenue Collections", value: "K8.75 Bn" },
  { label: "Total Expenditures", value: "K7.82 Bn", tone: "red" as const },
  { label: "Net Cash Position", value: "K0.93 Bn", tone: "green" as const },
  { label: "Percent of Budget", value: "32.4%" },
  { label: "Commitments", value: "K1.45 Bn" },
  { label: "Uncommitted Balance", value: "K2.18 Bn" },
];

export const BOZ_EARLY_WARNING = [
  { label: "Inflation Risk", status: "amber" as const },
  { label: "Exchange Rate Risk", status: "green" as const },
  { label: "Banking Sector Risk", status: "green" as const },
  { label: "Liquidity Risk", status: "amber" as const },
  { label: "Debt Sustainability Risk", status: "amber" as const },
  { label: "External Sector Risk", status: "green" as const },
];

export const BOZ_SYSTEM_INTEGRATIONS = [
  "ZRA", "MoFNP", "TSA", "Commercial Banks", "Mobile Money", "PACRA", "SEC", "LuSE", "NAPSA", "NHIMA", "Smart Zambia",
];

export const BOZ_AI_ENGINE = [
  { label: "Economic Forecasting", status: "green" as const },
  { label: "Risk Analytics", status: "green" as const },
  { label: "Policy Simulation", status: "amber" as const },
  { label: "Anomaly Detection", status: "amber" as const },
];

// ---------------------------------------------------------------------------
// MoFNP — Digital Budget & Economic Affairs Command Dashboard
// ---------------------------------------------------------------------------

export const MOFNP_KPIS: KpiTile[] = [
  { label: "National Budget", value: "K253.1 Billion", sub: "Approved Budget 2025" },
  { label: "Revenue Collection", value: "K215 Billion", sub: "YTD Collection" },
  { label: "Expenditure", value: "K205 Billion", sub: "YTD Expenditure" },
  { label: "Fiscal Deficit", value: "4.5% of GDP", sub: "Within Target" },
  { label: "Public Debt", value: "K650 Billion", sub: "75% of GDP" },
  { label: "GDP Growth", value: "4.5%", sub: "2025 Projection" },
  { label: "Inflation", value: "8.2%", sub: "April 2025 (YoY)" },
  { label: "Reserves", value: "USD 5.2 Bn", sub: "Foreign Reserves" },
  { label: "Cash Balance (TSA)", value: "K42 Billion", sub: "Available Cash" },
];

export const MOFNP_BUDGET_PERFORMANCE = [
  { label: "Approved National Budget", value: "K253.1 Billion" },
  { label: "Revised Budget", value: "K253.1 Billion" },
  { label: "Revenue Target", value: "K215 Billion" },
  { label: "Actual Revenue Collected", value: "K210 Billion" },
  { label: "Actual Expenditure", value: "K205 Billion" },
  { label: "Budget Variance", value: "K5 Billion", tone: "green" as const },
  { label: "Fiscal Deficit", value: "4.5% of GDP" },
];

export const MOFNP_BUDGET_EXECUTION = {
  executionRate: 82.9,
  segments: [
    { name: "Revenue Collected", value: 210, sub: "97.7% of Target", color: "#1C8A3C" },
    { name: "Expenditure", value: 205, sub: "80.2% of Budget", color: "#EF7D00" },
    { name: "Surplus / (Deficit)", value: 5, sub: "", color: "#0F2A5C" },
  ],
};

export interface RevenueStreamRow {
  stream: string;
  amount: string;
  pct: number;
}

export const MOFNP_REVENUE_MONITORING: RevenueStreamRow[] = [
  { stream: "PAYE", amount: "K3.8 Billion", pct: 21.3 },
  { stream: "VAT", amount: "K5.0 Billion", pct: 28.1 },
  { stream: "Corporate Tax", amount: "K2.5 Billion", pct: 14.0 },
  { stream: "Customs & Excise", amount: "K3.2 Billion", pct: 18.0 },
  { stream: "Mineral Royalties", amount: "K1.8 Billion", pct: 10.1 },
  { stream: "Non-Tax Revenue", amount: "K1.5 Billion", pct: 8.4 },
];

export const MOFNP_EXPENDITURE_CONTROL = [
  { name: "Infrastructure", value: 54.0 },
  { name: "Education", value: 43.0 },
  { name: "Health", value: 32.0 },
  { name: "Defence & Security", value: 21.0 },
  { name: "Agriculture", value: 21.0 },
  { name: "Energy", value: 17.0 },
  { name: "Local Government", value: 15.0 },
  { name: "Social Protection", value: 11.0 },
];

export const MOFNP_EXPENDITURE_BREAKDOWN = { recurrent: 62, capital: 38, total: "K205 Billion Total YTD" };

export const MOFNP_TREASURY_CASH = [
  { label: "TSA Opening Balance", value: "K42.0 Billion" },
  { label: "Daily Revenue Inflows", value: "K700 Million" },
  { label: "Government Payments", value: "K550 Million" },
  { label: "Debt Payments", value: "K250 Million" },
  { label: "Net Cash Position", value: "+K150 Million", tone: "green" as const },
  { label: "Available Cash Balance", value: "K42.15 Billion" },
];

export const MOFNP_ECONOMIC_AFFAIRS = [
  { label: "GDP Growth (2025F)", value: "4.5%", trend: "up" as const },
  { label: "Inflation (YoY)", value: "8.2%", trend: "up" as const },
  { label: "USD Exchange Rate", value: "K25.50", trend: "up" as const },
  { label: "FDI Inflows (YTD)", value: "USD 2.5 Bn", trend: "up" as const },
  { label: "Export Earnings (YTD)", value: "USD 12.0 Bn", trend: "up" as const },
  { label: "Unemployment Rate", value: "12.1%", trend: "down" as const },
];

export const MOFNP_PUBLIC_DEBT = [
  { category: "External Debt", amount: 350.0, pct: 53.8 },
  { category: "Domestic Debt", amount: 300.0, pct: 46.2 },
];

export interface PipProjectRow {
  project: string;
  budget: number;
  status: "green" | "amber" | "red";
  progress: number;
}

export const MOFNP_PIP_PROJECTS: PipProjectRow[] = [
  { project: "Roads Development", budget: 10.0, status: "green", progress: 75 },
  { project: "Energy Expansion", budget: 8.0, status: "amber", progress: 60 },
  { project: "Health Infrastructure", budget: 5.0, status: "green", progress: 80 },
  { project: "Schools Construction", budget: 4.0, status: "red", progress: 90 },
];

export const MOFNP_MINISTRY_SCORECARD = [
  { label: "Budget Execution Rate", value: 82 },
  { label: "Revenue Performance", value: 97 },
  { label: "Project Completion Rate", value: 76 },
  { label: "Procurement Efficiency", value: 68 },
  { label: "Audit Compliance", value: 88 },
];

export const MOFNP_AI_INTELLIGENCE = [
  "Revenue Collection Forecasts",
  "Inflation Projections",
  "Debt Sustainability Risk",
  "Exchange Rate Pressure",
  "Economic Growth Scenarios",
  "Budget Performance Risks",
  "Investment Opportunities",
];

export const MOFNP_PRESIDENTIAL_BRIEFING = [
  { label: "Revenue Performance", status: "Strong", tone: "green" as const },
  { label: "Inflation", status: "Monitor", tone: "amber" as const },
  { label: "Debt Sustainability", status: "Moderate Risk", tone: "amber" as const },
  { label: "Exchange Rate", status: "Stable", tone: "green" as const },
  { label: "Investment Growth", status: "Improving", tone: "green" as const },
  { label: "Budget Execution", status: "On Track", tone: "green" as const },
];

export const MOFNP_DECISION_SUPPORT = [
  "Real-Time Data",
  "Scenario Analysis",
  "Risk Assessment",
  "Policy Recommendations",
  "Impact Evaluation",
];
