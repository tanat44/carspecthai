"use client";

import { Gallery } from "@/lib/Gallery";
import { ModelTrimSlug } from "@/lib/types";
import { ManufactureScroll } from "./ManufactureScroll";

type Props = {
  gallery: Gallery;
  onClick?: (trim: ModelTrimSlug) => void;
};

export function CarGallery({ gallery, onClick }: Props) {
  return (
    <div className="flex flex-row gap-4">
      {gallery.manufactures.map((manufacture) => (
        <ManufactureScroll
          key={manufacture.name}
          manufacture={manufacture}
          onClick={onClick}
        />
      ))}
    </div>
  );
}
