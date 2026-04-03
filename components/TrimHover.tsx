import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Trim } from "@/lib/Trim";
import { ModelTrimSlug } from "@/lib/types";
import { baseAssetPath, slugToQueryTrims } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";
import { ReactElement } from "react";
import { Button } from "./ui/button";

type Props = {
  title: ReactElement;
  trim: Trim;
  isReference: boolean;
};

export function TrimHover({ title, trim, isReference }: Props) {
  const router = useRouter();
  const params = useParams();
  function download() {
    window.open(`${baseAssetPath()}/cars/catalogs/${trim.car?.slug}.pdf`);
  }

  function makeReference() {
    const thisModelSlug = trim.car?.slug ?? "";
    const thisTrimSlug = trim.slug;

    const trims = slugToQueryTrims(params.slug as string[]);
    const otherTrims = trims.filter(
      (t) => t.modelSlug !== thisModelSlug && t.trimSlug !== thisTrimSlug,
    );
    const newTrims: ModelTrimSlug[] = [
      { modelSlug: thisModelSlug, trimSlug: thisTrimSlug },
      ...otherTrims,
    ];
    let newPath = "/compare";
    for (const trim of newTrims) {
      newPath += `/${trim.modelSlug}/${trim.trimSlug}`;
    }
    router.push(newPath);
  }

  return (
    <HoverCard>
      <HoverCardTrigger delay={10} closeDelay={100} render={title} />
      <HoverCardContent className="flex flex-col w-64">
        {!isReference && (
          <Button onClick={makeReference}>ใช้เป็นรุ่นอ้างอิง</Button>
        )}
        <img
          src={`${baseAssetPath()}/cars/photos/${trim.car?.slug}.png`}
          alt={`${trim.fullName}`}
          className="aspect-video w-full"
        />
        <Button variant="link" onClick={download} className="text-gray-500">
          ดาวโหลดแคตาล๊อก
        </Button>
      </HoverCardContent>
    </HoverCard>
  );
}
