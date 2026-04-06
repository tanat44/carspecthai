import { Trim } from "@/lib/Trim";
import { ModelTrimSlug } from "@/lib/types";
import {
  baseAssetPath,
  generateCompareUrl,
  pathToQueryTrims,
} from "@/lib/utils";
import { useParams, usePathname, useRouter } from "next/navigation";
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
  const path = usePathname();
  function download() {
    window.open(`${baseAssetPath()}/cars/catalogs/${trim.car?.slug}.pdf`);
  }

  function makeReference() {
    const thisModelSlug = trim.car?.slug ?? "";
    const thisTrimSlug = trim.slug;

    const trims = pathToQueryTrims(path);
    const otherTrims = trims.filter(
      (t) => t.modelSlug !== thisModelSlug && t.trimSlug !== thisTrimSlug,
    );
    const newTrims: ModelTrimSlug[] = [
      { modelSlug: thisModelSlug, trimSlug: thisTrimSlug },
      ...otherTrims,
    ];
    const newPath = generateCompareUrl(newTrims);
    router.push(newPath);
  }

  function replaceTrim() {}

  return (
    <Popover>
      <PopoverTrigger render={title} />
      <PopoverContent className="flex flex-col max-w-xs gap-2 p-4">
        <PopoverHeader>
          <PopoverTitle className="flex flex-row pt-1 items-end">
            {trim.fullName}
            <Space />
            <ButtonGroup>
              {!isReference && (
                <Button size="xs" variant="outline" onClick={makeReference}>
                  ใช้เป็นรุ่นอ้างอิง
                </Button>
              )}
              <Button
                disabled={true}
                size="xs"
                variant="outline"
                aria-label="Search"
                onClick={replaceTrim}
              >
                <PencilIcon />
              </Button>
            </ButtonGroup>
          </PopoverTitle>
          <PopoverDescription className="flex flex-col content-center gap-4 mt-4">
            <img
              src={`${baseAssetPath()}/cars/photos/${trim.car?.slug}.png`}
              alt={`${trim.fullName}`}
              className="object-fill rounded-md w-full"
            />
            <Button variant="outline" onClick={download}>
              ดาวโหลดแคตาล๊อก
            </Button>
          </PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  );
}
