"use client";

import { Trim } from "@/lib/Trim";
import { useEffect, useRef } from "react";
import { Delta } from "../Delta";
import { Space } from "../Space";
import { renderSizeCompare } from "./renderSizeCompare";

type Props = {
  trim: Trim;
  referenceTrim: Trim;
  showReference: boolean;
};

export function SideCompare({ trim, referenceTrim, showReference }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref) return;
    renderSizeCompare(
      ref.current!,
      trim.canvasSideSize,
      referenceTrim.canvasSideSize,
      showReference,
    );
  }, [ref]);

  return (
    <div className="relative flex">
      <div ref={ref} className="m-auto" />
      <div className="flex flex-col absolute top-0 left-0 w-full h-full">
        <Space />
        <div className="flex flex-row gap-1 w-full justify-center">
          {`ยาว ${trim.physical?.length} มม`}
          {trim !== referenceTrim && (
            <Delta
              value={trim.physical?.length ?? 0}
              referenceValue={referenceTrim.physical?.length ?? 0}
              suffix="มม"
            />
          )}
        </div>
        <div className="flex flex-row gap-1 w-full justify-center">
          {`สูง ${trim.physical?.height} มม`}
          {trim !== referenceTrim && (
            <Delta
              value={trim.physical?.height ?? 0}
              referenceValue={referenceTrim.physical?.height ?? 0}
              suffix="มม"
            />
          )}
        </div>
        <Space />
      </div>
    </div>
  );
}
