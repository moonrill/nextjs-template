"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { flexRender } from "@tanstack/react-table";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useLegacyTable,
  type LegacyColumnDef,
} from "@tanstack/react-table/legacy";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  CheckSquare,
  ChevronLeft,
  ChevronRight,
  Filter,
  Search,
  ShieldCheck,
  Square,
  UserCheck,
} from "lucide-react";
import { useMemo, useState } from "react";
import { CodePreview } from "./CodePreview";

interface UserRecord {
  id: string;
  name: string;
  email: string;
  status: "Active" | "Inactive" | "Suspended";
  role: "Admin" | "User" | "Editor";
  joinDate: string;
}

type TableSortingItem = {
  id: string;
  desc: boolean;
};

const INITIAL_USERS: UserRecord[] = [
  {
    id: "usr-1",
    name: "Andi Pratama",
    email: "andi@example.com",
    status: "Active",
    role: "Admin",
    joinDate: "12 Jan 2025",
  },
  {
    id: "usr-2",
    name: "Budi Santoso",
    email: "budi@example.com",
    status: "Inactive",
    role: "User",
    joinDate: "03 Feb 2025",
  },
  {
    id: "usr-3",
    name: "Citra Dewi",
    email: "citra@example.com",
    status: "Active",
    role: "User",
    joinDate: "18 Feb 2025",
  },
  {
    id: "usr-4",
    name: "Dedi Kurniawan",
    email: "dedi@example.com",
    status: "Active",
    role: "Editor",
    joinDate: "01 Mar 2025",
  },
  {
    id: "usr-5",
    name: "Eka Rahmawati",
    email: "eka@example.com",
    status: "Suspended",
    role: "User",
    joinDate: "15 Mar 2025",
  },
  {
    id: "usr-6",
    name: "Fajar Nugraha",
    email: "fajar@example.com",
    status: "Active",
    role: "User",
    joinDate: "22 Mar 2025",
  },
  {
    id: "usr-7",
    name: "Gita Safitri",
    email: "gita@example.com",
    status: "Active",
    role: "Editor",
    joinDate: "05 Apr 2025",
  },
  {
    id: "usr-8",
    name: "Hendra Wijaya",
    email: "hendra@example.com",
    status: "Inactive",
    role: "User",
    joinDate: "12 Apr 2025",
  },
];

