import { CarLibrary } from "../CarLibrary";
import { Trim } from "../Trim";
import { VisualData } from "./types";

export function getDimension<Dimension>(lib: CarLibrary) {
  return getVisualData(
    lib,
    (trim) =>
      ({
        width: trim.physical?.width,
        height: trim.physical?.height,
        length: trim.physical?.length,
      }) as Dimension,
  );
}

function getVisualData<T>(
  lib: CarLibrary,
  accessor: (trim: Trim) => T,
): VisualData<T>[] {
  const output: VisualData<T>[] = [];
  const cars = lib.allCars;
  cars.forEach((car) => {
    car.trims.forEach((trim) => {
      const data = accessor(trim);
      const point: VisualData<T> = {
        carFullname: trim.car?.manufacture + " " + trim.fullName,
        trim: {
          slug: trim.slug,
          carSlug: trim.car?.slug ?? "",
        },
        data,
      };
      output.push(point);
    });
  });
  return output;
}
