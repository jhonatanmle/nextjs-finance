import financeApi from "@/features/finance/finance.api";
import { FilterForm } from "@/features/finance/schemas";
import TransactionsTableClient from "./transactions-table-client";

interface TransactionsTableProps {
  filters: FilterForm;
}

const TransactionsTable = async ({ filters }: TransactionsTableProps) => {
  const financeRecords = await financeApi.findAll(filters);

  return <TransactionsTableClient data={financeRecords} />;
};

export default TransactionsTable;
