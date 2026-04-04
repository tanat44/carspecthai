import { GalleryManufacture } from "@/lib/Gallery";
import { ModelTrimSlug } from "@/lib/types";
import { CarCard } from "./CarCard";
import { ScrollArea } from "./ui/scroll-area";

type Props = {
  manufacture: GalleryManufacture;
  disabledCars: ModelTrimSlug[];
  onClick?: (trim: ModelTrimSlug) => void;
};

export function ManufactureScroll({
  manufacture,
  disabledCars,
  onClick,
}: Props) {
  const sortCars = manufacture.cars.sort(
    (a, b) => b.releaseYear - a.releaseYear,
  );

  return (
    <ScrollArea className="w-48 rounded-md border bg-muted h-100">
      <div className="p-2">
        <h4 className="mt-2 mb-4 text-base leading-none font-medium text-center">
          {manufacture.name}
        </h4>
        {sortCars.map((car) => (
          <CarCard
            car={car}
            key={car.name}
            onClick={onClick}
            disabledCars={disabledCars}
          />
        ))}
      </div>
    </ScrollArea>
  );
}
