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

function yearsToColor(years: number): string {
  if (years < 2) return "bg-green-300";
  else if (years < 5) return "bg-yellow-100";
  else if (years < 10) return "bg-orange-200";
  return "bg-olive-200";
}

export function CarCard({ car, disabledCars, onClick }: Props) {
  return (
    <TrimDropDown car={car} onClick={onClick} disabledCars={disabledCars}>
      <Button className="bg-transparent w-full h-full">
        <Card className="relative mx-auto w-full max-w-3xs pt-0 gap-2 pb-2 cursor-pointer">
          <div>
            <img
              src={`${baseAssetPath()}/cars/photos/${car.slug}.png`}
              alt={`${car.name}`}
              className="relative z-20 aspect-video w-full object-cover"
            />
            <Badge
              className={`absolute right-2 top-2 z-20 ${yearsToColor(car.releaseYear)}`}
            >
              {car.releaseYear}
            </Badge>
          </div>

          <CardHeader>
            <CardTitle className="text-xs">{car.name}</CardTitle>
          </CardHeader>
        </Card>
      </Button>
    </TrimDropDown>
  );
}
