import bankApi from "@/features/bank/bank.api";
import dollarPriceApi from "@/features/dollar-price/dollar-price.api";
import financeApi from "@/features/finance/finance.api";
import stockEventsApi from "@/features/stock-events/stock-events.api";
import TotalCard from "@/shared/components/total-card";

const DashboardMetrics = async () => {
  const walletConfig = await stockEventsApi.getUserWallet();

  const [bankTotal, portfolio, dollarPrice, financeRecordTotal] =
    await Promise.all([
      bankApi.getTotal(),
      walletConfig ? stockEventsApi.holdingView(walletConfig) : null,
      dollarPriceApi.getExternalPrice(),
      financeApi.getMonthTotal(new Date()),
    ]);

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
