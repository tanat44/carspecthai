"use client";

import { Header } from "@/components/Header";
import { MetricTypeToggle } from "@/components/metric/MetricTypeToggle";
import { RankPlot } from "@/components/metric/RankPlot";
import { Gallery } from "@/lib/Gallery";
import { METRIC_TYPES, MetricPoint, MetricType } from "@/lib/Metric/types";
import { useRouter } from "next/navigation";

type Props = {
  gallery: Gallery;
  type: MetricType;
  data: MetricPoint[];
};

export function Ranking({ gallery, type, data }: Props) {
  const router = useRouter();

  function typeChange(type: MetricType) {
    if (!type) return;
    router.push(`/ranking/${type}`);
  }

  return (
    <div className="w-full p-10 flex flex-col gap-2">
      <Header className="flex flex-col items-center">
        <h1 className="leading-tighter text-2xl font-semibold tracking-tight text-balance lg:leading-[1.1] lg:font-semibold xl:text-2xl xl:tracking-tighter max-w-4xl m-auto">
          จัดอันดับ{METRIC_TYPES[type]}
        </h1>
        <MetricTypeToggle value={type} onChange={typeChange} />
      </Header>
      <RankPlot data={data} />
    </div>
  );
}
