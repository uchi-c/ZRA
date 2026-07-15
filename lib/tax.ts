export const INCOME_CATEGORIES = [
  "Sales Revenue",
  "Service Revenue",
  "Rental Income",
  "Interest Income",
  "Dividends",
  "Capital Gains",
  "Foreign Income",
  "Other Income",
] as const;

export const EXPENSE_CATEGORIES = [
  "Salaries & Wages",
  "Rent",
  "Utilities",
  "Fuel & Transport",
  "Marketing",
  "Insurance",
  "Professional Fees",
  "Repairs & Maintenance",
  "Finance Costs",
  "Capital Allowances",
  "Other Expenses",
] as const;

export const DEFAULT_INCOME: Record<(typeof INCOME_CATEGORIES)[number], number> = {
  "Sales Revenue": 1200000,
  "Service Revenue": 210000,
  "Rental Income": 60000,
  "Interest Income": 15000,
  Dividends: 8000,
  "Capital Gains": 0,
  "Foreign Income": 30000,
  "Other Income": 5000,
};

export const DEFAULT_EXPENSE: Record<(typeof EXPENSE_CATEGORIES)[number], number> = {
  "Salaries & Wages": 360000,
  Rent: 120000,
  Utilities: 45000,
  "Fuel & Transport": 30000,
  Marketing: 25000,
  Insurance: 18000,
  "Professional Fees": 40000,
  "Repairs & Maintenance": 22000,
  "Finance Costs": 20000,
  "Capital Allowances": 60000,
  "Other Expenses": 40000,
};

export function sumValues(values: Record<string, number>) {
  return Object.values(values).reduce((total, v) => total + (Number.isFinite(v) ? v : 0), 0);
}
