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
import { cn } from "@/shared/lib/utils";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

type Props = React.ComponentProps<"div"> & {
  chartData: CashflowData[];
};

const Expenses = ({ chartData, className }: Props) => {
  const chartConfig = {
    expenses: {
      label: "Gastos",
      color: "var(--primary)",
    },
  } satisfies ChartConfig;

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>Histórico de gastos</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="h-[250px] md:h-[300px] w-full"
        >
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="expenses"
              type="natural"
              fill="var(--color-expenses)"
              fillOpacity={0.4}
              stroke="var(--color-expenses)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default Expenses;
