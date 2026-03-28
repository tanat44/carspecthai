import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Car } from "@/lib/Car";
import { TrimDropDown } from "./TrimDropDown";
import { Button } from "./ui/button";

type Props = {
  car: Car;
};

function yearsToColor(years: number): string {
  if (years < 2) return "bg-green-300";
  else if (years < 5) return "bg-yellow-100";
  else if (years < 10) return "bg-orange-200";
  return "bg-olive-200";
}

export function CarCard({ car }: Props) {
  return (
    <TrimDropDown car={car}>
      <Button className="bg-transparent w-full h-full">
        <Card className="relative mx-auto w-full max-w-3xs pt-0 gap-2 pb-2 cursor-pointer">
          <div>
            <img
              src={`/cars/photos/${car.filename}.png`}
              alt={`${car.manufacture} ${car.name} (${car.releaseDate})`}
              className="relative z-20 aspect-video w-full object-cover"
            />
            <Badge
              className={`absolute right-2 top-2 z-20 ${yearsToColor(car.yearsOld)}`}
            >
              {car.releaseDate}
            </Badge>
          </div>

          <CardHeader>
            <CardTitle className="text-xs">
              {car.manufacture} {car.name}
            </CardTitle>
          </CardHeader>
        </Card>
      </Button>
    </TrimDropDown>
  );
}
