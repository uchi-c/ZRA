export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  unread: boolean;
  tone: "info" | "warning" | "success";
}

export const NOTIFICATIONS: NotificationItem[] = [
  {
    id: "n1",
    title: "VAT return due in 7 days",
    description: "Your Apr 2025 VAT return is due for submission.",
    time: "10:15 AM",
    unread: true,
    tone: "warning",
  },
  {
    id: "n2",
    title: "Refund approved",
    description: "Your refund request has moved to Approved status.",
    time: "09:35 AM",
    unread: true,
    tone: "success",
  },
  {
    id: "n3",
    title: "Legislative update",
    description: "The Finance Act 2025 has been published — review changes.",
    time: "Yesterday",
    unread: false,
    tone: "info",
  },
  {
    id: "n4",
    title: "Payment received",
    description: "Your recent payment was processed successfully.",
    time: "2 days ago",
    unread: false,
    tone: "success",
  },
];

export interface MessageThread {
  id: string;
  from: string;
  subject: string;
  preview: string;
  time: string;
  unread: boolean;
}

export const MESSAGE_THREADS: MessageThread[] = [
  {
    id: "m1",
    from: "ZRA Compliance Desk",
    subject: "Tax Clearance Certificate ready",
    preview: "Your tax clearance certificate has been generated and is available for download.",
    time: "10:42 AM",
    unread: true,
  },
  {
    id: "m2",
    from: "ZRA Support",
    subject: "Query on Q2 return",
    preview: "We noticed a discrepancy in your input VAT figures — please review.",
    time: "Yesterday",
    unread: true,
  },
  {
    id: "m3",
    from: "ZRA Notifications",
    subject: "Filing deadline reminder",
    preview: "Your next return is due in 7 days. File early to avoid penalties.",
    time: "3 days ago",
    unread: false,
  },
  {
    id: "m4",
    from: "ZRA Refunds Desk",
    subject: "Refund status update",
    preview: "Your refund request is now Under Review. Expect a decision within 5 business days.",
    time: "1 week ago",
    unread: false,
  },
];

export interface DocumentItem {
  id: string;
  name: string;
  category: string;
  uploadedOn: string;
  size: string;
  status: "Verified" | "Pending" | "Rejected";
}

export const DOCUMENTS: DocumentItem[] = [
  { id: "d1", name: "NRC_Copy.pdf", category: "Identification", uploadedOn: "12 Jan 2025", size: "820 KB", status: "Verified" },
  { id: "d2", name: "TPIN_Certificate.pdf", category: "Tax Registration", uploadedOn: "12 Jan 2025", size: "410 KB", status: "Verified" },
  { id: "d3", name: "Proof_of_Address.pdf", category: "Address", uploadedOn: "12 Jan 2025", size: "1.1 MB", status: "Verified" },
  { id: "d4", name: "2025_Q2_Financials.xlsx", category: "Financials", uploadedOn: "02 Jul 2025", size: "2.4 MB", status: "Pending" },
  { id: "d5", name: "Tax_Clearance_2024.pdf", category: "Clearance", uploadedOn: "18 Feb 2025", size: "540 KB", status: "Verified" },
];

export const PROVINCES = [
  "Central",
  "Copperbelt",
  "Eastern",
  "Luapula",
  "Lusaka",
  "Muchinga",
  "Northern",
  "North-Western",
  "Southern",
  "Western",
];

