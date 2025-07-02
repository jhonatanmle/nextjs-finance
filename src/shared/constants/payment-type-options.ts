import { Option } from "@/features/core/types/option.type";
import { ALL_OPTION_VALUE } from "./option";
import { PaymentType } from "@/features/core/types/payment-type";

export const PAYMENT_TYPE_OPTIONS: Option[] = [
  {
    label: "Débito",
    value: PaymentType.debit,
  },
  {
    label: "Crédito",
    value: PaymentType.credit,
  },
  {
    label: "Efectivo",
    value: PaymentType.cash,
  },
];

export const PAYMENT_TYPE_FILTER_OPTIONS: Option[] = [
  {
    label: "Todos",
    value: ALL_OPTION_VALUE,
  },
  ...PAYMENT_TYPE_OPTIONS,
];
