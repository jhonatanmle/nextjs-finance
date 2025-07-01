import { BankRecordType } from "@/features/bank/bank.types";
import {
  CashflowData,
  CashflowFormattedData,
} from "@/features/core/types/cashflow.type";
import { CurrencyType } from "@/features/core/types/currency.type";
import { RecordType } from "@/features/core/types/record-type";
import { AmountUtils } from "@/shared/lib/amount";
import {
  SupabaseBankRecordListItem,
  SupabaseFinanceRecordListItem,
} from "@/shared/lib/supabase/tables";
import { Tables } from "@/shared/lib/supabase/types";
import { format, startOfMonth } from "date-fns";
import { es } from "date-fns/locale";

const mapFromFinance = (
  data: SupabaseFinanceRecordListItem[]
): CashflowFormattedData[] => {
  return data?.map((record) => ({
    date: new Date(record.record_date!),
    amount: AmountUtils.round(
      record.currency_type === CurrencyType.PEN
        ? record.amount!
        : record.amount! * (record.DollarPrice?.amount ?? 0)
    ),
    recordType: record.record_type as string,
  }));
};

const mapFromBank = (
  data: SupabaseBankRecordListItem[]
): CashflowFormattedData[] => {
  return data?.map((record) => ({
    date: new Date(record.created_at),
    amount: AmountUtils.round(
      record.currency_type === CurrencyType.PEN
        ? record.amount!
        : record.amount! * (record.DollarPrice?.amount ?? 0)
    ),
    recordType: record.bank_record_type as string,
  }));
};

const mapFromDividends = (
  data: Tables<"Dividends">[],
  dollarPrice: number
): CashflowFormattedData[] => {
  return data?.map((record) => ({
    date: new Date(record.created_at),
    amount: record.net_amount! * dollarPrice,
    recordType: RecordType.income as string,
  }));
};

const mapFrom = (data: CashflowFormattedData[]) => {
  try {
    const groupedData = data
      .reduce<CashflowData[]>((acc, record) => {
        const monthYear = format(record.date, "MM/yyyy");

        let index = acc.findIndex((item) => item.monthYear === monthYear);

        if (index === -1) {
          acc.push({
            month: format(record.date, "MMMM", { locale: es }),
            monthYear,
            incomes: 0,
            expenses: 0,
            date: startOfMonth(record.date),
          });
          index = acc.length - 1;
        }

        if (
          record.recordType === RecordType.income ||
          record.recordType === BankRecordType.interest
        ) {
          acc[index].incomes += record.amount ?? 0;
        } else if (record.recordType === RecordType.expense) {
          acc[index].expenses += record.amount ?? 0;
        }

        return acc;
      }, [])
      .filter((item) => item.expenses > 0 && item.incomes >= 0)
      .sort((a, b) => a.date.getTime() - b.date.getTime());

    return groupedData;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const cashflowMapper = {
  mapFromFinance,
  mapFromBank,
  mapFromDividends,
  mapFrom,
};
