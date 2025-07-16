import { HoldingView } from "@/features/stock-events/stock-events.types";
import TotalCard from "@/shared/components/total-card";

type Props = {
  bankTotal: number;
  portfolio: HoldingView | null;
  dollarPrice: number;
  financeRecordTotal?: { amount: number };
};

const DashboardMetrics = async ({
  bankTotal,
  dollarPrice,
  portfolio,
  financeRecordTotal,
}: Props) => {
  const portfolioTotal =
    portfolio?.amount && dollarPrice ? portfolio.amount * dollarPrice : 0;
  const totalBalance = bankTotal + portfolioTotal;

  return (
    <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 flex-1">
      <TotalCard title="Balance total" value={totalBalance} prefix="S/" />
      <TotalCard title="Banco" value={bankTotal} prefix="S/" />
      <TotalCard title="Inversiones" value={portfolioTotal} prefix="S/" />
      <TotalCard
        title="Gastos"
        value={financeRecordTotal?.amount}
        prefix="S/"
      />
    </section>
  );
};

export default DashboardMetrics;
