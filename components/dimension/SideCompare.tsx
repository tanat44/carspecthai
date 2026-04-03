"use client";

import { Trim } from "@/lib/Trim";
import { useEffect, useRef } from "react";
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

  return <div ref={ref} className="flex justify-center" />;
}
