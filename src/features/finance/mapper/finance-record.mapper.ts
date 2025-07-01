import { CurrencyType } from "@/features/core/types/currency.type";
import { RecordType } from "@/features/core/types/record-type";
import { FinanceRecord } from "@/features/finance/schemas";
import { ALL_OPTION_VALUE } from "@/shared/constants/option";
import { AmountUtils } from "@/shared/lib/amount";
import { SupabaseFinanceRecordListItem } from "@/shared/lib/supabase/tables";
import { validateArray } from "@/shared/lib/utils";
import { format } from "date-fns";

const mapFrom = (
  data: Partial<SupabaseFinanceRecordListItem>[]
): FinanceRecord[] => {
  if (!validateArray(data)) {
    return [];
  }

  const result = data.map<FinanceRecord>((item) => ({
    id: item.id!,
    amount: AmountUtils.round(
      item.currency_type === CurrencyType.PEN
        ? item.amount!
        : item.amount! * (item.DollarPrice?.amount ?? 0)
    ),
    createdAt: new Date(item.created_at!),
    recordDate: new Date(item.record_date!),
    recordDateFormat: format(item.record_date!, "dd/MM/yyyy"),
    baseAmount: item.amount!,
    category: item.Category?.name ?? "",
    categoryId: item.Category?.id ?? 0,
    paymentType: item.payment_type ?? "",
    subcategory: item.Subcategory?.name ?? "",
    subcategoryId: item.Subcategory?.id ?? 0,
    currencyType: item.currency_type
      ? (item.currency_type as CurrencyType)
      : CurrencyType.PEN,
    bgCategory: item.Category?.background_color ?? "",
    comment: item.comment ?? "",
    dollarPrice:
      item.currency_type !== CurrencyType.PEN ? item.DollarPrice!.amount! : 0,
    recordType: item.record_type
      ? (item.record_type as RecordType)
      : RecordType.expense,
    goalId:
      item.goal_id && item.goal_id?.toString() !== ALL_OPTION_VALUE
        ? item.goal_id
        : undefined,
    goalNetAmount: item.goal_net_amount ?? 0,
  }));

  return result;
};

const financeRecordMapper = {
  mapFrom,
};

export default financeRecordMapper;
