import { CurrencyType } from "@/features/core/types/currency.type";
import { Option } from "@/features/core/types/option.type";
import { ALL_OPTION_VALUE } from "@/shared/constants/option";

export const CURRENCY_OPTIONS: Option[] = [
  {
    label: "PEN",
    value: CurrencyType.PEN,
  },
  {
    label: "USD",
    value: CurrencyType.USD,
  },
];

export const CURRENCY_FILTER_OPTIONS: Option[] = [
  {
    label: "Todos",
    value: ALL_OPTION_VALUE,
  },
  ...CURRENCY_OPTIONS,
];
