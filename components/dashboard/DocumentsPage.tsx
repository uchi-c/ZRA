"use client";

import { useState } from "react";
import { FileText } from "lucide-react";
import { DataTable, type DataTableColumn } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { FileUpload } from "@/components/ui/FileUpload";
import { Toast } from "@/components/ui/Toast";
import { DOCUMENTS, type DocumentItem } from "@/lib/mockData";

const columns: DataTableColumn<DocumentItem>[] = [
  {
    key: "name",
    header: "Document",
    sortable: true,
    sortValue: (d) => d.name,
    render: (d) => (
      <span className="flex items-center gap-2">
        <FileText className="h-4 w-4 text-slate-400" />
        {d.name}
      </span>
    ),
  },
  { key: "category", header: "Category", render: (d) => d.category },
  { key: "uploadedOn", header: "Uploaded On", render: (d) => d.uploadedOn },
  { key: "size", header: "Size", render: (d) => d.size },
  { key: "status", header: "Status", align: "center", render: (d) => <StatusBadge status={d.status} /> },
];

export function DocumentsPage() {
  const [toast, setToast] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-6">
      <div className="card">
        <h1 className="text-lg font-bold text-slate-900">Documents Centre</h1>
        <p className="text-sm text-slate-500">Manage and verify your supporting documents.</p>
      </div>

      <section className="card">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Upload New Document</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FileUpload label="Choose a document" hint="PDF, JPG or PNG, up to 10MB." />
          <div className="flex items-end">
            <button
              type="button"
              onClick={() => setToast("Document uploaded and queued for verification.")}
              className="btn-primary"
            >
              Upload Document
            </button>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Your Documents</h2>
        <DataTable columns={columns} data={DOCUMENTS} rowKey={(d) => d.id} />
      </section>

      {toast && <Toast message={toast} onDismiss={() => setToast(null)} />}
    </div>
  );
}
