import { numberColorClassName } from "@/lib/utils";

type Props = {
  value: number;
  referenceValue: number;
  reverse?: boolean;
  suffix?: string;
  className?: string;
};

export function Delta({
  value,
  referenceValue,
  reverse = false,
  suffix,
  className = "",
}: Props) {
  const diff = value - referenceValue;
  const sign = diff > 0 ? "+" : "-";
  let text = `(${sign}${Math.abs(diff)}${suffix && ` ${suffix}`})`;
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
