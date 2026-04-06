import { GalleryManufacture } from "@/lib/Gallery";
import { ModelTrimSlug } from "@/lib/types";
import { CarCard } from "./CarCard";

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
    <div className="flex flex-col gap-2">
      <h4 className="font-medium w-full pb-1">{manufacture.name}</h4>
      <div className="flex flex-row gap-2">
        {sortCars.map((car) => (
          <CarCard
            car={car}
            key={car.name}
            onClick={onClick}
            disabledCars={disabledCars}
          />
        ))}
      </div>
    </div>
  );
}
