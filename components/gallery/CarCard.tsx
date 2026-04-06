import { Badge } from "@/components/ui/badge";
import { GalleryCar } from "@/lib/Gallery";
import { ModelTrimSlug } from "@/lib/types";
import { baseAssetPath } from "@/lib/utils";
import { TrimDropDown } from "./TrimDropDown";

type Props = {
  car: GalleryCar;
  disabledCars: ModelTrimSlug[];
  onClick?: (trim: ModelTrimSlug) => void;
};

function yearsToColor(releaseYear: number): string {
  const yearsOld = new Date().getFullYear() - releaseYear;
  if (yearsOld === 0) return "bg-green-300";
  else if (yearsOld === 1) return "bg-lime-100";
  else if (yearsOld === 2) return "bg-yellow-200";
  else if (yearsOld === 3) return "bg-amber-100";
  return "bg-mist-200";
}

export function CarCard({ car, disabledCars, onClick }: Props) {
  return (
    <TrimDropDown car={car} onClick={onClick} disabledCars={disabledCars}>
      <div className="relative pt-0 gap-2 rounded-md cursor-pointer border">
        <img
          src={`${baseAssetPath()}/cars/photos/${car.slug}.png`}
          alt={`${car.name}`}
          className="relative h-20 w-30 object-fill rounded-t-md"
        />
        <Badge
          className={`absolute right-1 top-1 z-20 text-black ${yearsToColor(car.releaseYear)}`}
        >
          {car.releaseYear}
        </Badge>
        <div className="text-xs leading-6 text-center h-6 align-middle ">
          {car.name}
        </div>
      </div>
    </TrimDropDown>
  );
}
