import { Car } from "./Car";
import { Gallery, GalleryManufacture } from "./Gallery";
import { calculateMetrics } from "./Metric/calculateMetric";
import { Metrics } from "./Metric/types";
import { Trim } from "./Trim";
import { getAllCarFilePaths } from "./utils";

export class CarLibrary {
  cars: Map<string, Car>;
  private static _instance?: CarLibrary;

  constructor() {
    this.cars = new Map();
  }

  static async instance(): Promise<CarLibrary> {
    if (!CarLibrary._instance) {
      const paths = await getAllCarFilePaths();
      CarLibrary._instance = await CarLibrary.loadFromFiles(paths);
    }

    return CarLibrary._instance;
  }

  static async loadFromFiles(paths: string[]): Promise<CarLibrary> {
    const promises: Promise<Car>[] = [];
    for (const path of paths) {
      promises.push(Car.readYml(path));
    }

    const cars = await Promise.all(promises);
    return CarLibrary.fromCars(cars);
  }

  static fromCars(cars: Car[]): CarLibrary {
    const lib = new CarLibrary();
    cars.forEach((car) => lib.cars.set(car.slug, car));
    return lib;
  }

  get allCars(): Car[] {
    return Array.from(this.cars.values());
  }

  findCar(model: string): Car | undefined {
    const carModel = this.cars.get(model);
    return carModel;
  }

  findTrim(model: string, trimSlug: string): Trim | undefined {
    const carModel = this.findCar(model);
    if (!carModel) return undefined;

    const carTrim = carModel.trims.get(trimSlug);
    return carTrim;
  }

  get byManufacture(): Partial<Record<string, Car[]>> {
    const groups = Object.groupBy(this.cars.values(), (car) => car.manufacture);
    return groups;
  }

  get gallery(): Gallery {
    const groups = Object.groupBy(this.cars.values(), (car) => car.manufacture);
    const manufactures: GalleryManufacture[] = [];
    for (const [manufacture, cars] of Object.entries(groups)) {
      if (!cars) continue;
      manufactures.push({
        name: manufacture,
        cars: cars.map((car) => car.galleryCar),
      });
    }

    return { manufactures };
  }

  get rankedMatrics(): Metrics {
    return calculateMetrics(this);
  }
}
