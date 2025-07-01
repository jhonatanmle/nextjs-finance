import bankApi from "@/features/bank/bank.api";
import TotalCard from "@/shared/components/total-card";

const getInvestmentTotal = async (): Promise<number> => {
  await new Promise((resolve) => setTimeout(resolve, 1200));
  return 8500;
};

const BalanceTotalCard = async () => {
  const [bankTotal, investmentTotal] = await Promise.all([
    bankApi.getTotal(),
    getInvestmentTotal(),
  ]);

  const totalBalance = bankTotal + investmentTotal;

  return <TotalCard title="Balance total" value={totalBalance} prefix="S/" />;
};

export default BalanceTotalCard;
