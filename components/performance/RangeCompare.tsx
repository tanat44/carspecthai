"use client";

import { Trim } from "@/lib/Trim";
import { Delta, DeltaUnit } from "../Delta";

type Props = {
  trim: Trim;
  referenceTrim: Trim;
};

const containerClass = "flex flex-row gap-1 w-full justify-center";

export function RangeCompare({ trim, referenceTrim }: Props) {
  if (!trim.rangeWltp) return <div className={containerClass}>-</div>;

  return (
    <div className={containerClass}>
      {`${trim.rangeWltp} กม.`}
      {trim !== referenceTrim && (
        <Delta
          value={trim.rangeWltp ?? 0}
          referenceValue={referenceTrim.rangeWltp ?? 0}
          unit={DeltaUnit.Km}
        />
      )}
    </div>
  );
}
