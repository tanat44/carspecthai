import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { GalleryCar } from "@/lib/Gallery";
import { ModelTrimSlug } from "@/lib/types";
import { baseAssetPath } from "@/lib/utils";
import { TrimDropDown } from "./TrimDropDown";
import { Button } from "./ui/button";

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
      <Button className="bg-transparent w-full h-full pb-2">
        <Card className="relative mx-auto w-full max-w-3xs pt-0 gap-2 pb-2 cursor-pointer">
          <div>
            <img
              src={`${baseAssetPath()}/cars/photos/${car.slug}.png`}
              alt={`${car.name}`}
              className="relative z-20 aspect-video w-full object-cover"
            />
            <Badge
              className={`absolute right-1 top-1 z-20 ${yearsToColor(car.releaseYear)}`}
            >
              {car.releaseYear}
            </Badge>
          </div>

          <CardHeader>
            <CardTitle className="text-xs text-center">{car.name}</CardTitle>
          </CardHeader>
        </Card>
      </Button>
    </TrimDropDown>
  );
}
