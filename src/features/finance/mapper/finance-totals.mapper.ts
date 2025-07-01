import { CurrencyType } from "@/features/core/types/currency.type";
import { PaymentType } from "@/features/core/types/payment-type";
import { FinanceRecordTotal } from "@/features/finance/types";
import { AmountUtils } from "@/shared/lib/amount";
import { SupabaseFinanceRecordListItem } from "@/shared/lib/supabase/tables";
import { validateArray } from "@/shared/lib/utils";
import { endOfMonth, startOfMonth } from "date-fns";

const mapFrom = (
  data: SupabaseFinanceRecordListItem[] | null,
  filterDate: Date
): FinanceRecordTotal => {
  if (!validateArray(data)) {
    return {
      amount: 0,
      creditAmount: 0,
      creditToPay: 0,
    };
  }

  const startDate = startOfMonth(filterDate);
  const endDate = endOfMonth(filterDate);

  const total = data!.reduce((acc, cur) => {
    return (acc += convertAmount(cur) ?? 0);
  }, 0);

  const creditAmount = data!.reduce((acc, cur) => {
    if (
      cur.payment_type === PaymentType.credit &&
      new Date(cur.record_date!) >= startDate &&
      new Date(cur.record_date!) <= endDate
    ) {
      return (acc += convertAmount(cur) ?? 0);
    }
    return acc;
  }, 0);

  const creditToPay = data!.reduce((acc, cur) => {
    if (
      cur.payment_type === PaymentType.credit &&
      new Date(cur.record_date!) >= startDate &&
      new Date(cur.record_date!) <= endDate
    ) {
      return (acc += convertAmount(cur) ?? 0);
    }
    return acc;
  }, 0);

  return {
    amount: total,
    creditAmount,
    creditToPay,
  };
};

const convertAmount = (data: SupabaseFinanceRecordListItem) => {
  try {
    if (data?.currency_type === CurrencyType.USD) {
      return AmountUtils.round(data.amount! * (data?.DollarPrice!.amount ?? 1));
    }

    return AmountUtils.round(data.amount!);
  } catch (error) {
    console.error(error);
    return 0;
  }
};

const financeTotalsMapper = {
  mapFrom,
};

export default financeTotalsMapper;
