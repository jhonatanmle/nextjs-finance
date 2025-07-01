import financeApi from "@/features/finance/finance.api";
import TotalCard from "@/shared/components/total-card";

const ExpensesTotalCard = async () => {
  const financeRecordTotal = await financeApi.getMonthTotal(new Date());

  return (
    <TotalCard title="Gastos" value={financeRecordTotal?.amount} prefix="S/" />
  );
};

export default ExpensesTotalCard;
