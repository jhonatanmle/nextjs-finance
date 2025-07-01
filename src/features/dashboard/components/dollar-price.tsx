"use client";

import { DollarPrice } from "@/features/dollar-price/dollar-price.types";
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
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

type Props = {
  data?: DollarPrice[];
};

const DollarPriceMetrics = ({ data }: Props) => {
  const dataOrdered = [...(data ?? [])]?.sort(
    (a, b) => a.date.getTime() - b.date.getTime()
  );

  const chartData = dataOrdered.map((item) => ({
    price: item.amount,
    month: item.date.toLocaleDateString("es", { month: "long" }),
  }));

  const chartConfig = {
    price: {
      label: "Precio",
      color: "var(--primary)",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>USD / PEN</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="h-[250px] md:h-[300px] w-full"
        >
          <LineChart
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
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="price"
              type="natural"
              stroke="var(--color-price)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-price)",
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default DollarPriceMetrics;
