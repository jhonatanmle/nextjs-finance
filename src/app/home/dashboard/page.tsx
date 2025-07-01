import { Suspense } from "react";
import BalanceTotalCard from "@/features/dashboard/components/balance-total-card";
import BankTotalCard from "@/features/dashboard/components/bank-total-card";
import ExpensesTotalCard from "@/features/dashboard/components/expenses-total-card";
import InvestmentTotalCard from "@/features/dashboard/components/investment-total-card";
import TotalCardSkeleton from "@/shared/components/total-card-skeleton";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

const DashboardPage = async () => {
  return (
    <div className="grid grid-cols-1 gap-y-4">
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 flex-1">
        <Suspense fallback={<TotalCardSkeleton />}>
          <BalanceTotalCard />
        </Suspense>
        <Suspense fallback={<TotalCardSkeleton />}>
          <BankTotalCard />
        </Suspense>
        <Suspense fallback={<TotalCardSkeleton />}>
          <InvestmentTotalCard />
        </Suspense>
        <Suspense fallback={<TotalCardSkeleton />}>
          <ExpensesTotalCard />
        </Suspense>
      </section>
      <br />
      <section>{/* <CashflowPartial /> */}</section>
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* <Expenses className="lg:col-span-2" /> */}
        <Card>
          <CardHeader>
            <CardTitle>Objetivos de ahorro</CardTitle>
          </CardHeader>
          <CardContent>{/* <GoalsMetrics className="mt-2" /> */}</CardContent>
        </Card>
        {/* <RecentTransactions className="lg:col-span-2" /> */}
        {/* <DollarPrice /> */}
      </section>
    </div>
  );
};

export default DashboardPage;
