import financeApi from "@/features/finance/finance.api";
import { FilterForm } from "@/features/finance/schemas";
import TransactionsPageClient from "./page.client";
import categoryApi from "@/features/category/category.api";

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const TransactionsPage = async ({ searchParams }: Props) => {
  const params = await searchParams;

  const filters: FilterForm = {
    date: params.date ? new Date(params.date as string) : new Date(),
    paymentType: params.paymentType as string | undefined,
    category: params.category as string | undefined,
  };

  const [financeRecords, categories] = await Promise.all([
    financeApi.findAll(filters),
    categoryApi.getOptions(),
  ]);

  return (
    <TransactionsPageClient
      initialData={financeRecords}
      categories={categories}
    />
  );
};

export default TransactionsPage;
