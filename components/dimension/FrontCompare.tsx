"use client";

import { Trim } from "@/lib/Trim";
import { useEffect, useRef } from "react";
import { Delta, DeltaUnit } from "../Delta";
import { renderSizeCompare } from "./renderSizeCompare";

type Props = {
  trim: Trim;
  referenceTrim: Trim;
  showReference: boolean;
};

export function FrontCompare({ trim, referenceTrim, showReference }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref) return;
    renderSizeCompare(
      ref.current!,
      trim.canvasFrontSize,
      referenceTrim.canvasFrontSize,
      showReference,
    );
  }, [ref]);

  return (
    <div className="relative">
      <div ref={ref} className="flex justify-center" />
      <div className="flex flex-col absolute top-0 left-0 w-full h-full">
        <div className="flex flex-col w-full justify-center m-auto">
          {`กว้าง ${trim.physical?.width} มม`}
          {trim !== referenceTrim && (
            <Delta
              value={trim.physical?.width ?? 0}
              referenceValue={referenceTrim.physical?.width ?? 0}
              unit={DeltaUnit.Distance}
            />
          )}
        </div>
      </div>
    </div>
  );
}
