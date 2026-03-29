import { ScrollArea } from "@/components/ui/scroll-area";
import { GalleryManufacture } from "@/lib/Gallery";
import { ModelTrimSlug } from "@/lib/types";
import { CarCard } from "./CarCard";

type Props = {
  manufacture: GalleryManufacture;
  onClick?: (trim: ModelTrimSlug) => void;
};

export function ManufactureScroll({ manufacture, onClick }: Props) {
  return (
    <ScrollArea className="h-72 w-48 rounded-md border bg-muted">
      <div className="p-4">
        <h4 className="mb-4 text-base leading-none font-medium">
          {manufacture.name}
        </h4>
        {manufacture.cars?.map((car) => (
          <CarCard car={car} key={car.name} onClick={onClick} />
        ))}
      </div>
    </ScrollArea>
  );
}
