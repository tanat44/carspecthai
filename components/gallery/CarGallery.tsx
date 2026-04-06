"use client";

import { Gallery } from "@/lib/Gallery";
import { ModelTrimSlug } from "@/lib/types";
import { ManufactureScroll } from "./ManufactureScroll";

type Props = {
  gallery: Gallery;
  disabledCars?: ModelTrimSlug[];
  onClick?: (trim: ModelTrimSlug) => void;
  className?: string;
};

export function CarGallery({
  gallery,
  disabledCars = [],
  onClick,
  className,
}: Props) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {gallery.manufactures.map((manufacture) => (
        <ManufactureScroll
          key={manufacture.name}
          manufacture={manufacture}
          disabledCars={disabledCars}
          onClick={onClick}
        />
      ))}
    </div>
  );
}