export const zmw = (value: number) =>
  `ZMW ${value.toLocaleString("en-ZM", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export const zmwCompact = (value: number) =>
  `ZMW ${new Intl.NumberFormat("en-ZM", { notation: "compact", maximumFractionDigits: 2 }).format(value)}`;

export interface ClientReturnRow {
  clientName: string;
  tpin: string;
  taxPeriod: string;
  income: number;
  expenses: number;
  taxPayable: number;
  refundDue: number;
  outstandingBalance: number;
  status: "Compliant" | "Pending" | "Outstanding";
}

export const PRACTITIONER_CLIENTS: ClientReturnRow[] = [
  {
    clientName: "Mwansa Traders Ltd",
    tpin: "1000012345",
    taxPeriod: "2025 Q2",
    income: 850000,
    expenses: 520000,
    taxPayable: 82500,
    refundDue: 0,
    outstandingBalance: 0,
    status: "Compliant",
  },
  {
    clientName: "Chanda Farms SME",
    tpin: "1000023456",
    taxPeriod: "2025 Q2",
    income: 410000,
    expenses: 260000,
    taxPayable: 37500,
    refundDue: 0,
    outstandingBalance: 37500,
    status: "Outstanding",
  },
  {
    clientName: "Bwalya & Sons Partnership",
    tpin: "1000034567",
    taxPeriod: "2025 Q2",
    income: 1250000,
    expenses: 780000,
    taxPayable: 117500,
    refundDue: 0,
    outstandingBalance: 0,
    status: "Compliant",
  },
  {
    clientName: "Green Valley NGO",
    tpin: "1000045678",
    taxPeriod: "2025 Q2",
    income: 0,
    expenses: 0,
    taxPayable: 0,
    refundDue: 0,
    outstandingBalance: 0,
    status: "Compliant",
  },
  {
    clientName: "Zesco Contractors Ltd",
    tpin: "1000056789",
    taxPeriod: "2025 Q2",
    income: 2400000,
    expenses: 1650000,
    taxPayable: 187500,
    refundDue: 0,
    outstandingBalance: 0,
    status: "Pending",
  },
  {
    clientName: "Musonda Enterprises",
    tpin: "1000067890",
    taxPeriod: "2025 Q2",
    income: 320000,
    expenses: 298000,
    taxPayable: 5500,
    refundDue: 12500,
    outstandingBalance: 0,
    status: "Compliant",
  },
  {
    clientName: "Kalaba Logistics SME",
    tpin: "1000078901",
    taxPeriod: "2025 Q2",
    income: 690000,
    expenses: 410000,
    taxPayable: 70000,
    refundDue: 0,
    outstandingBalance: 70000,
    status: "Outstanding",
  },
];

export const PRACTITIONER_PERFORMANCE = {
  clientsManaged: 72,
  returnsFiled: 64,
  revenueGenerated: 1245000,
  complianceRate: 94,
  taxCollectionContribution: 2850000,
  ranking: "Top 15%",
};

export const CONSULTANT_SUMMARY = {
  consultantNumber: "TC-10045",
  region: "Lusaka",
  assignedPractitioners: 25,
  assignedTaxpayers: 3450,
  revenueCollection: 258000000,
  complianceRate: 96,
};

export interface RevenueMonthRow {
  period: string;
  taxpayersRegistered: number;
  returnsSubmitted: number;
  taxesAssessed: number;
  taxesCollected: number;
  refundsProcessed: number;
  outstandingDebt: number;
}

export const REVENUE_PERFORMANCE: RevenueMonthRow[] = [
  { period: "Jan 2025", taxpayersRegistered: 1180, returnsSubmitted: 9600, taxesAssessed: 18500000, taxesCollected: 16200000, refundsProcessed: 420000, outstandingDebt: 2300000 },
  { period: "Feb 2025", taxpayersRegistered: 1240, returnsSubmitted: 9800, taxesAssessed: 19100000, taxesCollected: 16850000, refundsProcessed: 380000, outstandingDebt: 2250000 },
  { period: "Mar 2025", taxpayersRegistered: 1310, returnsSubmitted: 10250, taxesAssessed: 20400000, taxesCollected: 18100000, refundsProcessed: 510000, outstandingDebt: 2300000 },
  { period: "Apr 2025", taxpayersRegistered: 1385, returnsSubmitted: 10600, taxesAssessed: 21200000, taxesCollected: 18950000, refundsProcessed: 465000, outstandingDebt: 2250000 },
  { period: "May 2025", taxpayersRegistered: 1450, returnsSubmitted: 10900, taxesAssessed: 21850000, taxesCollected: 19600000, refundsProcessed: 500000, outstandingDebt: 2150000 },
  { period: "Jun 2025", taxpayersRegistered: 1520, returnsSubmitted: 11200, taxesAssessed: 22600000, taxesCollected: 20250000, refundsProcessed: 545000, outstandingDebt: 2050000 },
];

export const MANAGEMENT_KPIS = {
  nationalRevenueCollected: 2845000000,
  revenueTargetAchievement: 92,
  taxComplianceRate: 86,
  taxDebtRecovery: 78,
  refundProcessingTime: "5.2 Days",
  activeTaxPractitioners: 5230,
  activeTaxConsultants: 1020,
  activeTaxpayers: 1245680,
};

export interface BudgetSector {
  sector: string;
  amount: number;
  percent: number;
}

export const BUDGET_SECTORS: BudgetSector[] = [
  { sector: "Education", amount: 20.0, percent: 20 },
  { sector: "Health", amount: 15.0, percent: 15 },
  { sector: "Infrastructure & Transport", amount: 15.0, percent: 15 },
  { sector: "Defence & Security", amount: 10.0, percent: 10 },
  { sector: "Agriculture & Food Security", amount: 8.0, percent: 8 },
  { sector: "Social Protection", amount: 7.0, percent: 7 },
  { sector: "Energy", amount: 6.0, percent: 6 },
  { sector: "Local Government", amount: 5.0, percent: 5 },
  { sector: "Public Administration", amount: 5.0, percent: 5 },
  { sector: "Environment & Natural Resources", amount: 3.0, percent: 3 },
  { sector: "Other / Contingencies", amount: 6.0, percent: 6 },
];

export const NATIONAL_BUDGET = {
  fiscalYear: "2025",
  taxRevenue: 90.0,
  nonTaxRevenue: 6.0,
  grantsAid: 4.0,
  totalRevenue: 100.0,
  totalBudget: 100.0,
};

export const REVENUE_FLOW_STAGES = [
  { label: "ZRA Revenue Collection", value: 100 },
  { label: "Treasury Single Account", value: 100 },
  { label: "Government Budget Allocation & Service Delivery", value: 100 },
];

export const REVENUE_SOURCES = [
  "Income Tax",
  "VAT",
  "PAYE",
  "Excise Duty",
  "Import Duty",
  "Property Transfer Tax",
  "Motor Vehicle Tax",
  "Mineral Royalty",
  "Other Taxes & Levies",
];

export const SERVICE_DELIVERY_OUTCOMES = [
  "Quality Education & Skills Development",
  "Accessible & Quality Healthcare",
  "Good Roads, Railways & Infrastructure",
  "Food Security & Agricultural Support",
  "Safe Communities & National Security",
  "Clean Energy & Environment Protection",
  "Social Welfare & Poverty Reduction",
  "Efficient Public Services",
];

export interface PaymentRecord {
  id: string;
  date: string;
  description: string;
  method: string;
  amount: number;
  status: "Completed" | "Pending" | "Failed";
}

export const PAYMENT_HISTORY: PaymentRecord[] = [
  { id: "PMT-10021", date: "05 Jul 2025", description: "Income Tax Q2 2025", method: "Mobile Money", amount: 108000, status: "Completed" },
  { id: "PMT-10014", date: "12 Apr 2025", description: "VAT Apr 2025", method: "Bank Transfer", amount: 44000, status: "Completed" },
  { id: "PMT-10009", date: "18 Feb 2025", description: "PAYE Feb 2025", method: "Debit Card", amount: 60000, status: "Completed" },
  { id: "PMT-10002", date: "22 Jan 2025", description: "Provisional Tax", amount: 35000, method: "Bank Transfer", status: "Pending" },
];

export interface TaxClearanceRecord {
  id: string;
  issuedOn: string;
  expiresOn: string;
  purpose: string;
  status: "Valid" | "Expired" | "Processing";
}

export const TAX_CLEARANCE_HISTORY: TaxClearanceRecord[] = [
  { id: "TCC-2025-0456", issuedOn: "18 Feb 2025", expiresOn: "18 Feb 2026", purpose: "Government Tender", status: "Valid" },
  { id: "TCC-2024-1287", issuedOn: "02 Mar 2024", expiresOn: "02 Mar 2025", purpose: "Bank Loan Application", status: "Expired" },
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "How do I file my tax return?",
    answer: "Go to your dashboard, complete the Income and Expense Declaration modules, review the Automatic Tax Computation, then click Submit Return.",
  },
  {
    question: "How long does a refund take to process?",
    answer: "Refunds typically move from Submitted to Paid within 5–10 business days once approved, tracked via the Refund Status stepper.",
  },
  {
    question: "How do I get a Tax Clearance Certificate?",
    answer: "Visit Tax Clearance in the sidebar and click Generate Tax Clearance. Certificates are valid for 12 months.",
  },
  {
    question: "What happens if I miss a filing deadline?",
    answer: "Penalties and interest are added to your Outstanding Liability. Contact Support if you need a filing extension.",
  },
];

export interface PractitionerDirectoryEntry {
  id: string;
  name: string;
  firm: string;
  category: string;
  clientsManaged: number;
  complianceRate: number;
  status: "Active" | "Suspended";
}

export const PRACTITIONER_DIRECTORY: PractitionerDirectoryEntry[] = [
  { id: "PR-2201", name: "Sarah Williams", firm: "Mwansa & Associates", category: "GTP", clientsManaged: 72, complianceRate: 94, status: "Active" },
  { id: "PR-2198", name: "Bwalya Chanda", firm: "Chanda Tax Advisors", category: "MTP", clientsManaged: 58, complianceRate: 89, status: "Active" },
  { id: "PR-2176", name: "Mutale Phiri", firm: "Phiri & Partners", category: "TTP", clientsManaged: 34, complianceRate: 97, status: "Active" },
  { id: "PR-2150", name: "Kunda Musonda", firm: "Musonda Tax Services", category: "GTP", clientsManaged: 41, complianceRate: 72, status: "Suspended" },
];

export interface OnboardingRequest {
  id: string;
  applicantName: string;
  type: "Taxpayer" | "Tax Practitioner";
  submittedOn: string;
  status: "Pending Review" | "Verified" | "Flagged";
}

export const ONBOARDING_REQUESTS: OnboardingRequest[] = [
  { id: "ONB-3391", applicantName: "Kalaba Logistics SME", type: "Taxpayer", submittedOn: "14 Jul 2025", status: "Pending Review" },
  { id: "ONB-3388", applicantName: "Musonda Enterprises", type: "Taxpayer", submittedOn: "13 Jul 2025", status: "Verified" },
  { id: "ONB-3379", applicantName: "Chileshe Banda", type: "Tax Practitioner", submittedOn: "10 Jul 2025", status: "Flagged" },
  { id: "ONB-3364", applicantName: "Green Valley NGO", type: "Taxpayer", submittedOn: "08 Jul 2025", status: "Verified" },
];

export interface DisputeCase {
  id: string;
  taxpayer: string;
  issue: string;
  openedOn: string;
  priority: "High" | "Medium" | "Low";
  status: "Open" | "Under Review" | "Resolved";
}

export const DISPUTE_CASES: DisputeCase[] = [
  { id: "CASE-5521", taxpayer: "Zesco Contractors Ltd", issue: "VAT input credit disallowed", openedOn: "02 Jul 2025", priority: "High", status: "Under Review" },
  { id: "CASE-5498", taxpayer: "Chanda Farms SME", issue: "Assessment objection", openedOn: "28 Jun 2025", priority: "Medium", status: "Open" },
  { id: "CASE-5460", taxpayer: "Bwalya & Sons Partnership", issue: "Penalty waiver request", openedOn: "15 Jun 2025", priority: "Low", status: "Resolved" },
];

export interface AuditSelection {
  id: string;
  taxpayer: string;
  riskScore: number;
  reason: string;
  status: "Scheduled" | "In Progress" | "Completed";
}

export const AUDIT_SELECTIONS: AuditSelection[] = [
  { id: "AUD-1187", taxpayer: "Zesco Contractors Ltd", riskScore: 82, reason: "Revenue anomaly detected", status: "In Progress" },
  { id: "AUD-1179", taxpayer: "Kalaba Logistics SME", riskScore: 76, reason: "Outstanding balance > 90 days", status: "Scheduled" },
  { id: "AUD-1160", taxpayer: "Musonda Enterprises", riskScore: 41, reason: "Routine compliance check", status: "Completed" },
];

export interface ReportTemplate {
  id: string;
  name: string;
  description: string;
}

export const REPORT_TEMPLATES: ReportTemplate[] = [
  { id: "rep-compliance", name: "Compliance Summary Report", description: "Compliance rate breakdown across all managed clients." },
  { id: "rep-revenue", name: "Revenue Collection Report", description: "Taxes assessed vs. collected over a selected period." },
  { id: "rep-refunds", name: "Refunds Processing Report", description: "Refund requests, approvals, and average processing time." },
  { id: "rep-audit", name: "Audit & Risk Report", description: "AI-selected audit cases and outcomes." },
];

export interface ResourceLink {
  id: string;
  title: string;
  category: string;
  description: string;
}

export const AI_COMPLIANCE_FUNCTIONS = [
  "Fraud Detection",
  "Risk Scoring",
  "Audit Selection",
  "Taxpayer Behaviour Analysis",
  "Revenue Forecasting",
  "Compliance Monitoring",
  "Real-Time Alerts",
  "Refund Verification",
];

export const PAYMENT_GATEWAY_CHANNELS = [
  "Commercial Banks",
  "Mobile Money",
  "Internet Banking",
  "Debit Cards",
  "Credit Cards",
  "Treasury Single Account",
];

export const SYSTEM_INTEGRATIONS = [
  "PACRA",
  "NAPSA",
  "NHIMA",
  "Banks",
  "Mobile Money",
  "RTSA",
  "Immigration Department",
  "Local Authorities",
  "Smart Zambia Institute",
  "Ministry of Finance",
  "Bank of Zambia",
  "Zambia Revenue Authority",
];

export const RESOURCE_LINKS: ResourceLink[] = [
  { id: "res-1", title: "Income Tax Act — Practitioner Guide", category: "Legislation", description: "Latest amendments relevant to practitioner filings." },
  { id: "res-2", title: "VAT Filing Handbook 2025", category: "Guide", description: "Step-by-step guide to VAT return preparation." },
  { id: "res-3", title: "Tax Practitioners Code of Conduct", category: "Compliance", description: "Professional standards and disciplinary procedures." },
  { id: "res-4", title: "ZRA Practitioner Portal Training", category: "Training", description: "Video walkthrough of the practitioner portal's tools." },
];
