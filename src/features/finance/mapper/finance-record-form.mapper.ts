import { CurrencyType } from "@/features/core/types/currency.type";
import { PaymentType } from "@/features/core/types/payment-type";
import { FinanceFormValues, FinanceRecord } from "@/features/finance/schemas";
import { ALL_OPTION_VALUE } from "@/shared/constants/option";

const mapFrom = (data: FinanceRecord): FinanceFormValues => {
  return {
    date: new Date(data.recordDate!),
    categoryId: data.categoryId.toString(),
    subcategoryId: data.subcategoryId.toString(),
    amount:
      data.currencyType === CurrencyType.PEN ? data.amount! : data.baseAmount,
    paymentType: data.paymentType as PaymentType,
    comment: data.comment,
    currencyType: data.currencyType,
    recordType: data.recordType,
    goalId: data.goalId ? data.goalId.toString() : ALL_OPTION_VALUE,
    goalNetAmount: data.goalNetAmount ?? undefined,
  };
};

export const financeRecordForm = {
  mapFrom,
};
