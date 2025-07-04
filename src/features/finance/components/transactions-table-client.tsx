"use client";

import { DataTable } from "@/shared/components/datatable";
import { FinanceRecord } from "@/features/finance/schemas";
import { ColumnDef } from "@tanstack/react-table";
import AmountCell from "@/shared/components/amount-cell";
import { Badge } from "@/shared/components/ui/badge";
import PaymentBagde from "@/shared/components/payment-badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { Button } from "@/shared/components/ui/button";
import { Ellipsis } from "lucide-react";
import { useFinanceStore } from "@/features/finance/finance.store";
import { deleteFinanceRecordAction } from "@/features/finance/finance.actions";
import { useTransition } from "react";
import { toast } from "sonner";

interface TransactionsTableClientProps {
  data: FinanceRecord[];
}

const TransactionsTableClient = ({ data }: TransactionsTableClientProps) => {
  const [isPending, startTransition] = useTransition();
  const { setShowFinanceForm, setInitialFormValues } = useFinanceStore();

  const onTableDelete = async (id: number) => {
    if (!confirm("¿Estás seguro de que quieres eliminar este registro? Esta acción no se puede deshacer.")) {
      return;
    }

    startTransition(async () => {
      const result = await deleteFinanceRecordAction(id);
      
      if (result.success) {
        toast.success("Registro eliminado correctamente");
      } else {
        toast.error("Error al eliminar el registro");
      }
    });
  };

  const onTableEdit = (record: FinanceRecord) => {
    setInitialFormValues(record);
    setShowFinanceForm(true);
  };

  const columns: ColumnDef<FinanceRecord>[] = [
    {
      header: "Fecha",
      accessorKey: "recordDate",
      cell: ({ row }) => (
        <div className="w-[100px]">
          {row.getValue<Date>("recordDate").toLocaleDateString("es", {
            day: "2-digit",
            month: "short",
            year: "numeric",
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
      cell: ({ row }) => <Badge>{row.getValue("category")}</Badge>,
    },
    {
      header: "Subcategoría",
      accessorKey: "subcategory",
      cell: ({ row }) => <Badge>{row.getValue("subcategory")}</Badge>,
    },
    {
      header: "Medio de pago",
      accessorKey: "paymentType",
      cell: ({ row }) => <PaymentBagde type={row.getValue("paymentType")} />,
    },
    {
      header: "Comentario",
      accessorKey: "comment",
      cell: ({ row }) => (
        <p className="whitespace-normal">{row.getValue("comment")}</p>
      ),
    },
    {
      header: "",
      id: "actions",
      size: 60,
      cell: ({ cell }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="w-8 h-8" disabled={isPending}>
              <Ellipsis size={15} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => {
                onTableEdit(cell.row.original);
              }}
              disabled={isPending}
            >
              <span>Editar</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                onTableDelete(cell.row.original.id);
              }}
              disabled={isPending}
            >
              <span>Eliminar</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={data ?? []}
      pagination={{ pageSize: 10 }}
    />
  );
};

export default TransactionsTableClient;
