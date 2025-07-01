import TotalCard from "@/shared/components/total-card";

// Mock API call - replace with actual investment API
const getInvestmentTotal = async (): Promise<number> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return 8500; // Mock value
};

const InvestmentTotalCard = async () => {
  const investmentTotal = await getInvestmentTotal();

  return <TotalCard title="Inversiones" value={investmentTotal} prefix="S/" />;
};

export default InvestmentTotalCard;
