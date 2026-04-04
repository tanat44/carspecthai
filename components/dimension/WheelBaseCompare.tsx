"use client";

import { DRAW_SCALE } from "@/lib/consts";
import { Trim } from "@/lib/Trim";
import { useEffect, useRef } from "react";
import { Delta, DeltaUnit } from "../Delta";
import { renderWheelBase } from "./renderWheelBase";

type Props = {
  trim: Trim;
  referenceTrim: Trim;
};

export function WheelBaseCompare({ trim, referenceTrim }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref) return;
    renderWheelBase(
      ref.current!,
      (trim.physical?.wheelbase ?? 0) * DRAW_SCALE,
      (referenceTrim.physical?.wheelbase ?? 0) * DRAW_SCALE,
      (trim.physical?.floorHeight ?? 0) * DRAW_SCALE,
      (referenceTrim.physical?.floorHeight ?? 0) * DRAW_SCALE,
    );
  }, [ref]);

  return (
    <div className="relative flex flex-col">
      <div className="flex flex-row gap-1 w-full justify-center">
        {`ฐานล้อ ${trim.physical?.wheelbase} มม`}
        {trim !== referenceTrim && (
          <Delta
            value={trim.physical?.wheelbase ?? 0}
            referenceValue={referenceTrim.physical?.wheelbase ?? 0}
            unit={DeltaUnit.Distance}
          />
        )}
      </div>
      <div className="flex flex-row gap-1 w-full justify-center">
        {`ความสูงใต้ท้อง ${trim.physical?.floorHeight ?? "-"} มม`}
        {trim !== referenceTrim &&
          trim.physical?.floorHeight &&
          referenceTrim.physical?.floorHeight && (
            <Delta
              value={trim.physical?.floorHeight ?? 0}
              referenceValue={referenceTrim.physical?.floorHeight ?? 0}
              unit={DeltaUnit.Distance}
            />
          )}
      </div>
      <div ref={ref} className="m-auto" />
    </div>
  );
}
