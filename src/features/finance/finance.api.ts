import { RecordType } from "@/features/core/types/record-type";
import financeRecordMapper from "@/features/finance/mapper/finance-record.mapper";
import financeTotalsMapper from "@/features/finance/mapper/finance-totals.mapper";
import { FilterForm, FinanceFormValues } from "@/features/finance/schemas";
import { ALL_OPTION_VALUE } from "@/shared/constants/option";
import { createSupabaseServerClient } from "@/shared/lib/supabase/server";
import { endOfMonth, startOfMonth } from "date-fns";

const findAll = async (filters: FilterForm) => {
  const supabase = await createSupabaseServerClient();
  const startDate = startOfMonth(filters.date).toISOString();
  const endDate = endOfMonth(filters.date).toISOString();

  const query = supabase
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
  const supabase = await createSupabaseServerClient();
  const startDate = startOfMonth(date).toISOString();
  const endDate = endOfMonth(date).toISOString();

  const { data } = await supabase
    .from("FinanceRecord")
    .select(`*, Category (*), Subcategory (*), DollarPrice (*)`)
    .order("record_date", { ascending: false })
    .gte("record_date", startDate)
    .lt("record_date", endDate)
    .eq("record_type", RecordType.expense);

  return financeTotalsMapper.mapFrom(data, date);
};

const lastRecords = async () => {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("FinanceRecord")
    .select(`*, Category (*), Subcategory (*), DollarPrice (*)`)
    .limit(4)
    .order("record_date", { ascending: false });

  if (error) {
    return [];
  }

  return financeRecordMapper.mapFrom(data);
};

const create = async (values: FinanceFormValues) => {
  const supabase = await createSupabaseServerClient();

  const financeRecord = financeRecordMapper.mapTo(values);

  const { data, error } = await supabase
    .from("FinanceRecord")
    .insert(financeRecord)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const update = async (id: number, values: FinanceFormValues) => {
  const supabase = await createSupabaseServerClient();

  const financeRecord = financeRecordMapper.mapTo(values);

  const { data, error } = await supabase
    .from("FinanceRecord")
    .update(financeRecord)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const deleteRecord = async (id: number) => {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.from("FinanceRecord").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  return true;
};

const financeApi = {
  findAll,
  getMonthTotal,
  lastRecords,
  create,
  update,
  delete: deleteRecord,
};

export default financeApi;