export function DataTableSection() {
  const [data] = useState<UserRecord[]>(INITIAL_USERS);
  const [sorting, setSorting] = useState<TableSortingItem[]>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [rowSelection, setRowSelection] = useState<Record<string, true>>({});

  // Filtered by status dropdown first
  const filteredData = useMemo(() => {
    if (statusFilter === "All") return data;
    return data.filter((item) => item.status === statusFilter);
  }, [data, statusFilter]);

  const columns = useMemo<LegacyColumnDef<UserRecord, unknown>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <button
            type="button"
            onClick={table.getToggleAllPageRowsSelectedHandler()}
            className="flex items-center text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 cursor-pointer"
            aria-label="Pilih semua baris"
          >
            {table.getIsAllPageRowsSelected() ? (
              <CheckSquare className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            ) : (
              <Square className="h-4 w-4" />
            )}
          </button>
        ),
        cell: ({ row }) => (
          <button
            type="button"
            onClick={row.getToggleSelectedHandler()}
            className="flex items-center text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 cursor-pointer"
            aria-label={`Pilih baris ${row.original.name}`}
          >
            {row.getIsSelected() ? (
              <CheckSquare className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            ) : (
              <Square className="h-4 w-4" />
            )}
          </button>
        ),
        enableSorting: false,
      },
      {
        accessorKey: "name",
        header: ({ column }) => (
          <button
            type="button"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex items-center gap-1 font-semibold text-zinc-900 dark:text-zinc-100 hover:text-indigo-600 cursor-pointer"
          >
            <span>Nama</span>
            {column.getIsSorted() === "asc" ? (
              <ArrowUp className="h-3.5 w-3.5 text-indigo-500" />
            ) : column.getIsSorted() === "desc" ? (
              <ArrowDown className="h-3.5 w-3.5 text-indigo-500" />
            ) : (
              <ArrowUpDown className="h-3.5 w-3.5 text-zinc-400" />
            )}
          </button>
        ),
        cell: (info) => (
          <div className="flex flex-col">
            <span className="font-medium text-zinc-900 dark:text-zinc-100">
              {String(info.getValue())}
            </span>
            <span className="text-xs text-zinc-400 sm:hidden">
              {info.row.original.email}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "email",
        header: ({ column }) => (
          <button
            type="button"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="hidden sm:flex items-center gap-1 font-semibold text-zinc-900 dark:text-zinc-100 hover:text-indigo-600 cursor-pointer"
          >
            <span>Email</span>
            <ArrowUpDown className="h-3.5 w-3.5 text-zinc-400" />
          </button>
        ),
        cell: (info) => (
          <span className="hidden sm:inline font-mono text-sm text-zinc-600 dark:text-zinc-400">
            {String(info.getValue())}
          </span>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => {
          const val = getValue() as UserRecord["status"];
          switch (val) {
            case "Active":
              return (
                <Badge variant="success" className="gap-1 font-medium text-xs">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Active
                </Badge>
              );
            case "Inactive":
              return (
                <Badge
                  variant="outline"
                  className="gap-1 font-medium text-xs text-zinc-500"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
                  Inactive
                </Badge>
              );
            case "Suspended":
              return (
                <Badge
                  variant="destructive"
                  className="gap-1 font-medium text-xs"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                  Suspended
                </Badge>
              );
          }
        },
      },
      {
        accessorKey: "role",
        header: "Role",
        cell: ({ getValue }) => {
          const role = getValue() as UserRecord["role"];
          return (
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-300">
              {role === "Admin" ? (
                <ShieldCheck className="h-4 w-4 text-indigo-500" />
              ) : role === "Editor" ? (
                <UserCheck className="h-4 w-4 text-cyan-500" />
              ) : (
                <span className="h-4 w-4 text-zinc-400" />
              )}
              {role}
            </span>
          );
        },
      },
      {
        accessorKey: "joinDate",
        header: "Tanggal Bergabung",
        cell: (info) => (
          <span className="text-sm text-zinc-500 dark:text-zinc-400">
            {String(info.getValue())}
          </span>
        ),
      },
    ],
    []
  );

  const table = useLegacyTable({
    data: filteredData,
    columns,
    state: {
      sorting,
      globalFilter,
      rowSelection,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 4,
      },
    },
  });

  const selectedCount = Object.keys(rowSelection).length;

  const sampleCode = `import { useLegacyTable, getCoreRowModel, getSortedRowModel, getPaginationRowModel } from "@tanstack/react-table/legacy";

// Setup tabel TanStack dengan dataset lokal
const table = useLegacyTable({
  data: users,
  columns,
  state: { sorting, globalFilter, rowSelection },
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
});`;

  return (
    <section id="data-table" className="space-y-6 pt-4">
      <div className="border-b border-zinc-200/80 pb-3 dark:border-zinc-800/80">
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Data Table (TanStack Table v9)
        </h2>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Implementasi headless table berperforma tinggi dengan pencarian lokal,
          sorting multi-kolom, filter status, dan seleksi baris.
        </p>
      </div>

      <div className="glass-card overflow-hidden rounded-2xl border border-zinc-200/80 p-5 dark:border-zinc-800/80 space-y-4">
        {/* Table Filter Bar */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Search Input */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <input
              type="text"
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="Cari nama atau email..."
              className="w-full rounded-xl border border-zinc-300 bg-white pl-9 pr-3.5 py-2 text-sm text-zinc-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
            />
          </div>

          <div className="flex items-center gap-2.5">
            {/* Status Filter */}
            <div className="flex items-center gap-2 text-sm text-zinc-500">
              <Filter className="h-4 w-4" />
              <span className="font-medium">Status:</span>
              <Select
                value={statusFilter}
                onValueChange={(val) => setStatusFilter(val ?? "All")}
              >
                <SelectTrigger className="h-10 min-w-32 rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200">
                  <SelectValue placeholder="Pilih status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">Semua</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                  <SelectItem value="Suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {selectedCount > 0 && (
              <span className="rounded-full bg-indigo-500/10 px-2.5 py-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                {selectedCount} Baris Terpilih
              </span>
            )}
          </div>
        </div>

        {/* Table Viewport */}
        <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-zinc-200 bg-zinc-50/80 text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-400">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-4 py-3 font-semibold uppercase tracking-wider text-xs"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-zinc-200/60 dark:divide-zinc-800/60">
              {table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="py-8 text-center text-zinc-500 dark:text-zinc-400"
                  >
                    Tidak ditemukan data pengguna yang cocok.
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className={`transition-colors hover:bg-zinc-50/60 dark:hover:bg-zinc-900/40 ${
                      row.getIsSelected()
                        ? "bg-indigo-50/40 dark:bg-indigo-950/20"
                        : ""
                    }`}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-3 align-middle">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination & Summary Footer */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-sm text-zinc-500 pt-1">
          <div>
            Menampilkan halaman {table.getState().pagination.pageIndex + 1} dari{" "}
            {table.getPageCount() || 1} (Total {filteredData.length} pengguna)
          </div>

          <div className="flex items-center gap-1.5">
            <Button
              size="sm"
              variant="outline"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="gap-1 cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
              Sebelumnya
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="gap-1 cursor-pointer"
            >
              Berikutnya
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <CodePreview
        code={sampleCode}
        title="Konfigurasi TanStack Table v9"
        filePath="src/features/showcase/components/DataTableSection.tsx"
      />
    </section>
  );
}
