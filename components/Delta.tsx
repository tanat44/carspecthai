import {
  numberColorClassName,
  priceToText,
  trimTrailingZero,
} from "@/lib/utils";

export enum DeltaUnit {
  Distance,
  Baht,
  Time,
  Km,
}

type Props = {
  value: number;
  referenceValue: number;
  unit: DeltaUnit;
  reverse?: boolean;
  className?: string;
};

export function Delta({
  value,
  referenceValue,
  reverse = false,
  unit,
  className = "",
}: Props) {
  const diff = value - referenceValue;
  const sign = diff > 0 ? "+" : "-";
  const absDiff = Math.abs(diff);
  let suffix = "";
  let valueText = "";
  if (unit === DeltaUnit.Distance) {
    if (Math.floor(absDiff / 10) > 1) {
      valueText = trimTrailingZero((absDiff / 10).toFixed(2));
      suffix = " ซม";
    } else {
      valueText = absDiff.toFixed(0);
      suffix = " มม";
    }
  } else if (unit === DeltaUnit.Baht) {
    valueText = priceToText(absDiff);
  } else if (unit === DeltaUnit.Time) {
    valueText = trimTrailingZero(absDiff.toFixed(2));
    suffix = " วินาที";
  } else if (unit === DeltaUnit.Km) {
    valueText = absDiff.toFixed(0);
    suffix = " กม.";
  }
  let text = `(${sign}${valueText}${suffix})`;
  if (diff === 0) {
    text = "(เท่ากัน)";
  }

  return (
    <div
      className={`${numberColorClassName(reverse ? diff * -1 : diff)} ${className}`}
    >
      {text}
    </div>
  );
}
