import financeApi from "@/features/finance/finance.api";
import { FilterForm } from "@/features/finance/schemas";
import TransactionsTableClient from "./transactions-table-client";
import { cache } from "react";

interface TransactionsTableProps {
  filters: FilterForm;
}

const getData = cache((filters: FilterForm) => financeApi.findAll(filters));

const TransactionsTable = async ({ filters }: TransactionsTableProps) => {
  const financeRecords = await getData(filters);

  return <TransactionsTableClient data={financeRecords} />;
};

export default TransactionsTable;
