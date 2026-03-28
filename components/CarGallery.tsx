import { CarLibrary } from "@/lib/CarLibrary";
import { getAllCarFiles } from "@/lib/utils";
import { ManufactureScroll } from "./ManufactureScroll";

export async function CarGallery() {
  const carFiles = await getAllCarFiles();
  const carLib = await CarLibrary.load(carFiles);

  return (
    <div className="flex flex-row gap-4">
      {Object.entries(carLib.byManufacture).map(([manufacture, cars]) => (
        <ManufactureScroll key={manufacture} cars={cars} name={manufacture} />
      ))}
    </div>
  );
}
