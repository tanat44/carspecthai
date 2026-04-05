import { CarLibrary } from "@/lib/CarLibrary";
import { METRIC_TYPES, MetricPoint, MetricType } from "@/lib/Metric/types";
import { sortUndefined } from "@/lib/utils";
import { Metadata } from "next";
import { Ranking } from "../../../components/Ranking";

type Props = {
  type: string;
};

export default async function Page({ params }: { params: Promise<Props> }) {
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

export async function generateMetadata({
  params,
}: {
  params: Promise<Props>;
}): Promise<Metadata> {
  const { type } = await params;
  const metricText = METRIC_TYPES[type as MetricType];
  const lib = await CarLibrary.instance();
  const manufactures: string[] = [];
  for (const key in lib.byManufacture) {
    manufactures.push(key);
  }

  // add metadata
  const title = `จัดอันดับรถตาม${metricText}`;
  const keywords: string[] = ["จัดอันดับรถทุกรุ่นในเมืองไทย"];
  for (const [key, value] of Object.entries(METRIC_TYPES)) {
    keywords.push(`จัดอันดับตาม${value}`);
  }

  // post processing
  const manufactureText = manufactures.reduce(
    (prev, current) => (prev += current + " "),
  );
  const description = `${title} จากข้อมูลรถยนต์ทุกค่าย ${manufactureText}`;

  return {
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    description,
    keywords,
  };
}
