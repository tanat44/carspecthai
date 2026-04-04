"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { MetricPoint } from "@/lib/Metric/types";

const chartConfig = {
  value: {
    label: "Value",
    color: "var(--chart-2)",
  },
  label: {
    color: "var(--background)",
  },
} satisfies ChartConfig;

type Props = {
  data: MetricPoint[];
};

export function RankPlot({ data }: Props) {
  const height = data.length * 20;

  return (
    <ChartContainer config={chartConfig} height={height}>
      <BarChart accessibilityLayer data={data} layout="vertical">
        <CartesianGrid horizontal={false} />
        <YAxis
          dataKey="carFullname"
          type="category"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
          hide
        />
        <XAxis dataKey="value" type="number" hide />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />
        <Bar dataKey="value" fill="var(--color-value)" radius={4}>
          <LabelList
            dataKey="carFullname"
            position="insideLeft"
            offset={8}
            className="fill-(--color-label)"
            fontSize={12}
          />
          <LabelList
            dataKey="value"
            position="right"
            offset={8}
            className="fill-foreground"
            fontSize={12}
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}
