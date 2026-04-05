"use client";

import { Header } from "@/components/Header";
import { RankPlot } from "@/components/metric/RankPlot";
import { Gallery } from "@/lib/Gallery";
import { METRIC_TYPES, MetricPoint, MetricType } from "@/lib/Metric/types";
import { sortUndefined } from "@/lib/utils";
import { useState } from "react";
import { FieldCheckbox } from "./FieldCheckbox";
import { MetricTypeButtons } from "./metric/MetricTypeButtons";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";

type Props = {
  gallery: Gallery;
  type: MetricType;
  data: MetricPoint[];
};

export function Ranking({ gallery, type, data }: Props) {
  const [plotData, setPlotData] = useState<MetricPoint[]>(data);

  function metricPerPrice(enable: boolean) {
    if (!enable) {
      setPlotData(data);
      return;
    }

    const newData = data.map((dataPoint) => {
      const newPoint = { ...dataPoint };
      if (newPoint.valueNormalize === undefined) newPoint.value = 0;
      if (newPoint.price) {
        newPoint.value =
          (1e6 * (newPoint.valueNormalize ?? 0)) / newPoint.price;
      } else {
        newPoint.value = 0;
      }
      newPoint.value = parseFloat(newPoint.value.toFixed(2));
      return newPoint;
    });
    setPlotData(newData);
  }

  function sortPlotData() {
    const newData = [...plotData];
    setPlotData(sortUndefined(newData, "value", true));
  }

  return (
    <div className="w-full p-10 flex flex-col gap-4">
      <Header className="flex flex-col items-center">
        <h1 className="leading-tighter text-2xl font-semibold tracking-tight text-balance lg:leading-[1.1] lg:font-semibold xl:text-2xl xl:tracking-tighter max-w-4xl m-auto">
          จัดอันดับ{METRIC_TYPES[type]}
        </h1>
      </Header>
      <Card>
        <CardContent>
          <MetricTypeButtons value={type} />
        </CardContent>
        {type !== "price" && (
          <CardFooter className="flex flex-row py-2">
            <FieldCheckbox
              title="คำนวณต่อราคา"
              onCheckedChange={metricPerPrice}
            />
            <Button onClick={sortPlotData} variant="outline">
              เรียงลำดับ
            </Button>
          </CardFooter>
        )}
      </Card>
      <RankPlot data={plotData} />
    </div>
  );
}
