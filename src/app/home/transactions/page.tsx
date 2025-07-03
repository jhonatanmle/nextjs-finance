import { Suspense } from "react";
import { FilterForm } from "@/features/finance/schemas";
import TransactionsPageClient from "./page.client";
import TransactionsTable from "../../../features/finance/components/transactions-table";
import categoryApi from "@/features/category/category.api";
import { DataTableSkeleton } from "@/shared/components/datatable-skeleton";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const TransactionsPage = async ({ searchParams }: Props) => {
  const params = await searchParams;

  const filters: FilterForm = {
    date: params.date ? new Date(params.date as string) : new Date(),
    paymentType: params.paymentType as string | undefined,
    category: params.category as string | undefined,
  };

  const categories = await categoryApi.getOptions();

  const suspenseKey = `${filters.date.toISOString()}-${
    filters.paymentType ?? "all"
  }-${filters.category ?? "all"}`;

  return (
    <TransactionsPageClient categories={categories}>
      <Suspense
        key={suspenseKey}
        fallback={<DataTableSkeleton columnCount={6} />}
      >
        <TransactionsTable filters={filters} />
      </Suspense>
    </TransactionsPageClient>
  );
};

export default TransactionsPage;
