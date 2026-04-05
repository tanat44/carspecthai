"use client";

import { Gallery } from "@/lib/Gallery";
import { Dimension } from "@/lib/types";
import { VisualData } from "@/lib/Visual/types";
import { useEffect, useRef } from "react";
import { renderDimensions } from "./renderBoxes";

type Props = {
  gallery: Gallery;
  data: VisualData<Dimension>[];
};

export function Visualization({ gallery, data }: Props) {
  const frontViewRef = useRef<HTMLDivElement>(null);
  const sideViewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!frontViewRef) return;
    renderDimensions(frontViewRef.current!, data, (trim) => trim.data?.width);
  }, [frontViewRef]);

  useEffect(() => {
    if (!sideViewRef) return;
    renderDimensions(sideViewRef.current!, data, (trim) => trim.data?.length);
  }, [sideViewRef]);

  return (
    <div className="flex flex-col items-baseline gap-10 p-10">
      <div ref={frontViewRef} className="flex justify-center" />
      <div ref={sideViewRef} className="flex justify-center" />
    </div>
  );
}
