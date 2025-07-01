import Totals from "@/features/dashboard/components/totals";
import financeApi from "@/features/finance/api";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

const DashboardPage = async () => {
  const financeRecordTotal = await financeApi.getMonthTotal(new Date());

  return (
    <div className="grid grid-cols-1 gap-y-4">
      <Totals financeRecordTotal={financeRecordTotal} />
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
