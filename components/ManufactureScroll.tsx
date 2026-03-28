import { ScrollArea } from "@/components/ui/scroll-area";
import { Car } from "@/lib/Car";
import { CarCard } from "./CarCard";

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`,
);

type Props = {
  name: string;
  cars?: Car[];
};

export function ManufactureScroll({ name, cars }: Props) {
  return (
    <ScrollArea className="h-72 w-48 rounded-md border bg-muted">
      <div className="p-4">
        <h4 className="mb-4 text-base leading-none font-medium">{name}</h4>
        {cars?.map((car) => (
          <CarCard car={car} key={car.filename} />
        ))}
      </div>
    </ScrollArea>
  );
}
