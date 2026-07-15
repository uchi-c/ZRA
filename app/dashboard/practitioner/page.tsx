"use client";

import { useAuth } from "@/lib/auth";
import { StatCard } from "@/components/ui/StatCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { DataTable, type DataTableColumn } from "@/components/ui/DataTable";
import {
  PRACTITIONER_CLIENTS,
  PRACTITIONER_PERFORMANCE,
  zmw,
  type ClientReturnRow,
} from "@/lib/mockData";
import type { PractitionerProfile } from "@/lib/types";

const columns: DataTableColumn<ClientReturnRow>[] = [
  { key: "clientName", header: "Client Name", sortable: true, sortValue: (r) => r.clientName, render: (r) => r.clientName },
  { key: "tpin", header: "TPIN", render: (r) => r.tpin },
  { key: "taxPeriod", header: "Tax Period", render: (r) => r.taxPeriod },
  { key: "income", header: "Income", align: "right", sortable: true, sortValue: (r) => r.income, render: (r) => zmw(r.income) },
  { key: "expenses", header: "Expenses", align: "right", sortable: true, sortValue: (r) => r.expenses, render: (r) => zmw(r.expenses) },
  { key: "taxPayable", header: "Tax Payable", align: "right", sortable: true, sortValue: (r) => r.taxPayable, render: (r) => zmw(r.taxPayable) },
  { key: "refundDue", header: "Refund Due", align: "right", render: (r) => zmw(r.refundDue) },
  { key: "outstandingBalance", header: "Outstanding Balance", align: "right", render: (r) => zmw(r.outstandingBalance) },
  { key: "status", header: "Status", align: "center", render: (r) => <StatusBadge status={r.status} /> },
];

export default function PractitionerPage() {
  const { user } = useAuth();
  const profile = user!.profile as PractitionerProfile;

  const registeredClients = PRACTITIONER_CLIENTS.length + 79;
  const activeClients = PRACTITIONER_CLIENTS.filter((c) => c.status !== "Outstanding").length + 60;
  const returnsSubmitted = PRACTITIONER_CLIENTS.filter((c) => c.status === "Compliant").length + 58;
  const returnsPending = PRACTITIONER_CLIENTS.filter((c) => c.status === "Pending").length + 6;
  const compliant = PRACTITIONER_CLIENTS.filter((c) => c.status === "Compliant").length;

  return (
    <div className="flex flex-col gap-6">
      <div className="card">
        <h1 className="text-lg font-bold text-slate-900">
          {profile.firstName} {profile.surname}
        </h1>
        <p className="text-sm text-slate-500">
          {profile.currentEmployer} · {profile.category} · {profile.professionalBody} Member No. {profile.membershipNumber}
        </p>
      </div>

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Client Management</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
          <StatCard label="Registered Clients" value={registeredClients.toString()} />
          <StatCard label="Active Clients" value={activeClients.toString()} />
          <StatCard label="Returns Submitted" value={returnsSubmitted.toString()} />
          <StatCard label="Returns Pending" value={returnsPending.toString()} />
          <StatCard
            label="Compliance Status"
            value={`${compliant}/${PRACTITIONER_CLIENTS.length} Compliant`}
          />
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Client Tax Returns</h2>
        <DataTable columns={columns} data={PRACTITIONER_CLIENTS} rowKey={(r) => r.tpin} />
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
          Practitioner Performance Dashboard
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          <StatCard label="Clients Managed" value={PRACTITIONER_PERFORMANCE.clientsManaged.toString()} />
          <StatCard label="Returns Filed" value={PRACTITIONER_PERFORMANCE.returnsFiled.toString()} />
          <StatCard label="Revenue Generated" value={zmw(PRACTITIONER_PERFORMANCE.revenueGenerated)} />
          <StatCard label="Compliance Rate" value={`${PRACTITIONER_PERFORMANCE.complianceRate}%`} deltaTone="positive" />
          <StatCard label="Tax Collection Contribution" value={zmw(PRACTITIONER_PERFORMANCE.taxCollectionContribution)} />
          <StatCard label="Practitioner Ranking" value={PRACTITIONER_PERFORMANCE.ranking} />
        </div>
      </section>
    </div>
  );
}
