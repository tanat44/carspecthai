import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Trim } from "@/lib/Trim";
import { baseAssetPath } from "@/lib/utils";
import { ReactElement } from "react";
import { Button } from "./ui/button";

type Props = {
  title: ReactElement;
  trim: Trim;
};

export function TrimHover({ title, trim }: Props) {
  function download() {
    window.open(`${baseAssetPath()}/cars/catalogs/${trim.car?.slug}.pdf`);
  }

  return (
    <HoverCard>
      <HoverCardTrigger delay={10} closeDelay={100} render={title} />
      <HoverCardContent className="flex flex-col w-64">
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
