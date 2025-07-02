import { Suspense } from "react";
import DashboardMetrics from "@/features/dashboard/components/dashboard-metrics";
import TotalCardSkeleton from "@/shared/components/total-card-skeleton";
import Cashflow from "@/features/dashboard/components/cash-flow";
import dashboardApi from "@/features/dashboard/dashboard.api";
import Expenses from "@/features/dashboard/components/expenses";
import GoalsMetrics from "@/features/dashboard/components/goals-metrics";
import goalsApi from "@/features/goals/goals.api";
import RecentTransactions from "@/features/dashboard/components/recent-transactions";
import financeApi from "@/features/finance/finance.api";
import DollarPriceMetrics from "@/features/dashboard/components/dollar-price";
import dollarPriceApi from "@/features/dollar-price/dollar-price.api";

const DashboardPage = async () => {
  const [cashflowData, goalsData, recentTransactions, dollarPriceMetrics] =
    await Promise.all([
      dashboardApi.cashflow(),
      goalsApi.findAllWithTransactions(),
      financeApi.lastRecords(),
      dollarPriceApi.getAll(),
    ]);

  return (
    <div className="grid grid-cols-1 gap-y-4">
      <Suspense
        fallback={
          <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 flex-1">
            <TotalCardSkeleton />
            <TotalCardSkeleton />
            <TotalCardSkeleton />
            <TotalCardSkeleton />
          </section>
        }
      >
        <DashboardMetrics />
      </Suspense>
      <br />
      <section>
        <Suspense fallback={<TotalCardSkeleton />}>
          <Cashflow chartData={cashflowData} />
        </Suspense>
      </section>
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Expenses className="lg:col-span-2" chartData={cashflowData} />
        <GoalsMetrics data={goalsData} />
        <RecentTransactions
          data={recentTransactions}
          className="lg:col-span-2"
        />
        <DollarPriceMetrics data={dollarPriceMetrics} />
      </section>
    </div>
  );
};

export default DashboardPage;
