import { Option } from "@/features/core/types/option.type";
import { RecordType } from "@/features/core/types/record-type";

export const RECORD_TYPE_OPTIONS: Option[] = [
  {
    label: "Gasto",
    value: RecordType.expense,
  },
  {
    label: "Ingreso",
    value: RecordType.income,
  },
];
