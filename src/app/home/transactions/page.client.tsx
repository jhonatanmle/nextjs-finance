"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import FinanceFilterListForm from "@/features/finance/components/finance-filter-list-form";
import { Button } from "@/shared/components/ui/button";
import { FilterForm } from "@/features/finance/schemas";
import { FinanceRecord } from "@/features/finance/schemas";
import { Option } from "@/features/core/types/option.type";
import { format } from "date-fns";

interface Props {
  initialData: FinanceRecord[];
  categories: Option[];
}

const TransactionsPageClient = ({ initialData, categories }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

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

  return (
    <div className="grid grid-cols-1 gap-y-6">
      <FinanceFilterListForm categories={categories} onSearch={handleSearch}>
        <Button variant="default" className="w-full md:w-auto">
          Nuevo
        </Button>
      </FinanceFilterListForm>

      {/* TODO: Add DataTable component here */}
      <div className="text-sm text-muted-foreground">
        {initialData.length} transacciones encontradas
      </div>
    </div>
  );
};

export default TransactionsPageClient;
