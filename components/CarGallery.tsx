"use client";

import { Gallery } from "@/lib/Gallery";
import { ModelTrimSlug } from "@/lib/types";
import { ManufactureScroll } from "./ManufactureScroll";

type Props = {
  gallery: Gallery;
  disabledCars: ModelTrimSlug[];
  onClick?: (trim: ModelTrimSlug) => void;
};

export function CarGallery({ gallery, disabledCars = [], onClick }: Props) {
  return (
    <div className="flex flex-row gap-4">
      {gallery.manufactures.map((manufacture) => (
        <ManufactureScroll
          key={manufacture.name}
          manufacture={manufacture}
          onClick={onClick}
          disabledCars={disabledCars}
        />
      ))}
    </div>
  );
}
