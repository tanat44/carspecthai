"use client";

import { Gallery } from "@/lib/Gallery";
import { Dimension } from "@/lib/types";
import { VisualData } from "@/lib/Visual/types";
import { useEffect, useRef } from "react";
import { useDimensionStore } from "./dimensionStore";
import { renderDimensions } from "./renderBoxes";

type Props = {
  gallery: Gallery;
  data: VisualData<Dimension>[];
};

export function Visualization({ gallery, data }: Props) {
  const frontViewRef = useRef<HTMLDivElement>(null);
  const sideViewRef = useRef<HTMLDivElement>(null);
  const { selectedCar } = useDimensionStore();

  useEffect(() => {
    if (!frontViewRef) return;
    const layer = renderDimensions(
      frontViewRef.current!,
      data,
      (trim) => trim.data?.width,
    );
    useDimensionStore.getState().setFrontViewRef(layer);
  }, [frontViewRef]);

  useEffect(() => {
    if (!sideViewRef) return;
    const layer = renderDimensions(
      sideViewRef.current!,
      data,
      (trim) => trim.data?.length,
    );
    useDimensionStore.getState().setSideViewRef(layer);
  }, [sideViewRef]);

  return (
    <div className="flex flex-col items-baseline gap-10 p-10">
      <div ref={frontViewRef} className="flex justify-center" />
      <div ref={sideViewRef} className="flex justify-center" />
      {selectedCar && <div>{selectedCar}</div>}
    </div>
  );
}
