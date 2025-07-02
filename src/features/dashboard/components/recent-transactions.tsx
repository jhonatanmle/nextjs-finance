"use client";

import { FinanceRecord } from "@/features/finance/schemas";
import AmountCell from "@/shared/components/amount-cell";
import { DataTable } from "@/shared/components/datatable";
import PaymentBagde from "@/shared/components/payment-badge";
import { Badge } from "@/shared/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { cn } from "@/shared/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import dynamic from "next/dynamic";

type Props = React.ComponentProps<"div"> & {
  data: FinanceRecord[];
};

const RecentTransactions = ({ data, className }: Props) => {
  const columns: ColumnDef<FinanceRecord>[] = [
    {
      header: "Fecha",
      accessorKey: "createdAt",
      cell: ({ row }) => (
        <div className="w-[100px]">
          {format(row.getValue<Date>("createdAt"), "dd MMM yyyy", {
            locale: es,
          })}
        </div>
      ),
    },
    {
      header: "Monto",
      accessorKey: "amount",
      cell: ({ cell }) => {
        return (
          <div className="w-[110px]">
            <AmountCell record={cell.row.original} />
          </div>
        );
      },
    },
    {
      header: "Categoría",
      accessorKey: "category",
      cell: ({ row }) => (
        <div className="w-[100px]">
          <Badge>{row.getValue("category")}</Badge>
        </div>
      ),
    },
    {
      header: "Subcategoría",
      accessorKey: "subcategory",
      cell: ({ row }) => (
        <div className="w-[150px]">
          <Badge>{row.getValue("subcategory")}</Badge>
        </div>
      ),
    },
    {
      header: "Medio de pago",
      accessorKey: "paymentType",
      cell: ({ row }) => <PaymentBagde type={row.getValue("paymentType")} />,
    },
  ];

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>Transacciones recientes</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={data ?? []} pagination={null} />
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;

export const DynamicRecentTransactions = dynamic(
  () => import("@/features/dashboard/components/recent-transactions"),
  { ssr: false }
);
