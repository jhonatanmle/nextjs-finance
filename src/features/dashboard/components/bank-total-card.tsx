import bankApi from "@/features/bank/bank.api";
import TotalCard from "@/shared/components/total-card";

const BankTotalCard = async () => {
  const bankTotal = await bankApi.getTotal();

  return <TotalCard title="Banco" value={bankTotal} prefix="S/" />;
};

export default BankTotalCard;
