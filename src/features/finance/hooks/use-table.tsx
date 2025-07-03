import { FinanceRecord } from "@/features/finance/schemas";
import AmountCell from "@/shared/components/amount-cell";
import PaymentBagde from "@/shared/components/payment-badge";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { Ellipsis } from "lucide-react";

const useTransactionTable = () => {
  const onTableDelete = async (id: number) => {
    // try {
    //   await mutateAsync(id);
    //   reloadQuerys();
    // } catch {
    //   toast.error("Error al eliminar el registro");
    // }
  };

  const onTableEdit = (record: FinanceRecord) => {
    // setInitialFormValues(record);
    // setShowFinanceForm(true);
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
            <Button variant="outline" size="icon" className="w-8 h-8">
              <Ellipsis size={15} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => {
                onTableEdit(cell.row.original);
              }}
            >
              <span>Editar</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                onTableDelete(cell.row.original.id);
              }}
            >
              <span>Eliminar</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return {
    columns,
  };
};

export default useTransactionTable;
