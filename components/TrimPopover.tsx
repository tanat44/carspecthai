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

import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PencilIcon } from "lucide-react";
import { Space } from "./Space";
import { ButtonGroup } from "./ui/button-group";

export function TrimPopover({ title, trim, isReference }: Props) {
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

  function replaceTrim() {}

  return (
    <Popover>
      <PopoverTrigger render={title} />
      <PopoverContent className="flex flex-col w-64 gap-2 p-4">
        <PopoverHeader>
          <PopoverTitle className="flex flex-row pt-1 pb-2">
            {trim.fullName}
            <Space />
            <ButtonGroup>
              {!isReference && (
                <Button size="xs" variant="outline" onClick={makeReference}>
                  ใช้เป็นรุ่นอ้างอิง
                </Button>
              )}
              <Button
                size="xs"
                variant="outline"
                aria-label="Search"
                onClick={replaceTrim}
              >
                <PencilIcon />
              </Button>
            </ButtonGroup>
          </PopoverTitle>
          <PopoverDescription className="flex flex-col content-center gap-2">
            <img
              src={`${baseAssetPath()}/cars/photos/${trim.car?.slug}.png`}
              alt={`${trim.fullName}`}
              className="aspect-video w-full"
            />
            <Button variant="outline" onClick={download}>
              ดาวโหลดแคตาล๊อก
            </Button>
          </PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
    // <HoverCard>
    //   <HoverCardTrigger delay={10} closeDelay={100} render={title} />
    //   <HoverCardContent className="flex flex-col w-64">

    //   </HoverCardContent>
    // </HoverCard>
  );
}
