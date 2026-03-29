"use client";

import { Gallery } from "@/lib/Gallery";
import { ModelTrimSlug } from "@/lib/types";
import { redirect } from "next/navigation";
import { CarGallery } from "../components/CarGallery";

type Props = {
  gallery: Gallery;
};

export function RootGallery({ gallery }: Props) {
  function handleClick(trim: ModelTrimSlug) {
    redirect(`/compare/${trim.modelSlug}/${trim.trimSlug}`);
  }
  return <CarGallery gallery={gallery} onClick={handleClick} />;
}
