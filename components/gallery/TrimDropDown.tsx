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
import { Button } from "../ui/button";

type Props = {
  children: ReactElement;
  car: GalleryCar;
  disabledCars: ModelTrimSlug[];
  onClick?: (trim: ModelTrimSlug) => void;
};

export function TrimDropDown({ children, car, disabledCars, onClick }: Props) {
  function handleClick(trim: GalleryTrim) {
    if (onClick)
      onClick({
        modelSlug: car.slug,
        trimSlug: trim.slug,
      });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" className="size-auto p-0">
            {children}
          </Button>
        }
      />
      <DropdownMenuContent className="w-50">
        <DropdownMenuGroup>
          <DropdownMenuLabel>รุ่นย่อย</DropdownMenuLabel>
          {Array.from(car.trims.values()).map((trim) => {
            const disabled = !!disabledCars.find(
              (disabledCar) =>
                disabledCar.trimSlug === trim.slug &&
                disabledCar.modelSlug === car.slug,
            );
            return (
              <DropdownMenuItem
                key={trim.name}
                onClick={() => handleClick(trim)}
                disabled={disabled}
              >
                <div className="flex flex-row w-full items-end">
                  <div>{trim.name}</div>
                  <div className="flex-grow text-right text-xs text-muted-foreground">
                    {trim.price}
                  </div>
                </div>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
