import { promises as fs } from "fs";
import { parse } from "yaml";
import { Engine, Physical, Trim, YmlFile } from "./types";
import { readYmlVariable } from "./utils";

export class Car {
  filename: string = "";
  name?: string;
  manufacture: string = "";
  releaseDate?: string;
  physical?: Physical;
  engine?: Engine;
  performance?: Performance;
  trims: Trim[] = [];

  static async readYml(file: YmlFile): Promise<Car> {
    // fetch variable files
    const variableText = await readYmlVariable();

    // fetch this car spec and parse yml
    const text = (await fs.readFile(file.path)).toString();
    const object = parse(variableText + "\n" + text);

    const car = new Car();
    car.filename = file.name;
    car.name = object.name;
    car.manufacture = object.manufacture;
    car.releaseDate = object.releaseDate;
    car.physical = object.physical;
    car.engine = object.engine;
    car.performance = object.performance;
    car.trims = object.trims;
    return car;
  }
}
