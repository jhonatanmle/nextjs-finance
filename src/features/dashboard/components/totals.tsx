"use client";

import { FinanceRecordTotal } from "@/features/finance/types";
import TotalCard from "@/shared/components/total-card";

type Props = {
  financeRecordTotal: FinanceRecordTotal;
};

const Totals = ({ financeRecordTotal }: Props) => {
  // const { dollarPrice } = useDollarStore();
  // const { config } = useInvestementStore();

  // const { data: portfolio, isLoading: loadingPortfolio } = useQuery({
  //   queryKey: [QUERY_KEYS.stockEventsHoldingView],
  //   queryFn: () => {
  //     return stockEventsService.holdingView(config);
  //   },
  //   enabled: !!config,
  // });

  // const { data: financeRecordTotal, isLoading: loadingFinanceRecordTotal } =
  //   useQuery({
  //     queryKey: [QUERY_KEYS.financeRecordTotals],
  //     queryFn: () => {
  //       return financeRecordService.getMonthTotal(new Date());
  //     },
  //   });

  // const { data: totalBank, isLoading: loadingBankData } = useQuery({
  //   queryKey: [QUERY_KEYS.bankTotal],
  //   queryFn: () => {
  //     return bankService.getTotal();
  //   },
  // });

  // const portfolioTotal = useMemo(() => {
  //   return portfolio?.amount && dollarPrice
  //     ? portfolio.amount * dollarPrice
  //     : 0;
  // }, [portfolio?.amount, dollarPrice]);

  // const totalBalance = useMemo(() => {
  //   return (totalBank ?? 0) + portfolioTotal;
  // }, [totalBank, portfolioTotal]);

  return (
    <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 flex-1">
      {/* <TotalCard
        title="Balance total"
        value={100}
        prefix="S/"
        loading={false}
      /> */}
      {/* <TotalCard
        title="Balance total"
        value={totalBalance}
        prefix="S/"
        loading={loadingPortfolio || loadingBankData}
      /> */}
      {/* <TotalCard
        title="Banco"
        value={totalBank}
        prefix="S/"
        loading={loadingBankData}
      /> */}
      {/* <TotalCard
        title="Inversiones"
        value={portfolioTotal}
        prefix="S/"
        loading={loadingPortfolio}
      /> */}
      <TotalCard
        title="Gastos"
        value={financeRecordTotal?.amount}
        prefix="S/"
      />
      {/* <TotalCard
        title="Gasto crédito del mes"
        value={financeRecordTotal?.creditAmount}
        loading={loadingFinanceRecordTotal}
        prefix="S/"
      /> */}
    </section>
  );
};

export default Totals;
