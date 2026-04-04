"use client";

import { Gallery } from "@/lib/Gallery";
import { ModelTrimSlug } from "@/lib/types";
import { useRouter } from "next/navigation";
import { CarGallery } from "../components/CarGallery";

type Props = {
  gallery: Gallery;
  className?: string;
};

export function RootGallery({ gallery, className }: Props) {
  const router = useRouter();

  function handleClick(trim: ModelTrimSlug) {
    router.push(`/compare/${trim.modelSlug}/${trim.trimSlug}`);
  }
  return (
    <CarGallery gallery={gallery} onClick={handleClick} className={className} />
  );
}
