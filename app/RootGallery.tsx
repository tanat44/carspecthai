"use client";

import { Gallery } from "@/lib/Gallery";
import { ModelTrimSlug } from "@/lib/types";
import { generateCompareUrl } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { CarGallery } from "../components/gallery/CarGallery";

type Props = {
  gallery: Gallery;
  className?: string;
};

export function RootGallery({ gallery, className }: Props) {
  const router = useRouter();

  function handleClick(trim: ModelTrimSlug) {
    const path = generateCompareUrl([trim]);
    router.push(path);
  }
  return (
    <CarGallery gallery={gallery} onClick={handleClick} className={className} />
  );
}
