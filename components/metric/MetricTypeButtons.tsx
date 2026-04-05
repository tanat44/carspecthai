import { METRIC_TYPES, MetricType } from "@/lib/Metric/types";
import { ButtonLink } from "../ButtonLink";

type Props = {
  value: MetricType;
};

export function MetricTypeButtons({ value }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {Object.keys(METRIC_TYPES).map((metric) => (
        <ButtonLink
          variant={value === metric ? "default" : "outline"}
          key={metric}
          href={`/ranking/${metric}`}
        >
          {METRIC_TYPES[metric as MetricType]}
        </ButtonLink>
      ))}
    </div>
  );
}
