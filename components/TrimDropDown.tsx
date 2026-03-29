import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GalleryCar, GalleryTrim } from "@/lib/Gallery";
import { ModelTrimSlug } from "@/lib/types";
import { ReactElement } from "react";

type Props = {
  children: ReactElement;
  car: GalleryCar;
  onClick?: (trim: ModelTrimSlug) => void;
};

export function TrimDropDown({ children, car, onClick }: Props) {
  function handleClick(trim: GalleryTrim) {
    if (onClick)
      onClick({
        modelSlug: car.slug,
        trimSlug: trim.slug,
      });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={children} />
      <DropdownMenuContent className="w-50">
        <DropdownMenuGroup>
          <DropdownMenuLabel>รุ่นย่อย</DropdownMenuLabel>
          {Array.from(car.trims.values()).map((trim) => (
            // <Link href={`compare/${car.filename}/${trim.slug}`} key={trim.name}>
            <DropdownMenuItem key={trim.name} onClick={() => handleClick(trim)}>
              <div className="flex flex-row w-full items-end">
                <div>{trim.name}</div>
                <div className="flex-grow text-right text-xs text-muted-foreground">
                  {trim.price}
                </div>
              </div>
            </DropdownMenuItem>
            // </Link>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
