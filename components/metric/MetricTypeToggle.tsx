import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { METRIC_TYPES, MetricType } from "@/lib/Metric/types";

type Props = {
  value: MetricType;
  onChange: (type: MetricType) => void;
};

export function MetricTypeToggle({ value, onChange }: Props) {
  return (
    <ToggleGroup
      value={[value as string]}
      variant="outline"
      onValueChange={(value: string[]) => onChange(value[0] as MetricType)}
    >
      {Object.keys(METRIC_TYPES).map((metric) => (
        <ToggleGroupItem
          key={metric}
          value={metric}
          aria-label={`toggle ${metric}`}
        >
          {METRIC_TYPES[metric as MetricType]}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
