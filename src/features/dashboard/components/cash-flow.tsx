"use client";

import { CashflowData } from "@/features/core/types/cashflow.type";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/shared/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

type Props = {
  chartData: CashflowData[];
};

const Cashflow = ({ chartData }: Props) => {
  const chartConfig = {
    incomes: {
      label: "Ingresos",
      color: "var(--primary)",
    },
    expenses: {
      label: "Gastos",
      color: "#f87171",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Flujo de dinero</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="h-[250px] md:h-[300px] w-full"
        >
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="incomes" fill="var(--color-incomes)" radius={4} />
            <Bar dataKey="expenses" fill="var(--color-expenses)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default Cashflow;
