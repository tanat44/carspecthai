import { Car } from "./Car";
import { YmlFile } from "./types";

export class CarLibrary {
  cars: Map<string, Car>;

  constructor() {
    this.cars = new Map();
  }

  static async load(files: Map<string, YmlFile>): Promise<CarLibrary> {
    const promises: Promise<Car>[] = [];
    for (const [key, value] of files) {
      promises.push(Car.readYml(value));
    }

    const lib = new CarLibrary();
    const cars = await Promise.all(promises);
    cars.forEach((car) => lib.cars.set(car.filename, car));
    return lib;
  }

  get allCars(): Car[] {
    return Array.from(this.cars.values());
  }

  get byManufacture(): Partial<Record<string, Car[]>> {
    const groups = Object.groupBy(this.cars.values(), (car) => car.manufacture);
    return groups;
  }
}
