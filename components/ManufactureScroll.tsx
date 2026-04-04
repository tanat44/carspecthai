import { ScrollArea } from "@/components/ui/scroll-area";
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
  return (
    <ScrollArea className=" w-48 rounded-md border bg-muted flex-1">
      <div className="p-2 flex-1">
        <h4 className="mt-2 mb-4 text-base leading-none font-medium text-center">
          {manufacture.name}
        </h4>
        {manufacture.cars.map((car) => (
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
