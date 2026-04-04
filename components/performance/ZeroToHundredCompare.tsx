"use client";

import { Trim } from "@/lib/Trim";
import { Delta, DeltaUnit } from "../Delta";

type Props = {
  trim: Trim;
  referenceTrim: Trim;
};

export function ZeroToHundredCompare({ trim, referenceTrim }: Props) {
  return (
    <div className="flex flex-row gap-1 w-full justify-center">
      {`${trim.performance?.to100} วินาที`}
      {trim !== referenceTrim && (
        <Delta
          value={trim.performance?.to100 ?? 0}
          referenceValue={referenceTrim.performance?.to100 ?? 0}
          reverse={true}
          unit={DeltaUnit.Time}
        />
      )}
    </div>
  );
}
