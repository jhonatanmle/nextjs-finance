import { Bank } from "@/features/bank/bank.schemas";
import { BankRecordType } from "@/features/bank/bank.types";
import { CurrencyType } from "@/features/core/types/currency.type";
import { AmountUtils } from "@/shared/lib/amount";
import { SupabaseBankRecordListItem } from "@/shared/lib/supabase/tables";
import { validateArray } from "@/shared/lib/utils";

const mapFrom = (data: SupabaseBankRecordListItem[]): Bank[] => {
  if (!validateArray(data)) {
    return [];
  }

  return data.map<Bank>((item) => ({
    id: item.id,
    baseAmount: item.amount!,
    amount: AmountUtils.round(
      item.currency_type === CurrencyType.PEN
        ? item.amount!
        : item.amount! * (item.DollarPrice?.amount ?? 0)
    ),
    createdAt: new Date(item.created_at),
    recordType: item.bank_record_type
      ? (item.bank_record_type as BankRecordType)
      : BankRecordType.deposit,
    comment: item.comment ?? "",
    currencyType: item.currency_type as CurrencyType,
  }));
};

export const bankRecordMapper = {
  mapFrom,
};
