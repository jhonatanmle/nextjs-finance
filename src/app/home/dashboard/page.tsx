import { Suspense, cache } from "react";
import DashboardMetrics from "@/features/dashboard/components/dashboard-metrics";
import TotalCardSkeleton from "@/shared/components/total-card-skeleton";
import Cashflow from "@/features/dashboard/components/cash-flow";
import dashboardApi from "@/features/dashboard/dashboard.api";
import Expenses from "@/features/dashboard/components/expenses";
import GoalsMetrics from "@/features/dashboard/components/goals-metrics";
import goalsApi from "@/features/goals/goals.api";
import financeApi from "@/features/finance/finance.api";
import DollarPriceMetrics from "@/features/dashboard/components/dollar-price";
import dollarPriceApi from "@/features/dollar-price/dollar-price.api";
import { DynamicRecentTransactions } from "@/features/dashboard/components/recent-transactions";
import stockEventsApi from "@/features/stock-events/stock-events.api";
import bankApi from "@/features/bank/bank.api";

const getCachedData = cache(async () => {
  const walletConfig = await stockEventsApi.getUserWallet();
  const [
    cashflowData,
    goalsData,
    recentTransactions,
    dollarPriceMetrics,
    bankTotal,
    portfolio,
    dollarPrice,
    financeRecordTotal,
  ] = await Promise.all([
    dashboardApi.cashflow(),
    goalsApi.findAllWithTransactions(),
    financeApi.lastRecords(),
    dollarPriceApi.getAll(),
    bankApi.getTotal(),
    walletConfig ? stockEventsApi.holdingView(walletConfig) : null,
    dollarPriceApi.getExternalPrice(),
    financeApi.getMonthTotal(new Date()),
  ]);

  return {
    cashflowData,
    goalsData,
    recentTransactions,
    dollarPriceMetrics,
    bankTotal,
    portfolio,
    dollarPrice,
    financeRecordTotal,
  };
});

const DashboardPage = async () => {
  const {
    cashflowData,
    goalsData,
    recentTransactions,
    dollarPriceMetrics,
    bankTotal,
    portfolio,
    dollarPrice,
    financeRecordTotal,
  } = await getCachedData();

  return (
    <div className="grid grid-cols-1 gap-y-4">
      <DashboardMetrics
        bankTotal={bankTotal}
        portfolio={portfolio}
        dollarPrice={dollarPrice}
        financeRecordTotal={financeRecordTotal}
      />
      <br />
      <section>
        <Suspense fallback={<TotalCardSkeleton />}>
          <Cashflow chartData={cashflowData} />
        </Suspense>
      </section>
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Expenses className="lg:col-span-2" chartData={cashflowData} />
        <GoalsMetrics data={goalsData} />
        <DynamicRecentTransactions
          data={recentTransactions}
          className="lg:col-span-2"
        />
        <DollarPriceMetrics data={dollarPriceMetrics} />
      </section>
    </div>
  );
};

export default DashboardPage;
