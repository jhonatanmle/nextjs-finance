import { RecordType } from "@/features/core/types/record-type";
import financeRecordMapper from "@/features/finance/mapper/finance-record.mapper";
import financeTotalsMapper from "@/features/finance/mapper/finance-totals.mapper";
import { FilterForm } from "@/features/finance/schemas";
import { ALL_OPTION_VALUE } from "@/shared/constants/option";
import { supabaseServer } from "@/shared/lib/supabase/server";
import { endOfMonth, startOfMonth } from "date-fns";

const findAll = async (filters: FilterForm) => {
  const startDate = startOfMonth(filters.date).toISOString();
  const endDate = endOfMonth(filters.date).toISOString();

  const query = supabaseServer
    .from("FinanceRecord")
    .select(`*, Category (*), Subcategory (*), DollarPrice (*)`)
    .order("record_date", { ascending: false })
    .gte("record_date", startDate)
    .lt("record_date", endDate);

  if (filters?.paymentType && filters.paymentType !== ALL_OPTION_VALUE) {
    query.eq("payment_type", filters.paymentType);
  }

  if (filters?.category && filters.category !== ALL_OPTION_VALUE) {
    query.eq("category_id", filters.category);
  }

  const { data, error } = await query;

  if (error) {
    return [];
  }

  return financeRecordMapper.mapFrom(data);
};

const getMonthTotal = async (date: Date) => {
  const startDate = startOfMonth(date).toISOString();
  const endDate = endOfMonth(date).toISOString();

  const { data } = await supabaseServer
    .from("FinanceRecord")
    .select(`*, Category (*), Subcategory (*), DollarPrice (*)`)
    .order("record_date", { ascending: false })
    .gte("record_date", startDate)
    .lt("record_date", endDate)
    .eq("record_type", RecordType.expense);

  return financeTotalsMapper.mapFrom(data, date);
};

const financeApi = {
  findAll,
  getMonthTotal,
};

export default financeApi;
