import { CurrencyType } from "@/features/core/types/currency.type";
import { RecordType } from "@/features/core/types/record-type";
import { FinanceRecord } from "@/features/finance/schemas";
import { cn } from "@/shared/lib/utils";

type Props = {
  record: Partial<FinanceRecord>;
  hasSymbol?: boolean;
};

const AmountCell = ({ record, hasSymbol = true }: Props) => {
  const recordType = record.recordType === RecordType.expense;
  const isPEN = record.currencyType === CurrencyType.PEN;
  const symbol = recordType ? "-" : "+";
  const currency = isPEN ? "" : `(${record.baseAmount} USD)`;

  return (
    <div>
      <div className={cn(!recordType ? "text-green-500" : "")}>
        {hasSymbol ? (record.amount !== 0 ? symbol : "") : ""}S/{record.amount}{" "}
      </div>
      <p className="text-gray-400 text-[12px]">{currency}</p>
    </div>
  );
};

export default AmountCell;
