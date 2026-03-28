import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Car } from "@/lib/Car";
import Link from "next/link";

type Props = {
  car: Car;
};

export function CarCard({ car }: Props) {
  return (
    <Link href={`/compare/${car.filename}`}>
      <Card className="relative mx-auto w-full max-w-3xs pt-0 gap-2 pb-2 cursor-pointer">
        <div>
          <img
            src={`/cars/photos/${car.filename}.png`}
            alt={`${car.manufacture} ${car.name} (${car.releaseDate})`}
            className="relative z-20 aspect-video w-full object-cover"
          />
          <Badge className="absolute right-2 top-2 z-20">
            {car.releaseDate}
          </Badge>
        </div>

        <CardHeader>
          <CardTitle className="text-xs">
            {car.manufacture} {car.name}
          </CardTitle>
        </CardHeader>
      </Card>
    </Link>
  );
}
