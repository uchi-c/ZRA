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
