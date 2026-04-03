"use client";

import { Trim } from "@/lib/Trim";
import { useEffect, useRef } from "react";
import { renderWheelBase } from "./renderWheelBase";
import { DRAW_SCALE } from "@/lib/consts";

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
    );
  }, [ref]);

  return <div ref={ref} className="flex justify-center" />;
}
