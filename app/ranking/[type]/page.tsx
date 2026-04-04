import { CarLibrary } from "@/lib/CarLibrary";
import { METRIC_TYPES, MetricPoint, MetricType } from "@/lib/Metric/types";
import { sortUndefined } from "@/lib/utils";
import { Ranking } from "../Ranking";

export default async function Page({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  const metricType = type as MetricType;
  const library = await CarLibrary.instance();

  const data: MetricPoint[] = library.rankedMatrics[metricType] ?? [];
  const newData = data.filter((x) => x.value && true);
  const sortData = sortUndefined(newData, "value", type === "accelTo100");

  return (
    <>
      <Ranking gallery={library.gallery} type={metricType} data={sortData} />
    </>
  );
}

export async function generateStaticParams() {
  return Object.keys(METRIC_TYPES).map((metric) => ({
    type: metric,
  }));
}
