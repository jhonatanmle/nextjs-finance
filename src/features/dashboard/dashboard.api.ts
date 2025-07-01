import { cashflowMapper } from "@/features/dashboard/mappers/cashflow.mapper";
import dollarPriceApi from "@/features/dollar-price/dollar-price.api";
import { supabaseServer } from "@/shared/lib/supabase/server";
import { SupabaseFinanceRecordListItem } from "@/shared/lib/supabase/tables";

const cashflow = async () => {
  const dollarPrice = await dollarPriceApi.getExternalPrice();

  const { data: financeData, error: financeError } = await supabaseServer
    .from("FinanceRecord")
    .select("*, DollarPrice (*)");

  const { data: bankData, error: bankError } = await supabaseServer
    .from("BankRecord")
    .select("*, DollarPrice (*)");

  const { data: dividendData, error: dividendError } = await supabaseServer
    .from("Dividends")
    .select("*");

  if (financeError || bankError || dividendError) {
    throw new Error(
      financeError?.message || bankError?.message || dividendError?.message
    );
  }

  const financeRecords = cashflowMapper.mapFromFinance(
    financeData as SupabaseFinanceRecordListItem[]
  );
  const bankRecords = cashflowMapper.mapFromBank(bankData);
  const dividendRecords = cashflowMapper.mapFromDividends(
    dividendData,
    dollarPrice
  );

  const data = [...financeRecords, ...bankRecords, ...dividendRecords];

  return cashflowMapper.mapFrom(data);
};

const dashboardApi = {
  cashflow,
};

export default dashboardApi;
