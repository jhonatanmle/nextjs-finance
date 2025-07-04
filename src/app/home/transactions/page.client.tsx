"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";
import FinanceFilterListForm from "@/features/finance/components/finance-filter-list-form";
import FinanceForm from "@/features/finance/components/finance-form";
import { Button } from "@/shared/components/ui/button";
import { FilterForm, FinanceFormValues } from "@/features/finance/schemas";
import { Option } from "@/features/core/types/option.type";
import { format } from "date-fns";
import { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { useFinanceStore } from "@/features/finance/finance.store";
import {
  createFinanceRecordAction,
  updateFinanceRecordAction,
} from "@/features/finance/finance.actions";
import { toast } from "sonner";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Subcategory } from "@/features/category/category.schema";

interface Props {
  categories: Option[];
  subcategories: Subcategory[];
  goals: Option[];
  children: ReactNode;
}

const TransactionsPageClient = ({
  categories,
  subcategories,
  goals,
  children,
}: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const {
    showFinanceForm,
    setShowFinanceForm,
    initialFormValues,
    setInitialFormValues,
  } = useFinanceStore();

  const handleSearch = useCallback(
    (filterValues: FilterForm) => {
      const params = new URLSearchParams(searchParams.toString());

      params.set("date", format(filterValues.date, "yyyy-MM-dd"));

      if (filterValues.paymentType) {
        params.set("paymentType", filterValues.paymentType);
      } else {
        params.delete("paymentType");
      }

      if (filterValues.category) {
        params.set("category", filterValues.category);
      } else {
        params.delete("category");
      }

      router.push(`/home/transactions?${params.toString()}`);
    },
    [router, searchParams]
  );

  const handleFinanceFormSubmit = async (formValues: FinanceFormValues) => {
    startTransition(async () => {
      let result;
      if (initialFormValues) {
        result = await updateFinanceRecordAction(
          initialFormValues.id,
          formValues
        );
      } else {
        result = await createFinanceRecordAction(formValues);
      }

      if (result.success) {
        setShowFinanceForm(false);
        setInitialFormValues(undefined);
        toast.success("Acción realizada correctamente");
      } else {
        console.error("Error:", result.error);
        toast.error("Ocurrio un error.");
      }
    });
  };

  const handleNewTransaction = () => {
    setInitialFormValues(undefined);
    setShowFinanceForm(true);
  };

  return (
    <div className="grid grid-cols-1 gap-y-6">
      <FinanceFilterListForm categories={categories} onSearch={handleSearch}>
        <Button
          variant="default"
          className="w-full md:w-auto"
          onClick={handleNewTransaction}
        >
          Nuevo
        </Button>
      </FinanceFilterListForm>

      {children}

      <Dialog open={showFinanceForm} onOpenChange={setShowFinanceForm}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {initialFormValues ? "Editar Transacción" : "Nueva Transacción"}
            </DialogTitle>
            <DialogDescription />
          </DialogHeader>
          <div className="mt-6">
            <FinanceForm
              initialValue={initialFormValues}
              isPending={isPending}
              categories={categories}
              subcategories={subcategories}
              goals={goals}
              onFinish={handleFinanceFormSubmit}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TransactionsPageClient;
